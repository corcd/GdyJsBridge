var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import EventEmitter from './event';
import { isIOS } from '../helper';
import { SHA1 } from '../utils';
var Core = (function (_super) {
    __extends(Core, _super);
    function Core(dgtVerifyRandomStr) {
        var _this = _super.call(this) || this;
        _this._dgtVerifyRandomStr = '';
        _this._dgtVerifyRandomStr = dgtVerifyRandomStr;
        if (isIOS()) {
            if (window.webkit && window.webkit.messageHandlers) {
                _this.__core = window.webkit.messageHandlers;
            }
            if (!_this.__core) {
                console.error('inject err');
                return _this;
            }
            delete window.webkit.messageHandlers;
        }
        else {
            _this.__core = window.__core;
            console.log(_this.__core);
            if (!_this.__core) {
                return _this;
            }
            delete window.__core;
        }
        return _this;
    }
    Core.getInstance = function (dgtVerifyRandomStr) {
        if (!this.singleInstance) {
            this.singleInstance = new Core(dgtVerifyRandomStr);
        }
        return this.singleInstance;
    };
    Core.prototype._doSendMessage = function (msgStr) {
        if (isIOS()) {
            this.__core._sendMessage.postMessage(msgStr);
        }
        else {
            this.__core._sendMessage(msgStr);
        }
    };
    Core.prototype._sendMessage = function (msg) {
        var _a;
        var msgStr = JSON.stringify(msg);
        var arr = [msgStr, this._dgtVerifyRandomStr];
        var str = arr.join('');
        var msgSha = SHA1(str).toString();
        var retMap = (_a = {},
            _a[Core._JSON_MESSAGE] = msgStr,
            _a[Core._SHA_KEY] = msgSha,
            _a);
        this._doSendMessage(JSON.stringify(retMap));
    };
    Core.prototype.handleMessage = function (msgStr) {
        var msg = JSON.parse(msgStr);
        var shaStr = msg[Core._SHA_KEY];
        var msgWrap = JSON.parse(decodeURIComponent(window.atob(msg[Core._JSON_MESSAGE])));
        var arr = [msg[Core._JSON_MESSAGE], this._dgtVerifyRandomStr];
        var str = arr.join('');
        var msgSha = SHA1(str).toString();
        if (msgSha !== shaStr) {
            return '{}';
        }
        switch (msgWrap[Core._MESSAGE_TYPE]) {
            case 'callback': {
                if (typeof msgWrap[Core._CALLBACK_ID] === 'string') {
                    var callBackRet = _super.prototype.triggerCallback.call(this, msgWrap[Core._CALLBACK_ID], msgWrap['params']);
                    _super.prototype.removeCallback.call(this, msgWrap[Core._CALLBACK_ID]);
                    console.log(callBackRet);
                    callBackRet['errCode'] =
                        'errCode' in callBackRet ? callBackRet['errCode'] : 0;
                    return JSON.stringify(callBackRet);
                }
                return JSON.stringify({
                    errCode: '404',
                });
            }
            case 'event': {
                if (typeof msgWrap[Core._EVENT_NAME] === 'string') {
                    var eventRetList = _super.prototype.emitListener.call(this, msgWrap[Core._EVENT_NAME], msgWrap['params']);
                    console.log(eventRetList);
                    var eventRet = eventRetList.map(function (item) {
                        item['errCode'] = 'errCode' in item ? item['errCode'] : 0;
                        return item;
                    });
                    return JSON.stringify(eventRet);
                }
                return JSON.stringify({
                    errCode: '404',
                });
            }
        }
        return JSON.stringify({
            errCode: '404',
        });
    };
    Core.prototype.call = function (apiName, params, callback) {
        var _a;
        if (!apiName || typeof apiName !== 'string') {
            return;
        }
        if (typeof params !== 'object') {
            params = {};
        }
        var callbackId = '';
        if (typeof callback === 'function') {
            callbackId = _super.prototype.addCallback.call(this, callback);
        }
        var msgObj = (_a = {
                apiName: apiName,
                params: params
            },
            _a[Core._MESSAGE_TYPE] = 'call',
            _a[Core._CALLBACK_ID] = callbackId,
            _a);
        console.log(msgObj);
        try {
            this._sendMessage(msgObj);
        }
        catch (err) {
            console.error(err);
        }
    };
    Core.prototype.on = function (eventName, callback) {
        if (!eventName || typeof eventName !== 'string') {
            console.error('illegal event name parameter');
            return;
        }
        if (typeof callback !== 'function') {
            console.error('callback must be a function');
            return;
        }
        console.log(eventName, callback);
        _super.prototype.addListener.call(this, eventName, callback);
    };
    Core.singleInstance = null;
    Core._MESSAGE_TYPE = 'msgType';
    Core._CALLBACK_ID = 'callbackId';
    Core._EVENT_NAME = 'eventName';
    Core._JSON_MESSAGE = 'jsonMessage';
    Core._SHA_KEY = 'shaKey';
    return Core;
}(EventEmitter));
var core = function (dgtVerifyRandomStr) {
    return Core.getInstance(dgtVerifyRandomStr);
};
export default core;
