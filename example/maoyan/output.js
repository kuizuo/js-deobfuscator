var rohr = function () {
  "use strict";
  var x;
  var e;
  x = function (x, e) {
    var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
    e.assign = function (x) {
      for (var e, a, w = Array.prototype.slice.call(arguments, 1); w.length;) {
        var n = w.shift();
        if (n) {
          if (typeof n !== "object") {
            throw new TypeError(n + "must be non-object");
          }
          for (var c in n) {
            e = n;
            a = c;
            if (Object.prototype.hasOwnProperty.call(e, a)) {
              x[c] = n[c];
            }
          }
        }
      }
      return x;
    };
    e.shrinkBuf = function (x, e) {
      if (x.length === e) {
        return x;
      } else if (x.subarray) {
        return x.subarray(0, e);
      } else {
        x.length = e;
        return x;
      }
    };
    var w = {
      arraySet: function (x, e, a, w, n) {
        if (e.subarray && x.subarray) {
          x.set(e.subarray(a, a + w), n);
        } else {
          for (var c = 0; c < w; c++) {
            x[n + c] = e[a + c];
          }
        }
      },
      flattenChunks: function (x) {
        var w;
        var n;
        var c;
        var r;
        var t;
        var o;
        c = 0;
        w = 0;
        n = x.length;
        for (; w < n; w++) {
          c += x[w].length;
        }
        o = new Uint8Array(c);
        r = 0;
        w = 0;
        n = x.length;
        for (; w < n; w++) {
          t = x[w];
          o.set(t, r);
          r += t.length;
        }
        return o;
      }
    };
    var n = {
      arraySet: function (x, e, a, w, n) {
        for (var c = 0; c < w; c++) {
          x[n + c] = e[a + c];
        }
      },
      flattenChunks: function (x) {
        return [].concat.apply([], x);
      }
    };
    e.setTyped = function (x) {
      if (x) {
        e.Buf8 = Uint8Array;
        e.Buf16 = Uint16Array;
        e.Buf32 = Int32Array;
        e.assign(e, w);
      } else {
        e.Buf8 = Array;
        e.Buf16 = Array;
        e.Buf32 = Array;
        e.assign(e, n);
      }
    };
    e.setTyped(a);
  };
  e = {
    exports: {}
  };
  x(e, e.exports);
  var M = e.exports;
  M.assign;
  M.shrinkBuf;
  M.setTyped;
  M.Buf8;
  M.Buf16;
  M.Buf32;
  var r = 0;
  var t = 1;
  function a(x) {
    for (var e = x.length; --e >= 0;) {
      x[e] = 0;
    }
  }
  var n = 0;
  var o = 29;
  var u = 256;
  var _ = u + 1 + o;
  var i = 30;
  var O = 19;
  var v = _ * 2 + 1;
  var d = 15;
  var w = 16;
  var s = 7;
  var C = 256;
  var D = 16;
  var f = 17;
  var K = 18;
  var q = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var p = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var g = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
  var c = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var h = new Array((_ + 2) * 2);
  a(h);
  var E = new Array(i * 2);
  a(E);
  var k = new Array(512);
  a(k);
  var Q = new Array(256);
  a(Q);
  var l = new Array(o);
  a(l);
  var T;
  var j;
  var H;
  var U = new Array(i);
  function m(x, e, a, w, n) {
    this.static_tree = x;
    this.extra_bits = e;
    this.extra_base = a;
    this.elems = w;
    this.max_length = n;
    this.has_stree = x && x.length;
  }
  function A(x, e) {
    this.dyn_tree = x;
    this.max_code = 0;
    this.stat_desc = e;
  }
  function P(x) {
    if (x < 256) {
      return k[x];
    } else {
      return k[256 + (x >>> 7)];
    }
  }
  function I(x, e) {
    x.pending_buf[x.pending++] = e & 255;
    x.pending_buf[x.pending++] = e >>> 8 & 255;
  }
  function B(x, e, a) {
    if (w - a < x.bi_valid) {
      x.bi_buf |= e << x.bi_valid & 65535;
      I(x, x.bi_buf);
      x.bi_buf = e >> w - x.bi_valid;
      x.bi_valid += a - w;
    } else {
      x.bi_buf |= e << x.bi_valid & 65535;
      x.bi_valid += a;
    }
  }
  function X(x, e, a) {
    B(x, a[e * 2], a[e * 2 + 1]);
  }
  function V(x, e) {
    for (var a = 0; a |= x & 1, x >>>= 1, a <<= 1, --e > 0;);
    return a >>> 1;
  }
  function R(x) {
    if (x.bi_valid === 16) {
      I(x, x.bi_buf);
      x.bi_buf = 0;
      x.bi_valid = 0;
    } else if (x.bi_valid >= 8) {
      x.pending_buf[x.pending++] = x.bi_buf & 255;
      x.bi_buf >>= 8;
      x.bi_valid -= 8;
    }
  }
  function L(x, e) {
    var a;
    var w;
    var n;
    var c;
    var r;
    var t;
    var o = e.dyn_tree;
    var _ = e.max_code;
    var i = e.stat_desc.static_tree;
    var O = e.stat_desc.has_stree;
    var s = e.stat_desc.extra_bits;
    var u = e.stat_desc.extra_base;
    var C = e.stat_desc.max_length;
    var D = 0;
    for (c = 0; c <= d; c++) {
      x.bl_count[c] = 0;
    }
    o[x.heap[x.heap_max] * 2 + 1] = 0;
    a = x.heap_max + 1;
    for (; a < v; a++) {
      w = x.heap[a];
      c = o[o[w * 2 + 1] * 2 + 1] + 1;
      if (C < c) {
        c = C;
        D++;
      }
      o[w * 2 + 1] = c;
      if (!(_ < w)) {
        x.bl_count[c]++;
        r = 0;
        if (u <= w) {
          r = s[w - u];
        }
        t = o[w * 2];
        x.opt_len += t * (c + r);
        if (O) {
          x.static_len += t * (i[w * 2 + 1] + r);
        }
      }
    }
    if (!(D === 0)) {
      do {
        c = C - 1;
        for (; x.bl_count[c] === 0;) {
          c--;
        }
        x.bl_count[c]--;
        x.bl_count[c + 1] += 2;
        x.bl_count[C]--;
        D -= 2;
      } while (D > 0);
      for (c = C; c !== 0; c--) {
        for (w = x.bl_count[c]; w !== 0;) {
          n = x.heap[--a];
          if (!(_ < n)) {
            if (o[n * 2 + 1] !== c) {
              x.opt_len += (c - o[n * 2 + 1]) * o[n * 2];
              o[n * 2 + 1] = c;
            }
            w--;
          }
        }
      }
    }
  }
  function W(x, e, a) {
    var w;
    var n;
    var c = new Array(d + 1);
    var r = 0;
    for (w = 1; w <= d; w++) {
      c[w] = r = r + a[w - 1] << 1;
    }
    for (n = 0; n <= e; n++) {
      var t = x[n * 2 + 1];
      if (!(t === 0)) {
        x[n * 2] = V(c[t]++, t);
      }
    }
  }
  function F(x) {
    var e;
    for (e = 0; e < _; e++) {
      x.dyn_ltree[e * 2] = 0;
    }
    for (e = 0; e < i; e++) {
      x.dyn_dtree[e * 2] = 0;
    }
    for (e = 0; e < O; e++) {
      x.bl_tree[e * 2] = 0;
    }
    x.dyn_ltree[C * 2] = 1;
    x.opt_len = x.static_len = 0;
    x.last_lit = x.matches = 0;
  }
  function y(x) {
    if (x.bi_valid > 8) {
      I(x, x.bi_buf);
    } else if (x.bi_valid > 0) {
      x.pending_buf[x.pending++] = x.bi_buf;
    }
    x.bi_buf = 0;
    x.bi_valid = 0;
  }
  function S(x, e, a, w) {
    y(x);
    if (w) {
      I(x, a);
      I(x, ~a);
    }
    M.arraySet(x.pending_buf, x.window, e, a, x.pending);
    x.pending += a;
  }
  function Y(x, e, a, w) {
    var n = e * 2;
    var c = a * 2;
    return x[n] < x[c] || x[n] === x[c] && w[e] <= w[a];
  }
  function z(x, e, a) {
    for (var w = x.heap[a], n = a << 1; n <= x.heap_len && (n < x.heap_len && Y(e, x.heap[n + 1], x.heap[n], x.depth) && n++, !Y(e, w, x.heap[n], x.depth));) {
      x.heap[a] = x.heap[n];
      a = n;
      n <<= 1;
    }
    x.heap[a] = w;
  }
  function J(x, e, a) {
    var s;
    var t;
    var _ = 0;
    var o;
    var r;
    if (x.last_lit !== 0) {
      do {
        s = x.pending_buf[x.d_buf + _ * 2] << 8 | x.pending_buf[x.d_buf + _ * 2 + 1];
        t = x.pending_buf[x.l_buf + _];
        _++;
        if (s === 0) {
          X(x, t, e);
        } else {
          o = Q[t];
          X(x, o + u + 1, e);
          r = q[o];
          if (r !== 0) {
            t -= l[o];
            B(x, t, r);
          }
          s--;
          o = P(s);
          X(x, o, a);
          r = p[o];
          if (r !== 0) {
            s -= U[o];
            B(x, s, r);
          }
        }
      } while (_ < x.last_lit);
    }
    X(x, C, e);
  }
  function N(x, e) {
    var c = e.dyn_tree;
    var i = e.stat_desc.static_tree;
    var O = e.stat_desc.has_stree;
    var s = e.stat_desc.elems;
    var r;
    var t;
    var o = -1;
    var _;
    x.heap_len = 0;
    x.heap_max = v;
    for (r = 0; r < s; r++) {
      if (c[r * 2] !== 0) {
        x.heap[++x.heap_len] = o = r;
        x.depth[r] = 0;
      } else {
        c[r * 2 + 1] = 0;
      }
    }
    for (; x.heap_len < 2;) {
      _ = x.heap[++x.heap_len] = o < 2 ? ++o : 0;
      c[_ * 2] = 1;
      x.depth[_] = 0;
      x.opt_len--;
      if (O) {
        x.static_len -= i[_ * 2 + 1];
      }
    }
    e.max_code = o;
    for (r = x.heap_len >> 1; r >= 1; r--) {
      z(x, c, r);
    }
    _ = s;
    for (; r = x.heap[1], x.heap[1] = x.heap[x.heap_len--], z(x, c, 1), t = x.heap[1], x.heap[--x.heap_max] = r, x.heap[--x.heap_max] = t, c[_ * 2] = c[r * 2] + c[t * 2], x.depth[_] = (x.depth[t] <= x.depth[r] ? x.depth[r] : x.depth[t]) + 1, c[r * 2 + 1] = c[t * 2 + 1] = _, x.heap[1] = _++, z(x, c, 1), x.heap_len >= 2;);
    x.heap[--x.heap_max] = x.heap[1];
    L(x, e);
    W(c, o, x.bl_count);
  }
  function Z(x, e, a) {
    var w;
    var n;
    var c = -1;
    var r = e[1];
    var t = 0;
    var o = 7;
    var _ = 4;
    if (r === 0) {
      o = 138;
      _ = 3;
    }
    e[(a + 1) * 2 + 1] = 65535;
    w = 0;
    for (; w <= a; w++) {
      n = r;
      r = e[(w + 1) * 2 + 1];
      if (!(++t < o && n === r)) {
        if (t < _) {
          x.bl_tree[n * 2] += t;
        } else if (n !== 0) {
          if (n !== c) {
            x.bl_tree[n * 2]++;
          }
          x.bl_tree[D * 2]++;
        } else if (t <= 10) {
          x.bl_tree[f * 2]++;
        } else {
          x.bl_tree[K * 2]++;
        }
        t = 0;
        c = n;
        if (r === 0) {
          o = 138;
          _ = 3;
        } else if (n === r) {
          o = 6;
          _ = 3;
        } else {
          o = 7;
          _ = 4;
        }
      }
    }
  }
  function G(x, e, a) {
    var w;
    var n;
    var c = -1;
    var r = e[1];
    var t = 0;
    var o = 7;
    var _ = 4;
    if (r === 0) {
      o = 138;
      _ = 3;
    }
    w = 0;
    for (; w <= a; w++) {
      n = r;
      r = e[(w + 1) * 2 + 1];
      if (!(++t < o && n === r)) {
        if (t < _) {
          for (; X(x, n, x.bl_tree), --t !== 0;);
        } else if (n !== 0) {
          if (n !== c) {
            X(x, n, x.bl_tree);
            t--;
          }
          X(x, D, x.bl_tree);
          B(x, t - 3, 2);
        } else if (t <= 10) {
          X(x, f, x.bl_tree);
          B(x, t - 3, 3);
        } else {
          X(x, K, x.bl_tree);
          B(x, t - 11, 7);
        }
        t = 0;
        c = n;
        if (r === 0) {
          o = 138;
          _ = 3;
        } else if (n === r) {
          o = 6;
          _ = 3;
        } else {
          o = 7;
          _ = 4;
        }
      }
    }
  }
  function $(x) {
    var e;
    Z(x, x.dyn_ltree, x.l_desc.max_code);
    Z(x, x.dyn_dtree, x.d_desc.max_code);
    N(x, x.bl_desc);
    e = O - 1;
    for (; e >= 3 && !(x.bl_tree[c[e] * 2 + 1] !== 0); e--);
    x.opt_len += (e + 1) * 3 + 5 + 5 + 4;
    return e;
  }
  function xx(x, e, a, w) {
    var n;
    B(x, e - 257, 5);
    B(x, a - 1, 5);
    B(x, w - 4, 4);
    n = 0;
    for (; n < w; n++) {
      B(x, x.bl_tree[c[n] * 2 + 1], 3);
    }
    G(x, x.dyn_ltree, e - 1);
    G(x, x.dyn_dtree, a - 1);
  }
  function ex(x) {
    var c = 4093624447;
    var n;
    for (n = 0; n <= 31; n++, c >>>= 1) {
      if (c & 1 && x.dyn_ltree[n * 2] !== 0) {
        return r;
      }
    }
    if (x.dyn_ltree[18] !== 0 || x.dyn_ltree[20] !== 0 || x.dyn_ltree[26] !== 0) {
      return t;
    }
    for (n = 32; n < u; n++) {
      if (x.dyn_ltree[n * 2] !== 0) {
        return t;
      }
    }
    return r;
  }
  a(U);
  var ax = false;
  function wx(x, e, a, w) {
    B(x, (n << 1) + (w ? 1 : 0), 3);
    S(x, e, a, true);
  }
  var nx = {
    _tr_init: function (x) {
      if (!ax) {
        (function () {
          var x;
          var e;
          var a;
          var w;
          var n;
          var c = new Array(d + 1);
          for (w = a = 0; w < o - 1; w++) {
            l[w] = a;
            x = 0;
            l[w] = a;
            x = 0;
            for (; x < 1 << q[w]; x++) {
              Q[a++] = w;
            }
          }
          Q[a - 1] = w;
          w = n = 0;
          for (; w < 16; w++) {
            U[w] = n;
            x = 0;
            U[w] = n;
            x = 0;
            for (; x < 1 << p[w]; x++) {
              k[n++] = w;
            }
          }
          for (n >>= 7; w < i; w++) {
            U[w] = n << 7;
            x = 0;
            U[w] = n << 7;
            x = 0;
            for (; x < 1 << p[w] - 7; x++) {
              k[256 + n++] = w;
            }
          }
          for (e = 0; e <= d; e++) {
            c[e] = 0;
          }
          for (x = 0; x <= 143;) {
            h[x * 2 + 1] = 8;
            x++;
            c[8]++;
          }
          for (; x <= 255;) {
            h[x * 2 + 1] = 9;
            x++;
            c[9]++;
          }
          for (; x <= 279;) {
            h[x * 2 + 1] = 7;
            x++;
            c[7]++;
          }
          for (; x <= 287;) {
            h[x * 2 + 1] = 8;
            x++;
            c[8]++;
          }
          W(h, _ + 1, c);
          x = 0;
          for (; x < i; x++) {
            E[x * 2 + 1] = 5;
            E[x * 2] = V(x, 5);
          }
          T = new m(h, q, u + 1, _, d);
          j = new m(E, p, 0, i, d);
          H = new m(new Array(0), g, 0, O, s);
        })();
        ax = true;
      }
      x.l_desc = new A(x.dyn_ltree, T);
      x.d_desc = new A(x.dyn_dtree, j);
      x.bl_desc = new A(x.bl_tree, H);
      x.bi_buf = 0;
      x.bi_valid = 0;
      F(x);
    },
    _tr_stored_block: wx,
    _tr_flush_block: function (x, e, a, w) {
      var n;
      var c;
      var r = 0;
      if (x.level > 0) {
        if (x.strm.data_type === 2) {
          x.strm.data_type = ex(x);
        }
        N(x, x.l_desc);
        N(x, x.d_desc);
        r = $(x);
        n = x.opt_len + 3 + 7 >>> 3;
        c = x.static_len + 3 + 7 >>> 3;
        if (c <= n) {
          n = c;
        }
      } else {
        n = c = a + 5;
      }
      if (a + 4 <= n && e !== -1) {
        wx(x, e, a, w);
      } else if (x.strategy === 4 || c === n) {
        B(x, 2 + (w ? 1 : 0), 3);
        J(x, h, E);
      } else {
        B(x, (2 << 1) + (w ? 1 : 0), 3);
        xx(x, x.l_desc.max_code + 1, x.d_desc.max_code + 1, r + 1);
        J(x, x.dyn_ltree, x.dyn_dtree);
      }
      F(x);
      if (w) {
        y(x);
      }
    },
    _tr_tally: function (x, e, a) {
      x.pending_buf[x.d_buf + x.last_lit * 2] = e >>> 8 & 255;
      x.pending_buf[x.d_buf + x.last_lit * 2 + 1] = e & 255;
      x.pending_buf[x.l_buf + x.last_lit] = a & 255;
      x.last_lit++;
      if (e === 0) {
        x.dyn_ltree[a * 2]++;
      } else {
        x.matches++;
        e--;
        x.dyn_ltree[(Q[a] + u + 1) * 2]++;
        x.dyn_dtree[P(e) * 2]++;
      }
      return x.last_lit === x.lit_bufsize - 1;
    },
    _tr_align: function (x) {
      B(x, 2, 3);
      X(x, C, h);
      R(x);
    }
  };
  function cx(x, e, a, w) {
    for (var n = x & 65535 | 0, c = x >>> 16 & 65535 | 0, r = 0; a !== 0;) {
      r = a > 2000 ? 2000 : a;
      a -= r;
      for (; n = n + e[w++] | 0, c = c + n | 0, --r;);
      n %= 65521;
      c %= 65521;
    }
    return n | c << 16 | 0;
  }
  var rx = function () {
    for (var x, e = [], a = 0; a < 256; a++) {
      x = a;
      for (var w = 0; w < 8; w++) {
        x = x & 1 ? x >>> 1 ^ 3988292384 : x >>> 1;
      }
      e[a] = x;
    }
    return e;
  }();
  var tx;
  function ox(x, e, a, w) {
    var n = rx;
    var c = w + a;
    x ^= -1;
    for (var r = w; r < c; r++) {
      x = x >>> 8 ^ n[(x ^ e[r]) & 255];
    }
    return x ^ -1;
  }
  var _x = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
  var ix = 0;
  var Ox = 4;
  var sx = 0;
  var ux = -2;
  var Cx = -1;
  var Dx = 4;
  var fx = 2;
  var Kx = 8;
  var bx = 9;
  var Mx = 286;
  var vx = 30;
  var dx = 19;
  var qx = Mx * 2 + 1;
  var px = 15;
  var gx = 3;
  var hx = 258;
  var Ex = hx + gx + 1;
  var kx = 42;
  var Qx = 113;
  var lx = 1;
  var Tx = 2;
  var jx = 3;
  var Hx = 4;
  function Ux(x, e) {
    x.msg = _x[e];
    return e;
  }
  function mx(x) {
    return (x << 1) - (x > 4 ? 9 : 0);
  }
  function Ax(x) {
    for (var e = x.length; --e >= 0;) {
      x[e] = 0;
    }
  }
  function Px(x) {
    var e = x.state;
    var a = e.pending;
    if (a > x.avail_out) {
      a = x.avail_out;
    }
    if (a !== 0) {
      M.arraySet(x.output, e.pending_buf, e.pending_out, a, x.next_out);
      x.next_out += a;
      e.pending_out += a;
      x.total_out += a;
      x.avail_out -= a;
      e.pending -= a;
      if (e.pending === 0) {
        e.pending_out = 0;
      }
    }
  }
  function Ix(x, e) {
    nx._tr_flush_block(x, x.block_start >= 0 ? x.block_start : -1, x.strstart - x.block_start, e);
    x.block_start = x.strstart;
    Px(x.strm);
  }
  function Bx(x, e) {
    x.pending_buf[x.pending++] = e;
  }
  function Xx(x, e) {
    x.pending_buf[x.pending++] = e >>> 8 & 255;
    x.pending_buf[x.pending++] = e & 255;
  }
  function Vx(x, e, a, w) {
    var t = x.avail_in;
    if (w < t) {
      t = w;
    }
    if (t === 0) {
      return 0;
    }
    x.avail_in -= t;
    M.arraySet(e, x.input, x.next_in, t, a);
    if (x.state.wrap === 1) {
      x.adler = cx(x.adler, e, t, a);
    } else if (x.state.wrap === 2) {
      x.adler = ox(x.adler, e, t, a);
    }
    x.next_in += t;
    x.total_in += t;
    return t;
  }
  function Rx(x, e) {
    var a;
    var w;
    var n = x.max_chain_length;
    var c = x.strstart;
    var r = x.prev_length;
    var t = x.nice_match;
    var o = x.strstart > x.w_size - Ex ? x.strstart - (x.w_size - Ex) : 0;
    var _ = x.window;
    var i = x.w_mask;
    var O = x.prev;
    var s = x.strstart + hx;
    var u = _[c + r - 1];
    var C = _[c + r];
    if (x.good_match <= x.prev_length) {
      n >>= 2;
    }
    if (x.lookahead < t) {
      t = x.lookahead;
    }
    do {
      if (!(_[(a = e) + r] !== C || _[a + r - 1] !== u || _[a] !== _[c] || _[++a] !== _[c + 1])) {
        c += 2;
        a++;
        do {} while (_[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && c < s);
        w = hx - (s - c);
        c = s - hx;
        if (r < w) {
          x.match_start = e;
          if (t <= (r = w)) {
            break;
          }
          u = _[c + r - 1];
          C = _[c + r];
        }
      }
    } while (o < (e = O[e & i]) && --n !== 0);
    if (r <= x.lookahead) {
      return r;
    } else {
      return x.lookahead;
    }
  }
  function Lx(x) {
    var e;
    var a;
    var w;
    var n;
    var c;
    var r = x.w_size;
    do {
      n = x.window_size - x.lookahead - x.strstart;
      if (r + (r - Ex) <= x.strstart) {
        M.arraySet(x.window, x.window, r, r, 0);
        x.match_start -= r;
        x.strstart -= r;
        x.block_start -= r;
        a = x.hash_size;
        for (; w = x.head[--e], x.head[e] = r <= w ? w - r : 0, --a;);
        a = r;
        e = a;
        for (; w = x.prev[--e], x.prev[e] = r <= w ? w - r : 0, --a;);
        n += r;
      }
      if (x.strm.avail_in === 0) {
        break;
      }
      a = Vx(x.strm, x.window, x.strstart + x.lookahead, n);
      x.lookahead += a;
      if (gx <= x.lookahead + x.insert) {
        c = x.strstart - x.insert;
        x.ins_h = x.window[c];
        x.ins_h = (x.ins_h << x.hash_shift ^ x.window[c + 1]) & x.hash_mask;
        c = x.strstart - x.insert;
        x.ins_h = x.window[c];
        x.ins_h = (x.ins_h << x.hash_shift ^ x.window[c + 1]) & x.hash_mask;
        for (; x.insert && (x.ins_h = (x.ins_h << x.hash_shift ^ x.window[c + gx - 1]) & x.hash_mask, x.prev[c & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = c, c++, x.insert--, !(x.lookahead + x.insert < gx)););
      }
    } while (x.lookahead < Ex && x.strm.avail_in !== 0);
  }
  function Wx(x, e) {
    var a;
    var w;
    for (;;) {
      if (x.lookahead < Ex) {
        Lx(x);
        if (x.lookahead < Ex && e === ix) {
          return lx;
        }
        if (x.lookahead === 0) {
          break;
        }
      }
      a = 0;
      if (x.lookahead >= gx) {
        x.ins_h = (x.ins_h << x.hash_shift ^ x.window[x.strstart + gx - 1]) & x.hash_mask;
        a = x.prev[x.strstart & x.w_mask] = x.head[x.ins_h];
        x.head[x.ins_h] = x.strstart;
      }
      if (a !== 0 && x.strstart - a <= x.w_size - Ex) {
        x.match_length = Rx(x, a);
      }
      if (gx <= x.match_length) {
        w = nx._tr_tally(x, x.strstart - x.match_start, x.match_length - gx);
        x.lookahead -= x.match_length;
        if (x.match_length <= x.max_lazy_match && gx <= x.lookahead) {
          for (x.match_length--; x.strstart++, x.ins_h = (x.ins_h << x.hash_shift ^ x.window[x.strstart + gx - 1]) & x.hash_mask, a = x.prev[x.strstart & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = x.strstart, --x.match_length !== 0;);
          x.strstart++;
        } else {
          x.strstart += x.match_length;
          x.match_length = 0;
          x.ins_h = x.window[x.strstart];
          x.ins_h = (x.ins_h << x.hash_shift ^ x.window[x.strstart + 1]) & x.hash_mask;
        }
      } else {
        w = nx._tr_tally(x, 0, x.window[x.strstart]);
        x.lookahead--;
        x.strstart++;
      }
      if (w && (Ix(x, false), x.strm.avail_out === 0)) {
        return lx;
      }
    }
    x.insert = x.strstart < gx - 1 ? x.strstart : gx - 1;
    if (e === Ox) {
      Ix(x, true);
      if (x.strm.avail_out === 0) {
        return jx;
      } else {
        return Hx;
      }
    } else if (x.last_lit && (Ix(x, false), x.strm.avail_out === 0)) {
      return lx;
    } else {
      return Tx;
    }
  }
  function Fx(x, e) {
    var a;
    var w;
    var n;
    for (;;) {
      if (x.lookahead < Ex) {
        Lx(x);
        if (x.lookahead < Ex && e === ix) {
          return lx;
        }
        if (x.lookahead === 0) {
          break;
        }
      }
      a = 0;
      if (gx <= x.lookahead) {
        x.ins_h = (x.ins_h << x.hash_shift ^ x.window[x.strstart + gx - 1]) & x.hash_mask;
        a = x.prev[x.strstart & x.w_mask] = x.head[x.ins_h];
        x.head[x.ins_h] = x.strstart;
      }
      x.prev_length = x.match_length;
      x.prev_match = x.match_start;
      x.match_length = gx - 1;
      if (a !== 0 && x.prev_length < x.max_lazy_match && x.strstart - a <= x.w_size - Ex) {
        x.match_length = Rx(x, a);
        if (x.match_length <= 5 && (x.strategy === 1 || x.match_length === gx && x.strstart - x.match_start > 4096)) {
          x.match_length = gx - 1;
        }
      }
      if (gx <= x.prev_length && x.match_length <= x.prev_length) {
        n = x.strstart + x.lookahead - gx;
        w = nx._tr_tally(x, x.strstart - 1 - x.prev_match, x.prev_length - gx);
        x.lookahead -= x.prev_length - 1;
        x.prev_length -= 2;
        for (; ++x.strstart <= n && (x.ins_h = (x.ins_h << x.hash_shift ^ x.window[x.strstart + gx - 1]) & x.hash_mask, a = x.prev[x.strstart & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = x.strstart), --x.prev_length != 0;);
        x.match_available = 0;
        x.match_length = gx - 1;
        x.strstart++;
        if (w && (Ix(x, false), x.strm.avail_out === 0)) {
          return lx;
        }
      } else if (x.match_available) {
        if (w = nx._tr_tally(x, 0, x.window[x.strstart - 1])) {
          Ix(x, false);
        }
        x.strstart++;
        x.lookahead--;
        if (x.strm.avail_out === 0) {
          return lx;
        }
      } else {
        x.match_available = 1;
        x.strstart++;
        x.lookahead--;
      }
    }
    if (x.match_available) {
      w = nx._tr_tally(x, 0, x.window[x.strstart - 1]);
      x.match_available = 0;
    }
    x.insert = x.strstart < gx - 1 ? x.strstart : gx - 1;
    if (e === Ox) {
      Ix(x, true);
      if (x.strm.avail_out === 0) {
        return jx;
      } else {
        return Hx;
      }
    } else if (x.last_lit && (Ix(x, false), x.strm.avail_out === 0)) {
      return lx;
    } else {
      return Tx;
    }
  }
  function yx(x, e, a, w, n) {
    this.good_length = x;
    this.max_lazy = e;
    this.nice_length = a;
    this.max_chain = w;
    this.func = n;
  }
  function Sx(x) {
    x.window_size = x.w_size * 2;
    Ax(x.head);
    x.max_lazy_match = tx[x.level].max_lazy;
    x.good_match = tx[x.level].good_length;
    x.nice_match = tx[x.level].nice_length;
    x.max_chain_length = tx[x.level].max_chain;
    x.strstart = 0;
    x.block_start = 0;
    x.lookahead = 0;
    x.insert = 0;
    x.match_length = x.prev_length = gx - 1;
    x.match_available = 0;
    x.ins_h = 0;
  }
  function Yx() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Kx;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new M.Buf16(qx * 2);
    this.dyn_dtree = new M.Buf16((vx * 2 + 1) * 2);
    this.bl_tree = new M.Buf16((dx * 2 + 1) * 2);
    Ax(this.dyn_ltree);
    Ax(this.dyn_dtree);
    Ax(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new M.Buf16(px + 1);
    this.heap = new M.Buf16(Mx * 2 + 1);
    Ax(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new M.Buf16(Mx * 2 + 1);
    Ax(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function zx(x) {
    var n;
    if (!x || !x.state) {
      return Ux(x, ux);
    }
    x.total_in = x.total_out = 0;
    x.data_type = fx;
    n = x.state;
    n.pending = 0;
    n.pending_out = 0;
    if (n.wrap < 0) {
      n.wrap = -n.wrap;
    }
    n.status = n.wrap ? kx : Qx;
    x.adler = n.wrap === 2 ? 0 : 1;
    n.last_flush = ix;
    nx._tr_init(n);
    return sx;
  }
  function Jx(x) {
    var e = zx(x);
    if (e === sx) {
      Sx(x.state);
    }
    return e;
  }
  function Nx(x, e, a, w, n, c) {
    if (!x) {
      return ux;
    }
    var r = 1;
    if (e === Cx) {
      e = 6;
    }
    if (w < 0) {
      r = 0;
      w = -w;
    } else if (w > 15) {
      r = 2;
      w -= 16;
    }
    if (n < 1 || bx < n || a !== Kx || w < 8 || w > 15 || e < 0 || e > 9 || c < 0 || Dx < c) {
      return Ux(x, ux);
    }
    if (w === 8) {
      w = 9;
    }
    var t = new Yx();
    (x.state = t).strm = x;
    t.wrap = r;
    t.gzhead = null;
    t.w_bits = w;
    t.w_size = 1 << t.w_bits;
    t.w_mask = t.w_size - 1;
    t.hash_bits = n + 7;
    t.hash_size = 1 << t.hash_bits;
    t.hash_mask = t.hash_size - 1;
    t.hash_shift = ~~((t.hash_bits + gx - 1) / gx);
    t.window = new M.Buf8(t.w_size * 2);
    t.head = new M.Buf16(t.hash_size);
    t.prev = new M.Buf16(t.w_size);
    t.lit_bufsize = 1 << n + 6;
    t.pending_buf_size = t.lit_bufsize * 4;
    t.pending_buf = new M.Buf8(t.pending_buf_size);
    t.d_buf = t.lit_bufsize * 1;
    t.l_buf = t.lit_bufsize * 3;
    t.level = e;
    t.strategy = c;
    t.method = a;
    return Jx(x);
  }
  tx = [new yx(0, 0, 0, 0, function (x, e) {
    var a = 65535;
    for (x.pending_buf_size - 5 < a && (a = x.pending_buf_size - 5);;) {
      if (x.lookahead <= 1) {
        Lx(x);
        if (x.lookahead === 0 && e === ix) {
          return lx;
        }
        if (x.lookahead === 0) {
          break;
        }
      }
      x.strstart += x.lookahead;
      x.lookahead = 0;
      var w = x.block_start + a;
      if ((x.strstart === 0 || w <= x.strstart) && (x.lookahead = x.strstart - w, x.strstart = w, Ix(x, false), x.strm.avail_out === 0)) {
        return lx;
      }
      if (x.strstart - x.block_start >= x.w_size - Ex && (Ix(x, false), x.strm.avail_out === 0)) {
        return lx;
      }
    }
    x.insert = 0;
    if (e === Ox) {
      Ix(x, true);
      if (x.strm.avail_out === 0) {
        return jx;
      } else {
        return Hx;
      }
    } else {
      if (x.block_start < x.strstart) {
        Ix(x, false);
        x.strm.avail_out === 0;
      }
      return lx;
    }
  }), new yx(4, 4, 8, 4, Wx), new yx(4, 5, 16, 8, Wx), new yx(4, 6, 32, 32, Wx), new yx(4, 4, 16, 16, Fx), new yx(8, 16, 32, 32, Fx), new yx(8, 16, 128, 128, Fx), new yx(8, 32, 128, 256, Fx), new yx(32, 128, 258, 1024, Fx), new yx(32, 258, 258, 4096, Fx)];
  var Zx = {
    deflateInit: function (x, e) {
      return Nx(x, e, Kx, 15, 8, 0);
    },
    deflateInit2: Nx,
    deflateReset: Jx,
    deflateResetKeep: zx,
    deflateSetHeader: function (x, e) {
      if (x && x.state) {
        if (x.state.wrap !== 2) {
          return ux;
        } else {
          x.state.gzhead = e;
          return sx;
        }
      } else {
        return ux;
      }
    },
    deflate: function (x, e) {
      var a;
      var w;
      var n;
      var c;
      if (!x || !x.state || e > 5 || e < 0) {
        if (x) {
          return Ux(x, ux);
        } else {
          return ux;
        }
      }
      w = x.state;
      if (!x.output || !x.input && x.avail_in !== 0 || w.status === 666 && e !== Ox) {
        return Ux(x, x.avail_out === 0 ? -5 : ux);
      }
      w.strm = x;
      a = w.last_flush;
      w.last_flush = e;
      if (w.status === kx) {
        if (w.wrap === 2) {
          x.adler = 0;
          Bx(w, 31);
          Bx(w, 139);
          Bx(w, 8);
          if (w.gzhead) {
            Bx(w, (w.gzhead.text ? 1 : 0) + (w.gzhead.hcrc ? 2 : 0) + (w.gzhead.extra ? 4 : 0) + (w.gzhead.name ? 8 : 0) + (w.gzhead.comment ? 16 : 0));
            Bx(w, w.gzhead.time & 255);
            Bx(w, w.gzhead.time >> 8 & 255);
            Bx(w, w.gzhead.time >> 16 & 255);
            Bx(w, w.gzhead.time >> 24 & 255);
            Bx(w, w.level === 9 ? 2 : w.strategy >= 2 || w.level < 2 ? 4 : 0);
            Bx(w, w.gzhead.os & 255);
            if (w.gzhead.extra && w.gzhead.extra.length) {
              Bx(w, w.gzhead.extra.length & 255);
              Bx(w, w.gzhead.extra.length >> 8 & 255);
            }
            if (w.gzhead.hcrc) {
              x.adler = ox(x.adler, w.pending_buf, w.pending, 0);
            }
            w.gzindex = 0;
            w.status = 69;
          } else {
            Bx(w, 0);
            Bx(w, 0);
            Bx(w, 0);
            Bx(w, 0);
            Bx(w, w.level === 9 ? 2 : w.strategy >= 2 || w.level < 2 ? 4 : 0);
            Bx(w, 3);
            w.status = Qx;
          }
        } else {
          var s = Kx + (w.w_bits - 8 << 4) << 8;
          var u = -1;
          u = w.strategy >= 2 || w.level < 2 ? 0 : w.level < 6 ? 1 : w.level === 6 ? 2 : 3;
          s |= u << 6;
          if (w.strstart !== 0) {
            s |= 32;
          }
          s += 31 - s % 31;
          w.status = Qx;
          Xx(w, s);
          if (w.strstart !== 0) {
            Xx(w, x.adler >>> 16);
            Xx(w, x.adler & 65535);
          }
          x.adler = 1;
        }
      }
      if (w.status === 69) {
        if (w.gzhead.extra) {
          for (n = w.pending; w.gzindex < (w.gzhead.extra.length & 65535) && (!(w.pending === w.pending_buf_size) || (w.gzhead.hcrc && n < w.pending && (x.adler = ox(x.adler, w.pending_buf, w.pending - n, n)), Px(x), n = w.pending, !(w.pending === w.pending_buf_size)));) {
            Bx(w, w.gzhead.extra[w.gzindex] & 255);
            w.gzindex++;
          }
          if (w.gzhead.hcrc && n < w.pending) {
            x.adler = ox(x.adler, w.pending_buf, w.pending - n, n);
          }
          if (w.gzindex === w.gzhead.extra.length) {
            w.gzindex = 0;
            w.status = 73;
          }
        } else {
          w.status = 73;
        }
      }
      if (w.status === 73) {
        if (w.gzhead.name) {
          n = w.pending;
          do {
            if (w.pending === w.pending_buf_size && (w.gzhead.hcrc && n < w.pending && (x.adler = ox(x.adler, w.pending_buf, w.pending - n, n)), Px(x), n = w.pending, w.pending === w.pending_buf_size)) {
              c = 1;
              break;
            }
            Bx(w, c = w.gzindex < w.gzhead.name.length ? w.gzhead.name.charCodeAt(w.gzindex++) & 255 : 0);
          } while (c !== 0);
          if (w.gzhead.hcrc && n < w.pending) {
            x.adler = ox(x.adler, w.pending_buf, w.pending - n, n);
          }
          if (c === 0) {
            w.gzindex = 0;
            w.status = 91;
          }
        } else {
          w.status = 91;
        }
      }
      if (w.status === 91) {
        if (w.gzhead.comment) {
          n = w.pending;
          do {
            if (w.pending === w.pending_buf_size && (w.gzhead.hcrc && n < w.pending && (x.adler = ox(x.adler, w.pending_buf, w.pending - n, n)), Px(x), n = w.pending, w.pending === w.pending_buf_size)) {
              c = 1;
              break;
            }
            c = w.gzindex < w.gzhead.comment.length ? w.gzhead.comment.charCodeAt(w.gzindex++) & 255 : 0;
            Bx(w, c);
          } while (c !== 0);
          if (w.gzhead.hcrc && n < w.pending) {
            x.adler = ox(x.adler, w.pending_buf, w.pending - n, n);
          }
          if (c === 0) {
            w.status = 103;
          }
        } else {
          w.status = 103;
        }
      }
      if (w.status === 103) {
        if (w.gzhead.hcrc) {
          if (w.pending + 2 > w.pending_buf_size) {
            Px(x);
          }
          if (w.pending + 2 <= w.pending_buf_size) {
            Bx(w, x.adler & 255);
            Bx(w, x.adler >> 8 & 255);
            x.adler = 0;
            w.status = Qx;
          }
        } else {
          w.status = Qx;
        }
      }
      if (w.pending !== 0) {
        Px(x);
        if (x.avail_out === 0) {
          w.last_flush = -1;
          return sx;
        }
      } else if (x.avail_in === 0 && mx(e) <= mx(a) && e !== Ox) {
        return Ux(x, -5);
      }
      if (w.status === 666 && x.avail_in !== 0) {
        return Ux(x, -5);
      }
      if (x.avail_in !== 0 || w.lookahead !== 0 || e !== ix && w.status !== 666) {
        var C = w.strategy === 2 ? function (x, e) {
          for (var a;;) {
            if (x.lookahead === 0 && (Lx(x), x.lookahead === 0)) {
              if (e === ix) {
                return lx;
              }
              break;
            }
            x.match_length = 0;
            a = nx._tr_tally(x, 0, x.window[x.strstart]);
            x.lookahead--;
            x.strstart++;
            if (a && (Ix(x, false), x.strm.avail_out === 0)) {
              return lx;
            }
          }
          x.insert = 0;
          if (e === Ox) {
            Ix(x, true);
            if (x.strm.avail_out === 0) {
              return jx;
            } else {
              return Hx;
            }
          } else if (x.last_lit && (Ix(x, false), x.strm.avail_out === 0)) {
            return lx;
          } else {
            return Tx;
          }
        }(w, e) : w.strategy === 3 ? function (x, e) {
          var a;
          var w;
          var n;
          var c;
          var r = x.window;
          for (;;) {
            if (x.lookahead <= hx) {
              Lx(x);
              if (x.lookahead <= hx && e === ix) {
                return lx;
              }
              if (x.lookahead === 0) {
                break;
              }
            }
            x.match_length = 0;
            if (x.lookahead >= gx && x.strstart > 0 && (w = r[n = x.strstart - 1], w === r[++n] && w === r[++n] && w === r[++n])) {
              c = x.strstart + hx;
              do {} while (w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && n < c);
              x.match_length = hx - (c - n);
              if (x.lookahead < x.match_length) {
                x.match_length = x.lookahead;
              }
            }
            if (gx <= x.match_length) {
              a = nx._tr_tally(x, 1, x.match_length - gx);
              x.lookahead -= x.match_length;
              x.strstart += x.match_length;
              x.match_length = 0;
            } else {
              a = nx._tr_tally(x, 0, x.window[x.strstart]);
              x.lookahead--;
              x.strstart++;
            }
            if (a && (Ix(x, false), x.strm.avail_out === 0)) {
              return lx;
            }
          }
          x.insert = 0;
          if (e === Ox) {
            Ix(x, true);
            if (x.strm.avail_out === 0) {
              return jx;
            } else {
              return Hx;
            }
          } else if (x.last_lit && (Ix(x, false), x.strm.avail_out === 0)) {
            return lx;
          } else {
            return Tx;
          }
        }(w, e) : tx[w.level].func(w, e);
        if (C === jx || C === Hx) {
          w.status = 666;
        }
        if (C === lx || C === jx) {
          if (x.avail_out === 0) {
            w.last_flush = -1;
          }
          return sx;
        }
        if (C === Tx && (e === 1 ? nx._tr_align(w) : e !== 5 && (nx._tr_stored_block(w, 0, 0, false), e === 3 && (Ax(w.head), w.lookahead === 0 && (w.strstart = 0, w.block_start = 0, w.insert = 0))), Px(x), x.avail_out === 0)) {
          w.last_flush = -1;
          return sx;
        }
      }
      if (e !== Ox) {
        return sx;
      } else if (w.wrap <= 0) {
        return 1;
      } else {
        if (w.wrap === 2) {
          Bx(w, x.adler & 255);
          Bx(w, x.adler >> 8 & 255);
          Bx(w, x.adler >> 16 & 255);
          Bx(w, x.adler >> 24 & 255);
          Bx(w, x.total_in & 255);
          Bx(w, x.total_in >> 8 & 255);
          Bx(w, x.total_in >> 16 & 255);
          Bx(w, x.total_in >> 24 & 255);
        } else {
          Xx(w, x.adler >>> 16);
          Xx(w, x.adler & 65535);
        }
        Px(x);
        if (w.wrap > 0) {
          w.wrap = -w.wrap;
        }
        if (w.pending !== 0) {
          return sx;
        } else {
          return 1;
        }
      }
    },
    deflateEnd: function (x) {
      var e;
      if (x && x.state) {
        if ((e = x.state.status) !== kx && e !== 69 && e !== 73 && e !== 91 && e !== 103 && e !== Qx && e !== 666) {
          return Ux(x, ux);
        } else {
          x.state = null;
          if (e === Qx) {
            return Ux(x, -3);
          } else {
            return sx;
          }
        }
      } else {
        return ux;
      }
    },
    deflateSetDictionary: function (x, e) {
      var _ = e.length;
      var s;
      var C;
      var D;
      var i;
      var f;
      var K;
      var u;
      var O;
      if (!x || !x.state) {
        return ux;
      }
      s = x.state;
      i = s.wrap;
      if (i === 2 || i === 1 && s.status !== kx || s.lookahead) {
        return ux;
      }
      if (i === 1) {
        x.adler = cx(x.adler, e, _, 0);
      }
      s.wrap = 0;
      if (_ >= s.w_size) {
        if (i === 0) {
          Ax(s.head);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        O = new M.Buf8(s.w_size);
        M.arraySet(O, e, _ - s.w_size, s.w_size, 0);
        e = O;
        _ = s.w_size;
      }
      f = x.avail_in;
      K = x.next_in;
      u = x.input;
      x.avail_in = _;
      x.next_in = 0;
      x.input = e;
      Lx(s);
      for (; gx <= s.lookahead;) {
        C = s.strstart;
        D = s.lookahead - (gx - 1);
        for (; s.ins_h = (s.ins_h << s.hash_shift ^ s.window[C + gx - 1]) & s.hash_mask, s.prev[C & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = C, C++, --D;);
        s.strstart = C;
        s.lookahead = gx - 1;
        Lx(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = gx - 1;
      s.match_available = 0;
      x.next_in = K;
      x.input = u;
      x.avail_in = f;
      s.wrap = i;
      return sx;
    },
    deflateInfo: "pako deflate (from Nodeca project)"
  };
  var Gx = true;
  var $x = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (x) {
    Gx = false;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (x) {
    $x = false;
  }
  for (var xe = new M.Buf8(256), ee = 0; ee < 256; ee++) {
    xe[ee] = ee >= 252 ? 6 : ee >= 248 ? 5 : ee >= 240 ? 4 : ee >= 224 ? 3 : ee >= 192 ? 2 : 1;
  }
  xe[254] = xe[254] = 1;
  function ae(x, e) {
    if (e < 65537 && (x.subarray && $x || !x.subarray && Gx)) {
      return String.fromCharCode.apply(null, M.shrinkBuf(x, e));
    }
    for (var a = "", w = 0; w < e; w++) {
      a += String.fromCharCode(x[w]);
    }
    return a;
  }
  var we = {
    string2buf: function (x) {
      var n;
      var c;
      var r;
      var t;
      var o;
      var _ = x.length;
      var i = 0;
      for (t = 0; t < _; t++) {
        c = x.charCodeAt(t);
        if ((c & 64512) === 55296 && t + 1 < _) {
          r = x.charCodeAt(t + 1);
          if ((r & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (r - 56320);
            t++;
          }
        }
        i += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      n = new M.Buf8(i);
      for (t = o = 0; o < i; t++) {
        c = x.charCodeAt(t);
        if ((c & 64512) === 55296 && t + 1 < _) {
          r = x.charCodeAt(t + 1);
          if ((r & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (r - 56320);
            t++;
          }
        }
        if (c < 128) {
          n[o++] = c;
        } else if (c < 2048) {
          n[o++] = c >>> 6 | 192;
          n[o++] = c & 63 | 128;
        } else if (c < 65536) {
          n[o++] = c >>> 12 | 224;
          n[o++] = c >>> 6 & 63 | 128;
          n[o++] = c & 63 | 128;
        } else {
          n[o++] = c >>> 18 | 240;
          n[o++] = c >>> 12 & 63 | 128;
          n[o++] = c >>> 6 & 63 | 128;
          n[o++] = c & 63 | 128;
        }
      }
      return n;
    },
    buf2binstring: function (x) {
      return ae(x, x.length);
    },
    binstring2buf: function (x) {
      for (var e = new M.Buf8(x.length), a = 0, w = e.length; a < w; a++) {
        e[a] = x.charCodeAt(a);
      }
      return e;
    },
    buf2string: function (x, e) {
      var a;
      var w;
      var n;
      var c;
      var r = e || x.length;
      var t = new Array(r * 2);
      for (a = w = 0; a < r;) {
        n = x[a++];
        if (n < 128) {
          t[w++] = n;
        } else {
          c = xe[n];
          if (c > 4) {
            t[w++] = 65533;
            a += c - 1;
          } else {
            for (n &= c === 2 ? 31 : c === 3 ? 15 : 7; c > 1 && a < r;) {
              n = n << 6 | x[a++] & 63;
              c--;
            }
            if (c > 1) {
              t[w++] = 65533;
            } else if (n < 65536) {
              t[w++] = n;
            } else {
              n -= 65536;
              t[w++] = n >> 10 & 1023 | 55296;
              t[w++] = n & 1023 | 56320;
            }
          }
        }
      }
      return ae(t, w);
    },
    utf8border: function (x, e) {
      var c;
      e = e || x.length;
      if (x.length < e) {
        e = x.length;
      }
      c = e - 1;
      for (; c >= 0 && (x[c] & 192) === 128;) {
        c--;
      }
      if (c < 0) {
        return e;
      }
      if (c === 0) {
        return e;
      }
      if (e < c + xe[x[c]]) {
        return c;
      } else {
        return e;
      }
    }
  };
  function ne() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  var ce = Object.prototype.toString;
  var re = 0;
  var te = -1;
  var oe = 0;
  var _e = 8;
  function ie(x) {
    if (!(this instanceof ie)) {
      return new ie(x);
    }
    this.options = M.assign({
      level: te,
      method: _e,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: oe,
      to: ""
    }, x || {});
    var o = this.options;
    if (o.raw && o.windowBits > 0) {
      o.windowBits = -o.windowBits;
    } else if (o.gzip && o.windowBits > 0 && o.windowBits < 16) {
      o.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ne();
    this.strm.avail_out = 0;
    var n = Zx.deflateInit2(this.strm, o.level, o.method, o.windowBits, o.memLevel, o.strategy);
    if (n !== re) {
      throw new Error(_x[n]);
    }
    if (o.header) {
      Zx.deflateSetHeader(this.strm, o.header);
    }
    if (o.dictionary) {
      var t;
      t = typeof o.dictionary === "string" ? we.string2buf(o.dictionary) : ce.call(o.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(o.dictionary) : o.dictionary;
      n = Zx.deflateSetDictionary(this.strm, t);
      if (n !== re) {
        throw new Error(_x[n]);
      }
      this._dict_set = true;
    }
  }
  ie.prototype.push = function (x, e) {
    var r = this.strm;
    var c = this.options.chunkSize;
    var t;
    var o;
    if (this.ended) {
      return false;
    }
    o = e === ~~e ? e : e === true ? 4 : 0;
    if (typeof x === "string") {
      r.input = we.string2buf(x);
    } else if (ce.call(x) === "[object ArrayBuffer]") {
      r.input = new Uint8Array(x);
    } else {
      r.input = x;
    }
    r.next_in = 0;
    r.avail_in = r.input.length;
    do {
      if (r.avail_out === 0) {
        r.output = new M.Buf8(c);
        r.next_out = 0;
        r.avail_out = c;
      }
      if ((t = Zx.deflate(r, o)) !== 1 && t !== re) {
        this.onEnd(t);
        return !(this.ended = true);
      }
      if (r.avail_out === 0 || r.avail_in === 0 && (o === 4 || o === 2)) {
        if (this.options.to === "string") {
          this.onData(we.buf2binstring(M.shrinkBuf(r.output, r.next_out)));
        } else {
          this.onData(M.shrinkBuf(r.output, r.next_out));
        }
      }
    } while ((r.avail_in > 0 || r.avail_out === 0) && t !== 1);
    if (o === 4) {
      t = Zx.deflateEnd(this.strm);
      this.onEnd(t);
      this.ended = true;
      return t === re;
    }
    if (o === 2) {
      this.onEnd(re);
      return !(r.avail_out = 0);
    }
    return true;
  };
  ie.prototype.onData = function (x) {
    this.chunks.push(x);
  };
  ie.prototype.onEnd = function (x) {
    if (x === re) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = M.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = x;
    this.msg = this.strm.msg;
  };
  function Oe(x, e) {
    var a = new ie(e);
    a.push(x, true);
    if (a.err) {
      throw a.msg || _x[a.err];
    }
    return a.result;
  }
  function se(x, e) {
    return Object.prototype.hasOwnProperty.call(x, e);
  }
  var ue = Array.isArray || function (x) {
    return Object.prototype.toString.call(x) === "[object Array]";
  };
  function Ce(x) {
    switch (typeof x) {
      case "string":
        return x;
      case "boolean":
        if (x) {
          return "true";
        } else {
          return "false";
        }
      case "number":
        if (isFinite(x)) {
          return x;
        } else {
          return "";
        }
      default:
        return "";
    }
  }
  function De(a, w, n, x) {
    w = w || "&";
    n = n || "=";
    if (a === null) {
      a = undefined;
    }
    if (typeof a === "object") {
      return fe(Ke(a), function (x) {
        var e = encodeURIComponent(Ce(x)) + n;
        if (ue(a[x])) {
          return fe(a[x], function (x) {
            return e + encodeURIComponent(Ce(x));
          }).join(w);
        } else {
          return e + encodeURIComponent(Ce(a[x]));
        }
      }).join(w);
    } else if (x) {
      return encodeURIComponent(Ce(x)) + n + encodeURIComponent(Ce(a));
    } else {
      return "";
    }
  }
  function fe(x, e) {
    if (x.map) {
      return x.map(e);
    }
    for (var a = [], w = 0; w < x.length; w++) {
      a.push(e(x[w], w));
    }
    return a;
  }
  var Ke = Object.keys || function (x) {
    var e = [];
    for (var a in x) {
      if (Object.prototype.hasOwnProperty.call(x, a)) {
        e.push(a);
      }
    }
    return e;
  };
  function be(x, e, a, w) {
    e = e || "&";
    a = a || "=";
    var t = {};
    if (typeof x !== "string" || x.length === 0) {
      return t;
    }
    var _ = /\+/g;
    x = x.split(e);
    var K = 1000;
    if (w && typeof w.maxKeys === "number") {
      K = w.maxKeys;
    }
    var o = x.length;
    if (K > 0 && K < o) {
      o = K;
    }
    for (var i = 0; i < o; ++i) {
      var O;
      var s;
      var u;
      var C;
      var D = x[i].replace(_, "%20");
      var f = D.indexOf(a);
      if (f >= 0) {
        O = D.substr(0, f);
        s = D.substr(f + 1);
      } else {
        O = D;
        s = "";
      }
      u = decodeURIComponent(O);
      C = decodeURIComponent(s);
      if (se(t, u)) {
        if (ue(t[u])) {
          t[u].push(C);
        } else {
          t[u] = [t[u], C];
        }
      } else {
        t[u] = C;
      }
    }
    return t;
  }
  var Me = {
    encode: De,
    stringify: De,
    decode: be,
    parse: be
  };
  var ve = {
    filter: function (x, e) {
      var a;
      var w = [];
      for (a = 0; a < x.length; a++) {
        if (e(x[a], a, x)) {
          w.push(x[a]);
        }
      }
      return w;
    },
    forEach: function (x, e) {
      var a;
      for (a = 0; a < x.length; a++) {
        e(x[a], a, x);
      }
    },
    ownKeys: function (x) {
      var e;
      var a = [];
      for (e in x) {
        if (x.hasOwnProperty(e)) {
          a.push(e);
        }
      }
      return a;
    }
  };
  function de(x, e) {
    if ("hasAttribute" in x) {
      return x.hasAttribute(e);
    } else {
      return ve.filter(x.attributes, function (x) {
        return x.nodeName === e;
      }).length > 0;
    }
  }
  function qe(e) {
    return function (x) {
      return x in e;
    };
  }
  function pe(x) {
    return "__webdriverFunc" in x;
  }
  function ge(x) {
    var e = ["webdriver", "_Selenium_IDE_Recorder", "_selenium", "calledSelenium"];
    return ve.filter(e, qe(x)).length > 0;
  }
  function he(x) {
    return x.documentElement && de(x.documentElement, "webdriver");
  }
  function Ee(x) {
    return "__lastWatirAlert" in x || "__lastWatirConfirm" in x || "__lastWatirPrompt" in x;
  }
  function ke(x) {
    return x.webdriver || false;
  }
  function Qe(x) {
    return "webdriver" in x;
  }
  function le(x) {
    var e = false;
    try {
      e = x.cookie.indexOf("ChromeDriverwjers908fljsdf37459fsdfgdfwru=") > -1;
    } catch (x) {}
    return e;
  }
  function Te(x) {
    return "_WEBDRIVER_ELEM_CACHE" in x;
  }
  function je(x) {
    return "__$webdriverAsyncExecutor" in x;
  }
  function He(x) {
    var e;
    var a = [];
    for (e = 0; e < x.length; e++) {
      a.push(x[e]);
    }
    return a;
  }
  function Ue(x) {
    return de(x, "cd_frame_id_");
  }
  function me(x) {
    var e = He(x.getElementsByTagName("iframe"));
    var a = He(x.getElementsByTagName("frame"));
    var w = e.concat(a);
    var n = ve.filter(w, Ue);
    return n.length > 0;
  }
  function Ae(e) {
    var x = ["driver-evaluate", "webdriver-evaluate", "selenium-evaluate", "webdriverCommand", "webdriver-evaluate-response"];
    if (document.addEventListener) {
      ve.forEach(x, function (x) {
        document.addEventListener(x, Pe(x, e), false);
      });
    }
  }
  function Pe(e, a) {
    return function x() {
      a("lwe");
      document.removeEventListener(e, x);
    };
  }
  function Ie(c) {
    var t = 0;
    var o = // TOLOOK
    setInterval(function () {
      var x;
      var e;
      var a = {};
      e = window;
      a.f = "__webdriver_script_fn" in e;
      a.v = le(document);
      x = document;
      a.p = "$cdc_asdjflasutopfhvcZLmcfl_" in x || "$chrome_asyncScriptInfo" in x;
      a.h = Te(window);
      a.l = je(document);
      a.S = me(document);
      for (var w = ve.ownKeys(a), n = 0; n < w.length; n++) {
        if (a[w[n]] === true) {
          clearInterval(o);
          c("lwc" + w[n]);
          break;
        }
      }
      if (++t > 60) {
        clearInterval(o);
      }
    }, 500);
  }
  var Be = {
    getWebdriver: function () {
      if (he(document)) {
        return "dw";
      }
      e = document;
      a = ["webdriver", "__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped"];
      if (ve.filter(a, qe(e)).length > 0) {
        return "de";
      }
      if (ge(document)) {
        return "di";
      }
      if (pe(window)) {
        return "wf";
      }
      x = window;
      if ("domAutomation" in x || "domAutomationController" in x) {
        return "";
      }
      if (Ee(window)) {
        return "wwt";
      }
      if (Qe(window)) {
        return "ww";
      }
      if (ke(navigator)) {
        return "gw";
      }
      return "";
    },
    listenWebdriver: function (x) {
      Ae(x);
      Ie(x);
    }
  };
  var Xe = Object.prototype.toString;
  function Ve(x) {
    var e = Xe.call(x);
    var a = e === "[object Arguments]";
    if (!a) {
      a = e !== "[object Array]" && x !== null && typeof x === "object" && typeof x.length === "number" && x.length >= 0 && Xe.call(x.callee) === "[object Function]";
    }
    return a;
  }
  var Re = Object.prototype.hasOwnProperty;
  var Le = Object.prototype.toString;
  var We = Array.prototype.slice;
  var Fe = Object.prototype.propertyIsEnumerable;
  var ye = !Fe.call({
    toString: null
  }, "toString");
  var Se = Fe.call(function () {}, "prototype");
  var Ye = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
  function ze(x) {
    var e = x.constructor;
    return e && e.prototype === x;
  }
  var Je = {
    $console: true,
    $external: true,
    $frame: true,
    $frameElement: true,
    $frames: true,
    $innerHeight: true,
    $innerWidth: true,
    $outerHeight: true,
    $outerWidth: true,
    $pageXOffset: true,
    $pageYOffset: true,
    $parent: true,
    $scrollLeft: true,
    $scrollTop: true,
    $scrollX: true,
    $scrollY: true,
    $self: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $window: true
  };
  var Ne = function () {
    if (typeof window === "undefined") {
      return false;
    }
    for (var x in window) {
      try {
        if (!Je["$" + x] && Re.call(window, x) && window[x] !== null && typeof window[x] === "object") {
          try {
            ze(window[x]);
          } catch (x) {
            return true;
          }
        }
      } catch (x) {
        return true;
      }
    }
    return false;
  }();
  function Ze(x) {
    if (typeof window === "undefined" || !Ne) {
      return ze(x);
    }
    try {
      return ze(x);
    } catch (x) {
      return false;
    }
  }
  function Ge(x) {
    var c = x !== null && typeof x === "object";
    var r = Le.call(x) === "[object Function]";
    var s = Ve(x);
    var i = c && Le.call(x) === "[object String]";
    var t = [];
    if (!c && !r && !s) {
      throw new TypeError("Object.keys called on a non-object");
    }
    var n = Se && r;
    if (i && x.length > 0 && !Re.call(x, 0)) {
      for (var O = 0; O < x.length; ++O) {
        t.push(String(O));
      }
    }
    if (s && x.length > 0) {
      for (var u = 0; u < x.length; ++u) {
        t.push(String(u));
      }
    } else {
      for (var C in x) {
        if (!(n && C === "prototype" || !Re.call(x, C))) {
          t.push(String(C));
        }
      }
    }
    if (ye) {
      for (var o = Ze(x), _ = 0; _ < Ye.length; ++_) {
        if (!(o && Ye[_] === "constructor" || !Re.call(x, Ye[_]))) {
          t.push(Ye[_]);
        }
      }
    }
    return t;
  }
  Ge.shim = function () {
    if (Object.keys) {
      if (!function () {
        return (Object.keys(arguments) || "").length === 2;
      }(1, 2)) {
        var e = Object.keys;
        Object.keys = function (x) {
          if (Ve(x)) {
            return e(We.call(x));
          } else {
            return e(x);
          }
        };
      }
    } else {
      Object.keys = Ge;
    }
    return Object.keys || Ge;
  };
  var $e = Ge;
  return function () {
    if (!Object.keys) {
      Object.keys = $e;
    }
    if (!Object.values) {
      Object.values = function (x) {
        var e = [];
        if (typeof x === "object") {
          for (var a in x) {
            if (x.hasOwnProperty(a)) {
              e.push(a);
            }
          }
        }
        return e;
      };
    }
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (x) {
        if (typeof this !== "function") {
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var n = Array.prototype.slice.call(arguments, 1);
        var r = this;
        function c() {}
        function t() {
          return r.apply(this instanceof c && x ? this : x, n.concat(Array.prototype.slice.call(arguments)));
        }
        c.prototype = this.prototype;
        t.prototype = new c();
        return t;
      };
    }
    if (typeof Array.prototype.forEach !== "function") {
      Array.prototype.forEach = function (x, e) {
        for (var a = 0; a < this.length; a++) {
          x.apply(e, [this[a], a, this]);
        }
      };
    }
    if (typeof JSON === "undefined") {
      JSON = require("json3");
    }
    var x;
    function c(e) {
      try {
        e = Oe(JSON.stringify(e), {
          to: "string"
        });
      } catch (x) {
        throw new Error(e + " - error:" + x.message);
      }
      try {
        e = btoa(e);
      } catch (x) {
        e = "";
        throw new Error(e + " - error:" + x.message);
      }
      return e;
    }
    function r(a) {
      var w = [];
      Object.keys(a).sort().forEach(function (x, e) {
        if (x !== "token" && x !== "_token") {
          w.push(x + "=" + a[x]);
        }
      });
      w = w.join("&");
      return c(w);
    }
    function u(x) {
      return {
        x: (x = x || window.event).pageX || x.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
        y: x.pageY || x.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
      };
    }
    function e() {
      var x = {
        eJKFz: "1|2|4|3|0"
      }.eJKFz.split("|");
      var e = 0;
      for (;;) {
        switch (x[e++]) {
          case "0":
            return w;
          case "1":
            var a = window.navigator.plugins;
            continue;
          case "2":
            var w = [];
            continue;
          case "3":
            for (c in a) {
              if (a.hasOwnProperty(c)) {
                var n = a[c].name || "";
                w.push(n);
              }
            }
            continue;
          case "4":
            var c;
            continue;
        }
        break;
      }
    }
    function a() {
      var c = window.navigator.userAgent.indexOf("iPhone");
      var n = window.navigator.userAgent.indexOf("TitansX");
      if (c > 0 || n > 0) {
        return "";
      }
      var r = document.createElement("canvas");
      var w = null;
      try {
        w = r.getContext("webgl") || r.getContext("experimental-webgl");
      } catch (x) {}
      if (!w) {
        w = null;
      }
      return w;
    }
    function w() {
      var O = ["monospace", "sans-serif", "serif"];
      var g = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
      var _ = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
      g = g.concat(_);
      g = g.filter(function (x, e) {
        return g.indexOf(x) === e;
      });
      var p = "yodaaaaaaa";
      var u = "72px";
      var f = document.getElementsByTagName("body")[0];
      var c = document.createElement("div");
      var M = document.createElement("div");
      var h = {};
      var r = {};
      function q() {
        var w = document.createElement("span");
        w.style.position = "absolute";
        w.style.left = "-9999px";
        w.style.fontSize = u;
        w.style.fontStyle = "normal";
        w.style.fontWeight = "normal";
        w.style.letterSpacing = "normal";
        w.style.lineBreak = "auto";
        w.style.lineHeight = "normal";
        w.style.textTransform = "none";
        w.style.textAlign = "left";
        w.style.textDecoration = "none";
        w.style.textShadow = "none";
        w.style.whiteSpace = "normal";
        w.style.wordBreak = "normal";
        w.style.wordSpacing = "normal";
        w.innerHTML = p;
        return w;
      }
      function d(x, e) {
        var a = q();
        a.style.fontFamily = "'" + x + "'," + e;
        return a;
      }
      function i() {
        for (var x = [], e = 0, a = O.length; e < a; e++) {
          var w = q();
          w.style.fontFamily = O[e];
          c.appendChild(w);
          x.push(w);
        }
        return x;
      }
      function D() {
        for (var x = {}, e = 0, a = g.length; e < a; e++) {
          for (var w = [], n = 0, c = O.length; n < c; n++) {
            var r = d(g[e], O[n]);
            M.appendChild(r);
            w.push(r);
          }
          x[g[e]] = w;
        }
        return x;
      }
      function b(x) {
        for (var e = false, a = 0; a < O.length; a++) {
          if (e = x[a].offsetWidth !== h[O[a]] || x[a].offsetHeight !== r[O[a]]) {
            return e;
          }
        }
        return e;
      }
      var s = i();
      f.appendChild(c);
      for (var w = 0, n = O.length; w < n; w++) {
        h[O[w]] = s[w].offsetWidth;
        r[O[w]] = s[w].offsetHeight;
      }
      var C = D();
      f.appendChild(M);
      var v = [];
      for (var t = 0, o = g.length; t < o; t++) {
        if (b(C[g[t]])) {
          v.push(g[t]);
        }
      }
      f.removeChild(M);
      f.removeChild(c);
      return v.join(",");
    }
    var C = {
      ver: "1.1.1",
      rId: Rohr_Opt.Flag || "0x00",
      ts: new Date().getTime(),
      cts: new Date().getTime(),
      brVD: [Math.max(document.documentElement.clientWidth, window.innerWidth || 0), Math.max(document.documentElement.clientHeight, window.innerHeight || 0)],
      brR: function () {
        var a = [screen.width, screen.height];
        var c = [screen.availWidth, screen.availHeight];
        var w = screen.colorDepth;
        var n = screen.pixelDepth;
        return [a, c, w, n];
      }(),
      bI: function () {
        var x = document.referrer;
        return [window.location.href, x];
      }(),
      mT: [],
      kT: [],
      aT: [],
      tT: [],
      aM: function () {
        if (window._phantom || window.phantom || window.callPhantom) {
          return "ps";
        } else {
          return Be.getWebdriver();
        }
      }(),
      inputs: [],
      buttons: [],
      broP: e(),
      pSign: c(e()),
      ckE: document.cookie ? "yes" : "",
      fSign: c(w()),
      dnT: function () {
        if (navigator.doNotTrack) {
          return navigator.doNotTrack;
        } else if (navigator.msDoNotTrack) {
          return navigator.msDoNotTrack;
        } else if (window.doNotTrack) {
          return window.doNotTrack;
        } else {
          return "unknown";
        }
      }(),
      cV: function () {
        var x = [];
        var e = document.createElement("canvas");
        e.width = 30;
        e.height = 30;
        e.style.display = "inline";
        var a = e.getContext("2d");
        a.rect(0, 0, 10, 10);
        a.rect(2, 2, 6, 6);
        a.textBaseline = "alphabetic";
        a.fillStyle = "#f60";
        a.fillRect(12, 1, 62, 20);
        a.fillStyle = "#069";
        a.font = "11pt no-real-font-123";
        a.fillText("meituan", 2, 15);
        a.fillStyle = "rgba(102, 204, 0, 0.2)";
        a.font = "18pt Arial";
        a.fillText("mtdp", 4, 45);
        a.globalCompositeOperation = "multiply";
        a.fillStyle = "rgb(255,0,255)";
        a.beginPath();
        a.arc(5, 15, 10, 0, Math.PI * 2, true);
        a.closePath();
        a.fill();
        a.fillStyle = "rgb(0,255,255)";
        a.beginPath();
        a.arc(15, 10, 20, 0, Math.PI * 2, true);
        a.closePath();
        a.fill();
        a.fillStyle = "rgb(255,255,0)";
        a.beginPath();
        a.arc(10, 10, 12, 0, Math.PI * 2, true);
        a.closePath();
        a.fill();
        a.fillStyle = "rgb(255,0,255)";
        a.arc(18, 5, 15, 0, Math.PI * 2, true);
        a.fill("evenodd");
        if (e.toDataURL) {
          x.push(e.toDataURL());
        }
        return x.join("~");
      }(),
      wV: function () {
        var x = a();
        if (x) {
          return x.getParameter(x.VENDOR);
        } else {
          return "";
        }
      }(),
      wR: (x = a(), x ? x.getParameter(x.RENDERER) : ""),
      uA: window.navigator.userAgent,
      ssT: window.sessionStorage ? 1 : 0,
      lsT: function () {
        if (window.localStorage) {
          return 1;
        } else {
          return 0;
        }
      }(),
      loC: function () {
        if (Rohr_Opt && Rohr_Opt.geo && "geolocation" in navigator) {
          var e = new Array();
          try {
            navigator.geolocation.getCurrentPosition(function (x) {
              e.push(x.coords.latitude);
              e.push(x.coords.longitude);
            }, function () {
              e.push(0);
            });
          } catch (x) {
            throw new Error(e + " - error:" + x.message);
          }
          return e;
        }
        return "";
      }()
    };
    new Promise(function (x, e) {
      // TOLOOK
      setTimeout(function () {
        x(w());
      }, 20);
    }).then(function (x) {
      C.fL = x;
    });
    C.bindUserTrackEvent = function () {
      var x = function (x) {
        var r;
        var o;
        var _;
        x = x || window.event;
        if (x.pageX == null && x.clientX !== null) {
          r = x.target && x.target.ownerDocument || document;
          o = r.documentElement;
          _ = r.body;
          x.pageX = x.clientX + (o && o.scrollLeft || _ && _.scrollLeft || 0) - (o && o.clientLeft || _ && _.clientLeft || 0);
          x.pageY = x.clientY + (o && o.scrollTop || _ && _.scrollTop || 0) - (o && o.clientTop || _ && _.clientTop || 0);
        }
        var t = new Date().getTime() - C.ts;
        this.mT.unshift([x.pageX, x.pageY, t].join(","));
        if (this.mT.length > 60) {
          this.mT = this.mT.slice(0, 60);
        }
      }.bind(this);
      var e = function (x) {
        x = x || window.event;
        var r = x.target || x.srcElement;
        var c = typeof x.which === "number" ? x.which : x.keyCode;
        if (c) {
          var n = new Date().getTime() - C.ts;
          this.kT.unshift([String.fromCharCode(c), r.nodeName, n].join(","));
        }
        if (this.kT.length > 30) {
          this.kT = this.kT.slice(0, 30);
        }
      }.bind(this);
      var a = function (x) {
        var r;
        var t;
        var o;
        var _;
        var i;
        if (x.touches[0].clientX !== null) {
          r = x.target && x.target.ownerDocument || document;
          t = r.documentElement;
          o = r.body;
          _ = x.touches[0].clientX + (t && t.scrollLeft || o && o.scrollLeft || 0) - (t && t.clientLeft || o && o.clientLeft || 0);
          i = x.touches[0].clientY + (t && t.scrollTop || o && o.scrollTop || 0) - (t && t.clientTop || o && o.clientTop || 0);
        }
        var O = new Date().getTime() - C.ts;
        this.tT.unshift([_, i, x.touches.length, O].join(","));
        if (this.tT.length > 60) {
          this.tT = this.tT.slice(0, 60);
        }
      }.bind(this);
      var w = function (x) {
        x = x || window.event;
        var c = x.target || x.srcElement;
        var n = new Date().getTime() - C.ts;
        this.aT.unshift([x.clientX, x.clientY, c.nodeName, n].join(","));
        if (this.aT.length > 30) {
          this.aT = this.aT.slice(0, 30);
        }
      }.bind(this);
      function n(x, e, a, w) {
        if (e.addEventListener) {
          e.addEventListener(x, a, w || false);
        } else if (e.attachEvent) {
          e.attachEvent("on" + x, a);
        } else {
          e[x] = a;
        }
      }
      n("mousemove", document, x, true);
      n("keydown", document, e, true);
      n("click", document, w, true);
      if ("ontouchmove" in document) {
        n("touchmove", document, a, true);
      }
      if (C.aM.length === 0) {
        Be.listenWebdriver(function (x) {
          if (x && x.length > 0) {
            C.aM = x;
          }
        });
      }
      var c = function (x) {
        var e = (x = x || window.event).target || x.srcElement;
        if (e.nodeName && e.nodeName === "INPUT") {
          var c = e.name || e.id;
          if (!c) {
            c = e.id = "rohr_" + parseInt(Math.random() * 1000000);
          }
          var r = this.inputs.length;
          for (var n = 0; n < r; n++) {
            if (c === this.inputs[0].inputName) {
              this.inputs.splice(0, 1);
              n = 0;
              r -= 1;
            }
          }
          this.inputs.unshift({
            inputName: c,
            editStartedTimeStamp: new Date().getTime(),
            keyboardEvent: "0-0-0-0"
          });
        }
      }.bind(this);
      var r = function (x) {
        var e = (x = x || window.event).target || x.srcElement;
        if (e.nodeName && e.nodeName === "INPUT" && this.inputs.length > 0) {
          var a = this.inputs[0];
          if (a) {
            var w = a.keyboardEvent.split("-");
            w[2] = 1;
            a.keyboardEvent = w.join("-");
          }
        }
      }.bind(this);
      var t = function (x) {
        var e = (x = x || window.event).target || x.srcElement;
        if (e.nodeName && e.nodeName === "INPUT" && this.inputs.length > 0) {
          var c = this.inputs[0];
          var t = c.keyboardEvent.split("-");
          var o = typeof x.which == "number" ? x.which : x.keyCode;
          if (o === 9) {
            t[0] = 1;
          }
          t[1] = parseInt(t[1]) + 1;
          var n = new Date().getTime();
          if (c.lastTime) {
            var r = c.lastTime;
            t[3] = t[3] + "|" + parseInt(n - r, 36);
          }
          this.inputs[0].lastTime = n;
          this.inputs[0].keyboardEvent = t.join("-");
        }
      }.bind(this);
      var o = function (x) {
        var e = (x = x || window.event).target || x.srcElement;
        if (e.nodeName && e.nodeName === "INPUT" && this.inputs.length > 0) {
          var n = this.inputs[0];
          n.editFinishedTimeStamp = new Date().getTime();
          var c = n.keyboardEvent.split("-");
          if (c[3] != 0) {
            c[3] = c[3].substr(2);
          }
          delete n.lastTime;
          n.keyboardEvent = c.join("-");
        }
      }.bind(this);
      var _ = function (x) {
        var e = (x = x || window.event).target || x.srcElement;
        if (e.nodeName && e.nodeName === "BUTTON") {
          var i = e.name || e.id;
          if (!i) {
            i = e.id = "rohr_" + parseInt(Math.random() * 1000000);
          }
          var n = this.buttons.length;
          for (var c = 0; c < n; c++) {
            if (i === this.buttons[c].buttonName) {
              this.buttons.splice(c, 1);
              c = 0;
              n -= 1;
            }
          }
          var t = u(x);
          var O = e.clientWidth;
          var r = e.clientHeight;
          var o = x.offsetX / O * 1000;
          var _ = (r - x.offsetY) / r * 1000;
          this.buttons.unshift({
            buttonName: i,
            touchPoint: "{" + t.x + "," + t.y + "}",
            touchPosition: "{" + Math.floor(o) / 10 + "," + Math.floor(_) / 10 + "}",
            touchTimeStamp: new Date().getTime()
          });
        }
      }.bind(this);
      n("focus", document, c, true);
      n("mouseout", document, r, true);
      n("keydown", document, t, true);
      n("blur", document, o, true);
      if ("ontouchstart" in document) {
        n("touchstart", document, _, true);
      } else {
        n("click", document, _, true);
      }
    };
    C.reload = function (x) {
      var n = {};
      if (typeof x === "string") {
        n = Me.parse(x.split("?")[1]);
      } else if (typeof x === "object") {
        n = x;
      }
      C.sign = r(n);
      C.cts = new Date().getTime();
      return c(C);
    };
    C.filter = function (x) {
      var e = "";
      if (x) {
        e = c(x + "");
      }
      return e;
    };
    if (typeof window.Rohr_Opt === "object") {
      C.bindUserTrackEvent();
      window.Rohr_Opt.reload = C.reload;
      window.Rohr_Opt.filter = C.filter;
    }
    return {
      reload: C.reload,
      filter: C.filter
    };
  }();
}();