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
export default EventEmitter;
