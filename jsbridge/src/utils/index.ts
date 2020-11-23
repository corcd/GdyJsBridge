/*
 * @Author: Whzcorcd
 * @Date: 2020-11-23 09:44:35
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 09:50:59
 * @Description: file content
 */
import CryptoJS from '../libs/crypto'

const e = CryptoJS,
  mt = e.lib,
  p = mt.WordArray,
  j = mt.Hasher,
  l: any[] = [],
  m = (e.algo.SHA1 = j.extend({
    _doReset: function () {
      this._hash = new p.init([
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520,
      ])
    },
    _doProcessBlock: function (f: { [x: string]: number }, n: number) {
      for (
        var b = this._hash.words,
          h = b[0],
          g = b[1],
          e = b[2],
          k = b[3],
          j = b[4],
          a = 0;
        80 > a;
        a++
      ) {
        if (16 > a) l[a] = f[n + a] | 0
        else {
          var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]
          l[a] = (c << 1) | (c >>> 31)
        }
        c = ((h << 5) | (h >>> 27)) + j + l[a]
        c =
          20 > a
            ? c + (((g & e) | (~g & k)) + 1518500249)
            : 40 > a
            ? c + ((g ^ e ^ k) + 1859775393)
            : 60 > a
            ? c + (((g & e) | (g & k) | (e & k)) - 1894007588)
            : c + ((g ^ e ^ k) - 899497514)
        j = k
        k = e
        e = (g << 30) | (g >>> 2)
        g = h
        h = c
      }
      b[0] = (b[0] + h) | 0
      b[1] = (b[1] + g) | 0
      b[2] = (b[2] + e) | 0
      b[3] = (b[3] + k) | 0
      b[4] = (b[4] + j) | 0
    },
    _doFinalize: function () {
      const f = this._data,
        e = f.words,
        b = 8 * this._nDataBytes,
        h = 8 * f.sigBytes
      e[h >>> 5] |= 128 << (24 - (h % 32))
      e[(((h + 64) >>> 9) << 4) + 14] = Math.floor(b / 4294967296)
      e[(((h + 64) >>> 9) << 4) + 15] = b
      f.sigBytes = 4 * e.length
      this._process()
      return this._hash
    },
    clone: function () {
      const e = j.clone.call(this)
      e._hash = this._hash.clone()
      return e
    },
  }))

e.SHA1 = j._createHelper(m)
e.HmacSHA1 = j._createHmacHelper(m)

const SHA1 = e.SHA1
const HmacSHA1 = e.HmacSHA1

export { SHA1, HmacSHA1 }
