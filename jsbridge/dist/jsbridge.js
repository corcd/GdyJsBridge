(function () {
    'use strict';

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

    var EventEmitter = (function () {
        function EventEmitter() {
            this._callbackId = 1000;
            this._callbacks = {};
            this._events = {};
            this._callbackId = 1000;
            this._events = {};
            this._callbacks = {};
        }
        EventEmitter.prototype.addCallback = function (callback) {
            if (typeof callback !== 'function') {
                console.error('[EventEmitter] Illegal callback functions\n');
                return '';
            }
            console.log(this._callbackId);
            this._callbackId++;
            this._callbacks[String(this._callbackId)] = callback;
            return String(this._callbackId);
        };
        EventEmitter.prototype.triggerCallback = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!id || typeof id !== 'string') {
                console.error('[EventEmitter] Illegal type parameter\n');
                return;
            }
            if (this._callbacks[id]) {
                return this._callbacks[id].apply(this, args) || {};
            }
            return {};
        };
        EventEmitter.prototype.removeCallback = function (id) {
            if (!id || typeof id !== 'string') {
                console.error('[EventEmitter] Illegal type parameter\n');
                return;
            }
            if (this._callbacks[id]) {
                delete this._callbacks[id];
            }
        };
        EventEmitter.prototype.removeAllCallbacks = function () {
            this._callbacks = {};
        };
        EventEmitter.prototype.addListener = function (type, listener) {
            if (!type || typeof type !== 'string') {
                console.error('[EventEmitter] Illegal type parameter\n');
                return;
            }
            if (typeof listener !== 'function') {
                console.error('[EventEmitter] Illegal callback functions\n');
                return;
            }
            if (this._events[type]) {
                if (this._events[type].length >= EventEmitter.MAX_LISTENERS) {
                    console.error('[EventEmitter] The same listener is allowed to listen to up to ten objects, otherwise it may cause memory leaks\n');
                    return;
                }
                this._events[type].push(listener);
            }
            else {
                this._events[type] = [listener];
            }
            console.log(this._events[type]);
            return this._events[type];
        };
        EventEmitter.prototype.emitListener = function (type) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!type || typeof type !== 'string') {
                console.error('[EventEmitter] Illegal type parameter\n');
                return;
            }
            if (this._events[type]) {
                return this._events[type].map(function (fn) { return fn.apply(_this, args) || {}; });
            }
            return [];
        };
        EventEmitter.prototype.removeListener = function (type) {
            if (!type || typeof type !== 'string') {
                console.error('[EventEmitter] Illegal type parameter\n');
                return;
            }
            if (this._events[type]) {
                delete this._events[type];
            }
        };
        EventEmitter.prototype.removeAllListeners = function () {
            this._events = {};
        };
        EventEmitter.MAX_LISTENERS = 10;
        return EventEmitter;
    }());

    var isIOS = function () {
        var reg = /iPhone|iPad|iPod/i;
        if (reg.test(window.navigator.userAgent)) {
            return true;
        }
        return false;
    };

    var CryptoJS = CryptoJS ||
        (function (e, m) {
            var p = {}, j = (p.lib = {}), l = function () { }, f = (j.Base = {
                extend: function (a) {
                    l.prototype = this;
                    var c = new l();
                    a && c.mixIn(a);
                    c.hasOwnProperty('init') ||
                        (c.init = function () {
                            c.$super.init.apply(this, arguments);
                        });
                    c.init.prototype = c;
                    c.$super = this;
                    return c;
                },
                create: function () {
                    var a = this.extend();
                    a.init.apply(a, arguments);
                    return a;
                },
                init: function () { },
                mixIn: function (a) {
                    for (var c in a)
                        a.hasOwnProperty(c) && (this[c] = a[c]);
                    a.hasOwnProperty('toString') && (this.toString = a.toString);
                },
                clone: function () {
                    return this.init.prototype.extend(this);
                },
            }), n = (j.WordArray = f.extend({
                init: function (a, c) {
                    a = this.words = a || [];
                    this.sigBytes = c != m ? c : 4 * a.length;
                },
                toString: function (a) {
                    return (a || h).stringify(this);
                },
                concat: function (a) {
                    var c = this.words, q = a.words, d = this.sigBytes;
                    a = a.sigBytes;
                    this.clamp();
                    if (d % 4)
                        for (var b = 0; b < a; b++)
                            c[(d + b) >>> 2] |=
                                ((q[b >>> 2] >>> (24 - 8 * (b % 4))) & 255) <<
                                    (24 - 8 * ((d + b) % 4));
                    else if (65535 < q.length)
                        for (b = 0; b < a; b += 4)
                            c[(d + b) >>> 2] = q[b >>> 2];
                    else
                        c.push.apply(c, q);
                    this.sigBytes += a;
                    return this;
                },
                clamp: function () {
                    var a = this.words, c = this.sigBytes;
                    a[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4));
                    a.length = e.ceil(c / 4);
                },
                clone: function () {
                    var a = f.clone.call(this);
                    a.words = this.words.slice(0);
                    return a;
                },
                random: function (a) {
                    for (var c = [], b = 0; b < a; b += 4)
                        c.push((4294967296 * e.random()) | 0);
                    return new n.init(c, a);
                },
            })), b = (p.enc = {}), h = (b.Hex = {
                stringify: function (a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var b = [], d = 0; d < a; d++) {
                        var f = (c[d >>> 2] >>> (24 - 8 * (d % 4))) & 255;
                        b.push((f >>> 4).toString(16));
                        b.push((f & 15).toString(16));
                    }
                    return b.join('');
                },
                parse: function (a) {
                    for (var c = a.length, b = [], d = 0; d < c; d += 2)
                        b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << (24 - 4 * (d % 8));
                    return new n.init(b, c / 2);
                },
            }), g = (b.Latin1 = {
                stringify: function (a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var b = [], d = 0; d < a; d++)
                        b.push(String.fromCharCode((c[d >>> 2] >>> (24 - 8 * (d % 4))) & 255));
                    return b.join('');
                },
                parse: function (a) {
                    for (var c = a.length, b = [], d = 0; d < c; d++)
                        b[d >>> 2] |= (a.charCodeAt(d) & 255) << (24 - 8 * (d % 4));
                    return new n.init(b, c);
                },
            }), r = (b.Utf8 = {
                stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(g.stringify(a)));
                    }
                    catch (c) {
                        throw Error('Malformed UTF-8 data');
                    }
                },
                parse: function (a) {
                    return g.parse(unescape(encodeURIComponent(a)));
                },
            }), k = (j.BufferedBlockAlgorithm = f.extend({
                reset: function () {
                    this._data = new n.init();
                    this._nDataBytes = 0;
                },
                _append: function (a) {
                    'string' == typeof a && (a = r.parse(a));
                    this._data.concat(a);
                    this._nDataBytes += a.sigBytes;
                },
                _process: function (a) {
                    var c = this._data, b = c.words, d = c.sigBytes, f = this.blockSize, ht = d / (4 * f), h = a ? e.ceil(ht) : e.max((ht | 0) - this._minBufferSize, 0);
                    a = h * f;
                    d = e.min(4 * a, d);
                    if (a) {
                        for (var g = 0; g < a; g += f)
                            this._doProcessBlock(b, g);
                        g = b.splice(0, a);
                        c.sigBytes -= d;
                    }
                    return new n.init(g, d);
                },
                clone: function () {
                    var a = f.clone.call(this);
                    a._data = this._data.clone();
                    return a;
                },
                _minBufferSize: 0,
            }));
            j.Hasher = k.extend({
                cfg: f.extend(),
                init: function (a) {
                    this.cfg = this.cfg.extend(a);
                    this.reset();
                },
                reset: function () {
                    k.reset.call(this);
                    this._doReset();
                },
                update: function (a) {
                    this._append(a);
                    this._process();
                    return this;
                },
                finalize: function (a) {
                    a && this._append(a);
                    return this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function (a) {
                    return function (c, b) {
                        return new a.init(b).finalize(c);
                    };
                },
                _createHmacHelper: function (a) {
                    return function (b, f) {
                        return new s.HMAC.init(a, f).finalize(b);
                    };
                },
            });
            var s = (p.algo = {});
            return p;
        })(Math);

    var e = CryptoJS, mt = e.lib, p = mt.WordArray, j = mt.Hasher, l = [], m = (e.algo.SHA1 = j.extend({
        _doReset: function () {
            this._hash = new p.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520,
            ]);
        },
        _doProcessBlock: function (f, n) {
            for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                if (16 > a)
                    l[a] = f[n + a] | 0;
                else {
                    var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16];
                    l[a] = (c << 1) | (c >>> 31);
                }
                c = ((h << 5) | (h >>> 27)) + j + l[a];
                c =
                    20 > a
                        ? c + (((g & e) | (~g & k)) + 1518500249)
                        : 40 > a
                            ? c + ((g ^ e ^ k) + 1859775393)
                            : 60 > a
                                ? c + (((g & e) | (g & k) | (e & k)) - 1894007588)
                                : c + ((g ^ e ^ k) - 899497514);
                j = k;
                k = e;
                e = (g << 30) | (g >>> 2);
                g = h;
                h = c;
            }
            b[0] = (b[0] + h) | 0;
            b[1] = (b[1] + g) | 0;
            b[2] = (b[2] + e) | 0;
            b[3] = (b[3] + k) | 0;
            b[4] = (b[4] + j) | 0;
        },
        _doFinalize: function () {
            var f = this._data, e = f.words, b = 8 * this._nDataBytes, h = 8 * f.sigBytes;
            e[h >>> 5] |= 128 << (24 - (h % 32));
            e[(((h + 64) >>> 9) << 4) + 14] = Math.floor(b / 4294967296);
            e[(((h + 64) >>> 9) << 4) + 15] = b;
            f.sigBytes = 4 * e.length;
            this._process();
            return this._hash;
        },
        clone: function () {
            var e = j.clone.call(this);
            e._hash = this._hash.clone();
            return e;
        },
    }));
    e.SHA1 = j._createHelper(m);
    e.HmacSHA1 = j._createHmacHelper(m);
    var SHA1 = e.SHA1;

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

    var _dgtVerifyRandomStr = '${_dgtVerifyRandomStr}';
    var injectStartTime = Date.now();
    var jsBridgeCore = core(_dgtVerifyRandomStr);
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

}());
