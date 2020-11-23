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
export default CryptoJS;
