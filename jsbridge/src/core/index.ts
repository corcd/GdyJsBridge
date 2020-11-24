/*
 * @Author: Whzcorcd
 * @Date: 2020-11-20 11:25:22
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-24 16:48:11
 * @Description: file content
 */
import EventEmitter from './event'
import { isIOS } from '../helper'
import { SHA1 } from '../utils'

class Core extends EventEmitter {
  private static singleInstance: Core | null = null

  private static _MESSAGE_TYPE: string = 'msgType' // 消息类型
  private static _CALLBACK_ID: string = 'callbackId' // 回调的 ID
  private static _EVENT_NAME: string = 'eventName' // 事件名称
  private static _JSON_MESSAGE: string = 'jsonMessage' // JSON 字段名
  private static _SHA_KEY: string = 'shaKey' // SHA 加密字段名

  // 全局随机验证字段
  private _dgtVerifyRandomStr: string = ''

  public __core: any

  private constructor(dgtVerifyRandomStr: string) {
    super()
    this._dgtVerifyRandomStr = dgtVerifyRandomStr

    if (isIOS()) {
      // iOS 下使用 window.webkit.messageHandlers（WKWebkitView）
      if (window.webkit && window.webkit.messageHandlers) {
        this.__core = window.webkit.messageHandlers
      }
      if (!this.__core) {
        // TODO
        console.error('inject err')
        return
      }
      delete window.webkit.messageHandlers
    } else {
      // 非 iOS 下使用系统全局变量（由 Webview 层定义）
      this.__core = window.__core
      console.log(this.__core)
      if (!this.__core) {
        // TODO
        return
      }
      delete window.__core
    }
  }

  static getInstance(dgtVerifyRandomStr: string): Core {
    if (!this.singleInstance) {
      this.singleInstance = new Core(dgtVerifyRandomStr)
    }
    return this.singleInstance
  }

  /**
   * 与 Native 通讯
   * @param {String} msgStr
   */
  private _doSendMessage(msgStr: string): void {
    if (isIOS()) {
      this.__core._sendMessage.postMessage(msgStr)
    } else {
      this.__core._sendMessage(msgStr)
    }
  }

  /**
   * H5 调用 Native 方法
   * @param {Any} msg
   */
  private _sendMessage(msg: any): void {
    const msgStr = JSON.stringify(msg) // JSON 格式的消息序列化

    const arr = [msgStr, this._dgtVerifyRandomStr]
    const str = arr.join('') //合并为一个消息字符串

    const msgSha = SHA1(str).toString()

    const retMap = {
      [Core._JSON_MESSAGE]: msgStr, //  消息字符串
      [Core._SHA_KEY]: msgSha, // 消息字符串散列特征值
    }

    this._doSendMessage(JSON.stringify(retMap)) // 发送
  }

  /**
   * 接收 Native 返回体调用 js-sdk 方法
   * @param {String} msgStr
   */
  public handleMessage(msgStr: string): string {
    const msg = JSON.parse(msgStr) // 解析 JSON 字符串, ['消息体','验证字符串 ']

    const shaStr = msg[Core._SHA_KEY] // 验证特征值
    const msgWrap = JSON.parse(
      decodeURIComponent(window.atob(msg[Core._JSON_MESSAGE]))
    ) // 解码使用 base64 编码的消息体字符串，解析消息体 JSON 字符串

    const arr = [msg[Core._JSON_MESSAGE], this._dgtVerifyRandomStr]
    const str = arr.join('')
    const msgSha = SHA1(str).toString()

    // 当 native 回传的 msg 和当前使用的全局验证字符串不匹配时
    if (msgSha !== shaStr) {
      return '{}'
    }

    // 根据不同的回传消息类型分发
    switch (msgWrap[Core._MESSAGE_TYPE]) {
      // 回调
      case 'callback': {
        if (typeof msgWrap[Core._CALLBACK_ID] === 'string') {
          const callBackRet = super.triggerCallback(
            msgWrap[Core._CALLBACK_ID],
            msgWrap['params']
          )
          super.removeCallback(msgWrap[Core._CALLBACK_ID])

          console.log(callBackRet)

          callBackRet['errCode'] =
            'errCode' in callBackRet ? callBackRet['errCode'] : 0 // 回调函数返回值 errCode

          return JSON.stringify(callBackRet) // 最终返回 JSON 序列化回调函数返回值
        }
        // 不符合要求时返回体
        return JSON.stringify({
          errCode: '404',
        })
      }
      // 事件
      case 'event': {
        if (typeof msgWrap[Core._EVENT_NAME] === 'string') {
          const eventRetList = super.emitListener(
            msgWrap[Core._EVENT_NAME],
            msgWrap['params']
          )

          console.log(eventRetList)

          const eventRet = eventRetList.map((item: any) => {
            item['errCode'] = 'errCode' in item ? item['errCode'] : 0 // 回调函数返回值 errCode
            return item
          })

          // 注意：这里序列化的是返回数据数组
          return JSON.stringify(eventRet) // 最终返回 JSON 序列化函数返回值
        }
        // 不符合要求时返回体
        return JSON.stringify({
          errCode: '404',
        })
      }
    }
    // 返回体内无触发类型时的返回体
    return JSON.stringify({
      errCode: '404',
    })
  }

  /**
   * js-sdk 调用 bridge 方法
   * @param {String} apiName native 的方法名
   * @param {Object} params 方法参数
   * @param {Function} callback 调用后的回调
   */
  public call(apiName: string, params: object, callback: Function): void {
    if (!apiName || typeof apiName !== 'string') {
      // apiName 不符合要求时处理
      return
    }
    if (typeof params !== 'object') {
      params = {}
    }

    let callbackId = ''
    if (typeof callback === 'function') {
      // 若回调函数有效时，将其存储于 _callback_map[callbackID]
      callbackId = super.addCallback(callback) // 返回 callback Id
    }

    const msgObj = {
      apiName: apiName,
      params: params,
      [Core._MESSAGE_TYPE]: 'call',
      [Core._CALLBACK_ID]: callbackId,
    }

    console.log(msgObj)

    try {
      this._sendMessage(msgObj) // 发送至 native
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 事件绑定
   * @param {String} eventName 浏览器环境内事件名
   * @param {Function} callback 回调
   */
  public on(eventName: string, callback: Function): void {
    if (!eventName || typeof eventName !== 'string') {
      console.error('illegal event name parameter')
      return
    }

    if (typeof callback !== 'function') {
      console.error('callback must be a function')
      return
    }
    console.log(eventName, callback)
    super.addListener(eventName, callback) // 绑定
  }
}

const core = (dgtVerifyRandomStr: string): Core =>
  Core.getInstance(dgtVerifyRandomStr)
export default core
