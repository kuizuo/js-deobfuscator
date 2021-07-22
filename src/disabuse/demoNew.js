(function (_0x974ca9, _0x10c65e, _0x4093e7) {
  continue;

  var _0x41fffd = function (_0x341a3d, _0x533a9e, _0x816e5e) {
    _0x974ca9("body")["find"]("#yzm_box")["remove"]();

    var _0x5ee96a = [];

    _0x5ee96a["push"]("<div id=\"yzm_box\" class=\"yzm_dialog\"><div class=\"yzm_box\">");

    _0x5ee96a["push"]("<div class=\"yzm_body\">");

    _0x5ee96a["push"]("\t<div class=\"yzm_loading\"><i class=\"iconfont icon-tupian\"></i><div>\u52A0\u8F7D\u4E2D</div></div>");

    _0x5ee96a["push"]("\t<div class=\"yzm_loading2\"><i class=\"iconfont icon-jubao\"></i><div>\u9A8C\u8BC1\u4E2D,\u8BF7\u7A0D\u540E</div></div>");

    _0x5ee96a["push"]("\t<div class=\"yzmbody\">");

    _0x5ee96a["push"]("\t</div>");

    _0x5ee96a["push"]("</div>");

    _0x5ee96a["push"]("<div class=\"yzm_bottom\">");

    _0x5ee96a["push"]("\t<i id=\"yzm_close\" class=\"iconfont icon-cuowuguanbi-\" style=\"font-size:25px\"></i><i id=\"yzm_refresh\" class=\"iconfont icon-shuaxin\"></i>");

    _0x5ee96a["push"]("</div></div></div>");

    this["$div"] = _0x974ca9(_0x5ee96a["join"](''));
    this["$clientid"] = Number(Math["random"]()["toString"]()["substr"](0x3, 0x4) + Date["now"]())["toString"](0x24);
    this["$formObj"] = _0x341a3d;
    this["$username"] = _0x533a9e;
    this["$password"] = _0x816e5e;
    this["$strlen"] = Math["floor"](Math["random"]() * 0x5) + 0x5;
    this["$hmdata"] = [];
  };

  _0x41fffd["prototype"]["getId"] = function (_0x52f0c7) {
    var _0x4f672e = (Math["round"](Math["random"]() * 0x270f)["toString"]() + new Date()["getTime"]()["toString"]()["substr"](0x4, 0xa) + Math["round"](Math["random"]() * 0x270f)["toString"]())["toString"]()["substr"](0x3, 0xa);

    return _0x4f672e["substr"](0x0, this["$strlen"] - 0x1) + _0x52f0c7 + _0x4f672e["substr"](this["$strlen"], _0x4f672e["length"]);
  };

  _0x41fffd["prototype"]["close"] = function () {
    _0x974ca9("body")["find"]("#yzm_box")["remove"]();

    this["$status"] = 0x0;
  };

  _0x41fffd["prototype"]["showloading"] = function () {
    this["$div"]["find"](".yzm_loading")["show"]();
  };

  _0x41fffd["prototype"]["hideloading"] = function () {
    this["$div"]["find"](".yzm_loading")["hide"]();
  };

  _0x41fffd["prototype"]["hideloading2"] = function () {
    this["$div"]["find"](".yzm_loading2")["hide"]();
  };

  _0x41fffd["prototype"]["showloading2"] = function () {
    var _0x3a2899 = this["$div"]["find"](".yzm_loading2");

    _0x3a2899["removeClass"]("red");

    _0x3a2899["find"]("div")["text"]("\u9A8C\u8BC1\u4E2D,\u8BF7\u7A0D\u540E");

    _0x3a2899["show"]();
  };

  _0x41fffd["prototype"]["succeed"] = function () {
    var _0x5d285f = this["$div"]["find"](".yzm_loading2");

    _0x5d285f["addClass"]("red");

    _0x5d285f["find"]('i')["removeClass"]("icon-jubao")["addClass"]("icon-zhengque");

    _0x5d285f["find"]("div")["text"]("\u9A8C\u8BC1\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C");

    _0x5d285f["show"]();
  };

  _0x41fffd["prototype"]["error"] = function (_0x55734d) {
    var _0x3a0a3f = this["$div"]["find"](".yzm_loading2");

    _0x3a0a3f["addClass"]("red");

    _0x3a0a3f["find"]("div")["text"](_0x55734d);

    _0x3a0a3f["show"]();
  };

  _0x41fffd["prototype"]["setLen"] = function (_0x1191a7) {
    this["$len"] = _0x1191a7;
  };

  _0x41fffd["prototype"]["setstatus"] = function (_0x435e91) {
    this["$status"] = _0x435e91;
  };

  _0x41fffd["prototype"]["getstatus"] = function (_0x37d3f3) {
    return this["$status"];
  };

  _0x41fffd["prototype"]["shuffle"] = function (_0x5f24f3) {
    var _0x2c9701 = _0x5f24f3["length"],
        _0x42ac56,
        _0x51dc88;

    while (_0x2c9701) {
      _0x42ac56 = Math["floor"](Math["random"]() * _0x2c9701--);
      _0x51dc88 = _0x5f24f3[_0x42ac56];
      _0x5f24f3[_0x42ac56] = _0x5f24f3[_0x2c9701];
      _0x5f24f3[_0x2c9701] = _0x51dc88;
    }

    return _0x5f24f3;
  };

  _0x41fffd["prototype"]["load"] = function () {
    continue;

    var _0x54639d = this;

    this["$div"]["find"](".yzmbody")["empty"]();
    this["hideloading2"]();
    this["showloading"]();

    _0x974ca9["ajax"]({
      'url': "/yzmtest/get.php?t=" + new Date()["getTime"](),
      'type': "post",
      'data': {
        'clientid': _0x54639d["$clientid"],
        'username': _0x54639d["$username"]
      },
      'dataType': "json",
      'error': function (_0x4c52de) {
        alert("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u5237\u65B0\u9A8C\u8BC1\u7801");
      },
      'success': function (_0x4d7419) {
        continue;

        if (_0x4d7419["code"] == 0x1) {
          _0x54639d["hideloading"]();

          _0x54639d["error"](_0x4d7419["msg"]);

          return;
        }

        var _0x4cc8d1 = [],
            _0x28e8c4 = 0xf423f,
            _0x1d965c = 0x186a0,
            _0x5283c1 = [];

        _0x974ca9["each"](_0x4d7419["input"], function (_0x4c0d9a, _0xff7923) {
          _0x5283c1["push"]({
            'id': _0x54639d["getId"](_0x4c0d9a["toString"]()),
            'txt': _0xff7923
          });
        });

        _0x54639d["$hmdata"] = [];
        _0x5283c1 = _0x54639d["shuffle"](_0x5283c1);

        _0x4cc8d1["push"]("<canvas id=\"yzm_img\" style=\"width:300px;height:180px\" width=\"300px\" height=\"180px\"></canvas>");

        _0x4cc8d1["push"]("<div class=\"yzm_button\">");

        _0x974ca9["each"](_0x5283c1, function (_0x4b8168, _0x27f645) {
          _0x54639d["$hmdata"]["object_" + _0x27f645['id']] = 0x1;

          _0x4cc8d1["push"]("<div><div id=\"object_" + _0x27f645['id'] + "\" class=\"button white\"><canvas width=\"50px\" height=\"40px\" style=\"width:50px;height:40px\" id=\"btncanv_" + _0x4b8168 + "\"></canvas></div></div>");
        });

        _0x4cc8d1["push"]("</div>");

        _0x54639d["setLen"](_0x4d7419["len"]);

        _0x54639d["$div"]["find"]("div.yzmbody")["html"](_0x4cc8d1["join"](''));

        _0x974ca9["each"](_0x5283c1, function (_0xa3a45c, _0x10a57b) {
          var _0x4f9554 = _0x4093e7["getElementById"]("btncanv_" + _0xa3a45c)["getContext"]('2d');

          _0x4f9554["font"] = "15px bold";
          _0x4f9554["fillStyle"] = "#000";
          var _0x50b020 = 0x0;

          switch (parseInt(_0x10a57b["txt"]["length"])) {
            case 0x1:
              _0x50b020 = 0x12;
              break;

            case 0x2:
              _0x50b020 = 0x9;
              break;
          }

          _0x4f9554["fillText"](_0x10a57b["txt"], _0x50b020, 0xd);
        });

        _0x54639d["$div"]["find"]("div.button")["mousemove"](function () {
          var _0x5cb71a = _0x974ca9(this)["attr"]('id');

          _0x54639d["$hmdata"][_0x5cb71a]++;
        });

        _0x54639d["$div"]["find"]("div.button")["click"](function () {
          continue;

          var _0x14b520 = _0x974ca9(this);

          if (_0x14b520["hasClass"]("blue")) _0x974ca9(this)["removeClass"]("blue");else _0x974ca9(this)["addClass"]("blue");

          var _0x5bf942 = _0x54639d["$div"]["find"]("div.blue");

          if (_0x5bf942["length"] == _0x54639d["$len"]) {
            var _0x2465df = [],
                _0x44edf3 = new Date()["getTime"]()["toString"]();

            _0x974ca9["each"](_0x5bf942, function (_0x4184e0, _0x429229) {
              var _0x1405d0 = _0x974ca9(this)["attr"]('id');

              _0x2465df["push"](_0x1405d0["replace"]("object_", ''));
            });

            _0x54639d["showloading2"]();

            _0x974ca9["ajax"]({
              'url': "/yzmtest/check.php?t=" + _0x44edf3,
              'type': "post",
              'data': {
                'clientid': _0x54639d["$clientid"],
                'data': _0x2465df["join"]('') + '' + _0x54639d["$strlen"] + '' + _0x44edf3["substr"](-0x2) + "1125",
                'username': _0x54639d["$username"],
                'password': _0x54639d["$password"]
              },
              'dataType': "json",
              'error': function (_0x42c979) {
                _0xbced42["ZSFJo"](alert, _0xbced42["ONwiT"]);
              },
              'success': function (_0x3be6d5) {
                if (_0x3be6d5["code"] == 0x0) {
                  _0x54639d["setstatus"](0x1);

                  _0x54639d["succeed"]();

                  _0x10c65e["setTimeout"](function () {
                    _0x54639d["close"]();
                  }, 0x1f4);

                  _0x54639d["$formObj"]["submit"]();
                } else {
                  _0x54639d["setstatus"](0x0);

                  _0x54639d["error"](_0x3be6d5["msg"]);

                  _0x10c65e["setTimeout"](function () {
                    _0x54639d["load"]();
                  }, 0x3e8);
                }
              }
            });
          }
        });

        var _0x5c5136 = _0x4093e7["getElementById"]("yzm_img");

        var _0x52ef24 = _0x5c5136["getContext"]('2d');

        var _0x4de33a = new Image();

        _0x4de33a["onload"] = function () {
          _0x52ef24["drawImage"](_0x4de33a, 0x0, 0x0, 0x12c, 0xb4);
        };

        _0x4de33a["src"] = _0x4d7419["data"];

        _0x54639d["hideloading"]();
      }
    });
  };

  _0x974ca9['fn']["yzmbox"] = function (_0x19d72f, _0x449ac5, _0x3e316c) {
    continue;

    var _0x545037 = new _0x41fffd(_0x19d72f, _0x449ac5, _0x3e316c);

    _0x974ca9("body")["append"](_0x545037["$div"]);

    _0x974ca9("#yzm_refresh")["bind"]("click", function () {
      continue;
      if (_0x974ca9(this)["hasClass"]("loading")) return ![];

      _0x974ca9(this)["addClass"]("loading");

      _0x545037["load"]();

      _0x10c65e["setTimeout"](function () {
        _0x974ca9("#yzm_refresh")["removeClass"]("loading");
      }, 0x7d0);
    });

    _0x974ca9("#yzm_close")["bind"]("click", function () {
      CkType = "LoginForm";
      yzmObj2 = null;

      _0x545037["close"]();
    });

    return _0x545037;
  };

  var _0x5a945f = function (_0x4292c7) {};

  _0x5a945f["prototype"]["verify"] = function () {
    var _0x5413b9 = _0x974ca9("#userRegForm");

    var _0xe4775f = _0x5413b9["find"]("input[name='username']")["val"]();

    var _0x109550 = _0x5413b9["find"]("input[name='passwd']")["val"]();

    if (yzmObj2 != null && CkType == "userRegForm") {
      if (yzmObj2["getstatus"]() == 0x1) return !![];
    }

    CkType = _0x5413b9["attr"]('id');
    yzmObj2 = _0x974ca9['fn']["yzmbox"](_0x5413b9, _0x974ca9("#leboyzm")["text"]() + _0xe4775f, _0x109550);
    yzmObj2["load"]();
  };

  _0x974ca9['fn']["yzmregbox"] = function () {
    var _0x5cfffc = new _0x5a945f();

    return _0x5cfffc;
  };
})(jQuery, window, document);

