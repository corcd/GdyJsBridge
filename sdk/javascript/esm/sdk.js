var SDK = (function () {
    function SDK() {
    }
    SDK.prototype._checkParams = function (params) {
        return params || {};
    };
    SDK.prototype._defaultCall = function (apiName, callback) {
        callback.complete && callback.complete();
        console.error('JSBridge not found ,' + apiName);
    };
    SDK.prototype._defaultOn = function (eventName, callback) {
        callback.complete && callback.complete();
        console.error('JSBridge not found ,' + eventName);
    };
    SDK.prototype.call = function (apiName, params, callback) {
        window.JSBridge
            ? window.JSBridge.call(apiName, this._checkParams(params), function (ret) {
                var errCode = ret && ret['errCode'];
                switch (errCode) {
                    case 0:
                        callback.success && callback.success(ret);
                        break;
                    case 1:
                        callback.cancel && callback.cancel(ret);
                        break;
                    default:
                        callback.fail && callback.fail(ret);
                        break;
                }
                callback.complete && callback.complete(ret);
            })
            : this._defaultCall(apiName, callback);
    };
    SDK.prototype.on = function (eventName, callback) {
        window.JSBridge
            ? window.JSBridge.on(eventName, callback)
            : this._defaultOn(eventName, callback);
    };
    return SDK;
}());
export default SDK;
