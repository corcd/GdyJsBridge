/*
 * @Author: Whzcorcd
 * @Date: 2020-11-23 11:52:02
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 17:19:50
 * @Description: file content
 */
export default class SDK {
  constructor() {}

  private _checkParams(params: object) {
    return params || {}
  }

  private _defaultCall(apiName: string, callback: any) {
    callback.complete && callback.complete()
    console.error('JSBridge not found ,' + apiName)
  }

  private _defaultOn(eventName: string, callback: any) {
    callback.complete && callback.complete()
    console.error('JSBridge not found ,' + eventName)
  }

  /**
   * 调用 JSBridge 执行 api
   * @param {String} apiName
   * @param {Any} params
   * @param {
   *    success:((res:String)->Unit)?,
   *    fail:((res:String)->Unit)?)?
   *    cancel:((res:String)->Unit)?)?
   *    complete:((res:String)->Unit)?)? 操作完成后一定会调用
   * } callback res对象包括 errCode errMsg
   */
  public call(apiName: string, params: object, callback: any): void {
    window.JSBridge
      ? window.JSBridge.call(apiName, this._checkParams(params), (ret: any) => {
          // ;(callback._complete && callback._complete(ret)) ||
          //   delete callback._complete

          const errCode = ret && ret['errCode']
          switch (errCode) {
            case 0:
              callback.success && callback.success(ret)
              break
            case 1:
              callback.cancel && callback.cancel(ret)
              break
            default:
              callback.fail && callback.fail(ret)
              break
          }
          callback.complete && callback.complete(ret)
        })
      : this._defaultCall(apiName, callback)
  }

  public on(eventName: string, callback: any) {
    window.JSBridge
      ? window.JSBridge.on(eventName, callback)
      : this._defaultOn(eventName, callback)
  }
}
