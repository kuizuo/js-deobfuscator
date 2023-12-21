var i_bNHXo = 0;
window.onerror = function (_0x5c682b, _0x411b0f, _0x5b9b41, _0x2beae3, _0x1b4910) {
  if (++i_bNHXo < 5) {
    $.ajax({
      type: "post",
      url: "/notgood",
      data: {
        ng: _0x5c682b + "[li]:" + _0x5b9b41 + " col:" + _0x2beae3,
        where: encodeURIComponent(location.href)
      },
      async: true,
      success: function (_0x396e7d) {}
    });
  }
  return false;
};
var i_ZECha = 0;
var i_aKwxi = 50000;
var i_XNCsc = 0;
var i_ShbNs = 0;
function i_XaCat() {
  i_ShbNs = performance.now();
}
function i_wbiGr() {
  i_ZECha = performance.now();
}
function i_aNfwe() {
  if (++i_XNCsc == 20) {
    i_aKwxi = 3500;
  }
  var _0x150fd6 = performance.now();
  if (_0x150fd6 - i_ShbNs > 3600000 && i_iDpHde == 1 && i_xjHeZi == 1) {
    i_erwJl();
  }
  if (i_ZECha < _0x150fd6 - i_aKwxi) {
    var _0x26169b = new XMLHttpRequest();
    _0x26169b.open("POST", "/notgood", false);
    _0x26169b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    _0x26169b.onreadystatechange = function () {};
    var _0x2be831 = "ng=fuck me&where=110 calling " + gid + "time." + (_0x150fd6 - i_ZECha);
    _0x26169b.send(_0x2be831);
    i_DYNBTe.terminate();
    location = "about:blank";
  }
  i_ZECha = _0x150fd6;
}
function i_erwJl() {
  i_iZhRvt("超过一小时占用房间不玩，已自动踢出房间");
  i_sCrNao.close();
  i_ShbNs = 99999999;
}
var i_etBeu = {};
var i_rzpKf = {};
var i_iXBb_ = new Uint8Array(1024);
var i_PNafv = `<div class="onegamehelpset">
                <span class='onegamehelpsetName'>{{name}}</span>
                <input type="checkbox" id="{{id}}" class="key">
                <label for="{{id}}" class="key-bg">
                    <span class="circle"></span>
                    <span class="on">开</span>
                    <span class="off">关</span>
                </label>
                </div>`;
var i_eWxTd = `<div class="groupgamecheatset">
                <span class='onegamehelpsetName'>{{name}}</span>
                <select  id="{{id}}" class="">
                <option value="-1">关</option>{{someopt}}                </select>
                </div>`;
function i_mYznp(_0x3a5479, _0x3a9c5c) {
  var _0x5845d0 = i_sxfci_("gamecheat_setlist");
  var _0x1610a6 = document.createElement("div");
  var _0x1e7877 = i_eWxTd.replace("{{name}}", _0x3a5479).replace("{{id}}", "cg" + _0x3a5479).replace("{{id}}", "cg" + _0x3a5479);
  var _0x35d817 = "";
  for (var _0x59cc29 in _0x3a9c5c) {
    _0x35d817 += "<option value=\"" + _0x59cc29 + "\">" + _0x59cc29 + "</option>";
  }
  _0x1e7877 = _0x1e7877.replace("{{someopt}}", _0x35d817);
  _0x1610a6.innerHTML = _0x1e7877;
  _0x5845d0.appendChild(_0x1610a6);
  i_tXrZr_("cg" + _0x3a5479, "change", function (_0x96ad46) {
    if (i_rzpKf[_0x3a5479] != null) {
      for (var _0x46a501 in _0x3a9c5c[i_rzpKf[_0x3a5479]].data) {
        var _0x5d1d5d = _0x3a9c5c[i_rzpKf[_0x3a5479]].data[_0x46a501];
        var _0x175c69 = _0x3a9c5c[i_rzpKf[_0x3a5479]].ID;
        var _0x50e65d = _0x5d1d5d;
        var _0x2b5caa = 0;
        for (; _0x2b5caa < _0x50e65d.size; _0x2b5caa++) {
          i_iXBb_[_0x2b5caa] = parseInt(_0x50e65d.value.substr(_0x2b5caa * 2, 2), 16);
        }
        i_aZwsau({
          type: "setcheat",
          onoff: 0,
          cheatID: _0x175c69,
          cheatAddr: parseInt(_0x50e65d.address, 16),
          cheatSize: _0x50e65d.size,
          cheatData: i_iXBb_
        });
      }
    }
    i_rzpKf[_0x3a5479] = this.value;
    for (var _0x46a501 in _0x3a9c5c[this.value].data) {
      _0x5d1d5d = _0x3a9c5c[this.value].data[_0x46a501];
      _0x175c69 = _0x3a9c5c[this.value].ID;
      _0x50e65d = _0x5d1d5d;
      _0x2b5caa = 0;
      for (; _0x2b5caa < _0x50e65d.size; _0x2b5caa++) {
        i_iXBb_[_0x2b5caa] = parseInt(_0x50e65d.value.substr(_0x2b5caa * 2, 2), 16);
      }
      i_aZwsau({
        type: "setcheat",
        onoff: 1,
        cheatID: _0x175c69,
        cheatAddr: parseInt(_0x50e65d.address, 16),
        cheatSize: _0x50e65d.size,
        cheatData: i_iXBb_
      });
    }
  });
}
function i_FPWhm() {
  i_sxfci_("gamehelptitle").innerText = "【" + i_etBeu.Name + "】金手指大全";
  if (!(i_etBeu.length <= 0)) {
    i_sxfci_("nogamehelp").style.display = "none";
    var _0x21f377 = i_sxfci_("gamecheat_setlist");
    for (var _0x40b631 in i_etBeu) {
      if (_0x40b631 != "Name" && _0x40b631 != "GameType") {
        var _0xfbc871 = i_etBeu[_0x40b631];
        if (_0xfbc871.data == null) {
          i_mYznp(_0x40b631, _0xfbc871);
        } else {
          var _0x28b18b = _0xfbc871.ID;
          var _0x1b83f1 = document.createElement("div");
          var _0x211d99 = i_PNafv.replace("{{name}}", _0x40b631).replace("{{id}}", "cd" + _0x28b18b).replace("{{id}}", "cd" + _0x28b18b);
          _0x1b83f1.innerHTML = _0x211d99;
          _0x21f377.appendChild(_0x1b83f1);
          (function () {
            var _0x250a63 = _0x40b631;
            i_tXrZr_("cd" + _0x28b18b, "change", function (_0x248de2) {
              for (var _0x42cd30 in i_etBeu[_0x250a63].data) {
                var _0xf8ae59 = i_etBeu[_0x250a63].data[_0x42cd30];
                var _0x308560 = 0;
                for (; _0x308560 < _0xf8ae59.size; _0x308560++) {
                  i_iXBb_[_0x308560] = parseInt(_0xf8ae59.value.substr(_0x308560 * 2, 2), 16);
                }
                if (this.checked) {
                  i_aZwsau({
                    type: "setcheat",
                    onoff: 1,
                    cheatID: i_etBeu[_0x250a63].ID,
                    cheatAddr: parseInt(_0xf8ae59.address, 16),
                    cheatSize: _0xf8ae59.size,
                    cheatData: i_iXBb_
                  });
                } else {
                  i_aZwsau({
                    type: "setcheat",
                    onoff: 0,
                    cheatID: i_etBeu[_0x250a63].ID,
                    cheatAddr: parseInt(_0xf8ae59.address, 16),
                    cheatSize: _0xf8ae59.size,
                    cheatData: i_iXBb_
                  });
                }
              }
            });
          })();
        }
      }
    }
  }
}
function i_ECHZn() {
  if (i_iDpHde != 1) {
    var _0x1c1d80 = new XMLHttpRequest();
    _0x1c1d80.open("GET", "/cheatcode?type=fc&gid=" + gid, true);
    _0x1c1d80.responseType = "json";
    _0x1c1d80.onreadystatechange = function () {
      if (_0x1c1d80.readyState == XMLHttpRequest.DONE && _0x1c1d80.status == 200 && _0x1c1d80.response.status == "success") {
        var _0x2d610c = _0x1c1d80.response.script;
        try {
          i_etBeu = JSON.parse(_0x2d610c);
          i_FPWhm();
          if (i_etBeu != null) {
            setTimeout(function () {
              if (i_iDQBme) {
                i_rrYppt("本游戏金手指可用");
              } else {
                i_xmzByr("本游戏金手指可用");
              }
            }, 2000);
          }
        } catch (_0x441f9b) {
          return;
        }
      }
    };
    _0x1c1d80.send();
  }
}
$.fn.RangeSlider = function (_0x5aee09) {
  this.t = {
    min: _0x5aee09 && !isNaN(parseFloat(_0x5aee09.min)) ? Number(_0x5aee09.min) : null,
    max: _0x5aee09 && !isNaN(parseFloat(_0x5aee09.max)) ? Number(_0x5aee09.max) : null,
    step: _0x5aee09 && Number(_0x5aee09.step) ? _0x5aee09.step : 1,
    i: _0x5aee09 && _0x5aee09.i ? _0x5aee09.i : null
  };
  var _0x453329 = $(this);
  var _0x2899ae = this.t.min;
  var _0x55de50 = this.t.max;
  var _0x435502 = this.t.step;
  var _0x2bdd2a = this.t.i;
  _0x453329.attr("min", _0x2899ae).attr("max", _0x55de50).attr("step", _0x435502);
  _0x453329.bind("input", function (_0x8c7a5c) {
    _0x453329.attr("value", this.value);
    _0x453329.css("background-size", this.value + "% 100%");
    if ($.isFunction(_0x2bdd2a)) {
      _0x2bdd2a(this);
    }
  });
};
var i_kJwtg = "fc";
var i_wFwzh = false;
function i_SfWhb() {
  document.addEventListener("visibilitychange", function (_0x46fbbe) {
    if (document.visibilityState === "visible") {
      i_GbdzSf = false;
    }
    if (document.visibilityState === "hidden") {
      i_GbdzSf = true;
    }
  });
}
function i_ehkTy() {
  i_Wkbybr(i_iDpHde == 1 ? "欢迎进入 【" + i_BThm_e + "】【" + i_ZmCwpe + "】 房间" : "欢迎来到畅玩空间！");
}
function i_GYjtw() {
  if (navigator.userAgent.indexOf("MicroMessenger") > 0) {
    i_wFwzh = true;
  }
  if (typeof WebAssembly == "object") {
    var _0x2527bf = i_tdBda_("gstate");
    (i_DYNBTe = i_iDpHde == 1 ? (i_wesTbe = i_tdBda_("sev"), new Worker("cyc/gstyphoon.js?sev=" + i_wesTbe + "&gstate=" + _0x2527bf)) : i_tdBda_("geeker") == "1" ? new Worker("cyc/gstyphoon.js?geeker=1") : new Worker("cyc/gstyphoon.js?gstate=" + _0x2527bf)).onmessage = i_DPmFKl;
    i_DYNBTe.onerror = function (_0x552108) {
      if (_0x552108.message + "[li]:" + _0x552108.lineno != i_BiNWxe) {
        $.ajax({
          type: "post",
          url: "/notgood",
          data: {
            ng: _0x552108.message + "[li]:" + _0x552108.lineno + "[col]:" + _0x552108.colno,
            where: encodeURIComponent(location.href + "[worker]")
          },
          async: true,
          success: function (_0x37a0a6) {}
        });
        i_BiNWxe = _0x552108.message + "[li]:" + _0x552108.lineno;
      }
    };
    i_AsYjS();
    i_DjetZf();
    i_SSyQT_();
    i_NeMSsl();
    i_EibxXr();
    i_Hbmkyi();
    i_SfWhb();
    i_Hfbes_("btn_vote_yes", i_zaweE);
    i_Hfbes_("btn_vote_no", i_BMWYP);
    i_ECHZn();
    i_TEthue();
  } else {
    alert("本浏览器不支持最新web特性，请下载畅玩空间PC版或者使用chrome游戏😿");
  }
}
function i_Frwnk() {
  if (i_iDpHde == 0) {
    i_jPzhfu(i_GHKWya.o, 1);
    setTimeout(function () {
      i_jPzhfu(i_GHKWya.o, 0);
      i_xmzByr("重开了游戏");
    }, 50);
  } else if (i_pjQNyo()) {
    i_jPzhfu(i_GHKWya.o, 1);
    setTimeout(function () {
      i_jPzhfu(i_GHKWya.o, 0);
      i_hnXPpo("message", "房主重开了游戏");
    }, 50);
  } else {
    i_Wkbybr("非房主不可重开");
  }
}
function i_DAFET() {
  var _0x53f6ed = i_sxfci_("suspendTxt");
  var _0x5071e0 = i_sxfci_("suspendIcon");
  if (_0x53f6ed.innerText.indexOf("暂停") >= 0) {
    if (i_iDpHde == 1) {
      i_hnXPpo("vote", "stop");
      return;
    }
    i_iZEzAl.s();
    _0x5071e0.style.color = "#ff0000";
    _0x5071e0.classList.replace("igwi-zanting", "igwi-kaishi");
    _0x53f6ed.innerText = "继续";
  } else {
    if (i_iDpHde == 1) {
      i_hnXPpo("vote", "continue");
      return;
    }
    i_iZEzAl.l();
    _0x5071e0.style.color = "";
    _0x5071e0.classList.replace("igwi-kaishi", "igwi-zanting");
    _0x53f6ed.innerText = "暂停";
  }
}
function i_RchPx() {
  i_AfXQO();
}
function i_QasFM(_0xbdc2b4, _0x24d405) {
  i_sxfci_("votetext").innerText = _0xbdc2b4;
  i_sxfci_("popwin_vote").style.display = "block";
}
function i_BMWYP() {
  i_hnXPpo("voterez", "no");
  i_sxfci_("popwin_vote").style.display = "none";
}
function i_zaweE() {
  i_hnXPpo("voterez", "ok");
  i_sxfci_("popwin_vote").style.display = "none";
}
function i_tbcTA() {
  if (typeof WebAssembly == "object") {
    var _0x2df64e = i_tdBda_("gstate");
    (i_DYNBTe = i_iDpHde == 1 ? (i_wesTbe = i_tdBda_("sev"), new Worker("cyc/gstyphoon.js?sev=" + i_wesTbe + "&gstate=" + _0x2df64e)) : i_tdBda_("geeker") == "1" ? new Worker("cyc/gstyphoon.js?geeker=1") : new Worker("cyc/gstyphoon.js?gstate=" + _0x2df64e)).onmessage = i_DPmFKl;
    i_DYNBTe.onerror = function (_0x390317) {
      if (_0x390317.message + "[li]:" + _0x390317.lineno != i_BiNWxe) {
        $.ajax({
          type: "post",
          url: "/notgood",
          data: {
            ng: _0x390317.message + "[li]:" + _0x390317.lineno + "[col]:" + _0x390317.colno,
            where: encodeURIComponent(location.href + "[worker]")
          },
          async: true,
          success: function (_0x42f894) {}
        });
        i_BiNWxe = _0x390317.message + "[li]:" + _0x390317.lineno;
      }
    };
    i_AsYjS();
    i_DjetZf();
    i_SSyQT_();
    i_MaRANt();
    i_Hbmkyi();
    i_ECHZn();
    i_TEthue();
  } else {
    alert("本浏览器不支持最新web特性，请下载畅玩空间PC版或者使用chrome游戏😿");
  }
}
function i_AsYjS() {
  if (typeof SharedArrayBuffer != "undefined" && i_tdBda_("geeker") != "1" && (i_hFSCU = new SharedArrayBuffer(2048)) != null) {
    document.title += "*";
    i_kAGRD = new SharedArrayBuffer(306144);
    i_jwsYB = new Uint16Array(i_hFSCU, 0, 2);
    i_kCasJ = new Uint16Array(i_hFSCU, i_NPJdae, 1024 - i_NPJdae / 2);
    i_XSGMQ = new Uint32Array(i_hFSCU, i_axYhee, i_rQydie);
    i_MjAfV = new Int32Array(i_hFSCU, i_tzbWne, i_Kbikce);
    i_RfwZZ = new Uint32Array(i_hFSCU, i_ATKMte, i_Dtjcse);
  }
}
function i_hhhKC() {
  i_XdWFJe();
  i_iZhRvt(i_iDpHde == 1 ? "欢迎进入 【" + i_BThm_e + "】【" + i_ZmCwpe + "】 房间" : "单机模式，可使用云存档等方便功能");
  i_crWxSt();
}
var i_jejYK = 0;
function i_AfXQO() {
  if (i_iDpHde == 1) {
    if (i_Kbzklo == i_emcHro) {
      if (performance.now() < 60000) {
        i_iZhRvt("录像长度小于一分钟，不允许保存");
      } else if (performance.now() - i_jejYK < 60000) {
        i_iZhRvt("一分钟内只允许保存一次");
      } else {
        i_jejYK = performance.now();
        i_hnXPpo("savereplay", "");
      }
    } else {
      i_iZhRvt("目前只允许房主保存房间录像");
    }
  } else {
    i_iZhRvt("只有联机模式才允许保存录像");
  }
}
function i_GzppX() {
  if (i_iDpHde == 0) {
    i_jPzhfu(i_GHKWya.o, 1);
    setTimeout(function () {
      i_jPzhfu(i_GHKWya.o, 0);
      i_rrYppt("重开了游戏");
    }, 50);
  } else if (i_pjQNyo()) {
    i_jPzhfu(i_GHKWya.o, 1);
    setTimeout(function () {
      i_jPzhfu(i_GHKWya.o, 0);
      i_hnXPpo("message", "房主重开了游戏");
    }, 50);
  } else {
    i_iZhRvt("非房主不可重开");
  }
}
function i_GEMRR() {
  var _0x14cc3a = i_sxfci_("btn_pause");
  if (_0x14cc3a.innerText.indexOf("暂停") >= 0) {
    if (i_iDpHde == 1) {
      i_hnXPpo("vote", "stop");
      return;
    }
    i_iZEzAl.s();
    _0x14cc3a.childNodes[0].classList.replace("igwi-zanting", "igwi-jixu");
    _0x14cc3a.style.background = "rgba(220, 67, 59, 1)";
    _0x14cc3a.childNodes[1].textContent = " 继续";
  } else {
    if (i_iDpHde == 1) {
      i_hnXPpo("vote", "continue");
      return;
    }
    i_iZEzAl.l();
    _0x14cc3a.childNodes[0].classList.replace("igwi-jixu", "igwi-zanting");
    _0x14cc3a.style.background = "rgba(57, 55, 50, 1)";
    _0x14cc3a.childNodes[1].textContent = " 暂停";
  }
}
function i_GxbGz(_0x1f48db, _0x3908df) {
  i_sxfci_("votetext").innerText = _0x1f48db;
  i_sxfci_("popwin_vote").style.display = "block";
}
function i_EpjGI() {
  i_hnXPpo("voterez", "no");
  i_sxfci_("popwin_vote").style.display = "none";
}
function i_icfsN() {
  i_hnXPpo("voterez", "ok");
  i_sxfci_("popwin_vote").style.display = "none";
}
var i_hFSCU = null;
var i_kAGRD = null;
var i_jwsYB = null;
var i_dyDZG = 0;
var i_PQXfF = 1;
var i_GEPzL = 2;
var i_TTMTq = 3;
var i_MjAfV = null;
var i_ektDj = 0;
var i_SWfJY = 1;
var i_fnyPH = 2;
var i_NxPXW = 3;
var i_kCasJ = null;
var i_XSGMQ = null;
var i_RfwZZ = null;
var i_axYhee = 8;
var i_tzbWne = 32;
var i_ATKMte = 48;
var i_NPJdae = 64;
var i_rQydie = 4;
var i_xiNCoe = 4;
var i_Kbikce = 4;
var i_Dtjcse = 4;
function i_TQeTre(_0x2e35c4) {
  if (typeof _0x2e35c4 != "string") {
    _0x2e35c4 = JSON.stringify(_0x2e35c4);
  }
  navigator.sendBeacon("/nextgame/trace/gamefeedback", _0x2e35c4);
}
var i_yYwPle = {
  GameType: "",
  GameID: 0,
  u: 0,
  _: 0,
  v: 0,
  p: 0,
  m: 0
};
function i_TEthue() {
  i_yYwPle.GameType = "fc";
  i_yYwPle.GameID = parseInt(gid);
  i_yYwPle.u = new Date();
  window.addEventListener("unload", i_nSNmfe);
}
function i_nSNmfe() {
  i_yYwPle._ = new Date();
  i_yYwPle.v = i_yYwPle._ - i_yYwPle.u;
  var _0x12e92e = "link";
  if (i_iDpHde == 0) {
    _0x12e92e = "local";
  } else if (i_njFT_l) {
    _0x12e92e = "look";
  }
  i_TQeTre({
    GameType: i_yYwPle.GameType,
    GameID: i_yYwPle.GameID,
    Version: "v1.0",
    StrData: [_0x12e92e, i_wesTbe + "_" + i_ZmCwpe, i_yYwPle.u, i_yYwPle._, i_yYwPle.v + ""],
    IntData: [i_DdTaQf.LevelInfo.Level, i_DdTaQf.LevelInfo.AllXP, i_DdTaQf.LevelInfo.VipLevel, i_DdTaQf.LevelInfo.Svip, i_yYwPle.p]
  });
}
window.addEventListener("load", i_hziDPe);
var i_BThm_e = "";
var gid = 0;
var extid = 0;
var i_snTDve = false;
var i_iDpHde = 0;
var i_ZmCwpe = 0;
var i_iDQBme = false;
var i_nbDGge = 0;
var i_iDQBme = false;
var i_rXQKhe = false;
var i_wesTbe = 0;
var i_rNzMye;
var i_zrnPwe;
var i_trmnke;
var i_DYNBTe = null;
var i_BiNWxe = "";
var i_ZHidMe = 0;
function i_hziDPe() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    i_iDQBme = false;
  } else if (document.getElementById("phonewrap") == null) {
    i_iDQBme = true;
  }
  if (navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0) {
    i_rXQKhe = true;
  }
  if (!i_ankaua.g()) {
    if (i_iDQBme) {
      $("#igwWinCtl").hide();
      document.body.style.minWidth = "1180px";
      document.body.style.minHeight = "700px";
    }
  }
  gid = i_tdBda_("id");
  i_iDpHde = i_tdBda_("mode");
  i_nbDGge = i_tdBda_("rid");
  if (document.cookie.indexOf("pmode=pc") >= 0) {
    i_iDQBme = true;
  }
  if (i_iDpHde == null) {
    i_iDpHde = 0;
  }
  if (i_iDpHde == 1) {
    i_ZmCwpe = i_tdBda_("linkid");
  }
  $.get("/gameinfo?type=fc&gameid=" + gid, function (_0x3d7e20) {
    document.title = "畅玩空间 - " + _0x3d7e20.title;
    i_BThm_e = _0x3d7e20.title;
    wxCImg = _0x3d7e20.img;
    i_rNzMye = _0x3d7e20.name;
    i_zrnPwe = _0x3d7e20.size;
    i_trmnke = _0x3d7e20.data;
    i_snTDve = true;
    Wx_LinkGame = _0x3d7e20.title;
    Wx_Imgkey = i_rNzMye;
    if (i_iDQBme) {
      i_YyrnUt(i_BThm_e);
      i_tbcTA();
    } else {
      i_GcpMSr(i_BThm_e);
      i_GYjtw();
    }
  });
}
document.oncontextmenu = function (_0x4ddcbf) {
  return false;
};
var i_JDTmEe = false;
function i_nHTFAe() {
  if (!i_JDTmEe) {
    i_JDTmEe = true;
    i_TAQtGu();
    if (i_iDQBme) {
      i_hhhKC();
    } else {
      i_ehkTy();
    }
  }
}
var i_WEwySe = 0;
var i_twDsCe = null;
var i_aPKPKe = null;
var i_TxyTOe = true;
var i_ctdwXe = true;
var i_KbnfRe = false;
var i_fEyRze = true;
var i_DJxhIe = false;
var i_stXiNe = true;
var i_YrMEUe = true;
var i_wemjDe = true;
var i_MkXN$e = false;
var i_SGZcBe = false;
var i_QcpMGe = true;
var i_rRKjFe = true;
var i_yhsMLe = false;
var i_Rwcaqe = false;
var i_kJQyVe = new Int32Array(128);
var i_WkaSje = `<div class="onegamehelpset">
                <span class='onegamehelpsetName'>{{name}}</span>
                <input type="checkbox" id="{{id}}" class="key" checked>
                <label for="{{id}}" class="key-bg">
                    <span class="circle"></span>
                    <span class="on">开</span>
                    <span class="off">关</span>
                </label>
                </div>`;
function i_XNMcYe(_0x27eeea) {
  if (_0x27eeea.id == "sgqbws_xs") {
    i_TxyTOe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbws_xst") {
    i_stXiNe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbws_ms") {
    i_ctdwXe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbws_sh") {
    i_KbnfRe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbws_time") {
    i_fEyRze = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbws_yx") {
    i_DJxhIe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbws_rankwj" && i_Kbzklo == i_emcHro && _0x27eeea.checked) {
    cyc_queryID("sgqbws_rankwj").disabled = (i_iDpHde == 0 ? (i_kJQyVe[0] = 180, i_DYNBTe.postMessage(i_kJQyVe.buffer)) : (i_hnXPpo("message", "【随机武将开启】"), i_kJQyVe[0] = i_EHEBeo + 180, i_sCrNao.send(i_kJQyVe)), true);
  }
  if (_0x27eeea.id == "sgqbws_rankBwj" && i_Kbzklo == i_emcHro && _0x27eeea.checked) {
    cyc_queryID("sgqbws_rankBwj").disabled = (i_iDpHde == 0 ? (i_kJQyVe[3] = 180, i_DYNBTe.postMessage(i_kJQyVe.buffer)) : (i_hnXPpo("message", "【随机B面武将开启】"), i_kJQyVe[3] = i_EHEBeo + 180, i_sCrNao.send(i_kJQyVe)), true);
  }
  if (_0x27eeea.id == "sgqbws_study" && i_Kbzklo == i_emcHro && _0x27eeea.checked) {
    cyc_queryID("sgqbws_study").disabled = (i_iDpHde == 1 ? (i_hnXPpo("message", "【练习模式开启】"), i_kJQyVe[1] = i_EHEBeo + 180, i_sCrNao.send(i_kJQyVe)) : (i_kJQyVe[1] = 180, i_DYNBTe.postMessage(i_kJQyVe.buffer)), true);
  }
  if (_0x27eeea.id == "sgqbws_dead" && i_Kbzklo == i_emcHro && _0x27eeea.checked) {
    cyc_queryID("sgqbws_dead").disabled = (i_iDpHde == 1 ? (i_hnXPpo("message", "【敌人不动开启】"), i_kJQyVe[2] = i_EHEBeo + 180, i_sCrNao.send(i_kJQyVe)) : (i_kJQyVe[2] = 180, i_DYNBTe.postMessage(i_kJQyVe.buffer)), true);
  }
  if (_0x27eeea.id == "sgqxzq_rankwj" && i_Kbzklo == i_emcHro && _0x27eeea.checked) {
    cyc_queryID("sgqxzq_rankwj").disabled = (i_iDpHde == 0 ? (i_kJQyVe[0] = 180, i_DYNBTe.postMessage(i_kJQyVe.buffer)) : (i_hnXPpo("message", "【随机武将开启】"), i_kJQyVe[0] = i_EHEBeo + 180, i_sCrNao.send(i_kJQyVe)), true);
  }
  if (_0x27eeea.id == "sgqbqx_xs") {
    i_YrMEUe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbqx_xst") {
    i_wemjDe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbqx_sh") {
    i_MkXN$e = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbqx_yx") {
    i_SGZcBe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbpl_xs") {
    i_QcpMGe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbpl_xst") {
    i_rRKjFe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbpl_sh") {
    i_yhsMLe = _0x27eeea.checked;
  }
  if (_0x27eeea.id == "sgqbpl_yx") {
    i_Rwcaqe = _0x27eeea.checked;
  }
}
var i_BzsmHe = false;
var i_ymWyWe = false;
function i_XdWFJe() {}
function i_SxTmQe() {}
function i_RPkWZe(_0xbc1560) {
  if (!(_0xbc1560.length <= 0)) {
    i_sxfci_("nogamehelp").style.display = "none";
    var _0x5bea39 = i_sxfci_("gamehelp_setlist");
    for (var _0x6852e in _0xbc1560) {
      var _0x9eb6fd = _0xbc1560[_0x6852e];
      switch (_0x9eb6fd.type) {
        case "checkbox":
          var _0x5a9d15 = document.createElement("div");
          var _0x55ea37 = i_WkaSje.replace("{{name}}", _0x9eb6fd.name).replace("{{id}}", _0x9eb6fd.id).replace("{{id}}", _0x9eb6fd.id);
          if (!_0x9eb6fd.value) {
            _0x55ea37 = _0x55ea37.replace("checked", "");
          }
          _0x5a9d15.innerHTML = _0x55ea37;
          _0x5bea39.appendChild(_0x5a9d15);
          (function () {
            var _0x389ccc = _0x6852e;
            i_tXrZr_(_0x9eb6fd.id, "change", function (_0x544fd5) {
              _0xbc1560[_0x389ccc].value = this.checked;
            });
          })();
          break;
        case "checkfunc":
          _0x5a9d15 = document.createElement("div");
          _0x55ea37 = i_WkaSje.replace("{{name}}", _0x9eb6fd.name).replace("{{id}}", _0x9eb6fd.id).replace("{{id}}", _0x9eb6fd.id);
          if (!_0x9eb6fd.value) {
            _0x55ea37 = _0x55ea37.replace("checked", "");
          }
          _0x5a9d15.innerHTML = _0x55ea37;
          _0x5bea39.appendChild(_0x5a9d15);
          i_tXrZr_(_0x9eb6fd.id, "change", _0xbc1560[_0x6852e].h);
      }
    }
  }
}
function i_sEwEen(_0x23b50d) {
  if (i_iDQBme) {
    if (i_bPrAQi) {
      i_XwGBAu();
      return;
    }
    i_aPKPKe.clearRect(0, 0, i_twDsCe.width, i_twDsCe.height);
    i_aPKPKe.fillStyle = "rgba(15,15,16,0.5)";
    i_aPKPKe.fillRect(0, 0, i_twDsCe.width, i_twDsCe.height);
    var _0x5dcc4d = i_aPKPKe.font;
    i_aPKPKe.font = "30px Verdana";
    var _0x19f1a1 = i_aPKPKe.createLinearGradient(0, 0, i_twDsCe.width, 0);
    _0x19f1a1.addColorStop(0, "#fff");
    _0x19f1a1.addColorStop(0.5, "#aaa");
    _0x19f1a1.addColorStop(1, "#888");
    i_aPKPKe.fillStyle = _0x19f1a1;
    i_aPKPKe.fillText(_0x23b50d, i_twDsCe.width / 2 - 50, i_twDsCe.height / 2, 300);
    i_aPKPKe.font = _0x5dcc4d;
  }
}
function i_ntwTnn() {
  i_aPKPKe.clearRect(0, 0, i_twDsCe.width * 2, i_twDsCe.height);
}
var i_XSeBtn = new Array();
function i_BSKman(_0x2e3fb5) {}
var i_tdceon = {
  k: {
    name: "显血条",
    id: "gh_showhhp",
    value: true,
    type: "checkbox"
  },
  T: {
    name: "显HP",
    id: "gh_showhptext",
    value: true,
    type: "checkbox"
  },
  M: {
    name: "显优先",
    id: "gh_showyouxian",
    value: false,
    type: "checkbox"
  },
  P: {
    name: "显伤害",
    id: "gh_showdmg",
    value: false,
    type: "checkbox"
  }
};
function i_zWYrcn(_0x5868c5) {
  i_aPKPKe.strokeStyle = "#111";
  i_aPKPKe.shadowColor = "#202020";
  i_aPKPKe.shadowOffsetX = 1;
  i_aPKPKe.shadowOffsetY = 1;
  i_aPKPKe.shadowBlur = 2;
  var _0x5b522b = 0;
  for (; _0x5b522b < 8; _0x5b522b++) {
    var _0x4f46e0 = _0x5868c5[49 + _0x5b522b] * 2;
    var _0x1ec832 = _0x5868c5[65 + _0x5b522b] * 2 + _0x5868c5[81 + _0x5b522b] * 2 - 148;
    var _0x34a73a = _0x5868c5[99 + _0x5b522b];
    if (_0x34a73a != 0 && i_tdceon.P.value) {
      var _0x3dbf04 = _0x1ec832 + 30 + Math.floor(_0x34a73a / 4);
      if (_0x1ec832 < 20) {
        _0x3dbf04 = 30 + Math.floor(_0x34a73a / 4);
      }
      var _0x5bc370 = {
        x: _0x4f46e0 + Math.floor(Math.random() * 60) - 30,
        y: _0x3dbf04,
        S: _0x34a73a * 100,
        K: 15,
        O: 12,
        R: Math.floor(_0x34a73a / 40) + 2
      };
      i_XSeBtn.push(_0x5bc370);
    }
  }
  if (i_MChKiu % 2 != 0) {
    i_aPKPKe.clearRect(0, 0, i_twDsCe.width, i_twDsCe.width);
    i_aPKPKe.fillStyle = "#eee";
    if (i_tdceon.k.value) {
      var _0x520cfb = 0;
      for (_0x5b522b = 0; _0x5b522b < 8; _0x5b522b++) {
        if (_0x5868c5[17 + _0x5b522b] != 0) {
          _0x4f46e0 = _0x5868c5[49 + _0x5b522b] * 2;
          _0x1ec832 = _0x5868c5[65 + _0x5b522b] * 2 + _0x5868c5[81 + _0x5b522b] * 2 - 148;
          i_aPKPKe.fillStyle = "#eee";
          i_aPKPKe.strokeStyle = "#111";
          var _0x2ca803 = "";
          if (i_tdceon.M.value) {
            _0x2ca803 = _0x5b522b + 1 + ". ";
          }
          if (i_tdceon.T.value) {
            i_aPKPKe.strokeText(_0x2ca803 + "HP:" + _0x5868c5[17 + _0x5b522b] * 100, _0x4f46e0 + 1 - 10, _0x1ec832 + 1, 100);
            i_aPKPKe.fillText(_0x2ca803 + "HP:" + _0x5868c5[17 + _0x5b522b] * 100, _0x4f46e0 - 10, _0x1ec832, 100);
          }
          i_aPKPKe.strokeStyle = "#fff";
          i_aPKPKe.lineWidth = 1;
          i_aPKPKe.beginPath();
          i_aPKPKe.rect(_0x4f46e0 - 16, _0x1ec832 - 20, 60, 2);
          i_aPKPKe.closePath();
          i_aPKPKe.stroke();
          var _0x59286c = _0x5868c5[17 + _0x5b522b] / _0x5868c5[33 + _0x5b522b] * 60;
          i_aPKPKe.fillStyle = _0x59286c > 40 ? "#50ff60" : _0x59286c > 20 ? "#f06f00" : "#cf0000";
          i_aPKPKe.fillRect(_0x4f46e0 - 16, _0x1ec832 - 20, _0x59286c, 2);
          _0x520cfb++;
        }
      }
      if (_0x5868c5[0] > 0) {
        i_aPKPKe.fillStyle = "#f0fff0";
      } else {
        i_aPKPKe.fillStyle = "#909090";
      }
      i_aPKPKe.strokeStyle = "#111";
      i_aPKPKe.strokeText("剩余敌人" + _0x520cfb, i_kRDkS_ * 2 - 90 + 1, i_kPQcC_ * 2 - 35 + 1, 100);
      i_aPKPKe.fillText("剩余敌人" + _0x520cfb, i_kRDkS_ * 2 - 90, i_kPQcC_ * 2 - 35, 100);
    }
    if (i_tdceon.P.value) {
      var _0x413538;
      var _0x4c7bc1 = i_aPKPKe.font;
      i_aPKPKe.shadowColor = "#fffc00";
      i_aPKPKe.shadowBlur = 5;
      i_aPKPKe.lineWidth = 2;
      for (_0x413538 in i_XSeBtn) {
        i_XSeBtn[_0x413538].K--;
        i_XSeBtn[_0x413538].y -= 2;
        if (i_XSeBtn[_0x413538].K > 5) {
          i_XSeBtn[_0x413538].O += i_XSeBtn[_0x413538].R;
        }
        if (i_XSeBtn[_0x413538].K > 0) {
          i_aPKPKe.font = "900 " + i_XSeBtn[_0x413538].O + "px Microsoft YaHei";
          var _0x23f9e2 = i_aPKPKe.createLinearGradient(i_XSeBtn[_0x413538].x, i_XSeBtn[_0x413538].y - i_XSeBtn[_0x413538].O + 5, i_XSeBtn[_0x413538].x, i_XSeBtn[_0x413538].y - 5);
          _0x23f9e2.addColorStop(0, "#5be8a0");
          _0x23f9e2.addColorStop(1, "#ff0050");
          i_aPKPKe.fillStyle = _0x23f9e2;
          i_aPKPKe.fillText(i_XSeBtn[_0x413538].S, i_XSeBtn[_0x413538].x, i_XSeBtn[_0x413538].y, 300);
          i_aPKPKe.strokeText(i_XSeBtn[_0x413538].S, i_XSeBtn[_0x413538].x, i_XSeBtn[_0x413538].y, 300);
        } else {
          i_XSeBtn.shift();
        }
      }
      i_aPKPKe.font = _0x4c7bc1;
    }
  }
}
var i_mQEfsn = {
  k: {
    name: "显血条",
    id: "gh_showhhp",
    value: true,
    type: "checkbox"
  },
  T: {
    name: "显HP",
    id: "gh_showhptext",
    value: true,
    type: "checkbox"
  },
  M: {
    name: "显优先",
    id: "gh_showyouxian",
    value: false,
    type: "checkbox"
  },
  P: {
    name: "显伤害",
    id: "gh_showdmg",
    value: false,
    type: "checkbox"
  },
  I: {
    name: "随机武将",
    id: "gh_randsel",
    type: "checkfunc",
    value: false,
    h: function (_0xacd2fd) {
      if (this.checked) {
        if (i_Kbzklo != i_emcHro) {
          i_iZhRvt("非房主不可设置");
          this.checked = false;
          return;
        }
        if (i_iDpHde == 0) {
          i_kJQyVe[0] = 180;
          i_DYNBTe.postMessage(i_kJQyVe.buffer);
          i_sxfci_("gh_randsel").disabled = true;
          i_iZhRvt("【随机武将开启】");
        } else {
          i_hnXPpo("message", "【随机武将开启】");
          i_kJQyVe[0] = i_EHEBeo + 180;
          i_sCrNao.send(i_kJQyVe);
          i_sxfci_("gh_randsel").disabled = true;
        }
      }
    }
  }
};
function i_SShjrn(_0x495baf) {
  i_aPKPKe.strokeStyle = "#111";
  i_aPKPKe.shadowColor = "#202020";
  i_aPKPKe.shadowOffsetX = 1;
  i_aPKPKe.shadowOffsetY = 1;
  i_aPKPKe.shadowBlur = 2;
  var _0x57776e = 0;
  for (; _0x57776e < 8; _0x57776e++) {
    var _0x353a8e = _0x495baf[49 + _0x57776e] * 2;
    var _0x466601 = _0x495baf[65 + _0x57776e] * 2 + _0x495baf[81 + _0x57776e] * 2 - 148;
    var _0x1be253 = _0x495baf[99 + _0x57776e];
    if (_0x1be253 != 0 && i_mQEfsn.P.value) {
      var _0x20fb70 = _0x466601 + 30 + Math.floor(_0x1be253 / 4);
      if (_0x466601 < 20) {
        _0x20fb70 = 30 + Math.floor(_0x1be253 / 4);
      }
      var _0x36bd40 = {
        x: _0x353a8e + Math.floor(Math.random() * 60) - 30,
        y: _0x20fb70,
        S: _0x1be253 * 100,
        K: 15,
        O: 12,
        R: Math.floor(_0x1be253 / 40) + 2
      };
      i_XSeBtn.push(_0x36bd40);
    }
  }
  if (i_MChKiu % 2 != 0) {
    i_aPKPKe.clearRect(0, 0, i_twDsCe.width, i_twDsCe.width);
    i_aPKPKe.fillStyle = "#eee";
    if (i_mQEfsn.k.value) {
      var _0x276b33 = 0;
      for (_0x57776e = 0; _0x57776e < 8; _0x57776e++) {
        if (_0x495baf[17 + _0x57776e] != 0) {
          _0x353a8e = _0x495baf[49 + _0x57776e] * 2;
          _0x466601 = _0x495baf[65 + _0x57776e] * 2 + _0x495baf[81 + _0x57776e] * 2 - 148;
          i_aPKPKe.fillStyle = "#eee";
          i_aPKPKe.strokeStyle = "#111";
          var _0x40d694 = "";
          if (i_mQEfsn.M.value) {
            _0x40d694 = _0x57776e + 1 + ". ";
          }
          if (i_mQEfsn.T.value) {
            i_aPKPKe.strokeText(_0x40d694 + "HP:" + _0x495baf[17 + _0x57776e] * 100, _0x353a8e + 1 - 10, _0x466601 + 1, 100);
            i_aPKPKe.fillText(_0x40d694 + "HP:" + _0x495baf[17 + _0x57776e] * 100, _0x353a8e - 10, _0x466601, 100);
          }
          i_aPKPKe.strokeStyle = "#fff";
          i_aPKPKe.lineWidth = 1;
          i_aPKPKe.beginPath();
          i_aPKPKe.rect(_0x353a8e - 16, _0x466601 - 20, 60, 2);
          i_aPKPKe.closePath();
          i_aPKPKe.stroke();
          var _0x26b1cd = _0x495baf[17 + _0x57776e] / _0x495baf[33 + _0x57776e] * 60;
          i_aPKPKe.fillStyle = _0x26b1cd > 40 ? "#50ff60" : _0x26b1cd > 20 ? "#f06f00" : "#cf0000";
          i_aPKPKe.fillRect(_0x353a8e - 16, _0x466601 - 20, _0x26b1cd, 2);
          _0x276b33++;
        }
      }
      if (_0x495baf[0] > 0) {
        i_aPKPKe.fillStyle = "#f0fff0";
      } else {
        i_aPKPKe.fillStyle = "#909090";
      }
      i_aPKPKe.strokeStyle = "#111";
      i_aPKPKe.strokeText("剩余敌人" + _0x276b33, i_kRDkS_ * 2 - 90 + 1, i_kPQcC_ * 2 - 35 + 1, 100);
      i_aPKPKe.fillText("剩余敌人" + _0x276b33, i_kRDkS_ * 2 - 90, i_kPQcC_ * 2 - 35, 100);
    }
    if (i_mQEfsn.P.value) {
      var _0xf32f47;
      var _0x30f771 = i_aPKPKe.font;
      i_aPKPKe.shadowColor = "#fffc00";
      i_aPKPKe.shadowBlur = 5;
      i_aPKPKe.lineWidth = 2;
      for (_0xf32f47 in i_XSeBtn) {
        i_XSeBtn[_0xf32f47].K--;
        i_XSeBtn[_0xf32f47].y -= 2;
        if (i_XSeBtn[_0xf32f47].K > 5) {
          i_XSeBtn[_0xf32f47].O += i_XSeBtn[_0xf32f47].R;
        }
        if (i_XSeBtn[_0xf32f47].K > 0) {
          i_aPKPKe.font = "900 " + i_XSeBtn[_0xf32f47].O + "px Microsoft YaHei";
          var _0x5ed5d6 = i_aPKPKe.createLinearGradient(i_XSeBtn[_0xf32f47].x, i_XSeBtn[_0xf32f47].y - i_XSeBtn[_0xf32f47].O + 5, i_XSeBtn[_0xf32f47].x, i_XSeBtn[_0xf32f47].y - 5);
          _0x5ed5d6.addColorStop(0, "#5be8a0");
          _0x5ed5d6.addColorStop(1, "#ff0050");
          i_aPKPKe.fillStyle = _0x5ed5d6;
          i_aPKPKe.fillText(i_XSeBtn[_0xf32f47].S, i_XSeBtn[_0xf32f47].x, i_XSeBtn[_0xf32f47].y, 300);
          i_aPKPKe.strokeText(i_XSeBtn[_0xf32f47].S, i_XSeBtn[_0xf32f47].x, i_XSeBtn[_0xf32f47].y, 300);
        } else {
          i_XSeBtn.shift();
        }
      }
      i_aPKPKe.font = _0x30f771;
    }
  }
}
var i_EBCZln = {
  k: {
    name: "显血条",
    id: "gh_showhhp",
    value: true,
    type: "checkbox"
  },
  N: {
    name: "显模式",
    id: "gh_showmode",
    value: true,
    type: "checkbox"
  },
  U: {
    name: "计时器",
    id: "gh_showtime",
    value: true,
    type: "checkbox"
  },
  T: {
    name: "显HP",
    id: "gh_showhptext",
    value: true,
    type: "checkbox"
  },
  M: {
    name: "显优先",
    id: "gh_showyouxian",
    value: false,
    type: "checkbox"
  },
  P: {
    name: "显伤害",
    id: "gh_showdmg",
    value: false,
    type: "checkbox"
  },
  I: {
    name: "随机武将",
    id: "gh_randsel",
    type: "checkfunc",
    value: false,
    h: function (_0x4aad6e) {
      if (this.checked) {
        if (i_Kbzklo != i_emcHro) {
          i_iZhRvt("非房主不可设置");
          this.checked = false;
          return;
        }
        if (i_iDpHde == 0) {
          i_kJQyVe[0] = 180;
          i_DYNBTe.postMessage(i_kJQyVe.buffer);
          i_sxfci_("gh_randsel").disabled = true;
          i_iZhRvt("【随机武将开启】");
        } else {
          i_hnXPpo("message", "【随机武将开启】");
          i_kJQyVe[0] = i_EHEBeo + 180;
          i_sCrNao.send(i_kJQyVe);
          i_sxfci_("gh_randsel").disabled = true;
        }
      }
    }
  },
  D: {
    name: "随机B面武将",
    id: "gh_randbsel",
    type: "checkfunc",
    value: false,
    h: function (_0x496b5c) {
      if (this.checked) {
        if (i_Kbzklo != i_emcHro) {
          i_iZhRvt("非房主不可设置");
          this.checked = false;
          return;
        }
        if (i_iDpHde == 0) {
          i_kJQyVe[3] = 180;
          i_DYNBTe.postMessage(i_kJQyVe.buffer);
          i_sxfci_("gh_randbsel").disabled = true;
          i_iZhRvt("【随机B武将开启】");
        } else {
          i_hnXPpo("message", "【随机B面武将开启】");
          i_kJQyVe[3] = i_EHEBeo + 180;
          i_sCrNao.send(i_kJQyVe);
          i_sxfci_("gh_randbsel").disabled = true;
        }
      }
    }
  },
  G: {
    name: "练习模式",
    id: "gh_studymod",
    type: "checkfunc",
    value: false,
    h: function (_0x2458f7) {
      if (this.checked) {
        if (i_Kbzklo != i_emcHro) {
          i_iZhRvt("非房主不可设置");
          this.checked = false;
          return;
        }
        if (i_iDpHde == 1) {
          i_hnXPpo("message", "【练习模式开启】");
          i_kJQyVe[1] = i_EHEBeo + 180;
          i_sCrNao.send(i_kJQyVe);
          i_sxfci_("gh_studymod").disabled = true;
        } else {
          i_kJQyVe[1] = 180;
          i_DYNBTe.postMessage(i_kJQyVe.buffer);
          i_sxfci_("gh_studymod").disabled = true;
          i_GJQKdt("【练习模式开启】");
        }
      }
    }
  },
  F: {
    name: "敌人不攻击",
    id: "gh_deadman",
    type: "checkfunc",
    value: false,
    h: function (_0x16c1da) {
      if (this.checked) {
        if (i_Kbzklo != i_emcHro) {
          i_iZhRvt("非房主不可设置");
          this.checked = false;
          return;
        }
        if (i_iDpHde == 1) {
          i_hnXPpo("message", "【敌人不动开启】");
          i_kJQyVe[2] = i_EHEBeo + 180;
          i_sCrNao.send(i_kJQyVe);
          i_sxfci_("gh_deadman").disabled = true;
        } else {
          i_kJQyVe[2] = 180;
          i_DYNBTe.postMessage(i_kJQyVe.buffer);
          i_sxfci_("gh_deadman").disabled = true;
          i_GJQKdt("【敌人不动开启】");
        }
      }
    }
  }
};
function i_dkWyun(_0x26f273) {
  var _0x35a0af = 0;
  for (; _0x35a0af < _0x26f273[0]; _0x35a0af++) {
    var _0x472aed = _0x26f273[49 + _0x35a0af] * 2;
    var _0x25b52e = _0x26f273[65 + _0x35a0af] * 2 + _0x26f273[81 + _0x35a0af] * 2 - 148;
    var _0x50a47a = _0x26f273[99 + _0x35a0af];
    if (_0x50a47a != 0 && i_EBCZln.P.value) {
      var _0xe6120 = _0x25b52e + 30 + Math.floor(_0x50a47a / 4);
      if (_0x25b52e < 20) {
        _0xe6120 = 30 + Math.floor(_0x50a47a / 4);
      }
      var _0x32a1d0 = {
        x: _0x472aed + Math.floor(Math.random() * 60) - 30,
        y: _0xe6120,
        S: _0x50a47a * 100,
        K: 15,
        O: 12,
        R: Math.floor(_0x50a47a / 40) + 2
      };
      i_XSeBtn.push(_0x32a1d0);
    }
  }
  if (i_MChKiu % 2 != 0) {
    i_aPKPKe.clearRect(0, 0, i_twDsCe.width, i_twDsCe.width);
    if (i_EBCZln.U.value) {
      var _0x4948c1 = _0x26f273[98];
      var _0x43ef8f = Math.floor(_0x4948c1 * 16.66666 / 1000);
      var _0x29b34f = Math.floor(_0x43ef8f / 60);
      _0x43ef8f %= 60;
      var _0x388d7f = Math.floor(_0x4948c1 * 16.66666 % 1000 / 10);
      i_aPKPKe.fillStyle = "#30ff30";
      i_aPKPKe.strokeStyle = "#111";
      i_aPKPKe.shadowColor = "#202020";
      i_aPKPKe.shadowOffsetX = 1;
      i_aPKPKe.shadowOffsetY = 1;
      i_aPKPKe.shadowBlur = 2;
      i_aPKPKe.strokeText(" " + _0x29b34f + "分" + _0x43ef8f + "." + _0x388d7f + "秒", i_kRDkS_ * 2 - 80 + 1, i_kPQcC_ * 2 - 4 + 1, 100);
      i_aPKPKe.fillText(" " + _0x29b34f + "分" + _0x43ef8f + "." + _0x388d7f + "秒", i_kRDkS_ * 2 - 80, i_kPQcC_ * 2 - 4, 100);
    }
    i_aPKPKe.fillStyle = "#eee";
    if (i_EBCZln.N.value) {
      var _0x468ae8 = "";
      if (_0x26f273[97] & 8) {
        _0x468ae8 = "上";
      }
      if (_0x26f273[97] & 4) {
        _0x468ae8 += "下";
      }
      if (_0x26f273[97] & 1) {
        _0x468ae8 += "A";
      }
      if (_0x26f273[97] & 2) {
        _0x468ae8 += "B";
      }
      if (_0x26f273[97] & 16) {
        _0x468ae8 += "C";
      }
      if (_0x468ae8 == "") {
        _0x468ae8 = "无";
      }
      switch (_0x26f273[115]) {
        case 1:
          _0x468ae8 += "【简单】";
          break;
        case 2:
          _0x468ae8 += "【极难】";
          break;
        case 3:
          _0x468ae8 += "【达人】";
          break;
        case 4:
          _0x468ae8 += "【专家】";
          break;
        case 5:
          _0x468ae8 += "【大师】";
          break;
        case 6:
          _0x468ae8 += "【宗师】";
          break;
        case 7:
          _0x468ae8 += "【天王】";
          break;
        case 8:
          _0x468ae8 += "【至尊】";
          break;
        case 9:
          _0x468ae8 += "【传说】";
          break;
        default:
          _0x468ae8 += "[未知难度]";
      }
      i_aPKPKe.strokeText("模式:" + _0x468ae8, i_kRDkS_ * 2 - 120 + 1, i_kPQcC_ * 2 - 50 + 1, 120);
      i_aPKPKe.fillText("模式:" + _0x468ae8, i_kRDkS_ * 2 - 120, i_kPQcC_ * 2 - 50, 120);
    }
    if (i_EBCZln.k.value) {
      var _0x2fc528 = 0;
      for (_0x35a0af = 0; _0x35a0af < _0x26f273[0]; _0x35a0af++) {
        if (_0x26f273[17 + _0x35a0af] != 0) {
          _0x472aed = _0x26f273[49 + _0x35a0af] * 2;
          _0x25b52e = _0x26f273[65 + _0x35a0af] * 2 + _0x26f273[81 + _0x35a0af] * 2 - 148;
          i_aPKPKe.fillStyle = "#eee";
          i_aPKPKe.strokeStyle = "#111";
          var _0x529df8 = "";
          if (i_EBCZln.M.value) {
            _0x529df8 = _0x35a0af + 1 + ". ";
          }
          if (i_EBCZln.T) {
            i_aPKPKe.strokeText(_0x529df8 + "HP:" + _0x26f273[17 + _0x35a0af] * 100, _0x472aed + 1 - 10, _0x25b52e + 1, 100);
            i_aPKPKe.fillText(_0x529df8 + "HP:" + _0x26f273[17 + _0x35a0af] * 100, _0x472aed - 10, _0x25b52e, 100);
          }
          i_aPKPKe.strokeStyle = "#fff";
          i_aPKPKe.lineWidth = 1;
          i_aPKPKe.beginPath();
          i_aPKPKe.rect(_0x472aed - 16, _0x25b52e - 20, 60, 2);
          i_aPKPKe.closePath();
          i_aPKPKe.stroke();
          var _0x24d52b = _0x26f273[17 + _0x35a0af] / _0x26f273[33 + _0x35a0af] * 60;
          i_aPKPKe.fillStyle = _0x24d52b > 40 ? "#50ff60" : _0x24d52b > 20 ? "#f06f00" : "#cf0000";
          i_aPKPKe.fillRect(_0x472aed - 16, _0x25b52e - 20, _0x24d52b, 2);
          _0x2fc528++;
        }
      }
      if (_0x26f273[0] > 0) {
        i_aPKPKe.fillStyle = "#f0fff0";
      } else {
        i_aPKPKe.fillStyle = "#909090";
      }
      i_aPKPKe.strokeStyle = "#111";
      i_aPKPKe.strokeText("剩余敌人" + _0x2fc528, i_kRDkS_ * 2 - 90 + 1, i_kPQcC_ * 2 - 35 + 1, 100);
      i_aPKPKe.fillText("剩余敌人" + _0x2fc528, i_kRDkS_ * 2 - 90, i_kPQcC_ * 2 - 35, 100);
      if (i_EBCZln.P.value) {
        var _0x51cb03;
        var _0x39f0aa = i_aPKPKe.font;
        i_aPKPKe.shadowColor = "#fffc00";
        i_aPKPKe.shadowBlur = 5;
        i_aPKPKe.lineWidth = 2;
        for (_0x51cb03 in i_XSeBtn) {
          i_XSeBtn[_0x51cb03].K--;
          i_XSeBtn[_0x51cb03].y -= 2;
          if (i_XSeBtn[_0x51cb03].K > 5) {
            i_XSeBtn[_0x51cb03].O += i_XSeBtn[_0x51cb03].R;
          }
          if (i_XSeBtn[_0x51cb03].K > 0) {
            i_aPKPKe.font = "900 " + i_XSeBtn[_0x51cb03].O + "px Microsoft YaHei";
            var _0x38dd3f = i_aPKPKe.createLinearGradient(i_XSeBtn[_0x51cb03].x, i_XSeBtn[_0x51cb03].y - i_XSeBtn[_0x51cb03].O + 5, i_XSeBtn[_0x51cb03].x, i_XSeBtn[_0x51cb03].y - 5);
            _0x38dd3f.addColorStop(0, "#5be8a0");
            _0x38dd3f.addColorStop(1, "#ff0050");
            i_aPKPKe.fillStyle = _0x38dd3f;
            i_aPKPKe.fillText(i_XSeBtn[_0x51cb03].S, i_XSeBtn[_0x51cb03].x, i_XSeBtn[_0x51cb03].y, 300);
            i_aPKPKe.strokeText(i_XSeBtn[_0x51cb03].S, i_XSeBtn[_0x51cb03].x, i_XSeBtn[_0x51cb03].y, 300);
          } else {
            i_XSeBtn.shift();
          }
        }
        i_aPKPKe.font = _0x39f0aa;
      }
    }
  }
}
function i_MNhEfn() {}
var i_ZkGQ_n = false;
function i_kRWdvn() {
  $("#loadingpos").RangeSlider({
    min: 0,
    max: 100,
    step: 0.1,
    i: function (_0x3181ba) {}
  });
}
function i_Gphxdn(_0x1ac960) {
  i_sxfci_("loadingpos").value = _0x1ac960;
  i_sxfci_("loadingpos").style.backgroundSize = _0x1ac960 + "% 100%";
  if (_0x1ac960 >= 100 && i_ZkGQ_n == 0) {
    i_ZkGQ_n = true;
    i_sxfci_("loadingprogress").style.display = "none";
    i_sxfci_("loadingimg").style.display = "none";
    i_nHTFAe();
  }
}
var i_GFETpn = "<option value=\"{{pos}}\">{{name}}</option>";
function i_dWCtmn(_0x2d8a86) {
  i_HjtSei = parseInt(this.value);
  localStorage.setItem("lastgamepad", v_allGamePadName[this.value].id);
}
function i_ysQfgn() {
  i_tXrZr_("gamepad_select", "change", i_dWCtmn);
}
function i_StRmhn(_0x22950e) {
  i_sxfci_("gamepad_select").innerHTML = "";
  var _0x446143 = false;
  var _0x23e0ff = 0;
  i_HjtSei = -1;
  v_allGamePadName = {};
  var _0x17a968 = localStorage.getItem("lastgamepad");
  var _0x12f96e = 0;
  for (; _0x12f96e < _0x22950e.length; _0x12f96e++) {
    if (_0x22950e[_0x12f96e] != null) {
      _0x446143 = true;
      var _0xc8de5b = document.createElement("option");
      _0xc8de5b.value = _0x12f96e;
      _0xc8de5b.setAttribute("key", _0x22950e[_0x12f96e].id);
      _0xc8de5b.innerHTML = _0x22950e[_0x12f96e].id.substr(0, _0x22950e[_0x12f96e].id.indexOf("(Ven"));
      if (_0xc8de5b.innerHTML == "") {
        _0xc8de5b.innerHTML = _0x22950e[_0x12f96e].id.substr(0, _0x22950e[_0x12f96e].id.indexOf("("));
      }
      i_sxfci_("gamepad_select").appendChild(_0xc8de5b);
      _0x23e0ff++;
      if (!(i_HjtSei != -1 && _0x17a968 != _0x22950e[_0x12f96e].id)) {
        i_HjtSei = _0x12f96e;
      }
      v_allGamePadName[_0x12f96e] = {};
      v_allGamePadName[_0x12f96e].id = _0x22950e[_0x12f96e].id;
      v_allGamePadName[_0x12f96e].num = _0x12f96e;
    }
  }
  if (_0x446143) {
    i_sxfci_("gamepad_select").value = v_allGamePadName[i_HjtSei].num;
  } else {
    i_sxfci_("gamepad_select").innerHTML = "<option value=\"-1\">无</option>";
  }
  return _0x23e0ff;
}
var i_cJzsbn = false;
function i_mPGKyn(_0x1b417d) {
  if ((_0x1f07e5 = (_0x1f07e5 = (_0x1f07e5 = i_WmyDOu.PCSet[i_Brhwo_(_0x1b417d)].replace("Key", "")).replace("Digit", "")).replace("Numpad", "")) == "NO") {
    _0x1f07e5 = "空";
  }
  _0x1b417d.value = _0x1f07e5;
  if (i_cJzsbn && (i_Brhwo_(_0x1b417d).indexOf("KeyX") >= 0 || i_Brhwo_(_0x1b417d).indexOf("KeyS") >= 0)) {
    var _0x1f07e5 = i_WmyDOu.GPSetx[i_Brhwo_(_0x1b417d)];
    _0x1b417d.value = _0x1f07e5;
  }
}
function i_JKSNwn(_0x12f0d5) {
  if (i_WmyDOu["gExtX" + _0x12f0d5 + "Key"] & 1) {
    document.getElementById("X" + _0x12f0d5 + "A").checked = true;
  }
  if (i_WmyDOu["gExtX" + _0x12f0d5 + "Key"] & 2) {
    document.getElementById("X" + _0x12f0d5 + "B").checked = true;
  }
  if (i_WmyDOu["gExtX" + _0x12f0d5 + "Key"] & 4) {
    document.getElementById("X" + _0x12f0d5 + "C").checked = true;
  }
  if (i_WmyDOu["gExtX" + _0x12f0d5 + "Key"] & 8) {
    document.getElementById("X" + _0x12f0d5 + "D").checked = true;
  }
  if (i_WmyDOu["gExtX" + _0x12f0d5 + "Key"] & 16) {
    document.getElementById("X" + _0x12f0d5 + "E").checked = true;
  }
  if (i_WmyDOu["gExtX" + _0x12f0d5 + "Key"] & 32) {
    document.getElementById("X" + _0x12f0d5 + "F").checked = true;
  }
}
function i_Bckxkn() {
  document.getElementsByName("kbdbind").forEach(function (_0x36b127) {
    i_mPGKyn(_0x36b127);
  });
  i_QZBzTn();
}
function i_QZBzTn() {
  i_sxfci_("keybd_autofix").checked = !i_WmyDOu.gDisHoldLR;
  i_tXrZr_("keybd_autofix", "change", function (_0x2e9dbc) {
    i_WmyDOu.gDisHoldLR = !_0x2e9dbc.target.checked;
  });
}
function i_nTkXxn(_0x3ebbf4) {
  document.getElementsByName("kbdbind").forEach(function (_0x556d72) {
    if (i_WmyDOu.PCSet[i_Brhwo_(_0x556d72)] == _0x3ebbf4) {
      i_WmyDOu.PCSet[i_Brhwo_(_0x556d72)] = "NO";
      i_mPGKyn(_0x556d72);
    }
  });
}
function i_FTQZMn() {
  document.getElementsByName("kbdbind").forEach(function (_0xab3f4) {
    var _0xd252c2 = null;
    var _0x3a7a30 = {
      buttons: []
    };
    _0xab3f4.addEventListener("focus", function () {
      if (i_cJzsbn) {
        var _0xbd9c81 = i_HHPb_i();
        if (_0xbd9c81 == null) {
          _0xab3f4.blur();
          i_iZhRvt("未连接手柄");
          return;
        }
        for (var _0x35e7e8 in _0xbd9c81.buttons) {
          _0x3a7a30.buttons[_0x35e7e8] = _0xbd9c81.buttons[_0x35e7e8].pressed;
        }
        _0x3a7a30.axes = _0xbd9c81.axes;
        _0xd252c2 = setInterval(function () {
          var _0xae5b0 = i_HHPb_i();
          var _0x5e0677 = 0;
          for (; _0x5e0677 < _0xae5b0.buttons.length; _0x5e0677++) {
            if (_0xae5b0.buttons[_0x5e0677].pressed && _0x3a7a30.buttons[_0x5e0677] == 0) {
              i_NazaSn(_0x5e0677);
              i_WmyDOu.GPSetx[i_Brhwo_(_0xab3f4)] = _0x5e0677;
              if (i_Brhwo_(_0xab3f4) == "KeyLeft") {
                i_WmyDOu.GPSetx.KeyJoy = 0;
              }
              _0xab3f4.blur();
              break;
            }
          }
          for (_0x5e0677 = 0; _0x5e0677 < _0xae5b0.axes.length; _0x5e0677++) {
            if (Math.abs(_0xae5b0.axes[_0x5e0677]) > 0.5 && _0xae5b0.axes[_0x5e0677] != _0x3a7a30.axes[_0x5e0677]) {
              i_WmyDOu.GPSetx.KeyJoy = 1;
              i_WmyDOu.GPSetx[i_Brhwo_(_0xab3f4)] = _0x5e0677;
              _0xab3f4.blur();
              break;
            }
          }
        }, 50);
      }
    });
    _0xab3f4.addEventListener("blur", function () {
      if (i_cJzsbn) {
        _0xab3f4.value = i_WmyDOu.GPSetx[i_Brhwo_(_0xab3f4)];
        clearInterval(_0xd252c2);
      } else {
        i_mPGKyn(this);
      }
    });
    _0xab3f4.addEventListener("keydown", function (_0x418cef) {
      if (_0x418cef.key != "Tab") {
        i_nTkXxn(_0x418cef.code);
        if (_0x418cef.code == "Backspace") {
          i_WmyDOu.PCSet[i_Brhwo_(this)] = "NO";
        } else {
          i_WmyDOu.PCSet[i_Brhwo_(this)] = _0x418cef.code;
        }
        i_mPGKyn(this);
        this.blur();
        $(this).next().focus();
        _0x418cef.preventDefault();
      } else {
        this.blur();
      }
    });
  });
}
function i_CmAEPn(_0x1d5f31) {
  document.getElementsByName("X" + _0x1d5f31 + "Bind").forEach(function (_0x3d0671) {
    _0x3d0671.addEventListener("change", function () {
      var _0x41273d = this;
      if (_0x41273d.id == "X" + _0x1d5f31 + "A") {
        if (_0x41273d.checked) {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] |= 1;
        } else {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] &= ~1;
        }
      }
      if (_0x41273d.id == "X" + _0x1d5f31 + "B") {
        if (_0x41273d.checked) {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] |= 2;
        } else {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] &= ~2;
        }
      }
      if (_0x41273d.id == "X" + _0x1d5f31 + "C") {
        if (_0x41273d.checked) {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] |= 4;
        } else {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] &= ~4;
        }
      }
      if (_0x41273d.id == "X" + _0x1d5f31 + "D") {
        if (_0x41273d.checked) {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] |= 8;
        } else {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] &= ~8;
        }
      }
      if (_0x41273d.id == "X" + _0x1d5f31 + "E") {
        if (_0x41273d.checked) {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] |= 16;
        } else {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] &= ~16;
        }
      }
      if (_0x41273d.id == "X" + _0x1d5f31 + "F") {
        if (_0x41273d.checked) {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] |= 32;
        } else {
          i_WmyDOu["gExtX" + _0x1d5f31 + "Key"] &= ~32;
        }
      }
    });
  });
}
function i_NXeiEn() {
  i_tXrZr_("keybd_fillkey", "change", function (_0x3e94e3) {
    i_WmyDOu.gDisHoldLR = this.checked;
  });
}
function i_fkKwAn() {
  document.getElementsByName("gamepadbind").forEach(function (_0x24a5e7) {
    _0x24a5e7.value = i_WmyDOu.GPSetx[i_Brhwo_(_0x24a5e7)];
  });
  var _0x455e04 = document.getElementById("gamepadlag");
  var _0x21ba0b = document.getElementById("gamepadlagV");
  _0x455e04.value = i_WmyDOu.gJoyLagFix;
  var _0x1b51ef = 8 + Number((_0x455e04.value - _0x455e04.min) * 100 / (_0x455e04.max - _0x455e04.min)) * 1.3;
  _0x21ba0b.innerHTML = "<span>" + _0x455e04.value + "</span>";
  _0x21ba0b.style.left = "calc(" + _0x1b51ef + "px)";
}
function i_NazaSn(_0x1b2d2e) {
  document.getElementsByName("gamepadbind").forEach(function (_0x14abd5) {
    if (i_Brhwo_(_0x14abd5) != "KeyJoy" && i_Brhwo_(_0x14abd5) != "KeyUp" && i_Brhwo_(_0x14abd5) != "KeyDown" && i_Brhwo_(_0x14abd5) != "KeyLeft" && i_Brhwo_(_0x14abd5) != "KeyRight" && i_WmyDOu.GPSetx[i_Brhwo_(_0x14abd5)] == _0x1b2d2e) {
      i_WmyDOu.GPSetx[i_Brhwo_(_0x14abd5)] = -1;
      _0x14abd5.value = -1;
    }
  });
  document.getElementsByName("kbdbind").forEach(function (_0x113d40) {
    if ((i_Brhwo_(_0x113d40).indexOf("KeyX") >= 0 || i_Brhwo_(_0x113d40).indexOf("KeyS") >= 0) && i_WmyDOu.GPSetx[i_Brhwo_(_0x113d40)] == _0x1b2d2e) {
      i_WmyDOu.GPSetx[i_Brhwo_(_0x113d40)] = -1;
      _0x113d40.value = -1;
    }
  });
}
function i_FtZiCn() {
  document.getElementsByName("gamepadbind").forEach(function (_0x1f7a5b) {
    var _0x8e9495 = null;
    var _0x3d7e69 = {
      buttons: []
    };
    _0x1f7a5b.addEventListener("focus", function () {
      var _0x3d8e74 = i_HHPb_i();
      if (_0x3d8e74 == null) {
        _0x1f7a5b.blur();
        i_iZhRvt("未连接手柄");
        return;
      }
      for (var _0x5ade2a in _0x3d8e74.buttons) {
        _0x3d7e69.buttons[_0x5ade2a] = _0x3d8e74.buttons[_0x5ade2a].pressed;
      }
      _0x3d7e69.axes = _0x3d8e74.axes;
      _0x8e9495 = setTimeout(function _0x5c0e93() {
        if (i_sxfci_("popwin_keybind").style.display != "none") {
          var _0x1c3f8e = i_HHPb_i();
          var _0x2332d2 = 0;
          for (; _0x2332d2 < _0x1c3f8e.buttons.length; _0x2332d2++) {
            if (_0x1c3f8e.buttons[_0x2332d2].pressed && _0x3d7e69.buttons[_0x2332d2] == 0) {
              i_NazaSn(_0x2332d2);
              i_WmyDOu.GPSetx[i_Brhwo_(_0x1f7a5b)] = _0x2332d2;
              if (i_Brhwo_(_0x1f7a5b) == "KeyLeft") {
                i_WmyDOu.GPSetx.KeyJoy = 0;
              }
              _0x1f7a5b.blur();
              setTimeout(function () {
                $(_0x1f7a5b).next().focus();
              }, 200);
              return;
            }
          }
          for (_0x2332d2 = 0; _0x2332d2 < _0x1c3f8e.axes.length; _0x2332d2++) {
            if (Math.abs(_0x1c3f8e.axes[_0x2332d2]) > 0.5 && _0x1c3f8e.axes[_0x2332d2] != _0x3d7e69.axes[_0x2332d2]) {
              if (_0x2332d2 == 9) {
                i_rrYppt("******************", true);
                i_rrYppt("识别到POV摇杆，已自动设置好所有方向😁", true);
                _0x1f7a5b.blur();
                i_WmyDOu.GPSetx.KeyJoy = 1;
                i_WmyDOu.GPSetx.KeyUp = 9;
                i_WmyDOu.GPSetx.KeyDown = 9;
                i_WmyDOu.GPSetx.KeyLeft = 9;
                i_WmyDOu.GPSetx.KeyRight = 9;
                i_dhBiu_("gamepadbind", function (_0x4bbf13) {
                  if (!(i_Brhwo_(_0x4bbf13) != "KeyUp" && i_Brhwo_(_0x4bbf13) != "KeyDown" && i_Brhwo_(_0x4bbf13) != "KeyLeft" && i_Brhwo_(_0x4bbf13) != "KeyRight")) {
                    _0x4bbf13.value = 9;
                  }
                  if (i_Brhwo_(_0x4bbf13) == "KeyCoin") {
                    setTimeout(function () {
                      _0x4bbf13.focus();
                    }, 200);
                  }
                });
                return;
              } else {
                i_WmyDOu.GPSetx.KeyJoy = 1;
                i_WmyDOu.GPSetx[i_Brhwo_(_0x1f7a5b)] = _0x2332d2;
                _0x1f7a5b.blur();
                setTimeout(function () {
                  $(_0x1f7a5b).next().focus();
                }, 200);
                return;
              }
            }
          }
          _0x8e9495 = setTimeout(_0x5c0e93, 20);
        } else {
          _0x1f7a5b.blur();
        }
      }, 20);
    });
    _0x1f7a5b.addEventListener("blur", function () {
      _0x1f7a5b.value = i_WmyDOu.GPSetx[i_Brhwo_(_0x1f7a5b)];
      clearInterval(_0x8e9495);
    });
  });
}
function i_iNXiKn() {
  var _0x3d27b8 = document.getElementById("gamepadlag");
  var _0x414994 = document.getElementById("gamepadlagV");
  _0x3d27b8.addEventListener("input", function () {
    var _0xbbba49 = 8 + Number((_0x3d27b8.value - _0x3d27b8.min) * 100 / (_0x3d27b8.max - _0x3d27b8.min)) * 1.3;
    _0x414994.innerHTML = "<span>" + _0x3d27b8.value + "</span>";
    _0x414994.style.left = "calc(" + _0xbbba49 + "px)";
    i_WmyDOu.gJoyLagFix = _0x3d27b8.value;
  });
}
function i_mKJEOn() {
  i_tMMkpa();
  i_yQQtma();
}
var i_QnKMXn = null;
function i_ijxeRn() {
  i_ZKQCf_("AutoData", "focus", function (_0x153d8b) {
    i_QnKMXn = this;
    i_jzyY__("AutoData", "autokeyselect");
    this.classList.add("autokeyselect");
  });
  document.getElementsByName("drawbtn").forEach(function (_0x375819) {
    _0x375819.parentElement.addEventListener("click", function (_0x480c78) {
      if (i_QnKMXn != null) {
        var _0x49384a = this.firstElementChild;
        switch (i_Brhwo_(_0x49384a)) {
          case "清":
            i_QnKMXn.value = "";
            break;
          case "删":
            break;
          case "等":
          default:
            i_QnKMXn.value += i_Brhwo_(_0x49384a);
        }
        i_QnKMXn.focus();
        i_QnKMXn.setSelectionRange(i_QnKMXn.value.length, i_QnKMXn.value.length);
        i_HtHnda("g" + i_QnKMXn.id, i_QnKMXn.value);
        i_yQQtma();
      } else {
        i_iZhRvt("请先选择要设置的技能");
      }
    });
  });
}
function i_SxJbzn() {
  i_tXrZr_("revall", "change", function () {
    i_WmyDOu.GPSetx.gKeyRev = this.checked;
  });
  i_tXrZr_("revleftright", "change", function () {
    i_WmyDOu.GPSetx.gKeyRevLR = this.checked;
  });
}
function i_iTBeIn() {
  i_sxfci_("SP_A").checked = i_WmyDOu.gASuper;
  i_sxfci_("SP_B").checked = i_WmyDOu.gBSuper;
  i_sxfci_("SP_C").checked = i_WmyDOu.gCSuper;
  i_sxfci_("SP_D").checked = i_WmyDOu.gDSuper;
  i_sxfci_("SP_E").checked = i_WmyDOu.gESuper;
  i_sxfci_("SP_F").checked = i_WmyDOu.gFSuper;
  i_sxfci_("AutoSpeedText").innerText = i_WmyDOu.gSuperSpeed;
  i_sxfci_("AutoSpeed").value = i_WmyDOu.gSuperSpeed;
}
function i_bNCXNn() {
  i_sxfci_("keybd_fillkey").checked = i_WmyDOu.gDisHoldLR;
}
function i_AeGJUn() {
  i_ZKQCf_("SpeedKey", "change", function () {
    switch (this.id) {
      case "SP_A":
        i_WmyDOu.gASuper = this.checked;
        break;
      case "SP_B":
        i_WmyDOu.gBSuper = this.checked;
        break;
      case "SP_C":
        i_WmyDOu.gCSuper = this.checked;
        break;
      case "SP_D":
        i_WmyDOu.gDSuper = this.checked;
        break;
      case "SP_E":
        i_WmyDOu.gESuper = this.checked;
        break;
      case "SP_F":
        i_WmyDOu.gFSuper = this.checked;
    }
  });
  i_KiSwBn();
}
function i_DByKDn() {
  i_sxfci_("GesSpeedText").innerText = i_WmyDOu.gGesSpeed;
}
function i_BCXi$n() {
  i_tXrZr_("GesSpeed", "input", function (_0x457093) {
    i_sxfci_("GesSpeedText").innerText = this.value;
    i_WmyDOu.gGesSpeed = parseInt(this.value);
  });
}
function i_KiSwBn() {
  i_tXrZr_("AutoSpeed", "input", function (_0x211154) {
    i_sxfci_("AutoSpeedText").innerText = this.value;
    i_WmyDOu.gSuperSpeed = parseInt(this.value);
    i_XFSipu(i_WmyDOu.gSuperSpeed);
  });
}
function i_YQtSGn() {
  i_Hfbes_("reversal", function () {
    i_WwiRv_("reversalBox", "block");
  });
  i_tXrZr_("reversetting", "mouseleave", function () {
    i_sxfci_("reversalBox").style.display = "none";
  });
  i_Hfbes_("tab_keyborad", function (_0xa0c93) {
    $(this).siblings("div").removeClass("active-jianpan");
    $(this).addClass("active-jianpan");
    $("#keybind_keyboard").css("display", "flex");
    $("#keybind_gamepad").css("display", "none");
    i_cJzsbn = false;
    i_Bckxkn();
  });
  i_Hfbes_("tab_gamepad", function (_0x3fdcc1) {
    $(this).siblings("div").removeClass("active-jianpan");
    $(this).addClass("active-jianpan");
    $("#keybind_gamepad").css("display", "flex");
    $("#keybind_keyboard").css("display", "none");
    i_cJzsbn = true;
    i_Bckxkn();
  });
  i_Hfbes_("tab_keyext", function (_0x1bd476) {
    $(this).siblings("div").removeClass("active-kbdext");
    $(this).addClass("active-kbdext");
    $("#keybind_ext").css("display", "block");
    $("#keybind_auto").css("display", "none");
    $("#keybind_etc").css("display", "none");
  });
  i_Hfbes_("tab_keyauto", function (_0x1b466f) {
    $(this).siblings("div").removeClass("active-kbdext");
    $(this).addClass("active-kbdext");
    $("#keybind_ext").css("display", "none");
    $("#keybind_auto").css("display", "block");
    $("#keybind_etc").css("display", "none");
  });
  i_Hfbes_("tab_keyetc", function (_0x58eefc) {
    $(this).siblings("div").removeClass("active-kbdext");
    $(this).addClass("active-kbdext");
    $("#keybind_ext").css("display", "none");
    $("#keybind_auto").css("display", "none");
    $("#keybind_etc").css("display", "block");
  });
  i_FTQZMn();
  i_CmAEPn(1);
  i_CmAEPn(2);
  i_CmAEPn(3);
  i_CmAEPn(4);
  i_CmAEPn(5);
  i_CmAEPn(6);
  i_AeGJUn();
  i_BCXi$n();
  i_NXeiEn();
  i_FtZiCn();
  i_iNXiKn();
  i_SxJbzn();
  i_ysQfgn();
}
var i_cbdGFn = null;
function i_JtyhLn(_0x19d41c, _0x431aff) {
  var _0x182f6a = i_sxfci_("p" + _0x19d41c + "lag");
  if (_0x182f6a != null) {
    _0x182f6a.textContent = _0x431aff + "ms";
    _0x182f6a.style.color = _0x431aff < 50 ? "#00c030" : _0x431aff < 80 ? "#e09a06" : "#f01000";
  }
}
function i_zkHZqn() {
  if (i_aMrpot.indexOf("请出房间") > 0) {
    i_sxfci_("popwin_kickinfo").style.display = "block";
  } else {
    i_iZhRvt("联机已掉线，本场已变为单机模式，请重新连接");
  }
}
function i_SCfmVn(_0x177515, _0x52c92f, _0x574630) {
  _0x177515.innerHTML = "";
  for (var _0x434977 in _0x574630.Badge) {
    var _0x5d7eea = document.createElement("div");
    _0x5d7eea.setAttribute("tooltip", _0x574630.Badge[_0x434977].Name);
    _0x5d7eea.style.height = "16px";
    _0x5d7eea.style.marginLeft = "2px";
    var _0x1de5e5 = document.createElement("img");
    _0x1de5e5.src = _0x574630.Badge[_0x434977].Image;
    _0x5d7eea.appendChild(_0x1de5e5);
    _0x177515.appendChild(_0x5d7eea);
  }
  if (_0x52c92f.src = _0x574630.Frame.Image == "") {
    _0x52c92f.style.display = "none";
  } else {
    _0x52c92f.src = _0x574630.Frame.Image;
    _0x52c92f.style.display = "block";
  }
}
function i_QNbFjn(_0x3e1017) {
  if (_0x3e1017 != null) {
    i_cbdGFn = _0x3e1017;
    i_sxfci_("p1img").src = _0x3e1017.Img1;
    i_sxfci_("p2img").src = _0x3e1017.Img2;
    i_sxfci_("p3img").src = _0x3e1017.Img3;
    i_sxfci_("p4img").src = _0x3e1017.Img4;
    i_sxfci_("p1nick").innerText = _0x3e1017.Nick1;
    i_sxfci_("p2nick").innerText = _0x3e1017.Nick2;
    i_sxfci_("p3nick").innerText = _0x3e1017.Nick3;
    i_sxfci_("p4nick").innerText = _0x3e1017.Nick4;
    if (_0x3e1017.Nick1.indexOf("关闭") > 0) {
      i_sxfci_("p1img").src = "./img/close.png";
    }
    if (_0x3e1017.Nick2.indexOf("关闭") > 0) {
      i_sxfci_("p2img").src = "./img/close.png";
    }
    if (_0x3e1017.Nick3.indexOf("关闭") > 0) {
      i_sxfci_("p3img").src = "./img/close.png";
    }
    if (_0x3e1017.Nick4.indexOf("关闭") > 0) {
      i_sxfci_("p4img").src = "./img/close.png";
    }
    if (_0x3e1017.Mob1) {
      i_sxfci_("p1dev").classList.remove("igwi-diannao-copy");
      i_sxfci_("p1dev").classList.add("igwi-shouji");
      i_sxfci_("p1devtip").setAttribute("tooltip", "手机玩家");
    } else {
      i_sxfci_("p1dev").classList.add("igwi-diannao-copy");
      i_sxfci_("p1dev").classList.remove("igwi-shouji");
      i_sxfci_("p1devtip").setAttribute("tooltip", "PC玩家");
    }
    if (_0x3e1017.Mob2) {
      i_sxfci_("p2dev").classList.remove("igwi-diannao-copy");
      i_sxfci_("p2dev").classList.add("igwi-shouji");
      i_sxfci_("p2devtip").setAttribute("tooltip", "手机玩家");
    } else {
      i_sxfci_("p2dev").classList.add("igwi-diannao-copy");
      i_sxfci_("p2dev").classList.remove("igwi-shouji");
      i_sxfci_("p2devtip").setAttribute("tooltip", "PC玩家");
    }
    var _0x33a3e4 = _0x3e1017.boss;
    var _0x32f130 = i_sxfci_("roomOwnerFlag");
    if (_0x33a3e4 == 0) {
      _0x32f130.style.left = "90px";
      _0x32f130.style.top = "-10px";
    } else if (_0x33a3e4 == 1) {
      _0x32f130.style.left = "280px";
      _0x32f130.style.top = "-10px";
    } else if (_0x33a3e4 == 2) {
      _0x32f130.style.left = "90px";
      _0x32f130.style.top = "107px";
    } else if (_0x33a3e4 == 3) {
      _0x32f130.style.left = "280px";
      _0x32f130.style.top = "107px";
    }
    i_sxfci_("lookcount").innerText = _0x3e1017.looker;
    var _0x1ddf66 = i_sxfci_("lookerlist");
    _0x1ddf66.innerHTML = "";
    for (var _0x1c9918 in _0x3e1017.LookerNick) {
      var _0x5c7c37 = document.createElement("div");
      _0x5c7c37.setAttribute("key", _0x3e1017.LookerList[_0x1c9918]);
      _0x5c7c37.innerText = _0x3e1017.LookerNick[_0x1c9918];
      _0x1ddf66.appendChild(_0x5c7c37);
    }
    if (_0x3e1017.UUID != null) {
      if (_0x3e1017.UUID[0] != "") {
        i_TrjcCu(-1, _0x3e1017.UUID[0], function (_0x3fb87) {
          i_sxfci_("p1lv").textContent = "Lv." + _0x3fb87.LevelInfo.Level;
          i_SCfmVn(i_sxfci_("p1badge"), i_sxfci_("p1frame"), _0x3fb87.UserStyle);
        });
      } else {
        i_sxfci_("p1lv").textContent = "Lv.0";
        i_sxfci_("p1frame").style.display = "none";
        i_sxfci_("p1badge").innerHTML = "";
        i_sxfci_("p1nick").className = "touxiangname";
      }
      if (_0x3e1017.UUID[1] != "") {
        i_TrjcCu(-1, _0x3e1017.UUID[1], function (_0x31ef50) {
          i_sxfci_("p2lv").textContent = "Lv." + _0x31ef50.LevelInfo.Level;
          i_SCfmVn(i_sxfci_("p2badge"), i_sxfci_("p2frame"), _0x31ef50.UserStyle);
        });
      } else {
        i_sxfci_("p2lv").textContent = "Lv.0";
        i_sxfci_("p2frame").style.display = "none";
        i_sxfci_("p2badge").innerHTML = "";
        i_sxfci_("p2nick").className = "touxiangname";
      }
      if (_0x3e1017.UUID[2] != "") {
        i_TrjcCu(-1, _0x3e1017.UUID[2], function (_0x2e65c2) {
          i_sxfci_("p3lv").textContent = "Lv." + _0x2e65c2.LevelInfo.Level;
          i_SCfmVn(i_sxfci_("p3badge"), i_sxfci_("p3frame"), _0x2e65c2.UserStyle);
        });
      } else {
        i_sxfci_("p3lv").textContent = "Lv.0";
        i_sxfci_("p3frame").style.display = "none";
        i_sxfci_("p3badge").innerHTML = "";
        i_sxfci_("p3nick").className = "touxiangname";
      }
      if (_0x3e1017.UUID[3] != "") {
        i_TrjcCu(-1, _0x3e1017.UUID[3], function (_0x25c598) {
          i_sxfci_("p4lv").textContent = "Lv." + _0x25c598.LevelInfo.Level;
          i_SCfmVn(i_sxfci_("p4badge"), i_sxfci_("p4frame"), _0x25c598.UserStyle);
        });
      } else {
        i_sxfci_("p4lv").textContent = "Lv.0";
        i_sxfci_("p4frame").style.display = "none";
        i_sxfci_("p4badge").innerHTML = "";
        i_sxfci_("p4nick").className = "touxiangname";
      }
    }
  }
}
function i_eGBAYn(_0xbdafbe) {}
function i_DDAeHn(_0x40f986) {
  var _0x2890e2 = i_sxfci_("btn_pause");
  switch (_0x40f986) {
    case "stop":
      _0x2890e2.childNodes[0].classList.replace("igwi-zanting", "igwi-jixu");
      _0x2890e2.style.background = "rgba(220, 67, 59, 1)";
      _0x2890e2.childNodes[1].textContent = " 继续";
      break;
    case "continue":
      _0x2890e2.childNodes[0].classList.replace("igwi-jixu", "igwi-zanting");
      _0x2890e2.style.background = "rgba(57, 55, 50, 1)";
      _0x2890e2.childNodes[1].textContent = " 暂停";
  }
}
var i_NrsAWn = " <div class=\"systemmsg\">\n{{text}}                        </div>";
var i_idKiJn = " <div class=\"systemmsg lightsystemmsg\">\n{{text}}                        </div>";
var i_fJJeQn = " <div class=\"systemmsg successsystemmsg\">\n{{text}}                        </div>";
var i_wpCDZn = `  <div class="chatmessage">
                            <span class="prefix"></span>
                            <p class="chatnick">{{nick}}</p>
                            <p class="msgtime">{{time}}</p>
                            <div class="msgtext">
                                {{text}}                            </div>
                        </div>`;
var i_QEbyet = `  <div class="chatmessage mymsg">
                            <p class="msgtime">{{time}}</p>
                            <p class="chatnick">{{nick}}</p>
                            <span class="prefix"></span>
                            <div class="msgtext">
                                {{text}}                            </div>
                        </div>`;
var i_rynWnt = `  <div class="chatmessage">
                            <span class="prefix"></span>
                            <span class="lookflag">观战</span>
                            <p class="chatnick">{{nick}}</p>
                            <p class="msgtime">{{time}}</p>
                            <div class="msgtext">
                                {{text}}                            </div>
                        </div>`;
var i_JsQStt = `  <div>
                            <p id='{{lookerid}}'>
                                {{nick}}
                            </p>
                        </div>`;
var i_xMcxat = true;
var i_KXdcit = null;
var i_aMrpot = "";
function i_Hrkkct() {
  if (i_tdBda_("look") == "1" || i_iDpHde != 1) {
    i_sxfci_("btn_tolook").style.display = "none";
  } else {
    i_Hfbes_("btn_tolook", function () {
      window.location.replace("https://play.wo1wan.com/fcnext/play?&look=1&id=" + gid + "&mode=1&sev=" + i_wesTbe + "&linkid=" + i_ZmCwpe);
    });
  }
}
function i_xjiCst() {
  if ((i_KXdcit = i_sxfci_("messagelist")).scrollTo == null) {
    i_KXdcit.scrollTo = function (_0x40f482, _0x177d2c) {
      i_KXdcit.scrollTop = _0x177d2c;
      i_KXdcit.scrollLeft = _0x40f482;
    };
  }
  i_Hfbes_("sendmsgbtn", i_kJmZht);
  i_tXrZr_("lookerlist", "mouseup", i_TxBwlt);
  i_tXrZr_("messagemenu", "mouseleave", i_aQWcut);
  i_cirYl_("msgsubmenu", i_iJHfft);
  i_Hfbes_("fullmsgclose", function () {
    i_xMcxat = false;
    i_sxfci_("chatpad").style.opacity = "0.0";
  });
  i_Hrkkct();
  setTimeout(function () {
    i_rrYppt("欢迎加入畅玩FC群一起交流，QQ群号:768212005", true);
  }, 1000);
}
var i_aemzrt = null;
function i_TxBwlt(_0x14e848) {
  if (_0x14e848.button == 2 && i_iDpHde == 1) {
    var _0x36bf07 = i_sxfci_("messagemenu");
    i_aemzrt = _0x14e848.target;
    _0x36bf07.style.opacity = 1;
    _0x36bf07.style.left = _0x14e848.clientX - 15 + "px";
    _0x36bf07.style.top = _0x14e848.clientY - 15 + "px";
  }
}
function i_aQWcut() {
  var _0x5ee7c1 = i_sxfci_("messagemenu");
  _0x5ee7c1.style.opacity = 0;
  setTimeout(function () {
    _0x5ee7c1.style.top = "-200px";
  }, 100);
}
function i_iJHfft(_0x10f50b) {
  var _0x46b133 = i_sxfci_("messagemenu");
  var _0x285ea3 = i_Brhwo_(i_aemzrt);
  switch (this.id) {
    case "msgmenu_uid":
      i_TrjcCu(-1, _0x285ea3, function (_0x34a812) {
        i_rrYppt(_0x34a812.NickName + " 的UID是：" + _0x34a812.Uid);
        i_sxfci_("chattab").click();
      });
      break;
    case "msgmenu_ban":
      if (i_pjQNyo()) {
        $.post("/sayban", {
          who: _0x285ea3,
          where: "jjin_" + gid + "_" + i_ZmCwpe,
          say: ""
        }, function (_0x569485) {
          if (_0x569485.status == "ok") {
            i_hnXPpo("message", i_aemzrt.innerText + " 被房主在本房间禁言一小时");
          } else {
            i_iZhRvt("禁言失败");
          }
        });
      } else {
        i_iZhRvt("只有房主可禁言");
      }
      i_sxfci_("chattab").click();
      break;
    case "msgmenu_kick":
      i_hnXPpo("kicklook", _0x285ea3);
  }
  _0x46b133.style.opacity = 0;
  setTimeout(function () {
    _0x46b133.style.top = "-200px";
  }, 100);
}
function i_HsQF_t(_0x285f60) {
  if (_0x285f60.scrollTop + _0x285f60.clientHeight + 150 > _0x285f60.scrollHeight) {
    _0x285f60.scrollTo(0, _0x285f60.scrollHeight);
  }
}
function i_iZhRvt(_0x5d1d88) {
  var _0xf74e97 = document.createElement("div");
  _0xf74e97.innerHTML = i_NrsAWn.replace("{{text}}", _0x5d1d88);
  i_KXdcit.appendChild(_0xf74e97);
  i_KXdcit.scrollTo(0, i_KXdcit.scrollHeight);
  i_aMrpot = _0x5d1d88;
}
function i_GJQKdt(_0x46b925) {
  _0x46b925 = _0x46b925 + " " + new Date().toLocaleTimeString();
  var _0x460608 = document.createElement("div");
  _0x460608.innerHTML = i_idKiJn.replace("{{text}}", _0x46b925);
  i_KXdcit.appendChild(_0x460608);
  i_KXdcit.scrollTo(0, i_KXdcit.scrollHeight);
  i_aMrpot = _0x46b925;
}
function i_rrYppt(_0x499565, _0x21e18e) {
  if (_0x21e18e !== true) {
    _0x499565 = _0x499565 + " " + new Date().toLocaleTimeString();
  }
  var _0x42725 = document.createElement("div");
  _0x42725.innerHTML = i_fJJeQn.replace("{{text}}", _0x499565);
  i_KXdcit.appendChild(_0x42725);
  i_KXdcit.scrollTo(0, i_KXdcit.scrollHeight);
  i_aMrpot = _0x499565;
}
function i_jpPbmt(_0x502a81) {
  var _0x20c5d7 = document.createElement("div");
  _0x20c5d7.innerHTML = i_QEbyet.replace("{{text}}", _0x502a81).replace("{{nick}}", i_DdTaQf.NickName).replace("{{time}}", new Date().toLocaleTimeString());
  i_KXdcit.appendChild(_0x20c5d7);
  i_KXdcit.scrollTo(0, i_KXdcit.scrollHeight);
}
function i_fEncgt(_0x1ff8fb, _0x490b68, _0x3fabd1, _0x5a922a) {
  var _0x34ecdc = false;
  i_AZdwyt();
  if (_0x1ff8fb == null && _0x3fabd1 != null) {
    var _0x4a75cd = _0x3fabd1.indexOf("1.0)\">") + 6;
    var _0x5c1fc4 = _0x3fabd1.indexOf(": <") - _0x4a75cd;
    _0x1ff8fb = _0x3fabd1.substr(_0x4a75cd, _0x5c1fc4);
    _0x490b68 = _0x3fabd1.substr(_0x3fabd1.indexOf("</text>") + 7).replace("<br/>", "");
  }
  if (_0x3fabd1 != null && _0x3fabd1.indexOf("观战者") > 0) {
    _0x34ecdc = true;
  }
  if (_0x5a922a == 2) {
    _0x34ecdc = true;
  }
  if (_0x1ff8fb == i_DdTaQf.NickName) {
    return i_jpPbmt(_0x490b68);
  }
  if (_0x1ff8fb == "系统消息") {
    return i_GJQKdt(_0x490b68);
  }
  var _0x1292b3 = document.createElement("div");
  _0x1292b3.innerHTML = _0x34ecdc ? i_rynWnt.replace("{{text}}", _0x490b68).replace("{{nick}}", _0x1ff8fb).replace("{{time}}", new Date().toLocaleTimeString()) : i_wpCDZn.replace("{{text}}", _0x490b68).replace("{{nick}}", _0x1ff8fb).replace("{{time}}", new Date().toLocaleTimeString());
  i_KXdcit.appendChild(_0x1292b3);
  i_KXdcit.scrollTo(0, i_KXdcit.scrollHeight);
}
function i_kJmZht() {
  i_CmTmwt();
}
var i_YfmGbt = 0;
function i_AZdwyt() {
  if (i_JhpKTt > 0 && i_xMcxat) {
    i_sxfci_("chatpad").style.opacity = "0.8";
    i_YfmGbt = performance.now() + 4900;
    setTimeout(function () {
      if (performance.now() > i_YfmGbt && i_JhpKTt > 0) {
        i_sxfci_("chatpad").style.opacity = "0.0";
      }
    }, 5000);
  }
}
function i_CmTmwt() {
  i_xMcxat = true;
  i_AZdwyt();
  if (i_sxfci_("messageinput").value != "") {
    if (i_iDpHde == 0) {
      i_sxfci_("messageinput").value = "";
      i_jpPbmt("单人玩呢，发啥消息啊😢");
    } else {
      var _0x4770c1 = i_sxfci_("messageinput").value;
      if (_0x4770c1 != "") {
        i_hnXPpo("message", _0x4770c1);
      }
      i_sxfci_("messageinput").value = "";
    }
    i_sxfci_("messageinput").blur();
  } else if (document.activeElement == i_sxfci_("messageinput")) {
    i_sxfci_("messageinput").blur();
    if (i_JhpKTt > 0) {
      i_sxfci_("chatpad").style.opacity = "0.0";
    }
  } else {
    i_sxfci_("messageinput").focus();
  }
}
var i_FGtjkt = false;
var i_JhpKTt = 0;
var i_JDzaxt = null;
var i_FJfZMt = true;
var i_YWkhPt = 1;
function i_KJGWEt() {
  $("#soundvol").RangeSlider({
    min: 0,
    max: 100,
    step: 0.1,
    i: function (_0x4bde7c) {
      i_rHShLf(_0x4bde7c.value / 100);
      i_WmyDOu.gSoundVol = _0x4bde7c.value;
    }
  });
  i_sxfci_("soundvol").addEventListener("blur", function () {
    i_JcAsUu();
  });
}
function i_NmbbAt() {
  var _0x3cc70e = document.body;
  if (document.fullscreenElement == null) {
    if (_0x3cc70e.requestFullscreen) {
      _0x3cc70e.requestFullscreen();
    } else if (_0x3cc70e.mozRequestFullScreen) {
      _0x3cc70e.mozRequestFullScreen();
    } else if (_0x3cc70e.webkitRequestFullScreen) {
      _0x3cc70e.webkitRequestFullScreen();
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
function i_crWxSt() {
  if (i_ZHidMe == 2) {
    i_sxfci_("p3card").style.opacity = "0.3";
    i_sxfci_("p4card").style.opacity = "0.3";
    i_sxfci_("p3img").src = "https://static.wo1wan.com/game/close.png";
    i_sxfci_("p4img").src = "https://static.wo1wan.com/game/close.png";
    i_sxfci_("p3nick").innerText = "不可选";
    i_sxfci_("p4nick").innerText = "不可选";
    i_sxfci_("p3card").addEventListener("mouseup", function (_0x1be00c) {
      _0x1be00c.stopPropagation();
      _0x1be00c.preventDefault();
    }, true);
    i_sxfci_("p3card").addEventListener("click", function (_0x5edf7d) {
      _0x5edf7d.stopPropagation();
      _0x5edf7d.preventDefault();
    }, true);
    i_sxfci_("p4card").addEventListener("mouseup", function (_0x2e6857) {
      _0x2e6857.stopPropagation();
      _0x2e6857.preventDefault();
    }, true);
    i_sxfci_("p4card").addEventListener("click", function (_0x493117) {
      _0x493117.stopPropagation();
      _0x493117.preventDefault();
    }, true);
  }
}
function i_WyfZCt() {
  if (i_iDQBme) {
    var _0x45307e = i_sxfci_("gamescr");
    i_sxfci_("fullmsgclose").style.display = i_JhpKTt == 0 ? (_0x45307e.classList.add("gamebigwin"), i_JhpKTt = 1, i_sxfci_("chatpad").classList.add("fullScreenMsgBox"), i_sxfci_("chatpad").style.opacity = "0.0", "inline-block") : i_JhpKTt == 1 ? (_0x45307e.classList.remove("gamebigwin"), _0x45307e.classList.add("gamefillwinodw"), i_JhpKTt = 2, i_sxfci_("chatpad").classList.add("fullScreenMsgBox"), i_sxfci_("chatpad").style.opacity = "0.0", "inline-block") : (_0x45307e.classList.remove("gamebigwin"), _0x45307e.classList.remove("gamefillwinodw"), i_JhpKTt = 0, i_sxfci_("chatpad").style.opacity = "1.0", i_sxfci_("chatpad").classList.remove("fullScreenMsgBox"), "none");
    setTimeout(function () {
      i_TfQXnf(i_WmyDOu.lockScr);
    }, 100);
  }
}
function i_XxahKt() {
  if (i_iDQBme) {
    $(".popoverlay").hide();
  }
}
function i_EBycOt() {
  if (i_iDpHde == 0) {
    i_sxfci_("popwin_savemanager").style.display = "block";
    i_RNjHjt();
  } else {
    if (!i_pjQNyo()) {
      i_iZhRvt("只有房主允许使用存档");
      return;
    }
    i_sxfci_("popwin_savemanager").style.display = "block";
    i_RNjHjt();
  }
}
function i_hErJXt(_0x27f454) {
  var _0x446710 = 1000 / 60 * _0x27f454 / 1000;
  var _0x3e0c41 = Math.floor(_0x446710 / 3600);
  var _0x9a923a = Math.floor(_0x446710 / 60) % 60;
  var _0x2b68d4 = Math.floor(_0x446710 % 60);
  if (_0x3e0c41 <= 9) {
    _0x3e0c41 = "0" + _0x3e0c41;
  }
  if (_0x9a923a <= 9) {
    _0x9a923a = "0" + _0x9a923a;
  }
  if (_0x2b68d4 <= 9) {
    _0x2b68d4 = "0" + _0x2b68d4;
  }
  i_JDzaxt.textContent = _0x3e0c41 + ":" + _0x9a923a + ":" + _0x2b68d4;
}
function i_NmhERt() {
  i_iZhRvt("测试中,即将开放");
}
function i_miJRzt() {
  if (!i_FGtjkt) {
    i_FGtjkt = true;
    i_Hfbes_("chattab", function (_0x2306b3) {
      $(this).siblings("li").removeClass("active");
      $(this).addClass("active");
      $("#lookerpad").css("display", "none");
      $("#chatpad").css("display", "block");
    });
    i_Hfbes_("lookertab", function (_0x38d0c0) {
      $(this).siblings("li").removeClass("active");
      $(this).addClass("active");
      $("#lookerpad").css("display", "block");
      $("#chatpad").css("display", "none");
    });
    i_Hfbes_("onofftools", function () {
      if (i_WwiRv_("gametools", "flex")) {
        i_sxfci_("roompanel").style.height = "calc(100% - 300px)";
        i_sxfci_("toolsbtn").style.borderRadius = "8px 8px 0 0";
        i_sxfci_("onofftools").classList.add("reserveTopDown");
      } else {
        i_sxfci_("roompanel").style.height = "calc(100% - 180px)";
        i_sxfci_("toolsbtn").style.borderRadius = "8px";
        i_sxfci_("onofftools").classList.remove("reserveTopDown");
      }
    });
    i_Hfbes_("btn_fullscr", i_NmbbAt);
    i_Hfbes_("btn_restart", i_GzppX);
    i_Hfbes_("btn_pause", i_GEMRR);
    i_Hfbes_("btn_record", i_AfXQO);
    i_Hfbes_("btn_save", i_EBycOt);
    i_Hfbes_("btn_geeker", i_NmhERt);
    i_Hfbes_("btn_cheat", function () {
      if (i_iDpHde == 1) {
        i_iZhRvt("联机金手指还未开放");
      } else if (i_DdTaQf.LevelInfo.VipLevel > 0 || i_DdTaQf.LevelInfo.Svip > 0) {
        i_WwiRv_("popwin_gamehelp", "block");
      } else {
        i_rrYppt("金手指目前仅对会员和黑暗骑士开放");
      }
    });
    i_Hfbes_("btn_setting", function () {
      i_WwiRv_("popwin_setting", "block");
    });
    i_Hfbes_("btn_keybind", function () {
      i_WwiRv_("popwin_keybind", "block");
    });
    i_Hfbes_("btn_gamespeed", function () {
      if (i_iDpHde == 1) {
        i_rrYppt("联机模式目前不支持调速度");
      } else {
        i_sxfci_("tx_gamespeed").innerHTML = i_YWkhPt < 8 ? (i_YWkhPt *= 2) + "倍" : (i_YWkhPt = 1, "加速");
        i_bkNDhu(i_YWkhPt);
        i_rrYppt("游戏速度已调到" + i_YWkhPt + "倍速");
      }
    });
    i_Hfbes_("btn_sharegame", function () {
      if (i_iDpHde == 1) {
        i_WwiRv_("popwin_sharegame", "block");
      } else if (i_HjtSei == -1) {
        i_iZhRvt("请插入手柄后，以2P玩家游戏");
      } else {
        if ((i_TBnkka = navigator.getGamepads()[i_HjtSei]) == null) {
          i_iZhRvt("请插入手柄后，以2P玩家游戏");
          return;
        }
        var _0x52e110 = i_TBnkka.id.substr(0, i_TBnkka.id.indexOf("(Ven"));
        if (_0x52e110 == "") {
          _0x52e110 = i_TBnkka.id.substr(0, i_TBnkka.id.indexOf("("));
        }
        if (_0x52e110 == "") {
          _0x52e110 = i_TBnkka.id;
        }
        if (++i_DFBCti == 3) {
          i_DFBCti = 0;
        }
        switch (i_DFBCti) {
          case 0:
            i_rrYppt("恢复单机单人模式");
            break;
          case 1:
            i_rrYppt("进入【1P 键盘】 ，【2P 手柄摇杆】多人模式");
            break;
          case 2:
            i_rrYppt("进入【1P 手柄摇杆】 ，【2P 手柄摇杆】多人模式");
        }
      }
    });
    if (i_iDpHde == 0) {
      i_sxfci_("btn_sharegame").innerText = "单机双人";
    }
    i_Hfbes_("btn_sendshareinfo", i_WBYHll);
    i_cirYl_("btn_closepop", function (_0x484b60) {
      var _0x12a850 = _0x484b60.target.parentElement;
      for (; _0x12a850.id.indexOf("popwin_") < 0;) {
        _0x12a850 = _0x12a850.parentElement;
      }
      _0x12a850.style.display = "none";
    });
    i_cirYl_("btn_cancelpop", function (_0x26293b) {
      var _0x55da29 = _0x26293b.target.parentElement;
      for (; _0x55da29.id.indexOf("popwin_") < 0;) {
        _0x55da29 = _0x55da29.parentElement;
      }
      _0x55da29.style.display = "none";
    });
    i_cirYl_("btn_setok", function (_0x2e06ec) {
      var _0x6f542f = _0x2e06ec.target.parentElement;
      for (; _0x6f542f.id.indexOf("popwin_") < 0;) {
        _0x6f542f = _0x6f542f.parentElement;
      }
      _0x6f542f.style.display = "none";
      i_JcAsUu();
    });
    i_Hfbes_("btn_kb_reset", function () {
      if (i_cJzsbn) {
        i_WmyDOu.GPSetx = JSON.parse(JSON.stringify(i_mACQRu));
        i_fkKwAn();
      } else {
        i_WmyDOu.PCSet = JSON.parse(JSON.stringify(i_jwnmXu));
        i_Bckxkn();
      }
    });
    var _0x2ec91e = 0;
    i_tXrZr_("gamescr", "click", function (_0x4394a1) {
      if (_0x4394a1.timeStamp - _0x2ec91e < 300 && _0x2ec91e != 0) {
        i_WyfZCt();
      } else {
        _0x2ec91e = _0x4394a1.timeStamp;
      }
    });
    i_Hfbes_("vote_yes", i_icfsN);
    i_Hfbes_("vote_no", i_EpjGI);
    i_YQtSGn();
    i_Zbrnra();
    i_Hfbes_("btn_kickok", function () {
      window.close();
      window.location.href = "about:blank";
    });
    i_Hfbes_("soundswitch", function () {
      i_FJfZMt = i_FJfZMt ? (this.classList.remove("igwi-yinliang"), this.classList.add("igwi-jingyin1"), this.style.color = "#888888", i_rHShLf(0), false) : (this.classList.remove("igwi-jingyin1"), this.classList.add("igwi-yinliang"), this.style.color = "#f9d342", i_rHShLf(i_WmyDOu.gSoundVol / 100), true);
    });
  }
}
function i_SDeSIt() {
  i_Hfbes_("winclose", i_ankaua.V);
  i_Hfbes_("winmin", i_ankaua.j);
  i_Hfbes_("winmax", i_ankaua.H);
}
function i_MaRANt() {
  if (i_iDpHde == 1) {
    i_sxfci_("roominfo").innerText = "房间: " + i_ZmCwpe;
  }
  i_JDzaxt = i_sxfci_("timespan");
  i_SDeSIt();
  i_KJGWEt();
  i_miJRzt();
  i_xjiCst();
  i_AYSSqt();
  i_kRWdvn();
}
function i_YyrnUt() {
  i_sxfci_("gamename").innerText = i_BThm_e;
}
function i_jypkDt() {
  i_sxfci_("p1nick").innerText = i_DdTaQf.NickName;
  i_sxfci_("p1img").src = i_DdTaQf.HeadImg;
}
var i_kJKK$t = {
  sv1: 0,
  sv2: 0,
  sv3: 0,
  sv4: 0,
  st1: null,
  st2: null,
  st3: null,
  st4: null
};
var i_cQmQBt = {
  d1: 0,
  d1i: null,
  d2: 0,
  d2i: null,
  d3: 0,
  d3i: null,
  d4: 0,
  d4i: null
};
var i_NMMPGt = 0;
function i_pSswFt() {
  if (i_kJKK$t.sv1 == 1) {
    $("#sv1time").html(i_kJKK$t.st1);
    if (i_cQmQBt.d1i == null) {
      i_cQmQBt.d1i = "/fc/lsvimg?sid=1&game=" + gid;
    }
    i_sxfci_("sv1img").src = i_cQmQBt.d1i;
  } else {
    $("#sv1time").html("");
    i_sxfci_("sv1img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.sv2 == 1) {
    $("#sv2time").html(i_kJKK$t.st2);
    if (i_cQmQBt.d2i == null) {
      i_cQmQBt.d2i = "/fc/lsvimg?sid=2&game=" + gid;
    }
    i_sxfci_("sv2img").src = i_cQmQBt.d2i;
  } else {
    $("#sv2time").html("");
    i_sxfci_("sv2img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.sv3 == 1) {
    $("#sv3time").html(i_kJKK$t.st3);
    if (i_cQmQBt.d3i == null) {
      i_cQmQBt.d3i = "/fc/lsvimg?sid=3&game=" + gid;
    }
    i_sxfci_("sv3img").src = i_cQmQBt.d3i;
  } else {
    $("#sv3time").html("");
    i_sxfci_("sv3img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.sv4 == 1) {
    $("#sv4time").html(i_kJKK$t.st4);
    if (i_cQmQBt.d4i == null) {
      i_cQmQBt.d4i = "/fc/lsvimg?sid=4&game=" + gid;
    }
    i_sxfci_("sv4img").src = i_cQmQBt.d4i;
  } else {
    $("#sv4time").html("");
    i_sxfci_("sv4img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.W == 1) {
    $("#sv5time").html(i_kJKK$t.J);
    if (i_cQmQBt.Z == null) {
      i_cQmQBt.Z = "/fc/lsvimg?sid=5&game=" + gid;
    }
    i_sxfci_("sv5img").src = i_cQmQBt.Z;
  } else {
    $("#sv5time").html("");
    i_sxfci_("sv5img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.ee == 1) {
    $("#sv6time").html(i_kJKK$t.ne);
    if (i_cQmQBt.te == null) {
      i_cQmQBt.te = "/fc/lsvimg?sid=6&game=" + gid;
    }
    i_sxfci_("sv6img").src = i_cQmQBt.te;
  } else {
    $("#sv6time").html("");
    i_sxfci_("sv6img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.ae == 1) {
    $("#sv7time").html(i_kJKK$t.ie);
    if (i_cQmQBt.oe == null) {
      i_cQmQBt.oe = "/fc/lsvimg?sid=7&game=" + gid;
    }
    i_sxfci_("sv7img").src = i_cQmQBt.oe;
  } else {
    $("#sv7time").html("");
    i_sxfci_("sv7img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.ce == 1) {
    $("#sv8time").html(i_kJKK$t.re);
    if (i_cQmQBt.le == null) {
      i_cQmQBt.le = "/fc/lsvimg?sid=8&game=" + gid;
    }
    i_sxfci_("sv8img").src = i_cQmQBt.le;
  } else {
    $("#sv8time").html("");
    i_sxfci_("sv8img").src = "https://static.wo1wan.com/game/empsv.png";
  }
}
function i_TkwGLt() {
  var _0x491e41 = new XMLHttpRequest();
  _0x491e41.open("POST", "/fc/svupdate?game=" + gid, true);
  _0x491e41.setRequestHeader("Content-type", "application/json");
  _0x491e41.onreadystatechange = function () {
    if (_0x491e41.readyState == XMLHttpRequest.DONE) {
      _0x491e41.status;
    }
  };
  _0x491e41.send(JSON.stringify(i_kJKK$t));
  i_pSswFt();
}
function i_AYSSqt() {
  var _0x461eec = new XMLHttpRequest();
  _0x461eec.open("GET", "/fc/svload?game=" + gid, true);
  _0x461eec.responseType = "json";
  _0x461eec.onreadystatechange = function () {
    if (_0x461eec.readyState == XMLHttpRequest.DONE && _0x461eec.status == 200) {
      var _0x256867 = _0x461eec.response;
      i_kJKK$t = _0x256867;
      i_pSswFt();
    }
  };
  _0x461eec.send();
  i_EEHfVt();
}
function i_EEHfVt() {
  i_cirYl_("btn_savegame", i_TWSPWt);
  i_cirYl_("btn_loadgame", i_NmMrea);
  i_cirYl_("btn_sharesave", i_StGeJt);
  i_cirYl_("btn_delsave", i_HjJwQt);
}
function i_RNjHjt() {
  i_sxfci_("sbtn1").disabled = false;
  i_sxfci_("sbtn2").disabled = false;
  i_sxfci_("sbtn3").disabled = false;
  i_sxfci_("sbtn4").disabled = false;
  i_sxfci_("sbtn5").disabled = false;
  i_sxfci_("sbtn6").disabled = false;
  i_sxfci_("sbtn7").disabled = false;
  i_sxfci_("sbtn8").disabled = false;
  i_sxfci_("lbtn1").disabled = false;
  i_sxfci_("lbtn2").disabled = false;
  i_sxfci_("lbtn3").disabled = false;
  i_sxfci_("lbtn4").disabled = false;
  i_sxfci_("lbtn5").disabled = false;
  i_sxfci_("lbtn6").disabled = false;
  i_sxfci_("lbtn7").disabled = false;
  i_sxfci_("lbtn8").disabled = false;
}
function i_smExYt(_0x20a5cb) {
  i_sxfci_("sbtn" + _0x20a5cb).disabled = true;
}
function i_MKbRHt(_0x250413) {
  i_sxfci_("lbtn" + _0x250413).disabled = true;
}
function i_TWSPWt() {
  var _0x1232c1;
  if ((_0x1232c1 = parseInt(this.id.replace("sbtn", ""))) > 6 && i_DdTaQf.LevelInfo.Svip <= 0) {
    i_iZhRvt("请开通黑暗骑士解锁该云存档位<br>黑暗骑士到期后存档永久存在，可随时续费使用");
  } else if (_0x1232c1 > 4 && i_DdTaQf.LevelInfo.Svip <= 0 && i_DdTaQf.LevelInfo.Vip <= 0) {
    i_iZhRvt("请开通会员解锁该云存档位<br>会员到期后存档永久存在，可随时续费使用");
  } else {
    i_WmWryu(_0x1232c1);
  }
}
function i_StGeJt() {
  i_iZhRvt("分享存档即将开放");
}
function i_HjJwQt() {
  var _0x3ae355;
  _0x3ae355 = parseInt(this.id.replace("dbtn", ""));
  i_kJKK$t["sv" + _0x3ae355] = 0;
  i_kJKK$t["st" + _0x3ae355] = null;
  i_TkwGLt();
  i_sxfci_("sbtn" + _0x3ae355).disabled = false;
}
var i_yGnJZt = -600000;
function i_NmMrea() {
  if (i_iDpHde == 1) {
    if (i_xjHeZi > 1) {
      i_iZhRvt("加载存档时，房间不可有其他人上位，请对方先退到观战位");
      return;
    }
    if (performance.now() - i_yGnJZt < 60000) {
      i_iZhRvt("联机时一分钟内只能加载一次存档");
      return;
    }
    i_hnXPpo("message", "房主加载了云存档,观众会在稍后同步");
    i_yGnJZt = performance.now();
  }
  i_ZjZkwu(parseInt(this.id.replace("lbtn", "")));
}
var i_Tnctna = 1;
function i_fFmbta(_0x278f7b) {
  var _0x11b1fb = i_Tnctna;
  i_Tnctna = _0x278f7b;
  if (i_iDpHde == 0) {
    i_sxfci_("p" + _0x11b1fb + "img").src = "https://static.wo1wan.com/game/close.png";
    i_sxfci_("p" + _0x11b1fb + "nick").innerText = "空";
    i_sxfci_("p" + i_Tnctna + "img").src = i_DdTaQf.HeadImg;
    i_sxfci_("p" + i_Tnctna + "nick").innerText = i_DdTaQf.NickName;
    i_ktCsEu(i_Tnctna);
    var _0x566729 = i_sxfci_("roomOwnerFlag");
    if ((i_Kbzklo = i_Tnctna - 1) == 0) {
      _0x566729.style.left = "90px";
      _0x566729.style.top = "-10px";
    } else if (i_Kbzklo == 1) {
      _0x566729.style.left = "280px";
      _0x566729.style.top = "-10px";
    } else if (i_Kbzklo == 2) {
      _0x566729.style.left = "90px";
      _0x566729.style.top = "107px";
    } else if (i_Kbzklo == 3) {
      _0x566729.style.left = "280px";
      _0x566729.style.top = "107px";
    }
  } else {
    if (i_nibwYi) {
      if (i_sxfci_("p" + i_Tnctna + "nick").innerText == "点击上位") {
        i_hnXPpo("join", i_Tnctna + "");
      }
      return;
    }
    if (i_sxfci_("p" + i_Tnctna + "nick").innerText != "等待连接") {
      return;
    }
    i_fdZfJi = true;
    i_wsSfso[0] = i_emcHro;
    i_wsSfso[1] = 0;
    i_bYNtOo();
    setTimeout(function () {
      i_hnXPpo("switch", i_Tnctna + "");
    }, 200);
  }
}
var i_ieCCaa = "1";
function i_bTamia() {
  if (i_ieCCaa - 1 != i_emcHro) {
    $("[name=usersubmenu]").hide();
    if (i_FZEFji["Nick" + i_ieCCaa] == "等待连接") {
      i_sxfci_("usermenu_close").style.display = "block";
    } else if (i_FZEFji["Nick" + i_ieCCaa] == "*关闭*") {
      i_sxfci_("usermenu_open").style.display = "block";
    } else {
      if (i_pjQNyo()) {
        i_sxfci_("usermenu_kick").style.display = "block";
        i_sxfci_("usermenu_nobb").style.display = "block";
        i_sxfci_("usermenu_give").style.display = "block";
      }
      i_sxfci_("usermenu_add").style.display = "block";
      i_sxfci_("usermenu_report").style.display = "block";
      i_sxfci_("usermenu_uid").style.display = "block";
    }
  } else {
    i_sJmysa();
  }
}
function i_wPiSoa(_0x49aa1f) {
  if (_0x49aa1f.button == 2 && i_iDpHde == 1) {
    var _0x3dfd62 = i_sxfci_("usermenu");
    _0x3dfd62.style.opacity = 1;
    _0x3dfd62.style.left = _0x49aa1f.clientX - 15 + "px";
    _0x3dfd62.style.top = _0x49aa1f.clientY - 15 + "px";
    i_ieCCaa = this.id == "p1card" ? "1" : this.id == "p2card" ? "2" : this.id == "p3card" ? "3" : "4";
    i_bTamia();
  }
}
function i_MDRyca() {
  var _0x5b561b = i_cbdGFn.UUID[i_ieCCaa - 1];
  switch (this.id) {
    case "usermenu_uid":
      i_TrjcCu(-1, _0x5b561b, function (_0x2894ae) {
        i_rrYppt(_0x2894ae.NickName + " 的UID是：" + _0x2894ae.Uid);
        i_sxfci_("chattab").click();
      });
      break;
    case "usermenu_open":
      i_hnXPpo("open", i_ieCCaa);
      break;
    case "usermenu_close":
      i_hnXPpo("close", i_ieCCaa);
      break;
    case "usermenu_kick":
      i_hnXPpo("kick", i_ieCCaa - 1 + "");
      break;
    case "usermenu_nobb":
      if (i_pjQNyo()) {
        $.post("/sayban", {
          who: _0x5b561b,
          where: "jjin_" + gid + "_" + i_ZmCwpe,
          say: ""
        }, function (_0x25b45b) {
          if (_0x25b45b.status == "ok") {
            i_hnXPpo("message", i_cbdGFn["Nick" + i_ieCCaa] + " 被房主在本房间禁言一小时");
          } else {
            i_iZhRvt("禁言失败");
          }
        });
      } else {
        i_iZhRvt("只有房主可禁言");
      }
      break;
    case "usermenu_add":
      i_TrjcCu(-1, _0x5b561b, function (_0x5471d4) {
        if (i_ankaua.ue("friend", "add", _0x5471d4.Uid)) {
          i_rrYppt("好友请求发送成功，对方会在大厅收到消息");
        } else {
          i_iZhRvt("游戏大厅无法找到，请从大厅开始游戏");
        }
      });
      break;
    case "usermenu_report":
      i_GJQKdt("畅玩大叔正在测，马上开放");
      break;
    case "usermenu_give":
      if (i_pjQNyo()) {
        i_hnXPpo("transferroom", i_ieCCaa - 1 + "");
      }
  }
  var _0x55f86f = i_sxfci_("usermenu");
  _0x55f86f.style.opacity = 0;
  setTimeout(function () {
    _0x55f86f.style.top = "-200px";
  }, 100);
}
function i_sJmysa() {
  var _0x4a4490 = i_sxfci_("usermenu");
  _0x4a4490.style.opacity = 0;
  setTimeout(function () {
    _0x4a4490.style.top = "-200px";
  }, 100);
}
function i_Zbrnra() {
  i_Hfbes_("p1card", function () {
    i_fFmbta(1);
  });
  i_Hfbes_("p2card", function () {
    i_fFmbta(2);
  });
  i_Hfbes_("p3card", function () {
    i_fFmbta(3);
  });
  i_Hfbes_("p4card", function () {
    i_fFmbta(4);
  });
  i_ZKQCf_("usercard", "mouseup", i_wPiSoa);
  i_cirYl_("usersubmenu", i_MDRyca);
  i_tXrZr_("usermenu", "mouseleave", i_sJmysa);
}
function i_hGaila(_0x110ba3) {
  if (_0x110ba3.indexOf("igw:cmd:") != 0) {
    return "";
  }
  var _0x42d680 = _0x110ba3.replace("igw:cmd:", "").split("=");
  if (_0x42d680.length < 2) {
    return "";
  }
  switch (_0x42d680[0]) {
    case "enabledmg":
      if (_0x42d680[1] == "1") {
        i_EBCZln.P.value = true;
        return "控制台：显伤害打开";
      } else {
        i_EBCZln.P.value = false;
        return "控制台：显伤害关闭";
      }
  }
  return "";
}
var i_ankaua = {
  fe: null,
  path: null,
  IGWorld: false,
  _e: {
    ve: "",
    de: 1400,
    pe: 720,
    me: 100,
    ge: 100,
    he: false,
    be: 1440,
    ye: 900,
    we: 100,
    ke: 100,
    Te: true
  },
  g: function () {
    if (window.IGWorld === true && i_ankaua.fe === null) {
      i_ankaua.IGWorld = true;
      i_ankaua.fe = eval("require('electron')['ipcRenderer'];");
      i_ankaua.path = eval(`if ('kbOPg' !== _0x3628('0x3e7')) {
    var _0x3ef490 = i_sxfci_(_0x3628('0x23b')), _0x18295c = i_sxfci_('Broomownerflag');
    0 == i_Ebjce ? (_0x3ef490['style'][_0x3628('0x282')] = _0x3628('0x1cd'), _0x3ef490[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0x22e'), _0x18295c['style'][_0x3628('0x270')] = _0x3628('0x3e3')) : 1 == i_Ebjce ? (_0x3ef490['style']['left'] = _0x3628('0x1cd'), _0x3ef490['style'][_0x3628('0x270')] = _0x3628('0x1f6'), _0x18295c[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0xc8')) : 2 == i_Ebjce ? (_0x3ef490['style']['left'] = '128px', _0x3ef490[_0x3628('0x3e')]['top'] = _0x3628('0x54'), _0x18295c[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0x1f')) : 3 == i_Ebjce && (_0x3ef490['style'][_0x3628('0x282')] = '128px', _0x3ef490[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0xe5'), _0x18295c[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0x4a6'));
} else {
    require(_0x3628('0x82'));
}`);
      i_ankaua.fe.on("syncconfig", function (_0x282905, _0x2cd389) {
        i_ankaua._e = _0x2cd389;
      });
      i_ankaua._e = i_ankaua.fe.sendSync("loadconfig");
    }
    setTimeout(this.xe, 2000);
    window.addEventListener("focus", this.xe);
    window.addEventListener("beforeunload", this.Me);
    return i_ankaua.IGWorld;
  },
  Pe: function (_0x60d1f4) {
    if (navigator.userAgent.indexOf("igwmobgame") > 0 && typeof window.IGWGameCore == "function") {
      if (i_ankaua.Ee == null) {
        i_ankaua.Ee = new window.IGWGameCore();
      }
      if (i_ankaua.Ee != null) {
        i_ankaua.Ee.call("{\"type\":\"screen\", \"style\":" + _0x60d1f4 + "}");
      }
    }
  },
  Ae: function (_0x579b4b, _0x490cd8) {
    if (i_ankaua.fe != null) {
      i_ankaua.fe.send(_0x579b4b, _0x490cd8);
    }
  },
  Se: function (_0x5c1ed0, _0x74ae3c) {
    if (i_ankaua.fe != null) {
      i_ankaua.fe.send("run", _0x5c1ed0, _0x74ae3c);
    }
  },
  Ce: function (_0x8ac8b8, _0x43a9b3, _0x81460c) {
    if (i_ankaua.fe != null) {
      i_ankaua.fe.send("wincmd", _0x8ac8b8, _0x43a9b3, _0x81460c);
    }
  },
  Ke: function (_0x5a3a5e, _0x46321b) {
    if (this.fe != null) {
      return this.fe.sendSync("syncrun", _0x5a3a5e, _0x46321b);
    }
  },
  Oe: function (_0x25244c, _0x10ade9) {
    if (i_ankaua.fe == null) {
      window.open(_0x25244c);
    } else {
      i_ankaua.fe.send("openwin", _0x10ade9, _0x25244c, winargs);
    }
  },
  j: function () {
    i_ankaua.Ce("game", "self.minimize();");
  },
  H: function () {
    i_ankaua.Ce("game", `if(!self.isMaximized())
                      self.maximize()
                    else
                      self.unmaximize()`);
  },
  V: function () {
    i_ankaua.Ce("game", "self.close();");
  },
  Xe: function (_0x400494, _0x3360d6) {},
  Re: function () {
    i_ankaua.Ce("game", "self.webContents.openDevTools();");
  },
  xe: function () {
    i_ankaua.ue("state", "ingame", JSON.stringify({
      gametype: "fc",
      roomid: i_ZmCwpe,
      gamename: i_BThm_e,
      gameid: gid,
      server: i_wesTbe
    }));
  },
  Me: function () {
    i_ankaua.ue("state", "lobby", "");
  },
  ue: function (_0x3752be, _0x89cd2f, _0x2129b7) {
    if (i_ankaua.fe != null) {
      i_ankaua.Ce("lobby", "self.webContents.send('gamesync'," + JSON.stringify({
        event: _0x3752be,
        type: _0x89cd2f,
        data: _0x2129b7
      }) + ")");
      return true;
    } else if (window.opener == null) {
      return window.parent != null && (window.parent.postMessage({
        event: _0x3752be,
        type: _0x89cd2f,
        data: _0x2129b7
      }, "*"), true);
    } else {
      window.opener.postMessage({
        event: _0x3752be,
        type: _0x89cd2f,
        data: _0x2129b7
      }, "*");
      return true;
    }
  },
  ze: function (_0x36a8c4) {
    if (_0x36a8c4 === undefined) {
      _0x36a8c4 = "vip";
    }
    i_ankaua.ue("viptips", _0x36a8c4, "");
    i_mMmFe_("UserAction", "ShowVIP", [gid + ""]);
  }
};
var i_wpdPfa = [];
var i_iYai_a = 0;
var i_HaCAva = {
  Ie: [],
  Ne: [],
  Ue: [],
  De: []
};
function i_HtHnda(_0x157e28, _0x237caa) {
  var _0x50996c = "";
  var _0x4d1604 = 0;
  for (; _0x4d1604 < _0x237caa.length; _0x4d1604++) {
    if (_0x237caa[_0x4d1604] == "←") {
      _0x50996c += "1 ";
    }
    if (_0x237caa[_0x4d1604] == "→") {
      _0x50996c += "2 ";
    }
    if (_0x237caa[_0x4d1604] == "↑") {
      _0x50996c += "3 ";
    }
    if (_0x237caa[_0x4d1604] == "↓") {
      _0x50996c += "4 ";
    }
    if (_0x237caa[_0x4d1604] == "↖") {
      _0x50996c += "5 ";
    }
    if (_0x237caa[_0x4d1604] == "↗") {
      _0x50996c += "6 ";
    }
    if (_0x237caa[_0x4d1604] == "↙") {
      _0x50996c += "7 ";
    }
    if (_0x237caa[_0x4d1604] == "↘") {
      _0x50996c += "8 ";
    }
    if (_0x237caa[_0x4d1604] == "A") {
      _0x50996c += "A ";
    }
    if (_0x237caa[_0x4d1604] == "B") {
      _0x50996c += "B ";
    }
    if (_0x237caa[_0x4d1604] == "C") {
      _0x50996c += "C ";
    }
    if (_0x237caa[_0x4d1604] == "D") {
      _0x50996c += "D ";
    }
    if (_0x237caa[_0x4d1604] == "E") {
      _0x50996c += "E ";
    }
    if (_0x237caa[_0x4d1604] == "F") {
      _0x50996c += "F ";
    }
    if (_0x237caa[_0x4d1604] == "等") {
      _0x50996c += "等 ";
    }
    if (_0x237caa[_0x4d1604] == "正") {
      _0x50996c += "正 ";
    }
    if (_0x237caa[_0x4d1604] == "反") {
      _0x50996c += "反 ";
    }
  }
  i_WmyDOu[_0x157e28] = _0x50996c;
}
function i_tMMkpa() {
  var _0x129ee2 = i_WmyDOu.gGes1.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓");
  _0x129ee2 = _0x129ee2.split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges1").value = _0x129ee2;
  _0x129ee2 = (_0x129ee2 = i_WmyDOu.gGes2.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓")).split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges2").value = _0x129ee2;
  _0x129ee2 = (_0x129ee2 = i_WmyDOu.gGes3.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓")).split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges3").value = _0x129ee2;
  _0x129ee2 = (_0x129ee2 = i_WmyDOu.gGes4.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓")).split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges4").value = _0x129ee2;
  document.getElementById("GesSpeed").value = i_WmyDOu.gGesSpeed;
}
function i_yQQtma() {
  i_HaCAva.Ie = [];
  i_HaCAva.Ne = [];
  i_HaCAva.Ue = [];
  i_HaCAva.De = [];
  var _0x4d00bb = 0;
  for (; _0x4d00bb < i_WmyDOu.gGes1.length; _0x4d00bb++) {
    switch (i_WmyDOu.gGes1[_0x4d00bb]) {
      case "1":
        i_HaCAva.Ie.push(i_ipNXXi);
        break;
      case "2":
        i_HaCAva.Ie.push(i_xcfpRi);
        break;
      case "3":
        i_HaCAva.Ie.push(i_QmFZzi);
        break;
      case "4":
        i_HaCAva.Ie.push(i_ZSDiIi);
        break;
      case "5":
        i_HaCAva.Ie.push(i_QmFZzi | i_ipNXXi);
        break;
      case "6":
        i_HaCAva.Ie.push(i_QmFZzi | i_xcfpRi);
        break;
      case "7":
        i_HaCAva.Ie.push(i_ZSDiIi | i_ipNXXi);
        break;
      case "8":
        i_HaCAva.Ie.push(i_ZSDiIi | i_xcfpRi);
        break;
      case "A":
        i_HaCAva.Ie.push(mask_fire1);
        break;
      case "B":
        i_HaCAva.Ie.push(mask_fire2);
        break;
      case "C":
        i_HaCAva.Ie.push(mask_fire3);
        break;
      case "D":
        i_HaCAva.Ie.push(mask_fire4);
        break;
      case "E":
        i_HaCAva.Ie.push(mask_fire5);
        break;
      case "F":
        i_HaCAva.Ie.push(mask_fire6);
        break;
      case "等":
        i_HaCAva.Ie.push(0);
    }
  }
  for (_0x4d00bb = 0; _0x4d00bb < i_WmyDOu.gGes2.length; _0x4d00bb++) {
    switch (i_WmyDOu.gGes2[_0x4d00bb]) {
      case "1":
        i_HaCAva.Ne.push(i_ipNXXi);
        break;
      case "2":
        i_HaCAva.Ne.push(i_xcfpRi);
        break;
      case "3":
        i_HaCAva.Ne.push(i_QmFZzi);
        break;
      case "4":
        i_HaCAva.Ne.push(i_ZSDiIi);
        break;
      case "5":
        i_HaCAva.Ne.push(i_QmFZzi | i_ipNXXi);
        break;
      case "6":
        i_HaCAva.Ne.push(i_QmFZzi | i_xcfpRi);
        break;
      case "7":
        i_HaCAva.Ne.push(i_ZSDiIi | i_ipNXXi);
        break;
      case "8":
        i_HaCAva.Ne.push(i_ZSDiIi | i_xcfpRi);
        break;
      case "A":
        i_HaCAva.Ne.push(mask_fire1);
        break;
      case "B":
        i_HaCAva.Ne.push(mask_fire2);
        break;
      case "C":
        i_HaCAva.Ne.push(mask_fire3);
        break;
      case "D":
        i_HaCAva.Ne.push(mask_fire4);
        break;
      case "E":
        i_HaCAva.Ne.push(mask_fire5);
        break;
      case "F":
        i_HaCAva.Ne.push(mask_fire6);
        break;
      case "等":
        i_HaCAva.Ne.push(0);
    }
  }
  for (_0x4d00bb = 0; _0x4d00bb < i_WmyDOu.gGes3.length; _0x4d00bb++) {
    switch (i_WmyDOu.gGes3[_0x4d00bb]) {
      case "1":
        i_HaCAva.Ue.push(i_ipNXXi);
        break;
      case "2":
        i_HaCAva.Ue.push(i_xcfpRi);
        break;
      case "3":
        i_HaCAva.Ue.push(i_QmFZzi);
        break;
      case "4":
        i_HaCAva.Ue.push(i_ZSDiIi);
        break;
      case "5":
        i_HaCAva.Ue.push(i_QmFZzi | i_ipNXXi);
        break;
      case "6":
        i_HaCAva.Ue.push(i_QmFZzi | i_xcfpRi);
        break;
      case "7":
        i_HaCAva.Ue.push(i_ZSDiIi | i_ipNXXi);
        break;
      case "8":
        i_HaCAva.Ue.push(i_ZSDiIi | i_xcfpRi);
        break;
      case "A":
        i_HaCAva.Ue.push(mask_fire1);
        break;
      case "B":
        i_HaCAva.Ue.push(mask_fire2);
        break;
      case "C":
        i_HaCAva.Ue.push(mask_fire3);
        break;
      case "D":
        i_HaCAva.Ue.push(mask_fire4);
        break;
      case "E":
        i_HaCAva.Ue.push(mask_fire5);
        break;
      case "F":
        i_HaCAva.Ue.push(mask_fire6);
        break;
      case "等":
        i_HaCAva.Ue.push(0);
    }
  }
  for (_0x4d00bb = 0; _0x4d00bb < i_WmyDOu.gGes4.length; _0x4d00bb++) {
    switch (i_WmyDOu.gGes4[_0x4d00bb]) {
      case "1":
        i_HaCAva.De.push(i_ipNXXi);
        break;
      case "2":
        i_HaCAva.De.push(i_xcfpRi);
        break;
      case "3":
        i_HaCAva.De.push(i_QmFZzi);
        break;
      case "4":
        i_HaCAva.De.push(i_ZSDiIi);
        break;
      case "5":
        i_HaCAva.De.push(i_QmFZzi | i_ipNXXi);
        break;
      case "6":
        i_HaCAva.De.push(i_QmFZzi | i_xcfpRi);
        break;
      case "7":
        i_HaCAva.De.push(i_ZSDiIi | i_ipNXXi);
        break;
      case "8":
        i_HaCAva.De.push(i_ZSDiIi | i_xcfpRi);
        break;
      case "A":
        i_HaCAva.De.push(mask_fire1);
        break;
      case "B":
        i_HaCAva.De.push(mask_fire2);
        break;
      case "C":
        i_HaCAva.De.push(mask_fire3);
        break;
      case "D":
        i_HaCAva.De.push(mask_fire4);
        break;
      case "E":
        i_HaCAva.De.push(mask_fire5);
        break;
      case "F":
        i_HaCAva.De.push(mask_fire6);
        break;
      case "等":
        i_HaCAva.De.push(0);
    }
  }
}
function i_JHFkga() {
  if (i_wpdPfa.length > 0) {
    var _0x2dbcfe = i_wpdPfa.shift();
    if (i_iYai_a == 1) {
      if (_0x2dbcfe & i_ipNXXi) {
        _0x2dbcfe &= ~i_ipNXXi;
        _0x2dbcfe |= i_xcfpRi;
      } else if (_0x2dbcfe & i_xcfpRi) {
        _0x2dbcfe &= ~i_xcfpRi;
        _0x2dbcfe |= i_ipNXXi;
      }
    }
    return _0x2dbcfe;
  }
  return null;
}
function i_pAJwha(_0x19d8bc) {
  i_wpdPfa.push(0);
  if (_0x19d8bc == 0) {
    i_wpdPfa = i_wpdPfa.concat(i_HaCAva.Ie);
  } else if (_0x19d8bc == 1) {
    i_wpdPfa = i_wpdPfa.concat(i_HaCAva.Ne);
  } else if (_0x19d8bc == 2) {
    i_wpdPfa = i_wpdPfa.concat(i_HaCAva.Ue);
  } else if (_0x19d8bc == 3) {
    i_wpdPfa = i_wpdPfa.concat(i_HaCAva.De);
  }
  i_wpdPfa.push(0);
}
var i_MQwnba = navigator.userAgent;
var i_GHKWya = {
  $e: 0,
  Be: 1,
  Ge: 2,
  Fe: 3,
  Le: 7,
  qe: 8,
  Ve: 9,
  je: 10,
  Ye: 13,
  o: 14,
  He: function () {
    if (i_WmyDOu.gCtlZD && navigator.vibrate != null) {
      navigator.vibrate(32);
    }
  },
  We: function () {
    i_jPzhfu(this.Be, 1);
  },
  Je: function () {
    i_jPzhfu(this.Be, 0);
  },
  Qe: function () {
    i_jPzhfu(this.Ge, 1);
  },
  Ze: function () {
    i_jPzhfu(this.Ge, 0);
  },
  en: function () {
    if (i_WmyDOu.gASuper) {
      i_jPzhfu(this.Le, 2);
    } else {
      i_jPzhfu(this.Le, 1);
    }
  },
  nn: function () {
    i_jPzhfu(this.Le, 0);
  },
  tn: function () {
    if (i_WmyDOu.gBSuper) {
      i_jPzhfu(this.qe, 2);
    } else {
      i_jPzhfu(this.qe, 1);
    }
  },
  an: function () {
    i_jPzhfu(this.qe, 0);
  },
  in: function () {
    i_jPzhfu(this.Ve, 1);
  },
  cn: function () {
    i_jPzhfu(this.Ve, 0);
  },
  sn: function () {
    i_jPzhfu(this.je, 1);
  },
  rn: function () {
    i_jPzhfu(this.je, 0);
  },
  ln: function () {
    i_jPzhfu(this.Ye, i_WmyDOu.gExtX1Key);
  },
  un: function () {
    i_jPzhfu(this.Ye, 0);
  },
  _n: function (_0x3b4bca) {
    i_jPzhfu(this.Fe, _0x3b4bca);
  }
};
var i_ZSfTwa = false;
var i_TBnkka = null;
var i_KbwzTa = 0;
var i_dwBdxa = 1;
var i_rtsAMa = 2;
var i_KAhWPa = 3;
var i_yETWEa = 4;
var i_XyPCAa = 5;
var i_ckjFSa = 6;
var i_DMWdCa = 7;
var i_DzADKa = 8;
var i_hKeKOa = 9;
var i_meTjXa = -1;
var i_QAaTRa = -1;
var i_wDhTza = -1;
var i_XNHXIa = -1;
var i_QCGsNa = -1;
var i_QkDjUa = -1;
var i_yjKJDa = -1;
var i_FAcs$a = -1;
var i_cdHwBa = 0;
var i_XGpsGa = false;
var i_NjznFa = false;
var i_kxmzLa = false;
var i_Hzkdqa = false;
var i_DhizVa = false;
var i_WBwdja = false;
var i_hEZSYa = false;
var i_mHHaHa = false;
var i_TJprWa = false;
var i_JzAAJa = false;
var i_bDYGQa = false;
var i_GRxtZa = false;
var i_HjtSei = -1;
var i_Mssmni = null;
var i_DFBCti = 0;
var i_Mhjhai = 0;
var i_CBwzii = 0;
function i_FpYmoi() {
  window.addEventListener("gamepadconnected", function (_0xdd4916) {
    if (i_iDQBme) {
      i_StRmhn(navigator.getGamepads());
    } else {
      i_tCYnQs(navigator.getGamepads());
    }
    if (i_Mssmni == null) {
      i_Mssmni = setInterval(i_QTEksi, 4);
    }
    i_ZSfTwa = true;
    if (i_MjAfV != null) {
      i_MjAfV[i_ektDj] = 1;
    }
    var _0x4901f0 = _0xdd4916.gamepad.id.substr(0, _0xdd4916.gamepad.id.indexOf("(Ven"));
    if (_0x4901f0 == "") {
      _0x4901f0 = _0xdd4916.gamepad.id.substr(0, _0xdd4916.gamepad.id.indexOf("("));
    }
    if (_0x4901f0 == "") {
      _0x4901f0 = _0xdd4916.gamepad.id;
    }
    i_rrYppt("外设 【" + _0x4901f0 + "】接入", true);
  });
  window.addEventListener("gamepaddisconnected", function (_0x551d23) {
    if (i_iDQBme) {
      var _0x3cdee7 = i_StRmhn(navigator.getGamepads());
    } else {
      _0x3cdee7 = i_tCYnQs(navigator.getGamepads());
    }
    if (_0x3cdee7 <= 0) {
      i_ZSfTwa = false;
      if (i_MjAfV != null) {
        i_MjAfV[i_ektDj] = 0;
      }
    }
    if (i_Mssmni) {
      clearInterval(i_Mssmni);
      i_Mssmni = null;
    }
    var _0x4378a9 = _0x551d23.gamepad.id.substr(0, _0x551d23.gamepad.id.indexOf("(Ven"));
    if (_0x4378a9 == "") {
      _0x4378a9 = _0x551d23.gamepad.id.substr(0, _0x551d23.gamepad.id.indexOf("("));
    }
    if (_0x4378a9 == "") {
      _0x4378a9 = _0x551d23.gamepad.id;
    }
    i_iZhRvt("外设【" + _0x4378a9 + "】断开", true);
  });
}
var i_djkPci = 0;
function i_QTEksi() {
  if (i_MjAfV != null) {
    clearInterval(i_Mssmni);
    i_Mssmni = null;
    return;
  }
  i_TBswui();
}
function i_PxXari(_0x1d02a5) {
  var _0x9bfa13 = navigator.getGamepads()[_0x1d02a5];
  var _0x2fb6d9 = 0;
  if (_0x9bfa13 == null) {
    return _0x2fb6d9;
  }
  if (i_WmyDOu.GPSetx.KeyCoin != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyCoin].pressed) {
    _0x2fb6d9 |= i_wXysKi;
  }
  if (i_WmyDOu.GPSetx.KeyStart != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyStart].pressed) {
    _0x2fb6d9 |= i_PzdYOi;
  }
  if (i_WmyDOu.GPSetx.KeyFire1 != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyFire1].pressed) {
    _0x2fb6d9 |= i_PZFcNi;
  }
  if (i_WmyDOu.GPSetx.KeyFire2 != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyFire2].pressed) {
    _0x2fb6d9 |= i_TMPKUi;
  }
  if (i_WmyDOu.GPSetx.KeyFire3 != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyFire3].pressed) {
    _0x2fb6d9 |= i_PZFcNi;
    _0x2fb6d9 |= i_HSeGX_ * 256 + i_HKAKDi;
  }
  if (i_WmyDOu.GPSetx.KeyFire4 != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyFire4].pressed) {
    _0x2fb6d9 |= i_TMPKUi;
    _0x2fb6d9 |= i_HSeGX_ * 256 + i_wQXx$i;
  }
  if (i_WmyDOu.GPSetx.KeyJoy == 1) {
    if (i_WmyDOu.GPSetx.KeyLeft == 9 || i_WmyDOu.GPSetx.KeyRight == 9 || i_WmyDOu.GPSetx.KeyUp == 9 || i_WmyDOu.GPSetx.KeyDown == 9) {
      var _0x2c33ee = i_TBnkka.axes[9] * 10 | 0;
      if (i_WmyDOu.GPSetx.gKeyRev) {
        switch (_0x2c33ee) {
          case -10:
            _0x2c33ee = 7;
            break;
          case 7:
            _0x2c33ee = 1;
            break;
          case 1:
            _0x2c33ee = -4;
            break;
          case -4:
            _0x2c33ee = -10;
            break;
          case 10:
            _0x2c33ee = 4;
            break;
          case 4:
            _0x2c33ee = -1;
            break;
          case -1:
            _0x2c33ee = -7;
            break;
          case -7:
            _0x2c33ee = 10;
        }
      }
      switch (_0x2c33ee) {
        case -10:
          _0x2fb6d9 |= i_QmFZzi;
          break;
        case 7:
          _0x2fb6d9 |= i_ipNXXi;
          break;
        case 1:
          _0x2fb6d9 |= i_ZSDiIi;
          break;
        case -4:
          _0x2fb6d9 |= i_xcfpRi;
          break;
        case 10:
          _0x2fb6d9 |= i_ipNXXi | i_QmFZzi;
          break;
        case 4:
          _0x2fb6d9 |= i_ipNXXi | i_ZSDiIi;
          break;
        case -1:
          _0x2fb6d9 |= i_xcfpRi | i_ZSDiIi;
          break;
        case -7:
          _0x2fb6d9 |= i_xcfpRi | i_QmFZzi;
      }
      if (i_WmyDOu.GPSetx.gKeyRevLR && _0x2fb6d9 & mask_leftright) {
        _0x2fb6d9 ^= mask_leftright;
      }
      if (i_WmyDOu.GPSetx.gKeyRev) {
        if (_0x2fb6d9 & mask_leftright) {
          _0x2fb6d9 ^= mask_leftright;
        }
        if (_0x2fb6d9 & mask_updown) {
          _0x2fb6d9 ^= mask_updown;
        }
      }
    } else if (i_WmyDOu.GPSetx.gKeyRev) {
      if (i_WmyDOu.GPSetx.gKeyRevLR) {
        if (i_WmyDOu.GPSetx.KeyLeft != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyLeft] < -0.5) {
          _0x2fb6d9 |= i_ipNXXi;
        }
        if (i_WmyDOu.GPSetx.KeyRight != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyRight] > 0.5) {
          _0x2fb6d9 |= i_xcfpRi;
        }
      } else {
        if (i_WmyDOu.GPSetx.KeyLeft != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyLeft] > 0.5) {
          _0x2fb6d9 |= i_ipNXXi;
        }
        if (i_WmyDOu.GPSetx.KeyRight != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyRight] < -0.5) {
          _0x2fb6d9 |= i_xcfpRi;
        }
      }
      if (i_WmyDOu.GPSetx.KeyUp != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyUp] > 0.5) {
        _0x2fb6d9 |= i_QmFZzi;
      }
      if (i_WmyDOu.GPSetx.KeyDown != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyDown] < -0.5) {
        _0x2fb6d9 |= i_ZSDiIi;
      }
    } else {
      if (i_WmyDOu.GPSetx.gKeyRevLR) {
        if (i_WmyDOu.GPSetx.KeyLeft != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyLeft] > 0.5) {
          _0x2fb6d9 |= i_ipNXXi;
        }
        if (i_WmyDOu.GPSetx.KeyRight != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyRight] < -0.5) {
          _0x2fb6d9 |= i_xcfpRi;
        }
      } else {
        if (i_WmyDOu.GPSetx.KeyLeft != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyLeft] < -0.5) {
          _0x2fb6d9 |= i_ipNXXi;
        }
        if (i_WmyDOu.GPSetx.KeyRight != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyRight] > 0.5) {
          _0x2fb6d9 |= i_xcfpRi;
        }
      }
      if (i_WmyDOu.GPSetx.KeyUp != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyUp] < -0.5) {
        _0x2fb6d9 |= i_QmFZzi;
      }
      if (i_WmyDOu.GPSetx.KeyDown != -1 && _0x9bfa13.axes[i_WmyDOu.GPSetx.KeyDown] > 0.5) {
        _0x2fb6d9 |= i_ZSDiIi;
      }
    }
  } else if (i_WmyDOu.GPSetx.KeyUp != -1 && i_WmyDOu.GPSetx.KeyDown != -1 && i_WmyDOu.GPSetx.KeyLeft != -1 && i_WmyDOu.GPSetx.KeyRight != -1) {
    if (_0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyUp].pressed) {
      _0x2fb6d9 |= i_QmFZzi;
    }
    if (_0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyDown].pressed) {
      _0x2fb6d9 |= i_ZSDiIi;
    }
    if (_0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyLeft].pressed) {
      _0x2fb6d9 |= i_ipNXXi;
    }
    if (_0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyRight].pressed) {
      _0x2fb6d9 |= i_xcfpRi;
    }
  }
  if (i_WmyDOu.GPSetx.KeyX1 != -1 && _0x9bfa13.buttons[i_WmyDOu.GPSetx.KeyX1].pressed) {
    _0x2fb6d9 |= i_PZFcNi | i_TMPKUi;
  }
  return _0x2fb6d9;
}
function i_Gjbpli() {
  var _0x7266c6 = i_PxXari(0);
  var _0x3f1c60 = i_PxXari(1);
  if (_0x7266c6 != i_Mhjhai) {
    i_Mhjhai = _0x7266c6;
    i_jPzhfu(i_GHKWya.$e, i_Mhjhai);
  }
  if (_0x3f1c60 != i_CBwzii) {
    i_CBwzii = _0x3f1c60;
    i_aCbGuu(i_GHKWya.$e, i_CBwzii);
  }
  if (i_MjAfV != null) {
    i_MjAfV[i_SWfJY] = 1;
    Atomics.notify(i_MjAfV, i_SWfJY, 1);
  }
}
function i_TBswui() {
  if (i_DFBCti != 2) {
    var _0x597831 = 0;
    if ((i_TBnkka = navigator.getGamepads()[i_HjtSei]) != null) {
      if (i_WmyDOu.GPSetx.KeyCoin != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyCoin].pressed) {
        _0x597831 |= i_wXysKi;
      }
      if (i_WmyDOu.GPSetx.KeyStart != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyStart].pressed) {
        _0x597831 |= i_PzdYOi;
      }
      if (i_WmyDOu.GPSetx.KeyFire1 != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyFire1].pressed) {
        _0x597831 |= i_PZFcNi;
      }
      if (i_WmyDOu.GPSetx.KeyFire2 != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyFire2].pressed) {
        _0x597831 |= i_TMPKUi;
      }
      if (i_WmyDOu.GPSetx.KeyFire3 != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyFire3].pressed) {
        _0x597831 |= i_HSeGX_ * 256 + i_HKAKDi;
      }
      if (i_WmyDOu.GPSetx.KeyFire4 != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyFire4].pressed) {
        _0x597831 |= i_HSeGX_ * 256 + i_wQXx$i;
      }
      if (i_WmyDOu.GPSetx.KeyJoy == 1) {
        if (i_WmyDOu.GPSetx.KeyLeft == 9 || i_WmyDOu.GPSetx.KeyRight == 9 || i_WmyDOu.GPSetx.KeyUp == 9 || i_WmyDOu.GPSetx.KeyDown == 9) {
          var _0x2ddab0 = i_TBnkka.axes[9] * 10 | 0;
          if (i_WmyDOu.GPSetx.gKeyRev) {
            switch (_0x2ddab0) {
              case -10:
                _0x2ddab0 = 7;
                break;
              case 7:
                _0x2ddab0 = 1;
                break;
              case 1:
                _0x2ddab0 = -4;
                break;
              case -4:
                _0x2ddab0 = -10;
                break;
              case 10:
                _0x2ddab0 = 4;
                break;
              case 4:
                _0x2ddab0 = -1;
                break;
              case -1:
                _0x2ddab0 = -7;
                break;
              case -7:
                _0x2ddab0 = 10;
            }
          }
          switch (_0x2ddab0) {
            case -10:
              _0x597831 |= i_QmFZzi;
              break;
            case 7:
              _0x597831 |= i_ipNXXi;
              break;
            case 1:
              _0x597831 |= i_ZSDiIi;
              break;
            case -4:
              _0x597831 |= i_xcfpRi;
              break;
            case 10:
              _0x597831 |= i_ipNXXi | i_QmFZzi;
              break;
            case 4:
              _0x597831 |= i_ipNXXi | i_ZSDiIi;
              break;
            case -1:
              _0x597831 |= i_xcfpRi | i_ZSDiIi;
              break;
            case -7:
              _0x597831 |= i_xcfpRi | i_QmFZzi;
          }
          if (i_WmyDOu.GPSetx.gKeyRevLR && _0x597831 & mask_leftright) {
            _0x597831 ^= mask_leftright;
          }
          if (i_WmyDOu.GPSetx.gKeyRev) {
            if (_0x597831 & mask_leftright) {
              _0x597831 ^= mask_leftright;
            }
            if (_0x597831 & mask_updown) {
              _0x597831 ^= mask_updown;
            }
          }
        } else if (i_WmyDOu.GPSetx.gKeyRev) {
          if (i_WmyDOu.GPSetx.gKeyRevLR) {
            if (i_WmyDOu.GPSetx.KeyLeft != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyLeft] < -0.5) {
              _0x597831 |= i_ipNXXi;
            }
            if (i_WmyDOu.GPSetx.KeyRight != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyRight] > 0.5) {
              _0x597831 |= i_xcfpRi;
            }
          } else {
            if (i_WmyDOu.GPSetx.KeyLeft != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyLeft] > 0.5) {
              _0x597831 |= i_ipNXXi;
            }
            if (i_WmyDOu.GPSetx.KeyRight != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyRight] < -0.5) {
              _0x597831 |= i_xcfpRi;
            }
          }
          if (i_WmyDOu.GPSetx.KeyUp != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyUp] > 0.5) {
            _0x597831 |= i_QmFZzi;
          }
          if (i_WmyDOu.GPSetx.KeyDown != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyDown] < -0.5) {
            _0x597831 |= i_ZSDiIi;
          }
        } else {
          if (i_WmyDOu.GPSetx.gKeyRevLR) {
            if (i_WmyDOu.GPSetx.KeyLeft != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyLeft] > 0.5) {
              _0x597831 |= i_ipNXXi;
            }
            if (i_WmyDOu.GPSetx.KeyRight != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyRight] < -0.5) {
              _0x597831 |= i_xcfpRi;
            }
          } else {
            if (i_WmyDOu.GPSetx.KeyLeft != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyLeft] < -0.5) {
              _0x597831 |= i_ipNXXi;
            }
            if (i_WmyDOu.GPSetx.KeyRight != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyRight] > 0.5) {
              _0x597831 |= i_xcfpRi;
            }
          }
          if (i_WmyDOu.GPSetx.KeyUp != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyUp] < -0.5) {
            _0x597831 |= i_QmFZzi;
          }
          if (i_WmyDOu.GPSetx.KeyDown != -1 && i_TBnkka.axes[i_WmyDOu.GPSetx.KeyDown] > 0.5) {
            _0x597831 |= i_ZSDiIi;
          }
        }
      } else if (i_WmyDOu.GPSetx.KeyUp != -1 && i_WmyDOu.GPSetx.KeyDown != -1 && i_WmyDOu.GPSetx.KeyLeft != -1 && i_WmyDOu.GPSetx.KeyRight != -1) {
        if (i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyUp].pressed) {
          _0x597831 |= i_QmFZzi;
        }
        if (i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyDown].pressed) {
          _0x597831 |= i_ZSDiIi;
        }
        if (i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyLeft].pressed) {
          _0x597831 |= i_ipNXXi;
        }
        if (i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyRight].pressed) {
          _0x597831 |= i_xcfpRi;
        }
      }
      if (i_WmyDOu.GPSetx.KeyX1 != -1 && i_TBnkka.buttons[i_WmyDOu.GPSetx.KeyX1].pressed) {
        _0x597831 |= i_PZFcNi | i_TMPKUi;
      }
      if (_0x597831 != i_cdHwBa) {
        i_cdHwBa = _0x597831;
        if (i_DFBCti == 1) {
          i_aCbGuu(i_GHKWya.$e, i_cdHwBa);
        } else {
          i_jPzhfu(i_GHKWya.$e, i_cdHwBa);
        }
      }
      if (i_MjAfV != null) {
        i_MjAfV[i_SWfJY] = 1;
        Atomics.notify(i_MjAfV, i_SWfJY, 1);
      }
    }
  } else {
    i_Gjbpli();
  }
}
function i_AGybfi(_0x4ea29e) {
  var _0x226851 = Array.isArray(_0x4ea29e) ? [] : {};
  for (var _0x4ac04d in _0x4ea29e) {
    if (_0x4ea29e.hasOwnProperty(_0x4ac04d)) {
      if (typeof _0x4ea29e[_0x4ac04d] == "object" && _0x4ea29e[_0x4ac04d] !== null) {
        _0x226851[_0x4ac04d] = i_AGybfi(_0x4ea29e[_0x4ac04d]);
      } else {
        _0x226851[_0x4ac04d] = _0x4ea29e[_0x4ac04d];
      }
    }
  }
  return _0x226851;
}
function i_HHPb_i() {
  return navigator.getGamepads()[i_HjtSei];
}
var i_FsSwvi = false;
var i_pSGadi = {
  buttons: []
};
function i_dcwFpi(_0x508491) {
  var _0x95a21e = navigator.getGamepads()[i_HjtSei];
  for (var _0x2a58e4 in _0x95a21e.buttons) {
    i_pSGadi.buttons[_0x2a58e4] = _0x95a21e.buttons[_0x2a58e4].pressed;
  }
  i_pSGadi.axes = _0x95a21e.axes;
  bindNow = _0x508491;
  if (bindNow.innerText.indexOf("(") > 1) {
    bindNow.innerText = bindNow.innerText.substr(0, 2) + "(?)";
  } else {
    bindNow.innerText = bindNow.innerText.substr(0, 1) + "(?)";
  }
  i_FsSwvi = true;
}
function i_GiDGmi(_0x3810fe) {
  var _0x324823 = _0x3810fe;
  bindNow.innerText = bindNow.innerText.replace("?", _0x324823);
  i_WmyDOu.GPSetx[bindNow.value] = _0x3810fe;
  if (bindNow.value == "KeyLeft") {
    i_WmyDOu.GPSetx.KeyJoy = 0;
  }
  for (var _0x3323ae in i_WmyDOu.GPSetx) {
    if (i_WmyDOu.GPSetx[_0x3323ae] == _0x3810fe && _0x3323ae != bindNow.value) {
      if (_0x3323ae == "KeyJoy" || _0x3323ae == "KeyUp" || _0x3323ae == "KeyDown" || _0x3323ae == "KeyLeft" || _0x3323ae == "KeyRight") {
        continue;
      }
      i_WmyDOu.GPSetx[_0x3323ae] = -1;
      i_ZyAphi();
    }
  }
  i_FsSwvi = false;
}
function i_JMnbgi(_0x37a6de) {
  var _0x1f3f6f = _0x37a6de;
  bindNow.innerText = bindNow.innerText.replace("?", _0x1f3f6f);
  i_WmyDOu.GPSetx[bindNow.value] = _0x37a6de;
  i_WmyDOu.GPSetx.KeyJoy = 1;
  i_FsSwvi = false;
}
function i_ZyAphi() {
  document.getElementsByName("joybind").forEach(function (_0x269bda) {
    var _0x525468 = i_WmyDOu.GPSetx[_0x269bda.firstChild.value];
    _0x525468 = "(" + _0x525468 + ")";
    if (_0x269bda.firstChild.innerText.indexOf("(") > 0) {
      _0x269bda.firstChild.innerText = _0x269bda.firstChild.innerText.substr(0, _0x269bda.firstChild.innerText.indexOf("("));
    }
    if (_0x269bda.firstChild.innerText.length > 1) {
      _0x269bda.firstChild.innerText = _0x269bda.firstChild.innerText.substr(0, 2) + _0x525468;
    } else {
      _0x269bda.firstChild.innerText = _0x269bda.firstChild.innerText.substr(0, 1) + _0x525468;
    }
  });
}
function i_nDJmbi() {
  if (i_ZSfTwa && i_FsSwvi) {
    var _0x592d54 = navigator.getGamepads()[0];
    var _0x1432c1 = 0;
    for (; _0x1432c1 < _0x592d54.buttons.length; _0x1432c1++) {
      if (_0x592d54.buttons[_0x1432c1].pressed && i_pSGadi.buttons[_0x1432c1] == 0) {
        i_GiDGmi(_0x1432c1);
        break;
      }
    }
    for (_0x1432c1 = 0; _0x1432c1 < _0x592d54.axes.length; _0x1432c1++) {
      if (Math.abs(_0x592d54.axes[_0x1432c1]) > 0.5 && _0x592d54.axes[_0x1432c1] != i_pSGadi.axes[_0x1432c1]) {
        i_JMnbgi(_0x1432c1);
        break;
      }
    }
  }
}
function i_Hbmkyi() {
  i_RPdSEi();
  i_FpYmoi();
}
var i_FjNPwi = 0;
var i_cPWAki = 0;
var i_JGprTi = 65535;
var i_tnMExi = 65535;
var i_PByhMi = false;
var i_EikbPi = false;
function i_RPdSEi() {
  document.addEventListener("keydown", function (_0x57c98a) {
    i_EikbPi = _0x57c98a.altKey;
    if (!_0x57c98a.repeat && !i_PByhMi && _0x57c98a.key != "Enter") {
      if (_0x57c98a.ctrlKey && i_iDpHde == 0 && i_iDQBme) {
        if (_0x57c98a.key == "z") {
          i_WmWryu(1);
          i_GJQKdt(" 快速存1号档");
        }
        if (_0x57c98a.key == "x") {
          i_ZjZkwu(1);
          i_GJQKdt(" 快速读1号档");
        }
      }
      if (_0x57c98a.key == "Tab") {
        i_WyfZCt();
        _0x57c98a.preventDefault();
        return;
      }
      if (_0x57c98a.code != "Escape") {
        if (!(_0x57c98a.target.type == "password" && _0x57c98a.target.nodeName == "INPUT" || _0x57c98a.target.type == "text" && _0x57c98a.target.nodeName == "INPUT" || _0x57c98a.target.nodeName == "TEXTAREA")) {
          if (_0x57c98a.key != "`") {
            switch (_0x57c98a.code) {
              case i_WmyDOu.PCSet.KeyUp:
                i_cPWAki = (i_FjNPwi |= 1) & -3 & i_JGprTi;
                i_tnMExi = -3;
                i_GHKWya._n(i_cPWAki);
                break;
              case i_WmyDOu.PCSet.KeyLeft:
                i_cPWAki = (i_FjNPwi |= 4) & -9;
                i_JGprTi = -9;
                if ((i_FjNPwi & 12) != 12 || i_WmyDOu.gDisHoldLR) {
                  i_GHKWya._n(i_FjNPwi);
                } else {
                  var _0x542122 = i_cPWAki;
                  i_GHKWya._n(_0x542122 | i_cPWAki);
                }
                break;
              case i_WmyDOu.PCSet.KeyDown:
                i_cPWAki = (i_tnMExi = -2) & (i_FjNPwi |= 2) & i_JGprTi;
                i_GHKWya._n(i_cPWAki);
                break;
              case i_WmyDOu.PCSet.KeyRight:
                i_cPWAki = (i_JGprTi = -5) & (i_FjNPwi |= 8);
                if ((i_FjNPwi & 12) != 12 || i_WmyDOu.gDisHoldLR) {
                  i_GHKWya._n(i_FjNPwi);
                } else {
                  _0x542122 = i_cPWAki;
                  i_GHKWya._n(_0x542122 | i_cPWAki);
                }
                break;
              case i_WmyDOu.PCSet.KeyFire1:
                i_GHKWya.en();
                break;
              case i_WmyDOu.PCSet.KeyFire2:
                i_GHKWya.tn();
                break;
              case i_WmyDOu.PCSet.KeyFire3:
                i_GHKWya.in();
                break;
              case i_WmyDOu.PCSet.KeyFire4:
                i_GHKWya.sn();
                break;
              case i_WmyDOu.PCSet.KeyStart:
                i_GHKWya.We();
                break;
              case i_WmyDOu.PCSet.KeyCoin:
                i_GHKWya.Qe();
                break;
              case i_WmyDOu.PCSet.KeyX1:
                i_GHKWya.ln();
            }
            _0x57c98a.preventDefault();
          } else {
            i_GEMRR();
          }
        }
      } else {
        i_XxahKt();
      }
    }
  }, false);
  document.addEventListener("keyup", function (_0x1b4f1d) {
    i_EikbPi = _0x1b4f1d.altKey;
    if (_0x1b4f1d.key != "Enter") {
      if (!_0x1b4f1d.repeat) {
        switch (_0x1b4f1d.code) {
          case i_WmyDOu.PCSet.KeyUp:
            i_cPWAki = (i_FjNPwi &= -2) & i_JGprTi;
            i_GHKWya._n(i_cPWAki);
            break;
          case i_WmyDOu.PCSet.KeyLeft:
            i_FjNPwi &= -5;
            i_JGprTi = -5;
            i_GHKWya._n(i_FjNPwi);
            break;
          case i_WmyDOu.PCSet.KeyDown:
            i_cPWAki = (i_FjNPwi &= -3) & i_JGprTi;
            i_GHKWya._n(i_cPWAki);
            break;
          case i_WmyDOu.PCSet.KeyRight:
            i_FjNPwi &= -9;
            i_JGprTi = -9;
            i_GHKWya._n(i_FjNPwi);
            break;
          case i_WmyDOu.PCSet.KeyFire1:
            i_GHKWya.nn();
            break;
          case i_WmyDOu.PCSet.KeyFire2:
            i_GHKWya.an();
            break;
          case i_WmyDOu.PCSet.KeyFire3:
            i_GHKWya.cn();
            break;
          case i_WmyDOu.PCSet.KeyFire4:
            i_GHKWya.rn();
            break;
          case i_WmyDOu.PCSet.KeyStart:
            i_GHKWya.Je();
            if (!i_CEeRff && i_iDQBme) {
              i_kkffJf();
            }
            break;
          case i_WmyDOu.PCSet.KeyCoin:
            i_GHKWya.Ze();
            break;
          case i_WmyDOu.PCSet.KeyX1:
            i_GHKWya.un();
        }
        _0x1b4f1d.preventDefault();
      }
    } else {
      i_CmTmwt();
    }
  }, false);
}
var i_iChyAi = 0;
var i_QSiQSi = 0;
function i_kcihCi(_0x4c07f6, _0x4b95dd) {
  i_xWZnqi(i_iChyAi = i_mDiGLi(i_iChyAi, _0x4c07f6, _0x4b95dd));
}
var i_wXysKi = 4;
var i_PzdYOi = 8;
var i_ipNXXi = 64;
var i_xcfpRi = 128;
var i_QmFZzi = 16;
var i_ZSDiIi = 32;
var i_PZFcNi = 1;
var i_TMPKUi = 2;
var i_HKAKDi = 16384;
var i_wQXx$i = 32768;
var i_TENtBi = 255;
var i_habnGi = 16128;
var i_arFdFi = 256;
function i_mDiGLi(_0xe38575, _0x466b24, _0xc21f4f) {
  var _0x99f40c = _0xc21f4f;
  switch (_0x466b24) {
    case i_GHKWya.$e:
      _0xe38575 = _0x99f40c;
      break;
    case i_GHKWya.o:
      if (_0x99f40c & 1) {
        _0xe38575 |= i_arFdFi;
      } else {
        _0xe38575 &= ~i_arFdFi;
      }
      break;
    case i_GHKWya.Ye:
      if (_0x99f40c & 1) {
        _0xe38575 |= i_PZFcNi | i_TMPKUi;
      } else {
        _0xe38575 &= ~(i_PZFcNi | i_TMPKUi);
      }
      break;
    case i_GHKWya.Be:
      if (_0x99f40c == 1) {
        _0xe38575 |= i_PzdYOi;
      } else {
        _0xe38575 &= ~i_PzdYOi;
      }
      break;
    case i_GHKWya.Ge:
      if (_0x99f40c == 1) {
        _0xe38575 |= i_wXysKi;
      } else {
        _0xe38575 &= ~i_wXysKi;
      }
      break;
    case i_GHKWya.Le:
      if (_0x99f40c > 0) {
        _0xe38575 |= i_PZFcNi;
        if (_0x99f40c == 2) {
          i_QSiQSi |= i_PZFcNi;
          i_ebaBuo |= i_PZFcNi;
        }
      } else {
        _0xe38575 &= ~i_PZFcNi;
        i_QSiQSi &= ~i_PZFcNi;
        i_ebaBuo &= ~i_PZFcNi;
      }
      break;
    case i_GHKWya.qe:
      if (_0x99f40c > 0) {
        _0xe38575 |= i_TMPKUi;
        if (_0x99f40c == 2) {
          i_QSiQSi |= i_TMPKUi;
          i_ebaBuo |= i_TMPKUi;
        }
      } else {
        _0xe38575 &= ~i_TMPKUi;
        i_QSiQSi &= ~i_TMPKUi;
        i_ebaBuo &= ~i_TMPKUi;
      }
      break;
    case i_GHKWya.Ve:
      if (_0x99f40c == 1) {
        _0xe38575 &= ~i_habnGi;
        _0xe38575 |= i_PZFcNi;
        _0xe38575 |= i_HSeGX_ * 256 + i_HKAKDi;
      } else {
        _0xe38575 &= ~i_PZFcNi;
        _0xe38575 &= ~i_HKAKDi;
      }
      break;
    case i_GHKWya.je:
      if (_0x99f40c == 1) {
        _0xe38575 &= ~i_habnGi;
        _0xe38575 |= i_TMPKUi;
        _0xe38575 |= i_HSeGX_ * 256 + i_wQXx$i;
      } else {
        _0xe38575 &= ~i_TMPKUi;
        _0xe38575 &= ~i_wQXx$i;
      }
      break;
    case i_GHKWya.Fe:
      if (_0x99f40c & 1) {
        _0xe38575 |= i_QmFZzi;
      } else {
        _0xe38575 &= ~i_QmFZzi;
      }
      if (_0x99f40c & 2) {
        _0xe38575 |= i_ZSDiIi;
      } else {
        _0xe38575 &= ~i_ZSDiIi;
      }
      if (_0x99f40c & 4) {
        _0xe38575 |= i_ipNXXi;
      } else {
        _0xe38575 &= ~i_ipNXXi;
      }
      if (_0x99f40c & 8) {
        _0xe38575 |= i_xcfpRi;
      } else {
        _0xe38575 &= ~i_xcfpRi;
      }
  }
  return _0xe38575;
}
function i_xWZnqi(_0x237dd1) {
  if (i_jwsYB != null) {
    i_jwsYB[1] = _0x237dd1;
  } else {
    i_zXJHnu(i_cZwcUl.vn, _0x237dd1 & 255, _0x237dd1 / 256);
  }
}
function i_aGfyVi(_0x1e54f9) {
  i_zXJHnu(i_cZwcUl.dn, _0x1e54f9 & 255, _0x1e54f9 / 256);
}
var i_FZEFji = null;
var i_nibwYi = false;
var i_dnyXHi = false;
var i_thhFWi = false;
var i_fdZfJi = false;
var i_bPrAQi = false;
var i_xjHeZi = 0;
var i_EHEBeo = 0;
var i_CfBYno = 0;
var i_SkHato = 0;
var i_sCrNao = null;
var i_MyGmio = new ArrayBuffer(2);
var i_Pmzpoo = new Uint16Array(i_MyGmio);
var i_aPjBco = new ArrayBuffer(4);
var i_wsSfso = new Uint16Array(i_aPjBco);
var i_emcHro = 0;
var i_Kbzklo = 0;
var i_ebaBuo = 0;
var i_fHfdfo = 0;
var i_hkNr_o = 0;
function i_fJfXvo(_0x3673ed, _0x2ac3e3) {
  if (i_xjHeZi == 1) {
    i_XaCat();
  }
  if (i_dnyXHi && !i_fdZfJi) {
    if (!(i_sCrNao.readyState != WebSocket.OPEN && i_bPrAQi == 0)) {
      i_Pmzpoo[0] = i_mDiGLi(i_Pmzpoo[0], _0x3673ed, _0x2ac3e3);
      i_wsSfso[0] = i_emcHro;
      i_wsSfso[1] = i_Pmzpoo[0];
      if (i_jwsYB != null) {
        i_jwsYB[0] = i_wsSfso[0];
        i_jwsYB[1] = i_wsSfso[1];
      } else {
        i_bYNtOo();
      }
    }
  }
}
function i_hnXPpo(_0x453313, _0x5ebce6) {
  if (_0x453313 == "message") {
    $.post("/saycheck", {
      say: _0x5ebce6,
      where: "fcin_" + gid + "_" + i_ZmCwpe
    }, function (_0x70bf9f) {
      var _0x56c636 = {
        Info: _0x453313,
        Message: _0x70bf9f.check
      };
      if (_0x70bf9f.check.indexOf("在本房间已被禁言") >= 0) {
        i_iZhRvt(_0x70bf9f.check);
      } else {
        var _0x5b1ffc = JSON.stringify(_0x56c636);
        i_sCrNao.send(_0x5b1ffc);
      }
    });
  } else {
    var _0x434fbf = {
      Info: _0x453313,
      Message: _0x5ebce6
    };
    var _0x1d10c1 = JSON.stringify(_0x434fbf);
    i_sCrNao.send(_0x1d10c1);
  }
}
function i_FXdWmo() {
  i_hnXPpo("ready", "no");
}
function i_ckezgo() {
  var _0xabda29 = i_tdBda_("sev");
  var _0x580b17 = i_tdBda_("rname");
  var _0x27be06 = i_tdBda_("rpsw");
  var _0x32225d = i_tdBda_("rj");
  var _0x479ec4 = i_tdBda_("rl");
  var _0x1a71a6 = i_tdBda_("look");
  var _0x38dcd6 = i_tdBda_("gstate");
  i_hkNr_o = _0xabda29;
  if (_0x27be06 == null) {
    _0x27be06 = "";
  }
  if (_0x32225d == null) {
    _0x32225d = true;
  }
  if (_0x479ec4 == null) {
    _0x479ec4 = true;
  }
  var _0x5500bf = "&rname=" + encodeURI(_0x580b17) + "&rpsw=" + encodeURI(_0x27be06) + "&rj=" + _0x32225d + "&rl=" + _0x479ec4 + "&state=" + _0x38dcd6;
  var _0x1cc68c = "";
  if (!i_iDQBme) {
    _0x1cc68c = "&mob=1";
  }
  if (_0x580b17 != "" && _0x580b17 != null && !i_iDQBme && i_wFwzh) {
    i_sxfci_("sharedtip").style.display = "block";
    setTimeout(function () {
      i_sxfci_("sharedtip").style.display = "none";
    }, 3000);
  }
  if (_0x1a71a6 == "1") {
    i_sCrNao = new WebSocket("wss://link00" + _0xabda29 + ".wo1wan.com:6001/fcnext/watch?lid=" + i_ZmCwpe + "&gid=" + gid + _0x5500bf + _0x1cc68c);
    i_nibwYi = true;
    i_PYYZNo();
  } else {
    i_sCrNao = new WebSocket("wss://link00" + _0xabda29 + ".wo1wan.com:6001/fcnext/link?lid=" + i_ZmCwpe + "&max=2&gid=" + gid + _0x5500bf + _0x1cc68c);
  }
  i_sCrNao.binaryType = "arraybuffer";
  i_sCrNao.onopen = function (_0xffd461) {};
  i_sCrNao.onclose = function (_0x502804) {
    if (i_iDQBme) {
      i_zkHZqn();
      i_bPrAQi = true;
    } else if (i_QYKJTo > 1) {
      i_ZQAWMu();
    }
  };
  i_sCrNao.onmessage = _0x1a71a6 == "1" ? i_ixDmzo : i_GkDzho;
}
function i_GkDzho(_0x1348a9) {
  if (typeof _0x1348a9.data != "string") {
    if (_0x1348a9.data.byteLength != 10) {
      if (_0x1348a9.data.byteLength == 16) {
        var _0x3ee772 = new Uint32Array(_0x1348a9.data);
        i_EHEBeo = _0x3ee772[0];
      }
      i_DYNBTe.postMessage(_0x1348a9.data, [_0x1348a9.data]);
    } else {
      i_WMSdCo(_0x1348a9.data);
    }
  } else {
    i_mCahDo(_0x1348a9);
  }
}
function i_DKhZbo(_0x426665, _0xa94f8) {
  i_JtyhLn(_0x426665, _0xa94f8);
}
function i_pjQNyo() {
  return i_emcHro == i_Kbzklo;
}
function i_ePsnwo() {
  i_hnXPpo("sync", "ok");
}
function i_sCnmko() {
  i_hnXPpo("sync", "fail");
}
var i_QYKJTo = 0;
var i_brpHxo = new Uint32Array(1);
var i_RBpcMo = null;
var i_jEbQPo = 0;
var i_SRzbEo = 0;
var i_JmBpAo = 0;
var i_ApFTSo = 0;
function i_WMSdCo(_0x570e3c) {
  i_sCrNao.send(_0x570e3c);
  var _0x17af3c = new Uint16Array(_0x570e3c);
  if (Math.abs(i_jEbQPo - _0x17af3c[1]) > 5) {
    i_DKhZbo(1, _0x17af3c[1]);
    i_jEbQPo = _0x17af3c[1];
  }
  if (Math.abs(i_SRzbEo - _0x17af3c[2]) > 5) {
    i_DKhZbo(2, _0x17af3c[2]);
    i_SRzbEo = _0x17af3c[2];
  }
  if (Math.abs(i_JmBpAo - _0x17af3c[3]) > 5) {
    i_DKhZbo(3, _0x17af3c[3]);
    i_JmBpAo = _0x17af3c[3];
  }
  if (Math.abs(i_ApFTSo - _0x17af3c[4]) > 5) {
    i_DKhZbo(4, _0x17af3c[4]);
    i_ApFTSo = _0x17af3c[4];
  }
}
function i_hziCKo(_0x3e6d8e) {
  if (typeof _0x3e6d8e.data != "string") {
    i_DYNBTe.postMessage(_0x3e6d8e.data, [_0x3e6d8e.data]);
  } else if (i_iDQBme) {
    PCStringProcess(_0x3e6d8e);
  } else {
    StringProcess(_0x3e6d8e);
  }
}
function i_bYNtOo() {
  if (!i_nibwYi) {
    if (i_jwsYB != null) {
      i_jwsYB[0] = i_wsSfso[0];
      i_jwsYB[1] = i_wsSfso[1];
      return;
    }
    i_DYNBTe.postMessage(i_aPjBco);
  }
}
function i_KatGXo(_0x2a276d) {
  if (i_sCrNao.readyState == WebSocket.OPEN) {
    i_sCrNao.send(_0x2a276d);
  }
}
var i_CzixRo = "";
function i_ixDmzo(_0x1516b7) {
  if (typeof _0x1516b7.data == "string") {
    var _0x33ec7d = JSON.parse(_0x1516b7.data);
    switch (_0x33ec7d.Info) {
      case "init":
        break;
      case "player":
        (i_FZEFji = _0x33ec7d).Nick1 = i_FZEFji.Nick1.replace("等待连接", "点击上位");
        i_FZEFji.Nick2 = i_FZEFji.Nick2.replace("等待连接", "点击上位");
        i_FZEFji.Nick3 = i_FZEFji.Nick3.replace("等待连接", "点击上位");
        i_FZEFji.Nick4 = i_FZEFji.Nick4.replace("等待连接", "点击上位");
        i_emcHro = 5;
        if (i_iDQBme) {
          i_QNbFjn(i_FZEFji);
        } else {
          i_nFFBer(i_FZEFji);
        }
        break;
      case "sync":
        i_nYekgu(0, _0x33ec7d.to);
        break;
      case "message":
        if (_0x33ec7d.msg == null) {
          _0x33ec7d.msg = _0x33ec7d.text;
          _0x33ec7d.from = "系统消息";
          _0x33ec7d.type = 0;
        }
        if (i_iDQBme) {
          i_fEncgt(_0x33ec7d.from, _0x33ec7d.msg, _0x33ec7d.text, _0x33ec7d.type);
        } else {
          i_fGppxr(_0x33ec7d.from, _0x33ec7d.msg, _0x33ec7d.text, _0x33ec7d.type);
        }
        break;
      case "join":
        var _0x2957ab = i_tdBda_("sev");
        window.location.replace("https://play.wo1wan.com/fcnext/play?id=" + gid + "&mode=1&rpsw=" + i_CzixRo + "&sev=" + _0x2957ab + "&linkid=" + i_ZmCwpe);
        break;
      case "checkpwd":
        i_sxfci_("popwin_password").style.display = "block";
        i_sxfci_("pswcheckval").value = "";
        i_kzkwc_("pswcheckbtn", i_pFRCIo);
        i_Hfbes_("pswcheckbtn", i_pFRCIo);
        break;
      case "pwderror":
        i_iZhRvt("密码错误");
    }
  } else {
    if (_0x1516b7.data.byteLength % 12 == 0 || _0x1516b7.data.byteLength == 8) {
      new Uint32Array(_0x1516b7.data);
    }
    i_DYNBTe.postMessage(_0x1516b7.data, [_0x1516b7.data]);
  }
}
function i_pFRCIo() {
  i_hnXPpo("checkpwd", i_CzixRo = i_sxfci_("pswcheckval").value);
  i_sxfci_("popwin_password").style.display = "none";
}
function i_PYYZNo() {
  i_njFT_l = true;
  if (!i_iDQBme) {
    if (i_yGbxPs) {
      i_kCpK_s();
      i_sFmzCs();
    }
  }
}
var i_AfQpUo = 0;
var i_emcHro = 0;
var i_FZEFji = null;
var i_xjHeZi = 0;
var i_fdZfJi = false;
var i_Kbzklo = 0;
function i_mCahDo(_0x552d6f) {
  if (typeof _0x552d6f.data == "string") {
    var _0x2daf94 = JSON.parse(_0x552d6f.data);
    switch (_0x2daf94.Info) {
      case "init":
        i_emcHro = parseInt(_0x2daf94.Num) - 1;
        i_wsSfso[0] = i_emcHro;
        i_wsSfso[1] = i_Pmzpoo[0];
        i_bYNtOo();
        i_fdZfJi = false;
        i_SxTmQe();
        break;
      case "player":
        i_FZEFji = _0x2daf94;
        if (i_iDQBme) {
          i_QNbFjn(i_FZEFji);
        } else {
          i_nFFBer(i_FZEFji);
        }
        var _0x1ec2eb = i_xjHeZi;
        i_xjHeZi = 0;
        if (_0x2daf94.Img1 != "./img/waithead.png") {
          i_xjHeZi++;
        }
        if (_0x2daf94.Img2 != "./img/waithead.png") {
          i_xjHeZi++;
        }
        if (_0x2daf94.Img3 != "./img/waithead.png") {
          i_xjHeZi++;
        }
        if (_0x2daf94.Img4 != "./img/waithead.png") {
          i_xjHeZi++;
        }
        if (i_xjHeZi >= 2 || _0x1ec2eb != i_xjHeZi) {
          i_XaCat();
        }
        i_Kbzklo = _0x2daf94.boss;
        i_FXdWmo();
        break;
      case "start":
        i_sCrNao.onmessage = i_GkDzho;
        i_dnyXHi = true;
        i_iZEzAl.l();
        break;
      case "watch":
        i_sCrNao.onmessage = i_hziCKo;
        break;
      case "sync":
        if (_0x2daf94.act == "upload") {
          if (i_dnyXHi) {
            i_nYekgu(1, _0x2daf94.to);
          }
        } else {
          i_nYekgu(0, _0x2daf94.to);
          if (!i_dnyXHi) {
            i_thhFWi = true;
            i_sCrNao.onmessage = i_GkDzho;
          }
        }
        i_CCRpou = 0;
        break;
      case "look":
        i_sCrNao.onmessage = i_hziCKo;
        break;
      case "lookupdate":
        i_eGBAYn(_0x2daf94.count);
        break;
      case "message":
        if (_0x2daf94.from == "系统消息") {
          if (_0x2daf94.msg.indexOf("加入游戏") > 0) {
            i_AfQpUo = parseInt(_0x2daf94.msg.substr(2, 1));
          }
          if (_0x2daf94.msg.indexOf("房间人数已满") >= 0) {
            _0x2daf94.msg = "房间人数已满，即将进入观战模式";
            setTimeout(function () {
              i_rrYppt("5秒后进入观战模式");
            }, 500);
            setTimeout(function () {
              window.location.replace(window.location.origin + window.location.pathname + "?&look=1&id=" + gid + "&mode=1&sev=" + i_wesTbe + "&linkid=" + i_ZmCwpe);
            }, 5500);
          }
        }
        if (i_iDQBme) {
          i_fEncgt(_0x2daf94.from, _0x2daf94.msg, _0x2daf94.text, _0x2daf94.type);
        } else {
          i_fGppxr(_0x2daf94.from, _0x2daf94.msg, _0x2daf94.text, _0x2daf94.type);
        }
        break;
      case "vote":
        i_GxbGz(_0x2daf94.message, _0x2daf94.act);
        break;
      case "act":
        if (i_iDQBme) {
          i_DDAeHn(_0x2daf94.act);
        } else {
          i_rpEWtr(_0x2daf94.act);
        }
        break;
      case "savereplay":
        if (_0x2daf94.file != null && _0x2daf94.file != "") {
          $.ajax("/replay/create", {
            type: "POST",
            async: true,
            data: {
              type: "fc",
              gid: gid,
              name: i_FZEFji["Nick" + (i_emcHro + 1)] + "创建的录像",
              rlen: _0x2daf94.len,
              rpath: _0x2daf94.file
            },
            success: function (_0x4f81d1, _0x475bdc, _0xf585df) {
              if (_0x4f81d1.status == "success") {
                var _0x175411 = Math.floor(_0x2daf94.len * 16.66666 / 1000);
                i_hnXPpo("message", "录像已保存到服务器 时长:" + (Math.floor(_0x175411 / 60) + "分" + (_0x175411 %= 60) + "秒") + (" <text style='color: rgb(255,121,0)'>录像ID:" + _0x4f81d1.rid + " </text>") + " <a target='_blank' href='https://play.wo1wan.com/jj/replay?rid=" + _0x4f81d1.rid + "'>点击观看</a>");
              } else {
                i_iZhRvt("录像保存失败");
              }
            }
          });
        }
    }
  }
}
var i_eTaz$o = null;
var i_eJJiBo = null;
var i_RtFbGo = null;
var i_NQhmFo = null;
var i_NWETLo = null;
var i_ChZTqo = null;
var i_jWfRVo = null;
var i_iwDejo = null;
var i_cKFiYo = null;
var i_CwRAHo = null;
var i_TDCkWo = false;
var i_aJaaJo = false;
var i_zneYQo = false;
var i_iFrkZo = false;
var i_aZfEec = false;
function i_GCDjnc() {
  (i_eTaz$o = document.createElement("canvas")).width = i_cffPrs.A.Size * 80;
  i_eTaz$o.height = i_cffPrs.A.Size * 80;
  i_ChZTqo = i_eTaz$o.cloneNode(true);
  var _0x3032f8 = i_eTaz$o.getContext("2d");
  _0x3032f8.scale(i_cffPrs.A.Size, i_cffPrs.A.Size);
  _0x3032f8.globalAlpha = i_cffPrs.A.Alpha;
  i_wwBtyc(_0x3032f8, 0, 0, 80, "A");
  (_0x3032f8 = i_ChZTqo.getContext("2d")).scale(i_cffPrs.A.Size, i_cffPrs.A.Size);
  _0x3032f8.globalAlpha = i_cffPrs.A.Alpha;
  i_mfytwc(_0x3032f8, 0, 0, 80, "A");
  i_cffPrs.A.Obj = i_ChZTqo;
  i_cffPrs.A.Reinit = i_GCDjnc;
}
function i_YaPptc() {
  (i_eJJiBo = document.createElement("canvas")).width = i_cffPrs.B.Size * 80;
  i_eJJiBo.height = i_cffPrs.B.Size * 80;
  i_jWfRVo = i_eJJiBo.cloneNode(true);
  var _0x29698f = i_eJJiBo.getContext("2d");
  _0x29698f.scale(i_cffPrs.B.Size, i_cffPrs.B.Size);
  _0x29698f.globalAlpha = i_cffPrs.B.Alpha;
  i_wwBtyc(_0x29698f, 0, 0, 80, "B");
  (_0x29698f = i_jWfRVo.getContext("2d")).scale(i_cffPrs.B.Size, i_cffPrs.B.Size);
  _0x29698f.globalAlpha = i_cffPrs.B.Alpha;
  i_mfytwc(_0x29698f, 0, 0, 80, "B");
  i_cffPrs.B.Obj = i_jWfRVo;
  i_cffPrs.B.Reinit = i_YaPptc;
}
function i_nApzac() {
  (i_RtFbGo = document.createElement("canvas")).width = i_cffPrs.AA.Size * 68;
  i_RtFbGo.height = i_cffPrs.AA.Size * 68;
  i_iwDejo = i_RtFbGo.cloneNode(true);
  var _0x249658 = i_RtFbGo.getContext("2d");
  _0x249658.scale(i_cffPrs.AA.Size, i_cffPrs.AA.Size);
  _0x249658.globalAlpha = i_cffPrs.AA.Alpha;
  i_HnBSkc(_0x249658, 0, 0, 68, "AA", "rgba(57, 55, 50,1.0", "#ffffff");
  (_0x249658 = i_iwDejo.getContext("2d")).scale(i_cffPrs.AA.Size, i_cffPrs.AA.Size);
  _0x249658.globalAlpha = i_cffPrs.AA.Alpha;
  i_RdFdTc(_0x249658, 0, 0, 68, "AA");
  i_cffPrs.AA.Obj = i_RtFbGo;
  i_cffPrs.AA.Reinit = i_nApzac;
}
function i_CMfwic() {
  (i_NQhmFo = document.createElement("canvas")).width = i_cffPrs.BB.Size * 68;
  i_NQhmFo.height = i_cffPrs.BB.Size * 68;
  i_cKFiYo = i_NQhmFo.cloneNode(true);
  var _0x11acde = i_NQhmFo.getContext("2d");
  _0x11acde.scale(i_cffPrs.BB.Size, i_cffPrs.BB.Size);
  _0x11acde.globalAlpha = i_cffPrs.BB.Alpha;
  i_HnBSkc(_0x11acde, 0, 0, 68, "BB", "rgba(57, 55, 50,1.0", "#ffffff");
  (_0x11acde = i_cKFiYo.getContext("2d")).scale(i_cffPrs.BB.Size, i_cffPrs.BB.Size);
  _0x11acde.globalAlpha = i_cffPrs.BB.Alpha;
  i_RdFdTc(_0x11acde, 0, 0, 68, "BB");
  i_cffPrs.BB.Obj = i_NQhmFo;
  i_cffPrs.BB.Reinit = i_CMfwic;
}
function i_WSaRoc() {
  (i_NWETLo = document.createElement("canvas")).width = i_cffPrs.AB.Size * 58;
  i_NWETLo.height = i_cffPrs.AB.Size * 58;
  i_CwRAHo = i_NWETLo.cloneNode(true);
  var _0x1ada67 = i_NWETLo.getContext("2d");
  _0x1ada67.scale(i_cffPrs.AB.Size, i_cffPrs.AB.Size);
  _0x1ada67.globalAlpha = i_cffPrs.AB.Alpha;
  i_HnBSkc(_0x1ada67, 0, 0, 58, "AB", "rgba(57, 55, 50,1.0", "#ffffff");
  (_0x1ada67 = i_CwRAHo.getContext("2d")).scale(i_cffPrs.AB.Size, i_cffPrs.AB.Size);
  _0x1ada67.globalAlpha = i_cffPrs.AB.Alpha;
  i_RdFdTc(_0x1ada67, 0, 0, 58, "AB");
  i_cffPrs.AB.Obj = i_NWETLo;
  i_cffPrs.AB.Reinit = i_WSaRoc;
}
function i_sfNrcc() {
  i_GCDjnc();
  i_YaPptc();
  i_nApzac();
  i_CMfwic();
  i_WSaRoc();
}
function i_tTcysc() {
  i_Qyfwws.clearRect(i_cffPrs.A.X, i_cffPrs.A.Y, i_ChZTqo.width, i_ChZTqo.height);
  i_Qyfwws.clearRect(i_cffPrs.B.X, i_cffPrs.B.Y, i_jWfRVo.width, i_jWfRVo.height);
  i_Qyfwws.clearRect(i_cffPrs.AA.X, i_cffPrs.AA.Y, i_iwDejo.width, i_iwDejo.height);
  i_Qyfwws.clearRect(i_cffPrs.BB.X, i_cffPrs.BB.Y, i_cKFiYo.width, i_cKFiYo.height);
  i_Qyfwws.clearRect(i_cffPrs.AB.X, i_cffPrs.AB.Y, i_CwRAHo.width, i_CwRAHo.height);
}
function i_ksaPrc() {
  i_bpztuc();
  i_JFkE_c();
  i_WncXdc();
  i_SkYMmc();
  i_ZHQnhc();
  if (i_sJjkcs) {
    i_Qyfwws.strokeStyle = "rgba(255, 255, 255,1.0)";
    i_Qyfwws.lineWidth = 2;
    i_Qyfwws.shadowOffsetX = 0;
    i_Qyfwws.shadowOffsetY = 0;
    i_Qyfwws.shadowBlur = 2;
    i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
    i_Qyfwws.beginPath();
    i_Qyfwws.rect(i_cffPrs.A.X, i_cffPrs.A.Y, i_ChZTqo.width, i_ChZTqo.height);
    i_Qyfwws.stroke();
    i_Qyfwws.rect(i_cffPrs.B.X, i_cffPrs.B.Y, i_jWfRVo.width, i_jWfRVo.height);
    i_Qyfwws.stroke();
    i_Qyfwws.rect(i_cffPrs.AA.X, i_cffPrs.AA.Y, i_iwDejo.width, i_iwDejo.height);
    i_Qyfwws.stroke();
    i_Qyfwws.rect(i_cffPrs.BB.X, i_cffPrs.BB.Y, i_cKFiYo.width, i_cKFiYo.height);
    i_Qyfwws.stroke();
    i_Qyfwws.rect(i_cffPrs.AB.X, i_cffPrs.AB.Y, i_CwRAHo.width, i_CwRAHo.height);
    i_Qyfwws.stroke();
  }
}
function i_DCpHlc(_0x3d070d, _0x14ab3b, _0x5da8e8) {
  if (i_pwBFUs(_0x3d070d, _0x14ab3b, i_cffPrs.A.X, i_cffPrs.A.Y, i_ChZTqo.width, i_ChZTqo.height)) {
    if (_0x5da8e8 != null && _0x5da8e8 != i_jhfWfc) {
      _0x5da8e8();
    }
    i_TDCkWo = true;
    i_bpztuc();
    return i_jhfWfc;
  } else if (i_pwBFUs(_0x3d070d, _0x14ab3b, i_cffPrs.B.X, i_cffPrs.B.Y, i_jWfRVo.width, i_jWfRVo.height)) {
    if (_0x5da8e8 != null && _0x5da8e8 != i_fZAEvc) {
      _0x5da8e8();
    }
    i_aJaaJo = true;
    i_JFkE_c();
    return i_fZAEvc;
  } else if (i_pwBFUs(_0x3d070d, _0x14ab3b, i_cffPrs.AA.X, i_cffPrs.AA.Y, i_iwDejo.width, i_iwDejo.height)) {
    if (_0x5da8e8 != null && _0x5da8e8 != i_JhCYpc) {
      _0x5da8e8();
    }
    i_zneYQo = true;
    i_WncXdc();
    return i_JhCYpc;
  } else if (i_pwBFUs(_0x3d070d, _0x14ab3b, i_cffPrs.BB.X, i_cffPrs.BB.Y, i_cKFiYo.width, i_cKFiYo.height)) {
    if (_0x5da8e8 != null && _0x5da8e8 != i_TKwQgc) {
      _0x5da8e8();
    }
    i_iFrkZo = true;
    i_SkYMmc();
    return i_TKwQgc;
  } else if (i_pwBFUs(_0x3d070d, _0x14ab3b, i_cffPrs.AB.X, i_cffPrs.AB.Y, i_CwRAHo.width, i_CwRAHo.height)) {
    if (_0x5da8e8 != null && _0x5da8e8 != i_MjRsbc) {
      _0x5da8e8();
    }
    i_aZfEec = true;
    i_ZHQnhc();
    return i_MjRsbc;
  } else {
    return _0x5da8e8;
  }
}
function i_bpztuc() {
  i_Qyfwws.clearRect(i_cffPrs.A.X, i_cffPrs.A.Y, i_ChZTqo.width, i_ChZTqo.height);
  if (i_TDCkWo) {
    i_GHKWya.en();
    i_Qyfwws.drawImage(i_ChZTqo, i_cffPrs.A.X, i_cffPrs.A.Y);
  } else {
    i_GHKWya.nn();
    i_Qyfwws.drawImage(i_eTaz$o, i_cffPrs.A.X, i_cffPrs.A.Y);
  }
}
function i_jhfWfc() {
  i_TDCkWo = false;
  i_bpztuc();
}
function i_JFkE_c() {
  i_Qyfwws.clearRect(i_cffPrs.B.X, i_cffPrs.B.Y, i_jWfRVo.width, i_jWfRVo.height);
  if (i_aJaaJo) {
    i_GHKWya.tn();
    i_Qyfwws.drawImage(i_jWfRVo, i_cffPrs.B.X, i_cffPrs.B.Y);
  } else {
    i_GHKWya.an();
    i_Qyfwws.drawImage(i_eJJiBo, i_cffPrs.B.X, i_cffPrs.B.Y);
  }
}
function i_fZAEvc() {
  i_aJaaJo = false;
  i_JFkE_c();
}
function i_WncXdc() {
  i_Qyfwws.clearRect(i_cffPrs.AA.X, i_cffPrs.AA.Y, i_iwDejo.width, i_iwDejo.height);
  if (i_zneYQo) {
    i_GHKWya.in();
    i_Qyfwws.drawImage(i_iwDejo, i_cffPrs.AA.X, i_cffPrs.AA.Y);
  } else {
    i_GHKWya.cn();
    i_Qyfwws.drawImage(i_RtFbGo, i_cffPrs.AA.X, i_cffPrs.AA.Y);
  }
}
function i_JhCYpc() {
  i_zneYQo = false;
  i_WncXdc();
}
function i_SkYMmc() {
  i_Qyfwws.clearRect(i_cffPrs.BB.X, i_cffPrs.BB.Y, i_cKFiYo.width, i_cKFiYo.height);
  if (i_iFrkZo) {
    i_GHKWya.sn();
    i_Qyfwws.drawImage(i_cKFiYo, i_cffPrs.BB.X, i_cffPrs.BB.Y);
  } else {
    i_GHKWya.rn();
    i_Qyfwws.drawImage(i_NQhmFo, i_cffPrs.BB.X, i_cffPrs.BB.Y);
  }
}
function i_TKwQgc() {
  i_iFrkZo = false;
  i_SkYMmc();
}
function i_ZHQnhc() {
  i_Qyfwws.clearRect(i_cffPrs.AB.X, i_cffPrs.AB.Y, i_CwRAHo.width, i_CwRAHo.height);
  if (i_aZfEec) {
    i_GHKWya.ln();
    i_Qyfwws.drawImage(i_CwRAHo, i_cffPrs.AB.X, i_cffPrs.AB.Y);
  } else {
    i_GHKWya.un();
    i_Qyfwws.drawImage(i_NWETLo, i_cffPrs.AB.X, i_cffPrs.AB.Y);
  }
}
function i_MjRsbc() {
  i_aZfEec = false;
  i_ZHQnhc();
}
function i_wwBtyc(_0x35d98a, _0x291117, _0x414c7d, _0x527cbc, _0x19acf2) {
  _0x35d98a.beginPath();
  _0x35d98a.arc(_0x527cbc / 2, _0x527cbc / 2, _0x527cbc / 2 - 2, 0, Math.PI * 2, false);
  _0x35d98a.strokeStyle = "rgba(0, 0, 0, 0)";
  _0x35d98a.shadowOffsetX = 0;
  _0x35d98a.shadowOffsetY = 1;
  _0x35d98a.shadowBlur = 2;
  _0x35d98a.shadowColor = "rgba(0, 0, 0,0.8)";
  _0x35d98a.fillStyle = "rgba(255, 255, 255,0.16)";
  _0x35d98a.fill();
  _0x35d98a.closePath();
  _0x35d98a.beginPath();
  _0x35d98a.arc(_0x527cbc / 2, _0x527cbc / 2, _0x527cbc / 2 - 8, 0, Math.PI * 2, false);
  _0x35d98a.closePath();
  _0x35d98a.shadowColor = "rgba(0,0, 0, 0.8)";
  _0x35d98a.shadowOffsetX = 0;
  _0x35d98a.shadowOffsetY = 1;
  _0x35d98a.shadowBlur = 4;
  _0x35d98a.fillStyle = "rgba(249, 211, 66,1.0)";
  _0x35d98a.fill();
  _0x35d98a.shadowOffsetX = 0;
  _0x35d98a.shadowOffsetY = 0;
  _0x35d98a.shadowBlur = 0;
  _0x35d98a.font = "11px zcool-gdh";
  _0x35d98a.textAlign = "center";
  _0x35d98a.textBaseline = "middle";
  _0x35d98a.fillStyle = "#2d2d2d";
  _0x35d98a.fillText(_0x19acf2, _0x527cbc / 2, _0x527cbc / 2);
  _0x35d98a.fillText(_0x19acf2, _0x527cbc / 2, _0x527cbc / 2);
}
function i_mfytwc(_0x3ab3c9, _0x4d6bdc, _0x483f69, _0x27716e, _0x3a8777) {
  _0x3ab3c9.beginPath();
  _0x3ab3c9.arc(_0x27716e / 2, _0x27716e / 2, _0x27716e / 2 - 2, 0, Math.PI * 2, false);
  _0x3ab3c9.strokeStyle = "rgba(0, 0, 0, 0)";
  _0x3ab3c9.shadowOffsetX = 0;
  _0x3ab3c9.shadowOffsetY = 0;
  _0x3ab3c9.shadowBlur = 5;
  _0x3ab3c9.shadowColor = "#F9D342";
  _0x3ab3c9.fillStyle = "#FFFFFF";
  _0x3ab3c9.fill();
  _0x3ab3c9.closePath();
  _0x3ab3c9.beginPath();
  _0x3ab3c9.arc(_0x27716e / 2, _0x27716e / 2, _0x27716e / 2 - 8, 0, Math.PI * 2, false);
  _0x3ab3c9.closePath();
  _0x3ab3c9.shadowColor = "rgba(0,0, 0, 0.8)";
  _0x3ab3c9.shadowOffsetX = 0;
  _0x3ab3c9.shadowOffsetY = 1;
  _0x3ab3c9.shadowBlur = 4;
  var _0x112e0d = _0x3ab3c9.createRadialGradient(_0x27716e / 2, _0x27716e / 2, _0x27716e / 2 / 2 - 4, _0x27716e / 2, _0x27716e / 2, _0x27716e / 2 - 8);
  _0x112e0d.addColorStop(0, "#F9D342");
  _0x112e0d.addColorStop(1, "#F9A942");
  _0x3ab3c9.fillStyle = _0x112e0d;
  _0x3ab3c9.fill();
  _0x3ab3c9.shadowOffsetX = 0;
  _0x3ab3c9.shadowOffsetY = 0;
  _0x3ab3c9.shadowBlur = 0;
  _0x3ab3c9.font = "11px zcool-gdh";
  _0x3ab3c9.textAlign = "center";
  _0x3ab3c9.textBaseline = "middle";
  _0x3ab3c9.fillStyle = "#2d2d2d";
  _0x3ab3c9.fillText(_0x3a8777, _0x27716e / 2, _0x27716e / 2);
  _0x3ab3c9.fillText(_0x3a8777, _0x27716e / 2, _0x27716e / 2);
}
function i_HnBSkc(_0x4188e6, _0x39934b, _0x54550f, _0x1f9e70, _0x1e2319, _0x120265, _0x59f0cb) {
  _0x4188e6.beginPath();
  _0x4188e6.arc(_0x1f9e70 / 2, _0x1f9e70 / 2, _0x1f9e70 / 2 - 2, 0, Math.PI * 2, false);
  _0x4188e6.strokeStyle = "rgba(0, 0, 0, 0)";
  _0x4188e6.shadowOffsetX = 0;
  _0x4188e6.shadowOffsetY = 1;
  _0x4188e6.shadowBlur = 2;
  _0x4188e6.shadowColor = "rgba(0, 0, 0,0.8)";
  _0x4188e6.fillStyle = "rgba(255, 255, 255,0.16)";
  _0x4188e6.fill();
  _0x4188e6.closePath();
  _0x4188e6.beginPath();
  _0x4188e6.arc(_0x1f9e70 / 2, _0x1f9e70 / 2, _0x1f9e70 / 2 - 8, 0, Math.PI * 2, false);
  _0x4188e6.closePath();
  _0x4188e6.shadowColor = "rgba(0,0, 0, 0.8)";
  _0x4188e6.shadowOffsetX = 0;
  _0x4188e6.shadowOffsetY = 1;
  _0x4188e6.shadowBlur = 4;
  _0x4188e6.fillStyle = _0x120265;
  _0x4188e6.fill();
  _0x4188e6.shadowOffsetX = 0;
  _0x4188e6.shadowOffsetY = 0;
  _0x4188e6.shadowBlur = 0;
  _0x4188e6.font = "11px zcool-gdh";
  _0x4188e6.textAlign = "center";
  _0x4188e6.textBaseline = "middle";
  _0x4188e6.fillStyle = _0x59f0cb;
  _0x4188e6.fillText(_0x1e2319, _0x1f9e70 / 2, _0x1f9e70 / 2);
  _0x4188e6.fillText(_0x1e2319, _0x1f9e70 / 2, _0x1f9e70 / 2);
}
function i_RdFdTc(_0x1d1b9b, _0x43fdad, _0x263aec, _0xabf90c, _0x4bb337, _0x4b321e) {
  _0x1d1b9b.beginPath();
  _0x1d1b9b.arc(_0xabf90c / 2, _0xabf90c / 2, _0xabf90c / 2 - 2, 0, Math.PI * 2, false);
  _0x1d1b9b.strokeStyle = "rgba(0, 0, 0, 0)";
  _0x1d1b9b.shadowOffsetX = 0;
  _0x1d1b9b.shadowOffsetY = 0;
  _0x1d1b9b.shadowBlur = 5;
  _0x1d1b9b.shadowColor = "#F9D342";
  _0x1d1b9b.fillStyle = "#FFFFFF";
  _0x1d1b9b.fill();
  _0x1d1b9b.closePath();
  _0x1d1b9b.beginPath();
  _0x1d1b9b.arc(_0xabf90c / 2, _0xabf90c / 2, _0xabf90c / 2 - 8, 0, Math.PI * 2, false);
  _0x1d1b9b.closePath();
  _0x1d1b9b.shadowColor = "rgba(0,0, 0, 0.8)";
  _0x1d1b9b.shadowOffsetX = 0;
  _0x1d1b9b.shadowOffsetY = 1;
  _0x1d1b9b.shadowBlur = 4;
  var _0x19c8ce = _0x1d1b9b.createRadialGradient(_0xabf90c / 2, _0xabf90c / 2, _0xabf90c / 2 / 2 - 4, _0xabf90c / 2, _0xabf90c / 2, _0xabf90c / 2 - 8);
  _0x19c8ce.addColorStop(0, "#F9D342");
  _0x19c8ce.addColorStop(1, "#F9A942");
  _0x1d1b9b.fillStyle = _0x19c8ce;
  _0x1d1b9b.fill();
  _0x1d1b9b.shadowOffsetX = 0;
  _0x1d1b9b.shadowOffsetY = 0;
  _0x1d1b9b.shadowBlur = 0;
  _0x1d1b9b.font = "11px zcool-gdh";
  _0x1d1b9b.textAlign = "center";
  _0x1d1b9b.textBaseline = "middle";
  _0x1d1b9b.fillStyle = "#2d2d2d";
  _0x1d1b9b.fillText(_0x4bb337, _0xabf90c / 2, _0xabf90c / 2);
  _0x1d1b9b.fillText(_0x4bb337, _0xabf90c / 2, _0xabf90c / 2);
}
var i_THGAxc = null;
var i_fWFkMc = null;
var i_YWwjPc = null;
var i_xrnsEc = null;
var i_fjHDAc = null;
var i_wZSQSc = null;
var i_BkJeCc = null;
var i_RpTkKc = null;
var i_xrSbOc = null;
var i_sHnMXc = 0;
var i_yPiERc = 160;
function i_YDWfzc(_0xb20023, _0x41a933, _0x400fe4, _0x5653e5) {
  var _0x5c5894 = {
    x: _0x41a933 / 2,
    y: _0x41a933 / 2,
    r: _0x41a933 / 2 - 15
  };
  _0xb20023.beginPath();
  _0xb20023.lineWidth = 0.5;
  var _0x359e89 = 0.29;
  var _0x43b285 = 0.82;
  var _0x2b98b4 = 0.88;
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * -_0x359e89, _0x5c5894.y - _0x5c5894.r * _0x43b285);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -0.1, _0x5c5894.y - _0x5c5894.r * _0x2b98b4);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * 0.1, _0x5c5894.y - _0x5c5894.r * _0x2b98b4);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x359e89, _0x5c5894.y - _0x5c5894.r * _0x43b285);
  _0xb20023.arc(_0x5c5894.x, _0x5c5894.y, _0x5c5894.r * 0.4, Math.PI * 1.7, Math.PI * 1.8);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x43b285, _0x5c5894.y + _0x5c5894.r * -_0x359e89);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x2b98b4, _0x5c5894.y - _0x5c5894.r * 0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x2b98b4, _0x5c5894.y - _0x5c5894.r * -0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x43b285, _0x5c5894.y - _0x5c5894.r * -_0x359e89);
  _0xb20023.arc(_0x5c5894.x, _0x5c5894.y, _0x5c5894.r * 0.4, Math.PI * 0.2, Math.PI * 0.3);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x359e89, _0x5c5894.y - _0x5c5894.r * -_0x43b285);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * 0.1, _0x5c5894.y - _0x5c5894.r * -_0x2b98b4);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -0.1, _0x5c5894.y - _0x5c5894.r * -_0x2b98b4);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x359e89, _0x5c5894.y - _0x5c5894.r * -_0x43b285);
  _0xb20023.arc(_0x5c5894.x, _0x5c5894.y, _0x5c5894.r * 0.4, Math.PI * 0.7, Math.PI * 0.8);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x43b285, _0x5c5894.y - _0x5c5894.r * -_0x359e89);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x2b98b4, _0x5c5894.y - _0x5c5894.r * -0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x2b98b4, _0x5c5894.y - _0x5c5894.r * 0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x43b285, _0x5c5894.y + _0x5c5894.r * -_0x359e89);
  _0xb20023.arc(_0x5c5894.x, _0x5c5894.y, _0x5c5894.r * 0.4, Math.PI * 1.2, Math.PI * 1.3);
  _0xb20023.closePath();
  var _0x12aeeb = _0xb20023.createLinearGradient(0, _0x5c5894.r * 2, 0, 0);
  _0x12aeeb.addColorStop(0, "rgba(102, 101, 99, 1.0)");
  _0x12aeeb.addColorStop(1, "rgba(41, 40, 38, 1.0)");
  _0xb20023.fillStyle = _0x12aeeb;
  _0xb20023.shadowColor = "rgba(0, 0, 0, 0.4)";
  _0xb20023.shadowBlur = 2;
  _0xb20023.shadowOffsetY = 5;
  _0xb20023.fill();
  _0xb20023.beginPath();
  _0xb20023.strokeStyle = "rgba(10, 5, 5, 0.7)";
  _0xb20023.lineWidth = 4;
  var _0x25db82 = 0.27;
  var _0x1b4540 = 0.85;
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * -_0x25db82, _0x5c5894.y - _0x5c5894.r * _0x1b4540);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -0.1, _0x5c5894.y - _0x5c5894.r * 0.9);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * 0.1, _0x5c5894.y - _0x5c5894.r * 0.9);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x25db82, _0x5c5894.y - _0x5c5894.r * _0x1b4540);
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * _0x1b4540, _0x5c5894.y + _0x5c5894.r * -_0x25db82);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * 0.9, _0x5c5894.y - _0x5c5894.r * 0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * 0.9, _0x5c5894.y - _0x5c5894.r * -0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x1b4540, _0x5c5894.y - _0x5c5894.r * -_0x25db82);
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * _0x25db82, _0x5c5894.y - _0x5c5894.r * -_0x1b4540);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * 0.1, _0x5c5894.y - _0x5c5894.r * -0.9);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -0.1, _0x5c5894.y - _0x5c5894.r * -0.9);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x25db82, _0x5c5894.y - _0x5c5894.r * -_0x1b4540);
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * -_0x1b4540, _0x5c5894.y - _0x5c5894.r * -_0x25db82);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -0.9, _0x5c5894.y - _0x5c5894.r * -0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -0.9, _0x5c5894.y - _0x5c5894.r * 0.1);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x1b4540, _0x5c5894.y + _0x5c5894.r * -_0x25db82);
  _0xb20023.shadowOffsetY = 0;
  _0xb20023.shadowBlur = 0;
  _0xb20023.stroke();
  _0xb20023.beginPath();
  var _0x30931b = _0xb20023.createLinearGradient(0, _0x5c5894.r * 2, 0, 0);
  _0x30931b.addColorStop(0, "rgba(249, 161, 66,0.8)");
  _0x30931b.addColorStop(1, "rgba(249, 211, 66, 0.9)");
  _0xb20023.strokeStyle = _0x30931b;
  _0xb20023.lineWidth = 1;
  var _0x5c232b = 0.55;
  var _0x211d45 = 0.67;
  var _0x5950e8 = 0.66;
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * -_0x5c232b, _0x5c5894.y - _0x5c5894.r * _0x211d45);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x5950e8, _0x5c5894.y - _0x5c5894.r * _0x5950e8);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x5950e8 + (_0x211d45 - _0x5950e8), _0x5c5894.y - _0x5c5894.r * _0x5c232b);
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * -_0x5c232b, _0x5c5894.y - _0x5c5894.r * -_0x211d45);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x5950e8, _0x5c5894.y - _0x5c5894.r * -_0x5950e8);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * -_0x5950e8 + (_0x211d45 - _0x5950e8), _0x5c5894.y - _0x5c5894.r * -_0x5c232b);
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * _0x5c232b, _0x5c5894.y - _0x5c5894.r * -_0x211d45);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x5950e8, _0x5c5894.y - _0x5c5894.r * -_0x5950e8);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x5950e8 + (_0x211d45 - _0x5950e8), _0x5c5894.y - _0x5c5894.r * -_0x5c232b);
  _0xb20023.moveTo(_0x5c5894.x + _0x5c5894.r * _0x5c232b, _0x5c5894.y - _0x5c5894.r * _0x211d45);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x5950e8, _0x5c5894.y - _0x5c5894.r * _0x5950e8);
  _0xb20023.lineTo(_0x5c5894.x + _0x5c5894.r * _0x5950e8 + (_0x211d45 - _0x5950e8), _0x5c5894.y - _0x5c5894.r * _0x5c232b);
  _0xb20023.stroke();
  _0xb20023.beginPath();
  _0xb20023.arc(_0x5c5894.x, _0x5c5894.y, _0x5c5894.r + 10, 0, Math.PI * 2);
  var _0x226a22 = _0xb20023.createLinearGradient(0, _0x5c5894.r * 2 + 20, 0, -10);
  _0x226a22.addColorStop(1, "rgba(102, 101, 99, 0.6)");
  _0x226a22.addColorStop(0, "rgba(41, 40, 38, 0.6)");
  _0xb20023.fillStyle = _0x226a22;
  _0xb20023.fill();
  _0xb20023.beginPath();
  _0xb20023.lineWidth = 1.5;
  _0xb20023.lineCap = "round";
  _0xb20023.arc(_0x5c5894.x, _0x5c5894.y, _0x5c5894.r + 10 + 0.1, Math.PI, 0);
  var _0x502fe3 = _0xb20023.createLinearGradient(0, _0x5c5894.r * 2 + 20, 0, -10);
  _0x502fe3.addColorStop(0, "rgba(102, 101, 99, 0.5)");
  _0x502fe3.addColorStop(0.5, "rgba(102, 101, 99,  0.5)");
  _0x502fe3.addColorStop(1, "rgba(255, 255, 255,  0.6)");
  _0xb20023.strokeStyle = _0x502fe3;
  _0xb20023.stroke();
}
function i_mCpnIc(_0x3ae97c, _0x5a84fa, _0x11abf0, _0x11d383, _0x2ae438) {
  var _0x94e679 = {
    x: _0x5a84fa / 2,
    y: _0x5a84fa / 2,
    r: _0x5a84fa / 2 - 15
  };
  var _0x8949a1 = 0;
  var _0x420f5d = 0;
  var _0x3a19c3 = 0;
  var _0x4f23c0 = 0;
  switch (_0x2ae438) {
    case 1:
      _0x420f5d = -0.05;
      _0x4f23c0 = -3.5;
      break;
    case 1.5:
      _0x420f5d = _0x8949a1 = -0.05;
      _0x4f23c0 = -(_0x3a19c3 = 3.5);
      break;
    case 2:
      _0x8949a1 = -0.05;
      _0x3a19c3 = 3.5;
      break;
    case 2.5:
      _0x8949a1 = -0.05;
      _0x420f5d = 0.05;
      _0x4f23c0 = _0x3a19c3 = 3.5;
      break;
    case 3:
      _0x420f5d = 0.05;
      _0x4f23c0 = 3.5;
      break;
    case 3.5:
      _0x3a19c3 = -3.5;
      _0x420f5d = _0x8949a1 = 0.05;
      _0x4f23c0 = 3.5;
      break;
    case 4:
      _0x8949a1 = 0.05;
      _0x3a19c3 = -3.5;
      break;
    case 4.5:
      _0x420f5d = -(_0x8949a1 = 0.05);
      _0x4f23c0 = _0x3a19c3 = -3.5;
  }
  _0x3ae97c.beginPath();
  var _0x398155 = 0.29;
  var _0x5dce1e = 0.82;
  var _0x437ead = 0.88;
  _0x3ae97c.moveTo(_0x94e679.x + _0x94e679.r * -(_0x398155 + _0x8949a1), _0x94e679.y - _0x94e679.r * (_0x5dce1e - _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(0.1 + _0x8949a1), _0x94e679.y - _0x94e679.r * (_0x437ead - _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (0.1 - _0x8949a1), _0x94e679.y - _0x94e679.r * (_0x437ead - _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (_0x398155 - _0x8949a1), _0x94e679.y - _0x94e679.r * (_0x5dce1e - _0x420f5d));
  _0x3ae97c.arc(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0, _0x94e679.r * 0.4, Math.PI * 1.7, Math.PI * 1.8);
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (_0x5dce1e - _0x8949a1), _0x94e679.y + _0x94e679.r * -(_0x398155 - _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (_0x437ead - _0x8949a1), _0x94e679.y - _0x94e679.r * (0.1 - _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (_0x437ead - _0x8949a1), _0x94e679.y - _0x94e679.r * -(0.1 + _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (_0x5dce1e - _0x8949a1), _0x94e679.y - _0x94e679.r * -(_0x398155 + _0x420f5d));
  _0x3ae97c.arc(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0, _0x94e679.r * 0.4, Math.PI * 0.2, Math.PI * 0.3);
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (_0x398155 - _0x8949a1), _0x94e679.y - _0x94e679.r * -(_0x5dce1e + _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * (0.1 - _0x8949a1), _0x94e679.y - _0x94e679.r * -(_0x437ead + _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(0.1 + _0x8949a1), _0x94e679.y - _0x94e679.r * -(_0x437ead + _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(_0x398155 + _0x8949a1), _0x94e679.y - _0x94e679.r * -(_0x5dce1e + _0x420f5d));
  _0x3ae97c.arc(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0, _0x94e679.r * 0.4, Math.PI * 0.7, Math.PI * 0.8);
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(_0x5dce1e + _0x8949a1), _0x94e679.y - _0x94e679.r * -(_0x398155 + _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(_0x437ead + _0x8949a1), _0x94e679.y - _0x94e679.r * -(0.1 + _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(_0x437ead + _0x8949a1), _0x94e679.y - _0x94e679.r * (0.1 - _0x420f5d));
  _0x3ae97c.lineTo(_0x94e679.x + _0x94e679.r * -(_0x5dce1e + _0x8949a1), _0x94e679.y + _0x94e679.r * -(_0x398155 - _0x420f5d));
  _0x3ae97c.arc(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0, _0x94e679.r * 0.4, Math.PI * 1.2, Math.PI * 1.3);
  _0x3ae97c.closePath();
  var _0x3a7558 = _0x3ae97c.createLinearGradient(0, 0, 0, _0x94e679.r * 2);
  _0x3a7558.addColorStop(0, "rgba(70, 70, 70, 1.0)");
  _0x3a7558.addColorStop(1, "rgba(41, 40, 38, 1.0)");
  _0x3ae97c.fillStyle = _0x3a7558;
  _0x3ae97c.shadowColor = "rgba(0, 0, 0, 1.0)";
  _0x3ae97c.shadowBlur = 2;
  _0x3ae97c.shadowOffsetY = 2;
  var _0x160a86 = _0x3ae97c.createLinearGradient(0, _0x94e679.r * 2, 0, 0);
  _0x160a86.addColorStop(0, "rgba(90,90,90, 1.0)");
  _0x160a86.addColorStop(1, "rgba(255,255,255,1.0)");
  _0x3ae97c.strokeStyle = _0x160a86;
  _0x3ae97c.lineJoin = "round";
  _0x3ae97c.lineWidth = 3;
  _0x3ae97c.shadowBlur = 0;
  _0x3ae97c.shadowOffsetY = 0;
  _0x3ae97c.stroke();
  _0x3ae97c.fill();
  _0x3ae97c.beginPath();
  _0x3ae97c.arc(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0, _0x94e679.r * 0.25, 0, Math.PI * 2);
  var _0x1f3806 = _0x3ae97c.createLinearGradient(10, _0x5a84fa / 2 * 1.25, 10, _0x5a84fa / 2 / 1.25);
  _0x1f3806.addColorStop(0, "rgba(84, 83, 81, 1.0)");
  _0x1f3806.addColorStop(1, "rgba(23,21,21,1.0)");
  _0x3ae97c.fillStyle = _0x1f3806;
  _0x3ae97c.shadowBlur = 0;
  _0x3ae97c.shadowOffsetY = 0;
  _0x3ae97c.fill();
  _0x3ae97c.beginPath();
  var _0x1b0a49 = 0.13;
  var _0x2f9a36 = 0.65;
  _0x3ae97c.moveTo(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0 - _0x94e679.r * 0.8);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * _0x1b0a49, _0x94e679.y + _0x4f23c0 - _0x94e679.r * _0x2f9a36);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 - _0x94e679.r * _0x1b0a49, _0x94e679.y + _0x4f23c0 - _0x94e679.r * _0x2f9a36);
  _0x3ae97c.moveTo(_0x94e679.x + _0x3a19c3, _0x94e679.y + _0x4f23c0 - _0x94e679.r * -0.8);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * -_0x1b0a49, _0x94e679.y + _0x4f23c0 - _0x94e679.r * -_0x2f9a36);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 - _0x94e679.r * -_0x1b0a49, _0x94e679.y + _0x4f23c0 - _0x94e679.r * -_0x2f9a36);
  _0x3ae97c.moveTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * 0.8, _0x94e679.y + _0x4f23c0);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * _0x2f9a36, _0x94e679.y + _0x4f23c0 - _0x94e679.r * -_0x1b0a49);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * _0x2f9a36, _0x94e679.y + _0x4f23c0 + _0x94e679.r * -_0x1b0a49);
  _0x3ae97c.moveTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * -0.8, _0x94e679.y + _0x4f23c0);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * -_0x2f9a36, _0x94e679.y + _0x4f23c0 - _0x94e679.r * _0x1b0a49);
  _0x3ae97c.lineTo(_0x94e679.x + _0x3a19c3 + _0x94e679.r * -_0x2f9a36, _0x94e679.y + _0x4f23c0 + _0x94e679.r * _0x1b0a49);
  var _0x1a42d6 = _0x3ae97c.createLinearGradient(0, _0x94e679.r, 0, _0x94e679.r * 5);
  _0x1a42d6.addColorStop(1, "rgba(249, 161, 66, 1.0)");
  _0x1a42d6.addColorStop(0, "rgba(249, 211, 66, 1.0)");
  _0x3ae97c.fillStyle = _0x1a42d6;
  _0x3ae97c.shadowColor = "rgba(0,0,0,1.0)";
  _0x3ae97c.shadowBlur = 0;
  _0x3ae97c.shadowOffsetY = -1;
  _0x3ae97c.closePath();
  _0x3ae97c.fill();
}
function i_nkNQNc(_0x148bb8, _0xbeff29, _0x1850b0) {
  _0x148bb8.beginPath();
  var _0x3534a9 = {
    x: _0xbeff29 / 2,
    y: _0xbeff29 / 2,
    r: _0xbeff29 / 2 - 15
  };
  var _0x20d0d6 = _0x3534a9.x;
  var _0x4f9cde = _0x3534a9.y;
  var _0x57bd73 = _0x3534a9.r;
  _0x148bb8.shadowOffsetX = 0;
  _0x148bb8.shadowOffsetY = 0;
  _0x148bb8.shadowBlur = 5;
  _0x148bb8.shadowColor = "rgba(249, 211, 66, 0.8)";
  _0x148bb8.strokeStyle = "rgba(255, 255, 255,0.8)";
  _0x148bb8.lineWidth = 6;
  _0x148bb8.lineCap = "square";
  if (_0x1850b0 === 1) {
    _0x148bb8.arc(_0x20d0d6, _0x4f9cde, _0x57bd73 + 7, Math.PI * 25 / 18, Math.PI * 29 / 18);
  } else if (_0x1850b0 === 1.5) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x3534a9.r + 7, Math.PI * 29.3 / 18, Math.PI * 33.7 / 18);
  } else if (_0x1850b0 === 2) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x57bd73 + 7, Math.PI * 34 / 18, Math.PI * 2 / 18);
  } else if (_0x1850b0 === 2.5) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x3534a9.r + 7, Math.PI * 2.3 / 18, Math.PI * 6.7 / 18);
  } else if (_0x1850b0 === 3) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x3534a9.r + 7, Math.PI * 7 / 18, Math.PI * 11 / 18);
  } else if (_0x1850b0 === 3.5) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x3534a9.r + 7, Math.PI * 11.3 / 18, Math.PI * 15.7 / 18);
  } else if (_0x1850b0 === 4) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x3534a9.r + 7, Math.PI * 16 / 18, Math.PI * 20 / 18);
  } else if (_0x1850b0 === 4.5) {
    _0x148bb8.arc(_0x3534a9.x, _0x3534a9.y, _0x3534a9.r + 7, Math.PI * 20.5 / 18, Math.PI * 24.5 / 18);
    _0x148bb8.strokeStyle = "rgba(255, 255, 255,1.0)";
  }
  _0x148bb8.stroke();
  _0x148bb8.closePath();
  _0x148bb8.beginPath();
}
function i_tJNMUc(_0x372d87, _0x303b6b, _0x81286e, _0x7bb54c, _0x192c52) {
  i_YDWfzc(_0x372d87, _0x303b6b, _0x81286e, _0x7bb54c);
  i_mCpnIc(_0x372d87, _0x303b6b, _0x81286e, _0x7bb54c, _0x192c52);
  i_nkNQNc(_0x372d87, _0x303b6b, _0x192c52);
}
function i_rXBXDc() {
  var _0x4e17fc = i_yPiERc;
  var _0x4fd257 = i_yPiERc;
  (i_THGAxc = document.createElement("canvas")).width = _0x4e17fc * i_cffPrs.Pad.Size;
  i_THGAxc.height = _0x4fd257 * i_cffPrs.Pad.Size;
  var _0x26b484 = i_THGAxc.getContext("2d");
  _0x26b484.scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  i_tJNMUc(_0x26b484, _0x4e17fc, false, false, 0);
  (_0x26b484 = (i_fWFkMc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  i_tJNMUc(_0x26b484, _0x4e17fc, true, false, 1);
  (_0x26b484 = (i_fjHDAc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  _0x26b484.translate(_0x4e17fc / 2, _0x4fd257 / 2);
  _0x26b484.translate(-_0x4e17fc / 2, -_0x4fd257 / 2);
  i_tJNMUc(_0x26b484, _0x4e17fc, true, false, 2);
  (_0x26b484 = (i_YWwjPc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  _0x26b484.translate(_0x4e17fc / 2, _0x4fd257 / 2);
  _0x26b484.translate(-_0x4e17fc / 2, -_0x4fd257 / 2);
  i_tJNMUc(_0x26b484, _0x4e17fc, true, false, 3);
  (_0x26b484 = (i_xrnsEc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  _0x26b484.translate(_0x4e17fc / 2, _0x4fd257 / 2);
  _0x26b484.translate(-_0x4e17fc / 2, -_0x4fd257 / 2);
  i_tJNMUc(_0x26b484, _0x4e17fc, true, false, 4);
  (_0x26b484 = (i_wZSQSc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  i_tJNMUc(_0x26b484, _0x4e17fc, false, true, 1.5);
  (_0x26b484 = (i_BkJeCc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  _0x26b484.translate(_0x4e17fc / 2, _0x4fd257 / 2);
  _0x26b484.translate(-_0x4e17fc / 2, -_0x4fd257 / 2);
  i_tJNMUc(_0x26b484, _0x4e17fc, false, true, 2.5);
  (_0x26b484 = (i_xrSbOc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  _0x26b484.translate(_0x4e17fc / 2, _0x4fd257 / 2);
  _0x26b484.translate(-_0x4e17fc / 2, -_0x4fd257 / 2);
  i_tJNMUc(_0x26b484, _0x4e17fc, false, true, 3.5);
  (_0x26b484 = (i_RpTkKc = i_THGAxc.cloneNode(true)).getContext("2d")).scale(i_cffPrs.Pad.Size, i_cffPrs.Pad.Size);
  _0x26b484.globalAlpha = i_cffPrs.Pad.Alpha;
  _0x26b484.translate(_0x4e17fc / 2, _0x4fd257 / 2);
  _0x26b484.translate(-_0x4e17fc / 2, -_0x4fd257 / 2);
  i_tJNMUc(_0x26b484, _0x4e17fc, false, true, 4.5);
  i_cffPrs.Pad.Obj = i_THGAxc;
  i_cffPrs.Pad.Reinit = i_rXBXDc;
}
function i_FwbC$c() {
  i_Qyfwws.clearRect(i_cffPrs.Pad.X, i_cffPrs.Pad.Y, i_THGAxc.width, i_THGAxc.height);
  switch (i_sHnMXc) {
    case 0:
      i_Qyfwws.drawImage(i_THGAxc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 1:
      i_Qyfwws.drawImage(i_fWFkMc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 2:
      i_Qyfwws.drawImage(i_YWwjPc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 4:
      i_Qyfwws.drawImage(i_xrnsEc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 5:
      i_Qyfwws.drawImage(i_RpTkKc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 6:
      i_Qyfwws.drawImage(i_xrSbOc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 8:
      i_Qyfwws.drawImage(i_fjHDAc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 9:
      i_Qyfwws.drawImage(i_wZSQSc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    case 10:
      i_Qyfwws.drawImage(i_BkJeCc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
      break;
    default:
      i_Qyfwws.drawImage(i_THGAxc, i_cffPrs.Pad.X, i_cffPrs.Pad.Y);
  }
  if (i_sJjkcs) {
    i_Qyfwws.beginPath();
    i_Qyfwws.rect(i_cffPrs.Pad.X, i_cffPrs.Pad.Y, i_THGAxc.width, i_THGAxc.height);
    i_Qyfwws.closePath();
    i_Qyfwws.strokeStyle = "rgba(255, 255, 255,1.0)";
    i_Qyfwws.lineWidth = 2;
    i_Qyfwws.shadowOffsetX = 0;
    i_Qyfwws.shadowOffsetY = 0;
    i_Qyfwws.shadowBlur = 2;
    i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
    i_Qyfwws.stroke();
  }
}
function i_TrbXBc(_0x401514, _0x216911) {
  if (!i_pwBFUs(_0x401514, _0x216911, i_cffPrs.Pad.X - 100, i_cffPrs.Pad.Y - 100, i_THGAxc.width * 2.5, i_THGAxc.height * 2.5)) {
    return null;
  }
  var _0x358782 = _0x401514 - (i_cffPrs.Pad.X + i_yPiERc * i_cffPrs.Pad.Size / 2);
  var _0x4d8844 = _0x216911 - (i_cffPrs.Pad.Y + i_yPiERc * i_cffPrs.Pad.Size / 2);
  var _0x50a711 = 0;
  var _0x5bf1af = i_yPiERc * i_cffPrs.Pad.Size / 6;
  if (_0x5bf1af < _0x358782) {
    _0x50a711 |= 8;
  }
  if (_0x358782 < -_0x5bf1af) {
    _0x50a711 |= 4;
  }
  if (_0x4d8844 < -_0x5bf1af) {
    _0x50a711 |= 1;
  }
  if (_0x5bf1af < _0x4d8844) {
    _0x50a711 |= 2;
  }
  i_GHKWya._n(_0x50a711);
  i_sHnMXc = _0x50a711;
  i_FwbC$c();
  return i_GGskFc;
}
function i_XAECGc(_0x585886, _0x3ffd56, _0x4323f3) {
  if (!i_pwBFUs(_0x585886, _0x3ffd56, i_cffPrs.Pad.X, i_cffPrs.Pad.Y, i_THGAxc.width, i_THGAxc.height) && !_0x4323f3) {
    return null;
  }
  var _0x4b9db7 = _0x585886 - (i_cffPrs.Pad.X + i_yPiERc * i_cffPrs.Pad.Size / 2);
  var _0x5a5860 = _0x3ffd56 - (i_cffPrs.Pad.Y + i_yPiERc * i_cffPrs.Pad.Size / 2);
  var _0x4bc65e = Math.abs(_0x4b9db7);
  var _0x4f95f9 = Math.abs(_0x5a5860);
  var _0x34e3e9 = 0;
  if (_0x4bc65e > 8 && _0x4f95f9 > 8 && (_0x4f95f9 < _0x4bc65e && _0x4bc65e / 1.8 < _0x4f95f9 || _0x4f95f9 / 1.8 < _0x4bc65e && _0x4bc65e < _0x4f95f9 || _0x4bc65e == _0x4f95f9)) {
    if (_0x4b9db7 > 8) {
      _0x34e3e9 |= 8;
    }
    if (_0x4b9db7 < -8) {
      _0x34e3e9 |= 4;
    }
    if (_0x5a5860 < -8) {
      _0x34e3e9 |= 1;
    }
    if (_0x5a5860 > 8) {
      _0x34e3e9 |= 2;
    }
  } else if (_0x4f95f9 < _0x4bc65e) {
    if (_0x4b9db7 > 8) {
      _0x34e3e9 |= 8;
    } else if (_0x4b9db7 < -8) {
      _0x34e3e9 |= 4;
    }
  } else if (_0x5a5860 < -8) {
    _0x34e3e9 |= 1;
  } else if (_0x5a5860 > 8) {
    _0x34e3e9 |= 2;
  }
  i_GHKWya._n(_0x34e3e9);
  i_sHnMXc = _0x34e3e9;
  i_FwbC$c();
  return i_GGskFc;
}
function i_GGskFc() {
  i_sHnMXc = 0;
  i_GHKWya._n(0);
  i_FwbC$c();
}
var i_FhPPLc = null;
var i_Kyjiqc = null;
var i_wYRxVc = null;
var i_hnswjc = null;
var i_xbdtYc = false;
var i_pQYsHc = false;
function i_rhZKWc() {
  (i_wYRxVc = document.createElement("canvas")).width = i_cffPrs.Start.Size * 56;
  i_wYRxVc.height = i_cffPrs.Start.Size * 56;
  i_hnswjc = i_wYRxVc.cloneNode(true);
  var _0x3bfe3e = i_wYRxVc.getContext("2d");
  _0x3bfe3e.scale(i_cffPrs.Start.Size, i_cffPrs.Start.Size);
  _0x3bfe3e.globalAlpha = i_cffPrs.Start.Alpha;
  i_wwBtyc(_0x3bfe3e, 0, 0, 56, "开始");
  (_0x3bfe3e = i_hnswjc.getContext("2d")).scale(i_cffPrs.Start.Size, i_cffPrs.Start.Size);
  _0x3bfe3e.globalAlpha = i_cffPrs.Start.Alpha;
  i_mfytwc(_0x3bfe3e, 0, 0, 56, "开始");
  i_cffPrs.Start.Obj = i_hnswjc;
  i_cffPrs.Start.Reinit = i_rhZKWc;
}
function i_KpDwJc() {
  (i_FhPPLc = document.createElement("canvas")).width = i_cffPrs.Select.Size * 56;
  i_FhPPLc.height = i_cffPrs.Select.Size * 56;
  i_Kyjiqc = i_FhPPLc.cloneNode(true);
  var _0x2fd836 = i_FhPPLc.getContext("2d");
  _0x2fd836.scale(i_cffPrs.Select.Size, i_cffPrs.Select.Size);
  _0x2fd836.globalAlpha = i_cffPrs.Select.Alpha;
  i_wwBtyc(_0x2fd836, 0, 0, 56, "选择");
  (_0x2fd836 = i_Kyjiqc.getContext("2d")).scale(i_cffPrs.Select.Size, i_cffPrs.Select.Size);
  _0x2fd836.globalAlpha = i_cffPrs.Select.Alpha;
  i_mfytwc(_0x2fd836, 0, 0, 56, "选择");
  i_cffPrs.Select.Obj = i_Kyjiqc;
  i_cffPrs.Select.Reinit = i_KpDwJc;
}
function i_YkxRQc() {
  i_KpDwJc();
  i_rhZKWc();
}
function i_PPBfZc() {
  i_Qyfwws.clearRect(i_cffPrs.Select.X, i_cffPrs.Select.Y, i_Kyjiqc.width, i_Kyjiqc.height);
  i_Qyfwws.clearRect(i_cffPrs.Start.X, i_cffPrs.Start.Y, i_hnswjc.width, i_hnswjc.height);
}
function i_PbXses() {
  i_EmRets();
  i_ftnNas();
}
function i_rBzRns(_0x575499, _0x35f939) {
  if (i_pwBFUs(_0x575499, _0x35f939, i_cffPrs.Select.X, i_cffPrs.Select.Y, i_Kyjiqc.width, i_Kyjiqc.height)) {
    i_xbdtYc = true;
    i_EmRets();
    return i_cDyZis;
  } else if (i_pwBFUs(_0x575499, _0x35f939, i_cffPrs.Start.X, i_cffPrs.Start.Y, i_hnswjc.width, i_hnswjc.height)) {
    i_pQYsHc = true;
    i_ftnNas();
    return i_tjmbos;
  } else {
    return undefined;
  }
}
function i_EmRets() {
  i_Qyfwws.clearRect(i_cffPrs.Select.X, i_cffPrs.Select.Y, i_Kyjiqc.width, i_Kyjiqc.height);
  if (i_xbdtYc) {
    i_GHKWya.Qe();
    i_Qyfwws.drawImage(i_Kyjiqc, i_cffPrs.Select.X, i_cffPrs.Select.Y);
  } else {
    i_GHKWya.Ze();
    i_Qyfwws.drawImage(i_FhPPLc, i_cffPrs.Select.X, i_cffPrs.Select.Y);
  }
  if (i_sJjkcs) {
    i_Qyfwws.beginPath();
    i_Qyfwws.rect(i_cffPrs.Select.X, i_cffPrs.Select.Y, i_Kyjiqc.width, i_Kyjiqc.height);
    i_Qyfwws.strokeStyle = "rgba(255, 255, 255,1.0)";
    i_Qyfwws.lineWidth = 2;
    i_Qyfwws.shadowOffsetX = 0;
    i_Qyfwws.shadowOffsetY = 0;
    i_Qyfwws.shadowBlur = 2;
    i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
    i_Qyfwws.stroke();
  }
}
function i_ftnNas() {
  i_Qyfwws.clearRect(i_cffPrs.Start.X, i_cffPrs.Start.Y, i_hnswjc.width, i_hnswjc.height);
  if (i_pQYsHc) {
    i_GHKWya.We();
    i_Qyfwws.drawImage(i_hnswjc, i_cffPrs.Start.X, i_cffPrs.Start.Y);
  } else {
    i_GHKWya.Je();
    i_Qyfwws.drawImage(i_wYRxVc, i_cffPrs.Start.X, i_cffPrs.Start.Y);
  }
  if (i_sJjkcs) {
    i_Qyfwws.beginPath();
    i_Qyfwws.rect(i_cffPrs.Start.X, i_cffPrs.Start.Y, i_hnswjc.width, i_hnswjc.height);
    i_Qyfwws.strokeStyle = "rgba(255, 255, 255,1.0)";
    i_Qyfwws.lineWidth = 2;
    i_Qyfwws.shadowOffsetX = 0;
    i_Qyfwws.shadowOffsetY = 0;
    i_Qyfwws.shadowBlur = 2;
    i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
    i_Qyfwws.stroke();
  }
}
function i_cDyZis() {
  i_xbdtYc = false;
  i_EmRets();
}
function i_tjmbos() {
  i_pQYsHc = false;
  i_ftnNas();
}
var i_sJjkcs = false;
var i_Wairss = false;
var i_cffPrs = {
  GamePadType: 1,
  Pad: {
    X: 0,
    Y: 0,
    Alpha: 1,
    Size: 1
  },
  Select: {
    X: 0,
    Y: 0,
    Alpha: 1,
    Size: 1
  },
  Start: {
    X: 200,
    Y: 200,
    Alpha: 1,
    Size: 1
  },
  A: {
    X: 100,
    Y: 100,
    Alpha: 1,
    Size: 1
  },
  B: {
    X: 200,
    Y: 200,
    Alpha: 1,
    Size: 1
  },
  AA: {
    X: 200,
    Y: 200,
    Alpha: 1,
    Size: 1
  },
  BB: {
    X: 200,
    Y: 200,
    Alpha: 1,
    Size: 1
  },
  AB: {
    X: 200,
    Y: 200,
    Alpha: 1,
    Size: 1
  }
};
var i_YWSWls = null;
var i_tTwrus = null;
var i_esSxfs = false;
function i_kCpK_s() {
  if (!(i_tTwrus != null && i_tTwrus != null)) {
    i_tTwrus = i_Qyfwws.drawImage;
  }
  i_Qyfwws.drawImage = i_Wairss || i_njFT_l ? function () {} : i_tTwrus;
  if (!i_esSxfs || i_cffPrs.Select.X == 0 && i_cffPrs.Select.Y == 0) {
    var _0xafef66 = i_RFyyys.width;
    var _0x20d2c1 = i_RFyyys.height;
    i_cffPrs.Pad.X = 42;
    i_cffPrs.Pad.Y = _0x20d2c1 - 180;
    i_cffPrs.Select.Y = _0x20d2c1 - 80;
    i_cffPrs.Select.X = _0xafef66 / 2 - 60;
    i_cffPrs.Start.Y = _0x20d2c1 - 80;
    i_cffPrs.Start.X = _0xafef66 / 2 + 10;
    i_cffPrs.B.X = _0xafef66 - 190;
    i_cffPrs.B.Y = _0x20d2c1 - 88;
    i_cffPrs.A.X = _0xafef66 - 100;
    i_cffPrs.A.Y = _0x20d2c1 - 92;
    i_cffPrs.BB.X = _0xafef66 - 175;
    i_cffPrs.BB.Y = _0x20d2c1 - 165;
    i_cffPrs.AA.X = _0xafef66 - 95;
    i_cffPrs.AA.Y = _0x20d2c1 - 170;
    i_cffPrs.AB.X = _0xafef66 - 95;
    i_cffPrs.AB.Y = _0x20d2c1 - 230;
  } else {
    i_sFmzCs();
  }
}
function i_HMEnvs() {}
function i_PYfcds() {
  i_sJjkcs = true;
  i_YWSWls = i_cffPrs.Pad;
  i_sFmzCs();
}
function i_eTfNps(_0x54f53f, _0xf7d93d) {
  for (var _0x3f68b0 in i_cffPrs) {
    if (_0x3f68b0 != "GamePadType" && i_cffPrs[_0x3f68b0].Obj != null && i_cffPrs[_0x3f68b0].Obj != null && !i_cffPrs[_0x3f68b0].Hide && i_pwBFUs(_0x54f53f, _0xf7d93d, i_cffPrs[_0x3f68b0].X, i_cffPrs[_0x3f68b0].Y, i_cffPrs[_0x3f68b0].Obj.width, i_cffPrs[_0x3f68b0].Obj.height)) {
      i_YWSWls = i_cffPrs[_0x3f68b0];
      $("#layout_size").val(((i_YWSWls.Size * 100 - 50) / 1.5).toFixed(0)).trigger("input");
      $("#layout_transparent").val((i_YWSWls.Alpha * 100).toFixed(0)).trigger("input");
      return i_cffPrs[_0x3f68b0];
    }
  }
  return null;
}
function i_xweams(_0x24fdaa, _0x4d31e2, _0x5bba95) {
  _0x24fdaa = Math.floor(_0x24fdaa);
  _0x4d31e2 = Math.floor(_0x4d31e2);
  for (var _0xa2c4cb in i_cffPrs) {
    if (_0xa2c4cb != "GamePadType" && i_cffPrs[_0xa2c4cb].Obj != null && i_cffPrs[_0xa2c4cb].Obj != null && (i_cffPrs[_0xa2c4cb].X != _0x5bba95.X || i_cffPrs[_0xa2c4cb].Y != _0x5bba95.Y) && !i_cffPrs[_0xa2c4cb].Hide && i_ZdjBDs(_0x24fdaa, _0x4d31e2, _0x5bba95.Obj.width, _0x5bba95.Obj.height, i_cffPrs[_0xa2c4cb].X, i_cffPrs[_0xa2c4cb].Y, i_cffPrs[_0xa2c4cb].Obj.width, i_cffPrs[_0xa2c4cb].Obj.height)) {
      return false;
    }
  }
  return true;
}
function i_nszags() {
  i_sJjkcs = false;
  i_YWSWls = null;
  i_sFmzCs();
}
function i_CByehs(_0x1b3b3a) {
  if (i_YWSWls != null) {
    i_YWSWls.Size = _0x1b3b3a;
    i_YWSWls.Reinit();
    i_sFmzCs();
  }
}
function i_Wzzebs(_0x47c3c1) {
  if (i_YWSWls != null) {
    i_YWSWls.Alpha = _0x47c3c1;
    i_YWSWls.Reinit();
    i_sFmzCs();
  }
}
var i_RFyyys = null;
var i_Qyfwws = null;
var i_ZdSiks = false;
var i_GaPNTs = {};
var i_pEEBxs = {};
var i_BQAJMs = {};
var i_yGbxPs = false;
function i_mrnFEs(_0xb13f72) {
  var _0x16087c = window.orientation;
  if (_0x16087c === undefined && window.screen.orientation != null) {
    _0x16087c = window.screen.orientation.angle;
  }
  if (!(_0x16087c !== 180 && _0x16087c !== 0)) {
    i_ZdSiks = true;
  }
  if (!(_0x16087c !== 90 && _0x16087c !== -90)) {
    i_ZdSiks = false;
  }
}
function i_PkTzAs() {
  if (i_yGbxPs) {
    i_YJFTSs();
  } else {
    i_yGbxPs = true;
    var _0x369c3e = i_sxfci_("phonewrap");
    (i_RFyyys = i_sxfci_("gametap")).width = _0x369c3e.clientWidth;
    i_RFyyys.height = _0x369c3e.clientHeight;
    i_Qyfwws = i_RFyyys.getContext("2d");
    i_kCpK_s();
    i_YkxRQc();
    i_sfNrcc();
    i_rXBXDc();
    i_ksaPrc();
    i_PbXses();
    i_FwbC$c();
    i_RFyyys.addEventListener("touchstart", i_YpeJOs);
    i_RFyyys.addEventListener("touchmove", i_HSYDXs);
    i_RFyyys.addEventListener("touchend", i_REscRs);
    i_RFyyys.addEventListener("touchcancel", i_REscRs);
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
      setTimeout(i_mrnFEs, 500);
    }, false);
    window.addEventListener("resize", function () {
      setTimeout(function () {
        i_RFyyys.width = _0x369c3e.clientWidth;
        i_RFyyys.height = _0x369c3e.clientHeight;
        i_sFmzCs();
      }, 500);
    }, false);
    i_mrnFEs();
  }
}
function i_YJFTSs() {
  i_YkxRQc();
  i_sfNrcc();
  i_rXBXDc();
  i_sFmzCs();
}
function i_sFmzCs() {
  i_Qyfwws.clearRect(0, 0, i_RFyyys.width, i_RFyyys.height);
  i_ksaPrc();
  i_PbXses();
  i_FwbC$c();
  if (i_YWSWls != null) {
    i_Qyfwws.beginPath();
    i_Qyfwws.rect(i_YWSWls.X, i_YWSWls.Y, i_YWSWls.Obj.width, i_YWSWls.Obj.height);
    i_Qyfwws.strokeStyle = "rgba(249, 211, 66,1.0)";
    i_Qyfwws.lineWidth = 3;
    i_Qyfwws.shadowOffsetX = 0;
    i_Qyfwws.shadowOffsetY = 0;
    i_Qyfwws.shadowBlur = 2;
    i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
    i_Qyfwws.stroke();
  } else {
    i_Qyfwws.shadowBlur = 0;
  }
}
function i_QtJCKs(_0x3e8a52, _0x3692a9) {
  if (i_ZdSiks) {
    var _0x1b2652 = _0x3692a9;
    var _0x31b1b5 = i_RFyyys.height - _0x3e8a52;
  } else {
    _0x1b2652 = _0x3e8a52;
    _0x31b1b5 = _0x3692a9;
  }
  return {
    pn: Math.floor(_0x1b2652),
    mn: Math.floor(_0x31b1b5)
  };
}
function i_YpeJOs(_0x4af08e) {
  if (!i_bhkMMf) {
    i_RttEHf();
  }
  if (i_MSkKnl) {
    i_kymCil();
  }
  if (i_sJjkcs) {
    i_TTCDzs(_0x4af08e);
  } else {
    var _0x1180a6 = 0;
    for (; _0x1180a6 < _0x4af08e.changedTouches.length; _0x1180a6 += 1) {
      var _0x1c8d29 = _0x4af08e.changedTouches[_0x1180a6];
      var _0x34c9c7 = i_QtJCKs(_0x1c8d29.clientX, _0x1c8d29.clientY);
      var _0x8ce950 = _0x34c9c7.pn;
      var _0x2f7369 = _0x34c9c7.mn;
      i_GaPNTs[_0x1c8d29.identifier] = i_DCpHlc(_0x8ce950, _0x2f7369, null);
      if (i_GaPNTs[_0x1c8d29.identifier] != null) {
        i_pEEBxs[_0x1c8d29.identifier] = "abc";
      }
      if (i_GaPNTs[_0x1c8d29.identifier] == null) {
        i_GaPNTs[_0x1c8d29.identifier] = i_XAECGc(_0x8ce950, _0x2f7369, false);
        if (i_GaPNTs[_0x1c8d29.identifier] != null) {
          i_pEEBxs[_0x1c8d29.identifier] = "dir";
        }
      }
      if (i_GaPNTs[_0x1c8d29.identifier] == null) {
        i_GaPNTs[_0x1c8d29.identifier] = i_rBzRns(_0x8ce950, _0x2f7369);
      }
      if (i_GaPNTs[_0x1c8d29.identifier] == null) {
        i_GaPNTs[_0x1c8d29.identifier] = i_TrbXBc(_0x8ce950, _0x2f7369);
        if (i_GaPNTs[_0x1c8d29.identifier] != null) {
          i_pEEBxs[_0x1c8d29.identifier] = "dir";
        }
      }
    }
    _0x4af08e.preventDefault();
  }
}
function i_HSYDXs(_0x506365) {
  if (i_sJjkcs) {
    i_HpfjIs(_0x506365);
  } else {
    var _0x102c98 = 0;
    for (; _0x102c98 < _0x506365.changedTouches.length; _0x102c98 += 1) {
      var _0x3a4795 = _0x506365.changedTouches[_0x102c98];
      var _0x51983e = i_QtJCKs(_0x3a4795.clientX, _0x3a4795.clientY);
      var _0x381cdb = _0x51983e.pn;
      var _0x1732b5 = _0x51983e.mn;
      if (i_pEEBxs[_0x3a4795.identifier] === "dir") {
        i_XAECGc(_0x381cdb, _0x1732b5, true);
      } else {
        i_pEEBxs[_0x3a4795.identifier];
        i_GaPNTs[_0x3a4795.identifier] = i_DCpHlc(_0x381cdb, _0x1732b5, i_GaPNTs[_0x3a4795.identifier]);
      }
    }
  }
}
function i_REscRs(_0x565c06) {
  if (i_sJjkcs) {
    i_GhtMNs(_0x565c06);
  } else {
    var _0xfebbb1 = 0;
    for (; _0xfebbb1 < _0x565c06.changedTouches.length; _0xfebbb1 += 1) {
      var _0x20c9f1 = _0x565c06.changedTouches[_0xfebbb1];
      if (i_GaPNTs[_0x20c9f1.identifier] != null && i_GaPNTs[_0x20c9f1.identifier] != null) {
        i_GaPNTs[_0x20c9f1.identifier]();
        i_GaPNTs[_0x20c9f1.identifier] = null;
        i_pEEBxs[_0x20c9f1.identifier] = null;
      }
    }
    _0x565c06.preventDefault();
  }
}
function i_TTCDzs(_0x49e4ee) {
  var _0x5ba6cd = 0;
  for (; _0x5ba6cd < _0x49e4ee.changedTouches.length; _0x5ba6cd += 1) {
    var _0x226ebc = _0x49e4ee.changedTouches[_0x5ba6cd];
    var _0x4c56b6 = i_QtJCKs(_0x226ebc.clientX, _0x226ebc.clientY);
    var _0x13d1a1 = i_eTfNps(_0x4c56b6.pn, _0x4c56b6.mn);
    if (_0x13d1a1 != null) {
      i_BQAJMs[_0x226ebc.identifier] = _0x13d1a1;
      i_YWSWls = _0x13d1a1;
      i_Qyfwws.beginPath();
      i_Qyfwws.rect(_0x13d1a1.X, _0x13d1a1.Y, _0x13d1a1.Obj.width, _0x13d1a1.Obj.height);
      i_Qyfwws.strokeStyle = "rgba(249, 211, 66,1.0)";
      i_Qyfwws.lineWidth = 3;
      i_Qyfwws.shadowOffsetX = 0;
      i_Qyfwws.shadowOffsetY = 0;
      i_Qyfwws.shadowBlur = 2;
      i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
      i_Qyfwws.stroke();
      i_sFmzCs();
    }
  }
  _0x49e4ee.preventDefault();
}
function i_HpfjIs(_0xe4f44d) {
  var _0x380946 = 0;
  for (; _0x380946 < _0xe4f44d.changedTouches.length; _0x380946 += 1) {
    var _0x52dcb1 = _0xe4f44d.changedTouches[_0x380946];
    var _0xc53a3b = i_QtJCKs(_0x52dcb1.clientX, _0x52dcb1.clientY);
    var _0x5ede8a = _0xc53a3b.pn;
    var _0x1939b5 = _0xc53a3b.mn;
    var _0x2ded4b = i_BQAJMs[_0x52dcb1.identifier];
    if (_0x2ded4b != null && _0x2ded4b != null) {
      var _0x35f978 = Math.floor(_0x5ede8a - _0x2ded4b.Obj.width / 2);
      var _0x2fadfa = Math.floor(_0x1939b5 - _0x2ded4b.Obj.height / 2);
      if (!i_xweams(_0x35f978, _0x2fadfa, _0x2ded4b)) {
        if (i_xweams(_0x2ded4b.X, _0x2fadfa, _0x2ded4b)) {
          _0x35f978 = _0x2ded4b.X;
        } else {
          if (!i_xweams(_0x35f978, _0x2ded4b.Y, _0x2ded4b)) {
            continue;
          }
          _0x2fadfa = _0x2ded4b.Y;
        }
      }
      _0x2ded4b.X = _0x35f978;
      _0x2ded4b.Y = _0x2fadfa;
      if (_0x2ded4b.X < 0) {
        _0x2ded4b.X = 0;
      }
      if (_0x2ded4b.Y < 0) {
        _0x2ded4b.Y = 0;
      }
      if (_0x2ded4b.X + _0x2ded4b.Obj.width > i_RFyyys.width) {
        _0x2ded4b.X = i_RFyyys.width - _0x2ded4b.Obj.width;
      }
      if (_0x2ded4b.Y + _0x2ded4b.Obj.height > i_RFyyys.height) {
        _0x2ded4b.Y = i_RFyyys.height - _0x2ded4b.Obj.height;
      }
      i_sFmzCs();
      i_Qyfwws.beginPath();
      i_Qyfwws.rect(_0x2ded4b.X, _0x2ded4b.Y, _0x2ded4b.Obj.width, _0x2ded4b.Obj.height);
      i_Qyfwws.strokeStyle = "rgba(249, 211, 66,1.0)";
      i_Qyfwws.lineWidth = 3;
      i_Qyfwws.shadowOffsetX = 0;
      i_Qyfwws.shadowOffsetY = 0;
      i_Qyfwws.shadowBlur = 2;
      i_Qyfwws.shadowColor = "rgba(0,0,0,1.0)";
      i_Qyfwws.stroke();
    }
  }
  _0xe4f44d.preventDefault();
}
function i_GhtMNs(_0x3d9238) {
  var _0xa40ec2 = 0;
  for (; _0xa40ec2 < _0x3d9238.changedTouches.length; _0xa40ec2 += 1) {
    var _0x544fab = _0x3d9238.changedTouches[_0xa40ec2];
    i_BQAJMs[_0x544fab.identifier] = null;
  }
  i_sFmzCs();
  _0x3d9238.preventDefault();
}
function i_pwBFUs(_0x18ee22, _0xdbb0ba, _0x29c7f0, _0x409a7b, _0x5cc1ce, _0x2c5ebe) {
  return _0x29c7f0 <= _0x18ee22 && _0x18ee22 <= _0x29c7f0 + _0x5cc1ce && _0x409a7b <= _0xdbb0ba && _0xdbb0ba <= _0x409a7b + _0x2c5ebe;
}
function i_ZdjBDs(_0x51974d, _0x218cff, _0x2e0556, _0x18a597, _0x2bd01c, _0x1b59ab, _0x1e561b, _0x33988e) {
  return !(_0x1b59ab + _0x33988e < _0x218cff || _0x218cff + _0x18a597 < _0x1b59ab || _0x2bd01c + _0x1e561b < _0x51974d || _0x51974d + _0x2e0556 < _0x2bd01c);
}
var i_eRzm$s = -1;
function i_GdHiBs(_0x2b990a) {
  document.getElementsByName("keybind").forEach(function (_0xec6540) {
    if (i_WmyDOu.PCSet[i_Brhwo_(_0xec6540)] == _0x2b990a) {
      i_WmyDOu.PCSet[i_Brhwo_(_0xec6540)] = "NO";
      i_JhjKFs(_0xec6540);
    }
  });
}
function i_dBDxGs(_0xd65924) {
  document.getElementsByName("keybind").forEach(function (_0x4d9616) {
    if (i_Brhwo_(_0x4d9616) != "KeyJoy" && i_Brhwo_(_0x4d9616) != "KeyUp" && i_Brhwo_(_0x4d9616) != "KeyDown" && i_Brhwo_(_0x4d9616) != "KeyLeft" && i_Brhwo_(_0x4d9616) != "KeyRight" && i_WmyDOu.GPSetx[i_Brhwo_(_0x4d9616)] == _0xd65924) {
      i_WmyDOu.GPSetx[i_Brhwo_(_0x4d9616)] = -1;
      i_JhjKFs(_0x4d9616);
    }
  });
}
function i_JhjKFs(_0x1f9833) {
  if (i_eRzm$s == -1) {
    if ((_0x548aa1 = (_0x548aa1 = (_0x548aa1 = i_WmyDOu.PCSet[i_Brhwo_(_0x1f9833)].replace("Key", "")).replace("Digit", "")).replace("Numpad", "")) == "NO") {
      _0x548aa1 = "空";
    }
    _0x1f9833.childNodes[1].innerText = _0x548aa1;
  } else {
    var _0x548aa1 = i_WmyDOu.GPSetx[i_Brhwo_(_0x1f9833)];
    _0x1f9833.childNodes[1].innerText = _0x548aa1;
  }
}
var i_CpRJLs = null;
var i_pPNtqs = null;
function i_SDQHVs(_0x800459) {
  var _0x258c9b = {
    buttons: []
  };
  var _0x4d13be = i_HHPb_i();
  for (var _0x247fd3 in _0x4d13be.buttons) {
    _0x258c9b.buttons[_0x247fd3] = _0x4d13be.buttons[_0x247fd3].pressed;
  }
  _0x258c9b.axes = _0x4d13be.axes;
  i_CpRJLs = setTimeout(function _0x55132b() {
    if (i_sxfci_("SetUp").style.display != "none") {
      if (i_pPNtqs == _0x800459) {
        var _0x2b9b69 = i_HHPb_i();
        var _0x3e831e = 0;
        for (; _0x3e831e < _0x2b9b69.buttons.length; _0x3e831e++) {
          if (_0x2b9b69.buttons[_0x3e831e].pressed && _0x258c9b.buttons[_0x3e831e] == 0) {
            i_dBDxGs(_0x3e831e);
            i_WmyDOu.GPSetx[i_Brhwo_(_0x800459)] = _0x3e831e;
            if (i_Brhwo_(_0x800459) == "KeyLeft") {
              i_WmyDOu.GPSetx.KeyJoy = 0;
            }
            _0x800459.blur();
            i_JhjKFs(_0x800459);
            i_SFAPYs(_0x800459.tabIndex);
            i_CpRJLs = null;
            return;
          }
        }
        for (_0x3e831e = 0; _0x3e831e < _0x2b9b69.axes.length; _0x3e831e++) {
          if (Math.abs(_0x2b9b69.axes[_0x3e831e]) > 0.5 && _0x2b9b69.axes[_0x3e831e] != _0x258c9b.axes[_0x3e831e]) {
            if (_0x3e831e == 9) {
              i_rrYppt("******************", true);
              i_rrYppt("识别到POV摇杆，已自动设置好所有方向😁", true);
              _0x800459.blur();
              i_WmyDOu.GPSetx.KeyJoy = 1;
              i_WmyDOu.GPSetx.KeyUp = 9;
              i_WmyDOu.GPSetx.KeyDown = 9;
              i_WmyDOu.GPSetx.KeyLeft = 9;
              i_WmyDOu.GPSetx.KeyRight = 9;
              i_dhBiu_("keybind", function (_0x948308) {
                if (!(i_Brhwo_(_0x948308) != "KeyUp" && i_Brhwo_(_0x948308) != "KeyDown" && i_Brhwo_(_0x948308) != "KeyLeft" && i_Brhwo_(_0x948308) != "KeyRight")) {
                  i_JhjKFs(_0x948308);
                }
                if (i_Brhwo_(_0x948308) == "KeyCoin") {
                  setTimeout(function () {
                    _0x948308.focus();
                  }, 200);
                }
              });
            } else {
              i_WmyDOu.GPSetx.KeyJoy = 1;
              i_WmyDOu.GPSetx[i_Brhwo_(_0x800459)] = _0x3e831e;
              _0x800459.blur();
              i_JhjKFs(_0x800459);
              setTimeout(function () {
                i_SFAPYs(_0x800459.tabIndex);
              }, 200);
            }
            i_CpRJLs = null;
            return;
          }
        }
        i_CpRJLs = setTimeout(_0x55132b, 20);
      } else {
        _0x800459.blur();
      }
    } else {
      _0x800459.blur();
    }
  }, 20);
}
function i_NQjGjs() {
  i_dhBiu_("keybind", function (_0x4ccf91) {
    i_JhjKFs(_0x4ccf91);
  });
  i_sxfci_("cb_allrever").checked = i_WmyDOu.GPSetx.gKeyRev;
  i_sxfci_("cb_lrrever").checked = i_WmyDOu.GPSetx.gKeyRevLR;
}
function i_SFAPYs(_0x75780b) {
  i_dhBiu_("keybind", function (_0x2b158f) {
    if (_0x2b158f.tabIndex == _0x75780b + 1) {
      _0x2b158f.focus();
      true;
    }
  });
}
function i_bTXGHs() {
  i_Hfbes_("btn_kbindreset", function () {
    if (i_eRzm$s == -1) {
      i_WmyDOu.PCSet = JSON.parse(JSON.stringify(i_jwnmXu));
    } else {
      i_WmyDOu.GPSetx = JSON.parse(JSON.stringify(i_mACQRu));
    }
    i_NQjGjs();
  });
  i_ZKQCf_("keybind", "focus", function (_0x54e223) {
    this.classList.add("_state_conduct");
    if (i_eRzm$s >= 0) {
      i_SDQHVs(i_pPNtqs = this);
    }
  });
  i_ZKQCf_("keybind", "blur", function (_0x167c84) {
    this.classList.remove("_state_conduct");
  });
  i_ZKQCf_("keybind", "keydown", function (_0x484e1b) {
    if (_0x484e1b.key != "Tab") {
      i_GdHiBs(_0x484e1b.code);
      if (_0x484e1b.code == "Backspace") {
        i_WmyDOu.PCSet[i_Brhwo_(this)] = "NO";
      } else {
        i_WmyDOu.PCSet[i_Brhwo_(this)] = _0x484e1b.code;
      }
      i_JhjKFs(this);
      this.blur();
      _0x484e1b.preventDefault();
      i_SFAPYs(this.tabIndex);
    } else {
      this.blur();
    }
  });
  i_tXrZr_("cb_allrever", "change", function () {
    i_WmyDOu.GPSetx.gKeyRev = this.checked;
  });
  i_tXrZr_("cb_lrrever", "change", function () {
    i_WmyDOu.GPSetx.gKeyRevLR = this.checked;
  });
  i_NQjGjs();
  i_bxRKJs();
}
function i_GSEmWs() {
  var _0x3f0b8a = i_sxfci_("selectOptionBox");
  var _0x591f83 = i_sxfci_("optionDown");
  document.getElementById("selectTip").innerHTML = event.target.innerHTML;
  _0x3f0b8a.style.display = "none";
  _0x591f83.classList.add("optionDown");
  _0x591f83.classList.remove("optionDownRev");
  i_eRzm$s = i_Brhwo_(event.target);
  i_NQjGjs();
  i_HjtSei = parseInt(i_Brhwo_(event.target));
  if (i_eRzm$s == -1) {
    i_sxfci_("cbg_gamepadrev").style.display = "none";
  } else {
    i_sxfci_("cbg_gamepadrev").style.display = "block";
    i_sxfci_("cb_allrever").checked = i_WmyDOu.GPSetx.gKeyRev;
    i_sxfci_("cb_lrrever").checked = i_WmyDOu.GPSetx.gKeyRevLR;
    localStorage.setItem("lastgamepad", v_allGamePadName[i_eRzm$s].id);
  }
}
function i_bxRKJs() {
  i_cirYl_("inputdevicename", i_GSEmWs);
}
function i_tCYnQs(_0x253469) {
  i_sxfci_("selectOptionBox").innerHTML = "<div class=\"selectOption\" name=\"inputdevicename\" key=\"-1\">默认键盘</div>";
  var _0x38ae75 = 0;
  i_HjtSei = -1;
  v_allGamePadName = {};
  var _0x205e13 = localStorage.getItem("lastgamepad");
  var _0x3a7163 = 0;
  for (; _0x3a7163 < _0x253469.length; _0x3a7163++) {
    if (_0x253469[_0x3a7163] != null) {
      true;
      var _0x327a56 = document.createElement("div");
      _0x327a56.className = "selectOption";
      _0x327a56.setAttribute("name", "inputdevicename");
      _0x327a56.setAttribute("key", _0x3a7163);
      _0x327a56.innerHTML = _0x253469[_0x3a7163].id.substr(0, _0x253469[_0x3a7163].id.indexOf("(Ven"));
      if (_0x327a56.innerHTML == "") {
        _0x327a56.innerHTML = _0x253469[_0x3a7163].id.substr(0, _0x253469[_0x3a7163].id.indexOf("("));
      }
      if (_0x327a56.innerHTML == "") {
        _0x327a56.innerHTML = _0x253469[_0x3a7163].id;
      }
      i_sxfci_("selectOptionBox").appendChild(_0x327a56);
      _0x38ae75++;
      if (!(i_HjtSei != -1 && _0x205e13 != _0x253469[_0x3a7163].id)) {
        i_HjtSei = _0x3a7163;
      }
      v_allGamePadName[_0x3a7163] = {};
      v_allGamePadName[_0x3a7163].id = _0x253469[_0x3a7163].id;
      v_allGamePadName[_0x3a7163].num = _0x3a7163;
    }
  }
  setTimeout(i_bxRKJs, 100);
  return _0x38ae75;
}
function i_XPSbZs(_0x61808d) {
  var _0x2f6c3a = i_sxfci_("roomOwnerFlag");
  var _0x1db87c = i_sxfci_("Broomownerflag");
  if (_0x61808d == 0) {
    _0x2f6c3a.style.left = "128px";
    _0x2f6c3a.style.top = "22px";
    _0x1db87c.style.top = "48px";
  } else if (_0x61808d == 1) {
    _0x2f6c3a.style.left = "128px";
    _0x2f6c3a.style.top = "42px";
    _0x1db87c.style.top = "118px";
  } else if (_0x61808d == 2) {
    _0x2f6c3a.style.left = "128px";
    _0x2f6c3a.style.top = "62px";
    _0x1db87c.style.top = "188px";
  } else if (_0x61808d == 3) {
    _0x2f6c3a.style.left = "128px";
    _0x2f6c3a.style.top = "82px";
    _0x1db87c.style.top = "258px";
  }
}
function i_nFFBer(_0x45f6c3) {
  if (_0x45f6c3 != null) {
    i_cbdGFn = _0x45f6c3;
    v_gui_pclink_updatetime = performance.now();
    i_sxfci_("p1img").src = _0x45f6c3.Img1;
    i_sxfci_("p2img").src = _0x45f6c3.Img2;
    i_sxfci_("p3img").src = _0x45f6c3.Img3;
    i_sxfci_("p4img").src = _0x45f6c3.Img4;
    i_sxfci_("p1nick").innerText = _0x45f6c3.Nick1;
    i_sxfci_("p2nick").innerText = _0x45f6c3.Nick2;
    i_sxfci_("p3nick").innerText = _0x45f6c3.Nick3;
    i_sxfci_("p4nick").innerText = _0x45f6c3.Nick4;
    i_sxfci_("Bp1nick").innerText = _0x45f6c3.Nick1;
    i_sxfci_("Bp2nick").innerText = _0x45f6c3.Nick2;
    i_sxfci_("Bp3nick").innerText = _0x45f6c3.Nick3;
    i_sxfci_("Bp4nick").innerText = _0x45f6c3.Nick4;
    i_sxfci_("Bp1img").src = _0x45f6c3.Img1;
    i_sxfci_("Bp2img").src = _0x45f6c3.Img2;
    i_sxfci_("Bp3img").src = _0x45f6c3.Img3;
    i_sxfci_("Bp4img").src = _0x45f6c3.Img4;
    if (_0x45f6c3.Nick1.indexOf("关闭") > 0) {
      i_sxfci_("p1img").src = "./img/close.png";
      i_sxfci_("Bp1img").src = "./img/close.png";
    }
    if (_0x45f6c3.Nick2.indexOf("关闭") > 0) {
      i_sxfci_("p2img").src = "./img/close.png";
      i_sxfci_("Bp2img").src = "./img/close.png";
    }
    if (_0x45f6c3.Nick3.indexOf("关闭") > 0) {
      i_sxfci_("p3img").src = "./img/close.png";
      i_sxfci_("Bp3img").src = "./img/close.png";
    }
    if (_0x45f6c3.Nick4.indexOf("关闭") > 0) {
      i_sxfci_("p4img").src = "./img/close.png";
      i_sxfci_("Bp4img").src = "./img/close.png";
    }
    if (_0x45f6c3.Mob1) {
      i_sxfci_("p1dev").classList.remove("igwi-diannao-copy");
      i_sxfci_("p1dev").classList.add("igwi-shouji");
    } else {
      i_sxfci_("p1dev").classList.add("igwi-diannao-copy");
      i_sxfci_("p1dev").classList.remove("igwi-shouji");
    }
    if (_0x45f6c3.Mob2) {
      i_sxfci_("p2dev").classList.remove("igwi-diannao-copy");
      i_sxfci_("p2dev").classList.add("igwi-shouji");
    } else {
      i_sxfci_("p2dev").classList.add("igwi-diannao-copy");
      i_sxfci_("p2dev").classList.remove("igwi-shouji");
    }
    if (_0x45f6c3.Mob3) {
      i_sxfci_("p3dev").classList.remove("igwi-diannao-copy");
      i_sxfci_("p3dev").classList.add("igwi-shouji");
    } else {
      i_sxfci_("p3dev").classList.add("igwi-diannao-copy");
      i_sxfci_("p3dev").classList.remove("igwi-shouji");
    }
    if (_0x45f6c3.Mob4) {
      i_sxfci_("p4dev").classList.remove("igwi-diannao-copy");
      i_sxfci_("p4dev").classList.add("igwi-shouji");
    } else {
      i_sxfci_("p4dev").classList.add("igwi-diannao-copy");
      i_sxfci_("p4dev").classList.remove("igwi-shouji");
    }
    i_XPSbZs(_0x45f6c3.boss);
    i_sxfci_("lookcount").innerText = _0x45f6c3.looker;
    i_sxfci_("watchplayer").innerText = "(" + _0x45f6c3.looker + ")";
    var _0x182422 = i_sxfci_("lookerlist");
    _0x182422.innerHTML = "";
    for (var _0x48604c in _0x45f6c3.LookerNick) {
      var _0x1caff9 = document.createElement("div");
      _0x1caff9.setAttribute("key", _0x45f6c3.LookerList[_0x48604c]);
      _0x1caff9.innerHTML = "<div>" + _0x45f6c3.LookerNick[_0x48604c] + "</div><div></div>";
      _0x1caff9.className = "lookout";
      _0x182422.appendChild(_0x1caff9);
    }
    v_gui_ismatch_allow = false;
  }
}
function i_Qrtrnr() {
  if (i_HDQdvr.indexOf("请出房间") > 0) {
    i_sxfci_("popwin_kicktips").style.display = "block";
  } else {
    i_wewzwr("联机已掉线，本场已变为单机模式，请重新连接");
  }
}
function i_rpEWtr(_0x353f0f) {
  var _0x598e13 = i_sxfci_("suspendTxt");
  var _0x3aa4f3 = i_sxfci_("suspendIcon");
  switch (_0x353f0f) {
    case "stop":
      _0x3aa4f3.style.color = "#ff0000";
      _0x3aa4f3.classList.replace("igwi-zanting", "igwi-kaishi");
      _0x598e13.innerText = "继续";
      break;
    case "continue":
      _0x3aa4f3.style.color = "";
      _0x3aa4f3.classList.replace("igwi-kaishi", "igwi-zanting");
      _0x598e13.innerText = "暂停";
  }
}
function i_dGdJar() {}
function i_pPaJir(_0x5c4e4e) {
  i_sxfci_("loadpostxt").innerText = "(" + _0x5c4e4e.toFixed(0) + "%)";
  i_sxfci_("loadingpos").style.width = _0x5c4e4e.toFixed(0) + "%";
  if (_0x5c4e4e >= 100) {
    i_sxfci_("loadingbox").style.display = "none";
    i_sxfci_("gamescr").style.display = "block";
    i_nHTFAe();
  }
}
var i_XSWHor = `<div class="talkRandom">
        <div class="talkedName">
          {{nick}}：          <span>{{text}}</span>
        </div>
      </div>`;
var i_KEnCcr = `<div class="talkRandom">
        <div class="talkedName">
          {{nick}}：          <span style='color: #01ff5b'>{{text}}</span>
        </div>
      </div>`;
var i_jFJtsr = `<div class="talkRandom">
        <div class="talkedName">
          {{nick}}：          <span style='color: #ff2800'>{{text}}</span>
        </div>
      </div>`;
var i_PjRTrr = `  <div class="talking">
                            <div class="talkingTop">
                                <div class="yellowStick"></div>
                                <div class="talkingName">{{nick}}</div>
                                <div class="talkingTime">{{time}}</div>
                            </div>
                            <div class="talkingWords">{{text}}</div>
                        </div>`;
var i_bFaalr = `<div class="talking">
                            <div class="talkingTop">
                                <div class="yellowStick"></div>
                                <div class="watchingIcon">观战</div>
                                <div class="talkingName">{{nick}}</div>
                                <div class="talkingTime">{{time}}</div>
                            </div>
                            <div class="talkingWords">{{text}}</div>
                        </div>`;
var i_KZnrur = `<div class="talking ">
                            <div class="talkingTop myTalk">
                                <div class="talkingTime">{{time}}</div>
                                <div class="talkingName">{{nick}}</div>
                                <div class="yellowStick"></div>
                            </div>
                            <div class="myWordsBox">
                                <div class="talkingWords myWords">{{text}}</div>
                            </div>
                        </div>`;
var i_hefSfr = null;
var i_YJQx_r = null;
var i_HDQdvr = "";
function i_jSpbdr() {
  if (i_hefSfr == null) {
    i_hefSfr = i_sxfci_("chatInGame");
    i_tXrZr_("messageinput", "keydown", function (_0x589745) {
      if (_0x589745.key == "Enter") {
        i_AfxrMr();
      }
    });
    i_tXrZr_("messageinput", "focus", function (_0x182b4c) {});
    i_tXrZr_("messageinput", "blur", function (_0x3b0a0e) {});
  }
  if (i_YJQx_r == null) {
    i_YJQx_r = i_sxfci_("roommsglist");
  }
  i_rrYppt = i_xmzByr;
  i_iZhRvt = i_GJQKdt = i_Wkbybr;
}
var i_weGYpr = 0;
function i_zpMRmr() {
  i_weGYpr = performance.now() + 4900;
  i_hefSfr.style.display = "block";
  setTimeout(function () {
    if (performance.now() > i_weGYpr) {
      i_hefSfr.style.display = "none";
      i_hefSfr.innerHTML = "";
    }
  }, 5000);
}
function i_cNaigr(_0x2d3621) {
  if (_0x2d3621.scrollTop + _0x2d3621.clientHeight + 100 > _0x2d3621.scrollHeight) {
    _0x2d3621.scrollTo(0, _0x2d3621.scrollHeight);
  }
}
function i_JdsYhr(_0x568ddc) {
  i_hefSfr.appendChild(_0x568ddc);
  if (i_hefSfr.children.length > 3) {
    i_hefSfr.removeChild(i_hefSfr.childNodes[0]);
  }
  i_zpMRmr();
}
function i_Wkbybr(_0x3b3f88) {
  if (i_hefSfr == null) {
    i_jSpbdr();
  }
  var _0x222f04 = document.createElement("div");
  _0x222f04.innerHTML = i_XSWHor.replace("{{text}}", _0x3b3f88).replace("{{nick}}", "系统消息");
  i_HDQdvr = _0x3b3f88;
  i_JdsYhr(_0x222f04);
}
function i_xmzByr(_0x33b9c5) {
  if (i_hefSfr == null) {
    i_jSpbdr();
  }
  var _0x356199 = document.createElement("div");
  _0x356199.innerHTML = i_KEnCcr.replace("{{text}}", _0x33b9c5).replace("{{nick}}", "系统消息");
  i_JdsYhr(_0x356199);
}
function i_wewzwr(_0x570830) {
  if (i_hefSfr == null) {
    i_jSpbdr();
  }
  var _0x5582e7 = document.createElement("div");
  _0x5582e7.innerHTML = i_jFJtsr.replace("{{text}}", _0x570830).replace("{{nick}}", "系统消息");
  i_JdsYhr(_0x5582e7);
}
function i_jPrYkr(_0x4a7dde, _0x45cd18) {
  var _0xa633dd = document.createElement("div");
  _0xa633dd.innerHTML = i_KZnrur.replace("{{text}}", _0x45cd18).replace("{{nick}}", _0x4a7dde).replace("{{time}}", new Date().toLocaleTimeString());
  i_YJQx_r.appendChild(_0xa633dd);
  i_cNaigr(i_YJQx_r);
}
function i_EyyJTr(_0x69e8, _0x573771) {
  var _0x373c79 = document.createElement("div");
  _0x373c79.innerHTML = i_bFaalr.replace("{{text}}", _0x573771).replace("{{nick}}", _0x69e8).replace("{{time}}", new Date().toLocaleTimeString());
  i_YJQx_r.appendChild(_0x373c79);
  if (i_YJQx_r.children.length > 99) {
    i_YJQx_r.removeChild(i_YJQx_r.childNodes[0]);
  }
  i_cNaigr(i_YJQx_r);
}
function i_fGppxr(_0xcaa3b8, _0x28ac98, _0x52c1fc, _0x4e964d) {
  if (i_hefSfr == null) {
    i_jSpbdr();
  }
  var _0x35edec = document.createElement("div");
  _0x35edec.innerHTML = i_XSWHor.replace("{{text}}", _0x28ac98).replace("{{nick}}", _0xcaa3b8);
  i_HDQdvr = _0x28ac98;
  i_JdsYhr(_0x35edec);
  if (_0x4e964d != 2) {
    if (_0xcaa3b8 != i_DdTaQf.NickName) {
      var _0x34756c = document.createElement("div");
      _0x34756c.innerHTML = i_PjRTrr.replace("{{text}}", _0x28ac98).replace("{{nick}}", _0xcaa3b8).replace("{{time}}", new Date().toLocaleTimeString());
      i_YJQx_r.appendChild(_0x34756c);
      if (i_YJQx_r.children.length > 99) {
        i_YJQx_r.removeChild(i_YJQx_r.childNodes[0]);
      }
      i_cNaigr(i_YJQx_r);
    } else {
      i_jPrYkr(_0xcaa3b8, _0x28ac98);
    }
  } else {
    i_EyyJTr(_0xcaa3b8, _0x28ac98);
  }
}
function i_AfxrMr() {
  var _0x24e22e = i_hGaila(i_sxfci_("messageinput").value);
  if (_0x24e22e != "") {
    i_sxfci_("messageinput").value = "";
    i_jPrYkr(_0x24e22e);
  } else if (i_iDpHde == 0) {
    i_sxfci_("messageinput").value = "";
    i_jPrYkr("我", "单人玩呢，发啥消息啊😢");
  } else {
    var _0x440eee = i_sxfci_("messageinput").value;
    if (_0x440eee != "") {
      i_hnXPpo("message", _0x440eee);
    }
    i_sxfci_("messageinput").value = "";
  }
  i_sxfci_("messageinput").blur();
}
var i_hEJCPr = null;
function i_fhTBEr() {
  i_rHShLf(80);
}
function i_yAWnAr() {
  if (!i_hEJCPr) {
    i_hEJCPr = true;
    i_mRsncl();
    i_Hfbes_("btn_voice", function () {
      var _0x32b8a5 = document.getElementById("voiceBox");
      i_kkffJf();
      _0x32b8a5.style.color = i_PAkc_f ? (_0x32b8a5.classList.add("igwi-yinliang"), _0x32b8a5.classList.remove("igwi-jingyin1"), "") : (_0x32b8a5.classList.add("igwi-jingyin1"), _0x32b8a5.classList.remove("igwi-yinliang"), "#ff0000");
    });
    i_Hfbes_("btn_reset", function () {
      i_Frwnk();
    });
    i_Hfbes_("btn_pause", function () {
      i_DAFET();
    });
    i_Hfbes_("btn_help", function () {});
    i_Hfbes_("btn_record", function () {
      i_RchPx();
    });
    i_Hfbes_("btn_cheat", function () {
      if (i_iDpHde == 1) {
        i_xmzByr("联机模式暂不支持金手指");
      } else if (i_DdTaQf.LevelInfo.VipLevel > 0 || i_DdTaQf.LevelInfo.Svip > 0) {
        i_WwiRv_("popwin_gamecheat", "block");
      } else {
        i_xmzByr("金手指只对会员和黑暗骑士开放,谢谢支持");
        i_ankaua.ze();
      }
    });
    i_Hfbes_("cheatclose", function () {
      i_sxfci_("popwin_gamecheat").style.display = "none";
    });
    i_Hfbes_("btn_fullscreen", function (_0xb8cd55) {
      if (i_rXQKhe) {
        i_Wkbybr("iPhone请使用添加到桌面实现全屏App");
      } else if (document.body.requestFullscreen != null) {
        if (document.fullscreenElement == null) {
          document.body.requestFullscreen();
          this.style.color = "#6bff00";
          i_ankaua.Pe(3);
        } else {
          document.exitFullscreen();
          i_ankaua.Pe(4);
          this.style.color = "";
        }
      }
    });
    i_Hfbes_("btn_savemgr", function () {
      i_WwiRv_("popwin_save", "block");
    });
    i_Hfbes_("btn_closeroomcard", function () {
      i_WwiRv_("popwin_room", "block");
    });
    i_Hfbes_("inputlayout", function () {
      if (i_WwiRv_("layoutconfig", "flex")) {
        if (i_MSkKnl) {
          i_kymCil();
        }
        if (i_wCwYtl) {
          i_HWZeal();
        }
        i_PYfcds();
      }
    });
    i_Hfbes_("btn_kickapply", function () {
      i_ankaua.ue("control", "close", "");
    });
    i_WKxiJr();
    i_mASxDr();
  }
}
function i_GcpMSr(_0x476c10) {
  i_sxfci_("gamename").innerText = i_hFSCU != null ? (alert("使用了SAB"), "" + _0x476c10) : _0x476c10;
}
function i_YjDQCr() {
  i_Hfbes_("btn_cancellayout", function () {
    i_WwiRv_("layoutconfig", "flex");
    i_nszags();
  });
  i_Hfbes_("btn_resetlayout", function () {
    i_WmyDOu.Mobset = JSON.parse(JSON.stringify(i_NSYbNu));
    i_MzyCVu();
    i_xmzByr("已重置所有按键位置");
  });
  i_Hfbes_("btn_allhide", function () {
    if (i_WmyDOu.MobBase.AllHide) {
      this.style.background = "";
      i_WmyDOu.MobBase.AllHide = false;
      this.childNodes[1].innerText = "全部隐藏";
    } else {
      this.style.background = "#0478D2";
      i_WmyDOu.MobBase.AllHide = true;
      this.childNodes[1].innerText = "已隐藏";
    }
    i_MzyCVu();
  });
  i_Hfbes_("btn_savelayout", function () {
    i_WwiRv_("layoutconfig", "flex");
    i_nszags();
    i_NfcJju();
  });
  var _0x2efc29 = performance.now();
  var _0x321f40 = performance.now();
  var _0x42d1a2 = i_sxfci_("layout_size");
  var _0x3e1150 = i_sxfci_("layout_transparent");
  i_tXrZr_("layout_size_area", "touchmove", function (_0x5d5ab1) {
    var _0x1a6f4f = i_QtJCKs(_0x5d5ab1.changedTouches[0].clientX, _0x5d5ab1.changedTouches[0].clientY);
    var _0x1f12b9 = _0x42d1a2.getClientRects();
    var _0x5d3cd8 = i_QtJCKs(_0x1f12b9[0].x, _0x1f12b9[0].y);
    var _0x4430e2 = _0x1a6f4f.pn;
    _0x42d1a2.value = (_0x4430e2 - _0x5d3cd8.pn) / 1.3;
    if (_0x2efc29 + 100 < performance.now()) {
      _0x2efc29 = performance.now();
      _0x42d1a2.style.backgroundSize = _0x42d1a2.value + "% 100%";
      i_sxfci_("layoutsizetxt").innerText = (50 + _0x42d1a2.value * 150 / 100).toFixed(0) + "%";
      i_CByehs((50 + _0x42d1a2.value * 150 / 100) / 100);
    }
    _0x5d5ab1.preventDefault();
  });
  i_tXrZr_("layout_size", "change", function (_0x3af3c3) {
    this.style.backgroundSize = this.value + "% 100%";
    i_sxfci_("layoutsizetxt").innerText = (50 + this.value * 150 / 100).toFixed(0) + "%";
    i_CByehs((50 + this.value * 150 / 100) / 100);
  });
  i_tXrZr_("layout_transparent_area", "touchmove", function (_0x4bf95d) {
    var _0x772b9d = i_QtJCKs(_0x4bf95d.changedTouches[0].clientX, _0x4bf95d.changedTouches[0].clientY);
    var _0x144a25 = _0x3e1150.getClientRects();
    var _0x28babb = i_QtJCKs(_0x144a25[0].x, _0x144a25[0].y);
    var _0x2abebd = _0x772b9d.pn;
    _0x3e1150.value = (_0x2abebd - _0x28babb.pn) / 1.3;
    if (_0x321f40 + 100 < performance.now()) {
      _0x321f40 = performance.now();
      _0x3e1150.style.backgroundSize = _0x3e1150.value + "% 100%";
      i_sxfci_("layoutopttxt").innerText = _0x3e1150.value + "%";
      i_Wzzebs(_0x3e1150.value / 100);
    }
    _0x4bf95d.preventDefault();
  });
  i_tXrZr_("layout_transparent", "change", function (_0x317aa1) {
    this.style.backgroundSize = this.value + "% 100%";
    i_sxfci_("layoutopttxt").innerText = this.value + "%";
    i_Wzzebs(this.value / 100);
  });
}
function i_AJbmKr() {
  i_sxfci_("p1nick").innerText = i_DdTaQf.NickName;
  i_sxfci_("p1img").src = i_DdTaQf.HeadImg;
  i_sxfci_("Bp1nick").innerText = i_DdTaQf.NickName;
  i_sxfci_("Bp1img").src = i_DdTaQf.HeadImg;
}
function i_wfTQOr() {
  i_sxfci_("btn_tolook").style.display = "none";
}
function i_EibxXr() {
  if (i_iDpHde == 1) {
    i_sxfci_("roominfo").innerText = "房间: " + i_ZmCwpe;
  }
  i_JDzaxt = i_sxfci_("timespan");
  if (i_hFSCU != null) {
    i_sxfci_("gamename").innerText = "⚡ " + i_BThm_e;
  }
  if (i_iDpHde == 0) {
    i_sxfci_("sharetiptxt").innerText = "单机双人";
    i_Hfbes_("btn_sharegame", function () {
      if (i_HjtSei == -1) {
        i_Wkbybr("请插入手柄后，以2P玩家游戏");
      } else {
        if ((i_TBnkka = navigator.getGamepads()[i_HjtSei]) == null) {
          i_Wkbybr("请插入手柄后，以2P玩家游戏");
          return;
        }
        var _0x3fe440 = i_TBnkka.id.substr(0, i_TBnkka.id.indexOf("(Ven"));
        if (_0x3fe440 == "") {
          _0x3fe440 = i_TBnkka.id.substr(0, i_TBnkka.id.indexOf("("));
        }
        if (_0x3fe440 == "") {
          _0x3fe440 = i_TBnkka.id;
        }
        if (++i_DFBCti == 3) {
          i_DFBCti = 0;
        }
        switch (i_DFBCti) {
          case 0:
            i_xmzByr("恢复单机单人模式");
            break;
          case 1:
            i_xmzByr("进入【1P 触屏】 ，【2P 手柄摇杆】多人模式");
            break;
          case 2:
            i_xmzByr("进入【1P 手柄摇杆】 ，【2P 手柄摇杆】多人模式");
        }
      }
    });
  }
  i_fhTBEr();
  i_yAWnAr();
  i_jSpbdr();
  i_XENaLr();
  i_dGdJar();
  i_YjDQCr();
}
var i_AwMiRr = null;
var i_BDeZzr = 1;
function i_paAhIr(_0x32a6d3, _0x22e490) {
  var _0x42bc06 = _0x32a6d3;
  i_Tnctna = _0x22e490;
  if (i_iDpHde == 0) {
    i_sxfci_("p" + _0x42bc06 + "img").src = "https://static.wo1wan.com/game/close.png";
    i_sxfci_("p" + _0x42bc06 + "nick").innerText = "空";
    i_sxfci_("p" + i_BDeZzr + "img").src = i_DdTaQf.HeadImg;
    i_sxfci_("p" + i_BDeZzr + "nick").innerText = i_DdTaQf.NickName;
    i_ktCsEu(i_BDeZzr);
    i_XPSbZs(i_Kbzklo = i_BDeZzr - 1);
  } else {
    if (i_nibwYi) {
      if (i_sxfci_("p" + i_BDeZzr + "nick").innerText == "点击上位") {
        i_hnXPpo("join", i_BDeZzr + "");
      }
      return;
    }
    if (i_sxfci_("p" + i_BDeZzr + "nick").innerText != "等待连接") {
      return;
    }
    i_fdZfJi = true;
    i_wsSfso[0] = i_emcHro;
    i_wsSfso[1] = 0;
    i_bYNtOo();
    setTimeout(function () {
      i_hnXPpo("switch", i_BDeZzr + "");
    }, 200);
  }
}
function i_rMrpNr(_0x47737c) {
  i_sxfci_("pop_usercardmenu").style.display = "none";
  var _0x927dce = i_cbdGFn.UUID[i_BDeZzr - 1];
  switch (this.id) {
    case "plmenu_switch":
      i_paAhIr(0, i_BDeZzr);
      break;
    case "plmenu_open":
      i_hnXPpo("open", i_BDeZzr + "");
      break;
    case "plmenu_close":
      i_hnXPpo("close", i_BDeZzr + "");
      break;
    case "plmenu_kick":
      if (i_BThm_e.indexOf("拳皇") >= 0 && v_gui_pclink_updatetime + 30000 < performance.now()) {
        i_rrYppt("拳皇格斗进人30秒后不可踢人，请友好对战<br>");
        break;
      }
      i_hnXPpo("kick", i_BDeZzr - 1 + "");
      break;
    case "plmenu_ban":
      if (i_pjQNyo()) {
        $.post("/sayban", {
          who: _0x927dce,
          where: "jjin_" + gid + "_" + i_ZmCwpe,
          say: ""
        }, function (_0x23a3ff) {
          if (_0x23a3ff.status == "ok") {
            i_hnXPpo("message", i_cbdGFn["Nick" + i_BDeZzr] + " 被房主在本房间禁言一小时");
          } else {
            i_iZhRvt("禁言失败");
          }
        });
      } else {
        i_iZhRvt("只有房主可禁言");
      }
      break;
    case "plmenu_addfriend":
      i_TrjcCu(-1, _0x927dce, function (_0x3d96d1) {
        if (i_ankaua.ue("friend", "add", _0x3d96d1.Uid)) {
          i_xmzByr("好友请求发送成功，对方会在大厅收到消息");
        } else {
          i_Wkbybr("游戏大厅无法找到，请从大厅开始游戏");
        }
      });
      break;
    case "plmenu_report":
      i_xmzByr("畅玩大叔正在测，马上开放");
      break;
    case "plmenu_give":
      if (i_pjQNyo()) {
        i_hnXPpo("transferroom", i_BDeZzr - 1 + "");
      }
  }
}
function i_kdydUr(_0x3703f6, _0x5bdcda) {
  if (i_iDpHde != 0) {
    if (i_AwMiRr == null) {
      i_AwMiRr = i_sxfci_("pop_usercardmenu");
    }
    if ((i_BDeZzr = _0x3703f6) - 1 != i_emcHro) {
      if (i_nibwYi) {
        if (i_FZEFji["Nick" + i_BDeZzr] == "点击上位") {
          window.location.replace(window.location.origin + window.location.pathname + "?&id=" + gid + "&mode=1&sev=" + i_wesTbe + "&linkid=" + i_ZmCwpe);
        }
      } else {
        var _0x5a5205 = i_sxfci_("usermenuList");
        var _0x276de8 = i_QtJCKs(_0x5bdcda.clientX, _0x5bdcda.clientY);
        if (_0x276de8.mn + 120 > i_RFyyys.height) {
          _0x276de8.mn = i_RFyyys.height - 120;
        }
        _0x5a5205.style.left = _0x276de8.pn + "px";
        _0x5a5205.style.top = _0x276de8.mn + "px";
        i_AwMiRr.style.display = "block";
        $("[name=plmenuitem]").hide();
        if (i_FZEFji["Nick" + i_BDeZzr] == "等待连接") {
          i_sxfci_("plmenu_switch").style.display = "block";
          i_sxfci_("plmenu_close").style.display = "block";
        } else if (i_FZEFji["Nick" + i_BDeZzr] == "*关闭*") {
          i_sxfci_("plmenu_switch").style.display = "block";
          i_sxfci_("plmenu_open").style.display = "block";
        } else {
          if (i_pjQNyo()) {
            i_sxfci_("plmenu_kick").style.display = "block";
            i_sxfci_("plmenu_ban").style.display = "block";
            i_sxfci_("plmenu_give").style.display = "block";
          }
          i_sxfci_("plmenu_addfriend").style.display = "block";
        }
      }
    }
  } else {
    i_paAhIr(i_BDeZzr, i_BDeZzr = _0x3703f6);
  }
}
function i_mASxDr() {
  i_Hfbes_("btn_showquickmsg", function () {
    i_WwiRv_("quickBox", "block");
  });
  i_cirYl_("quickMessage", function (_0x883bfe) {
    i_WwiRv_("quickBox", "block");
    if (i_iDpHde == 0) {
      i_Wkbybr("单人玩呢，发啥消息啊😢");
    } else {
      i_hnXPpo("message", this.innerText);
    }
  });
  i_Hfbes_("tab_roomchat", function () {
    i_sxfci_("chatpanel").style.display = "block";
    i_sxfci_("watchpanel").style.display = "none";
    i_sxfci_("tab_roomchat").classList.add("switchChatAndWatch");
    i_sxfci_("tab_roomwatch").classList.remove("switchChatAndWatch");
  });
  i_Hfbes_("tab_roomwatch", function () {
    i_sxfci_("chatpanel").style.display = "none";
    i_sxfci_("watchpanel").style.display = "block";
    i_sxfci_("tab_roomchat").classList.remove("switchChatAndWatch");
    i_sxfci_("tab_roomwatch").classList.add("switchChatAndWatch");
  });
  i_Hfbes_("p1card", function (_0x42cfcf) {
    i_kdydUr(1, _0x42cfcf);
  });
  i_Hfbes_("p2card", function (_0x4e8c5c) {
    i_kdydUr(2, _0x4e8c5c);
  });
  i_Hfbes_("p3card", function (_0x540ceb) {
    i_kdydUr(3, _0x540ceb);
  });
  i_Hfbes_("p4card", function (_0xd02f57) {
    i_kdydUr(4, _0xd02f57);
  });
  i_cirYl_("plmenuitem", i_rMrpNr);
  i_Hfbes_("menuOverlay", function () {
    i_sxfci_("pop_usercardmenu").style.display = "none";
  });
  i_Hfbes_("btn_tolook", function () {
    window.location.replace(window.location.origin + window.location.pathname + "?&look=1&id=" + gid + "&mode=1&sev=" + i_wesTbe + "&linkid=" + i_ZmCwpe);
  });
}
var i_wPSp$r = 0;
function i_nZYEBr(_0x561a47, _0x3b8d9d) {
  i_wPSp$r = _0x561a47;
  i_sxfci_("btn_save_write").classList.remove("preservationAct");
  if (_0x3b8d9d.innerText != "空" && _0x3b8d9d.innerText != "") {
    i_sxfci_("btn_save_read").classList.remove("PrivateBtn_readact");
  } else {
    i_sxfci_("btn_save_read").classList.add("PrivateBtn_readact");
  }
}
function i_QWiaGr() {
  if (i_wPSp$r > 6 && i_DdTaQf.LevelInfo.Svip <= 0) {
    i_Wkbybr("<p style='color: #b15dff'>请开通黑暗骑士解锁该云存档位<br>黑暗骑士到期后存档永久存在，可随时续费使用</p>");
    i_ankaua.ze("svip");
    return;
  } else if (i_wPSp$r > 4 && i_DdTaQf.LevelInfo.Svip <= 0 && i_DdTaQf.LevelInfo.Vip <= 0) {
    i_Wkbybr("<p style='color: #b15dff'>请开通会员解锁该云存档位<br>会员到期后存档永久存在，可随时续费使用</p>");
    i_ankaua.ze();
    return;
  } else {
    i_WmWryu(i_wPSp$r);
    return;
  }
}
function i_EMQDFr() {
  if (!(this.className.indexOf("PrivateBtn_readact") >= 0)) {
    i_ZjZkwu(i_wPSp$r);
  }
}
function i_XENaLr() {
  i_Hfbes_("btn_save_close", function () {
    i_WwiRv_("popwin_save", "block");
  });
  i_Hfbes_("btn_save_write", i_QWiaGr);
  i_Hfbes_("btn_save_read", i_EMQDFr);
  i_Hfbes_("card_save1", function () {
    i_dhBiu_("savecard", function (_0x537125) {
      _0x537125.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(1, i_sxfci_("sv1time"));
  });
  i_Hfbes_("card_save2", function () {
    i_dhBiu_("savecard", function (_0x416607) {
      _0x416607.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(2, i_sxfci_("sv2time"));
  });
  i_Hfbes_("card_save3", function () {
    i_dhBiu_("savecard", function (_0x3ccfbd) {
      _0x3ccfbd.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(3, i_sxfci_("sv3time"));
  });
  i_Hfbes_("card_save4", function () {
    i_dhBiu_("savecard", function (_0x2de040) {
      _0x2de040.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(4, i_sxfci_("sv4time"));
  });
  i_Hfbes_("card_save5", function () {
    i_dhBiu_("savecard", function (_0x22fd48) {
      _0x22fd48.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(5, i_sxfci_("sv5time"));
  });
  i_Hfbes_("card_save6", function () {
    i_dhBiu_("savecard", function (_0x5d1fd5) {
      _0x5d1fd5.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(6, i_sxfci_("sv6time"));
  });
  i_Hfbes_("card_save7", function () {
    i_dhBiu_("savecard", function (_0x2d581f) {
      _0x2d581f.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(7, i_sxfci_("sv7time"));
  });
  i_Hfbes_("card_save8", function () {
    i_dhBiu_("savecard", function (_0xa38f85) {
      _0xa38f85.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    i_nZYEBr(8, i_sxfci_("sv8time"));
  });
  var _0x562080 = new XMLHttpRequest();
  _0x562080.open("GET", "/" + i_kJwtg + "/svload?game=" + gid, true);
  _0x562080.responseType = "json";
  _0x562080.onreadystatechange = function () {
    if (_0x562080.readyState == XMLHttpRequest.DONE && _0x562080.status == 200) {
      var _0x38b5c9 = _0x562080.response;
      i_kJKK$t = _0x38b5c9;
      i_NcxYqr();
    }
  };
  _0x562080.send();
}
function i_NcxYqr() {
  if (i_kJKK$t.sv1 == 1) {
    $("#sv1time").html(i_kJKK$t.st1);
    if (i_cQmQBt.d1i == null) {
      i_cQmQBt.d1i = "/" + i_kJwtg + "/lsvimg?sid=1&game=" + gid;
    }
    i_sxfci_("sv1img").src = i_cQmQBt.d1i;
  } else {
    $("#sv1time").html("");
    i_sxfci_("sv1img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.sv2 == 1) {
    $("#sv2time").html(i_kJKK$t.st2);
    if (i_cQmQBt.d2i == null) {
      i_cQmQBt.d2i = "/" + i_kJwtg + "/lsvimg?sid=2&game=" + gid;
    }
    i_sxfci_("sv2img").src = i_cQmQBt.d2i;
  } else {
    $("#sv2time").html("");
    i_sxfci_("sv2img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.sv3 == 1) {
    $("#sv3time").html(i_kJKK$t.st3);
    if (i_cQmQBt.d3i == null) {
      i_cQmQBt.d3i = "/" + i_kJwtg + "/lsvimg?sid=3&game=" + gid;
    }
    i_sxfci_("sv3img").src = i_cQmQBt.d3i;
  } else {
    $("#sv3time").html("");
    i_sxfci_("sv3img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.sv4 == 1) {
    $("#sv4time").html(i_kJKK$t.st4);
    if (i_cQmQBt.d4i == null) {
      i_cQmQBt.d4i = "/" + i_kJwtg + "/lsvimg?sid=4&game=" + gid;
    }
    i_sxfci_("sv4img").src = i_cQmQBt.d4i;
  } else {
    $("#sv4time").html("");
    i_sxfci_("sv4img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.W == 1) {
    $("#sv5time").html(i_kJKK$t.J);
    if (i_cQmQBt.Z == null) {
      i_cQmQBt.Z = "/" + i_kJwtg + "/lsvimg?sid=5&game=" + gid;
    }
    i_sxfci_("sv5img").src = i_cQmQBt.Z;
  } else {
    $("#sv5time").html("");
    i_sxfci_("sv5img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.ee == 1) {
    $("#sv6time").html(i_kJKK$t.ne);
    if (i_cQmQBt.te == null) {
      i_cQmQBt.te = "/" + i_kJwtg + "/lsvimg?sid=6&game=" + gid;
    }
    i_sxfci_("sv6img").src = i_cQmQBt.te;
  } else {
    $("#sv6time").html("");
    i_sxfci_("sv6img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.ae == 1) {
    $("#sv7time").html(i_kJKK$t.ie);
    if (i_cQmQBt.oe == null) {
      i_cQmQBt.oe = "/" + i_kJwtg + "/lsvimg?sid=7&game=" + gid;
    }
    i_sxfci_("sv7img").src = i_cQmQBt.oe;
  } else {
    $("#sv7time").html("");
    i_sxfci_("sv7img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (i_kJKK$t.ce == 1) {
    $("#sv8time").html(i_kJKK$t.re);
    if (i_cQmQBt.le == null) {
      i_cQmQBt.le = "/" + i_kJwtg + "/lsvimg?sid=8&game=" + gid;
    }
    i_sxfci_("sv8img").src = i_cQmQBt.le;
  } else {
    $("#sv8time").html("");
    i_sxfci_("sv8img").src = "https://static.wo1wan.com/game/empsv.png";
  }
}
function i_PNGrVr() {
  var _0x3da4b2 = new XMLHttpRequest();
  _0x3da4b2.open("POST", "/" + i_kJwtg + "/svupdate?game=" + gid, true);
  _0x3da4b2.setRequestHeader("Content-type", "application/json");
  _0x3da4b2.onreadystatechange = function () {
    if (_0x3da4b2.readyState == XMLHttpRequest.DONE) {
      _0x3da4b2.status;
    }
  };
  _0x3da4b2.send(JSON.stringify(i_kJKK$t));
  i_NcxYqr();
}
function i_etMQjr() {
  var _0x344dcf = i_sxfci_("baseWidthTxt");
  var _0x116aa8 = i_sxfci_("baseHeightTxt");
  var _0x50a394 = i_sxfci_("basicRangeWidth");
  var _0x8b4fb9 = i_sxfci_("basicRangeHeight");
  _0x344dcf.innerText = _0x50a394.value + "%";
  _0x50a394.style.backgroundSize = (_0x50a394.value - 40) / 60 * 100 + "%,100%";
  _0x116aa8.innerText = _0x8b4fb9.value + "%";
  _0x8b4fb9.style.backgroundSize = (_0x8b4fb9.value - 30) / 70 * 100 + "%,100%";
  document.body.style.setProperty("--screenwidth", _0x50a394.value + "%");
  if (i_WmyDOu.MobBase.Lock43) {
    document.body.style.setProperty("--screenheight", i_sxfci_("whathis").offsetWidth / 4 * 3 + "px");
  } else {
    document.body.style.setProperty("--screenheight", _0x8b4fb9.value + "%");
  }
  document.body.style.setProperty("--sceenleft", (100 - _0x50a394.value) / 2 + "%");
  i_WmyDOu.MobBase.Width = _0x50a394.value;
  i_WmyDOu.MobBase.Height = _0x8b4fb9.value;
}
function i_jCWyYr() {
  var _0xd28bd7 = i_sxfci_("boostSpeedTxt");
  var _0x40a78 = i_sxfci_("boostSpeed");
  _0x40a78.style.backgroundSize = _0x40a78.value / 8 * 100 + "%,100%";
  _0xd28bd7.innerText = " 一秒" + Math.floor(60 / ((9 - parseInt(_0x40a78.value)) * 2)) + "次";
  i_WmyDOu.gSuperSpeed = parseInt(_0x40a78.value);
  i_XFSipu(i_WmyDOu.gSuperSpeed);
}
function i_WTCyHr() {
  i_tXrZr_("cb_vidstyle", "change", function (_0x2b6ca2) {
    i_ZcmNFu(this.checked);
  });
  i_tXrZr_("sizeset_zone", "touchstart", function () {
    i_sxfci_("SetUp").style.opacity = "0.7";
  });
  i_tXrZr_("sizeset_zone", "touchend", function () {
    i_sxfci_("SetUp").style.opacity = "";
  });
  i_rBKib_("basicRangeWidth", function (_0x1e8cfa) {
    if (i_WmyDOu.MobBase.Lock43) {
      i_sxfci_("basicRangeHeight").value = _0x1e8cfa.value / 4 * 3;
    }
    i_etMQjr();
  });
  i_rBKib_("basicRangeHeight", function (_0x3eb176) {
    i_etMQjr();
  });
  i_rBKib_("boostSpeed", function (_0x34e9a5) {
    i_jCWyYr();
  });
  i_tXrZr_("cb_lock43", "change", function (_0x41ae44) {
    i_WmyDOu.MobBase.Lock43 = this.checked;
    if (this.checked) {
      i_sxfci_("basicRangeHeight").disabled = true;
    } else {
      i_sxfci_("basicRangeHeight").disabled = false;
    }
  });
}
function i_fKBDWr(_0x3ad4f1) {
  document.getElementById("cb_xbtnA").checked = i_WmyDOu["gExtX" + _0x3ad4f1 + "Key"] & 1;
  document.getElementById("cb_xbtnB").checked = i_WmyDOu["gExtX" + _0x3ad4f1 + "Key"] & 2;
  document.getElementById("cb_xbtnC").checked = i_WmyDOu["gExtX" + _0x3ad4f1 + "Key"] & 4;
  document.getElementById("cb_xbtnD").checked = i_WmyDOu["gExtX" + _0x3ad4f1 + "Key"] & 8;
  document.getElementById("cb_xbtnE").checked = i_WmyDOu["gExtX" + _0x3ad4f1 + "Key"] & 16;
  document.getElementById("cb_xbtnF").checked = i_WmyDOu["gExtX" + _0x3ad4f1 + "Key"] & 32;
}
function i_WKxiJr() {
  i_Hfbes_("btn_setting", function () {
    i_WwiRv_("SetUp", "block");
    i_kymCil();
  });
  i_Hfbes_("setupover", function () {
    i_WwiRv_("SetUp", "block");
    i_JcAsUu();
  });
  i_Hfbes_("setupclose", function () {
    i_WwiRv_("SetUp", "block");
    i_JcAsUu();
  });
  var _0x127b49 = document.getElementById("basics");
  var _0x50367e = document.getElementById("peripheral");
  var _0x4b7ea1 = document.getElementById("gesturel");
  var _0x22a88b = document.getElementById("roomSet");
  i_Hfbes_("basicset", function () {
    _0x127b49.style.display = "block";
    _0x22a88b.style.display = "none";
    _0x50367e.style.display = "none";
    _0x4b7ea1.style.display = "none";
  });
  i_Hfbes_("inroomset", function () {
    _0x22a88b.style.display = "block";
    _0x127b49.style.display = "none";
    _0x50367e.style.display = "none";
    _0x4b7ea1.style.display = "none";
  });
  i_Hfbes_("extinputset", function () {
    _0x50367e.style.display = "block";
    _0x22a88b.style.display = "none";
    _0x127b49.style.display = "none";
    _0x4b7ea1.style.display = "none";
  });
  i_Hfbes_("superkeyset", function () {
    _0x50367e.style.display = "none";
    _0x22a88b.style.display = "none";
    _0x127b49.style.display = "none";
    _0x4b7ea1.style.display = "block";
  });
  $(".SetUpLeft_tab").click(function () {
    $(this).siblings(".SetUpLeft_tab").removeClass("SetUpLeft_active");
    $(this).addClass("SetUpLeft_active");
  });
  i_RyHcQr();
  i_PYeZel();
  i_WTCyHr();
}
function i_RyHcQr() {
  var _0x52624c = i_sxfci_("selectOptionBox");
  var _0xfb4c8a = i_sxfci_("optionDown");
  i_Hfbes_("devchange", function () {
    if (_0xfb4c8a.className === "optionDown") {
      _0x52624c.style.display = "block";
      _0xfb4c8a.classList.add("optionDownRev");
      _0xfb4c8a.classList.remove("optionDown");
    } else {
      _0x52624c.style.display = "none";
      _0xfb4c8a.classList.add("optionDown");
      _0xfb4c8a.classList.remove("optionDownRev");
    }
  });
  i_bTXGHs();
}
var i_TaiyZr = "gExtX1";
function i_PYeZel() {
  $("._com_Tab div").click(function () {
    $(this).siblings("._com_Tab div").removeClass("_com_TabAct");
    $(this).siblings("._com_Tab div").addClass("other_com_TabAct");
    $(this).addClass("_com_TabAct");
    $(this).removeClass("other_com_TabAct");
  });
  i_cirYl_("extkeytab", function (_0x4723c6) {
    i_TaiyZr = i_Brhwo_(_0x4723c6.target);
    i_sxfci_("cb_xbtnSwitch").checked = i_WmyDOu[i_TaiyZr];
    i_fKBDWr(i_TaiyZr.replace("gExtX", ""));
  });
  i_tXrZr_("cb_xbtnSwitch", "change", function (_0x57b24d) {
    i_WmyDOu[i_TaiyZr] = this.checked;
    i_MzyCVu();
  });
  i_ZKQCf_("cb_xbtnList", "change", function () {
    var _0x24017a = i_TaiyZr.replace("gExtX", "");
    switch (this.id) {
      case "cb_xbtnA":
        if (this.checked) {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] |= 1;
        } else {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] &= ~1;
        }
        break;
      case "cb_xbtnB":
        if (this.checked) {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] |= 2;
        } else {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] &= ~2;
        }
        break;
      case "cb_xbtnC":
        if (this.checked) {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] |= 4;
        } else {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] &= ~4;
        }
        break;
      case "cb_xbtnD":
        if (this.checked) {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] |= 8;
        } else {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] &= ~8;
        }
        break;
      case "cb_xbtnE":
        if (this.checked) {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] |= 16;
        } else {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] &= ~16;
        }
        break;
      case "cb_xbtnF":
        if (this.checked) {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] |= 32;
        } else {
          i_WmyDOu["gExtX" + _0x24017a + "Key"] &= ~32;
        }
    }
  });
}
var i_MSkKnl = false;
var i_wCwYtl = true;
function i_HWZeal() {
  i_wCwYtl = !i_wCwYtl;
  var _0x3f8e64 = i_sxfci_("game_");
  if (i_wCwYtl == 0) {
    _0x3f8e64.classList.remove("game_playeract");
  } else {
    _0x3f8e64.classList.add("game_playeract");
  }
  var _0x9a95bd = i_sxfci_("top_left");
  if (i_wCwYtl == 0) {
    _0x9a95bd.classList.remove("pack_upact");
    _0x9a95bd.children[0].classList.remove("igwi-chacha1");
    _0x9a95bd.children[0].classList.add("igwi-gengduo2");
  } else {
    _0x9a95bd.classList.add("pack_upact");
    _0x9a95bd.children[0].classList.remove("igwi-gengduo2");
    _0x9a95bd.children[0].classList.add("igwi-chacha1");
  }
}
function i_kymCil() {
  i_MSkKnl = i_WwiRv_("toolsBounce", "block") ? (i_sxfci_("toolsBtn").style.color = "#F9D342", true) : (i_sxfci_("toolsBtn").style.color = "", false);
}
var i_kpKwol = 1;
function i_mRsncl() {
  i_Hfbes_("top_left", i_HWZeal);
  i_Hfbes_("toolsBtn", i_kymCil);
  i_HWZeal();
  i_Hfbes_("chatBtn", function () {
    i_WwiRv_("popwin_room", "block");
  });
  i_Hfbes_("btn_expandPlayer", function () {
    i_WwiRv_("popwin_room", "block");
  });
  if (i_iDpHde == 1) {
    i_sxfci_("speedbtn").style.display = "none";
  } else {
    i_Hfbes_("speedbtn", function () {
      this.style.color = i_kpKwol < 8 ? (i_kpKwol *= 2, this.innerHTML = i_kpKwol + "X", "#ff0000") : (i_kpKwol = 1, this.innerHTML = "加速", "#fff");
      i_bkNDhu(i_kpKwol);
    });
  }
}
function i_NeMSsl() {}
var i_CcCZrl = -9999000;
function i_WBYHll() {
  if (i_CcCZrl + 300000 > performance.now()) {
    i_iZhRvt("5分钟只能邀请一次");
  } else {
    i_CcCZrl = performance.now();
    if (i_sxfci_("txt_shareinfo").value != "") {
      $.ajax("https://world.wo1wan.com/sharegame", {
        type: "POST",
        async: true,
        data: {
          gtype: "fc",
          gamename: i_BThm_e,
          gid: gid,
          lid: i_ZmCwpe,
          call: "watch",
          max: i_ZHidMe,
          now: i_xjHeZi,
          pass: "",
          sev: i_hkNr_o,
          msg: i_sxfci_("txt_shareinfo").value,
          se: i_YHmAt_("igwflyfree")
        },
        crossDomain: true,
        xhrFields: {
          withCredentials: false
        },
        success: function (_0x16a171, _0x158947, _0x52dd2f) {
          if (_0x16a171.status == "ok") {
            i_rrYppt("邀请发送成功，等待伙伴到来吧");
          } else {
            i_iZhRvt("邀请发送失败");
          }
        }
      });
      i_sxfci_("popwin_sharegame").style.display = "none";
    } else {
      i_iZhRvt("请先输入邀请信息");
    }
  }
}
var i_dPmwul = 0;
var i_sQwkfl = 0;
var i_njFT_l = false;
function i_Bsazvl() {
  var _0x48a483 = $(".replay-slider");
  var _0x48e386 = $(".replay-slider__range");
  var _0xf04759 = $(".replay-slider__value");
  _0x48a483.each(function () {
    _0x48e386.on("input", function () {
      switch (this.id) {
        case "ctlRepRan":
          var _0x42da02 = 1000 / 60 * this.value / 1000;
          _0x42da02 = "0" + Math.floor(_0x42da02 / 3600) + ":" + Math.floor(_0x42da02 / 60) % 60 + ":" + Math.floor(_0x42da02 % 60);
          $(this).next(_0xf04759).html(_0x42da02);
          i_heWQTl(this.value);
          break;
        case "repspeedRan":
          $(this).next(_0xf04759).html(this.value);
          i_XFSipu(this.value);
          i_WmyDOu.gSuperSpeed = parseInt(this.value);
      }
    });
    _0xf04759.each(function () {
      var _0x18b273 = $(this).prev().attr("value");
      $(this).html(_0x18b273);
    });
  });
}
function i_mBphdl(_0x45c0a5) {
  if (i_njFT_l) {
    var _0x294b67 = 1000 / 60 * (i_dPmwul = _0x45c0a5) / 1000;
    if (i_iDQBme) {
      cyc_queryID("ctlRepValMax").innerText = "0" + Math.floor(_0x294b67 / 3600) + ":" + Math.floor(_0x294b67 / 60) % 60 + ":" + Math.floor(_0x294b67 % 60);
      cyc_queryID("ctlRepRan").max = _0x45c0a5;
    }
    if (Math.floor(_0x294b67 / 3600) > 10) {
      i_iZhRvt("房间超过10小时，暂不支持观战");
    }
  }
}
function i_jYGKpl(_0x914f68) {
  if (i_njFT_l) {
    var _0x1b5e7e = 1000 / 60 * (i_sQwkfl = _0x914f68) / 1000;
    if (i_dPmwul < i_sQwkfl + 60 && i_EtKHbl) {
      i_iZhRvt("录像回放结束");
    }
    cyc_queryID("ctlRepRan").value = Math.floor(i_sQwkfl / i_dPmwul * i_dPmwul);
    cyc_queryID("ctlRepVal").innerText = "0" + Math.floor(_0x1b5e7e / 3600) + ":" + Math.floor(_0x1b5e7e / 60) % 60 + ":" + Math.floor(_0x1b5e7e % 60);
  }
}
function i_TEpTml() {
  i_njFT_l = true;
}
var i_jejYK = -1000000;
function i_wSYXgl() {
  if (i_iDpHde == 1) {
    if (i_Kbzklo == i_emcHro) {
      if (performance.now() < 60000) {
        i_iZhRvt("录像长度小于一分钟，不允许保存");
      } else if (performance.now() - i_jejYK < 60000) {
        i_iZhRvt("一分钟内只允许保存一次");
      } else {
        i_jejYK = performance.now();
        i_hnXPpo("savereplay", "");
      }
    } else {
      i_iZhRvt("目前只允许房主保存房间录像");
    }
  } else {
    i_iZhRvt("只有联机模式才允许保存录像");
  }
}
var i_fJyphl = null;
var i_EtKHbl = false;
function i_icQdyl() {
  $("#gamemode").text("录像回放");
  cyc_queryID("replayctl").style.display = "block";
  cyc_queryID("pcmsg").style.top = "calc(70% + 60px)";
  cyc_queryID("pcmsg").style.height = "calc(28% - 48px)";
  document.getElementsByName("closep").forEach(function (_0xe44745) {
    _0xe44745.style.display = "none";
  });
  cyc_queryID("calljoin").style.display = "none";
  cyc_queryID("Repspan").innerText = "录像回放";
  cyc_queryID("repsset").style.display = "inline-block";
  cyc_queryID("SaveReplay").style.display = "none";
  i_Bsazvl();
}
function i_Newnwl(_0x1fc90f, _0x24d09e) {
  SendBigCommand(i_cZwcUl.gn, _0x1fc90f, _0x24d09e);
}
function i_SWyJkl(_0x3f97f2) {
  SendBigCommand(i_cZwcUl.hn, _0x3f97f2, 0);
}
function i_heWQTl(_0x1b34f3) {
  if (i_EtKHbl) {
    SendBigCommand(i_cZwcUl.bn, _0x1b34f3);
  }
}
function i_nZDNxl() {
  i_EtKHbl = true;
  gid = parseInt(i_nbDGge) + 1000000;
  i_njFT_l = true;
  $.get("/replay/info?rid=" + i_nbDGge, function (_0x543e25) {
    i_iZhRvt("正在观看 " + (i_fJyphl = _0x543e25).ReplayName);
    i_mBphdl(_0x543e25.ReplayLen);
  });
  if (i_iDQBme) {
    i_icQdyl();
  }
}
function i_YijrMl() {
  gid = i_fJyphl.GameID;
  i_Newnwl(i_fJyphl.ReplayLen, i_fJyphl.GameID);
}
function i_FHkTPl(_0x136705) {}
function i_HBySEl() {
  cyc_queryID("linkmsg").addEventListener("click", function (_0x12b993) {
    var _0x59a8a6 = _0x12b993.target;
    if (_0x59a8a6.className.indexOf("banicon") > 1) {
      var _0x34271f = _0x59a8a6.nextSibling.innerText.substr(0, _0x59a8a6.nextSibling.innerText.indexOf(": "));
      var _0x4602a8 = _0x59a8a6.parentElement.innerText.substr(_0x59a8a6.parentElement.innerText.indexOf(": ") + 2);
      _0x4602a8 = _0x4602a8.substr(0, _0x4602a8.length - 1);
      $.post("/sayban", {
        who: _0x34271f,
        where: "jjin_" + gid + "_" + i_ZmCwpe,
        say: _0x4602a8 + ""
      }, function (_0x4b9db9) {
        if (_0x4b9db9.status == "ok") {
          i_hnXPpo("message", _0x34271f + " 被玩家 " + (i_emcHro + 1) + " 在本房间禁言一小时");
        } else {
          i_iZhRvt("禁言失败");
        }
      });
    }
  });
}
var i_iZEzAl = {
  yn: false
};
function i_CzBHSl() {
  i_iZEzAl.yn = true;
}
function i_HxJwCl() {
  if (i_snTDve) {
    var _0x2919c4 = i_tdBda_("look");
    i_DYNBTe.postMessage({
      act: "init",
      1: gid,
      2: -1,
      5: i_NXdZKf.sampleRate,
      3: i_rNzMye,
      4: i_zrnPwe,
      6: i_trmnke,
      16: i_iDpHde,
      17: i_ZmCwpe,
      18: i_iDQBme,
      19: _0x2919c4,
      sab: i_hFSCU,
      sabi: i_kAGRD
    });
  } else {
    setTimeout(i_HxJwCl, 3000);
  }
}
function i_DPmFKl(_0x3f8808) {
  if (_0x3f8808.data.byteLength != 4) {
    if (_0x3f8808.data.act == "init") {
      i_HxJwCl();
    } else if (_0x3f8808.data.act == "go") {
      i_cNjsB_ = _0x3f8808.data[i_esjAjl];
      i_ZHidMe = _0x3f8808.data[i_XcWfHl];
      i_thkew_.width = _0x3f8808.data[i_CSsKql];
      i_thkew_.height = _0x3f8808.data[i_WKTXVl];
      if (i_thkew_.width < i_thkew_.height) {
        var _0x1f92d0 = i_thkew_.width;
        i_thkew_.width = i_thkew_.height;
        i_thkew_.height = _0x1f92d0;
        i_TBJJz_ = true;
      }
      i_kRDkS_ = i_thkew_.width;
      i_kPQcC_ = i_thkew_.height;
      if (i_iDQBme) {
        i_thkew_.width *= i_yhDYO_;
        i_thkew_.height *= i_yhDYO_;
      }
      ctlEnable = _0x3f8808.data[i_FXhQYl];
      i_ecCpE_ = i_CrAfx_();
      i_dHGrA_ = i_chNJM_;
      i_kNJaU_();
      i_CzBHSl();
      if (i_iDQBme) {
        i_DYNBTe.onmessage = i_hDFGNl;
        setTimeout(i_wbiGr, 3000);
        i_Gphxdn(100);
      } else {
        i_DYNBTe.onmessage = i_hDFGNl;
        i_pPaJir(100);
      }
      if (i_iDpHde == 1) {
        i_ckezgo();
      }
    } else if (_0x3f8808.data.act == "process") {
      if (_0x3f8808.data.pos == -1) {
        i_sxfci_("loadingimg").src = "./img/loadfail.png";
      } else if (!(_0x3f8808.data.pos == -2)) {
        if (i_iDQBme) {
          i_Gphxdn(_0x3f8808.data.pos);
        } else {
          i_pPaJir(_0x3f8808.data.pos);
        }
      }
    } else {
      i_zXJHnu(i_cZwcUl.vn, i_iChyAi & 255, i_iChyAi / 256);
    }
    if (i_EtKHbl) {
      i_YijrMl();
    }
  } else {
    i_KKCaXl(_0x3f8808.data);
  }
}
i_iZEzAl.s = function () {
  i_bAiBbu(0);
};
i_iZEzAl.l = function () {
  i_bAiBbu(1);
};
i_iZEzAl.wn = function (_0x62f39e) {
  i_bkNDhu(_0x62f39e);
};
i_iZEzAl.kn = function (_0x1e5203) {
  i_piEjku(_0x1e5203);
};
var i_WNFHOl = 74565;
function i_KKCaXl(_0x184d40) {
  var _0xf1e26d = _0x184d40[0];
  if (_0xf1e26d == i_cZwcUl.Tn) {
    i_TBswui();
  } else if (_0xf1e26d == i_cZwcUl.xn) {
    var _0xf5bb29 = _0x184d40[2];
    if (_0x184d40[1] == 1) {
      var _0x4fcf94 = i_wccDd_();
      var _0x575595 = i_PZAFm_(_0x4fcf94);
      var _0x2b8f18 = new XMLHttpRequest();
      _0x2b8f18.open("POST", "/fc/svimg?sid=" + _0xf5bb29 + "&game=" + gid, true);
      _0x2b8f18.setRequestHeader("Content-type", "application/octet-stream");
      _0x2b8f18.onreadystatechange = function () {
        if (_0x2b8f18.readyState == XMLHttpRequest.DONE && _0x2b8f18.status == 200) {
          var _0x52f4e1 = new Date();
          switch (_0xf5bb29) {
            case 1:
              i_kJKK$t.sv1 = 1;
              i_kJKK$t.st1 = _0x52f4e1.toLocaleString();
              i_cQmQBt.d1 = 1;
              i_cQmQBt.d1i = _0x4fcf94;
              break;
            case 2:
              i_kJKK$t.sv2 = 1;
              i_kJKK$t.st2 = _0x52f4e1.toLocaleString();
              i_cQmQBt.d2 = 1;
              i_cQmQBt.d2i = _0x4fcf94;
              break;
            case 3:
              i_kJKK$t.sv3 = 1;
              i_kJKK$t.st3 = _0x52f4e1.toLocaleString();
              i_cQmQBt.d3 = 1;
              i_cQmQBt.d3i = _0x4fcf94;
              break;
            case 4:
              i_kJKK$t.sv4 = 1;
              i_kJKK$t.st4 = _0x52f4e1.toLocaleString();
              i_cQmQBt.d4 = 1;
              i_cQmQBt.d4i = _0x4fcf94;
              break;
            case 5:
              i_kJKK$t.W = 1;
              i_kJKK$t.J = _0x52f4e1.toLocaleString();
              i_cQmQBt.Mn = 1;
              i_cQmQBt.Z = _0x4fcf94;
              break;
            case 6:
              i_kJKK$t.ee = 1;
              i_kJKK$t.ne = _0x52f4e1.toLocaleString();
              i_cQmQBt.Pn = 1;
              i_cQmQBt.te = _0x4fcf94;
              break;
            case 7:
              i_kJKK$t.ae = 1;
              i_kJKK$t.ie = _0x52f4e1.toLocaleString();
              i_cQmQBt.En = 1;
              i_cQmQBt.oe = _0x4fcf94;
              break;
            case 8:
              i_kJKK$t.ce = 1;
              i_kJKK$t.re = _0x52f4e1.toLocaleString();
              i_cQmQBt.An = 1;
              i_cQmQBt.le = _0x4fcf94;
          }
          i_TkwGLt();
          if (i_iDQBme) {
            i_smExYt(_0xf5bb29);
          }
        }
      };
      _0x2b8f18.send(_0x575595);
    }
  } else {
    if (_0xf1e26d == i_cZwcUl.Sn) {
      _0xf5bb29 = _0x184d40[2];
      if (i_iDQBme) {
        i_MKbRHt(_0xf5bb29);
      }
      return;
    }
    if (_0xf1e26d == i_cZwcUl.Cn) {
      if (_0x184d40[1] == 1) {
        i_ePsnwo();
      } else {
        i_sCnmko();
      }
    } else if (_0xf1e26d == i_cZwcUl.Kn) {
      if (gid < 99999) {
        i_MNhEfn();
      }
    } else if (_0xf1e26d == i_cZwcUl.On) {
      i_sEwEen("延时过高,请稍后");
    }
  }
}
var i_jpiRRl = 100;
var i_Hkrhzl = 0;
function i_iWZGIl(_0x2f9322, _0x38a678) {
  i_DQjNRf.push(_0x2f9322);
  if (i_MjAfV != null) {
    i_MjAfV[i_NxPXW] = i_DQjNRf.length;
  }
}
function i_hDFGNl(_0x132ddb) {
  if (_0x132ddb.data.byteLength != 4) {
    if (_0x132ddb.data.byteLength != 24) {
      if (i_iDpHde == 1) {
        if (_0x132ddb.data.byteLength < 2048) {
          i_KatGXo(_0x132ddb.data);
          if (_0x132ddb.data.byteLength == 16) {
            var _0x4f95cd = new Uint32Array(_0x132ddb.data);
            if (_0x4f95cd[0] % 60 == 0) {
              i_hErJXt(_0x4f95cd[0]);
            }
          }
          return;
        }
      } else {
        i_hErJXt(i_MChKiu);
      }
      i_MChKiu++;
      i_WEwySe++;
      if (i_kAGRD != null) {
        var _0x59e36f = i_kAGRD;
      } else {
        _0x59e36f = _0x132ddb.data;
      }
      if (i_PAkc_f && i_bhkMMf && i_MChKiu > 5 && !i_GbdzSf) {
        var _0x2e8260 = new Int32Array(_0x59e36f, 0, 1024);
        i_cNjsB_ = _0x2e8260[0];
        if (i_pwwhGf != null) {
          var _0x2cd6fd = 0;
          for (; _0x2cd6fd < i_cNjsB_; _0x2cd6fd++) {
            if (i_SEwKkf <= i_bjXRwf) {
              i_bjXRwf = 0;
            }
            i_asXxpf[i_bjXRwf] = _0x2e8260[_0x2cd6fd + 1] / 6553.5;
            i_bjXRwf++;
          }
          Atomics.add(i_XFNiFf, 0, i_cNjsB_);
          i_MjAfV[i_NxPXW] = i_XFNiFf[1] / 1024;
        } else {
          for (_0x2cd6fd = 0; _0x2cd6fd < i_cNjsB_ && (i_bjXRwf >= 102400 && (i_bjXRwf = 0), !(i_akCNBf < i_iWFTUf - i_pTEbDf)); _0x2cd6fd++) {
            i_daHxIf[i_bjXRwf] = _0x2e8260[_0x2cd6fd + 1] / 6553.5;
            i_bjXRwf++;
            i_iWFTUf++;
          }
          if (i_MjAfV != null) {
            i_MjAfV[i_NxPXW] = (i_iWFTUf - i_pTEbDf) / 1024;
          } else if (i_akCNBf - 1024 < i_iWFTUf - i_pTEbDf && i_MChKiu % 30 == 0) {
            i_zXJHnu(i_cZwcUl.Xn, (i_iWFTUf - i_pTEbDf) / 1024, 0);
          }
        }
      }
      if (_0x59e36f.byteLength > 4096) {
        i_bxjR$_(new Uint16Array(_0x59e36f, 4096));
        i_BSKman(new Int32Array(_0x59e36f, 4096 + i_kRDkS_ * i_kPQcC_ * 2));
      }
    } else {
      i_hErJXt(new Uint32Array(_0x132ddb.data)[0]);
    }
  } else {
    i_KKCaXl(_0x132ddb.data);
  }
}
var i_cZwcUl = {
  Rn: 1,
  zn: 2,
  In: 3,
  Nn: 4,
  Un: 5,
  Dn: 6,
  xn: 7,
  Sn: 8,
  $n: 9,
  Bn: 10,
  Gn: 11,
  Fn: 12,
  Cn: 13,
  Ln: 14,
  qn: 15,
  Kn: 16,
  Vn: 17,
  vn: 18,
  jn: 19,
  On: 20,
  Yn: 21,
  Hn: 22,
  gn: 23,
  hn: 24,
  bn: 25,
  Tn: 26,
  Xn: 27,
  dn: 28,
  Wn: 29,
  Jn: 30
};
var i_jaMBDl = 1;
var i_SGMf$l = 2;
var i_ZZYYBl = 3;
var i_GKesGl = 4;
var i_ikkmFl = 5;
var i_FGabLl = 6;
var i_CSsKql = 11;
var i_WKTXVl = 12;
var i_esjAjl = 13;
var i_FXhQYl = 14;
var i_XcWfHl = 15;
var i_CJiJWl = 16;
var i_kjidJl = 17;
var i_aZrxQl = 18;
ik_looker = 19;
var i_FGeWZl = new Uint8Array(4);
var i_wasReu = new Uint32Array(3);
function i_zXJHnu(_0x347899, _0x333e65, _0xde7535) {
  if (i_DYNBTe != null) {
    i_FGeWZl[0] = _0x347899;
    i_FGeWZl[1] = _0x333e65;
    i_FGeWZl[2] = _0xde7535;
    i_DYNBTe.postMessage(i_FGeWZl);
  }
}
function i_ecwRtu(_0x23b120, _0x449c0d, _0x231932) {
  if (i_DYNBTe != null) {
    i_wasReu[0] = _0x23b120;
    i_wasReu[1] = _0x449c0d;
    i_wasReu[2] = _0x231932;
    i_DYNBTe.postMessage(i_wasReu);
  }
}
function i_aZwsau(_0x1e591f) {
  if (i_DYNBTe != null) {
    i_DYNBTe.postMessage(_0x1e591f);
  }
}
var i_MChKiu = 0;
var i_CCRpou = 0;
var i_hipxcu = 1;
var i_WYbZsu = 1;
var i_mnEKru = 0;
var i_WdkRlu = 0;
function i_aCbGuu(_0xbaa3c3, _0x557895) {
  i_aGfyVi(i_WdkRlu = i_mDiGLi(i_WdkRlu, _0xbaa3c3, _0x557895));
}
function i_jPzhfu(_0x45aa6b, _0x469d0a) {
  if (!(_0x45aa6b * 16 + _0x469d0a == i_mnEKru && _0x45aa6b != i_GHKWya.$e || i_HaCAva.length > 0 && _0x45aa6b != i_GHKWya.$e)) {
    if (_0x45aa6b == i_GHKWya.Fe) {
      if (_0x469d0a & i_ipNXXi) {
        i_iYai_a = 1;
      } else if (_0x469d0a & i_xcfpRi) {
        i_iYai_a = 0;
      }
    }
    i_mnEKru = _0x45aa6b * 16 + _0x469d0a;
    if (i_iDpHde == 1) {
      i_fJfXvo(_0x45aa6b, _0x469d0a);
    } else {
      i_GHKWya.$e;
      i_kcihCi(_0x45aa6b, _0x469d0a);
    }
    i_yYwPle.p++;
  }
}
var i_yDbf_u = 1;
function i_xCyTvu() {
  if (i_WmyDOu.gSkipFrame != 0 && i_yDbf_u < 3) {
    if (!i_iDQBme) {
      i_yDbf_u++;
      i_zXJHnu(i_cZwcUl.In, i_yDbf_u, 0);
    }
  }
}
function i_ARBMdu() {
  i_zXJHnu(i_cZwcUl.In, 1, 0);
}
function i_XFSipu(_0x598291) {
  i_HSeGX_ = (9 - _0x598291) * 2;
  i_zXJHnu(i_cZwcUl.$n, i_HSeGX_, 0);
}
function i_cxmKmu() {}
function i_nYekgu(_0x5a7cfa, _0x5a012a) {
  i_ecwRtu(i_cZwcUl.Cn, _0x5a7cfa, _0x5a012a);
}
function i_bkNDhu(_0x564b49) {
  i_hipxcu = _0x564b49;
  i_zXJHnu(i_cZwcUl.zn, _0x564b49, 0);
}
function i_bAiBbu(_0x1b9288) {
  i_WYbZsu = _0x1b9288;
  i_CCRpou = 0;
  i_zXJHnu(i_cZwcUl.Dn, _0x1b9288, 0);
}
function i_WmWryu(_0x15a1c5) {
  i_zXJHnu(i_cZwcUl.xn, _0x15a1c5, 0);
}
function i_ZjZkwu(_0x24c0cc) {
  i_zXJHnu(i_cZwcUl.Sn, _0x24c0cc, 0);
}
function i_piEjku(_0x465242) {
  if (i_ZHidMe == 0) {
    setTimeout(i_piEjku, 2000, _0x465242);
  } else {
    i_zXJHnu(i_cZwcUl.Rn, _0x465242, 0);
  }
}
function i_ndBeTu(_0xcd7d68) {
  i_zXJHnu(i_cZwcUl.Bn, _0xcd7d68, 0);
}
function i_Pxzfxu(_0xd9a80f) {
  i_zXJHnu(i_cZwcUl.Fn, _0xd9a80f & 255, _0xd9a80f / 256);
}
function i_ZQAWMu(_0x3d240b) {
  i_zXJHnu(i_cZwcUl.Ln, _0x3d240b, 0);
}
function i_jnKJPu() {
  i_zXJHnu(i_cZwcUl.Vn, 0, 0);
}
function i_ktCsEu(_0x183a97) {
  i_zXJHnu(i_cZwcUl.jn, _0x183a97, 0);
}
function i_XwGBAu() {
  i_zXJHnu(i_cZwcUl.Hn, 0, 0);
}
var i_GCasSu = {};
function i_TrjcCu(_0x2674b6, _0x4afc0d, _0x2156ec) {
  if (i_GCasSu[_0x4afc0d] == null) {
    var _0x54f2c7 = new XMLHttpRequest();
    _0x54f2c7.open("GET", "/nextgame/igwuser/useropeninfo?uid=" + _0x2674b6 + "&uuid=" + _0x4afc0d, true);
    _0x54f2c7.send();
    _0x54f2c7.onreadystatechange = function () {
      if (_0x54f2c7.readyState == 4 && _0x54f2c7.status == 200) {
        try {
          var _0x30c779 = JSON.parse(_0x54f2c7.response);
          if (_0x30c779.status == "success") {
            i_GCasSu[_0x4afc0d] = _0x30c779.data;
            _0x2156ec(_0x30c779.data);
          }
        } catch (_0x1c0b5b) {}
      }
    };
  } else {
    _0x2156ec(i_GCasSu[_0x4afc0d]);
  }
}
var i_XejQKu = false;
var i_WmyDOu = {
  gJoyType: 1,
  gASuper: false,
  gBSuper: false,
  gCSuper: false,
  gDSuper: false,
  gESuper: false,
  gFSuper: false,
  gCtlZD: false,
  gCtlSound: false,
  gCtlOpt: 50,
  gScreen: 5,
  gSuperSpeed: 5,
  gSkipFrame: 1,
  gExtX1: false,
  gExtX2: false,
  gExtX3: false,
  gExtX4: false,
  gExtX5: false,
  gExtX6: false,
  gExtX1Key: 3,
  gExtX2Key: 0,
  gExtX3Key: 0,
  gExtX4Key: 0,
  gExtX5Key: 0,
  gExtX6Key: 0,
  gGesSpeed: 5,
  gGes1: "4 8 2 A ",
  gGes2: "4 3 A ",
  gGes3: "",
  gGes4: "",
  gGes5: "",
  gGes6: "",
  gGes7: "",
  gGes8: "",
  PCSet: {
    KeyUp: "KeyW",
    KeyDown: "KeyS",
    KeyLeft: "KeyA",
    KeyRight: "KeyD",
    KeyFire1: "KeyK",
    KeyFire2: "KeyJ",
    KeyFire3: "KeyU",
    KeyFire4: "KeyI",
    KeyFire5: "KeyO",
    KeyFire6: "KeyP",
    KeyStart: "Digit1",
    KeyCoin: "Digit5",
    KeyX1: "KeyL",
    KeyX2: "KeyY",
    KeyX3: "KeyU",
    KeyX4: "KeyF",
    KeyX5: "KeyG",
    KeyX6: "KeyH",
    KeyS1: "KeyV",
    KeyS2: "KeyB",
    KeyS3: "KeyN",
    KeyS4: "KeyM"
  },
  GPSetx: {
    KeyJoy: 1,
    KeyUp: 1,
    KeyDown: 1,
    KeyLeft: 0,
    KeyRight: 0,
    KeyFire1: 0,
    KeyFire2: 1,
    KeyFire3: 2,
    KeyFire4: 3,
    KeyFire5: 6,
    KeyFire6: 7,
    KeyStart: 5,
    KeyCoin: 4,
    KeyX1: -1,
    KeyX2: -1,
    KeyX3: -1,
    KeyX4: -1,
    KeyX5: -1,
    KeyX6: -1,
    KeyS1: -1,
    KeyS2: -1,
    KeyS3: -1,
    KeyS4: -1,
    gKeyRev: false,
    gKeyRevLR: false
  },
  sHQX: true,
  gSoundVol: 80,
  lockScr: false,
  gDisHoldLR: false,
  gJoyLagFix: 4,
  gScrType: 1,
  Qn: false,
  Mobset: null,
  MobBase: {
    Lock43: false,
    ScrStyle: false,
    Width: 100,
    Height: 100,
    SimpleMode: false,
    AllHide: false
  }
};
var i_jwnmXu = {
  KeyUp: "KeyW",
  KeyDown: "KeyS",
  KeyLeft: "KeyA",
  KeyRight: "KeyD",
  KeyFire1: "KeyK",
  KeyFire2: "KeyJ",
  KeyFire3: "KeyU",
  KeyFire4: "KeyI",
  KeyFire5: "KeyO",
  KeyFire6: "KeyP",
  KeyStart: "Digit1",
  KeyCoin: "Digit5",
  KeyX1: "KeyL",
  KeyX2: "KeyY",
  KeyX3: "KeyU",
  KeyX4: "KeyF",
  KeyX5: "KeyG",
  KeyX6: "KeyH",
  KeyS1: "KeyV",
  KeyS2: "KeyB",
  KeyS3: "KeyN",
  KeyS4: "KeyM"
};
var i_mACQRu = {
  KeyJoy: -1,
  KeyUp: -1,
  KeyDown: -1,
  KeyLeft: -1,
  KeyRight: -1,
  KeyFire1: -1,
  KeyFire2: -1,
  KeyFire3: -1,
  KeyFire4: -1,
  KeyFire5: -1,
  KeyFire6: -1,
  KeyStart: -1,
  KeyCoin: -1,
  KeyX1: -1,
  KeyX2: -1,
  KeyX3: -1,
  KeyX4: -1,
  KeyX5: -1,
  KeyX6: -1,
  KeyS1: -1,
  KeyS2: -1,
  KeyS3: -1,
  KeyS4: -1,
  gKeyRev: false,
  gKeyRevLR: false
};
var i_wtWEIu = {
  Lock43: false,
  ScrStyle: false,
  Width: 100,
  Height: 100
};
var i_NSYbNu = {
  GamePadType: 1,
  Pad: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  Select: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  Start: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  A: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  B: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  AA: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  BB: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  },
  AB: {
    X: 0,
    Y: 0,
    Alpha: 0.8,
    Size: 1
  }
};
function i_JcAsUu() {
  i_WSEwg_("/saveset?type=fc&gid=" + gid, i_WmyDOu);
  if (i_iDQBme) {
    i_rrYppt("配置已保存在畅玩云服务器");
  } else {
    i_xmzByr("配置已保存在畅玩云服务器");
  }
}
function i_xNJjDu() {
  if (i_WmyDOu.gSuperSpeed > 8) {
    i_WmyDOu.gSuperSpeed = 8;
  }
  if (i_WmyDOu.gSuperSpeed <= 0) {
    i_WmyDOu.gSuperSpeed = 1;
  }
}
function i_AQsA$u() {
  i_xNJjDu();
  if (i_iDQBme) {
    i_QcDssf();
    i_siAWrf();
  } else {
    i_HmQPYu();
    i_MFnNHu();
    i_TXHhWu();
  }
  i_XFSipu(i_WmyDOu.gSuperSpeed);
}
function i_NRRXBu() {
  if (!(i_WmyDOu.Mobset != null && i_WmyDOu.Mobset != null)) {
    i_WmyDOu.Mobset = JSON.parse(JSON.stringify(i_NSYbNu));
  }
  if (!(i_WmyDOu.MobBase != null && i_WmyDOu.MobBase != null)) {
    i_WmyDOu.MobBase = JSON.parse(JSON.stringify(i_wtWEIu));
  }
}
function i_TAQtGu() {
  i_AQsA$u();
  var _0x37e704 = new XMLHttpRequest();
  _0x37e704.open("GET", "/loadset?type=fc&gid=" + gid, true);
  _0x37e704.responseType = "json";
  _0x37e704.onreadystatechange = function () {
    if (_0x37e704.readyState == XMLHttpRequest.DONE && _0x37e704.status == 200) {
      var _0x12709c = _0x37e704.response;
      if (_0x12709c.PCSet == null || _0x12709c.GPSetx == null) {
        i_JcAsUu();
      } else {
        i_WmyDOu = _0x12709c;
      }
      if (i_WmyDOu.gExtX5 == null) {
        i_WmyDOu.gExtX5 = false;
        i_WmyDOu.gExtX5Key = 0;
        i_WmyDOu.gExtX6 = false;
        i_WmyDOu.gExtX6Key = 0;
        i_WmyDOu.PCSet.KeyX5 = "NO";
        i_WmyDOu.PCSet.KeyX6 = "NO";
        i_WmyDOu.GPSetx.KeyX5 = -1;
        i_WmyDOu.GPSetx.KeyX6 = -1;
      }
      if (i_WmyDOu.gExtX3 == null) {
        i_WmyDOu.gExtX3 = false;
        i_WmyDOu.gExtX3Key = 0;
        i_WmyDOu.gGes1 = "4 8 2 A ";
        i_WmyDOu.gGes2 = "4 3 A ";
        i_WmyDOu.gGes3 = "";
        i_WmyDOu.gGes4 = "";
      }
      if (i_WmyDOu.gExtX4 == null) {
        i_WmyDOu.gExtX4 = false;
        i_WmyDOu.gExtX4Key = 0;
      }
      if (i_WmyDOu.gGesSpeed == null) {
        i_WmyDOu.gGesSpeed = 4;
      }
      if (i_WmyDOu.PCSet == null) {
        i_WmyDOu.PCSet = i_jwnmXu;
      }
      if (i_WmyDOu.GPSetx == null) {
        i_WmyDOu.GPSetx = i_mACQRu;
      }
      if (i_WmyDOu.sHQX == null) {
        i_WmyDOu.sHQX = true;
      }
      if (i_WmyDOu.gSoundVol == null) {
        i_WmyDOu.gSoundVol = 70;
      }
      if (i_WmyDOu.lockScr == null) {
        i_WmyDOu.lockScr = false;
      }
      if (i_WmyDOu.gDisHoldLR == null) {
        i_WmyDOu.gDisHoldLR = false;
      }
      if (i_WmyDOu.gJoyLagFix == null) {
        i_WmyDOu.gJoyLagFix = 4;
      }
      if (i_WmyDOu.GPSetx.gKeyRev == null) {
        i_WmyDOu.GPSetx.gKeyRev = false;
      }
      if (i_WmyDOu.GPSetx.gKeyRevLR == null) {
        i_WmyDOu.GPSetx.gKeyRevLR = false;
      }
      i_NRRXBu();
      i_AQsA$u();
      i_XejQKu = true;
    }
  };
  _0x37e704.send();
  i_NRRXBu();
  if (i_iDQBme) {
    i_axfcof();
  } else {
    i_TXHhWu();
  }
}
function i_ZcmNFu(_0x319e05) {
  i_sxfci_("cb_vidstyle").checked = _0x319e05 ? (i_WmyDOu.MobBase.ScrStyle = true, $("#whathis").css("image-rendering", "pixelated"), true) : (i_WmyDOu.MobBase.ScrStyle = false, $("#whathis").css("image-rendering", "auto"), false);
}
function i_yNXRLu() {
  var _0x5292fe = i_sxfci_("basicRangeWidth");
  var _0x58ffd3 = i_sxfci_("basicRangeHeight");
  _0x5292fe.value = parseInt(i_WmyDOu.MobBase.Width);
  _0x58ffd3.value = parseInt(i_WmyDOu.MobBase.Height);
  i_sxfci_("cb_lock43").checked = i_WmyDOu.MobBase.Lock43;
  i_etMQjr();
}
function i_TQnEqu() {
  i_sxfci_("boostSpeed").value = parseInt(i_WmyDOu.gSuperSpeed);
  i_jCWyYr();
}
function i_MzyCVu() {
  for (var _0x2a0368 in i_WmyDOu.Mobset) {
    for (var _0x23ac95 in i_WmyDOu.Mobset[_0x2a0368]) {
      i_cffPrs[_0x2a0368][_0x23ac95] = i_WmyDOu.Mobset[_0x2a0368][_0x23ac95];
    }
    if (_0x2a0368 == "Pad") {
      i_esSxfs = true;
    }
  }
  i_Wairss = i_WmyDOu.MobBase.AllHide;
  i_PkTzAs();
  i_kCpK_s();
  i_sFmzCs();
}
function i_NfcJju() {
  for (var _0x764250 in i_WmyDOu.Mobset) {
    for (var _0x2abe85 in i_WmyDOu.Mobset[_0x764250]) {
      i_WmyDOu.Mobset[_0x764250][_0x2abe85] = i_cffPrs[_0x764250][_0x2abe85];
    }
  }
  i_JcAsUu();
}
function i_HmQPYu() {
  i_MzyCVu();
}
function i_MFnNHu() {}
function i_TXHhWu() {
  i_ZcmNFu(i_WmyDOu.MobBase.ScrStyle);
  i_yNXRLu();
  i_TQnEqu();
}
function i_GezfJu(_0x2d1b5b) {
  if (_0x2d1b5b) {
    i_WmyDOu.gScrType = 1;
    $("#whathis").css("image-rendering", "pixelated");
  } else {
    i_WmyDOu.gScrType = 0;
    $("#whathis").css("image-rendering", "auto");
  }
}
function i_PafEQu(_0x3958d3) {
  i_QCDwD_(i_WmyDOu.sHQX = _0x3958d3);
}
function i_JzBSZu(_0x4c4087) {
  i_TfQXnf(i_WmyDOu.lockScr);
}
function i_sJXWef(_0x568d2a) {
  if (_0x568d2a === undefined) {
    _0x568d2a = false;
  }
  if (_0x568d2a) {
    i_sxfci_("gamescr").classList.add("scanlines");
  } else {
    i_sxfci_("gamescr").classList.remove("scanlines");
  }
  i_WmyDOu.Qn = _0x568d2a;
}
function i_TfQXnf(_0xd3323d) {
  i_WmyDOu.lockScr = _0xd3323d;
  if (i_WmyDOu.lockScr) {
    var _0x4d81a6 = i_sxfci_("gamedisplay");
    var _0x487312 = i_sxfci_("gamescr");
    var _0x3412bf = i_sxfci_("whathis");
    var _0x44cea7 = _0x4d81a6.clientWidth;
    var _0x5cb68a = _0x4d81a6.clientHeight;
    if (_0x487312.className.indexOf("win") > 0) {
      setTimeout(function () {
        _0x44cea7 = _0x487312.clientWidth;
        _0x5cb68a = _0x487312.clientHeight;
        var _0x75794b = _0x44cea7 / 4;
        var _0x57d558 = _0x5cb68a / 3;
        if (_0x57d558 < _0x75794b) {
          _0x75794b = _0x57d558;
          _0x3412bf.style.width = _0x75794b * 4 + "px";
          _0x3412bf.style.height = _0x75794b * 3 + "px";
          var _0x4951fc = (_0x44cea7 - _0x75794b * 4) / 2;
          _0x3412bf.style.marginLeft = _0x4951fc + "px";
          _0x3412bf.style.marginRight = _0x4951fc + "px";
        } else {
          _0x3412bf.style.width = _0x75794b * 4 + "px";
          _0x3412bf.style.height = _0x75794b * 3 + "px";
          _0x3412bf.style.margin = "0px";
          _0x4951fc = (_0x5cb68a - _0x75794b * 3) / 2;
          _0x3412bf.style.marginTop = _0x4951fc + "px";
          _0x3412bf.style.marginBottom = _0x4951fc + "px";
        }
      }, 500);
      return;
    }
    _0x3412bf.style.margin = "";
    _0x3412bf.style.width = "100%";
    _0x3412bf.style.height = "100%";
    var _0x15bd15 = _0x4d81a6.clientWidth / 4;
    var _0x14eba7 = (_0x4d81a6.clientHeight - 64) / 3;
    if (_0x14eba7 < _0x15bd15) {
      _0x15bd15 = _0x14eba7;
      _0x487312.style.width = _0x15bd15 * 4 + "px";
      _0x487312.style.height = _0x15bd15 * 3 + "px";
      _0x487312.style.margin = "auto";
    } else {
      _0x487312.style.width = _0x15bd15 * 4 + "px";
      _0x487312.style.height = _0x15bd15 * 3 + "px";
      var _0x196ea5 = (_0x4d81a6.clientHeight - 64 - _0x15bd15 * 3) / 2;
      _0x487312.style.marginTop = _0x196ea5 + "px";
      _0x487312.style.marginBottom = _0x196ea5 + "px";
    }
  } else {
    (_0x4d81a6 = i_sxfci_("gamescr")).style.width = "";
    _0x4d81a6.style.height = "";
    _0x4d81a6.style.margin = "0px";
  }
}
function i_GAQTtf(_0xe086b0) {
  if (i_iDpHde != 0) {
    if (i_pjQNyo()) {
      i_hnXPpo("watchset", _0xe086b0 ? "1" : "0");
    } else {
      i_iZhRvt("房主才可设置");
    }
  } else {
    i_iZhRvt("单机无需设置");
  }
}
function i_YtNzaf(_0xcd8a2d) {
  if (i_iDpHde != 0) {
    if (i_pjQNyo()) {
      i_hnXPpo("watchsay", _0xcd8a2d ? "1" : "0");
    } else {
      i_iZhRvt("房主才可设置");
    }
  } else {
    i_iZhRvt("单机无需设置");
  }
}
function i_axfcof() {
  i_ZKQCf_("set_vidstyle", "change", function (_0x37c785) {
    i_GezfJu(this.value > 0);
  });
  i_ZKQCf_("set_vidimpove", "change", function () {
    i_PafEQu(this.value > 0);
  });
  i_ZKQCf_("set_vidsize", "change", function () {
    i_TfQXnf(this.value > 0);
  });
  i_tXrZr_("set_vidscanline", "change", function () {
    i_sJXWef(this.checked);
  });
  i_tXrZr_("allowlook", "change", function () {
    i_GAQTtf(this.checked);
  });
  i_tXrZr_("allowlookermsg", "change", function () {
    i_YtNzaf(this.checked);
  });
  window.addEventListener("resize", i_JzBSZu);
}
function i_JKfMcf(_0x29ae17, _0x57683a) {
  var _0x4bf46b = document.getElementsByName(_0x29ae17);
  var _0x2269ed = 0;
  for (; _0x2269ed < _0x4bf46b.length; _0x2269ed++) {
    if (_0x4bf46b[_0x2269ed].value > 0 == _0x57683a) {
      _0x4bf46b[_0x2269ed].checked = true;
    } else {
      _0x4bf46b[_0x2269ed].checked = false;
    }
  }
}
function i_QcDssf() {
  i_sxfci_("soundvol").value = i_WmyDOu.gSoundVol;
  i_sxfci_("soundvol").style.backgroundSize = i_WmyDOu.gSoundVol + "% 100%";
  i_rHShLf(i_WmyDOu.gSoundVol / 100);
  i_GezfJu(i_WmyDOu.gScrType);
  i_JKfMcf("set_vidstyle", i_WmyDOu.gScrType);
  i_PafEQu(i_WmyDOu.sHQX);
  i_JKfMcf("set_vidimpove", i_WmyDOu.sHQX);
  i_TfQXnf(i_WmyDOu.lockScr);
  i_JKfMcf("set_vidsize", i_WmyDOu.lockScr);
  i_sJXWef(i_WmyDOu.Qn);
  i_sxfci_("set_vidscanline").checked = i_WmyDOu.Qn;
}
function i_siAWrf() {
  i_iTBeIn();
  i_Bckxkn();
  i_fkKwAn();
}
var i_JBMrlf = 0;
var i_tDsKuf = 0;
var i_CEeRff = false;
var i_PAkc_f = false;
var i_mktmvf = false;
var i_jKHfdf = false;
var i_asXxpf;
var i_iDPymf;
var i_yHyrgf;
var i_nZPkhf;
var i_mSNPbf;
var i_KzHiyf = 0;
var i_bjXRwf = 0;
var i_SEwKkf = 4096;
var i_BfbdTf = 0;
var i_nwDwxf = 0;
var i_bhkMMf = false;
var i_zmXCPf;
var i_dMCdEf;
var i_AsnZAf = 2;
var i_GbdzSf = false;
var i_sfenCf = window.AudioContext || window.webkitAudioContext;
var i_NXdZKf = new i_sfenCf({
  sampleRate: 48000
});
var i_xZXYOf = [];
var i_tNmsXf = null;
var i_DQjNRf = [];
var i_ttskzf = [];
var i_daHxIf = null;
var i_rDftNf = null;
var i_iWFTUf = 0;
var i_pTEbDf = 0;
var i_RSxB$f = 0;
var i_akCNBf = 10240;
var i_pwwhGf = null;
var i_XFNiFf = null;
function i_rHShLf(_0x4da4a3) {
  if (!i_CEeRff) {
    i_kkffJf();
  }
  if (i_iDQBme) {
    window.Zn.gain.value = _0x4da4a3;
  }
  if (_0x4da4a3 > 0) {
    i_PAkc_f = true;
    i_NXdZKf.resume();
    i_iZEzAl.kn(1);
  } else {
    i_PAkc_f = false;
    i_NXdZKf.suspend();
    i_iZEzAl.kn(0);
  }
}
function i_kbxYqf() {
  if (typeof SharedArrayBuffer == "undefined") {
    return false;
  }
  if (48000 / (1 / i_NXdZKf.baseLatency) < 512) {
    return false;
  }
  i_SEwKkf = 10240;
  var _0x2c08a3 = new SharedArrayBuffer(102400);
  i_nZPkhf = new Float32Array(i_SEwKkf);
  i_mSNPbf = new Float32Array(i_SEwKkf);
  i_asXxpf = new Float32Array(_0x2c08a3, 0, 10240);
  i_iDPymf = new Float32Array(_0x2c08a3, 40960, 10240);
  i_XFNiFf = new Uint32Array(_0x2c08a3, 81920, 10);
  var _0x28709c = new Function("acx", "gain", `async function fsssdsad() {
    console.log('init aw',acx);
    await acx.audioWorklet.addModule('cyc/cycsd.js');

    var igwSoundDrv = new AudioWorkletNode(acx, 'igw-sound-processor',{numberOfOutputs:2})
    igwSoundDrv.connect(gain)
    return igwSoundDrv;}
return fsssdsad()`);
  if (i_iDQBme) {
    window.Zn = i_NXdZKf.createGain();
    window.Zn.connect(i_NXdZKf.destination);
    window.Zn.gain.value = 1;
    _0x28709c(i_NXdZKf, window.Zn).then(function (_0x2167e1) {
      (i_pwwhGf = _0x2167e1).port.postMessage(_0x2c08a3);
    });
  } else {
    _0x28709c(i_NXdZKf, i_NXdZKf.destination).then(function (_0x3a8f2c) {
      (i_pwwhGf = _0x3a8f2c).port.postMessage(_0x2c08a3);
    });
  }
  return true;
}
function i_KGzBVf() {
  i_SEwKkf = 1024;
  i_daHxIf = new Float32Array(102400);
  if (i_iDQBme) {
    i_SEwKkf = 1024;
    window.et = i_NXdZKf.createScriptProcessor(i_SEwKkf, 0, 2);
    window.Zn = i_NXdZKf.createGain();
    window.Zn.connect(i_NXdZKf.destination);
    window.Zn.gain.value = 1;
    window.et.connect(window.Zn);
    window.et.onaudioprocess = i_CHyYYf;
  } else {
    i_SEwKkf = 4096;
    i_akCNBf = 8192;
    if (48000 / (1 / i_NXdZKf.baseLatency) <= 256 && !i_iDQBme) {
      i_SEwKkf = 2048;
      i_akCNBf = 8192;
    }
    window.et = i_NXdZKf.createScriptProcessor(i_SEwKkf, 0, 2);
    window.et.onaudioprocess = i_CHyYYf;
    window.et.connect(i_NXdZKf.destination);
  }
  var _0x41ac78 = new XMLHttpRequest();
  _0x41ac78.open("Get", "./cyc/click.wav", true);
  _0x41ac78.responseType = "arraybuffer";
  _0x41ac78.onreadystatechange = function () {
    if (_0x41ac78.readyState === 4 && _0x41ac78.status === 200) {
      i_NXdZKf.decodeAudioData(this.response, function (_0x3a651c) {
        ClickSound = _0x3a651c.getChannelData(0);
      });
    }
  };
  _0x41ac78.send();
}
function i_dZfEjf() {
  if (!i_CEeRff) {
    if (!i_kbxYqf()) {
      i_KGzBVf();
    }
    i_CEeRff = true;
  }
}
function i_CHyYYf(_0x167a59) {
  var _0x279222 = _0x167a59.outputBuffer.getChannelData(0);
  var _0x46417f = _0x167a59.outputBuffer.getChannelData(1);
  if (!i_mktmvf) {
    if (i_jKHfdf && i_WmyDOu.gCtlSound) {
      i_asXxpf.set(ClickSound, 0);
      i_iDPymf.set(ClickSound, 0);
      i_jKHfdf = false;
    }
    if (i_iWFTUf < i_pTEbDf + i_SEwKkf) {
      _0x279222.fill(0);
      _0x46417f.fill(0);
      return;
    }
    var _0x43cdf1 = i_daHxIf.subarray(i_RSxB$f, i_RSxB$f + i_SEwKkf);
    _0x279222.set(_0x43cdf1);
    _0x46417f.set(_0x43cdf1);
    _0x43cdf1.fill(0);
    if ((i_RSxB$f += i_SEwKkf) >= 102400) {
      i_RSxB$f = 0;
    }
    i_pTEbDf += i_SEwKkf;
  }
}
function i_RttEHf() {
  i_NXdZKf.resume();
  if (i_NXdZKf.state == "suspended") {
    setTimeout(i_RttEHf, 2000);
  } else {
    i_bhkMMf = true;
  }
}
var i_FNijWf = 0;
function i_kkffJf() {
  if (i_FNijWf > 3) {
    if (!i_iDQBme) {
      i_Wkbybr("如果一直没声音，请检查手机是否静音了。");
    }
  }
  if (i_PAkc_f == 0) {
    i_PAkc_f = true;
    i_dZfEjf();
    i_RttEHf();
    i_iZEzAl.kn(1);
    i_FNijWf++;
  } else {
    i_PAkc_f = false;
    i_NXdZKf.suspend();
    i_iZEzAl.kn(0);
  }
}
var i_DdTaQf = null;
function i_DjetZf() {
  $.ajax({
    type: "get",
    url: "/nextgame/igwuser/userinfo",
    async: true,
    success: function (_0x28a235) {
      i_DdTaQf = _0x28a235.info;
      if (i_iDQBme) {
        i_jypkDt();
      } else {
        i_AJbmKr();
      }
      if (i_DdTaQf.LevelInfo.VipLevel > 0 || i_DdTaQf.LevelInfo.Svip > 0) {
        i_mMmFe_("VipEvent", "play", ["fc", gid, i_DdTaQf.Uid, i_DdTaQf.LevelInfo.Level, i_DdTaQf.LevelInfo.VipLevel, i_DdTaQf.LevelInfo.Svip]);
      }
    },
    complete: function (_0x178655, _0x4d6c1a) {
      if (_0x178655.status != 200) {
        location.reload(true);
      }
    }
  });
}
function i_mMmFe_(_0x57fb13, _0x1f803c, _0x111c74) {
  for (var _0x1a2dbc in _0x111c74) {
    if (typeof _0x111c74[_0x1a2dbc] != "string") {
      _0x111c74[_0x1a2dbc] = _0x111c74[_0x1a2dbc] + "";
    }
  }
  i_WSEwg_("/nextgame/feedback/event", {
    Url: location.href,
    Type: _0x57fb13,
    Event: _0x1f803c,
    EventData: _0x111c74,
    Sign: "ok"
  });
}
var i_aaCBn_ = {
  nt: "",
  addEventListener: function () {}
};
function i_YHmAt_(_0x580f10) {
  var _0x5bf618 = document.cookie.split("; ");
  var _0x21f0e0 = 0;
  for (; _0x21f0e0 < _0x5bf618.length; _0x21f0e0++) {
    var _0x1f2524 = _0x5bf618[_0x21f0e0].split("=");
    if (_0x1f2524[0] == _0x580f10) {
      return _0x1f2524[1];
    }
  }
  return "";
}
function i_tdBda_(_0x2a3092) {
  var _0xcbaa08 = new RegExp("(^|&)" + _0x2a3092 + "=([^&]*)(&|$)");
  var _0x2bf07b = window.location.search.substr(1).match(_0xcbaa08);
  if (_0x2bf07b != null) {
    return decodeURI(_0x2bf07b[2]);
  } else {
    return null;
  }
}
function i_sxfci_(_0x287652) {
  var _0xe98678 = document.getElementById(_0x287652);
  if (_0xe98678 == null) {
    i_aaCBn_.nt = _0x287652;
    _0xe98678 = i_aaCBn_;
    return null;
  } else {
    return _0xe98678;
  }
}
function i_Brhwo_(_0x97b515) {
  if (_0x97b515 == null) {
    return "badele";
  } else {
    return _0x97b515.getAttribute("key");
  }
}
function i_kzkwc_(_0x2e1c63, _0x25ed11) {
  var _0x5b8f36 = document.getElementById(_0x2e1c63);
  if (_0x5b8f36 != null) {
    _0x5b8f36.removeEventListener("click", _0x25ed11);
  }
}
function i_Hfbes_(_0x327736, _0x152ff1) {
  var _0x31f661 = document.getElementById(_0x327736);
  if (_0x31f661 != null) {
    _0x31f661.addEventListener("click", _0x152ff1);
  }
}
function i_tXrZr_(_0x40dad6, _0x120fc8, _0x16f51f) {
  var _0x305629 = document.getElementById(_0x40dad6);
  if (_0x305629 != null) {
    _0x305629.addEventListener(_0x120fc8, _0x16f51f);
  }
}
function i_cirYl_(_0x593c72, _0x2bc137) {
  document.getElementsByName(_0x593c72).forEach(function (_0x395467) {
    _0x395467.addEventListener("click", _0x2bc137);
  });
}
function i_dhBiu_(_0x51feeb, _0x2008fe) {
  document.getElementsByName(_0x51feeb).forEach(function (_0x55b357) {
    _0x2008fe(_0x55b357);
  });
}
function i_ZKQCf_(_0x5decb1, _0x58bff1, _0xb9cb7e) {
  document.getElementsByName(_0x5decb1).forEach(function (_0x55479a) {
    _0x55479a.addEventListener(_0x58bff1, _0xb9cb7e);
  });
}
function i_jzyY__(_0xb04110, _0xe4e94a) {
  document.getElementsByName(_0xb04110).forEach(function (_0xd166a9) {
    _0xd166a9.classList.remove(_0xe4e94a);
  });
}
function i_WwiRv_(_0x27894f, _0x18871c) {
  var _0x404dbd = i_sxfci_(_0x27894f);
  if (_0x404dbd.style.display == "none") {
    _0x404dbd.style.display = _0x18871c;
    return true;
  } else {
    return !(_0x404dbd.style.display = "none");
  }
}
function i_wccDd_() {
  var _0x49dec4 = document.getElementById("whathis");
  i_YBrGP_.drawArrays(i_YBrGP_.TRIANGLES, 0, 6);
  var _0x2c0ad9 = document.createElement("canvas");
  _0x2c0ad9.width = 200;
  _0x2c0ad9.height = 150;
  _0x2c0ad9.getContext("2d").drawImage(_0x49dec4, 0, 0, 200, 150);
  return _0x2c0ad9.toDataURL("image/png");
}
function i_zMkcp_() {
  tempSrc = GetGameImg();
  $("#downurl").attr("href", tempSrc);
  $("#shareimg").attr("src", tempSrc);
}
function i_PZAFm_(_0x2e0e83) {
  var _0x5d8ac4 = _0x2e0e83.split(",");
  var _0x29f1b0 = _0x5d8ac4[0].match(/:(.*?);/)[1];
  var _0x339b56 = atob(_0x5d8ac4[1]);
  var _0x43dde9 = _0x339b56.length;
  var _0x23bab6 = new Uint8Array(_0x43dde9);
  for (; _0x43dde9--;) {
    _0x23bab6[_0x43dde9] = _0x339b56.charCodeAt(_0x43dde9);
  }
  return new Blob([_0x23bab6], {
    type: _0x29f1b0
  });
}
function i_WSEwg_(_0x2b80ae, _0x1a39f8, _0x2f93f9, _0x1bc787) {
  var _0x198aef = new XMLHttpRequest();
  _0x198aef.open("POST", _0x2b80ae, true);
  _0x198aef.setRequestHeader("Content-type", "application/json");
  _0x198aef.responseType = "json";
  _0x198aef.onreadystatechange = function () {
    if (_0x198aef.readyState == XMLHttpRequest.DONE) {
      if (_0x198aef.status == 200) {
        if (_0x2f93f9 != null) {
          _0x2f93f9(_0x198aef.response);
        }
      } else if (_0x1bc787 != null) {
        _0x1bc787(_0x198aef.response);
      }
    }
  };
  _0x198aef.send(JSON.stringify(_0x1a39f8));
}
var i_CHHkh_ = {};
function i_rBKib_(_0x53fddd, _0x51963) {
  i_CHHkh_[_0x53fddd] = 0;
  i_tXrZr_(_0x53fddd, "touchmove", function (_0x11f30c) {
    if (this.disabled) {
      _0x11f30c.preventDefault();
    } else {
      var _0xbbfe66 = this.getClientRects();
      var _0x553e91 = i_QtJCKs(_0xbbfe66[0].x, _0xbbfe66[0].y);
      var _0x4d5af9 = i_QtJCKs(_0x11f30c.changedTouches[0].clientX, _0x11f30c.changedTouches[0].clientY).pn;
      this.value = (_0x4d5af9 - _0x553e91.pn) / (this.offsetWidth / (parseInt(this.max) - parseInt(this.min))) + parseInt(this.min);
      _0x51963(this);
      _0x11f30c.preventDefault();
    }
  });
}
function i_QSwGy_() {
  cyc_queryID("pushbtn").disabled = true;
  $.get("/helper/pushwx?type=jj&id=" + gid, function (_0x591eb9) {
    cyc_queryID("pushbtn").innerHTML = "√请在手机微信查看";
    cyc_queryID("pushbtn").style.backgroundColor = "#3fdd2e61";
    setTimeout(function () {
      cyc_queryID("pushbtn").style.display = "none";
    }, 5000);
  });
}
var i_thkew_ = null;
var i_zMDwk_ = null;
function i_SSyQT_() {
  i_thkew_ = i_sxfci_("whathis");
  i_zMDwk_ = i_sxfci_(i_iDQBme ? "helpergui" : "gametap");
}
function i_CrAfx_() {
  var _0x5992ea = 512 / i_kRDkS_;
  var _0x4b9458 = 512 / i_kPQcC_;
  var _0x32fca7 = `attribute vec2 a_position;
            varying highp vec2 v_textureCoord;

            void main() {
                gl_Position = vec4((a_position.x * 2.0 * ` + _0x5992ea + ".0) - 1.0, (a_position.y * 2.0 * " + _0x4b9458 + `) * -1.0 + 1.0, 0, 1);
                v_textureCoord = vec2(a_position.x, a_position.y);
            }`;
  if (i_TBJJz_) {
    _0x32fca7 = `attribute vec2 a_position;
            varying highp vec2 v_textureCoord;

            void main() {
                gl_Position = vec4((a_position.y * 2.0 * ` + _0x4b9458 + ") - 1.0, 0.0 - ((a_position.x * 2.0 * " + _0x5992ea + `) * -1.0 + 1.0), 0, 1);
                v_textureCoord = vec2(a_position.x, a_position.y);
            }`;
  }
  return _0x32fca7;
}
var i_chNJM_ = `  varying highp vec2 v_textureCoord;

            uniform sampler2D u_sampler;

            void main(void) {
                gl_FragColor = texture2D(u_sampler, vec2(v_textureCoord.s, v_textureCoord.t));
            }`;
var i_YBrGP_ = null;
var i_ecCpE_ = "";
var i_dHGrA_ = "";
var i_kRDkS_ = 0;
var i_kPQcC_ = 0;
var i_zcjCK_ = null;
var i_yhDYO_ = 4;
var i_HSeGX_ = 20;
var i_JryzR_ = null;
var i_TBJJz_ = false;
var i_JYQZI_ = false;
var i_cWpGN_ = {
  compileShader: function (_0xbb1277, _0x643ee1, _0x3a46ba) {
    var _0xe568d1 = _0xbb1277.createShader(_0x3a46ba);
    _0xbb1277.shaderSource(_0xe568d1, _0x643ee1);
    _0xbb1277.compileShader(_0xe568d1);
    if (!_0xbb1277.getShaderParameter(_0xe568d1, _0xbb1277.COMPILE_STATUS)) {
      throw new Error("could not compile shader:" + _0xbb1277.getShaderInfoLog(_0xe568d1));
    }
    return _0xe568d1;
  },
  createProgram: function (_0x32d189, _0x27f6b4, _0x3605c3) {
    var _0x16b9d3 = _0x32d189.createProgram();
    _0x32d189.attachShader(_0x16b9d3, _0x27f6b4);
    _0x32d189.attachShader(_0x16b9d3, _0x3605c3);
    _0x32d189.linkProgram(_0x16b9d3);
    if (!_0x32d189.getProgramParameter(_0x16b9d3, _0x32d189.LINK_STATUS)) {
      throw new Error("program filed to link:" + _0x32d189.getProgramInfoLog(_0x16b9d3));
    }
    return _0x16b9d3;
  },
  tt: function (_0x25df16, _0x848b76, _0x42c27b) {
    var _0x5d4732 = "";
    if (!_0x42c27b) {
      if (_0x848b76 === "x-shader/x-vertex") {
        _0x42c27b = _0x25df16.VERTEX_SHADER;
        _0x5d4732 = i_ecCpE_;
      } else {
        if (_0x848b76 !== "x-shader/x-fragment") {
          throw new Error("Unreachable");
        }
        _0x42c27b = _0x25df16.FRAGMENT_SHADER;
        _0x5d4732 = i_dHGrA_;
      }
    }
    return this.compileShader(_0x25df16, _0x5d4732, _0x42c27b);
  },
  createProgramFromScripts: function (_0x50646d) {
    var _0x31fd00 = this.tt(_0x50646d, "x-shader/x-vertex");
    var _0x5cb30e = this.tt(_0x50646d, "x-shader/x-fragment");
    return this.createProgram(_0x50646d, _0x31fd00, _0x5cb30e);
  },
  at: function (_0x11dc2a) {
    var _0x1fbf71 = this.compileShader(_0x11dc2a, i_pKdHV_(i_kRDkS_, i_kPQcC_), _0x11dc2a.VERTEX_SHADER);
    var _0xa689c5 = this.compileShader(_0x11dc2a, i_QaNAj_, _0x11dc2a.FRAGMENT_SHADER);
    return this.createProgram(_0x11dc2a, _0x1fbf71, _0xa689c5);
  }
};
function i_kNJaU_() {
  if (i_iDQBme) {
    if ((i_YBrGP_ = i_thkew_.getContext("webgl2", {
      alpha: false,
      it: false
    })) == null) {
      i_YBrGP_ = i_thkew_.getContext("webgl", {
        alpha: false,
        it: false
      });
    }
  } else {
    i_YBrGP_ = i_thkew_.getContext("webgl", {
      alpha: false,
      it: false
    });
  }
  if (i_ankaua.g()) {
    var _0x47d943 = i_ankaua.Ke("app.getGPUFeatureStatus()");
    if (_0x47d943.opengl.indexOf("disabled") >= 0) {
      i_JYQZI_ = true;
    }
  }
  if (i_YBrGP_ == null) {
    i_iZhRvt("显卡加速初始化失败😢,你会看到黑屏,请重新开游戏试试,或者联系畅玩大叔反馈问题");
    i_DYNBTe.onmessage = function () {};
    return;
  }
  var _0x54f1df = i_YBrGP_.getExtension("WEBGL_debug_renderer_info");
  if ((_0x54f1df && i_YBrGP_.getParameter(_0x54f1df.UNMASKED_RENDERER_WEBGL)).toLowerCase().indexOf("swiftshader") >= 0) {
    i_JYQZI_ = true;
    i_iZhRvt("显卡驱动过久😢,画质提升已禁用，请升级显卡驱动");
  }
  i_YBrGP_.viewport(0, 0, i_thkew_.width, i_thkew_.height);
  shaderProgram = i_cWpGN_.createProgramFromScripts(i_YBrGP_);
  texture = i_YBrGP_.createTexture();
  i_YBrGP_.bindTexture(i_YBrGP_.TEXTURE_2D, texture);
  var _0x59bacc = new Uint16Array(262144);
  i_YBrGP_.texImage2D(i_YBrGP_.TEXTURE_2D, 0, i_YBrGP_.RGBA, 512, 512, 0, i_YBrGP_.RGBA, i_YBrGP_.UNSIGNED_SHORT_5_5_5_1, _0x59bacc);
  i_YBrGP_.texParameteri(i_YBrGP_.TEXTURE_2D, i_YBrGP_.TEXTURE_MAG_FILTER, i_YBrGP_.NEAREST);
  i_YBrGP_.texParameteri(i_YBrGP_.TEXTURE_2D, i_YBrGP_.TEXTURE_MIN_FILTER, i_YBrGP_.NEAREST);
  i_YBrGP_.texParameteri(i_YBrGP_.TEXTURE_2D, i_YBrGP_.TEXTURE_WRAP_S, i_YBrGP_.CLAMP_TO_EDGE);
  i_YBrGP_.texParameteri(i_YBrGP_.TEXTURE_2D, i_YBrGP_.TEXTURE_WRAP_T, i_YBrGP_.CLAMP_TO_EDGE);
  var _0x2eb330 = i_YBrGP_.createBuffer();
  i_YBrGP_.bindBuffer(i_YBrGP_.ARRAY_BUFFER, _0x2eb330);
  i_YBrGP_.bufferData(i_YBrGP_.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), i_YBrGP_.STATIC_DRAW);
  var _0x2aae0f = i_YBrGP_.getAttribLocation(shaderProgram, "a_position");
  var _0x3e8ce6 = i_YBrGP_.getUniformLocation(shaderProgram, "u_sampler");
  i_YBrGP_.useProgram(shaderProgram);
  i_YBrGP_.bindBuffer(i_YBrGP_.ARRAY_BUFFER, _0x2eb330);
  i_YBrGP_.enableVertexAttribArray(_0x2aae0f);
  i_YBrGP_.vertexAttribPointer(_0x2aae0f, 2, i_YBrGP_.FLOAT, false, 0, 0);
  if (i_iDQBme) {
    var _0x534cf9 = new Image();
    _0x534cf9.onload = function () {
      i_JryzR_ = i_cWpGN_.at(i_YBrGP_);
      i_YBrGP_.useProgram(i_JryzR_);
      luadata = i_YBrGP_.createTexture();
      i_YBrGP_.activeTexture(i_YBrGP_.TEXTURE1);
      i_YBrGP_.bindTexture(i_YBrGP_.TEXTURE_2D, luadata);
      i_YBrGP_.texImage2D(i_YBrGP_.TEXTURE_2D, 0, i_YBrGP_.RGBA, i_YBrGP_.RGBA, i_YBrGP_.UNSIGNED_BYTE, _0x534cf9);
      i_YBrGP_.texParameteri(i_YBrGP_.TEXTURE_2D, i_YBrGP_.TEXTURE_MAG_FILTER, i_YBrGP_.NEAREST);
      i_YBrGP_.texParameteri(i_YBrGP_.TEXTURE_2D, i_YBrGP_.TEXTURE_MIN_FILTER, i_YBrGP_.NEAREST);
      var _0x2d9aef = i_YBrGP_.getAttribLocation(i_JryzR_, "aVertexCoord");
      var _0x2ce811 = i_YBrGP_.getAttribLocation(i_JryzR_, "TexCoord");
      i_YBrGP_.enableVertexAttribArray(_0x2d9aef);
      i_YBrGP_.vertexAttribPointer(_0x2d9aef, 2, i_YBrGP_.FLOAT, false, 0, 0);
      i_YBrGP_.enableVertexAttribArray(_0x2ce811);
      i_YBrGP_.vertexAttribPointer(_0x2ce811, 2, i_YBrGP_.FLOAT, false, 0, 0);
      var _0x138686 = i_YBrGP_.getUniformLocation(i_JryzR_, "Texture");
      var _0x55851e = i_YBrGP_.getUniformLocation(i_JryzR_, "LUT");
      var _0x1c91e5 = i_YBrGP_.getUniformLocation(i_JryzR_, "TextureSize");
      var _0xf59007 = i_YBrGP_.getUniformLocation(i_JryzR_, "sTextureSize");
      i_YBrGP_.uniform1i(_0x138686, 0);
      i_YBrGP_.uniform1i(_0x55851e, 1);
      i_YBrGP_.uniform2f(_0x1c91e5, 512, 512);
      i_YBrGP_.uniform2f(_0xf59007, 512, 512);
      i_YBrGP_.useProgram(shaderProgram);
      i_YBrGP_.activeTexture(i_YBrGP_.TEXTURE0);
      i_YBrGP_.bindTexture(i_YBrGP_.TEXTURE_2D, texture);
      i_PafEQu(i_WmyDOu.sHQX);
    };
    _0x534cf9.src = "./img/hq4x.png";
  }
  i_YBrGP_.activeTexture(i_YBrGP_.TEXTURE0);
  i_YBrGP_.bindTexture(i_YBrGP_.TEXTURE_2D, texture);
  i_YBrGP_.uniform1i(_0x3e8ce6, 0);
}
function i_QCDwD_(_0x4b0824) {
  if (i_YBrGP_ != null && i_JryzR_ != null) {
    if (i_JYQZI_) {
      i_iZhRvt("抱歉，显卡加速失败，画质提升不可用");
    }
    if (_0x4b0824 && i_JYQZI_ == 0) {
      i_yhDYO_ = 4;
      i_thkew_.width = i_kRDkS_ * i_yhDYO_;
      i_thkew_.height = i_kPQcC_ * i_yhDYO_;
      i_YBrGP_.useProgram(i_JryzR_);
      i_YBrGP_.viewport(0, 0, i_kRDkS_ * i_yhDYO_, i_kPQcC_ * i_yhDYO_);
    } else {
      i_yhDYO_ = 1;
      i_thkew_.width = i_kRDkS_;
      i_thkew_.height = i_kPQcC_;
      i_YBrGP_.activeTexture(i_YBrGP_.TEXTURE0);
      i_YBrGP_.bindTexture(i_YBrGP_.TEXTURE_2D, texture);
      i_YBrGP_.useProgram(shaderProgram);
      i_YBrGP_.viewport(0, 0, i_kRDkS_, i_kPQcC_);
    }
  }
}
function i_bxjR$_(_0x1d29af) {
  i_YBrGP_.texSubImage2D(i_YBrGP_.TEXTURE_2D, 0, 0, 0, i_kRDkS_, i_kPQcC_, i_YBrGP_.RGBA, i_YBrGP_.UNSIGNED_SHORT_5_5_5_1, _0x1d29af);
  i_YBrGP_.drawArrays(i_YBrGP_.TRIANGLES, 0, 6);
}
var i_cNjsB_ = 739;
var i_rGEfG_ = Math.ceil(Math.random() * 10000000);
function i_WYEaF_(_0x314152, _0x1fce64, _0xf609fe) {
  return _0x314152.split(_0x1fce64).join(_0xf609fe);
}
function i_fJnBL_(_0x47bd72) {
  var _0x4969b0 = "|}?{:><_)(*&!@#$%^~";
  var _0x177a00 = "1346580azhUObsoIETRcfyy23f923f3n2";
  var _0x53b3e2 = _0x4969b0.length;
  var _0x35cfcd = _0x4969b0.charAt(i_rGEfG_ / 2312 % _0x53b3e2);
  var _0x50a2f3 = _0x177a00.charAt(i_rGEfG_ / 2312 % _0x53b3e2);
  var _0x173acf = _0x4969b0.charAt(i_rGEfG_ / 14251 % _0x53b3e2);
  var _0x203026 = _0x177a00.charAt(i_rGEfG_ / 14251 % _0x53b3e2);
  var _0x311fe9 = _0x4969b0.charAt(i_rGEfG_ / 685342 % _0x53b3e2);
  var _0x3cfbae = _0x177a00.charAt(i_rGEfG_ / 685342 % _0x53b3e2);
  var _0x5cb2d9 = _0x4969b0.charAt(i_rGEfG_ / 124 % _0x53b3e2);
  var _0x2eb5f4 = _0x177a00.charAt(i_rGEfG_ / 124 % _0x53b3e2);
  _0x47bd72 = i_WYEaF_(_0x47bd72 = i_WYEaF_(_0x47bd72 = i_WYEaF_(_0x47bd72 = i_WYEaF_(_0x47bd72, _0x35cfcd, _0x50a2f3), _0x173acf, _0x203026), _0x311fe9, _0x3cfbae), _0x5cb2d9, _0x2eb5f4);
  return window.atob(_0x47bd72);
}
function i_QMCCq_(_0x5c76d9) {
  if (_0x5c76d9.data.byteLength != 4) {
    if (_0x5c76d9.data.byteLength != 24) {
      if (i_iDpHde == 1 && _0x5c76d9.data.byteLength < 2048) {
        i_KatGXo(_0x5c76d9.data);
      } else {
        if (++i_MChKiu % i_WmyDOu.gGesSpeed == 0) {
          var _0x432453 = GetAutoPlay();
          if (_0x432453 != null) {
            SendKey(i_GHKWya.$e, _0x432453);
          }
        }
        if (i_MChKiu < 5000 && (i_MChKiu == 1 && i_ZSfTwa && i_cxmKmu(), i_MChKiu % 59 == 0 && i_WmyDOu.gSkipFrame == 1)) {
          var _0x2d8676 = performance.now();
          if (i_MChKiu > 150 && i_CCRpou != 0) {
            if (_0x2d8676 - i_CCRpou >= 1200 && i_hipxcu > 0) {
              i_xCyTvu();
            } else if (i_iDpHde == 1 && _0x2d8676 - i_CCRpou >= 1560) {
              i_xCyTvu();
            }
          }
          i_CCRpou = _0x2d8676;
        }
        if (i_PAkc_f) {
          var _0x34047d = false;
          var _0x4dd94c = new Int16Array(_0x5c76d9.data, 0, 2048);
          if (i_KzHiyf > 0 && i_bjXRwf == 0) {
            i_iDPymf.set(i_mSNPbf);
            i_asXxpf.set(i_nZPkhf);
            i_bjXRwf = i_KzHiyf;
            i_KzHiyf = 0;
          }
          var _0x55af9f = 0;
          for (; _0x55af9f < i_cNjsB_; _0x55af9f++) {
            if (i_SEwKkf <= i_bjXRwf) {
              if (i_SEwKkf / 2 <= i_KzHiyf && i_iDpHde != 1 && _0x34047d == 0) {
                SendCommand(i_cZwcUl.Nn, 0, 0);
                _0x34047d = true;
              }
              if (i_SEwKkf <= i_KzHiyf) {
                break;
              }
              i_mSNPbf[i_KzHiyf] = _0x4dd94c[_0x55af9f * 2] / 32768;
              i_nZPkhf[i_KzHiyf] = _0x4dd94c[_0x55af9f * 2 + 1] / 32768;
              i_KzHiyf++;
            } else {
              i_iDPymf[i_bjXRwf] = _0x4dd94c[_0x55af9f * 2] / 32768;
              i_asXxpf[i_bjXRwf] = _0x4dd94c[_0x55af9f * 2 + 1] / 32768;
              i_bjXRwf++;
            }
          }
        }
        if (_0x5c76d9.data.byteLength > 4096) {
          var _0x1812a9 = new Uint16Array(_0x5c76d9.data, 4096);
          i_YBrGP_.texSubImage2D(i_YBrGP_.TEXTURE_2D, 0, 0, 0, i_thkew_.width, i_thkew_.height, i_YBrGP_.RGBA, i_YBrGP_.UNSIGNED_SHORT_5_5_5_1, _0x1812a9);
          i_YBrGP_.drawArrays(i_YBrGP_.TRIANGLES, 0, 6);
        }
        if (i_ZSfTwa) {
          setTimeout(i_TBswui, 5);
        }
      }
    }
  } else {
    ProcessRecvCommand(_0x5c76d9.data);
  }
}
function i_pKdHV_(_0x388713, _0x454ca1) {
  var _0x454ccf = 512 / _0x388713;
  var _0x22faa6 = 512 / _0x454ca1;
  if (i_TBJJz_) {
    _0xdb8380 = `#if __VERSION__ >= 130
#define COMPAT_VARYING out
#define COMPAT_ATTRIBUTE in
#define COMPAT_TEXTURE texture
#else
#define COMPAT_VARYING varying 
#define COMPAT_ATTRIBUTE attribute 
#define COMPAT_TEXTURE texture2D
#endif

#ifdef GL_ES
#define COMPAT_PRECISION mediump
#else
#define COMPAT_PRECISION
#endif
COMPAT_VARYING     vec2 VARps;
COMPAT_VARYING     vec4 _t3;
COMPAT_VARYING     vec4 _t2;
COMPAT_VARYING     vec4 _t1;
COMPAT_VARYING     vec2 _texCoord1;
COMPAT_VARYING     vec4 _color1;
COMPAT_VARYING     vec4 _position1;
struct input_dummy {
    vec2 _video_size;
    vec2 _texture_size;
    vec2 _output_dummy_size;
};
struct out_vertex {
    vec4 _position1;
    vec4 _color1;
    vec2 _texCoord1;
    vec4 _t1;
    vec4 _t2;
    vec4 _t3;
    vec2 VARps;
};
out_vertex _ret_0;
input_dummy _IN1;
vec4 _r0010;
vec4 _v0010;
COMPAT_ATTRIBUTE vec4 aVertexCoord;
COMPAT_ATTRIBUTE vec4 COLOR;
COMPAT_ATTRIBUTE vec4 TexCoord;
COMPAT_VARYING vec4 COL0;
COMPAT_VARYING vec4 TEX0;
COMPAT_VARYING vec4 TEX1;
COMPAT_VARYING vec4 TEX2;
COMPAT_VARYING vec4 TEX3;
 
uniform COMPAT_PRECISION vec2 TextureSize;
void main()
{
    out_vertex _OUT;
    vec2 _ps;
    _OUT._position1 = vec4((aVertexCoord.y * 2.0 * ` + _0x22faa6 + ") - 1.0, 0.0 - ((aVertexCoord.x * 2.0 * " + _0x454ccf + `) * -1.0 + 1.0), 0, 1);
    _ps = 1.00000000E+00/TextureSize;
    _OUT._t1 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(-_ps.y)));
    _OUT._t2 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), 0.00000000E+00);
    _OUT._t3 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(_ps.y)));
    _ret_0._position1 = _OUT._position1;
    _ret_0._color1 = COLOR;
    _ret_0._texCoord1 = TexCoord.xy;
    _ret_0._t1 = _OUT._t1;
    _ret_0._t2 = _OUT._t2;
    _ret_0._t3 = _OUT._t3;
    VARps = _ps;
    gl_Position = _OUT._position1;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;
    TEX1 = _OUT._t1;
    TEX2 = _OUT._t2;
    TEX3 = _OUT._t3;
    return;
    COL0 = _ret_0._color1;
    TEX0.xy = _ret_0._texCoord1;
    TEX1 = _ret_0._t1;
    TEX2 = _ret_0._t2;
    TEX3 = _ret_0._t3;
    return;
} `;
  } else {
    var _0xdb8380 = `#if __VERSION__ >= 130
#define COMPAT_VARYING out
#define COMPAT_ATTRIBUTE in
#define COMPAT_TEXTURE texture
#else
#define COMPAT_VARYING varying 
#define COMPAT_ATTRIBUTE attribute 
#define COMPAT_TEXTURE texture2D
#endif

#ifdef GL_ES
#define COMPAT_PRECISION mediump
#else
#define COMPAT_PRECISION
#endif
COMPAT_VARYING     vec2 VARps;
COMPAT_VARYING     vec4 _t3;
COMPAT_VARYING     vec4 _t2;
COMPAT_VARYING     vec4 _t1;
COMPAT_VARYING     vec2 _texCoord1;
COMPAT_VARYING     vec4 _color1;
COMPAT_VARYING     vec4 _position1;
struct input_dummy {
    vec2 _video_size;
    vec2 _texture_size;
    vec2 _output_dummy_size;
};
struct out_vertex {
    vec4 _position1;
    vec4 _color1;
    vec2 _texCoord1;
    vec4 _t1;
    vec4 _t2;
    vec4 _t3;
    vec2 VARps;
};
out_vertex _ret_0;
input_dummy _IN1;
vec4 _r0010;
vec4 _v0010;
COMPAT_ATTRIBUTE vec4 aVertexCoord;
COMPAT_ATTRIBUTE vec4 COLOR;
COMPAT_ATTRIBUTE vec4 TexCoord;
COMPAT_VARYING vec4 COL0;
COMPAT_VARYING vec4 TEX0;
COMPAT_VARYING vec4 TEX1;
COMPAT_VARYING vec4 TEX2;
COMPAT_VARYING vec4 TEX3;
 
uniform COMPAT_PRECISION vec2 TextureSize;
void main()
{
    out_vertex _OUT;
    vec2 _ps;
    _OUT._position1 = vec4((aVertexCoord.x * 2.0 * ` + _0x454ccf + ".0) - 1.0, (aVertexCoord.y * 2.0 * " + _0x22faa6 + `) * -1.0 + 1.0, 0, 1);
    _ps = 1.00000000E+00/TextureSize;
    _OUT._t1 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(-_ps.y)));
    _OUT._t2 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), 0.00000000E+00);
    _OUT._t3 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(_ps.y)));
    _ret_0._position1 = _OUT._position1;
    _ret_0._color1 = COLOR;
    _ret_0._texCoord1 = TexCoord.xy;
    _ret_0._t1 = _OUT._t1;
    _ret_0._t2 = _OUT._t2;
    _ret_0._t3 = _OUT._t3;
    VARps = _ps;
    gl_Position = _OUT._position1;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;
    TEX1 = _OUT._t1;
    TEX2 = _OUT._t2;
    TEX3 = _OUT._t3;
    return;
    COL0 = _ret_0._color1;
    TEX0.xy = _ret_0._texCoord1;
    TEX1 = _ret_0._t1;
    TEX2 = _ret_0._t2;
    TEX3 = _ret_0._t3;
    return;
} `;
  }
  return _0xdb8380;
}
var i_QaNAj_ = `#if __VERSION__ >= 130
#define COMPAT_VARYING in
#define COMPAT_TEXTURE texture
out vec4 FragColor;
#else
#define COMPAT_VARYING varying
#define FragColor gl_FragColor
#define COMPAT_TEXTURE texture2D
#endif

#ifdef GL_ES
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#define COMPAT_PRECISION mediump
#else
#define COMPAT_PRECISION
#endif
COMPAT_VARYING     vec2 VARps;
COMPAT_VARYING     vec4 _t3;
COMPAT_VARYING     vec4 _t2;
COMPAT_VARYING     vec4 _t1;
COMPAT_VARYING     vec2 _texCoord;
COMPAT_VARYING     vec4 _color;
struct input_dummy {
    vec2 _video_size;
    vec2 _texture_size;
    vec2 _output_dummy_size;
};
struct out_vertex {
    vec4 _color;
    vec2 _texCoord;
    vec4 _t1;
    vec4 _t2;
    vec4 _t3;
    vec2 VARps;
};
vec4 _ret_0;
float _TMP44;
vec4 _TMP40;
float _TMP39;
float _TMP37;
vec2 _TMP38;
float _TMP36;
float _TMP35;
float _TMP34;
float _TMP43;
bool _TMP33;
bool _TMP32;
bool _TMP31;
bool _TMP30;
vec3 _TMP42;
bool _TMP29;
bool _TMP28;
bool _TMP27;
bool _TMP26;
bool _TMP25;
bool _TMP24;
bool _TMP23;
bool _TMP22;
vec4 _TMP20;
vec4 _TMP18;
vec4 _TMP16;
vec4 _TMP14;
vec4 _TMP11;
vec4 _TMP9;
vec4 _TMP7;
vec4 _TMP5;
vec4 _TMP4;
vec4 _TMP3;
vec4 _TMP2;
vec4 _TMP1;
vec2 _TMP0;
out_vertex _VAR1;
uniform sampler2D Texture;
input_dummy _IN1;
uniform sampler2D LUT;
vec2 _x0063;
vec2 _val0065;
vec2 _a0065;
vec2 _c0069;
vec2 _c0071;
vec2 _c0073;
vec3 _r0077;
vec3 _v0077;
vec3 _r0087;
vec3 _v0087;
vec3 _r0097;
vec3 _v0097;
vec3 _r0107;
vec3 _v0107;
vec3 _r0115;
vec3 _v0115;
vec3 _r0125;
vec3 _v0125;
vec3 _r0135;
vec3 _v0135;
vec3 _r0145;
vec3 _v0145;
vec3 _r0155;
vec3 _v0155;
bvec3 _res0163;
vec3 _a0165;
bvec3 _res0167;
vec3 _a0169;
bvec3 _res0171;
vec3 _a0173;
bvec3 _res0175;
vec3 _a0177;
bvec3 _res0179;
vec3 _a0181;
bvec3 _res0183;
vec3 _a0185;
bvec3 _res0187;
vec3 _a0189;
bvec3 _res0191;
vec3 _a0193;
bvec3 _res0195;
vec3 _a0197;
bvec3 _res0199;
vec3 _a0201;
bvec3 _res0203;
vec3 _a0205;
bvec3 _res0207;
vec3 _a0209;
vec3 _a0211;
vec3 _a0213;
vec3 _a0215;
vec4 _a0217;
vec2 _x0219;
vec2 _c0223;
vec3 _r0229;
vec4 _v0229;
COMPAT_VARYING vec4 TEX0;
COMPAT_VARYING vec4 TEX1;
COMPAT_VARYING vec4 TEX2;
COMPAT_VARYING vec4 TEX3;
 
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 sTextureSize;
void main()
{
    vec2 _fp;
    vec2 _quad;
    vec3 _w1;
    vec3 _w2;
    vec3 _w3;
    vec3 _w4;
    vec3 _w5;
    vec3 _w6;
    vec3 _w7;
    vec3 _w8;
    vec3 _w9;
    bvec4 _cross;
    vec2 _index;
    vec4 _weights;
    float _sum;
    bvec3 _TMP50[3];
    _x0063 = TEX0.xy*TextureSize;
    _fp = fract(_x0063);
    _a0065 = -5.00000000E-01 + _fp;
    _val0065 = vec2(float((_a0065.x > 0.00000000E+00)), float((_a0065.y > 0.00000000E+00)));
    _TMP0 = _val0065 - vec2(float((_a0065.x < 0.00000000E+00)), float((_a0065.y < 0.00000000E+00)));
    _quad = vec2(float(_TMP0.x), float(_TMP0.y));
    _TMP1 = COMPAT_TEXTURE(Texture, TEX0.xy);
    _c0069 = TEX0.xy + vec2(VARps.x, VARps.y)*vec2(float(_quad.x), float(_quad.y));
    _TMP2 = COMPAT_TEXTURE(Texture, _c0069);
    _c0071 = TEX0.xy + vec2(VARps.x, 0.00000000E+00)*vec2(float(_quad.x), float(_quad.y));
    _TMP3 = COMPAT_TEXTURE(Texture, _c0071);
    _c0073 = TEX0.xy + vec2(0.00000000E+00, VARps.y)*vec2(float(_quad.x), float(_quad.y));
    _TMP4 = COMPAT_TEXTURE(Texture, _c0073);
    _TMP5 = COMPAT_TEXTURE(Texture, TEX1.xw);
    _v0077 = vec3(float(_TMP5.x), float(_TMP5.y), float(_TMP5.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0077.x), float(_v0077.y), float(_v0077.z)));
    _r0077.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0077.x), float(_v0077.y), float(_v0077.z)));
    _r0077.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0077.x), float(_v0077.y), float(_v0077.z)));
    _r0077.z = float(_TMP43);
    _w1 = vec3(float(_r0077.x), float(_r0077.y), float(_r0077.z));
    _TMP7 = COMPAT_TEXTURE(Texture, TEX1.yw);
    _v0087 = vec3(float(_TMP7.x), float(_TMP7.y), float(_TMP7.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0087.x), float(_v0087.y), float(_v0087.z)));
    _r0087.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0087.x), float(_v0087.y), float(_v0087.z)));
    _r0087.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0087.x), float(_v0087.y), float(_v0087.z)));
    _r0087.z = float(_TMP43);
    _w2 = vec3(float(_r0087.x), float(_r0087.y), float(_r0087.z));
    _TMP9 = COMPAT_TEXTURE(Texture, TEX1.zw);
    _v0097 = vec3(float(_TMP9.x), float(_TMP9.y), float(_TMP9.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0097.x), float(_v0097.y), float(_v0097.z)));
    _r0097.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0097.x), float(_v0097.y), float(_v0097.z)));
    _r0097.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0097.x), float(_v0097.y), float(_v0097.z)));
    _r0097.z = float(_TMP43);
    _w3 = vec3(float(_r0097.x), float(_r0097.y), float(_r0097.z));
    _TMP11 = COMPAT_TEXTURE(Texture, TEX2.xw);
    _v0107 = vec3(float(_TMP11.x), float(_TMP11.y), float(_TMP11.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0107.x), float(_v0107.y), float(_v0107.z)));
    _r0107.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0107.x), float(_v0107.y), float(_v0107.z)));
    _r0107.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0107.x), float(_v0107.y), float(_v0107.z)));
    _r0107.z = float(_TMP43);
    _w4 = vec3(float(_r0107.x), float(_r0107.y), float(_r0107.z));
    _v0115 = vec3(float(_TMP1.x), float(_TMP1.y), float(_TMP1.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0115.x), float(_v0115.y), float(_v0115.z)));
    _r0115.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0115.x), float(_v0115.y), float(_v0115.z)));
    _r0115.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0115.x), float(_v0115.y), float(_v0115.z)));
    _r0115.z = float(_TMP43);
    _w5 = vec3(float(_r0115.x), float(_r0115.y), float(_r0115.z));
    _TMP14 = COMPAT_TEXTURE(Texture, TEX2.zw);
    _v0125 = vec3(float(_TMP14.x), float(_TMP14.y), float(_TMP14.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0125.x), float(_v0125.y), float(_v0125.z)));
    _r0125.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0125.x), float(_v0125.y), float(_v0125.z)));
    _r0125.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0125.x), float(_v0125.y), float(_v0125.z)));
    _r0125.z = float(_TMP43);
    _w6 = vec3(float(_r0125.x), float(_r0125.y), float(_r0125.z));
    _TMP16 = COMPAT_TEXTURE(Texture, TEX3.xw);
    _v0135 = vec3(float(_TMP16.x), float(_TMP16.y), float(_TMP16.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0135.x), float(_v0135.y), float(_v0135.z)));
    _r0135.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0135.x), float(_v0135.y), float(_v0135.z)));
    _r0135.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0135.x), float(_v0135.y), float(_v0135.z)));
    _r0135.z = float(_TMP43);
    _w7 = vec3(float(_r0135.x), float(_r0135.y), float(_r0135.z));
    _TMP18 = COMPAT_TEXTURE(Texture, TEX3.yw);
    _v0145 = vec3(float(_TMP18.x), float(_TMP18.y), float(_TMP18.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0145.x), float(_v0145.y), float(_v0145.z)));
    _r0145.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0145.x), float(_v0145.y), float(_v0145.z)));
    _r0145.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0145.x), float(_v0145.y), float(_v0145.z)));
    _r0145.z = float(_TMP43);
    _w8 = vec3(float(_r0145.x), float(_r0145.y), float(_r0145.z));
    _TMP20 = COMPAT_TEXTURE(Texture, TEX3.zw);
    _v0155 = vec3(float(_TMP20.x), float(_TMP20.y), float(_TMP20.z));
    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0155.x), float(_v0155.y), float(_v0155.z)));
    _r0155.x = float(_TMP43);
    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0155.x), float(_v0155.y), float(_v0155.z)));
    _r0155.y = float(_TMP43);
    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0155.x), float(_v0155.y), float(_v0155.z)));
    _r0155.z = float(_TMP43);
    _w9 = vec3(float(_r0155.x), float(_r0155.y), float(_r0155.z));
    _a0165 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w1 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0165);
    _res0163 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP22 = _res0163.x || _res0163.y || _res0163.z;
    _a0169 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w2 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0169);
    _res0167 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP23 = _res0167.x || _res0167.y || _res0167.z;
    _a0173 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w3 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0173);
    _res0171 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP24 = _res0171.x || _res0171.y || _res0171.z;
    _a0177 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w4 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0177);
    _res0175 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP25 = _res0175.x || _res0175.y || _res0175.z;
    _a0181 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w6 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0181);
    _res0179 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP26 = _res0179.x || _res0179.y || _res0179.z;
    _a0185 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w7 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0185);
    _res0183 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP27 = _res0183.x || _res0183.y || _res0183.z;
    _a0189 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w8 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0189);
    _res0187 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP28 = _res0187.x || _res0187.y || _res0187.z;
    _a0193 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w9 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0193);
    _res0191 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP29 = _res0191.x || _res0191.y || _res0191.z;
    _TMP50[0] = bvec3(_TMP22, _TMP23, _TMP24);
    _TMP50[1] = bvec3(_TMP25, false, _TMP26);
    _TMP50[2] = bvec3(_TMP27, _TMP28, _TMP29);
    _a0197 = (_w4 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w2 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0197);
    _res0195 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP30 = _res0195.x || _res0195.y || _res0195.z;
    _a0201 = (_w2 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w6 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0201);
    _res0199 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP31 = _res0199.x || _res0199.y || _res0199.z;
    _a0205 = (_w8 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w4 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0205);
    _res0203 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP32 = _res0203.x || _res0203.y || _res0203.z;
    _a0209 = (_w6 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w8 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));
    _TMP42 = abs(_a0209);
    _res0207 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);
    _TMP33 = _res0207.x || _res0207.y || _res0207.z;
    _cross = bvec4(_TMP30, _TMP31, _TMP32, _TMP33);
    _a0211 = vec3(float(_TMP50[0].x), float(_TMP50[0].y), float(_TMP50[0].z));
    _TMP43 = dot(vec3(float(_a0211.x), float(_a0211.y), float(_a0211.z)), vec3( 1.00000000E+00, 2.00000000E+00, 4.00000000E+00));
    _TMP34 = float(_TMP43);
    _a0213 = vec3(float(_TMP50[1].x), float(_TMP50[1].y), float(_TMP50[1].z));
    _TMP43 = dot(vec3(float(_a0213.x), float(_a0213.y), float(_a0213.z)), vec3( 8.00000000E+00, 0.00000000E+00, 1.60000000E+01));
    _TMP35 = float(_TMP43);
    _a0215 = vec3(float(_TMP50[2].x), float(_TMP50[2].y), float(_TMP50[2].z));
    _TMP43 = dot(vec3(float(_a0215.x), float(_a0215.y), float(_a0215.z)), vec3( 3.20000000E+01, 6.40000000E+01, 1.28000000E+02));
    _TMP36 = float(_TMP43);
    _index.x = _TMP34 + _TMP35 + _TMP36;
    _a0217 = vec4(float(_cross.x), float(_cross.y), float(_cross.z), float(_cross.w));
    _TMP44 = dot(vec4(float(_a0217.x), float(_a0217.y), float(_a0217.z), float(_a0217.w)), vec4( 1.00000000E+00, 2.00000000E+00, 4.00000000E+00, 8.00000000E+00));
    _TMP37 = float(_TMP44);
    _x0219 = _fp*4.00000000E+00;
    _TMP38 = floor(_x0219);
    _TMP39 = dot(_TMP38, vec2( 1.00000000E+00, 4.00000000E+00));
    _index.y = float((float((_TMP37*1.60000000E+01)) + _TMP39));
    _c0223 = vec2(float((_index*vec2( 3.90625000E-03, 3.90625000E-03) + vec2( 1.95312500E-03, 1.95312500E-03)).x), float((_index*vec2( 3.90625000E-03, 3.90625000E-03) + vec2( 1.95312500E-03, 1.95312500E-03)).y));
    _TMP40 = COMPAT_TEXTURE(LUT, _c0223);
    _weights = vec4(float(_TMP40.x), float(_TMP40.y), float(_TMP40.z), float(_TMP40.w));
    _TMP44 = dot(vec4(float(_weights.x), float(_weights.y), float(_weights.z), float(_weights.w)), vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));
    _sum = float(_TMP44);
    _v0229 = vec4(float((_weights/_sum).x), float((_weights/_sum).y), float((_weights/_sum).z), float((_weights/_sum).w));
    _r0229 = _v0229.x*_TMP1.xyz;
    _r0229 = _r0229 + _v0229.y*_TMP2.xyz;
    _r0229 = _r0229 + _v0229.z*_TMP3.xyz;
    _r0229 = _r0229 + _v0229.w*_TMP4.xyz;
    _ret_0 = vec4(_r0229.x, _r0229.y, _r0229.z, 1.00000000E+00);
    FragColor = _ret_0;
    return;
} `;