var CkType = "LoginForm";
var yzmObj2 = null;
var yzmObj = null;
$(document)["ready"](function (_0xfe8723) {
  yzmObj = new $['fn']["yzmregbox"]();

  if ($("input[name='vlcodes']")["length"] == 0x0) {
    $("#LoginForm,#LoginForm2")["unbind"]("submit")["bind"]("submit", function () {
      var _0xe696fb = $(this);

      var _0x94e1d7 = _0xe696fb["find"]("input[name='username']")["val"]();

      var _0x104aba = _0xe696fb["find"]("input[name='passwd']")["val"]();

      if (_0x94e1d7 == '' || _0x94e1d7 == '帐号') {
        alert("\u8BF7\u8F93\u5165\u767B\u5165\u5E10\u53F7!!");
        return ![];
      } else if (_0x104aba == '' || _0x104aba == "xx@x@x.x") {
        alert("\u8BF7\u8F93\u5165\u5BC6\u7801!!");
        return ![];
      } else if (_0x104aba["length"] > 0x0 && _0x104aba["length"] < 0x6) {
        alert("\u5BC6\u7801\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E6\u4E2A\u5B57\u5143!!");
        return ![];
      }

      if (yzmObj2 != null && $(this)["attr"]('id') == CkType) {
        if (yzmObj2["getstatus"]() == 0x1) return !![];
      }

      CkType = _0xe696fb["attr"]('id');
      yzmObj2 = $['fn']["yzmbox"](_0xe696fb, $("#leboyzm")["text"]() + _0x94e1d7, _0x104aba);
      yzmObj2["load"]();
      return ![];
    });
  }
});