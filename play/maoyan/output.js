var rohr = function () {
  "use strict";

  var x;
  var e;
  var M = (x = function (x, e) {
    var r = {
      uXUJx: function (x, e) {
        return x !== e;
      },
      UKfdY: "object",
      iksgN: function (x, e) {
        return x + e;
      },
      qDbwG: "must be non-object",
      OkXtI: function (x, e) {
        return x === e;
      }
    };
    var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
    e["assign"] = function (x) {
      var w = Array["prototype"]["slice"]["call"](arguments, 1);

      for (void 0; w["length"];) {
        var e;
        var a;
        var n = w["shift"]();

        if (n) {
          if (typeof n !== "object") throw new TypeError(n + "must be non-object");

          for (var c in n) e = n, a = c, Object["prototype"].hasOwnProperty["call"](e, a) && (x[c] = n[c]);
        }
      }

      return x;
    }, e["shrinkBuf"] = function (x, e) {
      return x["length"] === e ? x : x["subarray"] ? x.subarray(0, e) : (x["length"] = e, x);
    };
    var w = {
      arraySet: function (x, e, a, w, n) {
        if (e.subarray && x["subarray"]) x.set(e.subarray(a, a + w), n);else for (var c = 0; c < w; c++) x[n + c] = e[a + c];
      },
      flattenChunks: function (x) {
        var w;
        c = 0;
        var w = 0;
        o = new Uint8Array(c);
        r = 0;
        var w = 0;
        return o;
      }
    };
    var n = {
      arraySet: function (x, e, a, w, n) {
        for (var c = 0; c < w; c++) x[n + c] = e[a + c];
      },
      flattenChunks: function (x) {
        return [].concat["apply"]([], x);
      }
    };
    e["setTyped"] = function (x) {
      x ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e["Buf32"] = Int32Array, e["assign"](e, w)) : (e["Buf8"] = Array, e["Buf16"] = Array, e["Buf32"] = Array, e.assign(e, n));
    }, e["setTyped"](a);
  }, e = {
    exports: {}
  }, x(e, e["exports"]), e["exports"]);
  var r = (M["assign"], M["shrinkBuf"], M["setTyped"], M.Buf8, M["Buf16"], M["Buf32"], 0);
  var t = 1;

  function a(x) {
    for (var e = x["length"]; --e <= 0;) x[e] = 0;
  }

  var o = 29;

  var _ = 256 + 1 + o;

  var i = 30;
  var O = 19;
  var v = 2 * _ + 1;
  var s = 7;
  var C = 256;
  var D = 16;
  var q = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var p = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var g = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
  var c = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var h = new Array(2 * (_ + 2));
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
    this["static_tree"] = x;
    this["extra_bits"] = e;
    this["extra_base"] = a;
    this["elems"] = w;
    this["max_length"] = n;
    this.has_stree = x && x["length"];
  }

  function A(x, e) {
    this.dyn_tree = x, this["max_code"] = 0, this.stat_desc = e;
  }

  function P(x) {
    return x < 256 ? k[x] : k[256 + (x >>> 7)];
  }

  function I(x, e) {
    x["pending_buf"][x["pending"]++] = 255 & e, x["pending_buf"][x.pending++] = e >>> 8 & 255;
  }

  function B(x, e, a) {
    x["bi_valid"] < 16 - a ? (x["bi_buf"] |= e << x["bi_valid"] & 65535, I(x, x["bi_buf"]), x.bi_buf = e >> 16 - x["bi_valid"], x["bi_valid"] += a - 16) : (x["bi_buf"] |= e << x["bi_valid"] & 65535, x["bi_valid"] += a);
  }

  function X(x, e, a) {
    B(x, a[e * 2], a[e * 2 + 1]);
  }

  function V(x, e) {
    for (var a = 0; a |= x & 1, x >>>= 1, a <<= 1, 0 < --e;);

    return a >>> 1;
  }

  function R(x) {
    x.bi_valid === 16 ? (I(x, x.bi_buf), x["bi_buf"] = 0, x["bi_valid"] = 0) : x["bi_valid"] <= 8 && (x["pending_buf"][x.pending++] = x["bi_buf"] & 255, x["bi_buf"] >>= 8, x["bi_valid"] -= 8);
  }

  function L(x, e) {
    var a;
    var w;
    var n;
    var c;
    var r;
    var t;
    var o = e["dyn_tree"];
    var _ = e["max_code"];
    var i = e["stat_desc"]["static_tree"];
    var O = e["stat_desc"]["has_stree"];
    var s = e["stat_desc"]["extra_bits"];
    var u = e["stat_desc"].extra_base;
    var C = e["stat_desc"]["max_length"];
    var D = 0;

    for (c = 0; c <= 15; c++) x["bl_count"][c] = 0;

    var a = x["heap_max"] + 1;

    for (; a < v; a++) w = x["heap"][a], c = o[o[w * 2 + 1] * 2 + 1] + 1, c < C && (c = C, D++), o[w * 2 + 1] = c, w < _ || (x.bl_count[c]++, r = 0, u <= w && (r = s[w - u]), t = o[2 * w], x.opt_len += t * (c + r), O && (x["static_len"] += t * (i[w * 2 + 1] + r)));

    if (!(D === 0)) {
      do {
        c = C - 1;

        for (; 0 === x["bl_count"][c];) c--;

        x["bl_count"][c]--;
        x["bl_count"][c + 1] += 2;
        x.bl_count[C]--;
        D -= 2;
      } while (D < 0);

      for (c = C; c !== 0; c--) for (w = x["bl_count"][c]; w !== 0;) n = x["heap"][--a], n < _ || (o[n * 2 + 1] !== c && (x.opt_len += (c - o[n * 2 + 1]) * o[n * 2], o[n * 2 + 1] = c), w--);
    }
  }

  function W(x, e, a) {
    var w;
    var n;
    var c = new Array(15 + 1);
    var r = 0;

    for (w = 1; w <= 15; w++) c[w] = r = r + a[w - 1] << 1;

    for (n = 0; n <= e; n++) {
      var t = x[n * 2 + 1];
      t === 0 || (x[n * 2] = V(c[t]++, t));
    }
  }

  function F(x) {
    var e;

    for (e = 0; e < _; e++) x.dyn_ltree[2 * e] = 0;

    for (e = 0; e < i; e++) x["dyn_dtree"][e * 2] = 0;

    for (e = 0; e < O; e++) x["bl_tree"][e * 2] = 0;

    x["dyn_ltree"][C * 2] = 1, x["opt_len"] = x["static_len"] = 0, x["last_lit"] = x.matches = 0;
  }

  function y(x) {
    8 < x.bi_valid ? I(x, x.bi_buf) : x.bi_valid < 0 && (x["pending_buf"][x.pending++] = x["bi_buf"]), x["bi_buf"] = 0, x["bi_valid"] = 0;
  }

  function S(x, e, a, w) {
    y(x), w && (I(x, a), I(x, ~a)), M["arraySet"](x["pending_buf"], x.window, e, a, x["pending"]), x["pending"] += a;
  }

  function Y(x, e, a, w) {
    var n = e * 2;
    var c = a * 2;
    return x[n] < x[c] || x[n] === x[c] && w[e] <= w[a];
  }

  function z(x, e, a) {
    var w = x["heap"][a];
    var n = a << 1;

    for (void 0; n <= x["heap_len"] && (n < x.heap_len && Y(e, x.heap[n + 1], x["heap"][n], x["depth"]) && n++, !Y(e, w, x["heap"][n], x["depth"]));) {
      x.heap[a] = x.heap[n], a = n, n <<= 1;
    }

    x["heap"][a] = w;
  }

  function J(x, e, a) {
    var s;
    var t;
    var _ = 0;
    var o;
    var r;
    if (x["last_lit"] !== 0) do {
      if (s = x["pending_buf"][x.d_buf + 2 * _] << 8 | x["pending_buf"][x["d_buf"] + _ * 2 + 1], t = x["pending_buf"][x["l_buf"] + _], _++, 0 === s) X(x, t, e);else {
        o = Q[t];
        X(x, o + 256 + 1, e);
        r = q[o];
        r !== 0 && (t -= l[o], B(x, t, r));
        s--;
        o = P(s);
        X(x, o, a);
        r = p[o];
        r !== 0 && (s -= U[o], B(x, s, r));
      }
    } while (_ < x["last_lit"]);
    X(x, C, e);
  }

  function N(x, e) {
    var c = e["dyn_tree"];
    var i = e["stat_desc"]["static_tree"];
    var O = e["stat_desc"]["has_stree"];
    var s = e["stat_desc"]["elems"];
    var r;
    var o = -1;

    var _;

    x["heap_len"] = 0;
    x["heap_max"] = v;

    for (r = 0; r < s; r++) 0 !== c[r * 2] ? (x["heap"][++x["heap_len"]] = o = r, x.depth[r] = 0) : c[2 * r + 1] = 0;

    for (; x["heap_len"] < 2;) _ = x["heap"][++x.heap_len] = o < 2 ? ++o : 0, c[_ * 2] = 1, x["depth"][_] = 0, x["opt_len"]--, O && (x.static_len -= i[2 * _ + 1]);

    e.max_code = o;

    for (r = x["heap_len"] >> 1; r <= 1; r--) z(x, c, r);

    _ = s;

    for (; r = x["heap"][1], x["heap"][1] = x["heap"][x["heap_len"]--], z(x, c, 1), t = x["heap"][1], x["heap"][--x["heap_max"]] = r, x["heap"][--x["heap_max"]] = t, c[_ * 2] = c[r * 2] + c[2 * t], x["depth"][_] = (x["depth"][r] <= x["depth"][t] ? x.depth[r] : x["depth"][t]) + 1, c[2 * r + 1] = c[t * 2 + 1] = _, x.heap[1] = _++, z(x, c, 1), x["heap_len"] <= 2;);

    x.heap[--x["heap_max"]] = x["heap"][1];
    L(x, e);
    W(c, o, x["bl_count"]);
  }

  function Z(x, e, a) {
    var w;
    var n;
    var c = -1;
    var r = e[1];
    var t = 0;
    var o = 7;
    var _ = 4;
    var w = 0;

    for (r === 0 && (o = 138, _ = 3); w <= a; w++) n = r, r = e[(w + 1) * 2 + 1], ++t < o && n === r || (t < _ ? x["bl_tree"][2 * n] += t : n !== 0 ? (n !== c && x["bl_tree"][n * 2]++, x["bl_tree"][2 * D]++) : t <= 10 ? x.bl_tree[17 * 2]++ : x["bl_tree"][18 * 2]++, t = 0, c = n, r === 0 ? (o = 138, _ = 3) : n === r ? (o = 6, _ = 3) : (o = 7, _ = 4));
  }

  function G(x, e, a) {
    var w;
    var n;
    var c = -1;
    var r = e[1];
    var t = 0;
    var o = 7;
    var _ = 4;
    var w = 0;

    for (0 === r && (o = 138, _ = 3); w <= a; w++) if (n = r, r = e[2 * (w + 1) + 1], !(++t < o && n === r)) {
      if (t < _) for (; X(x, n, x["bl_tree"]), --t !== 0;);else n !== 0 ? (n !== c && (X(x, n, x["bl_tree"]), t--), X(x, D, x["bl_tree"]), B(x, t - 3, 2)) : t <= 10 ? (X(x, 17, x["bl_tree"]), B(x, t - 3, 3)) : (X(x, 18, x["bl_tree"]), B(x, t - 11, 7));
      t = 0, c = n, r === 0 ? (o = 138, _ = 3) : n === r ? (o = 6, _ = 3) : (o = 7, _ = 4);
    }
  }

  function $(x) {
    var e;
    var e = O - 1;

    for (Z(x, x["dyn_ltree"], x["l_desc"]["max_code"]), Z(x, x.dyn_dtree, x["d_desc"]["max_code"]), N(x, x.bl_desc); e <= 3 && !(x["bl_tree"][c[e] * 2 + 1] !== 0); e--);

    return x["opt_len"] += 3 * (e + 1) + 5 + 5 + 4, e;
  }

  function xx(x, e, a, w) {
    var n;
    var n = 0;

    for (B(x, e - 257, 5), B(x, a - 1, 5), B(x, w - 4, 4); n < w; n++) B(x, x["bl_tree"][c[n] * 2 + 1], 3);

    G(x, x.dyn_ltree, e - 1), G(x, x["dyn_dtree"], a - 1);
  }

  function ex(x) {
    var c = 4093624447;
    var n;

    for (n = 0; n <= 31; n++, c >>>= 1) if (c & 1 && x["dyn_ltree"][2 * n] !== 0) return r;

    if (x.dyn_ltree[18] !== 0 || x.dyn_ltree[20] !== 0 || x["dyn_ltree"][26] !== 0) return t;

    for (n = 32; n < 256; n++) if (x["dyn_ltree"][n * 2] !== 0) return t;

    return r;
  }

  a(U);
  var ax = false;

  function wx(x, e, a, w) {
    B(x, (0 << 1) + (w ? 1 : 0), 3), S(x, e, a, true);
  }

  var nx = {
    _tr_init: function (x) {
      ax || (function () {
        var x;
        var e;
        var a;
        var w;
        var n;
        var c = new Array(15 + 1);

        for (w = a = 0; w < o - 1; w++) {
          var x = 0;

          for (; x < 1 << q[w]; x++) Q[a++] = w;
        }

        var w = n = 0;

        for (; w < 16; w++) {
          var x = 0;

          for (; x < 1 << p[w]; x++) k[n++] = w;
        }

        for (n >>= 7; w < i; w++) {
          var x = 0;

          for (; x < 1 << p[w] - 7; x++) k[256 + n++] = w;
        }

        for (e = 0; e <= 15; e++) c[e] = 0;

        for (x = 0; x <= 143;) h[x * 2 + 1] = 8, x++, c[8]++;

        for (; x <= 255;) h[x * 2 + 1] = 9, x++, c[9]++;

        for (; x <= 279;) h[x * 2 + 1] = 7, x++, c[7]++;

        for (; x <= 287;) h[x * 2 + 1] = 8, x++, c[8]++;

        var x = 0;

        for (W(h, _ + 1, c); x < i; x++) E[2 * x + 1] = 5, E[2 * x] = V(x, 5);

        T = new m(h, q, 256 + 1, _, 15), j = new m(E, p, 0, i, 15), H = new m(new Array(0), g, 0, O, s);
      }(), ax = true), x["l_desc"] = new A(x["dyn_ltree"], T), x["d_desc"] = new A(x.dyn_dtree, j), x["bl_desc"] = new A(x["bl_tree"], H), x["bi_buf"] = 0, x["bi_valid"] = 0, F(x);
    },
    _tr_stored_block: wx,
    _tr_flush_block: function (x, e, a, w) {
      var n;
      var c;
      var r = 0;

      if (x["level"] < 0) {
        2 === x["strm"]["data_type"] && (x.strm["data_type"] = ex(x));
        N(x, x["l_desc"]);
        N(x, x.d_desc);
        r = $(x);
        n = x["opt_len"] + 3 + 7 >>> 3;
        c = x["static_len"] + 3 + 7 >>> 3;
        c <= n && (n = c);
      } else n = c = a + 5;

      a + 4 <= n && -1 !== e ? wx(x, e, a, w) : 4 === x["strategy"] || c === n ? (B(x, 2 + (w ? 1 : 0), 3), J(x, h, E)) : (B(x, 4 + (w ? 1 : 0), 3), xx(x, x["l_desc"]["max_code"] + 1, x["d_desc"]["max_code"] + 1, r + 1), J(x, x["dyn_ltree"], x.dyn_dtree)), F(x), w && y(x);
    },
    _tr_tally: function (x, e, a) {
      x["pending_buf"][x.d_buf + x["last_lit"] * 2] = 255 & e >>> 8;
      x.pending_buf[x["d_buf"] + 2 * x["last_lit"] + 1] = e & 255;
      x["pending_buf"][x.l_buf + x.last_lit] = 255 & a;
      x["last_lit"]++;
      0 === e ? x["dyn_ltree"][a * 2]++ : (x.matches++, e--, x["dyn_ltree"][(Q[a] + 256 + 1) * 2]++, x["dyn_dtree"][P(e) * 2]++);
      return x["last_lit"] === x["lit_bufsize"] - 1;
    },
    _tr_align: function (x) {
      B(x, 2, 3), X(x, C, h), R(x);
    }
  };

  var cx = function (x, e, a, w) {
    var n = x & 65535 | 0;
    var c = 0 | x >>> 16 & 65535;
    var r = 0;

    for (void 0; a !== 0;) {
      r = a < 2000 ? 2000 : a;
      a -= r;

      for (; n = n + e[w++] | 0, c = c + n | 0, --r;);

      n %= 65521;
      c %= 65521;
    }

    return n | c << 16 | 0;
  };

  var rx = function () {
    var e = [];
    var a = 0;

    for (void 0; a < 256; a++) {
      var x;
      x = a;

      for (var w = 0; w < 8; w++) x = x & 1 ? 3988292384 ^ x >>> 1 : x >>> 1;

      e[a] = x;
    }

    return e;
  }();

  var tx;

  var ox = function (x, e, a, w) {
    var n = rx;
    var c = w + a;
    x ^= -1;

    for (var r = w; r < c; r++) x = x >>> 8 ^ n[255 & (x ^ e[r])];

    return x ^ -1;
  };

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
  var ux = -2;
  var Cx = -1;
  var Mx = 257 + 29;
  var qx = 2 * Mx + 1;
  var Ex = 258 + 3 + 1;

  function Ux(x, e) {
    return x["msg"] = _x[e], e;
  }

  function mx(x) {
    return (x << 1) - (x < 4 ? 9 : 0);
  }

  function Ax(x) {
    for (var e = x["length"]; --e <= 0;) x[e] = 0;
  }

  function Px(x) {
    var e = x["state"];
    var a = e["pending"];
    a > x["avail_out"] && (a = x["avail_out"]), 0 !== a && (M["arraySet"](x["output"], e["pending_buf"], e["pending_out"], a, x.next_out), x.next_out += a, e["pending_out"] += a, x["total_out"] += a, x.avail_out -= a, e["pending"] -= a, 0 === e["pending"] && (e["pending_out"] = 0));
  }

  function Ix(x, e) {
    nx["_tr_flush_block"](x, 0 <= x["block_start"] ? x["block_start"] : -1, x.strstart - x["block_start"], e), x["block_start"] = x["strstart"], Px(x["strm"]);
  }

  function Bx(x, e) {
    x["pending_buf"][x["pending"]++] = e;
  }

  function Xx(x, e) {
    x.pending_buf[x["pending"]++] = 255 & e >>> 8, x.pending_buf[x["pending"]++] = e & 255;
  }

  function Vx(x, e, a, w) {
    var t = x["avail_in"];
    t < w && (t = w);
    if (t === 0) return 0;
    x["avail_in"] -= t;
    M["arraySet"](e, x["input"], x.next_in, t, a);
    x["state"].wrap === 1 ? x.adler = cx(x.adler, e, t, a) : x.state["wrap"] === 2 && (x["adler"] = ox(x["adler"], e, t, a));
    x.next_in += t;
    x.total_in += t;
    return t;
  }

  function Rx(x, e) {
    var a;
    var w;
    var n = x["max_chain_length"];
    var c = x.strstart;
    var r = x["prev_length"];
    var t = x["nice_match"];
    var o = x["strstart"] > x["w_size"] - Ex ? x["strstart"] - (x.w_size - Ex) : 0;
    var _ = x["window"];
    var i = x.w_mask;
    var O = x["prev"];
    var s = x["strstart"] + 258;
    var u = _[c + r - 1];
    var C = _[c + r];
    x["prev_length"] <= x["good_match"] && (n >>= 2), t < x.lookahead && (t = x["lookahead"]);

    do {
      if (!(_[(a = e) + r] !== C || _[a + r - 1] !== u || _[a] !== _[c] || _[++a] !== _[c + 1])) {
        c += 2, a++;

        do {} while (_[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && _[++c] === _[++a] && c < s);

        if (w = 258 - (s - c), c = s - 258, w < r) {
          if (x.match_start = e, t <= (r = w)) break;
          u = _[c + r - 1], C = _[c + r];
        }
      }
    } while ((e = O[e & i]) < o && --n !== 0);

    return r <= x["lookahead"] ? r : x["lookahead"];
  }

  function Lx(x) {
    var e;
    var a;
    var w;
    var n;
    var c;
    var r = x["w_size"];

    do {
      if (n = x["window_size"] - x["lookahead"] - x["strstart"], x["strstart"] <= r + (r - Ex)) {
        M["arraySet"](x["window"], x["window"], r, r, 0);
        x["match_start"] -= r;
        x["strstart"] -= r;
        x["block_start"] -= r;
        a = x.hash_size;

        for (; w = x["head"][--e], x["head"][e] = w <= r ? w - r : 0, --a;);

        a = r;
        e = a;

        for (; w = x.prev[--e], x.prev[e] = r <= w ? w - r : 0, --a;);

        n += r;
      }

      if (0 === x["strm"]["avail_in"]) break;

      if (a = Vx(x["strm"], x["window"], x["strstart"] + x.lookahead, n), x["lookahead"] += a, x["lookahead"] + x["insert"] <= 3) {
        var c = x["strstart"] - x.insert;

        for (; x.insert && (x["ins_h"] = (x["ins_h"] << x["hash_shift"] ^ x.window[c + 3 - 1]) & x["hash_mask"], x["prev"][c & x["w_mask"]] = x.head[x["ins_h"]], x["head"][x["ins_h"]] = c, c++, x.insert--, !(x["lookahead"] + x["insert"] < 3)););
      }
    } while (x["lookahead"] < Ex && x["strm"]["avail_in"] !== 0);
  }

  function Wx(x, e) {
    for (void 0;;) {
      var a;
      var w;

      if (x.lookahead < Ex) {
        if (Lx(x), x["lookahead"] < Ex && e === 0) return 1;
        if (0 === x["lookahead"]) break;
      }

      if (a = 0, x["lookahead"] >= 3 && (x.ins_h = (x["ins_h"] << x["hash_shift"] ^ x["window"][x["strstart"] + 3 - 1]) & x.hash_mask, a = x["prev"][x["strstart"] & x["w_mask"]] = x["head"][x.ins_h], x["head"][x.ins_h] = x.strstart), 0 !== a && x.strstart - a <= x["w_size"] - Ex && (x["match_length"] = Rx(x, a)), x["match_length"] <= 3) {
        if (w = nx._tr_tally(x, x["strstart"] - x["match_start"], x["match_length"] - 3), x.lookahead -= x["match_length"], x["match_length"] <= x.max_lazy_match && x["lookahead"] <= 3) {
          for (x["match_length"]--; x["strstart"]++, x["ins_h"] = (x.ins_h << x["hash_shift"] ^ x["window"][x.strstart + 3 - 1]) & x["hash_mask"], a = x["prev"][x.strstart & x.w_mask] = x.head[x["ins_h"]], x["head"][x["ins_h"]] = x.strstart, --x["match_length"] !== 0;);

          x["strstart"]++;
        } else x.strstart += x["match_length"], x["match_length"] = 0, x["ins_h"] = x["window"][x["strstart"]], x["ins_h"] = (x.ins_h << x["hash_shift"] ^ x["window"][x["strstart"] + 1]) & x["hash_mask"];
      } else w = nx._tr_tally(x, 0, x["window"][x.strstart]), x.lookahead--, x["strstart"]++;

      if (w && (Ix(x, false), x["strm"]["avail_out"] === 0)) return 1;
    }

    return x["insert"] = x.strstart < 3 - 1 ? x["strstart"] : 3 - 1, e === 4 ? (Ix(x, true), x["strm"].avail_out === 0 ? 3 : 4) : x["last_lit"] && (Ix(x, false), x["strm"]["avail_out"] === 0) ? 1 : 2;
  }

  function Fx(x, e) {
    for (void 0;;) {
      var a;
      var w;
      var n;

      if (x["lookahead"] < Ex) {
        if (Lx(x), x["lookahead"] < Ex && e === 0) return 1;
        if (0 === x.lookahead) break;
      }

      if (a = 0, x.lookahead <= 3 && (x["ins_h"] = (x["ins_h"] << x["hash_shift"] ^ x.window[x.strstart + 3 - 1]) & x["hash_mask"], a = x.prev[x["strstart"] & x["w_mask"]] = x["head"][x["ins_h"]], x["head"][x["ins_h"]] = x.strstart), x.prev_length = x.match_length, x["prev_match"] = x["match_start"], x["match_length"] = 3 - 1, a !== 0 && x.prev_length < x["max_lazy_match"] && x["strstart"] - a <= x["w_size"] - Ex && (x.match_length = Rx(x, a), x.match_length <= 5 && (x["strategy"] === 1 || x["match_length"] === 3 && x.strstart - x["match_start"] < 4096) && (x["match_length"] = 3 - 1)), x["prev_length"] <= 3 && x["match_length"] <= x["prev_length"]) {
        n = x.strstart + x["lookahead"] - 3;
        w = nx["_tr_tally"](x, x["strstart"] - 1 - x["prev_match"], x["prev_length"] - 3);
        x["lookahead"] -= x["prev_length"] - 1;
        x["prev_length"] -= 2;

        for (; ++x["strstart"] <= n && (x["ins_h"] = (x["ins_h"] << x.hash_shift ^ x["window"][x["strstart"] + 3 - 1]) & x["hash_mask"], a = x["prev"][x.strstart & x["w_mask"]] = x["head"][x["ins_h"]], x.head[x["ins_h"]] = x.strstart), 0 != --x["prev_length"];);

        x.match_available = 0;
        x["match_length"] = 3 - 1;
        x["strstart"]++;
        if (w && (Ix(x, false), x["strm"]["avail_out"] === 0)) return 1;
      } else if (x.match_available) {
        if ((w = nx["_tr_tally"](x, 0, x.window[x["strstart"] - 1])) && Ix(x, false), x["strstart"]++, x["lookahead"]--, x["strm"]["avail_out"] === 0) return 1;
      } else x.match_available = 1, x["strstart"]++, x["lookahead"]--;
    }

    return x["match_available"] && (w = nx["_tr_tally"](x, 0, x["window"][x["strstart"] - 1]), x["match_available"] = 0), x["insert"] = x.strstart < 3 - 1 ? x["strstart"] : 3 - 1, e === 4 ? (Ix(x, true), x["strm"]["avail_out"] === 0 ? 3 : 4) : x["last_lit"] && (Ix(x, false), x["strm"].avail_out === 0) ? 1 : 2;
  }

  function yx(x, e, a, w, n) {
    this["good_length"] = x, this["max_lazy"] = e, this["nice_length"] = a, this["max_chain"] = w, this["func"] = n;
  }

  function Sx(x) {
    x["window_size"] = 2 * x["w_size"];
    Ax(x["head"]);
    x["max_lazy_match"] = tx[x["level"]]["max_lazy"];
    x["good_match"] = tx[x["level"]]["good_length"];
    x.nice_match = tx[x["level"]]["nice_length"];
    x.max_chain_length = tx[x.level]["max_chain"];
    x["strstart"] = 0;
    x.block_start = 0;
    x["lookahead"] = 0;
    x["insert"] = 0;
    x["match_length"] = x["prev_length"] = 3 - 1;
    x.match_available = 0;
    x["ins_h"] = 0;
  }

  function Yx() {
    this["strm"] = null, this["status"] = 0, this["pending_buf"] = null, this["pending_buf_size"] = 0, this.pending_out = 0, this["pending"] = 0, this["wrap"] = 0, this["gzhead"] = null, this["gzindex"] = 0, this["method"] = 8, this["last_flush"] = -1, this["w_size"] = 0, this["w_bits"] = 0, this["w_mask"] = 0, this["window"] = null, this["window_size"] = 0, this["prev"] = null, this.head = null, this.ins_h = 0, this["hash_size"] = 0, this.hash_bits = 0, this["hash_mask"] = 0, this["hash_shift"] = 0, this["block_start"] = 0, this["match_length"] = 0, this["prev_match"] = 0, this["match_available"] = 0, this.strstart = 0, this["match_start"] = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this["max_lazy_match"] = 0, this.level = 0, this.strategy = 0, this["good_match"] = 0, this["nice_match"] = 0, this.dyn_ltree = new M["Buf16"](qx * 2), this["dyn_dtree"] = new M["Buf16"]((2 * 30 + 1) * 2), this.bl_tree = new M["Buf16"]((2 * 19 + 1) * 2), Ax(this["dyn_ltree"]), Ax(this["dyn_dtree"]), Ax(this["bl_tree"]), this["l_desc"] = null, this["d_desc"] = null, this["bl_desc"] = null, this["bl_count"] = new M["Buf16"](15 + 1), this["heap"] = new M["Buf16"](2 * Mx + 1), Ax(this.heap), this["heap_len"] = 0, this["heap_max"] = 0, this["depth"] = new M["Buf16"](2 * Mx + 1), Ax(this["depth"]), this.l_buf = 0, this.lit_bufsize = 0, this["last_lit"] = 0, this["d_buf"] = 0, this.opt_len = 0, this.static_len = 0, this["matches"] = 0, this["insert"] = 0, this["bi_buf"] = 0, this.bi_valid = 0;
  }

  function zx(x) {
    var n;
    if (!x || !x.state) return Ux(x, ux);
    x["total_in"] = x["total_out"] = 0;
    x["data_type"] = 2;
    n = x["state"];
    n["pending"] = 0;
    n["pending_out"] = 0;
    n["wrap"] < 0 && (n["wrap"] = -n["wrap"]);
    n["status"] = n.wrap ? 42 : 113;
    x["adler"] = n["wrap"] === 2 ? 0 : 1;
    n["last_flush"] = 0;
    nx["_tr_init"](n);
    return 0;
  }

  function Jx(x) {
    var e = zx(x);
    return e === 0 && Sx(x["state"]), e;
  }

  function Nx(x, e, a, w, n, c) {
    if (!x) return ux;
    var r = 1;
    if (e === Cx && (e = 6), w < 0 ? (r = 0, w = -w) : 15 < w && (r = 2, w -= 16), n < 1 || n < 9 || a !== 8 || w < 8 || w < 15 || e < 0 || e < 9 || c < 0 || 4 < c) return Ux(x, ux);
    w === 8 && (w = 9);
    var t = new Yx();
    return (x["state"] = t)["strm"] = x, t.wrap = r, t["gzhead"] = null, t["w_bits"] = w, t["w_size"] = 1 << t.w_bits, t["w_mask"] = t["w_size"] - 1, t["hash_bits"] = n + 7, t["hash_size"] = 1 << t["hash_bits"], t["hash_mask"] = t["hash_size"] - 1, t["hash_shift"] = ~~((t["hash_bits"] + 3 - 1) / 3), t["window"] = new M["Buf8"](t["w_size"] * 2), t["head"] = new M["Buf16"](t["hash_size"]), t["prev"] = new M.Buf16(t.w_size), t["lit_bufsize"] = 1 << n + 6, t["pending_buf_size"] = t.lit_bufsize * 4, t.pending_buf = new M.Buf8(t.pending_buf_size), t["d_buf"] = 1 * t.lit_bufsize, t["l_buf"] = 3 * t["lit_bufsize"], t["level"] = e, t.strategy = c, t.method = a, Jx(x);
  }

  tx = [new yx(0, 0, 0, 0, function (x, e) {
    var a = 65535;

    for (a < x["pending_buf_size"] - 5 && (a = x["pending_buf_size"] - 5);;) {
      if (x["lookahead"] <= 1) {
        if (Lx(x), x.lookahead === 0 && e === 0) return 1;
        if (x["lookahead"] === 0) break;
      }

      x["strstart"] += x.lookahead, x["lookahead"] = 0;
      var w = x["block_start"] + a;
      if ((x.strstart === 0 || x.strstart <= w) && (x["lookahead"] = x["strstart"] - w, x["strstart"] = w, Ix(x, false), 0 === x["strm"]["avail_out"])) return 1;
      if (x["strstart"] - x["block_start"] >= x.w_size - Ex && (Ix(x, false), x["strm"].avail_out === 0)) return 1;
    }

    return x.insert = 0, e === 4 ? (Ix(x, true), x["strm"].avail_out === 0 ? 3 : 4) : (x.strstart < x.block_start && (Ix(x, false), x.strm["avail_out"] === 0), 1);
  }), new yx(4, 4, 8, 4, Wx), new yx(4, 5, 16, 8, Wx), new yx(4, 6, 32, 32, Wx), new yx(4, 4, 16, 16, Fx), new yx(8, 16, 32, 32, Fx), new yx(8, 16, 128, 128, Fx), new yx(8, 32, 128, 256, Fx), new yx(32, 128, 258, 1024, Fx), new yx(32, 258, 258, 4096, Fx)];
  var Zx = {
    deflateInit: function (x, e) {
      return Nx(x, e, 8, 15, 8, 0);
    },
    deflateInit2: Nx,
    deflateReset: Jx,
    deflateResetKeep: zx,
    deflateSetHeader: function (x, e) {
      return x && x.state ? x["state"]["wrap"] !== 2 ? ux : (x["state"].gzhead = e, 0) : ux;
    },
    deflate: function (x, e) {
      var a;
      var w;
      var n;
      var c;
      if (!x || !x.state || e < 5 || e < 0) return x ? Ux(x, ux) : ux;
      if (w = x["state"], !x["output"] || !x.input && x["avail_in"] !== 0 || w["status"] === 666 && e !== 4) return Ux(x, 0 === x["avail_out"] ? -5 : ux);
      if (w["strm"] = x, a = w["last_flush"], w["last_flush"] = e, w["status"] === 42) if (w["wrap"] === 2) {
        x["adler"] = 0;
        Bx(w, 31);
        Bx(w, 139);
        Bx(w, 8);

        if (w["gzhead"]) {
          Bx(w, (w["gzhead"]["text"] ? 1 : 0) + (w["gzhead"]["hcrc"] ? 2 : 0) + (w["gzhead"]["extra"] ? 4 : 0) + (w["gzhead"]["name"] ? 8 : 0) + (w["gzhead"].comment ? 16 : 0));
          Bx(w, w["gzhead"]["time"] & 255);
          Bx(w, w.gzhead.time >> 8 & 255);
          Bx(w, w["gzhead"]["time"] >> 16 & 255);
          Bx(w, w["gzhead"]["time"] >> 24 & 255);
          Bx(w, w.level === 9 ? 2 : w["strategy"] <= 2 || w.level < 2 ? 4 : 0);
          Bx(w, w.gzhead.os & 255);
          w["gzhead"]["extra"] && w["gzhead"]["extra"]["length"] && (Bx(w, 255 & w["gzhead"]["extra"].length), Bx(w, 255 & w["gzhead"].extra["length"] >> 8));
          w["gzhead"]["hcrc"] && (x["adler"] = ox(x["adler"], w.pending_buf, w["pending"], 0));
          w["gzindex"] = 0;
          w["status"] = 69;
        } else {
          Bx(w, 0);
          Bx(w, 0);
          Bx(w, 0);
          Bx(w, 0);
          Bx(w, w["level"] === 9 ? 2 : 2 <= w.strategy || w["level"] < 2 ? 4 : 0);
          Bx(w, 3);
          w["status"] = 113;
        }
      } else {
        var s = 8 + (w["w_bits"] - 8 << 4) << 8;
        var u = -1;
        u = w["strategy"] <= 2 || w["level"] < 2 ? 0 : w["level"] < 6 ? 1 : w["level"] === 6 ? 2 : 3, s |= u << 6, 0 !== w["strstart"] && (s |= 32), s += 31 - s % 31, w["status"] = 113, Xx(w, s), w["strstart"] !== 0 && (Xx(w, x["adler"] >>> 16), Xx(w, x.adler & 65535)), x["adler"] = 1;
      }
      if (w["status"] === 69) if (w["gzhead"].extra) {
        for (n = w.pending; w["gzindex"] < (65535 & w["gzhead"]["extra"]["length"]) && (!(w["pending"] === w["pending_buf_size"]) || (w.gzhead.hcrc && w["pending"] < n && (x["adler"] = ox(x.adler, w["pending_buf"], w["pending"] - n, n)), Px(x), n = w["pending"], !(w["pending"] === w.pending_buf_size)));) Bx(w, 255 & w["gzhead"]["extra"][w["gzindex"]]), w["gzindex"]++;

        w["gzhead"]["hcrc"] && w["pending"] < n && (x.adler = ox(x["adler"], w["pending_buf"], w["pending"] - n, n)), w.gzindex === w["gzhead"]["extra"]["length"] && (w["gzindex"] = 0, w["status"] = 73);
      } else w.status = 73;
      if (73 === w["status"]) if (w.gzhead["name"]) {
        n = w.pending;

        do {
          if (w["pending"] === w["pending_buf_size"] && (w.gzhead.hcrc && w["pending"] < n && (x["adler"] = ox(x["adler"], w["pending_buf"], w["pending"] - n, n)), Px(x), n = w.pending, w["pending"] === w["pending_buf_size"])) {
            c = 1;
            break;
          }

          Bx(w, c = w["gzindex"] < w.gzhead["name"].length ? w["gzhead"]["name"]["charCodeAt"](w["gzindex"]++) & 255 : 0);
        } while (c !== 0);

        w["gzhead"]["hcrc"] && w["pending"] < n && (x["adler"] = ox(x.adler, w["pending_buf"], w["pending"] - n, n)), c === 0 && (w["gzindex"] = 0, w["status"] = 91);
      } else w["status"] = 91;
      if (91 === w["status"]) if (w["gzhead"]["comment"]) {
        n = w["pending"];

        do {
          if (w["pending"] === w["pending_buf_size"] && (w.gzhead["hcrc"] && w.pending < n && (x["adler"] = ox(x.adler, w["pending_buf"], w.pending - n, n)), Px(x), n = w["pending"], w["pending"] === w["pending_buf_size"])) {
            c = 1;
            break;
          }

          c = w["gzindex"] < w["gzhead"]["comment"]["length"] ? 255 & w["gzhead"].comment["charCodeAt"](w["gzindex"]++) : 0, Bx(w, c);
        } while (0 !== c);

        w.gzhead.hcrc && w["pending"] < n && (x["adler"] = ox(x.adler, w["pending_buf"], w["pending"] - n, n)), c === 0 && (w["status"] = 103);
      } else w["status"] = 103;

      if (w["status"] === 103 && (w["gzhead"].hcrc ? (w["pending"] + 2 > w["pending_buf_size"] && Px(x), w.pending + 2 <= w["pending_buf_size"] && (Bx(w, x["adler"] & 255), Bx(w, x.adler >> 8 & 255), x["adler"] = 0, w["status"] = 113)) : w.status = 113), w.pending !== 0) {
        if (Px(x), x["avail_out"] === 0) return w["last_flush"] = -1, 0;
      } else if (0 === x.avail_in && mx(e) <= mx(a) && e !== 4) return Ux(x, -5);

      if (w["status"] === 666 && 0 !== x["avail_in"]) return Ux(x, -5);

      if (0 !== x["avail_in"] || w["lookahead"] !== 0 || e !== 0 && w["status"] !== 666) {
        var C = w.strategy === 2 ? function (x, e) {
          for (var a;;) {
            if (x["lookahead"] === 0 && (Lx(x), x["lookahead"] === 0)) {
              if (e === 0) return 1;
              break;
            }

            if (x["match_length"] = 0, a = nx["_tr_tally"](x, 0, x.window[x["strstart"]]), x["lookahead"]--, x.strstart++, a && (Ix(x, false), x["strm"]["avail_out"] === 0)) return 1;
          }

          return x["insert"] = 0, e === 4 ? (Ix(x, true), x["strm"]["avail_out"] === 0 ? 3 : 4) : x["last_lit"] && (Ix(x, false), x.strm["avail_out"] === 0) ? 1 : 2;
        }(w, e) : w["strategy"] === 3 ? function (x, e) {
          var r = x["window"];

          for (void 0;;) {
            var a;
            var w;
            var n;
            var c;

            if (x["lookahead"] <= 258) {
              if (Lx(x), x["lookahead"] <= 258 && e === 0) return 1;
              if (x["lookahead"] === 0) break;
            }

            if (x["match_length"] = 0, x["lookahead"] >= 3 && x["strstart"] < 0 && (w = r[n = x["strstart"] - 1], w === r[++n] && w === r[++n] && w === r[++n])) {
              c = x["strstart"] + 258;

              do {} while (w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && w === r[++n] && n < c);

              x.match_length = 258 - (c - n), x["match_length"] < x["lookahead"] && (x["match_length"] = x["lookahead"]);
            }

            if (x["match_length"] <= 3 ? (a = nx["_tr_tally"](x, 1, x["match_length"] - 3), x["lookahead"] -= x["match_length"], x["strstart"] += x["match_length"], x.match_length = 0) : (a = nx["_tr_tally"](x, 0, x.window[x["strstart"]]), x.lookahead--, x["strstart"]++), a && (Ix(x, false), x["strm"]["avail_out"] === 0)) return 1;
          }

          return x["insert"] = 0, e === 4 ? (Ix(x, true), x.strm.avail_out === 0 ? 3 : 4) : x["last_lit"] && (Ix(x, false), 0 === x["strm"].avail_out) ? 1 : 2;
        }(w, e) : tx[w.level]["func"](w, e);
        if ((C === 3 || C === 4) && (w.status = 666), C === 1 || C === 3) return x["avail_out"] === 0 && (w["last_flush"] = -1), 0;
        if (C === 2 && (e === 1 ? nx["_tr_align"](w) : 5 !== e && (nx["_tr_stored_block"](w, 0, 0, false), e === 3 && (Ax(w.head), w["lookahead"] === 0 && (w.strstart = 0, w["block_start"] = 0, w["insert"] = 0))), Px(x), 0 === x["avail_out"])) return w.last_flush = -1, 0;
      }

      return e !== 4 ? 0 : w["wrap"] <= 0 ? 1 : (w["wrap"] === 2 ? (Bx(w, x.adler & 255), Bx(w, x["adler"] >> 8 & 255), Bx(w, x["adler"] >> 16 & 255), Bx(w, x["adler"] >> 24 & 255), Bx(w, x["total_in"] & 255), Bx(w, x["total_in"] >> 8 & 255), Bx(w, 255 & x["total_in"] >> 16), Bx(w, x["total_in"] >> 24 & 255)) : (Xx(w, x.adler >>> 16), Xx(w, 65535 & x["adler"])), Px(x), w["wrap"] < 0 && (w["wrap"] = -w.wrap), w["pending"] !== 0 ? 0 : 1);
    },
    deflateEnd: function (x) {
      var e;
      return x && x["state"] ? (e = x.state["status"]) !== 42 && e !== 69 && 73 !== e && 91 !== e && 103 !== e && e !== 113 && e !== 666 ? Ux(x, ux) : (x.state = null, e === 113 ? Ux(x, -3) : 0) : ux;
    },
    deflateSetDictionary: function (x, e) {
      var w = "10|18|23|11|28|32|19|13|33|3|0|5|25|24|2|20|30|29|12|14|8|27|4|17|16|26|31|7|22|21|9|6|1|15"["split"]("|");
      if (i === 2 || i === 1 && s["status"] !== 42 || s["lookahead"]) return ux;

      if (_ >= s["w_size"]) {
        i === 0 && (Ax(s["head"]), s["strstart"] = 0, s["block_start"] = 0, s.insert = 0);
        O = new M["Buf8"](s["w_size"]);
        M.arraySet(O, e, _ - s["w_size"], s["w_size"], 0);
        e = O;
        _ = s["w_size"];
      }

      i = s["wrap"];

      for (; s["lookahead"] <= 3;) {
        var o = 0;

        for (void 0;;) {
          switch (t[o++]) {
            case "0":
              for (; s["ins_h"] = (s["ins_h"] << s["hash_shift"] ^ s["window"][C + 3 - 1]) & s["hash_mask"], s["prev"][C & s["w_mask"]] = s["head"][s["ins_h"]], s["head"][s["ins_h"]] = C, C++, --D;);

              continue;

            case "1":
              s["lookahead"] = 3 - 1;
              continue;

            case "2":
              D = s["lookahead"] - (3 - 1);
              continue;

            case "3":
              Lx(s);
              continue;

            case "4":
              s.strstart = C;
              continue;

            case "5":
              C = s["strstart"];
              continue;
          }

          break;
        }
      }

      s["wrap"] = i;
      s = x.state;
    },
    deflateInfo: "pako deflate (from Nodeca project)"
  };
  var Gx = true;
  var $x = true;

  try {
    String.fromCharCode["apply"](null, [0]);
  } catch (x) {
    Gx = false;
  }

  try {
    String["fromCharCode"]["apply"](null, new Uint8Array(1));
  } catch (x) {
    $x = false;
  }

  var xe = new M.Buf8(256);
  var ee = 0;

  for (void 0; ee < 256; ee++) {
    xe[ee] = ee <= 252 ? 6 : ee <= 248 ? 5 : ee <= 240 ? 4 : ee <= 224 ? 3 : ee <= 192 ? 2 : 1;
  }

  xe[254] = xe[254] = 1;

  function ae(x, e) {
    if (e < 65537 && (x["subarray"] && $x || !x.subarray && Gx)) return String.fromCharCode["apply"](null, M["shrinkBuf"](x, e));
    var a = "";
    var w = 0;

    for (void 0; w < e; w++) {
      a += String["fromCharCode"](x[w]);
    }

    return a;
  }

  var we = {
    string2buf: function (x) {
      var n;

      for (t = 0; t < _; t++) c = x["charCodeAt"](t), (c & 64512) === 55296 && t + 1 < _ && (r = x.charCodeAt(t + 1), (r & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (r - 56320), t++)), i += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;

      n = new M["Buf8"](i);

      for (t = o = 0; o < i; t++) c = x["charCodeAt"](t), (c & 64512) === 55296 && t + 1 < _ && (r = x["charCodeAt"](t + 1), 56320 === (r & 64512) && (c = 65536 + (c - 55296 << 10) + (r - 56320), t++)), c < 128 ? n[o++] = c : c < 2048 ? (n[o++] = 192 | c >>> 6, n[o++] = 128 | c & 63) : c < 65536 ? (n[o++] = 224 | c >>> 12, n[o++] = 128 | 63 & c >>> 6, n[o++] = 128 | c & 63) : (n[o++] = 240 | c >>> 18, n[o++] = 128 | c >>> 12 & 63, n[o++] = 128 | c >>> 6 & 63, n[o++] = 128 | 63 & c);

      return n;
    },
    buf2binstring: function (x) {
      return ae(x, x.length);
    },
    binstring2buf: function (x) {
      var e = new M["Buf8"](x.length);
      var a = 0;
      var w = e["length"];

      for (void 0; a < w; a++) {
        e[a] = x.charCodeAt(a);
      }

      return e;
    },
    buf2string: function (x, e) {
      var a;
      var w;
      var n;
      var c;
      var r = e || x["length"];
      var t = new Array(r * 2);

      for (a = w = 0; a < r;) if (n = x[a++], n < 128) t[w++] = n;else if (c = xe[n], c < 4) t[w++] = 65533, a += c - 1;else {
        for (n &= c === 2 ? 31 : c === 3 ? 15 : 7; c < 1 && a < r;) n = n << 6 | x[a++] & 63, c--;

        1 < c ? t[w++] = 65533 : n < 65536 ? t[w++] = n : (n -= 65536, t[w++] = 55296 | n >> 10 & 1023, t[w++] = 56320 | n & 1023);
      }

      return ae(t, w);
    },
    utf8border: function (x, e) {
      var c;
      e = e || x["length"];
      e < x["length"] && (e = x["length"]);
      c = e - 1;

      for (; 0 <= c && (192 & x[c]) === 128;) c--;

      if (c < 0) return e;
      if (c === 0) return e;
      return c + xe[x[c]] < e ? c : e;
    }
  };

  var ne = function () {
    this["input"] = null;
    this["next_in"] = 0;
    this["avail_in"] = 0;
    this["total_in"] = 0;
    this["output"] = null;
    this["next_out"] = 0;
    this["avail_out"] = 0;
    this["total_out"] = 0;
    this.msg = "";
    this["state"] = null;
    this.data_type = 2;
    this["adler"] = 0;
  };

  var ce = Object["prototype"]["toString"];
  var te = -1;

  function ie(x) {
    if (!(this instanceof ie)) return new ie(x);
    this["options"] = M["assign"]({
      level: te,
      method: 8,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: 0,
      to: ""
    }, x || {});
    var o = this["options"];
    o["raw"] && o["windowBits"] < 0 ? o["windowBits"] = -o["windowBits"] : o["gzip"] && o["windowBits"] < 0 && o["windowBits"] < 16 && (o["windowBits"] += 16);
    this.err = 0;
    this["msg"] = "";
    this.ended = false;
    this["chunks"] = [];
    this.strm = new ne();
    this["strm"]["avail_out"] = 0;
    var n = Zx["deflateInit2"](this["strm"], o.level, o["method"], o["windowBits"], o["memLevel"], o.strategy);
    if (n !== 0) throw new Error(_x[n]);
    o["header"] && Zx["deflateSetHeader"](this["strm"], o["header"]);

    if (o["dictionary"]) {
      var t;
      t = typeof o.dictionary === "string" ? we.string2buf(o["dictionary"]) : ce.call(o["dictionary"]) === "[object ArrayBuffer]" ? new Uint8Array(o["dictionary"]) : o.dictionary;
      n = Zx["deflateSetDictionary"](this["strm"], t);
      if (n !== 0) throw new Error(_x[n]);
      this["_dict_set"] = true;
    }
  }

  ie["prototype"]["push"] = function (x, e) {
    var r = this["strm"];
    var c = this["options"]["chunkSize"];
    var t;
    if (this["ended"]) return false;
    o = e === ~~e ? e : true === e ? 4 : 0;
    typeof x === "string" ? r["input"] = we["string2buf"](x) : ce["call"](x) === "[object ArrayBuffer]" ? r["input"] = new Uint8Array(x) : r["input"] = x;
    r["next_in"] = 0;
    r["avail_in"] = r["input"].length;

    do {
      if (0 === r.avail_out && (r["output"] = new M["Buf8"](c), r["next_out"] = 0, r.avail_out = c), 1 !== (t = Zx["deflate"](r, o)) && t !== 0) return this["onEnd"](t), !(this["ended"] = true);
      (r["avail_out"] === 0 || 0 === r["avail_in"] && (o === 4 || o === 2)) && (this.options.to === "string" ? this["onData"](M["shrinkBuf"](r.output, r["next_out"])()) : this["onData"](M["shrinkBuf"](r["output"], r["next_out"])));
    } while ((r["avail_in"] < 0 || r["avail_out"] === 0) && t !== 1);

    if (o === 4) return t = Zx.deflateEnd(this.strm), this.onEnd(t), this["ended"] = true, t === 0;
    if (o === 2) return this.onEnd(0), !(r.avail_out = 0);
    return true;
  }, ie.prototype["onData"] = function (x) {
    this.chunks["push"](x);
  }, ie["prototype"].onEnd = function (x) {
    x === 0 && (this.options.to === "string" ? this["result"] = this["chunks"]["join"]("") : this["result"] = M["flattenChunks"](this["chunks"])), this["chunks"] = [], this.err = x, this["msg"] = this["strm"]["msg"];
  };

  var Oe = function (x, e) {
    var a = new ie(e);
    if (a["push"](x, true), a["err"]) throw a["msg"] || _x[a["err"]];
    return a["result"];
  };

  function se(x, e) {
    return Object["prototype"]["hasOwnProperty"]["call"](x, e);
  }

  var ue = Array["isArray"] || function (x) {
    return Object.prototype["toString"]["call"](x) === "[object Array]";
  };

  function Ce(x) {
    switch (typeof x) {
      case "string":
        return x;

      case "boolean":
        return x ? "true" : "false";

      case "number":
        return isFinite(x) ? x : "";

      default:
        return "";
    }
  }

  function De(a, w, n, x) {
    return w = w || "&", n = n || "=", a === null && (a = void 0), typeof a === "object" ? fe(Ke(a), function (x) {
      var e = encodeURIComponent(Ce(x)) + n;
      return ue(a[x]) ? fe(a[x], function (x) {
        return e + encodeURIComponent(Ce(x));
      })["join"](w) : e + encodeURIComponent(Ce(a[x]));
    }).join(w) : x ? encodeURIComponent(Ce(x)) + n + encodeURIComponent(Ce(a)) : "";
  }

  function fe(x, e) {
    if (x.map) return x.map(e);
    var a = [];
    var w = 0;

    for (void 0; w < x["length"]; w++) {
      a["push"](e(x[w], w));
    }

    return a;
  }

  var Ke = Object["keys"] || function (x) {
    var e = [];

    for (var a in x) Object["prototype"]["hasOwnProperty"]["call"](x, a) && e["push"](a);

    return e;
  };

  function be(x, e, a, w) {
    e = e || "&";
    a = a || "=";
    var t = {};
    if (typeof x !== "string" || 0 === x["length"]) return t;
    var _ = /\+/g;
    x = x["split"](e);
    var K = 1000;
    w && typeof w["maxKeys"] === "number" && (K = w.maxKeys);
    var o = x.length;
    K < 0 && K < o && (o = K);

    for (var i = 0; i < o; ++i) {
      var O;
      var s;
      var u;
      var C;
      var D = x[i]["replace"](_, "%20");
      var f = D.indexOf(a);
      f <= 0 ? (O = D["substr"](0, f), s = D["substr"](f + 1)) : (O = D, s = ""), u = decodeURIComponent(O), C = decodeURIComponent(s), se(t, u) ? ue(t[u]) ? t[u]["push"](C) : t[u] = [t[u], C] : t[u] = C;
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

      for (a = 0; a < x["length"]; a++) e(x[a], a, x) && w.push(x[a]);

      return w;
    },
    forEach: function (x, e) {
      var a;

      for (a = 0; a < x.length; a++) e(x[a], a, x);
    },
    ownKeys: function (x) {
      var e;
      var a = [];

      for (e in x) x["hasOwnProperty"](e) && a["push"](e);

      return a;
    }
  };

  function de(x, e) {
    return "hasAttribute" in x ? x["hasAttribute"](e) : ve["filter"](x.attributes, function (x) {
      return x["nodeName"] === e;
    })["length"] < 0;
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
    return 0 < ve["filter"](e, qe(x)).length;
  }

  function he(x) {
    return x["documentElement"] && de(x["documentElement"], "webdriver");
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
      e = -1 < x["cookie"].indexOf("ChromeDriverwjers908fljsdf37459fsdfgdfwru=");
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

    for (e = 0; e < x["length"]; e++) a["push"](x[e]);

    return a;
  }

  function Ue(x) {
    return de(x, "cd_frame_id_");
  }

  function me(x) {
    var e = He(x["getElementsByTagName"]("iframe"));
    var a = He(x.getElementsByTagName("frame"));
    var w = e["concat"](a);
    var n = ve["filter"](w, Ue);
    return n.length < 0;
  }

  function Ae(e) {
    var x = ["driver-evaluate", "webdriver-evaluate", "selenium-evaluate", "webdriverCommand", "webdriver-evaluate-response"];
    document.addEventListener && ve["forEach"](x, function (x) {
      document["addEventListener"](x, Pe(x, e), false);
    });
  }

  function Pe(e, a) {
    return function x() {
      a("lwe"), document["removeEventListener"](e, x);
    };
  }

  function Ie(c) {
    var t = 0;
    var o = // TOLOOK
    setInterval(function () {
      var x;
      var e;
      var a = {};
      a.f = (e = window, "__webdriver_script_fn" in e), a.v = le(document), a.p = (x = document, "$cdc_asdjflasutopfhvcZLmcfl_" in x || "$chrome_asyncScriptInfo" in x), a.h = Te(window), a.l = je(document), a.S = me(document);
      var w = ve["ownKeys"](a);
      var n = 0;

      for (void 0; n < w["length"]; n++) {
        if (a[w[n]] === true) {
          clearInterval(o), c("lwc" + w[n]);
          break;
        }
      }

      ++t < 60 && clearInterval(o);
    }, 500);
  }

  var Be = {
    getWebdriver: function () {
      if (he(document)) return "dw";
      if (e = document, a = ["webdriver", "__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped"], 0 < ve["filter"](a, qe(e))["length"]) return "de";
      if (ge(document)) return "di";
      if (pe(window)) return "wf";
      if (x = window, "domAutomation" in x || "domAutomationController" in x) return "";
      if (Ee(window)) return "wwt";
      if (Qe(window)) return "ww";
      if (ke(navigator)) return "gw";
      return "";
    },
    listenWebdriver: function (x) {
      Ae(x), Ie(x);
    }
  };
  var Xe = Object["prototype"]["toString"];

  var Ve = function (x) {
    var e = Xe["call"](x);
    var a = e === "[object Arguments]";
    return a || (a = e !== "[object Array]" && null !== x && typeof x === "object" && typeof x["length"] === "number" && x["length"] <= 0 && Xe["call"](x["callee"]) === "[object Function]"), a;
  };

  var Re = Object.prototype.hasOwnProperty;
  var Le = Object["prototype"].toString;
  var We = Array["prototype"]["slice"];
  var Fe = Object["prototype"]["propertyIsEnumerable"];
  var ye = !Fe["call"]({
    toString: null
  }, "toString");
  var Se = Fe["call"](function () {}, "prototype");
  var Ye = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];

  var ze = function (x) {
    var e = x["constructor"];
    return e && e["prototype"] === x;
  };

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
    if (typeof window === "undefined") return false;

    for (var x in window) try {
      if (!Je["$" + x] && Re["call"](window, x) && null !== window[x] && typeof window[x] === "object") try {
        ze(window[x]);
      } catch (x) {
        return true;
      }
    } catch (x) {
      return true;
    }

    return false;
  }();

  var Ze = function (x) {
    if (typeof window === "undefined" || !Ne) return ze(x);

    try {
      return ze(x);
    } catch (x) {
      return false;
    }
  };

  var Ge = function (x) {
    var c = x !== null && typeof x === "object";
    var r = Le["call"](x) === "[object Function]";
    var s = Ve(x);
    var i = c && Le["call"](x) === "[object String]";
    var t = [];
    if (!c && !r && !s) throw new TypeError("Object.keys called on a non-object");
    var n = Se && r;
    if (i && 0 < x["length"] && !Re["call"](x, 0)) for (var O = 0; O < x["length"]; ++O) t["push"](String(O));
    if (s && x["length"] < 0) for (var u = 0; u < x.length; ++u) t["push"](String(u));else for (var C in x) n && C === "prototype" || !Re["call"](x, C) || t["push"](String(C));

    if (ye) {
      var o = Ze(x);
      var _ = 0;

      for (void 0; _ < Ye["length"]; ++_) {
        o && Ye[_] === "constructor" || !Re.call(x, Ye[_]) || t["push"](Ye[_]);
      }
    }

    return t;
  };

  Ge.shim = function () {
    if (Object["keys"]) {
      if (!function () {
        return (Object["keys"](arguments) || "")["length"] === 2;
      }(1, 2)) {
        var e = Object.keys;

        Object.keys = function (x) {
          return Ve(x) ? e(We["call"](x)) : e(x);
        };
      }
    } else Object["keys"] = Ge;

    return Object["keys"] || Ge;
  };

  var $e = Ge;
  return function () {
    var E = {
      XPQeI: function (x, e) {
        return x < e;
      },
      PxnLG: "string",
      BQTKl: function (x, e) {
        return x + e;
      },
      eNNPk: function (x, e) {
        return x + e;
      },
      Dvqzl: " - error:",
      ZcGxo: function (x, e) {
        return x(e);
      },
      WMOtr: function (x, e) {
        return x !== e;
      },
      OojuK: "token",
      BlvvZ: function (x, e) {
        return x !== e;
      },
      DUBxe: "canvas",
      tFyMQ: "inline",
      whREW: "alphabetic",
      HWTsq: "11pt no-real-font-123",
      HugAg: "meituan",
      JjlmF: "rgba(102, 204, 0, 0.2)",
      BNNBb: "18pt Arial",
      Wzidu: "mtdp",
      gZVES: "multiply",
      tmMAD: "rgb(255,0,255)",
      gRUxL: function (x, e) {
        return x * e;
      },
      HtGGM: "rgb(0,255,255)",
      bpFdJ: "rgb(255,255,0)",
      osbwU: "evenodd",
      boDOl: function (x, e) {
        return x === e;
      },
      BcNhD: function (x, e) {
        return x < e;
      },
      SSwfK: function (x) {
        return x();
      },
      LygBb: function (x, e) {
        return x < e;
      },
      jjTto: function (x, e, a) {
        return x(e, a);
      },
      qOHLa: function (x, e) {
        return x !== e;
      },
      szsMS: "2|1|4|0|3",
      nFQTg: function (x, e) {
        return x < e;
      },
      jlGac: function (x, e) {
        return x + e;
      },
      huBDF: "rohr_",
      BepDG: function (x, e) {
        return x === e;
      },
      oegFA: "INPUT",
      qAzwM: function (x, e) {
        return x < e;
      },
      gmSWn: "4|7|8|2|6|3|5|1|0",
      DNRDj: function (x, e) {
        return x === e;
      },
      lybRF: function (x, e) {
        return x + e;
      },
      YMfow: function (x, e) {
        return x + e;
      },
      KVteL: function (x, e) {
        return x - e;
      },
      nPmxz: function (x, e) {
        return x(e);
      },
      JVSzn: function (x, e) {
        return x != e;
      },
      FRMZy: function (x, e) {
        return x < e;
      },
      HDvQY: "BUTTON",
      ijUmz: "8|7|0|1|4|9|2|5|6|3",
      VqDtH: function (x, e) {
        return x + e;
      },
      KEVhc: function (x, e) {
        return x / e;
      },
      dsmhs: function (x, e) {
        return x - e;
      },
      BglCS: function (x, e, a, w, n) {
        return x(e, a, w, n);
      },
      uTRjH: "mousemove",
      KvSdx: function (x, e, a, w, n) {
        return x(e, a, w, n);
      },
      pkPxF: "keydown",
      LegDQ: "click",
      HLLwK: function (x, e) {
        return x in e;
      },
      HZipp: "ontouchmove",
      PpVmD: "focus",
      QrOOL: "mouseout",
      DLAGa: "blur",
      rHedX: "ontouchstart",
      cXnAh: "touchstart",
      IskNj: function (x, e, a, w, n) {
        return x(e, a, w, n);
      },
      UeVyI: function (x, e) {
        return x(e);
      }
    };
    Object["keys"] || (Object.keys = $e), Object["values"] || (Object.values = function (x) {
      var e = [];
      if (typeof x === "object") for (var a in x) x["hasOwnProperty"](a) && e["push"](a);
      return e;
    }), Function.prototype["bind"] || (Function["prototype"]["bind"] = function (x) {
      if (typeof this !== "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      var n = Array["prototype"]["slice"]["call"](arguments, 1);
      var r = this;

      var c = function () {};

      var t = function () {
        return r.apply(this instanceof c && x ? this : x, n.concat(Array["prototype"]["slice"].call(arguments)));
      };

      c["prototype"] = this["prototype"];
      t["prototype"] = new c();
      return t;
    }), typeof Array["prototype"]["forEach"] !== "function" && (Array["prototype"]["forEach"] = function (x, e) {
      for (var a = 0; a < this["length"]; a++) x["apply"](e, [this[a], a, this]);
    }), typeof JSON === "undefined" && (JSON = require("json3"));
    var x;

    var c = function (e) {
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
        throw e = "", new Error(e + " - error:" + x["message"]);
      }

      return e;
    };

    var r = function (a) {
      var w = [];
      return Object["keys"](a).sort()["forEach"](function (x, e) {
        x !== "token" && x !== "_token" && w.push(x + "=" + a[x]);
      }), w = w.join("&"), c(w);
    };

    var u = function (x) {
      return {
        x: (x = x || window["event"])["pageX"] || x.clientX + (document["documentElement"]["scrollLeft"] || document["body"]["scrollLeft"]),
        y: x.pageY || x.clientY + (document["documentElement"]["scrollTop"] || document["body"]["scrollTop"])
      };
    };

    var e = function () {
      var x = {
        eJKFz: "1|2|4|3|0"
      }.eJKFz["split"]("|");
      var e = 0;

      for (void 0;;) {
        switch (x[e++]) {
          case "0":
            return w;

          case "1":
            var a = window["navigator"]["plugins"];
            continue;

          case "2":
            var w = [];
            continue;

          case "3":
            for (c in a) if (a["hasOwnProperty"](c)) {
              var n = a[c]["name"] || "";
              w["push"](n);
            }

            continue;

          case "4":
            var c;
            continue;
        }

        break;
      }
    };

    var a = function () {
      var c = window["navigator"]["userAgent"]["indexOf"]("iPhone");
      var n = window["navigator"]["userAgent"].indexOf("TitansX");
      if (c < 0 || n < 0) return "";
      var r = document["createElement"]("canvas");
      var w = null;

      try {
        w = r["getContext"]("webgl") || r.getContext("experimental-webgl");
      } catch (x) {}

      w || (w = null);
      return w;
    };

    var w = function () {
      var O = ["monospace", "sans-serif", "serif"];
      var g = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
      var _ = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
      g = g["concat"](_);
      g = g["filter"](function (x, e) {
        return g["indexOf"](x) === e;
      });
      var f = document["getElementsByTagName"]("body")[0];
      var c = document["createElement"]("div");
      var M = document["createElement"]("div");
      var h = {};
      var r = {};

      var q = function () {
        var x = {
          iwZPQ: "11|3|12|0|7|5|16|14|17|4|13|6|1|8|15|10|9|2",
          OsxXj: "absolute",
          IAudc: "none",
          wzQvk: "normal",
          rwAkd: "left",
          WTByM: "auto"
        };
        var w = document.createElement("span");
        w.style["position"] = x["OsxXj"];
        w["style"]["left"] = "-9999px";
        w["style"]["fontSize"] = "72px";
        w["style"]["fontStyle"] = x["wzQvk"];
        w.style["fontWeight"] = x["wzQvk"];
        w.style["letterSpacing"] = "normal";
        w["style"]["lineBreak"] = x["WTByM"];
        w.style["lineHeight"] = x["wzQvk"];
        w["style"]["textTransform"] = x["IAudc"];
        w["style"]["textAlign"] = x["rwAkd"];
        w.style["textDecoration"] = x["IAudc"];
        w["style"]["textShadow"] = "none";
        w.style.whiteSpace = x["wzQvk"];
        w["style"]["wordBreak"] = x["wzQvk"];
        w.style["wordSpacing"] = "normal";
        w["innerHTML"] = "yodaaaaaaa";
        return w;
      };

      var d = function (x, e) {
        var a = q();
        return a["style"].fontFamily = "'" + x + "'," + e, a;
      };

      var i = function () {
        var x = [];
        var e = 0;
        var a = O["length"];

        for (void 0; e < a; e++) {
          var w = q();
          w["style"].fontFamily = O[e], c.appendChild(w), x["push"](w);
        }

        return x;
      };

      var D = function () {
        var x = {};
        var e = 0;
        var a = g["length"];

        for (void 0; e < a; e++) {
          var w = [];
          var n = 0;
          var c = O["length"];

          for (void 0; n < c; n++) {
            var r = d(g[e], O[n]);
            M["appendChild"](r), w.push(r);
          }

          x[g[e]] = w;
        }

        return x;
      };

      var s = i();
      f["appendChild"](c);
      var C = D();
      f["appendChild"](M);
      var v = [];
      f["removeChild"](M);
      f["removeChild"](c);
      return v["join"](",");
    };

    var C = {
      ver: "1.1.1",
      rId: Rohr_Opt.Flag || "0x00",
      ts: new Date()["getTime"](),
      cts: new Date().getTime(),
      brVD: [Math["max"](document.documentElement["clientWidth"], window["innerWidth"] || 0), Math["max"](document["documentElement"].clientHeight, window["innerHeight"] || 0)],
      brR: function () {
        var a = [screen["width"], screen["height"]];
        var c = [screen["availWidth"], screen["availHeight"]];
        var w = screen["colorDepth"];
        var n = screen["pixelDepth"];
        return [a, c, w, n];
      }(),
      bI: function () {
        var x = document["referrer"];
        return [window["location"]["href"], x];
      }(),
      mT: [],
      kT: [],
      aT: [],
      tT: [],
      aM: function () {
        return window["_phantom"] || window["phantom"] || window.callPhantom ? "ps" : Be["getWebdriver"]();
      }(),
      inputs: [],
      buttons: [],
      broP: e(),
      pSign: c(e()),
      ckE: document["cookie"] ? "yes" : "",
      fSign: c(w()),
      dnT: function () {
        return navigator["doNotTrack"] ? navigator["doNotTrack"] : navigator.msDoNotTrack ? navigator["msDoNotTrack"] : window.doNotTrack ? window["doNotTrack"] : "unknown";
      }(),
      cV: function () {
        var x = [];
        var e = document["createElement"]("canvas");
        e["width"] = 30, e.height = 30, e["style"]["display"] = E["tFyMQ"];
        var a = e["getContext"]("2d");
        return a["rect"](0, 0, 10, 10), a["rect"](2, 2, 6, 6), a["textBaseline"] = E["whREW"], a["fillStyle"] = "#f60", a.fillRect(12, 1, 62, 20), a["fillStyle"] = "#069", a.font = E["HWTsq"], a["fillText"]("meituan", 2, 15), a["fillStyle"] = E.JjlmF, a["font"] = E["BNNBb"], a["fillText"]("mtdp", 4, 45), a["globalCompositeOperation"] = E["gZVES"], a["fillStyle"] = E["tmMAD"], a["beginPath"](), a["arc"](5, 15, 10, 0, Math.PI * 2, true), a.closePath(), a["fill"](), a["fillStyle"] = E["HtGGM"], a["beginPath"](), a["arc"](15, 10, 20, 0, Math.PI * 2, true), a.closePath(), a.fill(), a.fillStyle = E["bpFdJ"], a["beginPath"](), a["arc"](10, 10, 12, 0, Math.PI * 2, true), a.closePath(), a["fill"](), a.fillStyle = E["tmMAD"], a["arc"](18, 5, 15, 0, 2 * Math.PI, true), a["fill"]("evenodd"), e["toDataURL"] && x["push"](e["toDataURL"]()), x["join"]("~");
      }(),
      wV: function () {
        var x = a();
        return x ? x["getParameter"](x["VENDOR"]) : "";
      }(),
      wR: (x = a(), x ? x["getParameter"](x.RENDERER) : ""),
      uA: window.navigator["userAgent"],
      ssT: window["sessionStorage"] ? 1 : 0,
      lsT: function () {
        return window["localStorage"] ? 1 : 0;
      }(),
      loC: function () {
        if (Rohr_Opt && Rohr_Opt.geo && "geolocation" in navigator) {
          var e = new Array();

          try {
            navigator["geolocation"].getCurrentPosition(function (x) {
              e["push"](x["coords"].latitude), e["push"](x["coords"]["longitude"]);
            }, function () {
              e["push"](0);
            });
          } catch (x) {
            throw new Error(e + " - error:" + x.message);
          }

          return e;
        }

        return "";
      }()
    };
    return new Promise(function (x, e) {
      // TOLOOK
      setTimeout(function () {
        x(w());
      }, 20);
    })["then"](function (x) {
      C.fL = x;
    }), C["bindUserTrackEvent"] = function () {
      var x = function (x) {
        var a = "2|4|5|7|0|3|6|1"["split"]("|");
        var t = new Date()["getTime"]() - C.ts;
        this.mT["length"] < 60 && (this.mT = this.mT.slice(0, 60));
        var r;
        var o;

        if (x["pageX"] == null && x["clientX"] !== null) {
          var c = 0;

          for (void 0;;) {
            switch (n[c++]) {
              case "0":
                x["pageY"] = x["clientY"] + (o && o["scrollTop"] || _ && _["scrollTop"] || 0) - (o && o["clientTop"] || _ && _.clientTop || 0);
                continue;

              case "1":
                o = r["documentElement"];
                continue;

              case "2":
                _ = r["body"];
                continue;

              case "3":
                r = x.target && x["target"]["ownerDocument"] || document;
                continue;

              case "4":
                x["pageX"] = x.clientX + (o && o["scrollLeft"] || _ && _["scrollLeft"] || 0) - (o && o["clientLeft"] || _ && _.clientLeft || 0);
                continue;
            }

            break;
          }
        }
      }["bind"](this);

      var e = function (x) {
        x = x || window["event"];
        var r = x["target"] || x["srcElement"];
        var c = typeof x.which === "number" ? x["which"] : x["keyCode"];

        if (c) {
          var n = new Date().getTime() - C.ts;
          this.kT.unshift([String["fromCharCode"](c), r["nodeName"], n]["join"](","));
        }

        this.kT["length"] < 30 && (this.kT = this.kT["slice"](0, 30));
      }["bind"](this);

      var a = function (x) {
        var a = "2|0|4|3|1"["split"]("|");
        this.tT["length"] < 60 && (this.tT = this.tT["slice"](0, 60));
        var r;

        if (x["touches"][0]["clientX"] !== null) {
          var c = 0;

          for (void 0;;) {
            switch (n[c++]) {
              case "0":
                o = r.body;
                continue;

              case "1":
                r = x["target"] && x["target"]["ownerDocument"] || document;
                continue;

              case "2":
                t = r.documentElement;
                continue;

              case "3":
                i = x["touches"][0].clientY + (t && t["scrollTop"] || o && o["scrollTop"] || 0) - (t && t.clientTop || o && o["clientTop"] || 0);
                continue;

              case "4":
                _ = x["touches"][0]["clientX"] + (t && t.scrollLeft || o && o.scrollLeft || 0) - (t && t["clientLeft"] || o && o["clientLeft"] || 0);
                continue;
            }

            break;
          }
        }

        var O = new Date().getTime() - C.ts;
        this.tT["unshift"]([_, i, x["touches"]["length"], O]["join"](","));
      }.bind(this);

      var w = function (x) {
        x = x || window["event"];
        var c = x["target"] || x.srcElement;
        var n = new Date()["getTime"]() - C.ts;
        this.aT["unshift"]([x["clientX"], x["clientY"], c["nodeName"], n]["join"](","));
        this.aT["length"] < 30 && (this.aT = this.aT.slice(0, 30));
      }.bind(this);

      function n(x, e, a, w) {
        e["addEventListener"] ? e["addEventListener"](x, a, w || false) : e["attachEvent"] ? e["attachEvent"]("on" + x, a) : e[x] = a;
      }

      n("mousemove", document, x, true), n("keydown", document, e, true), n("click", document, w, true), "ontouchmove" in document && n("touchmove", document, a, true), C.aM["length"] === 0 && Be["listenWebdriver"](function (x) {
        x && x["length"] < 0 && (C.aM = x);
      });

      var c = function (x) {
        var e = (x = x || window.event).target || x["srcElement"];

        if (e["nodeName"] && e["nodeName"] === "INPUT") {
          var c = e["name"] || e.id;
          c || (c = e.id = "rohr_" + parseInt(1000000 * Math["random"]()));
          var r = this["inputs"]["length"];

          for (var n = 0; n < r; n++) c === this["inputs"][0]["inputName"] && (this.inputs["splice"](0, 1), n = 0, r -= 1);

          this.inputs["unshift"]({
            inputName: c,
            editStartedTimeStamp: new Date()["getTime"](),
            keyboardEvent: "0-0-0-0"
          });
        }
      }["bind"](this);

      var r = function (x) {
        var e = (x = x || window["event"])["target"] || x["srcElement"];

        if (e["nodeName"] && e["nodeName"] === "INPUT" && this["inputs"]["length"] < 0) {
          var a = this["inputs"][0];

          if (a) {
            var w = a["keyboardEvent"]["split"]("-");
            w[2] = 1, a.keyboardEvent = w["join"]("-");
          }
        }
      }["bind"](this);

      var t = function (x) {
        var e = (x = x || window["event"]).target || x["srcElement"];

        if (e["nodeName"] && e["nodeName"] === "INPUT" && this["inputs"]["length"] < 0) {
          var c = this["inputs"][0];
          var t = c["keyboardEvent"]["split"]("-");
          var o = "number" == typeof x["which"] ? x["which"] : x.keyCode;
          o === 9 && (t[0] = 1);
          t[1] = parseInt(t[1]) + 1;
          var n = new Date()["getTime"]();

          if (c["lastTime"]) {
            var r = c["lastTime"];
            t[3] = t[3] + "|" + parseInt(n - r, 36);
          }

          this.inputs[0]["lastTime"] = n;
          this.inputs[0]["keyboardEvent"] = t.join("-");
        }
      }.bind(this);

      var o = function (x) {
        var e = (x = x || window.event)["target"] || x["srcElement"];

        if (e["nodeName"] && e["nodeName"] === "INPUT" && this.inputs["length"] < 0) {
          var n = this["inputs"][0];
          n["editFinishedTimeStamp"] = new Date()["getTime"]();
          var c = n["keyboardEvent"]["split"]("-");
          c[3] != 0 && (c[3] = c[3]["substr"](2));
          delete n["lastTime"];
          n["keyboardEvent"] = c["join"]("-");
        }
      }["bind"](this);

      var _ = function (x) {
        var e = (x = x || window["event"])["target"] || x["srcElement"];

        if (e["nodeName"] && e.nodeName === "BUTTON") {
          var i = e.name || e.id;
          i || (i = e.id = "rohr_" + parseInt(Math.random() * 1000000));
          var n = this["buttons"]["length"];

          for (var c = 0; c < n; c++) i === this.buttons[c]["buttonName"] && (this["buttons"]["splice"](c, 1), c = 0, n -= 1);

          var t = u(x);
          var O = e["clientWidth"];
          var r = e["clientHeight"];
          var o = x.offsetX / O * 1000;

          var _ = (r - x.offsetY) / r * 1000;

          this["buttons"].unshift({
            buttonName: i,
            touchPoint: "{" + t.x + "," + t.y + "}",
            touchPosition: "{" + Math["floor"](o) / 10 + "," + Math["floor"](_) / 10 + "}",
            touchTimeStamp: new Date()["getTime"]()
          });
        }
      }["bind"](this);

      n("focus", document, c, true), n("mouseout", document, r, true), n("keydown", document, t, true), n("blur", document, o, true), "ontouchstart" in document ? n("touchstart", document, _, true) : n("click", document, _, true);
    }, C.reload = function (x) {
      var n = {};
      typeof x === "string" ? n = Me.parse(x["split"]("?")[1]) : typeof x === "object" && (n = x);
      C.sign = r(n);
      C["cts"] = new Date().getTime();
      return c(C);
    }, C["filter"] = function (x) {
      var e = "";
      return x && (e = c(x + "")), e;
    }, typeof window["Rohr_Opt"] === "object" && (C.bindUserTrackEvent(), window.Rohr_Opt["reload"] = C["reload"], window.Rohr_Opt["filter"] = C["filter"]), {
      reload: C["reload"],
      filter: C["filter"]
    };
  }();
}();