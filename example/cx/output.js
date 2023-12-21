setInterval(function () {
  _0x142a1e();
}, 4000);
(function () {
  function _0x20e344() {
    return Math.floor(Math.random() * 10);
  }
  function _0xb2c58f() {
    var _0xb2c58f;
    var _0x402f51 = {};
    var _0x2fe666 = document.getElementById("userId");
    var _0x259d84 = _0x2fe666 ? _0x2fe666.value : "";
    var _0x25e730 = document.getElementById("workRelationId");
    var _0x420238 = _0x25e730 ? _0x25e730.value : "";
    var _0x234807 = "" + new Date().getTime();
    var _0x5a209a = _0x20e344();
    var _0x4de74b = _0x20e344();
    var _0x5e5a4b = _0x259d84 + "_" + _0x420238;
    _0x402f51.x = -1;
    _0x402f51.y = -1;
    function _0x352066(_0xb2c58f) {
      return _0xb2c58f.isTrusted === undefined || !(_0xb2c58f.isTrusted = false) === _0xb2c58f.isTrusted;
    }
    MouseEvent;
    if (_0x5a209a == 2) {
      _0x5a209a = 3;
    }
    try {
      var _0x5b29a1 = window.event;
      if (_0x5b29a1 === undefined) {
        var _0x5d5dcb = arguments.callee.caller;
        var _0x54ac12 = _0x5d5dcb;
        for (; _0x5d5dcb != null;) {
          _0x5d5dcb = (_0x54ac12 = _0x5d5dcb).caller;
        }
        _0x5b29a1 = _0x54ac12.arguments[0];
      }
      if (_0x5b29a1 != null) {
        var _0x11b115 = document.documentElement.scrollLeft || document.body.scrollLeft;
        var _0xc269d1 = document.documentElement.scrollTop || document.body.scrollTop;
        _0x402f51.x = _0x5b29a1.pageX || _0x5b29a1.clientX + _0x11b115;
        _0x402f51.y = _0x5b29a1.pageY || _0x5b29a1.clientY + _0xc269d1;
        if (!(_0x5b29a1.isTrusted !== true && _0x5b29a1.isTrusted !== undefined)) {
          _0x5a209a = 2;
        }
        _0xb2c58f = _0x352066(_0x5b29a1) ? _0x5a209a != 2 ? function (_0xb2c58f) {
          var _0x402f51 = 0;
          var _0x2fe666 = 0;
          var _0x259d84 = _0x352066(_0x5b29a1);
          var _0x25e730 = 0;
          var _0x420238 = _0xb2c58f.length;
          for (; _0x25e730 < _0x420238; _0x25e730++) {
            if ((_0x2fe666 = (_0x402f51 = (_0x402f51 << 4) + _0xb2c58f.charCodeAt(_0x25e730)) & 1879048192) != 0) {
              _0x402f51 ^= _0x2fe666 >> (_0x259d84 ? 24 : 16);
              _0x402f51 &= ~_0x2fe666;
            }
          }
          return _0x402f51 & 2147483647;
        } : function (_0xb2c58f) {
          var _0x402f51;
          var _0x2fe666 = 0;
          var _0x259d84 = _0x352066(_0x5b29a1);
          if (_0xb2c58f.length === 0) {
            return _0x2fe666;
          }
          for (_0x402f51 = 0; _0x402f51 < _0xb2c58f.length; _0x402f51++) {
            _0x2fe666 = (_0x2fe666 << (_0x259d84 ? 5 : 16)) - _0x2fe666 + _0xb2c58f.charCodeAt(_0x402f51);
            _0x2fe666 = _0x259d84 ? _0x2fe666 : ~_0x2fe666;
          }
          return _0x2fe666 & 2147483647;
        } : function (_0xb2c58f) {
          var _0x402f51 = 0;
          if (_0xb2c58f.length == 0) {
            return _0x402f51;
          }
          var _0x2fe666 = 0;
          for (; _0x2fe666 < _0xb2c58f.length; _0x2fe666++) {
            _0x402f51 = (_0x402f51 << 5) - _0x402f51 + _0xb2c58f.charCodeAt(_0x2fe666);
            _0x402f51 &= 268435455;
          }
          return _0x402f51;
        };
      }
    } catch (_0x3a4e47) {
      _0x402f51 = {};
      _0x402f51.x = -2;
      _0x402f51.y = -2;
    }
    _0x5a209a = "" + _0x5a209a + _0x4de74b + _0xb2c58f(_0x35fcb5.join("") + _0x234807.substring(4) + _0x5a209a + _0x4de74b + _0x420238) % 10;
    var _0x198f8f = "(" + Math.ceil(_0x402f51.x) + "|" + Math.ceil(_0x402f51.y) + ")";
    return function (_0xb2c58f, _0x402f51) {
      if (_0x402f51 == null || _0x402f51.length <= 0) {
        return null;
      }
      var _0x2fe666 = "";
      var _0x259d84 = 0;
      for (; _0x259d84 < _0x402f51.length; _0x259d84++) {
        _0x2fe666 += _0x402f51.charCodeAt(_0x259d84).toString();
      }
      var _0x25e730 = Math.floor(_0x2fe666.length / 5);
      var _0x420238 = parseInt(_0x2fe666.charAt(_0x25e730) + _0x2fe666.charAt(_0x25e730 * 2) + _0x2fe666.charAt(_0x25e730 * 3) + _0x2fe666.charAt(_0x25e730 * 4));
      var _0x234807 = Math.ceil(_0x402f51.length / 2);
      var _0x5a209a = Math.pow(2, 31) - 1;
      if (_0x420238 < 2) {
        return null;
      }
      var _0x4de74b = Math.random();
      var _0x5e5a4b = Math.round(_0x4de74b * 1000000000) % 100000000;
      if ((_0x2fe666 += _0x5e5a4b).length > 10) {
        _0x2fe666 = parseInt(_0x2fe666.substring(0, 10)).toString();
      }
      _0x2fe666 = (_0x420238 * _0x2fe666 + _0x234807) % _0x5a209a;
      var _0x352066 = "";
      var _0x5b29a1 = "";
      for (_0x259d84 = 0; _0x259d84 < _0xb2c58f.length; _0x259d84++) {
        _0x5b29a1 += (_0x352066 = parseInt(_0xb2c58f.charCodeAt(_0x259d84) ^ Math.floor(_0x2fe666 / _0x5a209a * 255))) < 16 ? "0" + _0x352066.toString(16) : _0x352066.toString(16);
        _0x2fe666 = (_0x420238 * _0x2fe666 + _0x234807) % _0x5a209a;
      }
      for (_0x5e5a4b = _0x5e5a4b.toString(16); _0x5e5a4b.length < 8;) {
        _0x5e5a4b = "0" + _0x5e5a4b;
      }
      return (_0x5b29a1 += _0x5e5a4b) + "&rd=" + _0x4de74b;
    }(_0x198f8f, _0x5e5a4b = _0x5e5a4b + "|" + _0x5a209a) + "&value=" + _0x198f8f + "&wid=" + _0x420238 + "&_edt=" + (_0x234807 + _0x5a209a);
  }
  var _0x35fcb5 = ["4", "b", "7", "6", "f", "3", "1", "c", "e", "8", "6", "0", "f", "f", "6", "7", "b", "8", "8", "4", "f", "c", "e", "7", "9", "f", "1", "c", "0", "4", "b", "3"];
  window.getEnc = function () {
    return _0xb2c58f();
  };
})();