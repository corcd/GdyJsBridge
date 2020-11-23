(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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

    var API = (function (_super) {
        __extends(API, _super);
        function API() {
            return _super.call(this) || this;
        }
        API.getInstance = function () {
            if (!this.singleInstance) {
                this.singleInstance = new API();
            }
            return this.singleInstance;
        };
        API.prototype.config = function (e) {
            _super.prototype.call.call(this, 'config', {}, ((e._complete = function () {
                console.log('_complete config');
            }),
                e));
        };
        API.prototype.setTitle = function (e) {
            _super.prototype.call.call(this, 'setTitle', {
                title: e.title || '',
            }, e);
        };
        API.prototype.backCloseWindow = function (e) {
            _super.prototype.call.call(this, 'backCloseWindow', {}, e);
        };
        API.prototype.closeWindow = function (e) {
            _super.prototype.call.call(this, 'closeWindow', {}, e);
        };
        API.prototype.putLocalStorageKV = function (e) {
            _super.prototype.call.call(this, 'putLocalStorageKV', {
                key: e.key || '',
                value: e.value || '',
            }, e);
        };
        API.prototype.getLocalStorageKV = function (e) {
            _super.prototype.call.call(this, 'getLocalStorageKV', {
                key: e.key || '',
            }, e);
        };
        API.prototype.choosePhotos = function (e) {
            _super.prototype.call.call(this, 'choosePhotos', {
                enableCount: e.enableCount || (e.enableCount == undefined ? 0 : e.enableCount),
            }, e);
        };
        API.prototype.uploadPhotos = function (e) {
            _super.prototype.call.call(this, 'uploadPhotos', {
                nativeResourceUrls: e.nativeResourceUrls || [],
            }, e);
        };
        API.prototype.previewPhotos = function (e) {
            _super.prototype.call.call(this, 'previewPhotos', {
                urls: e.urls || [],
                index: e.index || (e.index == undefined ? 0 : e.index),
            }, e);
        };
        API.prototype.chooseVideos = function (e) {
            _super.prototype.call.call(this, 'chooseVideos', {
                enableCount: e.enableCount || (e.enableCount == undefined ? 0 : e.enableCount),
            }, e);
        };
        API.prototype.uploadVideos = function (e) {
            _super.prototype.call.call(this, 'uploadVideos', {
                nativeResourceUrls: e.nativeResourceUrls || [],
            }, e);
        };
        API.prototype.previewVideo = function (e) {
            _super.prototype.call.call(this, 'previewVideo', {
                url: e.url || '',
            }, e);
        };
        API.prototype.chooseFile = function (e) {
            _super.prototype.call.call(this, 'chooseFile', {
                enableCount: e.enableCount || (e.enableCount == undefined ? 0 : e.enableCount),
                maxSize: e.maxSize || (e.maxSize == undefined ? 0 : e.maxSize),
                isMultiSelect: e.isMultiSelect ||
                    (e.isMultiSelect == undefined ? true : e.isMultiSelect),
            }, e);
        };
        API.prototype.uploadFile = function (e) {
            _super.prototype.call.call(this, 'uploadFile', {
                nativeResourceUrls: e.nativeResourceUrls || [],
            }, e);
        };
        API.prototype.previewFile = function (e) {
            _super.prototype.call.call(this, 'previewFile', {
                url: e.url || '',
            }, e);
        };
        API.prototype.chooseLocation = function (e) {
            _super.prototype.call.call(this, 'chooseLocation', {}, e);
        };
        API.prototype.getLocation = function (e) {
            _super.prototype.call.call(this, 'getLocation', {}, e);
        };
        API.prototype.previewLocation = function (e) {
            _super.prototype.call.call(this, 'previewLocation', {}, e);
        };
        API.prototype.onContainerResume = function (e) {
            _super.prototype.on.call(this, 'onContainerResume', e);
        };
        API.prototype.onContainerPause = function (e) {
            _super.prototype.on.call(this, 'onContainerPause', e);
        };
        API.singleInstance = null;
        return API;
    }(SDK));
    var API$1 = API.getInstance();

    window.jsApi = API$1;

})));
