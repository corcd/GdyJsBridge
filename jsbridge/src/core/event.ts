/*
 * @Author: Whzcorcd
 * @Date: 2020-11-22 21:01:22
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 17:33:24
 * @Description: file content
 */
export default class EventEmitter {
  public _callbackId: number = 1000
  private _callbacks: object = {}
  private _events: object = {}
  private static MAX_LISTENERS: number = 10

  constructor() {
    this._callbackId = 1000
    this._events = {}
    this._callbacks = {}
  }

  // 监听
  public addCallback(callback: any): string {
    // TODO 重复的验证函数可封装使用

    if (typeof callback !== 'function') {
      console.error('[EventEmitter] Illegal callback functions\n')
      return ''
    }

    console.log(this._callbackId)

    this._callbackId++
    this._callbacks[String(this._callbackId)] = callback

    return String(this._callbackId)
  }

  // 触发
  public triggerCallback(id: string, ...args: any[]): any {
    // TODO 重复的验证函数可封装使用
    if (!id || typeof id !== 'string') {
      console.error('[EventEmitter] Illegal type parameter\n')
      return
    }

    if (this._callbacks[id]) {
      return this._callbacks[id].apply(this, args) || {}
    }
    return {}
  }

  // 移除监听器
  public removeCallback(id: string): void {
    // TODO 重复的验证函数可封装使用
    if (!id || typeof id !== 'string') {
      console.error('[EventEmitter] Illegal type parameter\n')
      return
    }

    if (this._callbacks[id]) {
      delete this._callbacks[id]
      // console.log(this._events)
    }
  }

  // 移除所有的监听器
  public removeAllCallbacks(): void {
    this._callbacks = {}
  }

  // 监听
  public addListener(type: string, listener: any): Array<any> | undefined {
    // TODO 重复的验证函数可封装使用
    if (!type || typeof type !== 'string') {
      console.error('[EventEmitter] Illegal type parameter\n')
      return
    }

    if (typeof listener !== 'function') {
      console.error('[EventEmitter] Illegal callback functions\n')
      return
    }

    if (this._events[type]) {
      // 已有绑定的情况
      if (this._events[type].length >= EventEmitter.MAX_LISTENERS) {
        console.error(
          '[EventEmitter] The same listener is allowed to listen to up to ten objects, otherwise it may cause memory leaks\n'
        )
        return
      }
      this._events[type].push(listener)
    } else {
      this._events[type] = [listener]
    }
    console.log(this._events[type])
    return this._events[type]
  }

  // 触发
  public emitListener(type: string, ...args: any[]): any {
    // TODO 重复的验证函数可封装使用
    if (!type || typeof type !== 'string') {
      console.error('[EventEmitter] Illegal type parameter\n')
      return
    }

    if (this._events[type]) {
      return this._events[type].map((fn: any) => fn.apply(this, args) || {})
    }
    return []
  }

  // 移除监听器
  public removeListener(type: string): void {
    // TODO 重复的验证函数可封装使用
    if (!type || typeof type !== 'string') {
      console.error('[EventEmitter] Illegal type parameter\n')
      return
    }

    if (this._events[type]) {
      delete this._events[type]
      // console.log(this._events)
    }
  }

  // 移除所有的监听器
  public removeAllListeners(): void {
    this._events = {}
  }
}
