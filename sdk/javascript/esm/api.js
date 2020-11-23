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
import SDK from './sdk';
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
export default API.getInstance();
