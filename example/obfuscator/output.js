function hi() {
  var _0x13918c = function () {
    function _0x49afe4(_0x254ae1, _0x559602, _0x3dfa50, _0x21855f, _0x13ee81) {
      return _0x4698(_0x13ee81 - -674, _0x3dfa50);
    }
    var _0x7159b6 = true;
    return function (_0x330efc, _0x46a7b3) {
      var _0x7fa39c = _0x7159b6 ? function () {
        if (_0x46a7b3) {
          var _0x3d6c1e = _0x46a7b3.apply(_0x330efc, arguments);
          _0x46a7b3 = null;
          return _0x3d6c1e;
        }
      } : function () {};
      _0x7159b6 = false;
      return _0x7fa39c;
    };
  }();
  var _0x6cbcff = _0x13918c(this, function () {
    function _0x2bba98() {
      var _0x6f0388;
      try {
        _0x6f0388 = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0x10880c) {
        _0x6f0388 = window;
      }
      return _0x6f0388;
    }
    var _0x45bfdc = _0x2bba98();
    var _0x5d2030 = _0x45bfdc.console = _0x45bfdc.console || {};
    var _0x4a4cd0 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    var _0xbcb23b = 0;
    for (; _0xbcb23b < _0x4a4cd0.length; _0xbcb23b++) {
      var _0x12c43a = _0x13918c.constructor.prototype.bind(_0x13918c);
      var _0x545650 = _0x4a4cd0[_0xbcb23b];
      var _0x1faa06 = _0x5d2030[_0x545650] || _0x12c43a;
      _0x12c43a.__proto__ = _0x13918c.bind(_0x13918c);
      _0x12c43a.toString = _0x1faa06.toString.bind(_0x1faa06);
      _0x5d2030[_0x545650] = _0x12c43a;
    }
  });
  _0x6cbcff();
  console.log("Hello World!");
}
hi();