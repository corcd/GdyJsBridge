/*
 * @Author: Whzcorcd
 * @Date: 2020-11-20 11:25:03
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 17:54:32
 * @Description: file content
 */
import Core from './core'

// 客户端注入时替换（全局随机验证字段）
var _dgtVerifyRandomStr = '${_dgtVerifyRandomStr}'

const injectStartTime = Date.now()
const jsBridgeCore = Core(_dgtVerifyRandomStr)

const __JSBridge = {
  call: jsBridgeCore.call.bind(jsBridgeCore),
  on: jsBridgeCore.on.bind(jsBridgeCore),
  handleMessage: jsBridgeCore.handleMessage.bind(jsBridgeCore),
  // log: _log,
}

try {
  Object.defineProperty(window, 'JSBridge', {
    value: __JSBridge,
    writable: false,
    configurable: false,
  })
} catch (err) {
  console.error('inject err:' + err.message)
}

console.log('inject exec time', Date.now() - injectStartTime)
console.info('inject success')
