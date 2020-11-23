import Core from './core';
var _dgtVerifyRandomStr = '${_dgtVerifyRandomStr}';
var injectStartTime = Date.now();
var jsBridgeCore = Core(_dgtVerifyRandomStr);
var __JSBridge = {
    call: jsBridgeCore.call.bind(jsBridgeCore),
    on: jsBridgeCore.on.bind(jsBridgeCore),
    handleMessage: jsBridgeCore.handleMessage.bind(jsBridgeCore),
};
try {
    Object.defineProperty(window, 'JSBridge', {
        value: __JSBridge,
        writable: false,
        configurable: false,
    });
}
catch (err) {
    console.error('inject err:' + err.message);
}
console.log('inject exec time', Date.now() - injectStartTime);
console.info('inject success');
