var vLN03 = 0;
window.onerror = function (p8, p9, p10, p11, p12) {
  if (++vLN03 < 5) {
    $.ajax({
      type: "post",
      url: "/notgood",
      data: {
        ng: p8 + "[li]:" + p10 + " col:" + p11,
        where: encodeURIComponent(location.href)
      },
      async: true,
      success: function (p13) {}
    });
  }
  return false;
};
var vLN04 = 0;
var vLN50000 = 50000;
var vLN05 = 0;
var vLN06 = 0;
function f6() {
  vLN06 = performance.now();
}
function f7() {
  vLN04 = performance.now();
}
function f8() {
  if (++vLN05 == 20) {
    vLN50000 = 3500;
  }
  var v32 = performance.now();
  if (v32 - vLN06 > 3600000 && vLN014 == 1 && vLN066 == 1) {
    f9();
  }
  if (vLN04 < v32 - vLN50000) {
    var v33 = new XMLHttpRequest();
    v33.open("POST", "/notgood", false);
    v33.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    v33.onreadystatechange = function () {};
    var v34 = "ng=fuck me&where=110 calling " + vLN012 + "time." + (v32 - vLN04);
    v33.send(v34);
    v71.terminate();
    location = "about:blank";
  }
  vLN04 = v32;
}
function f9() {
  f87("超过一小时占用房间不玩，已自动踢出房间");
  v232.close();
  vLN06 = 99999999;
}
var vO2 = {};
var vO3 = {};
var v35 = new Uint8Array(1024);
var vLSdivClassonegamehelps = "<div class=\"onegamehelpset\">\n                <span class='onegamehelpsetName'>{{name}}</span>\n                <input type=\"checkbox\" id=\"{{id}}\" class=\"key\">\n                <label for=\"{{id}}\" class=\"key-bg\">\n                    <span class=\"circle\"></span>\n                    <span class=\"on\">开</span>\n                    <span class=\"off\">关</span>\n                </label>\n                </div>";
var vLSdivClassgroupgameche = "<div class=\"groupgamecheatset\">\n                <span class='onegamehelpsetName'>{{name}}</span>\n                <select  id=\"{{id}}\" class=\"\">\n                <option value=\"-1\">关</option>{{someopt}}                </select>\n                </div>";
function f10(p14, p15) {
  var vI_sxfci_ = f362("gamecheat_setlist");
  var v36 = document.createElement("div");
  var v37 = vLSdivClassgroupgameche.replace("{{name}}", p14).replace("{{id}}", "cg" + p14).replace("{{id}}", "cg" + p14);
  var vLS = "";
  for (var v38 in p15) {
    vLS += "<option value=\"" + v38 + "\">" + v38 + "</option>";
  }
  v37 = v37.replace("{{someopt}}", vLS);
  v36.innerHTML = v37;
  vI_sxfci_.appendChild(v36);
  f366("cg" + p14, "change", function (p16) {
    if (vO3[p14] != null) {
      for (var v42 in p15[vO3[p14]].data) {
        var v40 = p15[vO3[p14]].data[v42];
        var v41 = p15[vO3[p14]].ID;
        for (var vV40 = v40, vLN07 = 0; vLN07 < vV40.size; vLN07++) {
          v35[vLN07] = parseInt(vV40.value.substr(vLN07 * 2, 2), 16);
        }
        f307({
          type: "setcheat",
          onoff: 0,
          cheatID: v41,
          cheatAddr: parseInt(vV40.address, 16),
          cheatSize: vV40.size,
          cheatData: v35
        });
      }
    }
    vO3[p14] = this.value;
    for (var v42 in p15[this.value].data) {
      v40 = p15[this.value].data[v42];
      v41 = p15[this.value].ID;
      vV40 = v40;
      vLN07 = 0;
      for (; vLN07 < vV40.size; vLN07++) {
        v35[vLN07] = parseInt(vV40.value.substr(vLN07 * 2, 2), 16);
      }
      f307({
        type: "setcheat",
        onoff: 1,
        cheatID: v41,
        cheatAddr: parseInt(vV40.address, 16),
        cheatSize: vV40.size,
        cheatData: v35
      });
    }
  });
}
function f11() {
  f362("gamehelptitle").innerText = "【" + vO2.Name + "】金手指大全";
  if (!(vO2.length <= 0)) {
    f362("nogamehelp").style.display = "none";
    var vI_sxfci_2 = f362("gamecheat_setlist");
    for (var v43 in vO2) {
      if (v43 != "Name" && v43 != "GameType") {
        var v44 = vO2[v43];
        if (v44.data == null) {
          f10(v43, v44);
        } else {
          var v45 = v44.ID;
          var v46 = document.createElement("div");
          var v47 = vLSdivClassonegamehelps.replace("{{name}}", v43).replace("{{id}}", "cd" + v45).replace("{{id}}", "cd" + v45);
          v46.innerHTML = v47;
          vI_sxfci_2.appendChild(v46);
          (function () {
            var vV43 = v43;
            f366("cd" + v45, "change", function (p17) {
              for (var v48 in vO2[vV43].data) {
                for (var v49 = vO2[vV43].data[v48], vLN08 = 0; vLN08 < v49.size; vLN08++) {
                  v35[vLN08] = parseInt(v49.value.substr(vLN08 * 2, 2), 16);
                }
                if (this.checked) {
                  f307({
                    type: "setcheat",
                    onoff: 1,
                    cheatID: vO2[vV43].ID,
                    cheatAddr: parseInt(v49.address, 16),
                    cheatSize: v49.size,
                    cheatData: v35
                  });
                } else {
                  f307({
                    type: "setcheat",
                    onoff: 0,
                    cheatID: vO2[vV43].ID,
                    cheatAddr: parseInt(v49.address, 16),
                    cheatSize: v49.size,
                    cheatData: v35
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
function f12() {
  if (vLN014 != 1) {
    var v50 = new XMLHttpRequest();
    v50.open("GET", "/cheatcode?type=fc&gid=" + vLN012, true);
    v50.responseType = "json";
    v50.onreadystatechange = function () {
      if (v50.readyState == XMLHttpRequest.DONE && v50.status == 200 && v50.response.status == "success") {
        var v51 = v50.response.script;
        try {
          vO2 = JSON.parse(v51);
          f11();
          if (vO2 != null) {
            // TOLOOK
            setTimeout(function () {
              if (v66) {
                f89("本游戏金手指可用");
              } else {
                f251("本游戏金手指可用");
              }
            }, 2000);
          }
        } catch (e3) {
          return;
        }
      }
    };
    v50.send();
  }
}
$.fn.RangeSlider = function (p18) {
  this.t = {
    min: p18 && !isNaN(parseFloat(p18.min)) ? Number(p18.min) : null,
    max: p18 && !isNaN(parseFloat(p18.max)) ? Number(p18.max) : null,
    step: p18 && Number(p18.step) ? p18.step : 1,
    i: p18 && p18.i ? p18.i : null
  };
  var v$ = $(this);
  var v52 = this.t.min;
  var v53 = this.t.max;
  var v54 = this.t.step;
  var v55 = this.t.i;
  v$.attr("min", v52).attr("max", v53).attr("step", v54);
  v$.bind("input", function (p19) {
    v$.attr("value", this.value);
    v$.css("background-size", this.value + "% 100%");
    if ($.isFunction(v55)) {
      v55(this);
    }
  });
};
var vLSFc = "fc";
var v56 = false;
function f13() {
  document.addEventListener("visibilitychange", function (p20) {
    if (document.visibilityState === "visible") {
      v428 = false;
    }
    if (document.visibilityState === "hidden") {
      v428 = true;
    }
  });
}
function f14() {
  f250(vLN014 == 1 ? "欢迎进入 【" + vLS2 + "】【" + vLN015 + "】 房间" : "欢迎来到畅玩空间！");
}
function f15() {
  if (navigator.userAgent.indexOf("MicroMessenger") > 0) {
    v56 = true;
  }
  if (typeof WebAssembly == "object") {
    var vI_tdBda_ = f361("gstate");
    (v71 = vLN014 == 1 ? (vLN017 = f361("sev"), new Worker("cyc/gstyphoon.js?sev=" + vLN017 + "&gstate=" + vI_tdBda_)) : f361("geeker") == "1" ? new Worker("cyc/gstyphoon.js?geeker=1") : new Worker("cyc/gstyphoon.js?gstate=" + vI_tdBda_)).onmessage = f301;
    v71.onerror = function (p21) {
      if (p21.message + "[li]:" + p21.lineno != vLS3) {
        $.ajax({
          type: "post",
          url: "/notgood",
          data: {
            ng: p21.message + "[li]:" + p21.lineno + "[col]:" + p21.colno,
            where: encodeURIComponent(location.href + "[worker]")
          },
          async: true,
          success: function (p22) {}
        });
        vLS3 = p21.message + "[li]:" + p21.lineno;
      }
    };
    f23();
    f358();
    f378();
    f284();
    f263();
    f143();
    f13();
    f365("btn_vote_yes", f21);
    f365("btn_vote_no", f20);
    f12();
    f32();
  } else {
    alert("本浏览器不支持最新web特性，请下载畅玩空间PC版或者使用chrome游戏😿");
  }
}
function f16() {
  if (vLN014 == 0) {
    f309(vO17.o, 1);
    // TOLOOK
    setTimeout(function () {
      f309(vO17.o, 0);
      f251("重开了游戏");
    }, 50);
  } else if (f155()) {
    f309(vO17.o, 1);
    // TOLOOK
    setTimeout(function () {
      f309(vO17.o, 0);
      f150("message", "房主重开了游戏");
    }, 50);
  } else {
    f250("非房主不可重开");
  }
}
function f17() {
  var vI_sxfci_3 = f362("suspendTxt");
  var vI_sxfci_4 = f362("suspendIcon");
  if (vI_sxfci_3.innerText.indexOf("暂停") >= 0) {
    if (vLN014 == 1) {
      f150("vote", "stop");
      return;
    }
    vO29.s();
    vI_sxfci_4.style.color = "#ff0000";
    vI_sxfci_4.classList.replace("igwi-zanting", "igwi-kaishi");
    vI_sxfci_3.innerText = "继续";
  } else {
    if (vLN014 == 1) {
      f150("vote", "continue");
      return;
    }
    vO29.l();
    vI_sxfci_4.style.color = "";
    vI_sxfci_4.classList.replace("igwi-kaishi", "igwi-zanting");
    vI_sxfci_3.innerText = "暂停";
  }
}
function f18() {
  f25();
}
function f19(p23, p24) {
  f362("votetext").innerText = p23;
  f362("popwin_vote").style.display = "block";
}
function f20() {
  f150("voterez", "no");
  f362("popwin_vote").style.display = "none";
}
function f21() {
  f150("voterez", "ok");
  f362("popwin_vote").style.display = "none";
}
function f22() {
  if (typeof WebAssembly == "object") {
    var vI_tdBda_2 = f361("gstate");
    (v71 = vLN014 == 1 ? (vLN017 = f361("sev"), new Worker("cyc/gstyphoon.js?sev=" + vLN017 + "&gstate=" + vI_tdBda_2)) : f361("geeker") == "1" ? new Worker("cyc/gstyphoon.js?geeker=1") : new Worker("cyc/gstyphoon.js?gstate=" + vI_tdBda_2)).onmessage = f301;
    v71.onerror = function (p25) {
      if (p25.message + "[li]:" + p25.lineno != vLS3) {
        $.ajax({
          type: "post",
          url: "/notgood",
          data: {
            ng: p25.message + "[li]:" + p25.lineno + "[col]:" + p25.colno,
            where: encodeURIComponent(location.href + "[worker]")
          },
          async: true,
          success: function (p26) {}
        });
        vLS3 = p25.message + "[li]:" + p25.lineno;
      }
    };
    f23();
    f358();
    f378();
    f105();
    f143();
    f12();
    f32();
  } else {
    alert("本浏览器不支持最新web特性，请下载畅玩空间PC版或者使用chrome游戏😿");
  }
}
function f23() {
  if (typeof SharedArrayBuffer != "undefined" && f361("geeker") != "1" && (v57 = new SharedArrayBuffer(2048)) != null) {
    document.title += "*";
    v58 = new SharedArrayBuffer(306144);
    v59 = new Uint16Array(v57, 0, 2);
    v61 = new Uint16Array(v57, vLN64, 1024 - vLN64 / 2);
    v62 = new Uint32Array(v57, vLN8, vLN4);
    v60 = new Int32Array(v57, vLN322, vLN43);
    v63 = new Uint32Array(v57, vLN48, vLN44);
  }
}
function f24() {
  f37();
  f87(vLN014 == 1 ? "欢迎进入 【" + vLS2 + "】【" + vLN015 + "】 房间" : "单机模式，可使用云存档等方便功能");
  f97();
}
var v383 = 0;
function f25() {
  if (vLN014 == 1) {
    if (vLN067 == vLN065) {
      if (performance.now() < 60000) {
        f87("录像长度小于一分钟，不允许保存");
      } else if (performance.now() - v383 < 60000) {
        f87("一分钟内只允许保存一次");
      } else {
        v383 = performance.now();
        f150("savereplay", "");
      }
    } else {
      f87("目前只允许房主保存房间录像");
    }
  } else {
    f87("只有联机模式才允许保存录像");
  }
}
function f26() {
  if (vLN014 == 0) {
    f309(vO17.o, 1);
    // TOLOOK
    setTimeout(function () {
      f309(vO17.o, 0);
      f89("重开了游戏");
    }, 50);
  } else if (f155()) {
    f309(vO17.o, 1);
    // TOLOOK
    setTimeout(function () {
      f309(vO17.o, 0);
      f150("message", "房主重开了游戏");
    }, 50);
  } else {
    f87("非房主不可重开");
  }
}
function f27() {
  var vI_sxfci_5 = f362("btn_pause");
  if (vI_sxfci_5.innerText.indexOf("暂停") >= 0) {
    if (vLN014 == 1) {
      f150("vote", "stop");
      return;
    }
    vO29.s();
    vI_sxfci_5.childNodes[0].classList.replace("igwi-zanting", "igwi-jixu");
    vI_sxfci_5.style.background = "rgba(220, 67, 59, 1)";
    vI_sxfci_5.childNodes[1].textContent = " 继续";
  } else {
    if (vLN014 == 1) {
      f150("vote", "continue");
      return;
    }
    vO29.l();
    vI_sxfci_5.childNodes[0].classList.replace("igwi-jixu", "igwi-zanting");
    vI_sxfci_5.style.background = "rgba(57, 55, 50, 1)";
    vI_sxfci_5.childNodes[1].textContent = " 暂停";
  }
}
function f28(p27, p28) {
  f362("votetext").innerText = p27;
  f362("popwin_vote").style.display = "block";
}
function f29() {
  f150("voterez", "no");
  f362("popwin_vote").style.display = "none";
}
function f30() {
  f150("voterez", "ok");
  f362("popwin_vote").style.display = "none";
}
var v57 = null;
var v58 = null;
var v59 = null;
var vLN010 = 0;
var vLN1 = 1;
var vLN2 = 2;
var vLN3 = 3;
var v60 = null;
var vLN011 = 0;
var vLN12 = 1;
var vLN22 = 2;
var vLN32 = 3;
var v61 = null;
var v62 = null;
var v63 = null;
var vLN8 = 8;
var vLN322 = 32;
var vLN48 = 48;
var vLN64 = 64;
var vLN4 = 4;
var vLN42 = 4;
var vLN43 = 4;
var vLN44 = 4;
function f31(p29) {
  if (typeof p29 != "string") {
    p29 = JSON.stringify(p29);
  }
  navigator.sendBeacon("/nextgame/trace/gamefeedback", p29);
}
var vO4 = {
  GameType: "",
  GameID: 0,
  u: 0,
  _: 0,
  v: 0,
  p: 0,
  m: 0
};
function f32() {
  vO4.GameType = "fc";
  vO4.GameID = parseInt(vLN012);
  vO4.u = new Date();
  window.addEventListener("unload", f33);
}
function f33() {
  vO4._ = new Date();
  vO4.v = vO4._ - vO4.u;
  var vLSLink = "link";
  if (vLN014 == 0) {
    vLSLink = "local";
  } else if (v378) {
    vLSLink = "look";
  }
  f31({
    GameType: vO4.GameType,
    GameID: vO4.GameID,
    Version: "v1.0",
    StrData: [vLSLink, vLN017 + "_" + vLN015, vO4.u, vO4._, vO4.v + ""],
    IntData: [v442.LevelInfo.Level, v442.LevelInfo.AllXP, v442.LevelInfo.VipLevel, v442.LevelInfo.Svip, vO4.p]
  });
}
window.addEventListener("load", f34);
var vLS2 = "";
var vLN012 = 0;
var vLN013 = 0;
var v64 = false;
var vLN014 = 0;
var vLN015 = 0;
var v66 = false;
var vLN016 = 0;
var v66 = false;
var v67 = false;
var vLN017 = 0;
var v68;
var v69;
var v70;
var v71 = null;
var vLS3 = "";
var vLN018 = 0;
function f34() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    v66 = false;
  } else if (document.getElementById("phonewrap") == null) {
    v66 = true;
  }
  if (navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0) {
    v67 = true;
  }
  if (!vO15.g()) {
    if (v66) {
      $("#igwWinCtl").hide();
      document.body.style.minWidth = "1180px";
      document.body.style.minHeight = "700px";
    }
  }
  vLN012 = f361("id");
  vLN014 = f361("mode");
  vLN016 = f361("rid");
  if (document.cookie.indexOf("pmode=pc") >= 0) {
    v66 = true;
  }
  if (vLN014 == null) {
    vLN014 = 0;
  }
  if (vLN014 == 1) {
    vLN015 = f361("linkid");
  }
  $.get("/gameinfo?type=fc&gameid=" + vLN012, function (p30) {
    document.title = "畅玩空间 - " + p30.title;
    vLS2 = p30.title;
    wxCImg = p30.img;
    v68 = p30.name;
    v69 = p30.size;
    v70 = p30.data;
    v64 = true;
    Wx_LinkGame = p30.title;
    Wx_Imgkey = v68;
    if (v66) {
      f106(vLS2);
      f22();
    } else {
      f259(vLS2);
      f15();
    }
  });
}
document.oncontextmenu = function (p31) {
  return false;
};
var v72 = false;
function f35() {
  if (!v72) {
    v72 = true;
    f331();
    if (v66) {
      f24();
    } else {
      f14();
    }
  }
}
var vLN019 = 0;
var v73 = null;
var v74 = null;
var v75 = true;
var v76 = true;
var v77 = false;
var v78 = true;
var v79 = false;
var v80 = true;
var v81 = true;
var v82 = true;
var v83 = false;
var v84 = false;
var v85 = true;
var v86 = true;
var v87 = false;
var v88 = false;
var v89 = new Int32Array(128);
var vLSdivClassonegamehelps2 = "<div class=\"onegamehelpset\">\n                <span class='onegamehelpsetName'>{{name}}</span>\n                <input type=\"checkbox\" id=\"{{id}}\" class=\"key\" checked>\n                <label for=\"{{id}}\" class=\"key-bg\">\n                    <span class=\"circle\"></span>\n                    <span class=\"on\">开</span>\n                    <span class=\"off\">关</span>\n                </label>\n                </div>";
function f36(p32) {
  if (p32.id == "sgqbws_xs") {
    v75 = p32.checked;
  }
  if (p32.id == "sgqbws_xst") {
    v80 = p32.checked;
  }
  if (p32.id == "sgqbws_ms") {
    v76 = p32.checked;
  }
  if (p32.id == "sgqbws_sh") {
    v77 = p32.checked;
  }
  if (p32.id == "sgqbws_time") {
    v78 = p32.checked;
  }
  if (p32.id == "sgqbws_yx") {
    v79 = p32.checked;
  }
  if (p32.id == "sgqbws_rankwj" && vLN067 == vLN065 && p32.checked) {
    cyc_queryID("sgqbws_rankwj").disabled = (vLN014 == 0 ? (v89[0] = 180, v71.postMessage(v89.buffer)) : (f150("message", "【随机武将开启】"), v89[0] = vLN051 + 180, v232.send(v89)), true);
  }
  if (p32.id == "sgqbws_rankBwj" && vLN067 == vLN065 && p32.checked) {
    cyc_queryID("sgqbws_rankBwj").disabled = (vLN014 == 0 ? (v89[3] = 180, v71.postMessage(v89.buffer)) : (f150("message", "【随机B面武将开启】"), v89[3] = vLN051 + 180, v232.send(v89)), true);
  }
  if (p32.id == "sgqbws_study" && vLN067 == vLN065 && p32.checked) {
    cyc_queryID("sgqbws_study").disabled = (vLN014 == 1 ? (f150("message", "【练习模式开启】"), v89[1] = vLN051 + 180, v232.send(v89)) : (v89[1] = 180, v71.postMessage(v89.buffer)), true);
  }
  if (p32.id == "sgqbws_dead" && vLN067 == vLN065 && p32.checked) {
    cyc_queryID("sgqbws_dead").disabled = (vLN014 == 1 ? (f150("message", "【敌人不动开启】"), v89[2] = vLN051 + 180, v232.send(v89)) : (v89[2] = 180, v71.postMessage(v89.buffer)), true);
  }
  if (p32.id == "sgqxzq_rankwj" && vLN067 == vLN065 && p32.checked) {
    cyc_queryID("sgqxzq_rankwj").disabled = (vLN014 == 0 ? (v89[0] = 180, v71.postMessage(v89.buffer)) : (f150("message", "【随机武将开启】"), v89[0] = vLN051 + 180, v232.send(v89)), true);
  }
  if (p32.id == "sgqbqx_xs") {
    v81 = p32.checked;
  }
  if (p32.id == "sgqbqx_xst") {
    v82 = p32.checked;
  }
  if (p32.id == "sgqbqx_sh") {
    v83 = p32.checked;
  }
  if (p32.id == "sgqbqx_yx") {
    v84 = p32.checked;
  }
  if (p32.id == "sgqbpl_xs") {
    v85 = p32.checked;
  }
  if (p32.id == "sgqbpl_xst") {
    v86 = p32.checked;
  }
  if (p32.id == "sgqbpl_sh") {
    v87 = p32.checked;
  }
  if (p32.id == "sgqbpl_yx") {
    v88 = p32.checked;
  }
}
var v90 = false;
var v91 = false;
function f37() {}
function f38() {}
function f39(p33) {
  if (!(p33.length <= 0)) {
    f362("nogamehelp").style.display = "none";
    var vI_sxfci_6 = f362("gamehelp_setlist");
    for (var v92 in p33) {
      var v93 = p33[v92];
      switch (v93.type) {
        case "checkbox":
          var v94 = document.createElement("div");
          var v95 = vLSdivClassonegamehelps2.replace("{{name}}", v93.name).replace("{{id}}", v93.id).replace("{{id}}", v93.id);
          if (!v93.value) {
            v95 = v95.replace("checked", "");
          }
          v94.innerHTML = v95;
          vI_sxfci_6.appendChild(v94);
          (function () {
            var vV92 = v92;
            f366(v93.id, "change", function (p34) {
              p33[vV92].value = this.checked;
            });
          })();
          break;
        case "checkfunc":
          v94 = document.createElement("div");
          v95 = vLSdivClassonegamehelps2.replace("{{name}}", v93.name).replace("{{id}}", v93.id).replace("{{id}}", v93.id);
          if (!v93.value) {
            v95 = v95.replace("checked", "");
          }
          v94.innerHTML = v95;
          vI_sxfci_6.appendChild(v94);
          f366(v93.id, "change", p33[v92].h);
      }
    }
  }
}
function f40(p35) {
  if (v66) {
    if (v231) {
      f325();
      return;
    }
    v74.clearRect(0, 0, v73.width, v73.height);
    v74.fillStyle = "rgba(15,15,16,0.5)";
    v74.fillRect(0, 0, v73.width, v73.height);
    var v96 = v74.font;
    v74.font = "30px Verdana";
    var v97 = v74.createLinearGradient(0, 0, v73.width, 0);
    v97.addColorStop(0, "#fff");
    v97.addColorStop(0.5, "#aaa");
    v97.addColorStop(1, "#888");
    v74.fillStyle = v97;
    v74.fillText(p35, v73.width / 2 - 50, v73.height / 2, 300);
    v74.font = v96;
  }
}
function f41() {
  v74.clearRect(0, 0, v73.width * 2, v73.height);
}
var v98 = new Array();
function f42(p36) {}
var vO5 = {
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
function f43(p37) {
  v74.strokeStyle = "#111";
  v74.shadowColor = "#202020";
  v74.shadowOffsetX = 1;
  v74.shadowOffsetY = 1;
  v74.shadowBlur = 2;
  for (var vLN020 = 0; vLN020 < 8; vLN020++) {
    var v99 = p37[49 + vLN020] * 2;
    var v100 = p37[65 + vLN020] * 2 + p37[81 + vLN020] * 2 - 148;
    var v101 = p37[99 + vLN020];
    if (v101 != 0 && vO5.P.value) {
      var v102 = v100 + 30 + Math.floor(v101 / 4);
      if (v100 < 20) {
        v102 = 30 + Math.floor(v101 / 4);
      }
      var vO6 = {
        x: v99 + Math.floor(Math.random() * 60) - 30,
        y: v102,
        S: v101 * 100,
        K: 15,
        O: 12,
        R: Math.floor(v101 / 40) + 2
      };
      v98.push(vO6);
    }
  }
  if (vLN093 % 2 != 0) {
    v74.clearRect(0, 0, v73.width, v73.width);
    v74.fillStyle = "#eee";
    if (vO5.k.value) {
      var vLN021 = 0;
      for (vLN020 = 0; vLN020 < 8; vLN020++) {
        if (p37[17 + vLN020] != 0) {
          v99 = p37[49 + vLN020] * 2;
          v100 = p37[65 + vLN020] * 2 + p37[81 + vLN020] * 2 - 148;
          v74.fillStyle = "#eee";
          v74.strokeStyle = "#111";
          var vLS4 = "";
          if (vO5.M.value) {
            vLS4 = vLN020 + 1 + ". ";
          }
          if (vO5.T.value) {
            v74.strokeText(vLS4 + "HP:" + p37[17 + vLN020] * 100, v99 + 1 - 10, v100 + 1, 100);
            v74.fillText(vLS4 + "HP:" + p37[17 + vLN020] * 100, v99 - 10, v100, 100);
          }
          v74.strokeStyle = "#fff";
          v74.lineWidth = 1;
          v74.beginPath();
          v74.rect(v99 - 16, v100 - 20, 60, 2);
          v74.closePath();
          v74.stroke();
          var v103 = p37[17 + vLN020] / p37[33 + vLN020] * 60;
          v74.fillStyle = v103 > 40 ? "#50ff60" : v103 > 20 ? "#f06f00" : "#cf0000";
          v74.fillRect(v99 - 16, v100 - 20, v103, 2);
          vLN021++;
        }
      }
      if (p37[0] > 0) {
        v74.fillStyle = "#f0fff0";
      } else {
        v74.fillStyle = "#909090";
      }
      v74.strokeStyle = "#111";
      v74.strokeText("剩余敌人" + vLN021, vLN0109 * 2 - 90 + 1, vLN0110 * 2 - 35 + 1, 100);
      v74.fillText("剩余敌人" + vLN021, vLN0109 * 2 - 90, vLN0110 * 2 - 35, 100);
    }
    if (vO5.P.value) {
      var v104;
      var v105 = v74.font;
      v74.shadowColor = "#fffc00";
      v74.shadowBlur = 5;
      v74.lineWidth = 2;
      for (v104 in v98) {
        v98[v104].K--;
        v98[v104].y -= 2;
        if (v98[v104].K > 5) {
          v98[v104].O += v98[v104].R;
        }
        if (v98[v104].K > 0) {
          v74.font = "900 " + v98[v104].O + "px Microsoft YaHei";
          var v106 = v74.createLinearGradient(v98[v104].x, v98[v104].y - v98[v104].O + 5, v98[v104].x, v98[v104].y - 5);
          v106.addColorStop(0, "#5be8a0");
          v106.addColorStop(1, "#ff0050");
          v74.fillStyle = v106;
          v74.fillText(v98[v104].S, v98[v104].x, v98[v104].y, 300);
          v74.strokeText(v98[v104].S, v98[v104].x, v98[v104].y, 300);
        } else {
          v98.shift();
        }
      }
      v74.font = v105;
    }
  }
}
var vO7 = {
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
    h: function (p38) {
      if (this.checked) {
        if (vLN067 != vLN065) {
          f87("非房主不可设置");
          this.checked = false;
          return;
        }
        if (vLN014 == 0) {
          v89[0] = 180;
          v71.postMessage(v89.buffer);
          f362("gh_randsel").disabled = true;
          f87("【随机武将开启】");
        } else {
          f150("message", "【随机武将开启】");
          v89[0] = vLN051 + 180;
          v232.send(v89);
          f362("gh_randsel").disabled = true;
        }
      }
    }
  }
};
function f44(p39) {
  v74.strokeStyle = "#111";
  v74.shadowColor = "#202020";
  v74.shadowOffsetX = 1;
  v74.shadowOffsetY = 1;
  v74.shadowBlur = 2;
  for (var vLN022 = 0; vLN022 < 8; vLN022++) {
    var v107 = p39[49 + vLN022] * 2;
    var v108 = p39[65 + vLN022] * 2 + p39[81 + vLN022] * 2 - 148;
    var v109 = p39[99 + vLN022];
    if (v109 != 0 && vO7.P.value) {
      var v110 = v108 + 30 + Math.floor(v109 / 4);
      if (v108 < 20) {
        v110 = 30 + Math.floor(v109 / 4);
      }
      var vO8 = {
        x: v107 + Math.floor(Math.random() * 60) - 30,
        y: v110,
        S: v109 * 100,
        K: 15,
        O: 12,
        R: Math.floor(v109 / 40) + 2
      };
      v98.push(vO8);
    }
  }
  if (vLN093 % 2 != 0) {
    v74.clearRect(0, 0, v73.width, v73.width);
    v74.fillStyle = "#eee";
    if (vO7.k.value) {
      var vLN023 = 0;
      for (vLN022 = 0; vLN022 < 8; vLN022++) {
        if (p39[17 + vLN022] != 0) {
          v107 = p39[49 + vLN022] * 2;
          v108 = p39[65 + vLN022] * 2 + p39[81 + vLN022] * 2 - 148;
          v74.fillStyle = "#eee";
          v74.strokeStyle = "#111";
          var vLS5 = "";
          if (vO7.M.value) {
            vLS5 = vLN022 + 1 + ". ";
          }
          if (vO7.T.value) {
            v74.strokeText(vLS5 + "HP:" + p39[17 + vLN022] * 100, v107 + 1 - 10, v108 + 1, 100);
            v74.fillText(vLS5 + "HP:" + p39[17 + vLN022] * 100, v107 - 10, v108, 100);
          }
          v74.strokeStyle = "#fff";
          v74.lineWidth = 1;
          v74.beginPath();
          v74.rect(v107 - 16, v108 - 20, 60, 2);
          v74.closePath();
          v74.stroke();
          var v111 = p39[17 + vLN022] / p39[33 + vLN022] * 60;
          v74.fillStyle = v111 > 40 ? "#50ff60" : v111 > 20 ? "#f06f00" : "#cf0000";
          v74.fillRect(v107 - 16, v108 - 20, v111, 2);
          vLN023++;
        }
      }
      if (p39[0] > 0) {
        v74.fillStyle = "#f0fff0";
      } else {
        v74.fillStyle = "#909090";
      }
      v74.strokeStyle = "#111";
      v74.strokeText("剩余敌人" + vLN023, vLN0109 * 2 - 90 + 1, vLN0110 * 2 - 35 + 1, 100);
      v74.fillText("剩余敌人" + vLN023, vLN0109 * 2 - 90, vLN0110 * 2 - 35, 100);
    }
    if (vO7.P.value) {
      var v112;
      var v113 = v74.font;
      v74.shadowColor = "#fffc00";
      v74.shadowBlur = 5;
      v74.lineWidth = 2;
      for (v112 in v98) {
        v98[v112].K--;
        v98[v112].y -= 2;
        if (v98[v112].K > 5) {
          v98[v112].O += v98[v112].R;
        }
        if (v98[v112].K > 0) {
          v74.font = "900 " + v98[v112].O + "px Microsoft YaHei";
          var v114 = v74.createLinearGradient(v98[v112].x, v98[v112].y - v98[v112].O + 5, v98[v112].x, v98[v112].y - 5);
          v114.addColorStop(0, "#5be8a0");
          v114.addColorStop(1, "#ff0050");
          v74.fillStyle = v114;
          v74.fillText(v98[v112].S, v98[v112].x, v98[v112].y, 300);
          v74.strokeText(v98[v112].S, v98[v112].x, v98[v112].y, 300);
        } else {
          v98.shift();
        }
      }
      v74.font = v113;
    }
  }
}
var vO9 = {
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
    h: function (p40) {
      if (this.checked) {
        if (vLN067 != vLN065) {
          f87("非房主不可设置");
          this.checked = false;
          return;
        }
        if (vLN014 == 0) {
          v89[0] = 180;
          v71.postMessage(v89.buffer);
          f362("gh_randsel").disabled = true;
          f87("【随机武将开启】");
        } else {
          f150("message", "【随机武将开启】");
          v89[0] = vLN051 + 180;
          v232.send(v89);
          f362("gh_randsel").disabled = true;
        }
      }
    }
  },
  D: {
    name: "随机B面武将",
    id: "gh_randbsel",
    type: "checkfunc",
    value: false,
    h: function (p41) {
      if (this.checked) {
        if (vLN067 != vLN065) {
          f87("非房主不可设置");
          this.checked = false;
          return;
        }
        if (vLN014 == 0) {
          v89[3] = 180;
          v71.postMessage(v89.buffer);
          f362("gh_randbsel").disabled = true;
          f87("【随机B武将开启】");
        } else {
          f150("message", "【随机B面武将开启】");
          v89[3] = vLN051 + 180;
          v232.send(v89);
          f362("gh_randbsel").disabled = true;
        }
      }
    }
  },
  G: {
    name: "练习模式",
    id: "gh_studymod",
    type: "checkfunc",
    value: false,
    h: function (p42) {
      if (this.checked) {
        if (vLN067 != vLN065) {
          f87("非房主不可设置");
          this.checked = false;
          return;
        }
        if (vLN014 == 1) {
          f150("message", "【练习模式开启】");
          v89[1] = vLN051 + 180;
          v232.send(v89);
          f362("gh_studymod").disabled = true;
        } else {
          v89[1] = 180;
          v71.postMessage(v89.buffer);
          f362("gh_studymod").disabled = true;
          f88("【练习模式开启】");
        }
      }
    }
  },
  F: {
    name: "敌人不攻击",
    id: "gh_deadman",
    type: "checkfunc",
    value: false,
    h: function (p43) {
      if (this.checked) {
        if (vLN067 != vLN065) {
          f87("非房主不可设置");
          this.checked = false;
          return;
        }
        if (vLN014 == 1) {
          f150("message", "【敌人不动开启】");
          v89[2] = vLN051 + 180;
          v232.send(v89);
          f362("gh_deadman").disabled = true;
        } else {
          v89[2] = 180;
          v71.postMessage(v89.buffer);
          f362("gh_deadman").disabled = true;
          f88("【敌人不动开启】");
        }
      }
    }
  }
};
function f45(p44) {
  for (var vLN024 = 0; vLN024 < p44[0]; vLN024++) {
    var v115 = p44[49 + vLN024] * 2;
    var v116 = p44[65 + vLN024] * 2 + p44[81 + vLN024] * 2 - 148;
    var v117 = p44[99 + vLN024];
    if (v117 != 0 && vO9.P.value) {
      var v118 = v116 + 30 + Math.floor(v117 / 4);
      if (v116 < 20) {
        v118 = 30 + Math.floor(v117 / 4);
      }
      var vO10 = {
        x: v115 + Math.floor(Math.random() * 60) - 30,
        y: v118,
        S: v117 * 100,
        K: 15,
        O: 12,
        R: Math.floor(v117 / 40) + 2
      };
      v98.push(vO10);
    }
  }
  if (vLN093 % 2 != 0) {
    v74.clearRect(0, 0, v73.width, v73.width);
    if (vO9.U.value) {
      var v119 = p44[98];
      var v120 = Math.floor(v119 * 16.66666 / 1000);
      var v121 = Math.floor(v120 / 60);
      v120 %= 60;
      var v122 = Math.floor(v119 * 16.66666 % 1000 / 10);
      v74.fillStyle = "#30ff30";
      v74.strokeStyle = "#111";
      v74.shadowColor = "#202020";
      v74.shadowOffsetX = 1;
      v74.shadowOffsetY = 1;
      v74.shadowBlur = 2;
      v74.strokeText(" " + v121 + "分" + v120 + "." + v122 + "秒", vLN0109 * 2 - 80 + 1, vLN0110 * 2 - 4 + 1, 100);
      v74.fillText(" " + v121 + "分" + v120 + "." + v122 + "秒", vLN0109 * 2 - 80, vLN0110 * 2 - 4, 100);
    }
    v74.fillStyle = "#eee";
    if (vO9.N.value) {
      var vLS6 = "";
      if (p44[97] & 8) {
        vLS6 = "上";
      }
      if (p44[97] & 4) {
        vLS6 += "下";
      }
      if (p44[97] & 1) {
        vLS6 += "A";
      }
      if (p44[97] & 2) {
        vLS6 += "B";
      }
      if (p44[97] & 16) {
        vLS6 += "C";
      }
      if (vLS6 == "") {
        vLS6 = "无";
      }
      switch (p44[115]) {
        case 1:
          vLS6 += "【简单】";
          break;
        case 2:
          vLS6 += "【极难】";
          break;
        case 3:
          vLS6 += "【达人】";
          break;
        case 4:
          vLS6 += "【专家】";
          break;
        case 5:
          vLS6 += "【大师】";
          break;
        case 6:
          vLS6 += "【宗师】";
          break;
        case 7:
          vLS6 += "【天王】";
          break;
        case 8:
          vLS6 += "【至尊】";
          break;
        case 9:
          vLS6 += "【传说】";
          break;
        default:
          vLS6 += "[未知难度]";
      }
      v74.strokeText("模式:" + vLS6, vLN0109 * 2 - 120 + 1, vLN0110 * 2 - 50 + 1, 120);
      v74.fillText("模式:" + vLS6, vLN0109 * 2 - 120, vLN0110 * 2 - 50, 120);
    }
    if (vO9.k.value) {
      var vLN025 = 0;
      for (vLN024 = 0; vLN024 < p44[0]; vLN024++) {
        if (p44[17 + vLN024] != 0) {
          v115 = p44[49 + vLN024] * 2;
          v116 = p44[65 + vLN024] * 2 + p44[81 + vLN024] * 2 - 148;
          v74.fillStyle = "#eee";
          v74.strokeStyle = "#111";
          var vLS7 = "";
          if (vO9.M.value) {
            vLS7 = vLN024 + 1 + ". ";
          }
          if (vO9.T) {
            v74.strokeText(vLS7 + "HP:" + p44[17 + vLN024] * 100, v115 + 1 - 10, v116 + 1, 100);
            v74.fillText(vLS7 + "HP:" + p44[17 + vLN024] * 100, v115 - 10, v116, 100);
          }
          v74.strokeStyle = "#fff";
          v74.lineWidth = 1;
          v74.beginPath();
          v74.rect(v115 - 16, v116 - 20, 60, 2);
          v74.closePath();
          v74.stroke();
          var v123 = p44[17 + vLN024] / p44[33 + vLN024] * 60;
          v74.fillStyle = v123 > 40 ? "#50ff60" : v123 > 20 ? "#f06f00" : "#cf0000";
          v74.fillRect(v115 - 16, v116 - 20, v123, 2);
          vLN025++;
        }
      }
      if (p44[0] > 0) {
        v74.fillStyle = "#f0fff0";
      } else {
        v74.fillStyle = "#909090";
      }
      v74.strokeStyle = "#111";
      v74.strokeText("剩余敌人" + vLN025, vLN0109 * 2 - 90 + 1, vLN0110 * 2 - 35 + 1, 100);
      v74.fillText("剩余敌人" + vLN025, vLN0109 * 2 - 90, vLN0110 * 2 - 35, 100);
      if (vO9.P.value) {
        var v124;
        var v125 = v74.font;
        v74.shadowColor = "#fffc00";
        v74.shadowBlur = 5;
        v74.lineWidth = 2;
        for (v124 in v98) {
          v98[v124].K--;
          v98[v124].y -= 2;
          if (v98[v124].K > 5) {
            v98[v124].O += v98[v124].R;
          }
          if (v98[v124].K > 0) {
            v74.font = "900 " + v98[v124].O + "px Microsoft YaHei";
            var v126 = v74.createLinearGradient(v98[v124].x, v98[v124].y - v98[v124].O + 5, v98[v124].x, v98[v124].y - 5);
            v126.addColorStop(0, "#5be8a0");
            v126.addColorStop(1, "#ff0050");
            v74.fillStyle = v126;
            v74.fillText(v98[v124].S, v98[v124].x, v98[v124].y, 300);
            v74.strokeText(v98[v124].S, v98[v124].x, v98[v124].y, 300);
          } else {
            v98.shift();
          }
        }
        v74.font = v125;
      }
    }
  }
}
function f46() {}
var v127 = false;
function f47() {
  $("#loadingpos").RangeSlider({
    min: 0,
    max: 100,
    step: 0.1,
    i: function (p45) {}
  });
}
function f48(p46) {
  f362("loadingpos").value = p46;
  f362("loadingpos").style.backgroundSize = p46 + "% 100%";
  if (p46 >= 100 && v127 == 0) {
    v127 = true;
    f362("loadingprogress").style.display = "none";
    f362("loadingimg").style.display = "none";
    f35();
  }
}
var vLSoptionValueposnameop = "<option value=\"{{pos}}\">{{name}}</option>";
function f49(p47) {
  v209 = parseInt(this.value);
  localStorage.setItem("lastgamepad", v_allGamePadName[this.value].id);
}
function f50() {
  f366("gamepad_select", "change", f49);
}
function f51(p48) {
  f362("gamepad_select").innerHTML = "";
  var v128 = false;
  var vLN026 = 0;
  v209 = -1;
  v_allGamePadName = {};
  var v129 = localStorage.getItem("lastgamepad");
  for (var vLN027 = 0; vLN027 < p48.length; vLN027++) {
    if (p48[vLN027] != null) {
      v128 = true;
      var v130 = document.createElement("option");
      v130.value = vLN027;
      v130.setAttribute("key", p48[vLN027].id);
      v130.innerHTML = p48[vLN027].id.substr(0, p48[vLN027].id.indexOf("(Ven"));
      if (v130.innerHTML == "") {
        v130.innerHTML = p48[vLN027].id.substr(0, p48[vLN027].id.indexOf("("));
      }
      f362("gamepad_select").appendChild(v130);
      vLN026++;
      if (v209 == -1 || v129 == p48[vLN027].id) {
        v209 = vLN027;
      }
      v_allGamePadName[vLN027] = {};
      v_allGamePadName[vLN027].id = p48[vLN027].id;
      v_allGamePadName[vLN027].num = vLN027;
    }
  }
  if (v128) {
    f362("gamepad_select").value = v_allGamePadName[v209].num;
  } else {
    f362("gamepad_select").innerHTML = "<option value=\"-1\">无</option>";
  }
  return vLN026;
}
var v131 = false;
function f52(p49) {
  if ((v132 = (v132 = (v132 = vO32.PCSet[f363(p49)].replace("Key", "")).replace("Digit", "")).replace("Numpad", "")) == "NO") {
    v132 = "空";
  }
  p49.value = v132;
  if (v131 && (f363(p49).indexOf("KeyX") >= 0 || f363(p49).indexOf("KeyS") >= 0)) {
    var v132 = vO32.GPSetx[f363(p49)];
    p49.value = v132;
  }
}
function f53(p50) {
  if (vO32["gExtX" + p50 + "Key"] & 1) {
    document.getElementById("X" + p50 + "A").checked = true;
  }
  if (vO32["gExtX" + p50 + "Key"] & 2) {
    document.getElementById("X" + p50 + "B").checked = true;
  }
  if (vO32["gExtX" + p50 + "Key"] & 4) {
    document.getElementById("X" + p50 + "C").checked = true;
  }
  if (vO32["gExtX" + p50 + "Key"] & 8) {
    document.getElementById("X" + p50 + "D").checked = true;
  }
  if (vO32["gExtX" + p50 + "Key"] & 16) {
    document.getElementById("X" + p50 + "E").checked = true;
  }
  if (vO32["gExtX" + p50 + "Key"] & 32) {
    document.getElementById("X" + p50 + "F").checked = true;
  }
}
function f54() {
  document.getElementsByName("kbdbind").forEach(function (p51) {
    f52(p51);
  });
  f55();
}
function f55() {
  f362("keybd_autofix").checked = !vO32.gDisHoldLR;
  f366("keybd_autofix", "change", function (p52) {
    vO32.gDisHoldLR = !p52.target.checked;
  });
}
function f56(p53) {
  document.getElementsByName("kbdbind").forEach(function (p54) {
    if (vO32.PCSet[f363(p54)] == p53) {
      vO32.PCSet[f363(p54)] = "NO";
      f52(p54);
    }
  });
}
function f57() {
  document.getElementsByName("kbdbind").forEach(function (p55) {
    var v133 = null;
    var vO11 = {
      buttons: []
    };
    p55.addEventListener("focus", function () {
      if (v131) {
        var vI_HHPb_i = f137();
        if (vI_HHPb_i == null) {
          p55.blur();
          f87("未连接手柄");
          return;
        }
        for (var v134 in vI_HHPb_i.buttons) {
          vO11.buttons[v134] = vI_HHPb_i.buttons[v134].pressed;
        }
        vO11.axes = vI_HHPb_i.axes;
        v133 = // TOLOOK
        setInterval(function () {
          for (var vI_HHPb_i2 = f137(), vLN028 = 0; vLN028 < vI_HHPb_i2.buttons.length; vLN028++) {
            if (vI_HHPb_i2.buttons[vLN028].pressed && vO11.buttons[vLN028] == 0) {
              f61(vLN028);
              vO32.GPSetx[f363(p55)] = vLN028;
              if (f363(p55) == "KeyLeft") {
                vO32.GPSetx.KeyJoy = 0;
              }
              p55.blur();
              break;
            }
          }
          for (vLN028 = 0; vLN028 < vI_HHPb_i2.axes.length; vLN028++) {
            if (Math.abs(vI_HHPb_i2.axes[vLN028]) > 0.5 && vI_HHPb_i2.axes[vLN028] != vO11.axes[vLN028]) {
              vO32.GPSetx.KeyJoy = 1;
              vO32.GPSetx[f363(p55)] = vLN028;
              p55.blur();
              break;
            }
          }
        }, 50);
      }
    });
    p55.addEventListener("blur", function () {
      if (v131) {
        p55.value = vO32.GPSetx[f363(p55)];
        clearInterval(v133);
      } else {
        f52(this);
      }
    });
    p55.addEventListener("keydown", function (p56) {
      if (p56.key != "Tab") {
        f56(p56.code);
        if (p56.code == "Backspace") {
          vO32.PCSet[f363(this)] = "NO";
        } else {
          vO32.PCSet[f363(this)] = p56.code;
        }
        f52(this);
        this.blur();
        $(this).next().focus();
        p56.preventDefault();
      } else {
        this.blur();
      }
    });
  });
}
function f58(p57) {
  document.getElementsByName("X" + p57 + "Bind").forEach(function (p58) {
    p58.addEventListener("change", function () {
      var vThis = this;
      if (vThis.id == "X" + p57 + "A") {
        if (vThis.checked) {
          vO32["gExtX" + p57 + "Key"] |= 1;
        } else {
          vO32["gExtX" + p57 + "Key"] &= ~1;
        }
      }
      if (vThis.id == "X" + p57 + "B") {
        if (vThis.checked) {
          vO32["gExtX" + p57 + "Key"] |= 2;
        } else {
          vO32["gExtX" + p57 + "Key"] &= ~2;
        }
      }
      if (vThis.id == "X" + p57 + "C") {
        if (vThis.checked) {
          vO32["gExtX" + p57 + "Key"] |= 4;
        } else {
          vO32["gExtX" + p57 + "Key"] &= ~4;
        }
      }
      if (vThis.id == "X" + p57 + "D") {
        if (vThis.checked) {
          vO32["gExtX" + p57 + "Key"] |= 8;
        } else {
          vO32["gExtX" + p57 + "Key"] &= ~8;
        }
      }
      if (vThis.id == "X" + p57 + "E") {
        if (vThis.checked) {
          vO32["gExtX" + p57 + "Key"] |= 16;
        } else {
          vO32["gExtX" + p57 + "Key"] &= ~16;
        }
      }
      if (vThis.id == "X" + p57 + "F") {
        if (vThis.checked) {
          vO32["gExtX" + p57 + "Key"] |= 32;
        } else {
          vO32["gExtX" + p57 + "Key"] &= ~32;
        }
      }
    });
  });
}
function f59() {
  f366("keybd_fillkey", "change", function (p59) {
    vO32.gDisHoldLR = this.checked;
  });
}
function f60() {
  document.getElementsByName("gamepadbind").forEach(function (p60) {
    p60.value = vO32.GPSetx[f363(p60)];
  });
  var v135 = document.getElementById("gamepadlag");
  var v136 = document.getElementById("gamepadlagV");
  v135.value = vO32.gJoyLagFix;
  var v137 = 8 + Number((v135.value - v135.min) * 100 / (v135.max - v135.min)) * 1.3;
  v136.innerHTML = "<span>" + v135.value + "</span>";
  v136.style.left = "calc(" + v137 + "px)";
}
function f61(p61) {
  document.getElementsByName("gamepadbind").forEach(function (p62) {
    if (f363(p62) != "KeyJoy" && f363(p62) != "KeyUp" && f363(p62) != "KeyDown" && f363(p62) != "KeyLeft" && f363(p62) != "KeyRight" && vO32.GPSetx[f363(p62)] == p61) {
      vO32.GPSetx[f363(p62)] = -1;
      p62.value = -1;
    }
  });
  document.getElementsByName("kbdbind").forEach(function (p63) {
    if ((f363(p63).indexOf("KeyX") >= 0 || f363(p63).indexOf("KeyS") >= 0) && vO32.GPSetx[f363(p63)] == p61) {
      vO32.GPSetx[f363(p63)] = -1;
      p63.value = -1;
    }
  });
}
function f62() {
  document.getElementsByName("gamepadbind").forEach(function (p64) {
    var v138 = null;
    var vO12 = {
      buttons: []
    };
    p64.addEventListener("focus", function () {
      var vI_HHPb_i3 = f137();
      if (vI_HHPb_i3 == null) {
        p64.blur();
        f87("未连接手柄");
        return;
      }
      for (var v139 in vI_HHPb_i3.buttons) {
        vO12.buttons[v139] = vI_HHPb_i3.buttons[v139].pressed;
      }
      vO12.axes = vI_HHPb_i3.axes;
      v138 = // TOLOOK
      setTimeout(function f63() {
        if (f362("popwin_keybind").style.display != "none") {
          for (var vI_HHPb_i4 = f137(), vLN029 = 0; vLN029 < vI_HHPb_i4.buttons.length; vLN029++) {
            if (vI_HHPb_i4.buttons[vLN029].pressed && vO12.buttons[vLN029] == 0) {
              f61(vLN029);
              vO32.GPSetx[f363(p64)] = vLN029;
              if (f363(p64) == "KeyLeft") {
                vO32.GPSetx.KeyJoy = 0;
              }
              p64.blur();
              // TOLOOK
              setTimeout(function () {
                $(p64).next().focus();
              }, 200);
              return;
            }
          }
          for (vLN029 = 0; vLN029 < vI_HHPb_i4.axes.length; vLN029++) {
            if (Math.abs(vI_HHPb_i4.axes[vLN029]) > 0.5 && vI_HHPb_i4.axes[vLN029] != vO12.axes[vLN029]) {
              if (vLN029 == 9) {
                f89("******************", true);
                f89("识别到POV摇杆，已自动设置好所有方向😁", true);
                p64.blur();
                vO32.GPSetx.KeyJoy = 1;
                vO32.GPSetx.KeyUp = 9;
                vO32.GPSetx.KeyDown = 9;
                vO32.GPSetx.KeyLeft = 9;
                vO32.GPSetx.KeyRight = 9;
                f368("gamepadbind", function (p65) {
                  if (f363(p65) == "KeyUp" || f363(p65) == "KeyDown" || f363(p65) == "KeyLeft" || f363(p65) == "KeyRight") {
                    p65.value = 9;
                  }
                  if (f363(p65) == "KeyCoin") {
                    // TOLOOK
                    setTimeout(function () {
                      p65.focus();
                    }, 200);
                  }
                });
                return;
              } else {
                vO32.GPSetx.KeyJoy = 1;
                vO32.GPSetx[f363(p64)] = vLN029;
                p64.blur();
                // TOLOOK
                setTimeout(function () {
                  $(p64).next().focus();
                }, 200);
                return;
              }
            }
          }
          v138 = // TOLOOK
          setTimeout(f63, 20);
        } else {
          p64.blur();
        }
      }, 20);
    });
    p64.addEventListener("blur", function () {
      p64.value = vO32.GPSetx[f363(p64)];
      clearInterval(v138);
    });
  });
}
function f64() {
  var v140 = document.getElementById("gamepadlag");
  var v141 = document.getElementById("gamepadlagV");
  v140.addEventListener("input", function () {
    var v142 = 8 + Number((v140.value - v140.min) * 100 / (v140.max - v140.min)) * 1.3;
    v141.innerHTML = "<span>" + v140.value + "</span>";
    v141.style.left = "calc(" + v142 + "px)";
    vO32.gJoyLagFix = v140.value;
  });
}
function f65() {
  f127();
  f128();
}
var v143 = null;
function f66() {
  f369("AutoData", "focus", function (p66) {
    v143 = this;
    f370("AutoData", "autokeyselect");
    this.classList.add("autokeyselect");
  });
  document.getElementsByName("drawbtn").forEach(function (p67) {
    p67.parentElement.addEventListener("click", function (p68) {
      if (v143 != null) {
        var v144 = this.firstElementChild;
        switch (f363(v144)) {
          case "清":
            v143.value = "";
            break;
          case "删":
            break;
          case "等":
          default:
            v143.value += f363(v144);
        }
        v143.focus();
        v143.setSelectionRange(v143.value.length, v143.value.length);
        f126("g" + v143.id, v143.value);
        f128();
      } else {
        f87("请先选择要设置的技能");
      }
    });
  });
}
function f67() {
  f366("revall", "change", function () {
    vO32.GPSetx.gKeyRev = this.checked;
  });
  f366("revleftright", "change", function () {
    vO32.GPSetx.gKeyRevLR = this.checked;
  });
}
function f68() {
  f362("SP_A").checked = vO32.gASuper;
  f362("SP_B").checked = vO32.gBSuper;
  f362("SP_C").checked = vO32.gCSuper;
  f362("SP_D").checked = vO32.gDSuper;
  f362("SP_E").checked = vO32.gESuper;
  f362("SP_F").checked = vO32.gFSuper;
  f362("AutoSpeedText").innerText = vO32.gSuperSpeed;
  f362("AutoSpeed").value = vO32.gSuperSpeed;
}
function f69() {
  f362("keybd_fillkey").checked = vO32.gDisHoldLR;
}
function f70() {
  f369("SpeedKey", "change", function () {
    switch (this.id) {
      case "SP_A":
        vO32.gASuper = this.checked;
        break;
      case "SP_B":
        vO32.gBSuper = this.checked;
        break;
      case "SP_C":
        vO32.gCSuper = this.checked;
        break;
      case "SP_D":
        vO32.gDSuper = this.checked;
        break;
      case "SP_E":
        vO32.gESuper = this.checked;
        break;
      case "SP_F":
        vO32.gFSuper = this.checked;
    }
  });
  f73();
}
function f71() {
  f362("GesSpeedText").innerText = vO32.gGesSpeed;
}
function f72() {
  f366("GesSpeed", "input", function (p69) {
    f362("GesSpeedText").innerText = this.value;
    vO32.gGesSpeed = parseInt(this.value);
  });
}
function f73() {
  f366("AutoSpeed", "input", function (p70) {
    f362("AutoSpeedText").innerText = this.value;
    vO32.gSuperSpeed = parseInt(this.value);
    f312(vO32.gSuperSpeed);
  });
}
function f74() {
  f365("reversal", function () {
    f371("reversalBox", "block");
  });
  f366("reversetting", "mouseleave", function () {
    f362("reversalBox").style.display = "none";
  });
  f365("tab_keyborad", function (p71) {
    $(this).siblings("div").removeClass("active-jianpan");
    $(this).addClass("active-jianpan");
    $("#keybind_keyboard").css("display", "flex");
    $("#keybind_gamepad").css("display", "none");
    v131 = false;
    f54();
  });
  f365("tab_gamepad", function (p72) {
    $(this).siblings("div").removeClass("active-jianpan");
    $(this).addClass("active-jianpan");
    $("#keybind_gamepad").css("display", "flex");
    $("#keybind_keyboard").css("display", "none");
    v131 = true;
    f54();
  });
  f365("tab_keyext", function (p73) {
    $(this).siblings("div").removeClass("active-kbdext");
    $(this).addClass("active-kbdext");
    $("#keybind_ext").css("display", "block");
    $("#keybind_auto").css("display", "none");
    $("#keybind_etc").css("display", "none");
  });
  f365("tab_keyauto", function (p74) {
    $(this).siblings("div").removeClass("active-kbdext");
    $(this).addClass("active-kbdext");
    $("#keybind_ext").css("display", "none");
    $("#keybind_auto").css("display", "block");
    $("#keybind_etc").css("display", "none");
  });
  f365("tab_keyetc", function (p75) {
    $(this).siblings("div").removeClass("active-kbdext");
    $(this).addClass("active-kbdext");
    $("#keybind_ext").css("display", "none");
    $("#keybind_auto").css("display", "none");
    $("#keybind_etc").css("display", "block");
  });
  f57();
  f58(1);
  f58(2);
  f58(3);
  f58(4);
  f58(5);
  f58(6);
  f70();
  f72();
  f59();
  f62();
  f64();
  f67();
  f50();
}
var v145 = null;
function f75(p76, p77) {
  var vI_sxfci_7 = f362("p" + p76 + "lag");
  if (vI_sxfci_7 != null) {
    vI_sxfci_7.textContent = p77 + "ms";
    vI_sxfci_7.style.color = p77 < 50 ? "#00c030" : p77 < 80 ? "#e09a06" : "#f01000";
  }
}
function f76() {
  if (vLS8.indexOf("请出房间") > 0) {
    f362("popwin_kickinfo").style.display = "block";
  } else {
    f87("联机已掉线，本场已变为单机模式，请重新连接");
  }
}
function f77(p78, p79, p80) {
  p78.innerHTML = "";
  for (var v146 in p80.Badge) {
    var v147 = document.createElement("div");
    v147.setAttribute("tooltip", p80.Badge[v146].Name);
    v147.style.height = "16px";
    v147.style.marginLeft = "2px";
    var v148 = document.createElement("img");
    v148.src = p80.Badge[v146].Image;
    v147.appendChild(v148);
    p78.appendChild(v147);
  }
  if (p79.src = p80.Frame.Image == "") {
    p79.style.display = "none";
  } else {
    p79.src = p80.Frame.Image;
    p79.style.display = "block";
  }
}
function f78(p81) {
  if (p81 != null) {
    v145 = p81;
    f362("p1img").src = p81.Img1;
    f362("p2img").src = p81.Img2;
    f362("p3img").src = p81.Img3;
    f362("p4img").src = p81.Img4;
    f362("p1nick").innerText = p81.Nick1;
    f362("p2nick").innerText = p81.Nick2;
    f362("p3nick").innerText = p81.Nick3;
    f362("p4nick").innerText = p81.Nick4;
    if (p81.Nick1.indexOf("关闭") > 0) {
      f362("p1img").src = "./img/close.png";
    }
    if (p81.Nick2.indexOf("关闭") > 0) {
      f362("p2img").src = "./img/close.png";
    }
    if (p81.Nick3.indexOf("关闭") > 0) {
      f362("p3img").src = "./img/close.png";
    }
    if (p81.Nick4.indexOf("关闭") > 0) {
      f362("p4img").src = "./img/close.png";
    }
    if (p81.Mob1) {
      f362("p1dev").classList.remove("igwi-diannao-copy");
      f362("p1dev").classList.add("igwi-shouji");
      f362("p1devtip").setAttribute("tooltip", "手机玩家");
    } else {
      f362("p1dev").classList.add("igwi-diannao-copy");
      f362("p1dev").classList.remove("igwi-shouji");
      f362("p1devtip").setAttribute("tooltip", "PC玩家");
    }
    if (p81.Mob2) {
      f362("p2dev").classList.remove("igwi-diannao-copy");
      f362("p2dev").classList.add("igwi-shouji");
      f362("p2devtip").setAttribute("tooltip", "手机玩家");
    } else {
      f362("p2dev").classList.add("igwi-diannao-copy");
      f362("p2dev").classList.remove("igwi-shouji");
      f362("p2devtip").setAttribute("tooltip", "PC玩家");
    }
    var v149 = p81.boss;
    var vI_sxfci_8 = f362("roomOwnerFlag");
    if (v149 == 0) {
      vI_sxfci_8.style.left = "90px";
      vI_sxfci_8.style.top = "-10px";
    } else if (v149 == 1) {
      vI_sxfci_8.style.left = "280px";
      vI_sxfci_8.style.top = "-10px";
    } else if (v149 == 2) {
      vI_sxfci_8.style.left = "90px";
      vI_sxfci_8.style.top = "107px";
    } else if (v149 == 3) {
      vI_sxfci_8.style.left = "280px";
      vI_sxfci_8.style.top = "107px";
    }
    f362("lookcount").innerText = p81.looker;
    var vI_sxfci_9 = f362("lookerlist");
    vI_sxfci_9.innerHTML = "";
    for (var v150 in p81.LookerNick) {
      var v151 = document.createElement("div");
      v151.setAttribute("key", p81.LookerList[v150]);
      v151.innerText = p81.LookerNick[v150];
      vI_sxfci_9.appendChild(v151);
    }
    if (p81.UUID != null) {
      if (p81.UUID[0] != "") {
        f326(-1, p81.UUID[0], function (p82) {
          f362("p1lv").textContent = "Lv." + p82.LevelInfo.Level;
          f77(f362("p1badge"), f362("p1frame"), p82.UserStyle);
        });
      } else {
        f362("p1lv").textContent = "Lv.0";
        f362("p1frame").style.display = "none";
        f362("p1badge").innerHTML = "";
        f362("p1nick").className = "touxiangname";
      }
      if (p81.UUID[1] != "") {
        f326(-1, p81.UUID[1], function (p83) {
          f362("p2lv").textContent = "Lv." + p83.LevelInfo.Level;
          f77(f362("p2badge"), f362("p2frame"), p83.UserStyle);
        });
      } else {
        f362("p2lv").textContent = "Lv.0";
        f362("p2frame").style.display = "none";
        f362("p2badge").innerHTML = "";
        f362("p2nick").className = "touxiangname";
      }
      if (p81.UUID[2] != "") {
        f326(-1, p81.UUID[2], function (p84) {
          f362("p3lv").textContent = "Lv." + p84.LevelInfo.Level;
          f77(f362("p3badge"), f362("p3frame"), p84.UserStyle);
        });
      } else {
        f362("p3lv").textContent = "Lv.0";
        f362("p3frame").style.display = "none";
        f362("p3badge").innerHTML = "";
        f362("p3nick").className = "touxiangname";
      }
      if (p81.UUID[3] != "") {
        f326(-1, p81.UUID[3], function (p85) {
          f362("p4lv").textContent = "Lv." + p85.LevelInfo.Level;
          f77(f362("p4badge"), f362("p4frame"), p85.UserStyle);
        });
      } else {
        f362("p4lv").textContent = "Lv.0";
        f362("p4frame").style.display = "none";
        f362("p4badge").innerHTML = "";
        f362("p4nick").className = "touxiangname";
      }
    }
  }
}
function f79(p86) {}
function f80(p87) {
  var vI_sxfci_10 = f362("btn_pause");
  switch (p87) {
    case "stop":
      vI_sxfci_10.childNodes[0].classList.replace("igwi-zanting", "igwi-jixu");
      vI_sxfci_10.style.background = "rgba(220, 67, 59, 1)";
      vI_sxfci_10.childNodes[1].textContent = " 继续";
      break;
    case "continue":
      vI_sxfci_10.childNodes[0].classList.replace("igwi-jixu", "igwi-zanting");
      vI_sxfci_10.style.background = "rgba(57, 55, 50, 1)";
      vI_sxfci_10.childNodes[1].textContent = " 暂停";
  }
}
var vLSdivClasssystemmsgtex = " <div class=\"systemmsg\">\n{{text}}                        </div>";
var vLSdivClasssystemmsgLig = " <div class=\"systemmsg lightsystemmsg\">\n{{text}}                        </div>";
var vLSdivClasssystemmsgSuc = " <div class=\"systemmsg successsystemmsg\">\n{{text}}                        </div>";
var vLSdivClasschatmessages = "  <div class=\"chatmessage\">\n                            <span class=\"prefix\"></span>\n                            <p class=\"chatnick\">{{nick}}</p>\n                            <p class=\"msgtime\">{{time}}</p>\n                            <div class=\"msgtext\">\n                                {{text}}                            </div>\n                        </div>";
var vLSdivClasschatmessageM = "  <div class=\"chatmessage mymsg\">\n                            <p class=\"msgtime\">{{time}}</p>\n                            <p class=\"chatnick\">{{nick}}</p>\n                            <span class=\"prefix\"></span>\n                            <div class=\"msgtext\">\n                                {{text}}                            </div>\n                        </div>";
var vLSdivClasschatmessages2 = "  <div class=\"chatmessage\">\n                            <span class=\"prefix\"></span>\n                            <span class=\"lookflag\">观战</span>\n                            <p class=\"chatnick\">{{nick}}</p>\n                            <p class=\"msgtime\">{{time}}</p>\n                            <div class=\"msgtext\">\n                                {{text}}                            </div>\n                        </div>";
var vLSdivpIdlookeridnickpd = "  <div>\n                            <p id='{{lookerid}}'>\n                                {{nick}}\n                            </p>\n                        </div>";
var v152 = true;
var v153 = null;
var vLS8 = "";
function f81() {
  if (f361("look") == "1" || vLN014 != 1) {
    f362("btn_tolook").style.display = "none";
  } else {
    f365("btn_tolook", function () {
      window.location.replace("https://play.wo1wan.com/fcnext/play?&look=1&id=" + vLN012 + "&mode=1&sev=" + vLN017 + "&linkid=" + vLN015);
    });
  }
}
function f82() {
  if ((v153 = f362("messagelist")).scrollTo == null) {
    v153.scrollTo = function (p88, p89) {
      v153.scrollTop = p89;
      v153.scrollLeft = p88;
    };
  }
  f365("sendmsgbtn", f92);
  f366("lookerlist", "mouseup", f83);
  f366("messagemenu", "mouseleave", f84);
  f367("msgsubmenu", f85);
  f365("fullmsgclose", function () {
    v152 = false;
    f362("chatpad").style.opacity = "0.0";
  });
  f81();
  // TOLOOK
  setTimeout(function () {
    f89("欢迎加入畅玩FC群一起交流，QQ群号:768212005", true);
  }, 1000);
}
var v154 = null;
function f83(p90) {
  if (p90.button == 2 && vLN014 == 1) {
    var vI_sxfci_11 = f362("messagemenu");
    v154 = p90.target;
    vI_sxfci_11.style.opacity = 1;
    vI_sxfci_11.style.left = p90.clientX - 15 + "px";
    vI_sxfci_11.style.top = p90.clientY - 15 + "px";
  }
}
function f84() {
  var vI_sxfci_12 = f362("messagemenu");
  vI_sxfci_12.style.opacity = 0;
  // TOLOOK
  setTimeout(function () {
    vI_sxfci_12.style.top = "-200px";
  }, 100);
}
function f85(p91) {
  var vI_sxfci_13 = f362("messagemenu");
  var vI_Brhwo_ = f363(v154);
  switch (this.id) {
    case "msgmenu_uid":
      f326(-1, vI_Brhwo_, function (p92) {
        f89(p92.NickName + " 的UID是：" + p92.Uid);
        f362("chattab").click();
      });
      break;
    case "msgmenu_ban":
      if (f155()) {
        $.post("/sayban", {
          who: vI_Brhwo_,
          where: "jjin_" + vLN012 + "_" + vLN015,
          say: ""
        }, function (p93) {
          if (p93.status == "ok") {
            f150("message", v154.innerText + " 被房主在本房间禁言一小时");
          } else {
            f87("禁言失败");
          }
        });
      } else {
        f87("只有房主可禁言");
      }
      f362("chattab").click();
      break;
    case "msgmenu_kick":
      f150("kicklook", vI_Brhwo_);
  }
  vI_sxfci_13.style.opacity = 0;
  // TOLOOK
  setTimeout(function () {
    vI_sxfci_13.style.top = "-200px";
  }, 100);
}
function f86(p94) {
  if (p94.scrollTop + p94.clientHeight + 150 > p94.scrollHeight) {
    p94.scrollTo(0, p94.scrollHeight);
  }
}
function f87(p95) {
  var v155 = document.createElement("div");
  v155.innerHTML = vLSdivClasssystemmsgtex.replace("{{text}}", p95);
  v153.appendChild(v155);
  v153.scrollTo(0, v153.scrollHeight);
  vLS8 = p95;
}
function f88(p96) {
  p96 = p96 + " " + new Date().toLocaleTimeString();
  var v156 = document.createElement("div");
  v156.innerHTML = vLSdivClasssystemmsgLig.replace("{{text}}", p96);
  v153.appendChild(v156);
  v153.scrollTo(0, v153.scrollHeight);
  vLS8 = p96;
}
function f89(p97, p98) {
  if (p98 !== true) {
    p97 = p97 + " " + new Date().toLocaleTimeString();
  }
  var v157 = document.createElement("div");
  v157.innerHTML = vLSdivClasssystemmsgSuc.replace("{{text}}", p97);
  v153.appendChild(v157);
  v153.scrollTo(0, v153.scrollHeight);
  vLS8 = p97;
}
function f90(p99) {
  var v158 = document.createElement("div");
  v158.innerHTML = vLSdivClasschatmessageM.replace("{{text}}", p99).replace("{{nick}}", v442.NickName).replace("{{time}}", new Date().toLocaleTimeString());
  v153.appendChild(v158);
  v153.scrollTo(0, v153.scrollHeight);
}
function f91(p100, p101, p102, p103) {
  var v159 = false;
  f93();
  if (p100 == null && p102 != null) {
    var v160 = p102.indexOf("1.0)\">") + 6;
    var v161 = p102.indexOf(": <") - v160;
    p100 = p102.substr(v160, v161);
    p101 = p102.substr(p102.indexOf("</text>") + 7).replace("<br/>", "");
  }
  if (p102 != null && p102.indexOf("观战者") > 0) {
    v159 = true;
  }
  if (p103 == 2) {
    v159 = true;
  }
  if (p100 == v442.NickName) {
    return f90(p101);
  }
  if (p100 == "系统消息") {
    return f88(p101);
  }
  var v162 = document.createElement("div");
  v162.innerHTML = v159 ? vLSdivClasschatmessages2.replace("{{text}}", p101).replace("{{nick}}", p100).replace("{{time}}", new Date().toLocaleTimeString()) : vLSdivClasschatmessages.replace("{{text}}", p101).replace("{{nick}}", p100).replace("{{time}}", new Date().toLocaleTimeString());
  v153.appendChild(v162);
  v153.scrollTo(0, v153.scrollHeight);
}
function f92() {
  f94();
}
var vLN030 = 0;
function f93() {
  if (vLN031 > 0 && v152) {
    f362("chatpad").style.opacity = "0.8";
    vLN030 = performance.now() + 4900;
    // TOLOOK
    setTimeout(function () {
      if (performance.now() > vLN030 && vLN031 > 0) {
        f362("chatpad").style.opacity = "0.0";
      }
    }, 5000);
  }
}
function f94() {
  v152 = true;
  f93();
  if (f362("messageinput").value != "") {
    if (vLN014 == 0) {
      f362("messageinput").value = "";
      f90("单人玩呢，发啥消息啊😢");
    } else {
      var v163 = f362("messageinput").value;
      if (v163 != "") {
        f150("message", v163);
      }
      f362("messageinput").value = "";
    }
    f362("messageinput").blur();
  } else if (document.activeElement == f362("messageinput")) {
    f362("messageinput").blur();
    if (vLN031 > 0) {
      f362("chatpad").style.opacity = "0.0";
    }
  } else {
    f362("messageinput").focus();
  }
}
var v164 = false;
var vLN031 = 0;
var v165 = null;
var v166 = true;
var vLN13 = 1;
function f95() {
  $("#soundvol").RangeSlider({
    min: 0,
    max: 100,
    step: 0.1,
    i: function (p104) {
      f351(p104.value / 100);
      vO32.gSoundVol = p104.value;
    }
  });
  f362("soundvol").addEventListener("blur", function () {
    f327();
  });
}
function f96() {
  var v167 = document.body;
  if (document.fullscreenElement == null) {
    if (v167.requestFullscreen) {
      v167.requestFullscreen();
    } else if (v167.mozRequestFullScreen) {
      v167.mozRequestFullScreen();
    } else if (v167.webkitRequestFullScreen) {
      v167.webkitRequestFullScreen();
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
function f97() {
  if (vLN018 == 2) {
    f362("p3card").style.opacity = "0.3";
    f362("p4card").style.opacity = "0.3";
    f362("p3img").src = "https://static.wo1wan.com/game/close.png";
    f362("p4img").src = "https://static.wo1wan.com/game/close.png";
    f362("p3nick").innerText = "不可选";
    f362("p4nick").innerText = "不可选";
    f362("p3card").addEventListener("mouseup", function (p105) {
      p105.stopPropagation();
      p105.preventDefault();
    }, true);
    f362("p3card").addEventListener("click", function (p106) {
      p106.stopPropagation();
      p106.preventDefault();
    }, true);
    f362("p4card").addEventListener("mouseup", function (p107) {
      p107.stopPropagation();
      p107.preventDefault();
    }, true);
    f362("p4card").addEventListener("click", function (p108) {
      p108.stopPropagation();
      p108.preventDefault();
    }, true);
  }
}
function f98() {
  if (v66) {
    var vI_sxfci_14 = f362("gamescr");
    f362("fullmsgclose").style.display = vLN031 == 0 ? (vI_sxfci_14.classList.add("gamebigwin"), vLN031 = 1, f362("chatpad").classList.add("fullScreenMsgBox"), f362("chatpad").style.opacity = "0.0", "inline-block") : vLN031 == 1 ? (vI_sxfci_14.classList.remove("gamebigwin"), vI_sxfci_14.classList.add("gamefillwinodw"), vLN031 = 2, f362("chatpad").classList.add("fullScreenMsgBox"), f362("chatpad").style.opacity = "0.0", "inline-block") : (vI_sxfci_14.classList.remove("gamebigwin"), vI_sxfci_14.classList.remove("gamefillwinodw"), vLN031 = 0, f362("chatpad").style.opacity = "1.0", f362("chatpad").classList.remove("fullScreenMsgBox"), "none");
    // TOLOOK
    setTimeout(function () {
      f344(vO32.lockScr);
    }, 100);
  }
}
function f99() {
  if (v66) {
    $(".popoverlay").hide();
  }
}
function f100() {
  if (vLN014 == 0) {
    f362("popwin_savemanager").style.display = "block";
    f112();
  } else {
    if (!f155()) {
      f87("只有房主允许使用存档");
      return;
    }
    f362("popwin_savemanager").style.display = "block";
    f112();
  }
}
function f101(p109) {
  var v168 = 1000 / 60 * p109 / 1000;
  var v169 = Math.floor(v168 / 3600);
  var v170 = Math.floor(v168 / 60) % 60;
  var v171 = Math.floor(v168 % 60);
  if (v169 <= 9) {
    v169 = "0" + v169;
  }
  if (v170 <= 9) {
    v170 = "0" + v170;
  }
  if (v171 <= 9) {
    v171 = "0" + v171;
  }
  v165.textContent = v169 + ":" + v170 + ":" + v171;
}
function f102() {
  f87("测试中,即将开放");
}
function f103() {
  if (!v164) {
    v164 = true;
    f365("chattab", function (p110) {
      $(this).siblings("li").removeClass("active");
      $(this).addClass("active");
      $("#lookerpad").css("display", "none");
      $("#chatpad").css("display", "block");
    });
    f365("lookertab", function (p111) {
      $(this).siblings("li").removeClass("active");
      $(this).addClass("active");
      $("#lookerpad").css("display", "block");
      $("#chatpad").css("display", "none");
    });
    f365("onofftools", function () {
      if (f371("gametools", "flex")) {
        f362("roompanel").style.height = "calc(100% - 300px)";
        f362("toolsbtn").style.borderRadius = "8px 8px 0 0";
        f362("onofftools").classList.add("reserveTopDown");
      } else {
        f362("roompanel").style.height = "calc(100% - 180px)";
        f362("toolsbtn").style.borderRadius = "8px";
        f362("onofftools").classList.remove("reserveTopDown");
      }
    });
    f365("btn_fullscr", f96);
    f365("btn_restart", f26);
    f365("btn_pause", f27);
    f365("btn_record", f25);
    f365("btn_save", f100);
    f365("btn_geeker", f102);
    f365("btn_cheat", function () {
      if (vLN014 == 1) {
        f87("联机金手指还未开放");
      } else if (v442.LevelInfo.VipLevel > 0 || v442.LevelInfo.Svip > 0) {
        f371("popwin_gamehelp", "block");
      } else {
        f89("金手指目前仅对会员和黑暗骑士开放");
      }
    });
    f365("btn_setting", function () {
      f371("popwin_setting", "block");
    });
    f365("btn_keybind", function () {
      f371("popwin_keybind", "block");
    });
    f365("btn_gamespeed", function () {
      if (vLN014 == 1) {
        f89("联机模式目前不支持调速度");
      } else {
        f362("tx_gamespeed").innerHTML = vLN13 < 8 ? (vLN13 *= 2) + "倍" : (vLN13 = 1, "加速");
        f315(vLN13);
        f89("游戏速度已调到" + vLN13 + "倍速");
      }
    });
    f365("btn_sharegame", function () {
      if (vLN014 == 1) {
        f371("popwin_sharegame", "block");
      } else if (v209 == -1) {
        f87("请插入手柄后，以2P玩家游戏");
      } else {
        if ((v188 = navigator.getGamepads()[v209]) == null) {
          f87("请插入手柄后，以2P玩家游戏");
          return;
        }
        var v172 = v188.id.substr(0, v188.id.indexOf("(Ven"));
        if (v172 == "") {
          v172 = v188.id.substr(0, v188.id.indexOf("("));
        }
        if (v172 == "") {
          v172 = v188.id;
        }
        if (++vLN039 == 3) {
          vLN039 = 0;
        }
        switch (vLN039) {
          case 0:
            f89("恢复单机单人模式");
            break;
          case 1:
            f89("进入【1P 键盘】 ，【2P 手柄摇杆】多人模式");
            break;
          case 2:
            f89("进入【1P 手柄摇杆】 ，【2P 手柄摇杆】多人模式");
        }
      }
    });
    if (vLN014 == 0) {
      f362("btn_sharegame").innerText = "单机双人";
    }
    f365("btn_sendshareinfo", f285);
    f367("btn_closepop", function (p112) {
      for (var v173 = p112.target.parentElement; v173.id.indexOf("popwin_") < 0;) {
        v173 = v173.parentElement;
      }
      v173.style.display = "none";
    });
    f367("btn_cancelpop", function (p113) {
      for (var v174 = p113.target.parentElement; v174.id.indexOf("popwin_") < 0;) {
        v174 = v174.parentElement;
      }
      v174.style.display = "none";
    });
    f367("btn_setok", function (p114) {
      for (var v175 = p114.target.parentElement; v175.id.indexOf("popwin_") < 0;) {
        v175 = v175.parentElement;
      }
      v175.style.display = "none";
      f327();
    });
    f365("btn_kb_reset", function () {
      if (v131) {
        vO32.GPSetx = JSON.parse(JSON.stringify(vO34));
        f60();
      } else {
        vO32.PCSet = JSON.parse(JSON.stringify(vO33));
        f54();
      }
    });
    var vLN032 = 0;
    f366("gamescr", "click", function (p115) {
      if (p115.timeStamp - vLN032 < 300 && vLN032 != 0) {
        f98();
      } else {
        vLN032 = p115.timeStamp;
      }
    });
    f365("vote_yes", f30);
    f365("vote_no", f29);
    f74();
    f124();
    f365("btn_kickok", function () {
      window.close();
      window.location.href = "about:blank";
    });
    f365("soundswitch", function () {
      v166 = v166 ? (this.classList.remove("igwi-yinliang"), this.classList.add("igwi-jingyin1"), this.style.color = "#888888", f351(0), false) : (this.classList.remove("igwi-jingyin1"), this.classList.add("igwi-yinliang"), this.style.color = "#f9d342", f351(vO32.gSoundVol / 100), true);
    });
  }
}
function f104() {
  f365("winclose", vO15.V);
  f365("winmin", vO15.j);
  f365("winmax", vO15.H);
}
function f105() {
  if (vLN014 == 1) {
    f362("roominfo").innerText = "房间: " + vLN015;
  }
  v165 = f362("timespan");
  f104();
  f95();
  f103();
  f82();
  f110();
  f47();
}
function f106() {
  f362("gamename").innerText = vLS2;
}
function f107() {
  f362("p1nick").innerText = v442.NickName;
  f362("p1img").src = v442.HeadImg;
}
var vO13 = {
  sv1: 0,
  sv2: 0,
  sv3: 0,
  sv4: 0,
  st1: null,
  st2: null,
  st3: null,
  st4: null
};
var vO14 = {
  d1: 0,
  d1i: null,
  d2: 0,
  d2i: null,
  d3: 0,
  d3i: null,
  d4: 0,
  d4i: null
};
var vLN033 = 0;
function f108() {
  if (vO13.sv1 == 1) {
    $("#sv1time").html(vO13.st1);
    if (vO14.d1i == null) {
      vO14.d1i = "/fc/lsvimg?sid=1&game=" + vLN012;
    }
    f362("sv1img").src = vO14.d1i;
  } else {
    $("#sv1time").html("");
    f362("sv1img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.sv2 == 1) {
    $("#sv2time").html(vO13.st2);
    if (vO14.d2i == null) {
      vO14.d2i = "/fc/lsvimg?sid=2&game=" + vLN012;
    }
    f362("sv2img").src = vO14.d2i;
  } else {
    $("#sv2time").html("");
    f362("sv2img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.sv3 == 1) {
    $("#sv3time").html(vO13.st3);
    if (vO14.d3i == null) {
      vO14.d3i = "/fc/lsvimg?sid=3&game=" + vLN012;
    }
    f362("sv3img").src = vO14.d3i;
  } else {
    $("#sv3time").html("");
    f362("sv3img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.sv4 == 1) {
    $("#sv4time").html(vO13.st4);
    if (vO14.d4i == null) {
      vO14.d4i = "/fc/lsvimg?sid=4&game=" + vLN012;
    }
    f362("sv4img").src = vO14.d4i;
  } else {
    $("#sv4time").html("");
    f362("sv4img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.W == 1) {
    $("#sv5time").html(vO13.J);
    if (vO14.Z == null) {
      vO14.Z = "/fc/lsvimg?sid=5&game=" + vLN012;
    }
    f362("sv5img").src = vO14.Z;
  } else {
    $("#sv5time").html("");
    f362("sv5img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.ee == 1) {
    $("#sv6time").html(vO13.ne);
    if (vO14.te == null) {
      vO14.te = "/fc/lsvimg?sid=6&game=" + vLN012;
    }
    f362("sv6img").src = vO14.te;
  } else {
    $("#sv6time").html("");
    f362("sv6img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.ae == 1) {
    $("#sv7time").html(vO13.ie);
    if (vO14.oe == null) {
      vO14.oe = "/fc/lsvimg?sid=7&game=" + vLN012;
    }
    f362("sv7img").src = vO14.oe;
  } else {
    $("#sv7time").html("");
    f362("sv7img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.ce == 1) {
    $("#sv8time").html(vO13.re);
    if (vO14.le == null) {
      vO14.le = "/fc/lsvimg?sid=8&game=" + vLN012;
    }
    f362("sv8img").src = vO14.le;
  } else {
    $("#sv8time").html("");
    f362("sv8img").src = "https://static.wo1wan.com/game/empsv.png";
  }
}
function f109() {
  var v176 = new XMLHttpRequest();
  v176.open("POST", "/fc/svupdate?game=" + vLN012, true);
  v176.setRequestHeader("Content-type", "application/json");
  v176.onreadystatechange = function () {
    if (v176.readyState == XMLHttpRequest.DONE) {
      v176.status;
    }
  };
  v176.send(JSON.stringify(vO13));
  f108();
}
function f110() {
  var v177 = new XMLHttpRequest();
  v177.open("GET", "/fc/svload?game=" + vLN012, true);
  v177.responseType = "json";
  v177.onreadystatechange = function () {
    if (v177.readyState == XMLHttpRequest.DONE && v177.status == 200) {
      var v178 = v177.response;
      vO13 = v178;
      f108();
    }
  };
  v177.send();
  f111();
}
function f111() {
  f367("btn_savegame", f115);
  f367("btn_loadgame", f118);
  f367("btn_sharesave", f116);
  f367("btn_delsave", f117);
}
function f112() {
  f362("sbtn1").disabled = false;
  f362("sbtn2").disabled = false;
  f362("sbtn3").disabled = false;
  f362("sbtn4").disabled = false;
  f362("sbtn5").disabled = false;
  f362("sbtn6").disabled = false;
  f362("sbtn7").disabled = false;
  f362("sbtn8").disabled = false;
  f362("lbtn1").disabled = false;
  f362("lbtn2").disabled = false;
  f362("lbtn3").disabled = false;
  f362("lbtn4").disabled = false;
  f362("lbtn5").disabled = false;
  f362("lbtn6").disabled = false;
  f362("lbtn7").disabled = false;
  f362("lbtn8").disabled = false;
}
function f113(p116) {
  f362("sbtn" + p116).disabled = true;
}
function f114(p117) {
  f362("lbtn" + p117).disabled = true;
}
function f115() {
  var v179;
  if ((v179 = parseInt(this.id.replace("sbtn", ""))) > 6 && v442.LevelInfo.Svip <= 0) {
    f87("请开通黑暗骑士解锁该云存档位<br>黑暗骑士到期后存档永久存在，可随时续费使用");
  } else if (v179 > 4 && v442.LevelInfo.Svip <= 0 && v442.LevelInfo.Vip <= 0) {
    f87("请开通会员解锁该云存档位<br>会员到期后存档永久存在，可随时续费使用");
  } else {
    f317(v179);
  }
}
function f116() {
  f87("分享存档即将开放");
}
function f117() {
  var v180;
  v180 = parseInt(this.id.replace("dbtn", ""));
  vO13["sv" + v180] = 0;
  vO13["st" + v180] = null;
  f109();
  f362("sbtn" + v180).disabled = false;
}
var v181 = -600000;
function f118() {
  if (vLN014 == 1) {
    if (vLN066 > 1) {
      f87("加载存档时，房间不可有其他人上位，请对方先退到观战位");
      return;
    }
    if (performance.now() - v181 < 60000) {
      f87("联机时一分钟内只能加载一次存档");
      return;
    }
    f150("message", "房主加载了云存档,观众会在稍后同步");
    v181 = performance.now();
  }
  f318(parseInt(this.id.replace("lbtn", "")));
}
var vLN14 = 1;
function f119(p118) {
  var vVLN14 = vLN14;
  vLN14 = p118;
  if (vLN014 == 0) {
    f362("p" + vVLN14 + "img").src = "https://static.wo1wan.com/game/close.png";
    f362("p" + vVLN14 + "nick").innerText = "空";
    f362("p" + vLN14 + "img").src = v442.HeadImg;
    f362("p" + vLN14 + "nick").innerText = v442.NickName;
    f324(vLN14);
    var vI_sxfci_15 = f362("roomOwnerFlag");
    if ((vLN067 = vLN14 - 1) == 0) {
      vI_sxfci_15.style.left = "90px";
      vI_sxfci_15.style.top = "-10px";
    } else if (vLN067 == 1) {
      vI_sxfci_15.style.left = "280px";
      vI_sxfci_15.style.top = "-10px";
    } else if (vLN067 == 2) {
      vI_sxfci_15.style.left = "90px";
      vI_sxfci_15.style.top = "107px";
    } else if (vLN067 == 3) {
      vI_sxfci_15.style.left = "280px";
      vI_sxfci_15.style.top = "107px";
    }
  } else {
    if (v227) {
      if (f362("p" + vLN14 + "nick").innerText == "点击上位") {
        f150("join", vLN14 + "");
      }
      return;
    }
    if (f362("p" + vLN14 + "nick").innerText != "等待连接") {
      return;
    }
    v246 = true;
    v236[0] = vLN065;
    v236[1] = 0;
    f160();
    // TOLOOK
    setTimeout(function () {
      f150("switch", vLN14 + "");
    }, 200);
  }
}
var vLS1 = "1";
function f120() {
  if (vLS1 - 1 != vLN065) {
    $("[name=usersubmenu]").hide();
    if (v245["Nick" + vLS1] == "等待连接") {
      f362("usermenu_close").style.display = "block";
    } else if (v245["Nick" + vLS1] == "*关闭*") {
      f362("usermenu_open").style.display = "block";
    } else {
      if (f155()) {
        f362("usermenu_kick").style.display = "block";
        f362("usermenu_nobb").style.display = "block";
        f362("usermenu_give").style.display = "block";
      }
      f362("usermenu_add").style.display = "block";
      f362("usermenu_report").style.display = "block";
      f362("usermenu_uid").style.display = "block";
    }
  } else {
    f123();
  }
}
function f121(p119) {
  if (p119.button == 2 && vLN014 == 1) {
    var vI_sxfci_16 = f362("usermenu");
    vI_sxfci_16.style.opacity = 1;
    vI_sxfci_16.style.left = p119.clientX - 15 + "px";
    vI_sxfci_16.style.top = p119.clientY - 15 + "px";
    vLS1 = this.id == "p1card" ? "1" : this.id == "p2card" ? "2" : this.id == "p3card" ? "3" : "4";
    f120();
  }
}
function f122() {
  var v182 = v145.UUID[vLS1 - 1];
  switch (this.id) {
    case "usermenu_uid":
      f326(-1, v182, function (p120) {
        f89(p120.NickName + " 的UID是：" + p120.Uid);
        f362("chattab").click();
      });
      break;
    case "usermenu_open":
      f150("open", vLS1);
      break;
    case "usermenu_close":
      f150("close", vLS1);
      break;
    case "usermenu_kick":
      f150("kick", vLS1 - 1 + "");
      break;
    case "usermenu_nobb":
      if (f155()) {
        $.post("/sayban", {
          who: v182,
          where: "jjin_" + vLN012 + "_" + vLN015,
          say: ""
        }, function (p121) {
          if (p121.status == "ok") {
            f150("message", v145["Nick" + vLS1] + " 被房主在本房间禁言一小时");
          } else {
            f87("禁言失败");
          }
        });
      } else {
        f87("只有房主可禁言");
      }
      break;
    case "usermenu_add":
      f326(-1, v182, function (p122) {
        if (vO15.ue("friend", "add", p122.Uid)) {
          f89("好友请求发送成功，对方会在大厅收到消息");
        } else {
          f87("游戏大厅无法找到，请从大厅开始游戏");
        }
      });
      break;
    case "usermenu_report":
      f88("畅玩大叔正在测，马上开放");
      break;
    case "usermenu_give":
      if (f155()) {
        f150("transferroom", vLS1 - 1 + "");
      }
  }
  var vI_sxfci_17 = f362("usermenu");
  vI_sxfci_17.style.opacity = 0;
  // TOLOOK
  setTimeout(function () {
    vI_sxfci_17.style.top = "-200px";
  }, 100);
}
function f123() {
  var vI_sxfci_18 = f362("usermenu");
  vI_sxfci_18.style.opacity = 0;
  // TOLOOK
  setTimeout(function () {
    vI_sxfci_18.style.top = "-200px";
  }, 100);
}
function f124() {
  f365("p1card", function () {
    f119(1);
  });
  f365("p2card", function () {
    f119(2);
  });
  f365("p3card", function () {
    f119(3);
  });
  f365("p4card", function () {
    f119(4);
  });
  f369("usercard", "mouseup", f121);
  f367("usersubmenu", f122);
  f366("usermenu", "mouseleave", f123);
}
function f125(p123) {
  if (p123.indexOf("igw:cmd:") != 0) {
    return "";
  }
  var v183 = p123.replace("igw:cmd:", "").split("=");
  if (v183.length < 2) {
    return "";
  }
  switch (v183[0]) {
    case "enabledmg":
      if (v183[1] == "1") {
        vO9.P.value = true;
        return "控制台：显伤害打开";
      } else {
        vO9.P.value = false;
        return "控制台：显伤害关闭";
      }
  }
  return "";
}
var vO15 = {
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
    if (window.IGWorld === true && vO15.fe === null) {
      vO15.IGWorld = true;
      vO15.fe = eval("require('electron')['ipcRenderer'];");
      vO15.path = eval("if ('kbOPg' !== _0x3628('0x3e7')) {\n    var _0x3ef490 = i_sxfci_(_0x3628('0x23b')), _0x18295c = i_sxfci_('Broomownerflag');\n    0 == i_Ebjce ? (_0x3ef490['style'][_0x3628('0x282')] = _0x3628('0x1cd'), _0x3ef490[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0x22e'), _0x18295c['style'][_0x3628('0x270')] = _0x3628('0x3e3')) : 1 == i_Ebjce ? (_0x3ef490['style']['left'] = _0x3628('0x1cd'), _0x3ef490['style'][_0x3628('0x270')] = _0x3628('0x1f6'), _0x18295c[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0xc8')) : 2 == i_Ebjce ? (_0x3ef490['style']['left'] = '128px', _0x3ef490[_0x3628('0x3e')]['top'] = _0x3628('0x54'), _0x18295c[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0x1f')) : 3 == i_Ebjce && (_0x3ef490['style'][_0x3628('0x282')] = '128px', _0x3ef490[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0xe5'), _0x18295c[_0x3628('0x3e')][_0x3628('0x270')] = _0x3628('0x4a6'));\n} else {\n    require(_0x3628('0x82'));\n}");
      vO15.fe.on("syncconfig", function (p124, p125) {
        vO15._e = p125;
      });
      vO15._e = vO15.fe.sendSync("loadconfig");
    }
    // TOLOOK
    setTimeout(this.xe, 2000);
    window.addEventListener("focus", this.xe);
    window.addEventListener("beforeunload", this.Me);
    return vO15.IGWorld;
  },
  Pe: function (p126) {
    if (navigator.userAgent.indexOf("igwmobgame") > 0 && typeof window.IGWGameCore == "function") {
      if (vO15.Ee == null) {
        vO15.Ee = new window.IGWGameCore();
      }
      if (vO15.Ee != null) {
        vO15.Ee.call("{\"type\":\"screen\", \"style\":" + p126 + "}");
      }
    }
  },
  Ae: function (p127, p128) {
    if (vO15.fe != null) {
      vO15.fe.send(p127, p128);
    }
  },
  Se: function (p129, p130) {
    if (vO15.fe != null) {
      vO15.fe.send("run", p129, p130);
    }
  },
  Ce: function (p131, p132, p133) {
    if (vO15.fe != null) {
      vO15.fe.send("wincmd", p131, p132, p133);
    }
  },
  Ke: function (p134, p135) {
    if (this.fe != null) {
      return this.fe.sendSync("syncrun", p134, p135);
    }
  },
  Oe: function (p136, p137) {
    if (vO15.fe == null) {
      window.open(p136);
    } else {
      vO15.fe.send("openwin", p137, p136, winargs);
    }
  },
  j: function () {
    vO15.Ce("game", "self.minimize();");
  },
  H: function () {
    vO15.Ce("game", "if(!self.isMaximized())\n                      self.maximize()\n                    else\n                      self.unmaximize()");
  },
  V: function () {
    vO15.Ce("game", "self.close();");
  },
  Xe: function (p138, p139) {},
  Re: function () {
    vO15.Ce("game", "self.webContents.openDevTools();");
  },
  xe: function () {
    vO15.ue("state", "ingame", JSON.stringify({
      gametype: "fc",
      roomid: vLN015,
      gamename: vLS2,
      gameid: vLN012,
      server: vLN017
    }));
  },
  Me: function () {
    vO15.ue("state", "lobby", "");
  },
  ue: function (p140, p141, p142) {
    if (vO15.fe != null) {
      vO15.Ce("lobby", "self.webContents.send('gamesync'," + JSON.stringify({
        event: p140,
        type: p141,
        data: p142
      }) + ")");
      return true;
    } else if (window.opener == null) {
      return window.parent != null && (window.parent.postMessage({
        event: p140,
        type: p141,
        data: p142
      }, "*"), true);
    } else {
      window.opener.postMessage({
        event: p140,
        type: p141,
        data: p142
      }, "*");
      return true;
    }
  },
  ze: function (p143 = "vip") {
    vO15.ue("viptips", p143, "");
    f359("UserAction", "ShowVIP", [vLN012 + ""]);
  }
};
var vA = [];
var vLN034 = 0;
var vO16 = {
  Ie: [],
  Ne: [],
  Ue: [],
  De: []
};
function f126(p144, p145) {
  var vLS9 = "";
  for (var vLN035 = 0; vLN035 < p145.length; vLN035++) {
    if (p145[vLN035] == "←") {
      vLS9 += "1 ";
    }
    if (p145[vLN035] == "→") {
      vLS9 += "2 ";
    }
    if (p145[vLN035] == "↑") {
      vLS9 += "3 ";
    }
    if (p145[vLN035] == "↓") {
      vLS9 += "4 ";
    }
    if (p145[vLN035] == "↖") {
      vLS9 += "5 ";
    }
    if (p145[vLN035] == "↗") {
      vLS9 += "6 ";
    }
    if (p145[vLN035] == "↙") {
      vLS9 += "7 ";
    }
    if (p145[vLN035] == "↘") {
      vLS9 += "8 ";
    }
    if (p145[vLN035] == "A") {
      vLS9 += "A ";
    }
    if (p145[vLN035] == "B") {
      vLS9 += "B ";
    }
    if (p145[vLN035] == "C") {
      vLS9 += "C ";
    }
    if (p145[vLN035] == "D") {
      vLS9 += "D ";
    }
    if (p145[vLN035] == "E") {
      vLS9 += "E ";
    }
    if (p145[vLN035] == "F") {
      vLS9 += "F ";
    }
    if (p145[vLN035] == "等") {
      vLS9 += "等 ";
    }
    if (p145[vLN035] == "正") {
      vLS9 += "正 ";
    }
    if (p145[vLN035] == "反") {
      vLS9 += "反 ";
    }
  }
  vO32[p144] = vLS9;
}
function f127() {
  var v184 = vO32.gGes1.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓");
  v184 = v184.split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges1").value = v184;
  v184 = (v184 = vO32.gGes2.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓")).split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges2").value = v184;
  v184 = (v184 = vO32.gGes3.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓")).split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges3").value = v184;
  v184 = (v184 = vO32.gGes4.split("1").join("←").split("2").join("→").split("3").join("↑").split("4").join("↓")).split("5").join("↖").split("6").join("↗").split("7").join("↙").split("8").join("↘");
  document.getElementById("Ges4").value = v184;
  document.getElementById("GesSpeed").value = vO32.gGesSpeed;
}
function f128() {
  vO16.Ie = [];
  vO16.Ne = [];
  vO16.Ue = [];
  vO16.De = [];
  for (var vLN036 = 0; vLN036 < vO32.gGes1.length; vLN036++) {
    switch (vO32.gGes1[vLN036]) {
      case "1":
        vO16.Ie.push(vLN642);
        break;
      case "2":
        vO16.Ie.push(vLN128);
        break;
      case "3":
        vO16.Ie.push(vLN16);
        break;
      case "4":
        vO16.Ie.push(vLN323);
        break;
      case "5":
        vO16.Ie.push(vLN16 | vLN642);
        break;
      case "6":
        vO16.Ie.push(vLN16 | vLN128);
        break;
      case "7":
        vO16.Ie.push(vLN323 | vLN642);
        break;
      case "8":
        vO16.Ie.push(vLN323 | vLN128);
        break;
      case "A":
        vO16.Ie.push(mask_fire1);
        break;
      case "B":
        vO16.Ie.push(mask_fire2);
        break;
      case "C":
        vO16.Ie.push(mask_fire3);
        break;
      case "D":
        vO16.Ie.push(mask_fire4);
        break;
      case "E":
        vO16.Ie.push(mask_fire5);
        break;
      case "F":
        vO16.Ie.push(mask_fire6);
        break;
      case "等":
        vO16.Ie.push(0);
    }
  }
  for (vLN036 = 0; vLN036 < vO32.gGes2.length; vLN036++) {
    switch (vO32.gGes2[vLN036]) {
      case "1":
        vO16.Ne.push(vLN642);
        break;
      case "2":
        vO16.Ne.push(vLN128);
        break;
      case "3":
        vO16.Ne.push(vLN16);
        break;
      case "4":
        vO16.Ne.push(vLN323);
        break;
      case "5":
        vO16.Ne.push(vLN16 | vLN642);
        break;
      case "6":
        vO16.Ne.push(vLN16 | vLN128);
        break;
      case "7":
        vO16.Ne.push(vLN323 | vLN642);
        break;
      case "8":
        vO16.Ne.push(vLN323 | vLN128);
        break;
      case "A":
        vO16.Ne.push(mask_fire1);
        break;
      case "B":
        vO16.Ne.push(mask_fire2);
        break;
      case "C":
        vO16.Ne.push(mask_fire3);
        break;
      case "D":
        vO16.Ne.push(mask_fire4);
        break;
      case "E":
        vO16.Ne.push(mask_fire5);
        break;
      case "F":
        vO16.Ne.push(mask_fire6);
        break;
      case "等":
        vO16.Ne.push(0);
    }
  }
  for (vLN036 = 0; vLN036 < vO32.gGes3.length; vLN036++) {
    switch (vO32.gGes3[vLN036]) {
      case "1":
        vO16.Ue.push(vLN642);
        break;
      case "2":
        vO16.Ue.push(vLN128);
        break;
      case "3":
        vO16.Ue.push(vLN16);
        break;
      case "4":
        vO16.Ue.push(vLN323);
        break;
      case "5":
        vO16.Ue.push(vLN16 | vLN642);
        break;
      case "6":
        vO16.Ue.push(vLN16 | vLN128);
        break;
      case "7":
        vO16.Ue.push(vLN323 | vLN642);
        break;
      case "8":
        vO16.Ue.push(vLN323 | vLN128);
        break;
      case "A":
        vO16.Ue.push(mask_fire1);
        break;
      case "B":
        vO16.Ue.push(mask_fire2);
        break;
      case "C":
        vO16.Ue.push(mask_fire3);
        break;
      case "D":
        vO16.Ue.push(mask_fire4);
        break;
      case "E":
        vO16.Ue.push(mask_fire5);
        break;
      case "F":
        vO16.Ue.push(mask_fire6);
        break;
      case "等":
        vO16.Ue.push(0);
    }
  }
  for (vLN036 = 0; vLN036 < vO32.gGes4.length; vLN036++) {
    switch (vO32.gGes4[vLN036]) {
      case "1":
        vO16.De.push(vLN642);
        break;
      case "2":
        vO16.De.push(vLN128);
        break;
      case "3":
        vO16.De.push(vLN16);
        break;
      case "4":
        vO16.De.push(vLN323);
        break;
      case "5":
        vO16.De.push(vLN16 | vLN642);
        break;
      case "6":
        vO16.De.push(vLN16 | vLN128);
        break;
      case "7":
        vO16.De.push(vLN323 | vLN642);
        break;
      case "8":
        vO16.De.push(vLN323 | vLN128);
        break;
      case "A":
        vO16.De.push(mask_fire1);
        break;
      case "B":
        vO16.De.push(mask_fire2);
        break;
      case "C":
        vO16.De.push(mask_fire3);
        break;
      case "D":
        vO16.De.push(mask_fire4);
        break;
      case "E":
        vO16.De.push(mask_fire5);
        break;
      case "F":
        vO16.De.push(mask_fire6);
        break;
      case "等":
        vO16.De.push(0);
    }
  }
}
function f129() {
  if (vA.length > 0) {
    var v185 = vA.shift();
    if (vLN034 == 1) {
      if (v185 & vLN642) {
        v185 &= ~vLN642;
        v185 |= vLN128;
      } else if (v185 & vLN128) {
        v185 &= ~vLN128;
        v185 |= vLN642;
      }
    }
    return v185;
  }
  return null;
}
function f130(p146) {
  vA.push(0);
  if (p146 == 0) {
    vA = vA.concat(vO16.Ie);
  } else if (p146 == 1) {
    vA = vA.concat(vO16.Ne);
  } else if (p146 == 2) {
    vA = vA.concat(vO16.Ue);
  } else if (p146 == 3) {
    vA = vA.concat(vO16.De);
  }
  vA.push(0);
}
var v186 = navigator.userAgent;
var vO17 = {
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
    if (vO32.gCtlZD && navigator.vibrate != null) {
      navigator.vibrate(32);
    }
  },
  We: function () {
    f309(this.Be, 1);
  },
  Je: function () {
    f309(this.Be, 0);
  },
  Qe: function () {
    f309(this.Ge, 1);
  },
  Ze: function () {
    f309(this.Ge, 0);
  },
  en: function () {
    if (vO32.gASuper) {
      f309(this.Le, 2);
    } else {
      f309(this.Le, 1);
    }
  },
  nn: function () {
    f309(this.Le, 0);
  },
  tn: function () {
    if (vO32.gBSuper) {
      f309(this.qe, 2);
    } else {
      f309(this.qe, 1);
    }
  },
  an: function () {
    f309(this.qe, 0);
  },
  in: function () {
    f309(this.Ve, 1);
  },
  cn: function () {
    f309(this.Ve, 0);
  },
  sn: function () {
    f309(this.je, 1);
  },
  rn: function () {
    f309(this.je, 0);
  },
  ln: function () {
    f309(this.Ye, vO32.gExtX1Key);
  },
  un: function () {
    f309(this.Ye, 0);
  },
  _n: function (p147) {
    f309(this.Fe, p147);
  }
};
var v187 = false;
var v188 = null;
var vLN037 = 0;
var vLN15 = 1;
var vLN23 = 2;
var vLN33 = 3;
var vLN45 = 4;
var vLN5 = 5;
var vLN6 = 6;
var vLN7 = 7;
var vLN82 = 8;
var vLN9 = 9;
var v189 = -1;
var v190 = -1;
var v191 = -1;
var v192 = -1;
var v193 = -1;
var v194 = -1;
var v195 = -1;
var v196 = -1;
var vLN038 = 0;
var v197 = false;
var v198 = false;
var v199 = false;
var v200 = false;
var v201 = false;
var v202 = false;
var v203 = false;
var v204 = false;
var v205 = false;
var v206 = false;
var v207 = false;
var v208 = false;
var v209 = -1;
var v210 = null;
var vLN039 = 0;
var vLN040 = 0;
var vLN041 = 0;
function f131() {
  window.addEventListener("gamepadconnected", function (p148) {
    if (v66) {
      f51(navigator.getGamepads());
    } else {
      f239(navigator.getGamepads());
    }
    if (v210 == null) {
      v210 = // TOLOOK
      setInterval(f132, 4);
    }
    v187 = true;
    if (v60 != null) {
      v60[vLN011] = 1;
    }
    var v211 = p148.gamepad.id.substr(0, p148.gamepad.id.indexOf("(Ven"));
    if (v211 == "") {
      v211 = p148.gamepad.id.substr(0, p148.gamepad.id.indexOf("("));
    }
    if (v211 == "") {
      v211 = p148.gamepad.id;
    }
    f89("外设 【" + v211 + "】接入", true);
  });
  window.addEventListener("gamepaddisconnected", function (p149) {
    if (v66) {
      var vF51 = f51(navigator.getGamepads());
    } else {
      vF51 = f239(navigator.getGamepads());
    }
    if (vF51 <= 0) {
      v187 = false;
      if (v60 != null) {
        v60[vLN011] = 0;
      }
    }
    if (v210) {
      clearInterval(v210);
      v210 = null;
    }
    var v212 = p149.gamepad.id.substr(0, p149.gamepad.id.indexOf("(Ven"));
    if (v212 == "") {
      v212 = p149.gamepad.id.substr(0, p149.gamepad.id.indexOf("("));
    }
    if (v212 == "") {
      v212 = p149.gamepad.id;
    }
    f87("外设【" + v212 + "】断开", true);
  });
}
var vLN042 = 0;
function f132() {
  if (v60 != null) {
    clearInterval(v210);
    v210 = null;
    return;
  }
  f135();
}
function f133(p150) {
  var v213 = navigator.getGamepads()[p150];
  var vLN043 = 0;
  if (v213 == null) {
    return vLN043;
  }
  if (vO32.GPSetx.KeyCoin != -1 && v213.buttons[vO32.GPSetx.KeyCoin].pressed) {
    vLN043 |= vLN46;
  }
  if (vO32.GPSetx.KeyStart != -1 && v213.buttons[vO32.GPSetx.KeyStart].pressed) {
    vLN043 |= vLN83;
  }
  if (vO32.GPSetx.KeyFire1 != -1 && v213.buttons[vO32.GPSetx.KeyFire1].pressed) {
    vLN043 |= vLN17;
  }
  if (vO32.GPSetx.KeyFire2 != -1 && v213.buttons[vO32.GPSetx.KeyFire2].pressed) {
    vLN043 |= vLN24;
  }
  if (vO32.GPSetx.KeyFire3 != -1 && v213.buttons[vO32.GPSetx.KeyFire3].pressed) {
    vLN043 |= vLN17;
    vLN043 |= vLN20 * 256 + vLN16384;
  }
  if (vO32.GPSetx.KeyFire4 != -1 && v213.buttons[vO32.GPSetx.KeyFire4].pressed) {
    vLN043 |= vLN24;
    vLN043 |= vLN20 * 256 + vLN32768;
  }
  if (vO32.GPSetx.KeyJoy == 1) {
    if (vO32.GPSetx.KeyLeft == 9 || vO32.GPSetx.KeyRight == 9 || vO32.GPSetx.KeyUp == 9 || vO32.GPSetx.KeyDown == 9) {
      var v214 = v188.axes[9] * 10 | 0;
      if (vO32.GPSetx.gKeyRev) {
        switch (v214) {
          case -10:
            v214 = 7;
            break;
          case 7:
            v214 = 1;
            break;
          case 1:
            v214 = -4;
            break;
          case -4:
            v214 = -10;
            break;
          case 10:
            v214 = 4;
            break;
          case 4:
            v214 = -1;
            break;
          case -1:
            v214 = -7;
            break;
          case -7:
            v214 = 10;
        }
      }
      switch (v214) {
        case -10:
          vLN043 |= vLN16;
          break;
        case 7:
          vLN043 |= vLN642;
          break;
        case 1:
          vLN043 |= vLN323;
          break;
        case -4:
          vLN043 |= vLN128;
          break;
        case 10:
          vLN043 |= vLN642 | vLN16;
          break;
        case 4:
          vLN043 |= vLN642 | vLN323;
          break;
        case -1:
          vLN043 |= vLN128 | vLN323;
          break;
        case -7:
          vLN043 |= vLN128 | vLN16;
      }
      if (vO32.GPSetx.gKeyRevLR && vLN043 & mask_leftright) {
        vLN043 ^= mask_leftright;
      }
      if (vO32.GPSetx.gKeyRev) {
        if (vLN043 & mask_leftright) {
          vLN043 ^= mask_leftright;
        }
        if (vLN043 & mask_updown) {
          vLN043 ^= mask_updown;
        }
      }
    } else if (vO32.GPSetx.gKeyRev) {
      if (vO32.GPSetx.gKeyRevLR) {
        if (vO32.GPSetx.KeyLeft != -1 && v213.axes[vO32.GPSetx.KeyLeft] < -0.5) {
          vLN043 |= vLN642;
        }
        if (vO32.GPSetx.KeyRight != -1 && v213.axes[vO32.GPSetx.KeyRight] > 0.5) {
          vLN043 |= vLN128;
        }
      } else {
        if (vO32.GPSetx.KeyLeft != -1 && v213.axes[vO32.GPSetx.KeyLeft] > 0.5) {
          vLN043 |= vLN642;
        }
        if (vO32.GPSetx.KeyRight != -1 && v213.axes[vO32.GPSetx.KeyRight] < -0.5) {
          vLN043 |= vLN128;
        }
      }
      if (vO32.GPSetx.KeyUp != -1 && v213.axes[vO32.GPSetx.KeyUp] > 0.5) {
        vLN043 |= vLN16;
      }
      if (vO32.GPSetx.KeyDown != -1 && v213.axes[vO32.GPSetx.KeyDown] < -0.5) {
        vLN043 |= vLN323;
      }
    } else {
      if (vO32.GPSetx.gKeyRevLR) {
        if (vO32.GPSetx.KeyLeft != -1 && v213.axes[vO32.GPSetx.KeyLeft] > 0.5) {
          vLN043 |= vLN642;
        }
        if (vO32.GPSetx.KeyRight != -1 && v213.axes[vO32.GPSetx.KeyRight] < -0.5) {
          vLN043 |= vLN128;
        }
      } else {
        if (vO32.GPSetx.KeyLeft != -1 && v213.axes[vO32.GPSetx.KeyLeft] < -0.5) {
          vLN043 |= vLN642;
        }
        if (vO32.GPSetx.KeyRight != -1 && v213.axes[vO32.GPSetx.KeyRight] > 0.5) {
          vLN043 |= vLN128;
        }
      }
      if (vO32.GPSetx.KeyUp != -1 && v213.axes[vO32.GPSetx.KeyUp] < -0.5) {
        vLN043 |= vLN16;
      }
      if (vO32.GPSetx.KeyDown != -1 && v213.axes[vO32.GPSetx.KeyDown] > 0.5) {
        vLN043 |= vLN323;
      }
    }
  } else if (vO32.GPSetx.KeyUp != -1 && vO32.GPSetx.KeyDown != -1 && vO32.GPSetx.KeyLeft != -1 && vO32.GPSetx.KeyRight != -1) {
    if (v213.buttons[vO32.GPSetx.KeyUp].pressed) {
      vLN043 |= vLN16;
    }
    if (v213.buttons[vO32.GPSetx.KeyDown].pressed) {
      vLN043 |= vLN323;
    }
    if (v213.buttons[vO32.GPSetx.KeyLeft].pressed) {
      vLN043 |= vLN642;
    }
    if (v213.buttons[vO32.GPSetx.KeyRight].pressed) {
      vLN043 |= vLN128;
    }
  }
  if (vO32.GPSetx.KeyX1 != -1 && v213.buttons[vO32.GPSetx.KeyX1].pressed) {
    vLN043 |= vLN17 | vLN24;
  }
  return vLN043;
}
function f134() {
  var vF133 = f133(0);
  var vF1332 = f133(1);
  if (vF133 != vLN040) {
    vLN040 = vF133;
    f309(vO17.$e, vLN040);
  }
  if (vF1332 != vLN041) {
    vLN041 = vF1332;
    f308(vO17.$e, vLN041);
  }
  if (v60 != null) {
    v60[vLN12] = 1;
    Atomics.notify(v60, vLN12, 1);
  }
}
function f135() {
  if (vLN039 != 2) {
    var vLN044 = 0;
    if ((v188 = navigator.getGamepads()[v209]) != null) {
      if (vO32.GPSetx.KeyCoin != -1 && v188.buttons[vO32.GPSetx.KeyCoin].pressed) {
        vLN044 |= vLN46;
      }
      if (vO32.GPSetx.KeyStart != -1 && v188.buttons[vO32.GPSetx.KeyStart].pressed) {
        vLN044 |= vLN83;
      }
      if (vO32.GPSetx.KeyFire1 != -1 && v188.buttons[vO32.GPSetx.KeyFire1].pressed) {
        vLN044 |= vLN17;
      }
      if (vO32.GPSetx.KeyFire2 != -1 && v188.buttons[vO32.GPSetx.KeyFire2].pressed) {
        vLN044 |= vLN24;
      }
      if (vO32.GPSetx.KeyFire3 != -1 && v188.buttons[vO32.GPSetx.KeyFire3].pressed) {
        vLN044 |= vLN20 * 256 + vLN16384;
      }
      if (vO32.GPSetx.KeyFire4 != -1 && v188.buttons[vO32.GPSetx.KeyFire4].pressed) {
        vLN044 |= vLN20 * 256 + vLN32768;
      }
      if (vO32.GPSetx.KeyJoy == 1) {
        if (vO32.GPSetx.KeyLeft == 9 || vO32.GPSetx.KeyRight == 9 || vO32.GPSetx.KeyUp == 9 || vO32.GPSetx.KeyDown == 9) {
          var v215 = v188.axes[9] * 10 | 0;
          if (vO32.GPSetx.gKeyRev) {
            switch (v215) {
              case -10:
                v215 = 7;
                break;
              case 7:
                v215 = 1;
                break;
              case 1:
                v215 = -4;
                break;
              case -4:
                v215 = -10;
                break;
              case 10:
                v215 = 4;
                break;
              case 4:
                v215 = -1;
                break;
              case -1:
                v215 = -7;
                break;
              case -7:
                v215 = 10;
            }
          }
          switch (v215) {
            case -10:
              vLN044 |= vLN16;
              break;
            case 7:
              vLN044 |= vLN642;
              break;
            case 1:
              vLN044 |= vLN323;
              break;
            case -4:
              vLN044 |= vLN128;
              break;
            case 10:
              vLN044 |= vLN642 | vLN16;
              break;
            case 4:
              vLN044 |= vLN642 | vLN323;
              break;
            case -1:
              vLN044 |= vLN128 | vLN323;
              break;
            case -7:
              vLN044 |= vLN128 | vLN16;
          }
          if (vO32.GPSetx.gKeyRevLR && vLN044 & mask_leftright) {
            vLN044 ^= mask_leftright;
          }
          if (vO32.GPSetx.gKeyRev) {
            if (vLN044 & mask_leftright) {
              vLN044 ^= mask_leftright;
            }
            if (vLN044 & mask_updown) {
              vLN044 ^= mask_updown;
            }
          }
        } else if (vO32.GPSetx.gKeyRev) {
          if (vO32.GPSetx.gKeyRevLR) {
            if (vO32.GPSetx.KeyLeft != -1 && v188.axes[vO32.GPSetx.KeyLeft] < -0.5) {
              vLN044 |= vLN642;
            }
            if (vO32.GPSetx.KeyRight != -1 && v188.axes[vO32.GPSetx.KeyRight] > 0.5) {
              vLN044 |= vLN128;
            }
          } else {
            if (vO32.GPSetx.KeyLeft != -1 && v188.axes[vO32.GPSetx.KeyLeft] > 0.5) {
              vLN044 |= vLN642;
            }
            if (vO32.GPSetx.KeyRight != -1 && v188.axes[vO32.GPSetx.KeyRight] < -0.5) {
              vLN044 |= vLN128;
            }
          }
          if (vO32.GPSetx.KeyUp != -1 && v188.axes[vO32.GPSetx.KeyUp] > 0.5) {
            vLN044 |= vLN16;
          }
          if (vO32.GPSetx.KeyDown != -1 && v188.axes[vO32.GPSetx.KeyDown] < -0.5) {
            vLN044 |= vLN323;
          }
        } else {
          if (vO32.GPSetx.gKeyRevLR) {
            if (vO32.GPSetx.KeyLeft != -1 && v188.axes[vO32.GPSetx.KeyLeft] > 0.5) {
              vLN044 |= vLN642;
            }
            if (vO32.GPSetx.KeyRight != -1 && v188.axes[vO32.GPSetx.KeyRight] < -0.5) {
              vLN044 |= vLN128;
            }
          } else {
            if (vO32.GPSetx.KeyLeft != -1 && v188.axes[vO32.GPSetx.KeyLeft] < -0.5) {
              vLN044 |= vLN642;
            }
            if (vO32.GPSetx.KeyRight != -1 && v188.axes[vO32.GPSetx.KeyRight] > 0.5) {
              vLN044 |= vLN128;
            }
          }
          if (vO32.GPSetx.KeyUp != -1 && v188.axes[vO32.GPSetx.KeyUp] < -0.5) {
            vLN044 |= vLN16;
          }
          if (vO32.GPSetx.KeyDown != -1 && v188.axes[vO32.GPSetx.KeyDown] > 0.5) {
            vLN044 |= vLN323;
          }
        }
      } else if (vO32.GPSetx.KeyUp != -1 && vO32.GPSetx.KeyDown != -1 && vO32.GPSetx.KeyLeft != -1 && vO32.GPSetx.KeyRight != -1) {
        if (v188.buttons[vO32.GPSetx.KeyUp].pressed) {
          vLN044 |= vLN16;
        }
        if (v188.buttons[vO32.GPSetx.KeyDown].pressed) {
          vLN044 |= vLN323;
        }
        if (v188.buttons[vO32.GPSetx.KeyLeft].pressed) {
          vLN044 |= vLN642;
        }
        if (v188.buttons[vO32.GPSetx.KeyRight].pressed) {
          vLN044 |= vLN128;
        }
      }
      if (vO32.GPSetx.KeyX1 != -1 && v188.buttons[vO32.GPSetx.KeyX1].pressed) {
        vLN044 |= vLN17 | vLN24;
      }
      if (vLN044 != vLN038) {
        vLN038 = vLN044;
        if (vLN039 == 1) {
          f308(vO17.$e, vLN038);
        } else {
          f309(vO17.$e, vLN038);
        }
      }
      if (v60 != null) {
        v60[vLN12] = 1;
        Atomics.notify(v60, vLN12, 1);
      }
    }
  } else {
    f134();
  }
}
function f136(p151) {
  var v216 = Array.isArray(p151) ? [] : {};
  for (var v217 in p151) {
    if (p151.hasOwnProperty(v217)) {
      if (typeof p151[v217] == "object" && p151[v217] !== null) {
        v216[v217] = f136(p151[v217]);
      } else {
        v216[v217] = p151[v217];
      }
    }
  }
  return v216;
}
function f137() {
  return navigator.getGamepads()[v209];
}
var v218 = false;
var vO18 = {
  buttons: []
};
function f138(p152) {
  var v219 = navigator.getGamepads()[v209];
  for (var v220 in v219.buttons) {
    vO18.buttons[v220] = v219.buttons[v220].pressed;
  }
  vO18.axes = v219.axes;
  bindNow = p152;
  if (bindNow.innerText.indexOf("(") > 1) {
    bindNow.innerText = bindNow.innerText.substr(0, 2) + "(?)";
  } else {
    bindNow.innerText = bindNow.innerText.substr(0, 1) + "(?)";
  }
  v218 = true;
}
function f139(p153) {
  var vP153 = p153;
  bindNow.innerText = bindNow.innerText.replace("?", vP153);
  vO32.GPSetx[bindNow.value] = p153;
  if (bindNow.value == "KeyLeft") {
    vO32.GPSetx.KeyJoy = 0;
  }
  for (var v221 in vO32.GPSetx) {
    if (vO32.GPSetx[v221] == p153 && v221 != bindNow.value) {
      if (v221 == "KeyJoy" || v221 == "KeyUp" || v221 == "KeyDown" || v221 == "KeyLeft" || v221 == "KeyRight") {
        continue;
      }
      vO32.GPSetx[v221] = -1;
      f141();
    }
  }
  v218 = false;
}
function f140(p154) {
  var vP154 = p154;
  bindNow.innerText = bindNow.innerText.replace("?", vP154);
  vO32.GPSetx[bindNow.value] = p154;
  vO32.GPSetx.KeyJoy = 1;
  v218 = false;
}
function f141() {
  document.getElementsByName("joybind").forEach(function (p155) {
    var v222 = vO32.GPSetx[p155.firstChild.value];
    v222 = "(" + v222 + ")";
    if (p155.firstChild.innerText.indexOf("(") > 0) {
      p155.firstChild.innerText = p155.firstChild.innerText.substr(0, p155.firstChild.innerText.indexOf("("));
    }
    if (p155.firstChild.innerText.length > 1) {
      p155.firstChild.innerText = p155.firstChild.innerText.substr(0, 2) + v222;
    } else {
      p155.firstChild.innerText = p155.firstChild.innerText.substr(0, 1) + v222;
    }
  });
}
function f142() {
  if (v187 && v218) {
    for (var v223 = navigator.getGamepads()[0], vLN045 = 0; vLN045 < v223.buttons.length; vLN045++) {
      if (v223.buttons[vLN045].pressed && vO18.buttons[vLN045] == 0) {
        f139(vLN045);
        break;
      }
    }
    for (vLN045 = 0; vLN045 < v223.axes.length; vLN045++) {
      if (Math.abs(v223.axes[vLN045]) > 0.5 && v223.axes[vLN045] != vO18.axes[vLN045]) {
        f140(vLN045);
        break;
      }
    }
  }
}
function f143() {
  f144();
  f131();
}
var vLN046 = 0;
var vLN047 = 0;
var vLN65535 = 65535;
var vLN655352 = 65535;
var v224 = false;
var v225 = false;
function f144() {
  document.addEventListener("keydown", function (p156) {
    v225 = p156.altKey;
    if (!p156.repeat && !v224 && p156.key != "Enter") {
      if (p156.ctrlKey && vLN014 == 0 && v66) {
        if (p156.key == "z") {
          f317(1);
          f88(" 快速存1号档");
        }
        if (p156.key == "x") {
          f318(1);
          f88(" 快速读1号档");
        }
      }
      if (p156.key == "Tab") {
        f98();
        p156.preventDefault();
        return;
      }
      if (p156.code != "Escape") {
        if ((p156.target.type != "password" || p156.target.nodeName != "INPUT") && (p156.target.type != "text" || p156.target.nodeName != "INPUT") && p156.target.nodeName != "TEXTAREA") {
          if (p156.key != "`") {
            switch (p156.code) {
              case vO32.PCSet.KeyUp:
                vLN047 = (vLN046 |= 1) & -3 & vLN65535;
                vLN655352 = -3;
                vO17._n(vLN047);
                break;
              case vO32.PCSet.KeyLeft:
                vLN047 = (vLN046 |= 4) & -9;
                vLN65535 = -9;
                if ((vLN046 & 12) != 12 || vO32.gDisHoldLR) {
                  vO17._n(vLN046);
                } else {
                  var vVLN047 = vLN047;
                  vO17._n(vVLN047 | vLN047);
                }
                break;
              case vO32.PCSet.KeyDown:
                vLN047 = (vLN655352 = -2) & (vLN046 |= 2) & vLN65535;
                vO17._n(vLN047);
                break;
              case vO32.PCSet.KeyRight:
                vLN047 = (vLN65535 = -5) & (vLN046 |= 8);
                if ((vLN046 & 12) != 12 || vO32.gDisHoldLR) {
                  vO17._n(vLN046);
                } else {
                  vVLN047 = vLN047;
                  vO17._n(vVLN047 | vLN047);
                }
                break;
              case vO32.PCSet.KeyFire1:
                vO17.en();
                break;
              case vO32.PCSet.KeyFire2:
                vO17.tn();
                break;
              case vO32.PCSet.KeyFire3:
                vO17.in();
                break;
              case vO32.PCSet.KeyFire4:
                vO17.sn();
                break;
              case vO32.PCSet.KeyStart:
                vO17.We();
                break;
              case vO32.PCSet.KeyCoin:
                vO17.Qe();
                break;
              case vO32.PCSet.KeyX1:
                vO17.ln();
            }
            p156.preventDefault();
          } else {
            f27();
          }
        }
      } else {
        f99();
      }
    }
  }, false);
  document.addEventListener("keyup", function (p157) {
    v225 = p157.altKey;
    if (p157.key != "Enter") {
      if (!p157.repeat) {
        switch (p157.code) {
          case vO32.PCSet.KeyUp:
            vLN047 = (vLN046 &= -2) & vLN65535;
            vO17._n(vLN047);
            break;
          case vO32.PCSet.KeyLeft:
            vLN046 &= -5;
            vLN65535 = -5;
            vO17._n(vLN046);
            break;
          case vO32.PCSet.KeyDown:
            vLN047 = (vLN046 &= -3) & vLN65535;
            vO17._n(vLN047);
            break;
          case vO32.PCSet.KeyRight:
            vLN046 &= -9;
            vLN65535 = -9;
            vO17._n(vLN046);
            break;
          case vO32.PCSet.KeyFire1:
            vO17.nn();
            break;
          case vO32.PCSet.KeyFire2:
            vO17.an();
            break;
          case vO32.PCSet.KeyFire3:
            vO17.cn();
            break;
          case vO32.PCSet.KeyFire4:
            vO17.rn();
            break;
          case vO32.PCSet.KeyStart:
            vO17.Je();
            if (!v416 && v66) {
              f357();
            }
            break;
          case vO32.PCSet.KeyCoin:
            vO17.Ze();
            break;
          case vO32.PCSet.KeyX1:
            vO17.un();
        }
        p157.preventDefault();
      }
    } else {
      f94();
    }
  }, false);
}
var vLN048 = 0;
var vLN049 = 0;
function f145(p158, p159) {
  f147(vLN048 = f146(vLN048, p158, p159));
}
var vLN46 = 4;
var vLN83 = 8;
var vLN642 = 64;
var vLN128 = 128;
var vLN16 = 16;
var vLN323 = 32;
var vLN17 = 1;
var vLN24 = 2;
var vLN16384 = 16384;
var vLN32768 = 32768;
var vLN255 = 255;
var vLN16128 = 16128;
var vLN256 = 256;
function f146(p160, p161, p162) {
  var vP162 = p162;
  switch (p161) {
    case vO17.$e:
      p160 = vP162;
      break;
    case vO17.o:
      if (vP162 & 1) {
        p160 |= vLN256;
      } else {
        p160 &= ~vLN256;
      }
      break;
    case vO17.Ye:
      if (vP162 & 1) {
        p160 |= vLN17 | vLN24;
      } else {
        p160 &= ~(vLN17 | vLN24);
      }
      break;
    case vO17.Be:
      if (vP162 == 1) {
        p160 |= vLN83;
      } else {
        p160 &= ~vLN83;
      }
      break;
    case vO17.Ge:
      if (vP162 == 1) {
        p160 |= vLN46;
      } else {
        p160 &= ~vLN46;
      }
      break;
    case vO17.Le:
      if (vP162 > 0) {
        p160 |= vLN17;
        if (vP162 == 2) {
          vLN049 |= vLN17;
          vLN056 |= vLN17;
        }
      } else {
        p160 &= ~vLN17;
        vLN049 &= ~vLN17;
        vLN056 &= ~vLN17;
      }
      break;
    case vO17.qe:
      if (vP162 > 0) {
        p160 |= vLN24;
        if (vP162 == 2) {
          vLN049 |= vLN24;
          vLN056 |= vLN24;
        }
      } else {
        p160 &= ~vLN24;
        vLN049 &= ~vLN24;
        vLN056 &= ~vLN24;
      }
      break;
    case vO17.Ve:
      if (vP162 == 1) {
        p160 &= ~vLN16128;
        p160 |= vLN17;
        p160 |= vLN20 * 256 + vLN16384;
      } else {
        p160 &= ~vLN17;
        p160 &= ~vLN16384;
      }
      break;
    case vO17.je:
      if (vP162 == 1) {
        p160 &= ~vLN16128;
        p160 |= vLN24;
        p160 |= vLN20 * 256 + vLN32768;
      } else {
        p160 &= ~vLN24;
        p160 &= ~vLN32768;
      }
      break;
    case vO17.Fe:
      if (vP162 & 1) {
        p160 |= vLN16;
      } else {
        p160 &= ~vLN16;
      }
      if (vP162 & 2) {
        p160 |= vLN323;
      } else {
        p160 &= ~vLN323;
      }
      if (vP162 & 4) {
        p160 |= vLN642;
      } else {
        p160 &= ~vLN642;
      }
      if (vP162 & 8) {
        p160 |= vLN128;
      } else {
        p160 &= ~vLN128;
      }
  }
  return p160;
}
function f147(p163) {
  if (v59 != null) {
    v59[1] = p163;
  } else {
    f305(vO30.vn, p163 & 255, p163 / 256);
  }
}
function f148(p164) {
  f305(vO30.dn, p164 & 255, p164 / 256);
}
var v245 = null;
var v227 = false;
var v228 = false;
var v229 = false;
var v246 = false;
var v231 = false;
var vLN066 = 0;
var vLN051 = 0;
var vLN052 = 0;
var vLN053 = 0;
var v232 = null;
var v233 = new ArrayBuffer(2);
var v234 = new Uint16Array(v233);
var v235 = new ArrayBuffer(4);
var v236 = new Uint16Array(v235);
var vLN065 = 0;
var vLN067 = 0;
var vLN056 = 0;
var vLN057 = 0;
var vLN058 = 0;
function f149(p165, p166) {
  if (vLN066 == 1) {
    f6();
  }
  if (v228 && !v246) {
    if (v232.readyState == WebSocket.OPEN || v231 != 0) {
      v234[0] = f146(v234[0], p165, p166);
      v236[0] = vLN065;
      v236[1] = v234[0];
      if (v59 != null) {
        v59[0] = v236[0];
        v59[1] = v236[1];
      } else {
        f160();
      }
    }
  }
}
function f150(p167, p168) {
  if (p167 == "message") {
    $.post("/saycheck", {
      say: p168,
      where: "fcin_" + vLN012 + "_" + vLN015
    }, function (p169) {
      var vO19 = {
        Info: p167,
        Message: p169.check
      };
      if (p169.check.indexOf("在本房间已被禁言") >= 0) {
        f87(p169.check);
      } else {
        var v237 = JSON.stringify(vO19);
        v232.send(v237);
      }
    });
  } else {
    var vO20 = {
      Info: p167,
      Message: p168
    };
    var v238 = JSON.stringify(vO20);
    v232.send(v238);
  }
}
function f151() {
  f150("ready", "no");
}
function f152() {
  var vI_tdBda_3 = f361("sev");
  var vI_tdBda_4 = f361("rname");
  var vI_tdBda_5 = f361("rpsw");
  var vI_tdBda_6 = f361("rj");
  var vI_tdBda_7 = f361("rl");
  var vI_tdBda_8 = f361("look");
  var vI_tdBda_9 = f361("gstate");
  vLN058 = vI_tdBda_3;
  if (vI_tdBda_5 == null) {
    vI_tdBda_5 = "";
  }
  if (vI_tdBda_6 == null) {
    vI_tdBda_6 = true;
  }
  if (vI_tdBda_7 == null) {
    vI_tdBda_7 = true;
  }
  var v239 = "&rname=" + encodeURI(vI_tdBda_4) + "&rpsw=" + encodeURI(vI_tdBda_5) + "&rj=" + vI_tdBda_6 + "&rl=" + vI_tdBda_7 + "&state=" + vI_tdBda_9;
  var vLS10 = "";
  if (!v66) {
    vLS10 = "&mob=1";
  }
  if (vI_tdBda_4 != "" && vI_tdBda_4 != null && !v66 && v56) {
    f362("sharedtip").style.display = "block";
    // TOLOOK
    setTimeout(function () {
      f362("sharedtip").style.display = "none";
    }, 3000);
  }
  if (vI_tdBda_8 == "1") {
    v232 = new WebSocket("wss://link00" + vI_tdBda_3 + ".wo1wan.com:6001/fcnext/watch?lid=" + vLN015 + "&gid=" + vLN012 + v239 + vLS10);
    v227 = true;
    f164();
  } else {
    v232 = new WebSocket("wss://link00" + vI_tdBda_3 + ".wo1wan.com:6001/fcnext/link?lid=" + vLN015 + "&max=2&gid=" + vLN012 + v239 + vLS10);
  }
  v232.binaryType = "arraybuffer";
  v232.onopen = function (p170) {};
  v232.onclose = function (p171) {
    if (v66) {
      f76();
      v231 = true;
    } else if (vLN059 > 1) {
      f322();
    }
  };
  v232.onmessage = vI_tdBda_8 == "1" ? f162 : f153;
}
function f153(p172) {
  if (typeof p172.data != "string") {
    if (p172.data.byteLength != 10) {
      if (p172.data.byteLength == 16) {
        var v240 = new Uint32Array(p172.data);
        vLN051 = v240[0];
      }
      v71.postMessage(p172.data, [p172.data]);
    } else {
      f158(p172.data);
    }
  } else {
    f165(p172);
  }
}
function f154(p173, p174) {
  f75(p173, p174);
}
function f155() {
  return vLN065 == vLN067;
}
function f156() {
  f150("sync", "ok");
}
function f157() {
  f150("sync", "fail");
}
var vLN059 = 0;
var v241 = new Uint32Array(1);
var v242 = null;
var vLN060 = 0;
var vLN061 = 0;
var vLN062 = 0;
var vLN063 = 0;
function f158(p175) {
  v232.send(p175);
  var v243 = new Uint16Array(p175);
  if (Math.abs(vLN060 - v243[1]) > 5) {
    f154(1, v243[1]);
    vLN060 = v243[1];
  }
  if (Math.abs(vLN061 - v243[2]) > 5) {
    f154(2, v243[2]);
    vLN061 = v243[2];
  }
  if (Math.abs(vLN062 - v243[3]) > 5) {
    f154(3, v243[3]);
    vLN062 = v243[3];
  }
  if (Math.abs(vLN063 - v243[4]) > 5) {
    f154(4, v243[4]);
    vLN063 = v243[4];
  }
}
function f159(p176) {
  if (typeof p176.data != "string") {
    v71.postMessage(p176.data, [p176.data]);
  } else if (v66) {
    PCStringProcess(p176);
  } else {
    StringProcess(p176);
  }
}
function f160() {
  if (!v227) {
    if (v59 != null) {
      v59[0] = v236[0];
      v59[1] = v236[1];
      return;
    }
    v71.postMessage(v235);
  }
}
function f161(p177) {
  if (v232.readyState == WebSocket.OPEN) {
    v232.send(p177);
  }
}
var vLS11 = "";
function f162(p178) {
  if (typeof p178.data == "string") {
    var v244 = JSON.parse(p178.data);
    switch (v244.Info) {
      case "init":
        break;
      case "player":
        (v245 = v244).Nick1 = v245.Nick1.replace("等待连接", "点击上位");
        v245.Nick2 = v245.Nick2.replace("等待连接", "点击上位");
        v245.Nick3 = v245.Nick3.replace("等待连接", "点击上位");
        v245.Nick4 = v245.Nick4.replace("等待连接", "点击上位");
        vLN065 = 5;
        if (v66) {
          f78(v245);
        } else {
          f241(v245);
        }
        break;
      case "sync":
        f314(0, v244.to);
        break;
      case "message":
        if (v244.msg == null) {
          v244.msg = v244.text;
          v244.from = "系统消息";
          v244.type = 0;
        }
        if (v66) {
          f91(v244.from, v244.msg, v244.text, v244.type);
        } else {
          f255(v244.from, v244.msg, v244.text, v244.type);
        }
        break;
      case "join":
        var vI_tdBda_10 = f361("sev");
        window.location.replace("https://play.wo1wan.com/fcnext/play?id=" + vLN012 + "&mode=1&rpsw=" + vLS11 + "&sev=" + vI_tdBda_10 + "&linkid=" + vLN015);
        break;
      case "checkpwd":
        f362("popwin_password").style.display = "block";
        f362("pswcheckval").value = "";
        f364("pswcheckbtn", f163);
        f365("pswcheckbtn", f163);
        break;
      case "pwderror":
        f87("密码错误");
    }
  } else {
    if (p178.data.byteLength % 12 == 0 || p178.data.byteLength == 8) {
      new Uint32Array(p178.data);
    }
    v71.postMessage(p178.data, [p178.data]);
  }
}
function f163() {
  f150("checkpwd", vLS11 = f362("pswcheckval").value);
  f362("popwin_password").style.display = "none";
}
function f164() {
  v378 = true;
  if (!v66) {
    if (v319) {
      f208();
      f219();
    }
  }
}
var vLN064 = 0;
var vLN065 = 0;
var v245 = null;
var vLN066 = 0;
var v246 = false;
var vLN067 = 0;
function f165(p179) {
  if (typeof p179.data == "string") {
    var v247 = JSON.parse(p179.data);
    switch (v247.Info) {
      case "init":
        vLN065 = parseInt(v247.Num) - 1;
        v236[0] = vLN065;
        v236[1] = v234[0];
        f160();
        v246 = false;
        f38();
        break;
      case "player":
        v245 = v247;
        if (v66) {
          f78(v245);
        } else {
          f241(v245);
        }
        var vVLN066 = vLN066;
        vLN066 = 0;
        if (v247.Img1 != "./img/waithead.png") {
          vLN066++;
        }
        if (v247.Img2 != "./img/waithead.png") {
          vLN066++;
        }
        if (v247.Img3 != "./img/waithead.png") {
          vLN066++;
        }
        if (v247.Img4 != "./img/waithead.png") {
          vLN066++;
        }
        if (vLN066 >= 2 || vVLN066 != vLN066) {
          f6();
        }
        vLN067 = v247.boss;
        f151();
        break;
      case "start":
        v232.onmessage = f153;
        v228 = true;
        vO29.l();
        break;
      case "watch":
        v232.onmessage = f159;
        break;
      case "sync":
        if (v247.act == "upload") {
          if (v228) {
            f314(1, v247.to);
          }
        } else {
          f314(0, v247.to);
          if (!v228) {
            v229 = true;
            v232.onmessage = f153;
          }
        }
        vLN094 = 0;
        break;
      case "look":
        v232.onmessage = f159;
        break;
      case "lookupdate":
        f79(v247.count);
        break;
      case "message":
        if (v247.from == "系统消息") {
          if (v247.msg.indexOf("加入游戏") > 0) {
            vLN064 = parseInt(v247.msg.substr(2, 1));
          }
          if (v247.msg.indexOf("房间人数已满") >= 0) {
            v247.msg = "房间人数已满，即将进入观战模式";
            // TOLOOK
            setTimeout(function () {
              f89("5秒后进入观战模式");
            }, 500);
            // TOLOOK
            setTimeout(function () {
              window.location.replace(window.location.origin + window.location.pathname + "?&look=1&id=" + vLN012 + "&mode=1&sev=" + vLN017 + "&linkid=" + vLN015);
            }, 5500);
          }
        }
        if (v66) {
          f91(v247.from, v247.msg, v247.text, v247.type);
        } else {
          f255(v247.from, v247.msg, v247.text, v247.type);
        }
        break;
      case "vote":
        f28(v247.message, v247.act);
        break;
      case "act":
        if (v66) {
          f80(v247.act);
        } else {
          f243(v247.act);
        }
        break;
      case "savereplay":
        if (v247.file != null && v247.file != "") {
          $.ajax("/replay/create", {
            type: "POST",
            async: true,
            data: {
              type: "fc",
              gid: vLN012,
              name: v245["Nick" + (vLN065 + 1)] + "创建的录像",
              rlen: v247.len,
              rpath: v247.file
            },
            success: function (p180, p181, p182) {
              if (p180.status == "success") {
                var v248 = Math.floor(v247.len * 16.66666 / 1000);
                f150("message", "录像已保存到服务器 时长:" + (Math.floor(v248 / 60) + "分" + (v248 %= 60) + "秒") + (" <text style='color: rgb(255,121,0)'>录像ID:" + p180.rid + " </text>") + " <a target='_blank' href='https://play.wo1wan.com/jj/replay?rid=" + p180.rid + "'>点击观看</a>");
              } else {
                f87("录像保存失败");
              }
            }
          });
        }
    }
  }
}
var v249 = null;
var v250 = null;
var v251 = null;
var v252 = null;
var v253 = null;
var v254 = null;
var v255 = null;
var v256 = null;
var v257 = null;
var v258 = null;
var v259 = false;
var v260 = false;
var v261 = false;
var v262 = false;
var v263 = false;
function f166() {
  (v249 = document.createElement("canvas")).width = vO24.A.Size * 80;
  v249.height = vO24.A.Size * 80;
  v254 = v249.cloneNode(true);
  var v264 = v249.getContext("2d");
  v264.scale(vO24.A.Size, vO24.A.Size);
  v264.globalAlpha = vO24.A.Alpha;
  f185(v264, 0, 0, 80, "A");
  (v264 = v254.getContext("2d")).scale(vO24.A.Size, vO24.A.Size);
  v264.globalAlpha = vO24.A.Alpha;
  f186(v264, 0, 0, 80, "A");
  vO24.A.Obj = v254;
  vO24.A.Reinit = f166;
}
function f167() {
  (v250 = document.createElement("canvas")).width = vO24.B.Size * 80;
  v250.height = vO24.B.Size * 80;
  v255 = v250.cloneNode(true);
  var v265 = v250.getContext("2d");
  v265.scale(vO24.B.Size, vO24.B.Size);
  v265.globalAlpha = vO24.B.Alpha;
  f185(v265, 0, 0, 80, "B");
  (v265 = v255.getContext("2d")).scale(vO24.B.Size, vO24.B.Size);
  v265.globalAlpha = vO24.B.Alpha;
  f186(v265, 0, 0, 80, "B");
  vO24.B.Obj = v255;
  vO24.B.Reinit = f167;
}
function f168() {
  (v251 = document.createElement("canvas")).width = vO24.AA.Size * 68;
  v251.height = vO24.AA.Size * 68;
  v256 = v251.cloneNode(true);
  var v266 = v251.getContext("2d");
  v266.scale(vO24.AA.Size, vO24.AA.Size);
  v266.globalAlpha = vO24.AA.Alpha;
  f187(v266, 0, 0, 68, "AA", "rgba(57, 55, 50,1.0", "#ffffff");
  (v266 = v256.getContext("2d")).scale(vO24.AA.Size, vO24.AA.Size);
  v266.globalAlpha = vO24.AA.Alpha;
  f188(v266, 0, 0, 68, "AA");
  vO24.AA.Obj = v251;
  vO24.AA.Reinit = f168;
}
function f169() {
  (v252 = document.createElement("canvas")).width = vO24.BB.Size * 68;
  v252.height = vO24.BB.Size * 68;
  v257 = v252.cloneNode(true);
  var v267 = v252.getContext("2d");
  v267.scale(vO24.BB.Size, vO24.BB.Size);
  v267.globalAlpha = vO24.BB.Alpha;
  f187(v267, 0, 0, 68, "BB", "rgba(57, 55, 50,1.0", "#ffffff");
  (v267 = v257.getContext("2d")).scale(vO24.BB.Size, vO24.BB.Size);
  v267.globalAlpha = vO24.BB.Alpha;
  f188(v267, 0, 0, 68, "BB");
  vO24.BB.Obj = v252;
  vO24.BB.Reinit = f169;
}
function f170() {
  (v253 = document.createElement("canvas")).width = vO24.AB.Size * 58;
  v253.height = vO24.AB.Size * 58;
  v258 = v253.cloneNode(true);
  var v268 = v253.getContext("2d");
  v268.scale(vO24.AB.Size, vO24.AB.Size);
  v268.globalAlpha = vO24.AB.Alpha;
  f187(v268, 0, 0, 58, "AB", "rgba(57, 55, 50,1.0", "#ffffff");
  (v268 = v258.getContext("2d")).scale(vO24.AB.Size, vO24.AB.Size);
  v268.globalAlpha = vO24.AB.Alpha;
  f188(v268, 0, 0, 58, "AB");
  vO24.AB.Obj = v253;
  vO24.AB.Reinit = f170;
}
function f171() {
  f166();
  f167();
  f168();
  f169();
  f170();
}
function f172() {
  v317.clearRect(vO24.A.X, vO24.A.Y, v254.width, v254.height);
  v317.clearRect(vO24.B.X, vO24.B.Y, v255.width, v255.height);
  v317.clearRect(vO24.AA.X, vO24.AA.Y, v256.width, v256.height);
  v317.clearRect(vO24.BB.X, vO24.BB.Y, v257.width, v257.height);
  v317.clearRect(vO24.AB.X, vO24.AB.Y, v258.width, v258.height);
}
function f173() {
  f175();
  f177();
  f179();
  f181();
  f183();
  if (v307) {
    v317.strokeStyle = "rgba(255, 255, 255,1.0)";
    v317.lineWidth = 2;
    v317.shadowOffsetX = 0;
    v317.shadowOffsetY = 0;
    v317.shadowBlur = 2;
    v317.shadowColor = "rgba(0,0,0,1.0)";
    v317.beginPath();
    v317.rect(vO24.A.X, vO24.A.Y, v254.width, v254.height);
    v317.stroke();
    v317.rect(vO24.B.X, vO24.B.Y, v255.width, v255.height);
    v317.stroke();
    v317.rect(vO24.AA.X, vO24.AA.Y, v256.width, v256.height);
    v317.stroke();
    v317.rect(vO24.BB.X, vO24.BB.Y, v257.width, v257.height);
    v317.stroke();
    v317.rect(vO24.AB.X, vO24.AB.Y, v258.width, v258.height);
    v317.stroke();
  }
}
function f174(p183, p184, p185) {
  if (f227(p183, p184, vO24.A.X, vO24.A.Y, v254.width, v254.height)) {
    if (p185 != null && p185 != f176) {
      p185();
    }
    v259 = true;
    f175();
    return f176;
  } else if (f227(p183, p184, vO24.B.X, vO24.B.Y, v255.width, v255.height)) {
    if (p185 != null && p185 != f178) {
      p185();
    }
    v260 = true;
    f177();
    return f178;
  } else if (f227(p183, p184, vO24.AA.X, vO24.AA.Y, v256.width, v256.height)) {
    if (p185 != null && p185 != f180) {
      p185();
    }
    v261 = true;
    f179();
    return f180;
  } else if (f227(p183, p184, vO24.BB.X, vO24.BB.Y, v257.width, v257.height)) {
    if (p185 != null && p185 != f182) {
      p185();
    }
    v262 = true;
    f181();
    return f182;
  } else if (f227(p183, p184, vO24.AB.X, vO24.AB.Y, v258.width, v258.height)) {
    if (p185 != null && p185 != f184) {
      p185();
    }
    v263 = true;
    f183();
    return f184;
  } else {
    return p185;
  }
}
function f175() {
  v317.clearRect(vO24.A.X, vO24.A.Y, v254.width, v254.height);
  if (v259) {
    vO17.en();
    v317.drawImage(v254, vO24.A.X, vO24.A.Y);
  } else {
    vO17.nn();
    v317.drawImage(v249, vO24.A.X, vO24.A.Y);
  }
}
function f176() {
  v259 = false;
  f175();
}
function f177() {
  v317.clearRect(vO24.B.X, vO24.B.Y, v255.width, v255.height);
  if (v260) {
    vO17.tn();
    v317.drawImage(v255, vO24.B.X, vO24.B.Y);
  } else {
    vO17.an();
    v317.drawImage(v250, vO24.B.X, vO24.B.Y);
  }
}
function f178() {
  v260 = false;
  f177();
}
function f179() {
  v317.clearRect(vO24.AA.X, vO24.AA.Y, v256.width, v256.height);
  if (v261) {
    vO17.in();
    v317.drawImage(v256, vO24.AA.X, vO24.AA.Y);
  } else {
    vO17.cn();
    v317.drawImage(v251, vO24.AA.X, vO24.AA.Y);
  }
}
function f180() {
  v261 = false;
  f179();
}
function f181() {
  v317.clearRect(vO24.BB.X, vO24.BB.Y, v257.width, v257.height);
  if (v262) {
    vO17.sn();
    v317.drawImage(v257, vO24.BB.X, vO24.BB.Y);
  } else {
    vO17.rn();
    v317.drawImage(v252, vO24.BB.X, vO24.BB.Y);
  }
}
function f182() {
  v262 = false;
  f181();
}
function f183() {
  v317.clearRect(vO24.AB.X, vO24.AB.Y, v258.width, v258.height);
  if (v263) {
    vO17.ln();
    v317.drawImage(v258, vO24.AB.X, vO24.AB.Y);
  } else {
    vO17.un();
    v317.drawImage(v253, vO24.AB.X, vO24.AB.Y);
  }
}
function f184() {
  v263 = false;
  f183();
}
function f185(p186, p187, p188, p189, p190) {
  p186.beginPath();
  p186.arc(p189 / 2, p189 / 2, p189 / 2 - 2, 0, Math.PI * 2, false);
  p186.strokeStyle = "rgba(0, 0, 0, 0)";
  p186.shadowOffsetX = 0;
  p186.shadowOffsetY = 1;
  p186.shadowBlur = 2;
  p186.shadowColor = "rgba(0, 0, 0,0.8)";
  p186.fillStyle = "rgba(255, 255, 255,0.16)";
  p186.fill();
  p186.closePath();
  p186.beginPath();
  p186.arc(p189 / 2, p189 / 2, p189 / 2 - 8, 0, Math.PI * 2, false);
  p186.closePath();
  p186.shadowColor = "rgba(0,0, 0, 0.8)";
  p186.shadowOffsetX = 0;
  p186.shadowOffsetY = 1;
  p186.shadowBlur = 4;
  p186.fillStyle = "rgba(249, 211, 66,1.0)";
  p186.fill();
  p186.shadowOffsetX = 0;
  p186.shadowOffsetY = 0;
  p186.shadowBlur = 0;
  p186.font = "11px zcool-gdh";
  p186.textAlign = "center";
  p186.textBaseline = "middle";
  p186.fillStyle = "#2d2d2d";
  p186.fillText(p190, p189 / 2, p189 / 2);
  p186.fillText(p190, p189 / 2, p189 / 2);
}
function f186(p191, p192, p193, p194, p195) {
  p191.beginPath();
  p191.arc(p194 / 2, p194 / 2, p194 / 2 - 2, 0, Math.PI * 2, false);
  p191.strokeStyle = "rgba(0, 0, 0, 0)";
  p191.shadowOffsetX = 0;
  p191.shadowOffsetY = 0;
  p191.shadowBlur = 5;
  p191.shadowColor = "#F9D342";
  p191.fillStyle = "#FFFFFF";
  p191.fill();
  p191.closePath();
  p191.beginPath();
  p191.arc(p194 / 2, p194 / 2, p194 / 2 - 8, 0, Math.PI * 2, false);
  p191.closePath();
  p191.shadowColor = "rgba(0,0, 0, 0.8)";
  p191.shadowOffsetX = 0;
  p191.shadowOffsetY = 1;
  p191.shadowBlur = 4;
  var v269 = p191.createRadialGradient(p194 / 2, p194 / 2, p194 / 2 / 2 - 4, p194 / 2, p194 / 2, p194 / 2 - 8);
  v269.addColorStop(0, "#F9D342");
  v269.addColorStop(1, "#F9A942");
  p191.fillStyle = v269;
  p191.fill();
  p191.shadowOffsetX = 0;
  p191.shadowOffsetY = 0;
  p191.shadowBlur = 0;
  p191.font = "11px zcool-gdh";
  p191.textAlign = "center";
  p191.textBaseline = "middle";
  p191.fillStyle = "#2d2d2d";
  p191.fillText(p195, p194 / 2, p194 / 2);
  p191.fillText(p195, p194 / 2, p194 / 2);
}
function f187(p196, p197, p198, p199, p200, p201, p202) {
  p196.beginPath();
  p196.arc(p199 / 2, p199 / 2, p199 / 2 - 2, 0, Math.PI * 2, false);
  p196.strokeStyle = "rgba(0, 0, 0, 0)";
  p196.shadowOffsetX = 0;
  p196.shadowOffsetY = 1;
  p196.shadowBlur = 2;
  p196.shadowColor = "rgba(0, 0, 0,0.8)";
  p196.fillStyle = "rgba(255, 255, 255,0.16)";
  p196.fill();
  p196.closePath();
  p196.beginPath();
  p196.arc(p199 / 2, p199 / 2, p199 / 2 - 8, 0, Math.PI * 2, false);
  p196.closePath();
  p196.shadowColor = "rgba(0,0, 0, 0.8)";
  p196.shadowOffsetX = 0;
  p196.shadowOffsetY = 1;
  p196.shadowBlur = 4;
  p196.fillStyle = p201;
  p196.fill();
  p196.shadowOffsetX = 0;
  p196.shadowOffsetY = 0;
  p196.shadowBlur = 0;
  p196.font = "11px zcool-gdh";
  p196.textAlign = "center";
  p196.textBaseline = "middle";
  p196.fillStyle = p202;
  p196.fillText(p200, p199 / 2, p199 / 2);
  p196.fillText(p200, p199 / 2, p199 / 2);
}
function f188(p203, p204, p205, p206, p207, p208) {
  p203.beginPath();
  p203.arc(p206 / 2, p206 / 2, p206 / 2 - 2, 0, Math.PI * 2, false);
  p203.strokeStyle = "rgba(0, 0, 0, 0)";
  p203.shadowOffsetX = 0;
  p203.shadowOffsetY = 0;
  p203.shadowBlur = 5;
  p203.shadowColor = "#F9D342";
  p203.fillStyle = "#FFFFFF";
  p203.fill();
  p203.closePath();
  p203.beginPath();
  p203.arc(p206 / 2, p206 / 2, p206 / 2 - 8, 0, Math.PI * 2, false);
  p203.closePath();
  p203.shadowColor = "rgba(0,0, 0, 0.8)";
  p203.shadowOffsetX = 0;
  p203.shadowOffsetY = 1;
  p203.shadowBlur = 4;
  var v270 = p203.createRadialGradient(p206 / 2, p206 / 2, p206 / 2 / 2 - 4, p206 / 2, p206 / 2, p206 / 2 - 8);
  v270.addColorStop(0, "#F9D342");
  v270.addColorStop(1, "#F9A942");
  p203.fillStyle = v270;
  p203.fill();
  p203.shadowOffsetX = 0;
  p203.shadowOffsetY = 0;
  p203.shadowBlur = 0;
  p203.font = "11px zcool-gdh";
  p203.textAlign = "center";
  p203.textBaseline = "middle";
  p203.fillStyle = "#2d2d2d";
  p203.fillText(p207, p206 / 2, p206 / 2);
  p203.fillText(p207, p206 / 2, p206 / 2);
}
var v271 = null;
var v272 = null;
var v273 = null;
var v274 = null;
var v275 = null;
var v276 = null;
var v277 = null;
var v278 = null;
var v279 = null;
var vLN068 = 0;
var vLN160 = 160;
function f189(p209, p210, p211, p212) {
  var vO21 = {
    x: p210 / 2,
    y: p210 / 2,
    r: p210 / 2 - 15
  };
  p209.beginPath();
  p209.lineWidth = 0.5;
  var vLN0292 = 0.29;
  var vLN082 = 0.82;
  var vLN088 = 0.88;
  p209.moveTo(vO21.x + vO21.r * -vLN0292, vO21.y - vO21.r * vLN082);
  p209.lineTo(vO21.x + vO21.r * -0.1, vO21.y - vO21.r * vLN088);
  p209.lineTo(vO21.x + vO21.r * 0.1, vO21.y - vO21.r * vLN088);
  p209.lineTo(vO21.x + vO21.r * vLN0292, vO21.y - vO21.r * vLN082);
  p209.arc(vO21.x, vO21.y, vO21.r * 0.4, Math.PI * 1.7, Math.PI * 1.8);
  p209.lineTo(vO21.x + vO21.r * vLN082, vO21.y + vO21.r * -vLN0292);
  p209.lineTo(vO21.x + vO21.r * vLN088, vO21.y - vO21.r * 0.1);
  p209.lineTo(vO21.x + vO21.r * vLN088, vO21.y - vO21.r * -0.1);
  p209.lineTo(vO21.x + vO21.r * vLN082, vO21.y - vO21.r * -vLN0292);
  p209.arc(vO21.x, vO21.y, vO21.r * 0.4, Math.PI * 0.2, Math.PI * 0.3);
  p209.lineTo(vO21.x + vO21.r * vLN0292, vO21.y - vO21.r * -vLN082);
  p209.lineTo(vO21.x + vO21.r * 0.1, vO21.y - vO21.r * -vLN088);
  p209.lineTo(vO21.x + vO21.r * -0.1, vO21.y - vO21.r * -vLN088);
  p209.lineTo(vO21.x + vO21.r * -vLN0292, vO21.y - vO21.r * -vLN082);
  p209.arc(vO21.x, vO21.y, vO21.r * 0.4, Math.PI * 0.7, Math.PI * 0.8);
  p209.lineTo(vO21.x + vO21.r * -vLN082, vO21.y - vO21.r * -vLN0292);
  p209.lineTo(vO21.x + vO21.r * -vLN088, vO21.y - vO21.r * -0.1);
  p209.lineTo(vO21.x + vO21.r * -vLN088, vO21.y - vO21.r * 0.1);
  p209.lineTo(vO21.x + vO21.r * -vLN082, vO21.y + vO21.r * -vLN0292);
  p209.arc(vO21.x, vO21.y, vO21.r * 0.4, Math.PI * 1.2, Math.PI * 1.3);
  p209.closePath();
  var v280 = p209.createLinearGradient(0, vO21.r * 2, 0, 0);
  v280.addColorStop(0, "rgba(102, 101, 99, 1.0)");
  v280.addColorStop(1, "rgba(41, 40, 38, 1.0)");
  p209.fillStyle = v280;
  p209.shadowColor = "rgba(0, 0, 0, 0.4)";
  p209.shadowBlur = 2;
  p209.shadowOffsetY = 5;
  p209.fill();
  p209.beginPath();
  p209.strokeStyle = "rgba(10, 5, 5, 0.7)";
  p209.lineWidth = 4;
  var vLN0272 = 0.27;
  var vLN085 = 0.85;
  p209.moveTo(vO21.x + vO21.r * -vLN0272, vO21.y - vO21.r * vLN085);
  p209.lineTo(vO21.x + vO21.r * -0.1, vO21.y - vO21.r * 0.9);
  p209.lineTo(vO21.x + vO21.r * 0.1, vO21.y - vO21.r * 0.9);
  p209.lineTo(vO21.x + vO21.r * vLN0272, vO21.y - vO21.r * vLN085);
  p209.moveTo(vO21.x + vO21.r * vLN085, vO21.y + vO21.r * -vLN0272);
  p209.lineTo(vO21.x + vO21.r * 0.9, vO21.y - vO21.r * 0.1);
  p209.lineTo(vO21.x + vO21.r * 0.9, vO21.y - vO21.r * -0.1);
  p209.lineTo(vO21.x + vO21.r * vLN085, vO21.y - vO21.r * -vLN0272);
  p209.moveTo(vO21.x + vO21.r * vLN0272, vO21.y - vO21.r * -vLN085);
  p209.lineTo(vO21.x + vO21.r * 0.1, vO21.y - vO21.r * -0.9);
  p209.lineTo(vO21.x + vO21.r * -0.1, vO21.y - vO21.r * -0.9);
  p209.lineTo(vO21.x + vO21.r * -vLN0272, vO21.y - vO21.r * -vLN085);
  p209.moveTo(vO21.x + vO21.r * -vLN085, vO21.y - vO21.r * -vLN0272);
  p209.lineTo(vO21.x + vO21.r * -0.9, vO21.y - vO21.r * -0.1);
  p209.lineTo(vO21.x + vO21.r * -0.9, vO21.y - vO21.r * 0.1);
  p209.lineTo(vO21.x + vO21.r * -vLN085, vO21.y + vO21.r * -vLN0272);
  p209.shadowOffsetY = 0;
  p209.shadowBlur = 0;
  p209.stroke();
  p209.beginPath();
  var v281 = p209.createLinearGradient(0, vO21.r * 2, 0, 0);
  v281.addColorStop(0, "rgba(249, 161, 66,0.8)");
  v281.addColorStop(1, "rgba(249, 211, 66, 0.9)");
  p209.strokeStyle = v281;
  p209.lineWidth = 1;
  var vLN0552 = 0.55;
  var vLN0672 = 0.67;
  var vLN0662 = 0.66;
  p209.moveTo(vO21.x + vO21.r * -vLN0552, vO21.y - vO21.r * vLN0672);
  p209.lineTo(vO21.x + vO21.r * -vLN0662, vO21.y - vO21.r * vLN0662);
  p209.lineTo(vO21.x + vO21.r * -vLN0662 + (vLN0672 - vLN0662), vO21.y - vO21.r * vLN0552);
  p209.moveTo(vO21.x + vO21.r * -vLN0552, vO21.y - vO21.r * -vLN0672);
  p209.lineTo(vO21.x + vO21.r * -vLN0662, vO21.y - vO21.r * -vLN0662);
  p209.lineTo(vO21.x + vO21.r * -vLN0662 + (vLN0672 - vLN0662), vO21.y - vO21.r * -vLN0552);
  p209.moveTo(vO21.x + vO21.r * vLN0552, vO21.y - vO21.r * -vLN0672);
  p209.lineTo(vO21.x + vO21.r * vLN0662, vO21.y - vO21.r * -vLN0662);
  p209.lineTo(vO21.x + vO21.r * vLN0662 + (vLN0672 - vLN0662), vO21.y - vO21.r * -vLN0552);
  p209.moveTo(vO21.x + vO21.r * vLN0552, vO21.y - vO21.r * vLN0672);
  p209.lineTo(vO21.x + vO21.r * vLN0662, vO21.y - vO21.r * vLN0662);
  p209.lineTo(vO21.x + vO21.r * vLN0662 + (vLN0672 - vLN0662), vO21.y - vO21.r * vLN0552);
  p209.stroke();
  p209.beginPath();
  p209.arc(vO21.x, vO21.y, vO21.r + 10, 0, Math.PI * 2);
  var v282 = p209.createLinearGradient(0, vO21.r * 2 + 20, 0, -10);
  v282.addColorStop(1, "rgba(102, 101, 99, 0.6)");
  v282.addColorStop(0, "rgba(41, 40, 38, 0.6)");
  p209.fillStyle = v282;
  p209.fill();
  p209.beginPath();
  p209.lineWidth = 1.5;
  p209.lineCap = "round";
  p209.arc(vO21.x, vO21.y, vO21.r + 10 + 0.1, Math.PI, 0);
  var v283 = p209.createLinearGradient(0, vO21.r * 2 + 20, 0, -10);
  v283.addColorStop(0, "rgba(102, 101, 99, 0.5)");
  v283.addColorStop(0.5, "rgba(102, 101, 99,  0.5)");
  v283.addColorStop(1, "rgba(255, 255, 255,  0.6)");
  p209.strokeStyle = v283;
  p209.stroke();
}
function f190(p213, p214, p215, p216, p217) {
  var vO22 = {
    x: p214 / 2,
    y: p214 / 2,
    r: p214 / 2 - 15
  };
  var vLN069 = 0;
  var vLN070 = 0;
  var vLN071 = 0;
  var vLN072 = 0;
  switch (p217) {
    case 1:
      vLN070 = -0.05;
      vLN072 = -3.5;
      break;
    case 1.5:
      vLN070 = vLN069 = -0.05;
      vLN072 = -(vLN071 = 3.5);
      break;
    case 2:
      vLN069 = -0.05;
      vLN071 = 3.5;
      break;
    case 2.5:
      vLN069 = -0.05;
      vLN070 = 0.05;
      vLN072 = vLN071 = 3.5;
      break;
    case 3:
      vLN070 = 0.05;
      vLN072 = 3.5;
      break;
    case 3.5:
      vLN071 = -3.5;
      vLN070 = vLN069 = 0.05;
      vLN072 = 3.5;
      break;
    case 4:
      vLN069 = 0.05;
      vLN071 = -3.5;
      break;
    case 4.5:
      vLN070 = -(vLN069 = 0.05);
      vLN072 = vLN071 = -3.5;
  }
  p213.beginPath();
  var vLN0293 = 0.29;
  var vLN0822 = 0.82;
  var vLN0882 = 0.88;
  p213.moveTo(vO22.x + vO22.r * -(vLN0293 + vLN069), vO22.y - vO22.r * (vLN0822 - vLN070));
  p213.lineTo(vO22.x + vO22.r * -(0.1 + vLN069), vO22.y - vO22.r * (vLN0882 - vLN070));
  p213.lineTo(vO22.x + vO22.r * (0.1 - vLN069), vO22.y - vO22.r * (vLN0882 - vLN070));
  p213.lineTo(vO22.x + vO22.r * (vLN0293 - vLN069), vO22.y - vO22.r * (vLN0822 - vLN070));
  p213.arc(vO22.x + vLN071, vO22.y + vLN072, vO22.r * 0.4, Math.PI * 1.7, Math.PI * 1.8);
  p213.lineTo(vO22.x + vO22.r * (vLN0822 - vLN069), vO22.y + vO22.r * -(vLN0293 - vLN070));
  p213.lineTo(vO22.x + vO22.r * (vLN0882 - vLN069), vO22.y - vO22.r * (0.1 - vLN070));
  p213.lineTo(vO22.x + vO22.r * (vLN0882 - vLN069), vO22.y - vO22.r * -(0.1 + vLN070));
  p213.lineTo(vO22.x + vO22.r * (vLN0822 - vLN069), vO22.y - vO22.r * -(vLN0293 + vLN070));
  p213.arc(vO22.x + vLN071, vO22.y + vLN072, vO22.r * 0.4, Math.PI * 0.2, Math.PI * 0.3);
  p213.lineTo(vO22.x + vO22.r * (vLN0293 - vLN069), vO22.y - vO22.r * -(vLN0822 + vLN070));
  p213.lineTo(vO22.x + vO22.r * (0.1 - vLN069), vO22.y - vO22.r * -(vLN0882 + vLN070));
  p213.lineTo(vO22.x + vO22.r * -(0.1 + vLN069), vO22.y - vO22.r * -(vLN0882 + vLN070));
  p213.lineTo(vO22.x + vO22.r * -(vLN0293 + vLN069), vO22.y - vO22.r * -(vLN0822 + vLN070));
  p213.arc(vO22.x + vLN071, vO22.y + vLN072, vO22.r * 0.4, Math.PI * 0.7, Math.PI * 0.8);
  p213.lineTo(vO22.x + vO22.r * -(vLN0822 + vLN069), vO22.y - vO22.r * -(vLN0293 + vLN070));
  p213.lineTo(vO22.x + vO22.r * -(vLN0882 + vLN069), vO22.y - vO22.r * -(0.1 + vLN070));
  p213.lineTo(vO22.x + vO22.r * -(vLN0882 + vLN069), vO22.y - vO22.r * (0.1 - vLN070));
  p213.lineTo(vO22.x + vO22.r * -(vLN0822 + vLN069), vO22.y + vO22.r * -(vLN0293 - vLN070));
  p213.arc(vO22.x + vLN071, vO22.y + vLN072, vO22.r * 0.4, Math.PI * 1.2, Math.PI * 1.3);
  p213.closePath();
  var v284 = p213.createLinearGradient(0, 0, 0, vO22.r * 2);
  v284.addColorStop(0, "rgba(70, 70, 70, 1.0)");
  v284.addColorStop(1, "rgba(41, 40, 38, 1.0)");
  p213.fillStyle = v284;
  p213.shadowColor = "rgba(0, 0, 0, 1.0)";
  p213.shadowBlur = 2;
  p213.shadowOffsetY = 2;
  var v285 = p213.createLinearGradient(0, vO22.r * 2, 0, 0);
  v285.addColorStop(0, "rgba(90,90,90, 1.0)");
  v285.addColorStop(1, "rgba(255,255,255,1.0)");
  p213.strokeStyle = v285;
  p213.lineJoin = "round";
  p213.lineWidth = 3;
  p213.shadowBlur = 0;
  p213.shadowOffsetY = 0;
  p213.stroke();
  p213.fill();
  p213.beginPath();
  p213.arc(vO22.x + vLN071, vO22.y + vLN072, vO22.r * 0.25, 0, Math.PI * 2);
  var v286 = p213.createLinearGradient(10, p214 / 2 * 1.25, 10, p214 / 2 / 1.25);
  v286.addColorStop(0, "rgba(84, 83, 81, 1.0)");
  v286.addColorStop(1, "rgba(23,21,21,1.0)");
  p213.fillStyle = v286;
  p213.shadowBlur = 0;
  p213.shadowOffsetY = 0;
  p213.fill();
  p213.beginPath();
  var vLN0132 = 0.13;
  var vLN0652 = 0.65;
  p213.moveTo(vO22.x + vLN071, vO22.y + vLN072 - vO22.r * 0.8);
  p213.lineTo(vO22.x + vLN071 + vO22.r * vLN0132, vO22.y + vLN072 - vO22.r * vLN0652);
  p213.lineTo(vO22.x + vLN071 - vO22.r * vLN0132, vO22.y + vLN072 - vO22.r * vLN0652);
  p213.moveTo(vO22.x + vLN071, vO22.y + vLN072 - vO22.r * -0.8);
  p213.lineTo(vO22.x + vLN071 + vO22.r * -vLN0132, vO22.y + vLN072 - vO22.r * -vLN0652);
  p213.lineTo(vO22.x + vLN071 - vO22.r * -vLN0132, vO22.y + vLN072 - vO22.r * -vLN0652);
  p213.moveTo(vO22.x + vLN071 + vO22.r * 0.8, vO22.y + vLN072);
  p213.lineTo(vO22.x + vLN071 + vO22.r * vLN0652, vO22.y + vLN072 - vO22.r * -vLN0132);
  p213.lineTo(vO22.x + vLN071 + vO22.r * vLN0652, vO22.y + vLN072 + vO22.r * -vLN0132);
  p213.moveTo(vO22.x + vLN071 + vO22.r * -0.8, vO22.y + vLN072);
  p213.lineTo(vO22.x + vLN071 + vO22.r * -vLN0652, vO22.y + vLN072 - vO22.r * vLN0132);
  p213.lineTo(vO22.x + vLN071 + vO22.r * -vLN0652, vO22.y + vLN072 + vO22.r * vLN0132);
  var v287 = p213.createLinearGradient(0, vO22.r, 0, vO22.r * 5);
  v287.addColorStop(1, "rgba(249, 161, 66, 1.0)");
  v287.addColorStop(0, "rgba(249, 211, 66, 1.0)");
  p213.fillStyle = v287;
  p213.shadowColor = "rgba(0,0,0,1.0)";
  p213.shadowBlur = 0;
  p213.shadowOffsetY = -1;
  p213.closePath();
  p213.fill();
}
function f191(p218, p219, p220) {
  p218.beginPath();
  var vO23 = {
    x: p219 / 2,
    y: p219 / 2,
    r: p219 / 2 - 15
  };
  var v288 = vO23.x;
  var v289 = vO23.y;
  var v290 = vO23.r;
  p218.shadowOffsetX = 0;
  p218.shadowOffsetY = 0;
  p218.shadowBlur = 5;
  p218.shadowColor = "rgba(249, 211, 66, 0.8)";
  p218.strokeStyle = "rgba(255, 255, 255,0.8)";
  p218.lineWidth = 6;
  p218.lineCap = "square";
  if (p220 === 1) {
    p218.arc(v288, v289, v290 + 7, Math.PI * 25 / 18, Math.PI * 29 / 18);
  } else if (p220 === 1.5) {
    p218.arc(vO23.x, vO23.y, vO23.r + 7, Math.PI * 29.3 / 18, Math.PI * 33.7 / 18);
  } else if (p220 === 2) {
    p218.arc(vO23.x, vO23.y, v290 + 7, Math.PI * 34 / 18, Math.PI * 2 / 18);
  } else if (p220 === 2.5) {
    p218.arc(vO23.x, vO23.y, vO23.r + 7, Math.PI * 2.3 / 18, Math.PI * 6.7 / 18);
  } else if (p220 === 3) {
    p218.arc(vO23.x, vO23.y, vO23.r + 7, Math.PI * 7 / 18, Math.PI * 11 / 18);
  } else if (p220 === 3.5) {
    p218.arc(vO23.x, vO23.y, vO23.r + 7, Math.PI * 11.3 / 18, Math.PI * 15.7 / 18);
  } else if (p220 === 4) {
    p218.arc(vO23.x, vO23.y, vO23.r + 7, Math.PI * 16 / 18, Math.PI * 20 / 18);
  } else if (p220 === 4.5) {
    p218.arc(vO23.x, vO23.y, vO23.r + 7, Math.PI * 20.5 / 18, Math.PI * 24.5 / 18);
    p218.strokeStyle = "rgba(255, 255, 255,1.0)";
  }
  p218.stroke();
  p218.closePath();
  p218.beginPath();
}
function f192(p221, p222, p223, p224, p225) {
  f189(p221, p222, p223, p224);
  f190(p221, p222, p223, p224, p225);
  f191(p221, p222, p225);
}
function f193() {
  var vVLN160 = vLN160;
  var vVLN1602 = vLN160;
  (v271 = document.createElement("canvas")).width = vVLN160 * vO24.Pad.Size;
  v271.height = vVLN1602 * vO24.Pad.Size;
  var v291 = v271.getContext("2d");
  v291.scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  f192(v291, vVLN160, false, false, 0);
  (v291 = (v272 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  f192(v291, vVLN160, true, false, 1);
  (v291 = (v275 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  v291.translate(vVLN160 / 2, vVLN1602 / 2);
  v291.translate(-vVLN160 / 2, -vVLN1602 / 2);
  f192(v291, vVLN160, true, false, 2);
  (v291 = (v273 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  v291.translate(vVLN160 / 2, vVLN1602 / 2);
  v291.translate(-vVLN160 / 2, -vVLN1602 / 2);
  f192(v291, vVLN160, true, false, 3);
  (v291 = (v274 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  v291.translate(vVLN160 / 2, vVLN1602 / 2);
  v291.translate(-vVLN160 / 2, -vVLN1602 / 2);
  f192(v291, vVLN160, true, false, 4);
  (v291 = (v276 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  f192(v291, vVLN160, false, true, 1.5);
  (v291 = (v277 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  v291.translate(vVLN160 / 2, vVLN1602 / 2);
  v291.translate(-vVLN160 / 2, -vVLN1602 / 2);
  f192(v291, vVLN160, false, true, 2.5);
  (v291 = (v279 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  v291.translate(vVLN160 / 2, vVLN1602 / 2);
  v291.translate(-vVLN160 / 2, -vVLN1602 / 2);
  f192(v291, vVLN160, false, true, 3.5);
  (v291 = (v278 = v271.cloneNode(true)).getContext("2d")).scale(vO24.Pad.Size, vO24.Pad.Size);
  v291.globalAlpha = vO24.Pad.Alpha;
  v291.translate(vVLN160 / 2, vVLN1602 / 2);
  v291.translate(-vVLN160 / 2, -vVLN1602 / 2);
  f192(v291, vVLN160, false, true, 4.5);
  vO24.Pad.Obj = v271;
  vO24.Pad.Reinit = f193;
}
function f194() {
  v317.clearRect(vO24.Pad.X, vO24.Pad.Y, v271.width, v271.height);
  switch (vLN068) {
    case 0:
      v317.drawImage(v271, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 1:
      v317.drawImage(v272, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 2:
      v317.drawImage(v273, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 4:
      v317.drawImage(v274, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 5:
      v317.drawImage(v278, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 6:
      v317.drawImage(v279, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 8:
      v317.drawImage(v275, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 9:
      v317.drawImage(v276, vO24.Pad.X, vO24.Pad.Y);
      break;
    case 10:
      v317.drawImage(v277, vO24.Pad.X, vO24.Pad.Y);
      break;
    default:
      v317.drawImage(v271, vO24.Pad.X, vO24.Pad.Y);
  }
  if (v307) {
    v317.beginPath();
    v317.rect(vO24.Pad.X, vO24.Pad.Y, v271.width, v271.height);
    v317.closePath();
    v317.strokeStyle = "rgba(255, 255, 255,1.0)";
    v317.lineWidth = 2;
    v317.shadowOffsetX = 0;
    v317.shadowOffsetY = 0;
    v317.shadowBlur = 2;
    v317.shadowColor = "rgba(0,0,0,1.0)";
    v317.stroke();
  }
}
function f195(p226, p227) {
  if (!f227(p226, p227, vO24.Pad.X - 100, vO24.Pad.Y - 100, v271.width * 2.5, v271.height * 2.5)) {
    return null;
  }
  var v292 = p226 - (vO24.Pad.X + vLN160 * vO24.Pad.Size / 2);
  var v293 = p227 - (vO24.Pad.Y + vLN160 * vO24.Pad.Size / 2);
  var vLN073 = 0;
  var v294 = vLN160 * vO24.Pad.Size / 6;
  if (v294 < v292) {
    vLN073 |= 8;
  }
  if (v292 < -v294) {
    vLN073 |= 4;
  }
  if (v293 < -v294) {
    vLN073 |= 1;
  }
  if (v294 < v293) {
    vLN073 |= 2;
  }
  vO17._n(vLN073);
  vLN068 = vLN073;
  f194();
  return f197;
}
function f196(p228, p229, p230) {
  if (!f227(p228, p229, vO24.Pad.X, vO24.Pad.Y, v271.width, v271.height) && !p230) {
    return null;
  }
  var v295 = p228 - (vO24.Pad.X + vLN160 * vO24.Pad.Size / 2);
  var v296 = p229 - (vO24.Pad.Y + vLN160 * vO24.Pad.Size / 2);
  var v297 = Math.abs(v295);
  var v298 = Math.abs(v296);
  var vLN074 = 0;
  if (v297 > 8 && v298 > 8 && (v298 < v297 && v297 / 1.8 < v298 || v298 / 1.8 < v297 && v297 < v298 || v297 == v298)) {
    if (v295 > 8) {
      vLN074 |= 8;
    }
    if (v295 < -8) {
      vLN074 |= 4;
    }
    if (v296 < -8) {
      vLN074 |= 1;
    }
    if (v296 > 8) {
      vLN074 |= 2;
    }
  } else if (v298 < v297) {
    if (v295 > 8) {
      vLN074 |= 8;
    } else if (v295 < -8) {
      vLN074 |= 4;
    }
  } else if (v296 < -8) {
    vLN074 |= 1;
  } else if (v296 > 8) {
    vLN074 |= 2;
  }
  vO17._n(vLN074);
  vLN068 = vLN074;
  f194();
  return f197;
}
function f197() {
  vLN068 = 0;
  vO17._n(0);
  f194();
}
var v299 = null;
var v300 = null;
var v301 = null;
var v302 = null;
var v303 = false;
var v304 = false;
function f198() {
  (v301 = document.createElement("canvas")).width = vO24.Start.Size * 56;
  v301.height = vO24.Start.Size * 56;
  v302 = v301.cloneNode(true);
  var v305 = v301.getContext("2d");
  v305.scale(vO24.Start.Size, vO24.Start.Size);
  v305.globalAlpha = vO24.Start.Alpha;
  f185(v305, 0, 0, 56, "开始");
  (v305 = v302.getContext("2d")).scale(vO24.Start.Size, vO24.Start.Size);
  v305.globalAlpha = vO24.Start.Alpha;
  f186(v305, 0, 0, 56, "开始");
  vO24.Start.Obj = v302;
  vO24.Start.Reinit = f198;
}
function f199() {
  (v299 = document.createElement("canvas")).width = vO24.Select.Size * 56;
  v299.height = vO24.Select.Size * 56;
  v300 = v299.cloneNode(true);
  var v306 = v299.getContext("2d");
  v306.scale(vO24.Select.Size, vO24.Select.Size);
  v306.globalAlpha = vO24.Select.Alpha;
  f185(v306, 0, 0, 56, "选择");
  (v306 = v300.getContext("2d")).scale(vO24.Select.Size, vO24.Select.Size);
  v306.globalAlpha = vO24.Select.Alpha;
  f186(v306, 0, 0, 56, "选择");
  vO24.Select.Obj = v300;
  vO24.Select.Reinit = f199;
}
function f200() {
  f199();
  f198();
}
function f201() {
  v317.clearRect(vO24.Select.X, vO24.Select.Y, v300.width, v300.height);
  v317.clearRect(vO24.Start.X, vO24.Start.Y, v302.width, v302.height);
}
function f202() {
  f204();
  f205();
}
function f203(p231, p232) {
  if (f227(p231, p232, vO24.Select.X, vO24.Select.Y, v300.width, v300.height)) {
    v303 = true;
    f204();
    return f206;
  } else if (f227(p231, p232, vO24.Start.X, vO24.Start.Y, v302.width, v302.height)) {
    v304 = true;
    f205();
    return f207;
  } else {
    return undefined;
  }
}
function f204() {
  v317.clearRect(vO24.Select.X, vO24.Select.Y, v300.width, v300.height);
  if (v303) {
    vO17.Qe();
    v317.drawImage(v300, vO24.Select.X, vO24.Select.Y);
  } else {
    vO17.Ze();
    v317.drawImage(v299, vO24.Select.X, vO24.Select.Y);
  }
  if (v307) {
    v317.beginPath();
    v317.rect(vO24.Select.X, vO24.Select.Y, v300.width, v300.height);
    v317.strokeStyle = "rgba(255, 255, 255,1.0)";
    v317.lineWidth = 2;
    v317.shadowOffsetX = 0;
    v317.shadowOffsetY = 0;
    v317.shadowBlur = 2;
    v317.shadowColor = "rgba(0,0,0,1.0)";
    v317.stroke();
  }
}
function f205() {
  v317.clearRect(vO24.Start.X, vO24.Start.Y, v302.width, v302.height);
  if (v304) {
    vO17.We();
    v317.drawImage(v302, vO24.Start.X, vO24.Start.Y);
  } else {
    vO17.Je();
    v317.drawImage(v301, vO24.Start.X, vO24.Start.Y);
  }
  if (v307) {
    v317.beginPath();
    v317.rect(vO24.Start.X, vO24.Start.Y, v302.width, v302.height);
    v317.strokeStyle = "rgba(255, 255, 255,1.0)";
    v317.lineWidth = 2;
    v317.shadowOffsetX = 0;
    v317.shadowOffsetY = 0;
    v317.shadowBlur = 2;
    v317.shadowColor = "rgba(0,0,0,1.0)";
    v317.stroke();
  }
}
function f206() {
  v303 = false;
  f204();
}
function f207() {
  v304 = false;
  f205();
}
var v307 = false;
var v308 = false;
var vO24 = {
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
var v309 = null;
var v310 = null;
var v311 = false;
function f208() {
  if (v310 == null || v310 == null) {
    v310 = v317.drawImage;
  }
  v317.drawImage = v308 || v378 ? function () {} : v310;
  if (!v311 || vO24.Select.X == 0 && vO24.Select.Y == 0) {
    var v312 = v316.width;
    var v313 = v316.height;
    vO24.Pad.X = 42;
    vO24.Pad.Y = v313 - 180;
    vO24.Select.Y = v313 - 80;
    vO24.Select.X = v312 / 2 - 60;
    vO24.Start.Y = v313 - 80;
    vO24.Start.X = v312 / 2 + 10;
    vO24.B.X = v312 - 190;
    vO24.B.Y = v313 - 88;
    vO24.A.X = v312 - 100;
    vO24.A.Y = v313 - 92;
    vO24.BB.X = v312 - 175;
    vO24.BB.Y = v313 - 165;
    vO24.AA.X = v312 - 95;
    vO24.AA.Y = v313 - 170;
    vO24.AB.X = v312 - 95;
    vO24.AB.Y = v313 - 230;
  } else {
    f219();
  }
}
function f209() {}
function f210() {
  v307 = true;
  v309 = vO24.Pad;
  f219();
}
function f211(p233, p234) {
  for (var v314 in vO24) {
    if (v314 != "GamePadType" && vO24[v314].Obj != null && vO24[v314].Obj != null && !vO24[v314].Hide && f227(p233, p234, vO24[v314].X, vO24[v314].Y, vO24[v314].Obj.width, vO24[v314].Obj.height)) {
      v309 = vO24[v314];
      $("#layout_size").val(((v309.Size * 100 - 50) / 1.5).toFixed(0)).trigger("input");
      $("#layout_transparent").val((v309.Alpha * 100).toFixed(0)).trigger("input");
      return vO24[v314];
    }
  }
  return null;
}
function f212(p235, p236, p237) {
  p235 = Math.floor(p235);
  p236 = Math.floor(p236);
  for (var v315 in vO24) {
    if (v315 != "GamePadType" && vO24[v315].Obj != null && vO24[v315].Obj != null && (vO24[v315].X != p237.X || vO24[v315].Y != p237.Y) && !vO24[v315].Hide && f228(p235, p236, p237.Obj.width, p237.Obj.height, vO24[v315].X, vO24[v315].Y, vO24[v315].Obj.width, vO24[v315].Obj.height)) {
      return false;
    }
  }
  return true;
}
function f213() {
  v307 = false;
  v309 = null;
  f219();
}
function f214(p238) {
  if (v309 != null) {
    v309.Size = p238;
    v309.Reinit();
    f219();
  }
}
function f215(p239) {
  if (v309 != null) {
    v309.Alpha = p239;
    v309.Reinit();
    f219();
  }
}
var v316 = null;
var v317 = null;
var v318 = false;
var vO25 = {};
var vO26 = {};
var vO27 = {};
var v319 = false;
function f216(p240) {
  var v320 = window.orientation;
  if (v320 === undefined && window.screen.orientation != null) {
    v320 = window.screen.orientation.angle;
  }
  if (v320 === 180 || v320 === 0) {
    v318 = true;
  }
  if (v320 === 90 || v320 === -90) {
    v318 = false;
  }
}
function f217() {
  if (v319) {
    f218();
  } else {
    v319 = true;
    var vI_sxfci_19 = f362("phonewrap");
    (v316 = f362("gametap")).width = vI_sxfci_19.clientWidth;
    v316.height = vI_sxfci_19.clientHeight;
    v317 = v316.getContext("2d");
    f208();
    f200();
    f171();
    f193();
    f173();
    f202();
    f194();
    v316.addEventListener("touchstart", f221);
    v316.addEventListener("touchmove", f222);
    v316.addEventListener("touchend", f223);
    v316.addEventListener("touchcancel", f223);
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
      // TOLOOK
      setTimeout(f216, 500);
    }, false);
    window.addEventListener("resize", function () {
      // TOLOOK
      setTimeout(function () {
        v316.width = vI_sxfci_19.clientWidth;
        v316.height = vI_sxfci_19.clientHeight;
        f219();
      }, 500);
    }, false);
    f216();
  }
}
function f218() {
  f200();
  f171();
  f193();
  f219();
}
function f219() {
  v317.clearRect(0, 0, v316.width, v316.height);
  f173();
  f202();
  f194();
  if (v309 != null) {
    v317.beginPath();
    v317.rect(v309.X, v309.Y, v309.Obj.width, v309.Obj.height);
    v317.strokeStyle = "rgba(249, 211, 66,1.0)";
    v317.lineWidth = 3;
    v317.shadowOffsetX = 0;
    v317.shadowOffsetY = 0;
    v317.shadowBlur = 2;
    v317.shadowColor = "rgba(0,0,0,1.0)";
    v317.stroke();
  } else {
    v317.shadowBlur = 0;
  }
}
function f220(p241, p242) {
  if (v318) {
    var vP242 = p242;
    var v321 = v316.height - p241;
  } else {
    vP242 = p241;
    v321 = p242;
  }
  return {
    pn: Math.floor(vP242),
    mn: Math.floor(v321)
  };
}
function f221(p243) {
  if (!v425) {
    f356();
  }
  if (v375) {
    f282();
  }
  if (v307) {
    f224(p243);
  } else {
    for (var vLN075 = 0; vLN075 < p243.changedTouches.length; vLN075 += 1) {
      var v322 = p243.changedTouches[vLN075];
      var vF220 = f220(v322.clientX, v322.clientY);
      var v323 = vF220.pn;
      var v324 = vF220.mn;
      vO25[v322.identifier] = f174(v323, v324, null);
      if (vO25[v322.identifier] != null) {
        vO26[v322.identifier] = "abc";
      }
      if (vO25[v322.identifier] == null) {
        vO25[v322.identifier] = f196(v323, v324, false);
        if (vO25[v322.identifier] != null) {
          vO26[v322.identifier] = "dir";
        }
      }
      if (vO25[v322.identifier] == null) {
        vO25[v322.identifier] = f203(v323, v324);
      }
      if (vO25[v322.identifier] == null) {
        vO25[v322.identifier] = f195(v323, v324);
        if (vO25[v322.identifier] != null) {
          vO26[v322.identifier] = "dir";
        }
      }
    }
    p243.preventDefault();
  }
}
function f222(p244) {
  if (v307) {
    f225(p244);
  } else {
    for (var vLN076 = 0; vLN076 < p244.changedTouches.length; vLN076 += 1) {
      var v325 = p244.changedTouches[vLN076];
      var vF2202 = f220(v325.clientX, v325.clientY);
      var v326 = vF2202.pn;
      var v327 = vF2202.mn;
      if (vO26[v325.identifier] === "dir") {
        f196(v326, v327, true);
      } else {
        vO26[v325.identifier];
        vO25[v325.identifier] = f174(v326, v327, vO25[v325.identifier]);
      }
    }
  }
}
function f223(p245) {
  if (v307) {
    f226(p245);
  } else {
    for (var vLN077 = 0; vLN077 < p245.changedTouches.length; vLN077 += 1) {
      var v328 = p245.changedTouches[vLN077];
      if (vO25[v328.identifier] != null && vO25[v328.identifier] != null) {
        vO25[v328.identifier]();
        vO25[v328.identifier] = null;
        vO26[v328.identifier] = null;
      }
    }
    p245.preventDefault();
  }
}
function f224(p246) {
  for (var vLN078 = 0; vLN078 < p246.changedTouches.length; vLN078 += 1) {
    var v329 = p246.changedTouches[vLN078];
    var vF2203 = f220(v329.clientX, v329.clientY);
    var vF211 = f211(vF2203.pn, vF2203.mn);
    if (vF211 != null) {
      vO27[v329.identifier] = vF211;
      v309 = vF211;
      v317.beginPath();
      v317.rect(vF211.X, vF211.Y, vF211.Obj.width, vF211.Obj.height);
      v317.strokeStyle = "rgba(249, 211, 66,1.0)";
      v317.lineWidth = 3;
      v317.shadowOffsetX = 0;
      v317.shadowOffsetY = 0;
      v317.shadowBlur = 2;
      v317.shadowColor = "rgba(0,0,0,1.0)";
      v317.stroke();
      f219();
    }
  }
  p246.preventDefault();
}
function f225(p247) {
  for (var vLN079 = 0; vLN079 < p247.changedTouches.length; vLN079 += 1) {
    var v330 = p247.changedTouches[vLN079];
    var vF2204 = f220(v330.clientX, v330.clientY);
    var v331 = vF2204.pn;
    var v332 = vF2204.mn;
    var v333 = vO27[v330.identifier];
    if (v333 != null && v333 != null) {
      var v334 = Math.floor(v331 - v333.Obj.width / 2);
      var v335 = Math.floor(v332 - v333.Obj.height / 2);
      if (!f212(v334, v335, v333)) {
        if (f212(v333.X, v335, v333)) {
          v334 = v333.X;
        } else {
          if (!f212(v334, v333.Y, v333)) {
            continue;
          }
          v335 = v333.Y;
        }
      }
      v333.X = v334;
      v333.Y = v335;
      if (v333.X < 0) {
        v333.X = 0;
      }
      if (v333.Y < 0) {
        v333.Y = 0;
      }
      if (v333.X + v333.Obj.width > v316.width) {
        v333.X = v316.width - v333.Obj.width;
      }
      if (v333.Y + v333.Obj.height > v316.height) {
        v333.Y = v316.height - v333.Obj.height;
      }
      f219();
      v317.beginPath();
      v317.rect(v333.X, v333.Y, v333.Obj.width, v333.Obj.height);
      v317.strokeStyle = "rgba(249, 211, 66,1.0)";
      v317.lineWidth = 3;
      v317.shadowOffsetX = 0;
      v317.shadowOffsetY = 0;
      v317.shadowBlur = 2;
      v317.shadowColor = "rgba(0,0,0,1.0)";
      v317.stroke();
    }
  }
  p247.preventDefault();
}
function f226(p248) {
  for (var vLN080 = 0; vLN080 < p248.changedTouches.length; vLN080 += 1) {
    var v336 = p248.changedTouches[vLN080];
    vO27[v336.identifier] = null;
  }
  f219();
  p248.preventDefault();
}
function f227(p249, p250, p251, p252, p253, p254) {
  return p251 <= p249 && p249 <= p251 + p253 && p252 <= p250 && p250 <= p252 + p254;
}
function f228(p255, p256, p257, p258, p259, p260, p261, p262) {
  return !(p260 + p262 < p256) && !(p256 + p258 < p260) && !(p259 + p261 < p255) && !(p255 + p257 < p259);
}
var v337 = -1;
function f229(p263) {
  document.getElementsByName("keybind").forEach(function (p264) {
    if (vO32.PCSet[f363(p264)] == p263) {
      vO32.PCSet[f363(p264)] = "NO";
      f231(p264);
    }
  });
}
function f230(p265) {
  document.getElementsByName("keybind").forEach(function (p266) {
    if (f363(p266) != "KeyJoy" && f363(p266) != "KeyUp" && f363(p266) != "KeyDown" && f363(p266) != "KeyLeft" && f363(p266) != "KeyRight" && vO32.GPSetx[f363(p266)] == p265) {
      vO32.GPSetx[f363(p266)] = -1;
      f231(p266);
    }
  });
}
function f231(p267) {
  if (v337 == -1) {
    if ((v338 = (v338 = (v338 = vO32.PCSet[f363(p267)].replace("Key", "")).replace("Digit", "")).replace("Numpad", "")) == "NO") {
      v338 = "空";
    }
    p267.childNodes[1].innerText = v338;
  } else {
    var v338 = vO32.GPSetx[f363(p267)];
    p267.childNodes[1].innerText = v338;
  }
}
var v339 = null;
var v340 = null;
function f232(p268) {
  var vO28 = {
    buttons: []
  };
  var vF137 = f137();
  for (var v341 in vF137.buttons) {
    vO28.buttons[v341] = vF137.buttons[v341].pressed;
  }
  vO28.axes = vF137.axes;
  v339 = // TOLOOK
  setTimeout(function f233() {
    if (f362("SetUp").style.display != "none") {
      if (v340 == p268) {
        for (var vF1372 = f137(), vLN081 = 0; vLN081 < vF1372.buttons.length; vLN081++) {
          if (vF1372.buttons[vLN081].pressed && vO28.buttons[vLN081] == 0) {
            f230(vLN081);
            vO32.GPSetx[f363(p268)] = vLN081;
            if (f363(p268) == "KeyLeft") {
              vO32.GPSetx.KeyJoy = 0;
            }
            p268.blur();
            f231(p268);
            f235(p268.tabIndex);
            v339 = null;
            return;
          }
        }
        for (vLN081 = 0; vLN081 < vF1372.axes.length; vLN081++) {
          if (Math.abs(vF1372.axes[vLN081]) > 0.5 && vF1372.axes[vLN081] != vO28.axes[vLN081]) {
            if (vLN081 == 9) {
              f89("******************", true);
              f89("识别到POV摇杆，已自动设置好所有方向😁", true);
              p268.blur();
              vO32.GPSetx.KeyJoy = 1;
              vO32.GPSetx.KeyUp = 9;
              vO32.GPSetx.KeyDown = 9;
              vO32.GPSetx.KeyLeft = 9;
              vO32.GPSetx.KeyRight = 9;
              f368("keybind", function (p269) {
                if (f363(p269) == "KeyUp" || f363(p269) == "KeyDown" || f363(p269) == "KeyLeft" || f363(p269) == "KeyRight") {
                  f231(p269);
                }
                if (f363(p269) == "KeyCoin") {
                  // TOLOOK
                  setTimeout(function () {
                    p269.focus();
                  }, 200);
                }
              });
            } else {
              vO32.GPSetx.KeyJoy = 1;
              vO32.GPSetx[f363(p268)] = vLN081;
              p268.blur();
              f231(p268);
              // TOLOOK
              setTimeout(function () {
                f235(p268.tabIndex);
              }, 200);
            }
            v339 = null;
            return;
          }
        }
        v339 = // TOLOOK
        setTimeout(f233, 20);
      } else {
        p268.blur();
      }
    } else {
      p268.blur();
    }
  }, 20);
}
function f234() {
  f368("keybind", function (p270) {
    f231(p270);
  });
  f362("cb_allrever").checked = vO32.GPSetx.gKeyRev;
  f362("cb_lrrever").checked = vO32.GPSetx.gKeyRevLR;
}
function f235(p271) {
  f368("keybind", function (p272) {
    if (p272.tabIndex == p271 + 1) {
      p272.focus();
      true;
    }
  });
}
function f236() {
  f365("btn_kbindreset", function () {
    if (v337 == -1) {
      vO32.PCSet = JSON.parse(JSON.stringify(vO33));
    } else {
      vO32.GPSetx = JSON.parse(JSON.stringify(vO34));
    }
    f234();
  });
  f369("keybind", "focus", function (p273) {
    this.classList.add("_state_conduct");
    if (v337 >= 0) {
      f232(v340 = this);
    }
  });
  f369("keybind", "blur", function (p274) {
    this.classList.remove("_state_conduct");
  });
  f369("keybind", "keydown", function (p275) {
    if (p275.key != "Tab") {
      f229(p275.code);
      if (p275.code == "Backspace") {
        vO32.PCSet[f363(this)] = "NO";
      } else {
        vO32.PCSet[f363(this)] = p275.code;
      }
      f231(this);
      this.blur();
      p275.preventDefault();
      f235(this.tabIndex);
    } else {
      this.blur();
    }
  });
  f366("cb_allrever", "change", function () {
    vO32.GPSetx.gKeyRev = this.checked;
  });
  f366("cb_lrrever", "change", function () {
    vO32.GPSetx.gKeyRevLR = this.checked;
  });
  f234();
  f238();
}
function f237() {
  var vI_sxfci_20 = f362("selectOptionBox");
  var vI_sxfci_21 = f362("optionDown");
  document.getElementById("selectTip").innerHTML = event.target.innerHTML;
  vI_sxfci_20.style.display = "none";
  vI_sxfci_21.classList.add("optionDown");
  vI_sxfci_21.classList.remove("optionDownRev");
  v337 = f363(event.target);
  f234();
  v209 = parseInt(f363(event.target));
  if (v337 == -1) {
    f362("cbg_gamepadrev").style.display = "none";
  } else {
    f362("cbg_gamepadrev").style.display = "block";
    f362("cb_allrever").checked = vO32.GPSetx.gKeyRev;
    f362("cb_lrrever").checked = vO32.GPSetx.gKeyRevLR;
    localStorage.setItem("lastgamepad", v_allGamePadName[v337].id);
  }
}
function f238() {
  f367("inputdevicename", f237);
}
function f239(p276) {
  f362("selectOptionBox").innerHTML = "<div class=\"selectOption\" name=\"inputdevicename\" key=\"-1\">默认键盘</div>";
  var vLN083 = 0;
  v209 = -1;
  v_allGamePadName = {};
  var v342 = localStorage.getItem("lastgamepad");
  for (var vLN084 = 0; vLN084 < p276.length; vLN084++) {
    if (p276[vLN084] != null) {
      true;
      var v343 = document.createElement("div");
      v343.className = "selectOption";
      v343.setAttribute("name", "inputdevicename");
      v343.setAttribute("key", vLN084);
      v343.innerHTML = p276[vLN084].id.substr(0, p276[vLN084].id.indexOf("(Ven"));
      if (v343.innerHTML == "") {
        v343.innerHTML = p276[vLN084].id.substr(0, p276[vLN084].id.indexOf("("));
      }
      if (v343.innerHTML == "") {
        v343.innerHTML = p276[vLN084].id;
      }
      f362("selectOptionBox").appendChild(v343);
      vLN083++;
      if (v209 == -1 || v342 == p276[vLN084].id) {
        v209 = vLN084;
      }
      v_allGamePadName[vLN084] = {};
      v_allGamePadName[vLN084].id = p276[vLN084].id;
      v_allGamePadName[vLN084].num = vLN084;
    }
  }
  // TOLOOK
  setTimeout(f238, 100);
  return vLN083;
}
function f240(p277) {
  var vI_sxfci_22 = f362("roomOwnerFlag");
  var vI_sxfci_23 = f362("Broomownerflag");
  if (p277 == 0) {
    vI_sxfci_22.style.left = "128px";
    vI_sxfci_22.style.top = "22px";
    vI_sxfci_23.style.top = "48px";
  } else if (p277 == 1) {
    vI_sxfci_22.style.left = "128px";
    vI_sxfci_22.style.top = "42px";
    vI_sxfci_23.style.top = "118px";
  } else if (p277 == 2) {
    vI_sxfci_22.style.left = "128px";
    vI_sxfci_22.style.top = "62px";
    vI_sxfci_23.style.top = "188px";
  } else if (p277 == 3) {
    vI_sxfci_22.style.left = "128px";
    vI_sxfci_22.style.top = "82px";
    vI_sxfci_23.style.top = "258px";
  }
}
function f241(p278) {
  if (p278 != null) {
    v145 = p278;
    v_gui_pclink_updatetime = performance.now();
    f362("p1img").src = p278.Img1;
    f362("p2img").src = p278.Img2;
    f362("p3img").src = p278.Img3;
    f362("p4img").src = p278.Img4;
    f362("p1nick").innerText = p278.Nick1;
    f362("p2nick").innerText = p278.Nick2;
    f362("p3nick").innerText = p278.Nick3;
    f362("p4nick").innerText = p278.Nick4;
    f362("Bp1nick").innerText = p278.Nick1;
    f362("Bp2nick").innerText = p278.Nick2;
    f362("Bp3nick").innerText = p278.Nick3;
    f362("Bp4nick").innerText = p278.Nick4;
    f362("Bp1img").src = p278.Img1;
    f362("Bp2img").src = p278.Img2;
    f362("Bp3img").src = p278.Img3;
    f362("Bp4img").src = p278.Img4;
    if (p278.Nick1.indexOf("关闭") > 0) {
      f362("p1img").src = "./img/close.png";
      f362("Bp1img").src = "./img/close.png";
    }
    if (p278.Nick2.indexOf("关闭") > 0) {
      f362("p2img").src = "./img/close.png";
      f362("Bp2img").src = "./img/close.png";
    }
    if (p278.Nick3.indexOf("关闭") > 0) {
      f362("p3img").src = "./img/close.png";
      f362("Bp3img").src = "./img/close.png";
    }
    if (p278.Nick4.indexOf("关闭") > 0) {
      f362("p4img").src = "./img/close.png";
      f362("Bp4img").src = "./img/close.png";
    }
    if (p278.Mob1) {
      f362("p1dev").classList.remove("igwi-diannao-copy");
      f362("p1dev").classList.add("igwi-shouji");
    } else {
      f362("p1dev").classList.add("igwi-diannao-copy");
      f362("p1dev").classList.remove("igwi-shouji");
    }
    if (p278.Mob2) {
      f362("p2dev").classList.remove("igwi-diannao-copy");
      f362("p2dev").classList.add("igwi-shouji");
    } else {
      f362("p2dev").classList.add("igwi-diannao-copy");
      f362("p2dev").classList.remove("igwi-shouji");
    }
    if (p278.Mob3) {
      f362("p3dev").classList.remove("igwi-diannao-copy");
      f362("p3dev").classList.add("igwi-shouji");
    } else {
      f362("p3dev").classList.add("igwi-diannao-copy");
      f362("p3dev").classList.remove("igwi-shouji");
    }
    if (p278.Mob4) {
      f362("p4dev").classList.remove("igwi-diannao-copy");
      f362("p4dev").classList.add("igwi-shouji");
    } else {
      f362("p4dev").classList.add("igwi-diannao-copy");
      f362("p4dev").classList.remove("igwi-shouji");
    }
    f240(p278.boss);
    f362("lookcount").innerText = p278.looker;
    f362("watchplayer").innerText = "(" + p278.looker + ")";
    var vI_sxfci_24 = f362("lookerlist");
    vI_sxfci_24.innerHTML = "";
    for (var v344 in p278.LookerNick) {
      var v345 = document.createElement("div");
      v345.setAttribute("key", p278.LookerList[v344]);
      v345.innerHTML = "<div>" + p278.LookerNick[v344] + "</div><div></div>";
      v345.className = "lookout";
      vI_sxfci_24.appendChild(v345);
    }
    v_gui_ismatch_allow = false;
  }
}
function f242() {
  if (vLS12.indexOf("请出房间") > 0) {
    f362("popwin_kicktips").style.display = "block";
  } else {
    f252("联机已掉线，本场已变为单机模式，请重新连接");
  }
}
function f243(p279) {
  var vI_sxfci_25 = f362("suspendTxt");
  var vI_sxfci_26 = f362("suspendIcon");
  switch (p279) {
    case "stop":
      vI_sxfci_26.style.color = "#ff0000";
      vI_sxfci_26.classList.replace("igwi-zanting", "igwi-kaishi");
      vI_sxfci_25.innerText = "继续";
      break;
    case "continue":
      vI_sxfci_26.style.color = "";
      vI_sxfci_26.classList.replace("igwi-kaishi", "igwi-zanting");
      vI_sxfci_25.innerText = "暂停";
  }
}
function f244() {}
function f245(p280) {
  f362("loadpostxt").innerText = "(" + p280.toFixed(0) + "%)";
  f362("loadingpos").style.width = p280.toFixed(0) + "%";
  if (p280 >= 100) {
    f362("loadingbox").style.display = "none";
    f362("gamescr").style.display = "block";
    f35();
  }
}
var vLSdivClasstalkRandomdi = "<div class=\"talkRandom\">\n        <div class=\"talkedName\">\n          {{nick}}：          <span>{{text}}</span>\n        </div>\n      </div>";
var vLSdivClasstalkRandomdi2 = "<div class=\"talkRandom\">\n        <div class=\"talkedName\">\n          {{nick}}：          <span style='color: #01ff5b'>{{text}}</span>\n        </div>\n      </div>";
var vLSdivClasstalkRandomdi3 = "<div class=\"talkRandom\">\n        <div class=\"talkedName\">\n          {{nick}}：          <span style='color: #ff2800'>{{text}}</span>\n        </div>\n      </div>";
var vLSdivClasstalkingdivCl = "  <div class=\"talking\">\n                            <div class=\"talkingTop\">\n                                <div class=\"yellowStick\"></div>\n                                <div class=\"talkingName\">{{nick}}</div>\n                                <div class=\"talkingTime\">{{time}}</div>\n                            </div>\n                            <div class=\"talkingWords\">{{text}}</div>\n                        </div>";
var vLSdivClasstalkingdivCl2 = "<div class=\"talking\">\n                            <div class=\"talkingTop\">\n                                <div class=\"yellowStick\"></div>\n                                <div class=\"watchingIcon\">观战</div>\n                                <div class=\"talkingName\">{{nick}}</div>\n                                <div class=\"talkingTime\">{{time}}</div>\n                            </div>\n                            <div class=\"talkingWords\">{{text}}</div>\n                        </div>";
var vLSdivClasstalkingdivCl3 = "<div class=\"talking \">\n                            <div class=\"talkingTop myTalk\">\n                                <div class=\"talkingTime\">{{time}}</div>\n                                <div class=\"talkingName\">{{nick}}</div>\n                                <div class=\"yellowStick\"></div>\n                            </div>\n                            <div class=\"myWordsBox\">\n                                <div class=\"talkingWords myWords\">{{text}}</div>\n                            </div>\n                        </div>";
var v346 = null;
var v347 = null;
var vLS12 = "";
function f246() {
  if (v346 == null) {
    v346 = f362("chatInGame");
    f366("messageinput", "keydown", function (p281) {
      if (p281.key == "Enter") {
        f256();
      }
    });
    f366("messageinput", "focus", function (p282) {});
    f366("messageinput", "blur", function (p283) {});
  }
  if (v347 == null) {
    v347 = f362("roommsglist");
  }
  f89 = f251;
  f87 = f88 = f250;
}
var vLN086 = 0;
function f247() {
  vLN086 = performance.now() + 4900;
  v346.style.display = "block";
  // TOLOOK
  setTimeout(function () {
    if (performance.now() > vLN086) {
      v346.style.display = "none";
      v346.innerHTML = "";
    }
  }, 5000);
}
function f248(p284) {
  if (p284.scrollTop + p284.clientHeight + 100 > p284.scrollHeight) {
    p284.scrollTo(0, p284.scrollHeight);
  }
}
function f249(p285) {
  v346.appendChild(p285);
  if (v346.children.length > 3) {
    v346.removeChild(v346.childNodes[0]);
  }
  f247();
}
function f250(p286) {
  if (v346 == null) {
    f246();
  }
  var v348 = document.createElement("div");
  v348.innerHTML = vLSdivClasstalkRandomdi.replace("{{text}}", p286).replace("{{nick}}", "系统消息");
  vLS12 = p286;
  f249(v348);
}
function f251(p287) {
  if (v346 == null) {
    f246();
  }
  var v349 = document.createElement("div");
  v349.innerHTML = vLSdivClasstalkRandomdi2.replace("{{text}}", p287).replace("{{nick}}", "系统消息");
  f249(v349);
}
function f252(p288) {
  if (v346 == null) {
    f246();
  }
  var v350 = document.createElement("div");
  v350.innerHTML = vLSdivClasstalkRandomdi3.replace("{{text}}", p288).replace("{{nick}}", "系统消息");
  f249(v350);
}
function f253(p289, p290) {
  var v351 = document.createElement("div");
  v351.innerHTML = vLSdivClasstalkingdivCl3.replace("{{text}}", p290).replace("{{nick}}", p289).replace("{{time}}", new Date().toLocaleTimeString());
  v347.appendChild(v351);
  f248(v347);
}
function f254(p291, p292) {
  var v352 = document.createElement("div");
  v352.innerHTML = vLSdivClasstalkingdivCl2.replace("{{text}}", p292).replace("{{nick}}", p291).replace("{{time}}", new Date().toLocaleTimeString());
  v347.appendChild(v352);
  if (v347.children.length > 99) {
    v347.removeChild(v347.childNodes[0]);
  }
  f248(v347);
}
function f255(p293, p294, p295, p296) {
  if (v346 == null) {
    f246();
  }
  var v353 = document.createElement("div");
  v353.innerHTML = vLSdivClasstalkRandomdi.replace("{{text}}", p294).replace("{{nick}}", p293);
  vLS12 = p294;
  f249(v353);
  if (p296 != 2) {
    if (p293 != v442.NickName) {
      var v354 = document.createElement("div");
      v354.innerHTML = vLSdivClasstalkingdivCl.replace("{{text}}", p294).replace("{{nick}}", p293).replace("{{time}}", new Date().toLocaleTimeString());
      v347.appendChild(v354);
      if (v347.children.length > 99) {
        v347.removeChild(v347.childNodes[0]);
      }
      f248(v347);
    } else {
      f253(p293, p294);
    }
  } else {
    f254(p293, p294);
  }
}
function f256() {
  var vF125 = f125(f362("messageinput").value);
  if (vF125 != "") {
    f362("messageinput").value = "";
    f253(vF125);
  } else if (vLN014 == 0) {
    f362("messageinput").value = "";
    f253("我", "单人玩呢，发啥消息啊😢");
  } else {
    var v355 = f362("messageinput").value;
    if (v355 != "") {
      f150("message", v355);
    }
    f362("messageinput").value = "";
  }
  f362("messageinput").blur();
}
var v356 = null;
function f257() {
  f351(80);
}
function f258() {
  if (!v356) {
    v356 = true;
    f283();
    f365("btn_voice", function () {
      var v357 = document.getElementById("voiceBox");
      f357();
      v357.style.color = v417 ? (v357.classList.add("igwi-yinliang"), v357.classList.remove("igwi-jingyin1"), "") : (v357.classList.add("igwi-jingyin1"), v357.classList.remove("igwi-yinliang"), "#ff0000");
    });
    f365("btn_reset", function () {
      f16();
    });
    f365("btn_pause", function () {
      f17();
    });
    f365("btn_help", function () {});
    f365("btn_record", function () {
      f18();
    });
    f365("btn_cheat", function () {
      if (vLN014 == 1) {
        f251("联机模式暂不支持金手指");
      } else if (v442.LevelInfo.VipLevel > 0 || v442.LevelInfo.Svip > 0) {
        f371("popwin_gamecheat", "block");
      } else {
        f251("金手指只对会员和黑暗骑士开放,谢谢支持");
        vO15.ze();
      }
    });
    f365("cheatclose", function () {
      f362("popwin_gamecheat").style.display = "none";
    });
    f365("btn_fullscreen", function (p297) {
      if (v67) {
        f250("iPhone请使用添加到桌面实现全屏App");
      } else if (document.body.requestFullscreen != null) {
        if (document.fullscreenElement == null) {
          document.body.requestFullscreen();
          this.style.color = "#6bff00";
          vO15.Pe(3);
        } else {
          document.exitFullscreen();
          vO15.Pe(4);
          this.style.color = "";
        }
      }
    });
    f365("btn_savemgr", function () {
      f371("popwin_save", "block");
    });
    f365("btn_closeroomcard", function () {
      f371("popwin_room", "block");
    });
    f365("inputlayout", function () {
      if (f371("layoutconfig", "flex")) {
        if (v375) {
          f282();
        }
        if (v376) {
          f281();
        }
        f210();
      }
    });
    f365("btn_kickapply", function () {
      vO15.ue("control", "close", "");
    });
    f278();
    f267();
  }
}
function f259(p298) {
  f362("gamename").innerText = v57 != null ? (alert("使用了SAB"), "" + p298) : p298;
}
function f260() {
  f365("btn_cancellayout", function () {
    f371("layoutconfig", "flex");
    f213();
  });
  f365("btn_resetlayout", function () {
    vO32.Mobset = JSON.parse(JSON.stringify(vO36));
    f335();
    f251("已重置所有按键位置");
  });
  f365("btn_allhide", function () {
    if (vO32.MobBase.AllHide) {
      this.style.background = "";
      vO32.MobBase.AllHide = false;
      this.childNodes[1].innerText = "全部隐藏";
    } else {
      this.style.background = "#0478D2";
      vO32.MobBase.AllHide = true;
      this.childNodes[1].innerText = "已隐藏";
    }
    f335();
  });
  f365("btn_savelayout", function () {
    f371("layoutconfig", "flex");
    f213();
    f336();
  });
  var v358 = performance.now();
  var v359 = performance.now();
  var vI_sxfci_27 = f362("layout_size");
  var vI_sxfci_28 = f362("layout_transparent");
  f366("layout_size_area", "touchmove", function (p299) {
    var vF2205 = f220(p299.changedTouches[0].clientX, p299.changedTouches[0].clientY);
    var v360 = vI_sxfci_27.getClientRects();
    var vF2206 = f220(v360[0].x, v360[0].y);
    var v361 = vF2205.pn;
    vI_sxfci_27.value = (v361 - vF2206.pn) / 1.3;
    if (v358 + 100 < performance.now()) {
      v358 = performance.now();
      vI_sxfci_27.style.backgroundSize = vI_sxfci_27.value + "% 100%";
      f362("layoutsizetxt").innerText = (50 + vI_sxfci_27.value * 150 / 100).toFixed(0) + "%";
      f214((50 + vI_sxfci_27.value * 150 / 100) / 100);
    }
    p299.preventDefault();
  });
  f366("layout_size", "change", function (p300) {
    this.style.backgroundSize = this.value + "% 100%";
    f362("layoutsizetxt").innerText = (50 + this.value * 150 / 100).toFixed(0) + "%";
    f214((50 + this.value * 150 / 100) / 100);
  });
  f366("layout_transparent_area", "touchmove", function (p301) {
    var vF2207 = f220(p301.changedTouches[0].clientX, p301.changedTouches[0].clientY);
    var v362 = vI_sxfci_28.getClientRects();
    var vF2208 = f220(v362[0].x, v362[0].y);
    var v363 = vF2207.pn;
    vI_sxfci_28.value = (v363 - vF2208.pn) / 1.3;
    if (v359 + 100 < performance.now()) {
      v359 = performance.now();
      vI_sxfci_28.style.backgroundSize = vI_sxfci_28.value + "% 100%";
      f362("layoutopttxt").innerText = vI_sxfci_28.value + "%";
      f215(vI_sxfci_28.value / 100);
    }
    p301.preventDefault();
  });
  f366("layout_transparent", "change", function (p302) {
    this.style.backgroundSize = this.value + "% 100%";
    f362("layoutopttxt").innerText = this.value + "%";
    f215(this.value / 100);
  });
}
function f261() {
  f362("p1nick").innerText = v442.NickName;
  f362("p1img").src = v442.HeadImg;
  f362("Bp1nick").innerText = v442.NickName;
  f362("Bp1img").src = v442.HeadImg;
}
function f262() {
  f362("btn_tolook").style.display = "none";
}
function f263() {
  if (vLN014 == 1) {
    f362("roominfo").innerText = "房间: " + vLN015;
  }
  v165 = f362("timespan");
  if (v57 != null) {
    f362("gamename").innerText = "⚡ " + vLS2;
  }
  if (vLN014 == 0) {
    f362("sharetiptxt").innerText = "单机双人";
    f365("btn_sharegame", function () {
      if (v209 == -1) {
        f250("请插入手柄后，以2P玩家游戏");
      } else {
        if ((v188 = navigator.getGamepads()[v209]) == null) {
          f250("请插入手柄后，以2P玩家游戏");
          return;
        }
        var v364 = v188.id.substr(0, v188.id.indexOf("(Ven"));
        if (v364 == "") {
          v364 = v188.id.substr(0, v188.id.indexOf("("));
        }
        if (v364 == "") {
          v364 = v188.id;
        }
        if (++vLN039 == 3) {
          vLN039 = 0;
        }
        switch (vLN039) {
          case 0:
            f251("恢复单机单人模式");
            break;
          case 1:
            f251("进入【1P 触屏】 ，【2P 手柄摇杆】多人模式");
            break;
          case 2:
            f251("进入【1P 手柄摇杆】 ，【2P 手柄摇杆】多人模式");
        }
      }
    });
  }
  f257();
  f258();
  f246();
  f271();
  f244();
  f260();
}
var v365 = null;
var vLN18 = 1;
function f264(p303, p304) {
  var vP303 = p303;
  vLN14 = p304;
  if (vLN014 == 0) {
    f362("p" + vP303 + "img").src = "https://static.wo1wan.com/game/close.png";
    f362("p" + vP303 + "nick").innerText = "空";
    f362("p" + vLN18 + "img").src = v442.HeadImg;
    f362("p" + vLN18 + "nick").innerText = v442.NickName;
    f324(vLN18);
    f240(vLN067 = vLN18 - 1);
  } else {
    if (v227) {
      if (f362("p" + vLN18 + "nick").innerText == "点击上位") {
        f150("join", vLN18 + "");
      }
      return;
    }
    if (f362("p" + vLN18 + "nick").innerText != "等待连接") {
      return;
    }
    v246 = true;
    v236[0] = vLN065;
    v236[1] = 0;
    f160();
    // TOLOOK
    setTimeout(function () {
      f150("switch", vLN18 + "");
    }, 200);
  }
}
function f265(p305) {
  f362("pop_usercardmenu").style.display = "none";
  var v366 = v145.UUID[vLN18 - 1];
  switch (this.id) {
    case "plmenu_switch":
      f264(0, vLN18);
      break;
    case "plmenu_open":
      f150("open", vLN18 + "");
      break;
    case "plmenu_close":
      f150("close", vLN18 + "");
      break;
    case "plmenu_kick":
      if (vLS2.indexOf("拳皇") >= 0 && v_gui_pclink_updatetime + 30000 < performance.now()) {
        f89("拳皇格斗进人30秒后不可踢人，请友好对战<br>");
        break;
      }
      f150("kick", vLN18 - 1 + "");
      break;
    case "plmenu_ban":
      if (f155()) {
        $.post("/sayban", {
          who: v366,
          where: "jjin_" + vLN012 + "_" + vLN015,
          say: ""
        }, function (p306) {
          if (p306.status == "ok") {
            f150("message", v145["Nick" + vLN18] + " 被房主在本房间禁言一小时");
          } else {
            f87("禁言失败");
          }
        });
      } else {
        f87("只有房主可禁言");
      }
      break;
    case "plmenu_addfriend":
      f326(-1, v366, function (p307) {
        if (vO15.ue("friend", "add", p307.Uid)) {
          f251("好友请求发送成功，对方会在大厅收到消息");
        } else {
          f250("游戏大厅无法找到，请从大厅开始游戏");
        }
      });
      break;
    case "plmenu_report":
      f251("畅玩大叔正在测，马上开放");
      break;
    case "plmenu_give":
      if (f155()) {
        f150("transferroom", vLN18 - 1 + "");
      }
  }
}
function f266(p308, p309) {
  if (vLN014 != 0) {
    if (v365 == null) {
      v365 = f362("pop_usercardmenu");
    }
    if ((vLN18 = p308) - 1 != vLN065) {
      if (v227) {
        if (v245["Nick" + vLN18] == "点击上位") {
          window.location.replace(window.location.origin + window.location.pathname + "?&id=" + vLN012 + "&mode=1&sev=" + vLN017 + "&linkid=" + vLN015);
        }
      } else {
        var vI_sxfci_29 = f362("usermenuList");
        var vF2209 = f220(p309.clientX, p309.clientY);
        if (vF2209.mn + 120 > v316.height) {
          vF2209.mn = v316.height - 120;
        }
        vI_sxfci_29.style.left = vF2209.pn + "px";
        vI_sxfci_29.style.top = vF2209.mn + "px";
        v365.style.display = "block";
        $("[name=plmenuitem]").hide();
        if (v245["Nick" + vLN18] == "等待连接") {
          f362("plmenu_switch").style.display = "block";
          f362("plmenu_close").style.display = "block";
        } else if (v245["Nick" + vLN18] == "*关闭*") {
          f362("plmenu_switch").style.display = "block";
          f362("plmenu_open").style.display = "block";
        } else {
          if (f155()) {
            f362("plmenu_kick").style.display = "block";
            f362("plmenu_ban").style.display = "block";
            f362("plmenu_give").style.display = "block";
          }
          f362("plmenu_addfriend").style.display = "block";
        }
      }
    }
  } else {
    f264(vLN18, vLN18 = p308);
  }
}
function f267() {
  f365("btn_showquickmsg", function () {
    f371("quickBox", "block");
  });
  f367("quickMessage", function (p310) {
    f371("quickBox", "block");
    if (vLN014 == 0) {
      f250("单人玩呢，发啥消息啊😢");
    } else {
      f150("message", this.innerText);
    }
  });
  f365("tab_roomchat", function () {
    f362("chatpanel").style.display = "block";
    f362("watchpanel").style.display = "none";
    f362("tab_roomchat").classList.add("switchChatAndWatch");
    f362("tab_roomwatch").classList.remove("switchChatAndWatch");
  });
  f365("tab_roomwatch", function () {
    f362("chatpanel").style.display = "none";
    f362("watchpanel").style.display = "block";
    f362("tab_roomchat").classList.remove("switchChatAndWatch");
    f362("tab_roomwatch").classList.add("switchChatAndWatch");
  });
  f365("p1card", function (p311) {
    f266(1, p311);
  });
  f365("p2card", function (p312) {
    f266(2, p312);
  });
  f365("p3card", function (p313) {
    f266(3, p313);
  });
  f365("p4card", function (p314) {
    f266(4, p314);
  });
  f367("plmenuitem", f265);
  f365("menuOverlay", function () {
    f362("pop_usercardmenu").style.display = "none";
  });
  f365("btn_tolook", function () {
    window.location.replace(window.location.origin + window.location.pathname + "?&look=1&id=" + vLN012 + "&mode=1&sev=" + vLN017 + "&linkid=" + vLN015);
  });
}
var vLN087 = 0;
function f268(p315, p316) {
  vLN087 = p315;
  f362("btn_save_write").classList.remove("preservationAct");
  if (p316.innerText != "空" && p316.innerText != "") {
    f362("btn_save_read").classList.remove("PrivateBtn_readact");
  } else {
    f362("btn_save_read").classList.add("PrivateBtn_readact");
  }
}
function f269() {
  if (vLN087 > 6 && v442.LevelInfo.Svip <= 0) {
    f250("<p style='color: #b15dff'>请开通黑暗骑士解锁该云存档位<br>黑暗骑士到期后存档永久存在，可随时续费使用</p>");
    vO15.ze("svip");
    return;
  } else if (vLN087 > 4 && v442.LevelInfo.Svip <= 0 && v442.LevelInfo.Vip <= 0) {
    f250("<p style='color: #b15dff'>请开通会员解锁该云存档位<br>会员到期后存档永久存在，可随时续费使用</p>");
    vO15.ze();
    return;
  } else {
    f317(vLN087);
    return;
  }
}
function f270() {
  if (!(this.className.indexOf("PrivateBtn_readact") >= 0)) {
    f318(vLN087);
  }
}
function f271() {
  f365("btn_save_close", function () {
    f371("popwin_save", "block");
  });
  f365("btn_save_write", f269);
  f365("btn_save_read", f270);
  f365("card_save1", function () {
    f368("savecard", function (p317) {
      p317.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(1, f362("sv1time"));
  });
  f365("card_save2", function () {
    f368("savecard", function (p318) {
      p318.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(2, f362("sv2time"));
  });
  f365("card_save3", function () {
    f368("savecard", function (p319) {
      p319.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(3, f362("sv3time"));
  });
  f365("card_save4", function () {
    f368("savecard", function (p320) {
      p320.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(4, f362("sv4time"));
  });
  f365("card_save5", function () {
    f368("savecard", function (p321) {
      p321.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(5, f362("sv5time"));
  });
  f365("card_save6", function () {
    f368("savecard", function (p322) {
      p322.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(6, f362("sv6time"));
  });
  f365("card_save7", function () {
    f368("savecard", function (p323) {
      p323.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(7, f362("sv7time"));
  });
  f365("card_save8", function () {
    f368("savecard", function (p324) {
      p324.classList.remove("File_ind_act");
    });
    this.classList.add("File_ind_act");
    f268(8, f362("sv8time"));
  });
  var v367 = new XMLHttpRequest();
  v367.open("GET", "/" + vLSFc + "/svload?game=" + vLN012, true);
  v367.responseType = "json";
  v367.onreadystatechange = function () {
    if (v367.readyState == XMLHttpRequest.DONE && v367.status == 200) {
      var v368 = v367.response;
      vO13 = v368;
      f272();
    }
  };
  v367.send();
}
function f272() {
  if (vO13.sv1 == 1) {
    $("#sv1time").html(vO13.st1);
    if (vO14.d1i == null) {
      vO14.d1i = "/" + vLSFc + "/lsvimg?sid=1&game=" + vLN012;
    }
    f362("sv1img").src = vO14.d1i;
  } else {
    $("#sv1time").html("");
    f362("sv1img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.sv2 == 1) {
    $("#sv2time").html(vO13.st2);
    if (vO14.d2i == null) {
      vO14.d2i = "/" + vLSFc + "/lsvimg?sid=2&game=" + vLN012;
    }
    f362("sv2img").src = vO14.d2i;
  } else {
    $("#sv2time").html("");
    f362("sv2img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.sv3 == 1) {
    $("#sv3time").html(vO13.st3);
    if (vO14.d3i == null) {
      vO14.d3i = "/" + vLSFc + "/lsvimg?sid=3&game=" + vLN012;
    }
    f362("sv3img").src = vO14.d3i;
  } else {
    $("#sv3time").html("");
    f362("sv3img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.sv4 == 1) {
    $("#sv4time").html(vO13.st4);
    if (vO14.d4i == null) {
      vO14.d4i = "/" + vLSFc + "/lsvimg?sid=4&game=" + vLN012;
    }
    f362("sv4img").src = vO14.d4i;
  } else {
    $("#sv4time").html("");
    f362("sv4img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.W == 1) {
    $("#sv5time").html(vO13.J);
    if (vO14.Z == null) {
      vO14.Z = "/" + vLSFc + "/lsvimg?sid=5&game=" + vLN012;
    }
    f362("sv5img").src = vO14.Z;
  } else {
    $("#sv5time").html("");
    f362("sv5img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.ee == 1) {
    $("#sv6time").html(vO13.ne);
    if (vO14.te == null) {
      vO14.te = "/" + vLSFc + "/lsvimg?sid=6&game=" + vLN012;
    }
    f362("sv6img").src = vO14.te;
  } else {
    $("#sv6time").html("");
    f362("sv6img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.ae == 1) {
    $("#sv7time").html(vO13.ie);
    if (vO14.oe == null) {
      vO14.oe = "/" + vLSFc + "/lsvimg?sid=7&game=" + vLN012;
    }
    f362("sv7img").src = vO14.oe;
  } else {
    $("#sv7time").html("");
    f362("sv7img").src = "https://static.wo1wan.com/game/empsv.png";
  }
  if (vO13.ce == 1) {
    $("#sv8time").html(vO13.re);
    if (vO14.le == null) {
      vO14.le = "/" + vLSFc + "/lsvimg?sid=8&game=" + vLN012;
    }
    f362("sv8img").src = vO14.le;
  } else {
    $("#sv8time").html("");
    f362("sv8img").src = "https://static.wo1wan.com/game/empsv.png";
  }
}
function f273() {
  var v369 = new XMLHttpRequest();
  v369.open("POST", "/" + vLSFc + "/svupdate?game=" + vLN012, true);
  v369.setRequestHeader("Content-type", "application/json");
  v369.onreadystatechange = function () {
    if (v369.readyState == XMLHttpRequest.DONE) {
      v369.status;
    }
  };
  v369.send(JSON.stringify(vO13));
  f272();
}
function f274() {
  var vI_sxfci_30 = f362("baseWidthTxt");
  var vI_sxfci_31 = f362("baseHeightTxt");
  var vI_sxfci_32 = f362("basicRangeWidth");
  var vI_sxfci_33 = f362("basicRangeHeight");
  vI_sxfci_30.innerText = vI_sxfci_32.value + "%";
  vI_sxfci_32.style.backgroundSize = (vI_sxfci_32.value - 40) / 60 * 100 + "%,100%";
  vI_sxfci_31.innerText = vI_sxfci_33.value + "%";
  vI_sxfci_33.style.backgroundSize = (vI_sxfci_33.value - 30) / 70 * 100 + "%,100%";
  document.body.style.setProperty("--screenwidth", vI_sxfci_32.value + "%");
  if (vO32.MobBase.Lock43) {
    document.body.style.setProperty("--screenheight", f362("whathis").offsetWidth / 4 * 3 + "px");
  } else {
    document.body.style.setProperty("--screenheight", vI_sxfci_33.value + "%");
  }
  document.body.style.setProperty("--sceenleft", (100 - vI_sxfci_32.value) / 2 + "%");
  vO32.MobBase.Width = vI_sxfci_32.value;
  vO32.MobBase.Height = vI_sxfci_33.value;
}
function f275() {
  var vI_sxfci_34 = f362("boostSpeedTxt");
  var vI_sxfci_35 = f362("boostSpeed");
  vI_sxfci_35.style.backgroundSize = vI_sxfci_35.value / 8 * 100 + "%,100%";
  vI_sxfci_34.innerText = " 一秒" + Math.floor(60 / ((9 - parseInt(vI_sxfci_35.value)) * 2)) + "次";
  vO32.gSuperSpeed = parseInt(vI_sxfci_35.value);
  f312(vO32.gSuperSpeed);
}
function f276() {
  f366("cb_vidstyle", "change", function (p325) {
    f332(this.checked);
  });
  f366("sizeset_zone", "touchstart", function () {
    f362("SetUp").style.opacity = "0.7";
  });
  f366("sizeset_zone", "touchend", function () {
    f362("SetUp").style.opacity = "";
  });
  f376("basicRangeWidth", function (p326) {
    if (vO32.MobBase.Lock43) {
      f362("basicRangeHeight").value = p326.value / 4 * 3;
    }
    f274();
  });
  f376("basicRangeHeight", function (p327) {
    f274();
  });
  f376("boostSpeed", function (p328) {
    f275();
  });
  f366("cb_lock43", "change", function (p329) {
    vO32.MobBase.Lock43 = this.checked;
    if (this.checked) {
      f362("basicRangeHeight").disabled = true;
    } else {
      f362("basicRangeHeight").disabled = false;
    }
  });
}
function f277(p330) {
  document.getElementById("cb_xbtnA").checked = vO32["gExtX" + p330 + "Key"] & 1;
  document.getElementById("cb_xbtnB").checked = vO32["gExtX" + p330 + "Key"] & 2;
  document.getElementById("cb_xbtnC").checked = vO32["gExtX" + p330 + "Key"] & 4;
  document.getElementById("cb_xbtnD").checked = vO32["gExtX" + p330 + "Key"] & 8;
  document.getElementById("cb_xbtnE").checked = vO32["gExtX" + p330 + "Key"] & 16;
  document.getElementById("cb_xbtnF").checked = vO32["gExtX" + p330 + "Key"] & 32;
}
function f278() {
  f365("btn_setting", function () {
    f371("SetUp", "block");
    f282();
  });
  f365("setupover", function () {
    f371("SetUp", "block");
    f327();
  });
  f365("setupclose", function () {
    f371("SetUp", "block");
    f327();
  });
  var v370 = document.getElementById("basics");
  var v371 = document.getElementById("peripheral");
  var v372 = document.getElementById("gesturel");
  var v373 = document.getElementById("roomSet");
  f365("basicset", function () {
    v370.style.display = "block";
    v373.style.display = "none";
    v371.style.display = "none";
    v372.style.display = "none";
  });
  f365("inroomset", function () {
    v373.style.display = "block";
    v370.style.display = "none";
    v371.style.display = "none";
    v372.style.display = "none";
  });
  f365("extinputset", function () {
    v371.style.display = "block";
    v373.style.display = "none";
    v370.style.display = "none";
    v372.style.display = "none";
  });
  f365("superkeyset", function () {
    v371.style.display = "none";
    v373.style.display = "none";
    v370.style.display = "none";
    v372.style.display = "block";
  });
  $(".SetUpLeft_tab").click(function () {
    $(this).siblings(".SetUpLeft_tab").removeClass("SetUpLeft_active");
    $(this).addClass("SetUpLeft_active");
  });
  f279();
  f280();
  f276();
}
function f279() {
  var vI_sxfci_36 = f362("selectOptionBox");
  var vI_sxfci_37 = f362("optionDown");
  f365("devchange", function () {
    if (vI_sxfci_37.className === "optionDown") {
      vI_sxfci_36.style.display = "block";
      vI_sxfci_37.classList.add("optionDownRev");
      vI_sxfci_37.classList.remove("optionDown");
    } else {
      vI_sxfci_36.style.display = "none";
      vI_sxfci_37.classList.add("optionDown");
      vI_sxfci_37.classList.remove("optionDownRev");
    }
  });
  f236();
}
var vLSGExtX1 = "gExtX1";
function f280() {
  $("._com_Tab div").click(function () {
    $(this).siblings("._com_Tab div").removeClass("_com_TabAct");
    $(this).siblings("._com_Tab div").addClass("other_com_TabAct");
    $(this).addClass("_com_TabAct");
    $(this).removeClass("other_com_TabAct");
  });
  f367("extkeytab", function (p331) {
    vLSGExtX1 = f363(p331.target);
    f362("cb_xbtnSwitch").checked = vO32[vLSGExtX1];
    f277(vLSGExtX1.replace("gExtX", ""));
  });
  f366("cb_xbtnSwitch", "change", function (p332) {
    vO32[vLSGExtX1] = this.checked;
    f335();
  });
  f369("cb_xbtnList", "change", function () {
    var v374 = vLSGExtX1.replace("gExtX", "");
    switch (this.id) {
      case "cb_xbtnA":
        if (this.checked) {
          vO32["gExtX" + v374 + "Key"] |= 1;
        } else {
          vO32["gExtX" + v374 + "Key"] &= ~1;
        }
        break;
      case "cb_xbtnB":
        if (this.checked) {
          vO32["gExtX" + v374 + "Key"] |= 2;
        } else {
          vO32["gExtX" + v374 + "Key"] &= ~2;
        }
        break;
      case "cb_xbtnC":
        if (this.checked) {
          vO32["gExtX" + v374 + "Key"] |= 4;
        } else {
          vO32["gExtX" + v374 + "Key"] &= ~4;
        }
        break;
      case "cb_xbtnD":
        if (this.checked) {
          vO32["gExtX" + v374 + "Key"] |= 8;
        } else {
          vO32["gExtX" + v374 + "Key"] &= ~8;
        }
        break;
      case "cb_xbtnE":
        if (this.checked) {
          vO32["gExtX" + v374 + "Key"] |= 16;
        } else {
          vO32["gExtX" + v374 + "Key"] &= ~16;
        }
        break;
      case "cb_xbtnF":
        if (this.checked) {
          vO32["gExtX" + v374 + "Key"] |= 32;
        } else {
          vO32["gExtX" + v374 + "Key"] &= ~32;
        }
    }
  });
}
var v375 = false;
var v376 = true;
function f281() {
  v376 = !v376;
  var vI_sxfci_38 = f362("game_");
  if (v376 == 0) {
    vI_sxfci_38.classList.remove("game_playeract");
  } else {
    vI_sxfci_38.classList.add("game_playeract");
  }
  var vI_sxfci_39 = f362("top_left");
  if (v376 == 0) {
    vI_sxfci_39.classList.remove("pack_upact");
    vI_sxfci_39.children[0].classList.remove("igwi-chacha1");
    vI_sxfci_39.children[0].classList.add("igwi-gengduo2");
  } else {
    vI_sxfci_39.classList.add("pack_upact");
    vI_sxfci_39.children[0].classList.remove("igwi-gengduo2");
    vI_sxfci_39.children[0].classList.add("igwi-chacha1");
  }
}
function f282() {
  v375 = f371("toolsBounce", "block") ? (f362("toolsBtn").style.color = "#F9D342", true) : (f362("toolsBtn").style.color = "", false);
}
var vLN19 = 1;
function f283() {
  f365("top_left", f281);
  f365("toolsBtn", f282);
  f281();
  f365("chatBtn", function () {
    f371("popwin_room", "block");
  });
  f365("btn_expandPlayer", function () {
    f371("popwin_room", "block");
  });
  if (vLN014 == 1) {
    f362("speedbtn").style.display = "none";
  } else {
    f365("speedbtn", function () {
      this.style.color = vLN19 < 8 ? (vLN19 *= 2, this.innerHTML = vLN19 + "X", "#ff0000") : (vLN19 = 1, this.innerHTML = "加速", "#fff");
      f315(vLN19);
    });
  }
}
function f284() {}
var v377 = -9999000;
function f285() {
  if (v377 + 300000 > performance.now()) {
    f87("5分钟只能邀请一次");
  } else {
    v377 = performance.now();
    if (f362("txt_shareinfo").value != "") {
      $.ajax("https://world.wo1wan.com/sharegame", {
        type: "POST",
        async: true,
        data: {
          gtype: "fc",
          gamename: vLS2,
          gid: vLN012,
          lid: vLN015,
          call: "watch",
          max: vLN018,
          now: vLN066,
          pass: "",
          sev: vLN058,
          msg: f362("txt_shareinfo").value,
          se: f360("igwflyfree")
        },
        crossDomain: true,
        xhrFields: {
          withCredentials: false
        },
        success: function (p333, p334, p335) {
          if (p333.status == "ok") {
            f89("邀请发送成功，等待伙伴到来吧");
          } else {
            f87("邀请发送失败");
          }
        }
      });
      f362("popwin_sharegame").style.display = "none";
    } else {
      f87("请先输入邀请信息");
    }
  }
}
var vLN089 = 0;
var vLN090 = 0;
var v378 = false;
function f286() {
  var v$2 = $(".replay-slider");
  var v$3 = $(".replay-slider__range");
  var v$4 = $(".replay-slider__value");
  v$2.each(function () {
    v$3.on("input", function () {
      switch (this.id) {
        case "ctlRepRan":
          var v379 = 1000 / 60 * this.value / 1000;
          v379 = "0" + Math.floor(v379 / 3600) + ":" + Math.floor(v379 / 60) % 60 + ":" + Math.floor(v379 % 60);
          $(this).next(v$4).html(v379);
          f294(this.value);
          break;
        case "repspeedRan":
          $(this).next(v$4).html(this.value);
          f312(this.value);
          vO32.gSuperSpeed = parseInt(this.value);
      }
    });
    v$4.each(function () {
      var v380 = $(this).prev().attr("value");
      $(this).html(v380);
    });
  });
}
function f287(p336) {
  if (v378) {
    var v381 = 1000 / 60 * (vLN089 = p336) / 1000;
    if (v66) {
      cyc_queryID("ctlRepValMax").innerText = "0" + Math.floor(v381 / 3600) + ":" + Math.floor(v381 / 60) % 60 + ":" + Math.floor(v381 % 60);
      cyc_queryID("ctlRepRan").max = p336;
    }
    if (Math.floor(v381 / 3600) > 10) {
      f87("房间超过10小时，暂不支持观战");
    }
  }
}
function f288(p337) {
  if (v378) {
    var v382 = 1000 / 60 * (vLN090 = p337) / 1000;
    if (vLN089 < vLN090 + 60 && v385) {
      f87("录像回放结束");
    }
    cyc_queryID("ctlRepRan").value = Math.floor(vLN090 / vLN089 * vLN089);
    cyc_queryID("ctlRepVal").innerText = "0" + Math.floor(v382 / 3600) + ":" + Math.floor(v382 / 60) % 60 + ":" + Math.floor(v382 % 60);
  }
}
function f289() {
  v378 = true;
}
var v383 = -1000000;
function f290() {
  if (vLN014 == 1) {
    if (vLN067 == vLN065) {
      if (performance.now() < 60000) {
        f87("录像长度小于一分钟，不允许保存");
      } else if (performance.now() - v383 < 60000) {
        f87("一分钟内只允许保存一次");
      } else {
        v383 = performance.now();
        f150("savereplay", "");
      }
    } else {
      f87("目前只允许房主保存房间录像");
    }
  } else {
    f87("只有联机模式才允许保存录像");
  }
}
var v384 = null;
var v385 = false;
function f291() {
  $("#gamemode").text("录像回放");
  cyc_queryID("replayctl").style.display = "block";
  cyc_queryID("pcmsg").style.top = "calc(70% + 60px)";
  cyc_queryID("pcmsg").style.height = "calc(28% - 48px)";
  document.getElementsByName("closep").forEach(function (p338) {
    p338.style.display = "none";
  });
  cyc_queryID("calljoin").style.display = "none";
  cyc_queryID("Repspan").innerText = "录像回放";
  cyc_queryID("repsset").style.display = "inline-block";
  cyc_queryID("SaveReplay").style.display = "none";
  f286();
}
function f292(p339, p340) {
  SendBigCommand(vO30.gn, p339, p340);
}
function f293(p341) {
  SendBigCommand(vO30.hn, p341, 0);
}
function f294(p342) {
  if (v385) {
    SendBigCommand(vO30.bn, p342);
  }
}
function f295() {
  v385 = true;
  vLN012 = parseInt(vLN016) + 1000000;
  v378 = true;
  $.get("/replay/info?rid=" + vLN016, function (p343) {
    f87("正在观看 " + (v384 = p343).ReplayName);
    f287(p343.ReplayLen);
  });
  if (v66) {
    f291();
  }
}
function f296() {
  vLN012 = v384.GameID;
  f292(v384.ReplayLen, v384.GameID);
}
function f297(p344) {}
function f298() {
  cyc_queryID("linkmsg").addEventListener("click", function (p345) {
    var v386 = p345.target;
    if (v386.className.indexOf("banicon") > 1) {
      var v387 = v386.nextSibling.innerText.substr(0, v386.nextSibling.innerText.indexOf(": "));
      var v388 = v386.parentElement.innerText.substr(v386.parentElement.innerText.indexOf(": ") + 2);
      v388 = v388.substr(0, v388.length - 1);
      $.post("/sayban", {
        who: v387,
        where: "jjin_" + vLN012 + "_" + vLN015,
        say: v388 + ""
      }, function (p346) {
        if (p346.status == "ok") {
          f150("message", v387 + " 被玩家 " + (vLN065 + 1) + " 在本房间禁言一小时");
        } else {
          f87("禁言失败");
        }
      });
    }
  });
}
var vO29 = {
  yn: false
};
function f299() {
  vO29.yn = true;
}
function f300() {
  if (v64) {
    var vI_tdBda_11 = f361("look");
    v71.postMessage({
      act: "init",
      1: vLN012,
      2: -1,
      5: v430.sampleRate,
      3: v68,
      4: v69,
      6: v70,
      16: vLN014,
      17: vLN015,
      18: v66,
      19: vI_tdBda_11,
      sab: v57,
      sabi: v58
    });
  } else {
    // TOLOOK
    setTimeout(f300, 3000);
  }
}
function f301(p347) {
  if (p347.data.byteLength != 4) {
    if (p347.data.act == "init") {
      f300();
    } else if (p347.data.act == "go") {
      vLN739 = p347.data[vLN132];
      vLN018 = p347.data[vLN152];
      v461.width = p347.data[vLN11];
      v461.height = p347.data[vLN122];
      if (v461.width < v461.height) {
        var v389 = v461.width;
        v461.width = v461.height;
        v461.height = v389;
        v469 = true;
      }
      vLN0109 = v461.width;
      vLN0110 = v461.height;
      if (v66) {
        v461.width *= vLN49;
        v461.height *= vLN49;
      }
      ctlEnable = p347.data[vLN142];
      vLS13 = f379();
      vLS14 = vLSVaryingHighpVec2V_te;
      f380();
      f299();
      if (v66) {
        v71.onmessage = f304;
        // TOLOOK
        setTimeout(f7, 3000);
        f48(100);
      } else {
        v71.onmessage = f304;
        f245(100);
      }
      if (vLN014 == 1) {
        f152();
      }
    } else if (p347.data.act == "process") {
      if (p347.data.pos == -1) {
        f362("loadingimg").src = "./img/loadfail.png";
      } else if (p347.data.pos != -2) {
        if (v66) {
          f48(p347.data.pos);
        } else {
          f245(p347.data.pos);
        }
      }
    } else {
      f305(vO30.vn, vLN048 & 255, vLN048 / 256);
    }
    if (v385) {
      f296();
    }
  } else {
    f302(p347.data);
  }
}
vO29.s = function () {
  f316(0);
};
vO29.l = function () {
  f316(1);
};
vO29.wn = function (p348) {
  f315(p348);
};
vO29.kn = function (p349) {
  f319(p349);
};
var vLN74565 = 74565;
function f302(p350) {
  var v390 = p350[0];
  if (v390 == vO30.Tn) {
    f135();
  } else if (v390 == vO30.xn) {
    var v391 = p350[2];
    if (p350[1] == 1) {
      var vI_wccDd_ = f372();
      var vI_PZAFm_ = f374(vI_wccDd_);
      var v392 = new XMLHttpRequest();
      v392.open("POST", "/fc/svimg?sid=" + v391 + "&game=" + vLN012, true);
      v392.setRequestHeader("Content-type", "application/octet-stream");
      v392.onreadystatechange = function () {
        if (v392.readyState == XMLHttpRequest.DONE && v392.status == 200) {
          var v393 = new Date();
          switch (v391) {
            case 1:
              vO13.sv1 = 1;
              vO13.st1 = v393.toLocaleString();
              vO14.d1 = 1;
              vO14.d1i = vI_wccDd_;
              break;
            case 2:
              vO13.sv2 = 1;
              vO13.st2 = v393.toLocaleString();
              vO14.d2 = 1;
              vO14.d2i = vI_wccDd_;
              break;
            case 3:
              vO13.sv3 = 1;
              vO13.st3 = v393.toLocaleString();
              vO14.d3 = 1;
              vO14.d3i = vI_wccDd_;
              break;
            case 4:
              vO13.sv4 = 1;
              vO13.st4 = v393.toLocaleString();
              vO14.d4 = 1;
              vO14.d4i = vI_wccDd_;
              break;
            case 5:
              vO13.W = 1;
              vO13.J = v393.toLocaleString();
              vO14.Mn = 1;
              vO14.Z = vI_wccDd_;
              break;
            case 6:
              vO13.ee = 1;
              vO13.ne = v393.toLocaleString();
              vO14.Pn = 1;
              vO14.te = vI_wccDd_;
              break;
            case 7:
              vO13.ae = 1;
              vO13.ie = v393.toLocaleString();
              vO14.En = 1;
              vO14.oe = vI_wccDd_;
              break;
            case 8:
              vO13.ce = 1;
              vO13.re = v393.toLocaleString();
              vO14.An = 1;
              vO14.le = vI_wccDd_;
          }
          f109();
          if (v66) {
            f113(v391);
          }
        }
      };
      v392.send(vI_PZAFm_);
    }
  } else {
    if (v390 == vO30.Sn) {
      v391 = p350[2];
      if (v66) {
        f114(v391);
      }
      return;
    }
    if (v390 == vO30.Cn) {
      if (p350[1] == 1) {
        f156();
      } else {
        f157();
      }
    } else if (v390 == vO30.Kn) {
      if (vLN012 < 99999) {
        f46();
      }
    } else if (v390 == vO30.On) {
      f40("延时过高,请稍后");
    }
  }
}
var vLN100 = 100;
var vLN091 = 0;
function f303(p351, p352) {
  vA3.push(p351);
  if (v60 != null) {
    v60[vLN32] = vA3.length;
  }
}
function f304(p353) {
  if (p353.data.byteLength != 4) {
    if (p353.data.byteLength != 24) {
      if (vLN014 == 1) {
        if (p353.data.byteLength < 2048) {
          f161(p353.data);
          if (p353.data.byteLength == 16) {
            var v394 = new Uint32Array(p353.data);
            if (v394[0] % 60 == 0) {
              f101(v394[0]);
            }
          }
          return;
        }
      } else {
        f101(vLN093);
      }
      vLN093++;
      vLN019++;
      if (v58 != null) {
        var vV58 = v58;
      } else {
        vV58 = p353.data;
      }
      if (v417 && v425 && vLN093 > 5 && !v428) {
        var v395 = new Int32Array(vV58, 0, 1024);
        vLN739 = v395[0];
        if (v434 != null) {
          for (var vLN092 = 0; vLN092 < vLN739; vLN092++) {
            if (vLN4096 <= vLN0101) {
              vLN0101 = 0;
            }
            v420[vLN0101] = v395[vLN092 + 1] / 6553.5;
            vLN0101++;
          }
          Atomics.add(v435, 0, vLN739);
          v60[vLN32] = v435[1] / 1024;
        } else {
          for (vLN092 = 0; vLN092 < vLN739 && (vLN0101 >= 102400 && (vLN0101 = 0), !(vLN10240 < vLN0104 - vLN0105)); vLN092++) {
            v432[vLN0101] = v395[vLN092 + 1] / 6553.5;
            vLN0101++;
            vLN0104++;
          }
          if (v60 != null) {
            v60[vLN32] = (vLN0104 - vLN0105) / 1024;
          } else if (vLN10240 - 1024 < vLN0104 - vLN0105 && vLN093 % 30 == 0) {
            f305(vO30.Xn, (vLN0104 - vLN0105) / 1024, 0);
          }
        }
      }
      if (vV58.byteLength > 4096) {
        f382(new Uint16Array(vV58, 4096));
        f42(new Int32Array(vV58, 4096 + vLN0109 * vLN0110 * 2));
      }
    } else {
      f101(new Uint32Array(p353.data)[0]);
    }
  } else {
    f302(p353.data);
  }
}
var vO30 = {
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
var vLN110 = 1;
var vLN25 = 2;
var vLN34 = 3;
var vLN47 = 4;
var vLN52 = 5;
var vLN62 = 6;
var vLN11 = 11;
var vLN122 = 12;
var vLN132 = 13;
var vLN142 = 14;
var vLN152 = 15;
var vLN162 = 16;
var vLN172 = 17;
var vLN182 = 18;
ik_looker = 19;
var v396 = new Uint8Array(4);
var v397 = new Uint32Array(3);
function f305(p354, p355, p356) {
  if (v71 != null) {
    v396[0] = p354;
    v396[1] = p355;
    v396[2] = p356;
    v71.postMessage(v396);
  }
}
function f306(p357, p358, p359) {
  if (v71 != null) {
    v397[0] = p357;
    v397[1] = p358;
    v397[2] = p359;
    v71.postMessage(v397);
  }
}
function f307(p360) {
  if (v71 != null) {
    v71.postMessage(p360);
  }
}
var vLN093 = 0;
var vLN094 = 0;
var vLN111 = 1;
var vLN112 = 1;
var vLN095 = 0;
var vLN096 = 0;
function f308(p361, p362) {
  f148(vLN096 = f146(vLN096, p361, p362));
}
function f309(p363, p364) {
  if ((p363 * 16 + p364 != vLN095 || p363 == vO17.$e) && (!(vO16.length > 0) || p363 == vO17.$e)) {
    if (p363 == vO17.Fe) {
      if (p364 & vLN642) {
        vLN034 = 1;
      } else if (p364 & vLN128) {
        vLN034 = 0;
      }
    }
    vLN095 = p363 * 16 + p364;
    if (vLN014 == 1) {
      f149(p363, p364);
    } else {
      vO17.$e;
      f145(p363, p364);
    }
    vO4.p++;
  }
}
var vLN113 = 1;
function f310() {
  if (vO32.gSkipFrame != 0 && vLN113 < 3) {
    if (!v66) {
      vLN113++;
      f305(vO30.In, vLN113, 0);
    }
  }
}
function f311() {
  f305(vO30.In, 1, 0);
}
function f312(p365) {
  vLN20 = (9 - p365) * 2;
  f305(vO30.$n, vLN20, 0);
}
function f313() {}
function f314(p366, p367) {
  f306(vO30.Cn, p366, p367);
}
function f315(p368) {
  vLN111 = p368;
  f305(vO30.zn, p368, 0);
}
function f316(p369) {
  vLN112 = p369;
  vLN094 = 0;
  f305(vO30.Dn, p369, 0);
}
function f317(p370) {
  f305(vO30.xn, p370, 0);
}
function f318(p371) {
  f305(vO30.Sn, p371, 0);
}
function f319(p372) {
  if (vLN018 == 0) {
    // TOLOOK
    setTimeout(f319, 2000, p372);
  } else {
    f305(vO30.Rn, p372, 0);
  }
}
function f320(p373) {
  f305(vO30.Bn, p373, 0);
}
function f321(p374) {
  f305(vO30.Fn, p374 & 255, p374 / 256);
}
function f322(p375) {
  f305(vO30.Ln, p375, 0);
}
function f323() {
  f305(vO30.Vn, 0, 0);
}
function f324(p376) {
  f305(vO30.jn, p376, 0);
}
function f325() {
  f305(vO30.Hn, 0, 0);
}
var vO31 = {};
function f326(p377, p378, p379) {
  if (vO31[p378] == null) {
    var v398 = new XMLHttpRequest();
    v398.open("GET", "/nextgame/igwuser/useropeninfo?uid=" + p377 + "&uuid=" + p378, true);
    v398.send();
    v398.onreadystatechange = function () {
      if (v398.readyState == 4 && v398.status == 200) {
        try {
          var v399 = JSON.parse(v398.response);
          if (v399.status == "success") {
            vO31[p378] = v399.data;
            p379(v399.data);
          }
        } catch (e4) {}
      }
    };
  } else {
    p379(vO31[p378]);
  }
}
var v400 = false;
var vO32 = {
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
var vO33 = {
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
var vO34 = {
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
var vO35 = {
  Lock43: false,
  ScrStyle: false,
  Width: 100,
  Height: 100
};
var vO36 = {
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
function f327() {
  f375("/saveset?type=fc&gid=" + vLN012, vO32);
  if (v66) {
    f89("配置已保存在畅玩云服务器");
  } else {
    f251("配置已保存在畅玩云服务器");
  }
}
function f328() {
  if (vO32.gSuperSpeed > 8) {
    vO32.gSuperSpeed = 8;
  }
  if (vO32.gSuperSpeed <= 0) {
    vO32.gSuperSpeed = 1;
  }
}
function f329() {
  f328();
  if (v66) {
    f349();
    f350();
  } else {
    f337();
    f338();
    f339();
  }
  f312(vO32.gSuperSpeed);
}
function f330() {
  if (vO32.Mobset == null || vO32.Mobset == null) {
    vO32.Mobset = JSON.parse(JSON.stringify(vO36));
  }
  if (vO32.MobBase == null || vO32.MobBase == null) {
    vO32.MobBase = JSON.parse(JSON.stringify(vO35));
  }
}
function f331() {
  f329();
  var v401 = new XMLHttpRequest();
  v401.open("GET", "/loadset?type=fc&gid=" + vLN012, true);
  v401.responseType = "json";
  v401.onreadystatechange = function () {
    if (v401.readyState == XMLHttpRequest.DONE && v401.status == 200) {
      var v402 = v401.response;
      if (v402.PCSet == null || v402.GPSetx == null) {
        f327();
      } else {
        vO32 = v402;
      }
      if (vO32.gExtX5 == null) {
        vO32.gExtX5 = false;
        vO32.gExtX5Key = 0;
        vO32.gExtX6 = false;
        vO32.gExtX6Key = 0;
        vO32.PCSet.KeyX5 = "NO";
        vO32.PCSet.KeyX6 = "NO";
        vO32.GPSetx.KeyX5 = -1;
        vO32.GPSetx.KeyX6 = -1;
      }
      if (vO32.gExtX3 == null) {
        vO32.gExtX3 = false;
        vO32.gExtX3Key = 0;
        vO32.gGes1 = "4 8 2 A ";
        vO32.gGes2 = "4 3 A ";
        vO32.gGes3 = "";
        vO32.gGes4 = "";
      }
      if (vO32.gExtX4 == null) {
        vO32.gExtX4 = false;
        vO32.gExtX4Key = 0;
      }
      if (vO32.gGesSpeed == null) {
        vO32.gGesSpeed = 4;
      }
      if (vO32.PCSet == null) {
        vO32.PCSet = vO33;
      }
      if (vO32.GPSetx == null) {
        vO32.GPSetx = vO34;
      }
      if (vO32.sHQX == null) {
        vO32.sHQX = true;
      }
      if (vO32.gSoundVol == null) {
        vO32.gSoundVol = 70;
      }
      if (vO32.lockScr == null) {
        vO32.lockScr = false;
      }
      if (vO32.gDisHoldLR == null) {
        vO32.gDisHoldLR = false;
      }
      if (vO32.gJoyLagFix == null) {
        vO32.gJoyLagFix = 4;
      }
      if (vO32.GPSetx.gKeyRev == null) {
        vO32.GPSetx.gKeyRev = false;
      }
      if (vO32.GPSetx.gKeyRevLR == null) {
        vO32.GPSetx.gKeyRevLR = false;
      }
      f330();
      f329();
      v400 = true;
    }
  };
  v401.send();
  f330();
  if (v66) {
    f347();
  } else {
    f339();
  }
}
function f332(p380) {
  f362("cb_vidstyle").checked = p380 ? (vO32.MobBase.ScrStyle = true, $("#whathis").css("image-rendering", "pixelated"), true) : (vO32.MobBase.ScrStyle = false, $("#whathis").css("image-rendering", "auto"), false);
}
function f333() {
  var vI_sxfci_40 = f362("basicRangeWidth");
  var vI_sxfci_41 = f362("basicRangeHeight");
  vI_sxfci_40.value = parseInt(vO32.MobBase.Width);
  vI_sxfci_41.value = parseInt(vO32.MobBase.Height);
  f362("cb_lock43").checked = vO32.MobBase.Lock43;
  f274();
}
function f334() {
  f362("boostSpeed").value = parseInt(vO32.gSuperSpeed);
  f275();
}
function f335() {
  for (var v403 in vO32.Mobset) {
    for (var v404 in vO32.Mobset[v403]) {
      vO24[v403][v404] = vO32.Mobset[v403][v404];
    }
    if (v403 == "Pad") {
      v311 = true;
    }
  }
  v308 = vO32.MobBase.AllHide;
  f217();
  f208();
  f219();
}
function f336() {
  for (var v405 in vO32.Mobset) {
    for (var v406 in vO32.Mobset[v405]) {
      vO32.Mobset[v405][v406] = vO24[v405][v406];
    }
  }
  f327();
}
function f337() {
  f335();
}
function f338() {}
function f339() {
  f332(vO32.MobBase.ScrStyle);
  f333();
  f334();
}
function f340(p381) {
  if (p381) {
    vO32.gScrType = 1;
    $("#whathis").css("image-rendering", "pixelated");
  } else {
    vO32.gScrType = 0;
    $("#whathis").css("image-rendering", "auto");
  }
}
function f341(p382) {
  f381(vO32.sHQX = p382);
}
function f342(p383) {
  f344(vO32.lockScr);
}
function f343(p384 = false) {
  if (p384) {
    f362("gamescr").classList.add("scanlines");
  } else {
    f362("gamescr").classList.remove("scanlines");
  }
  vO32.Qn = p384;
}
function f344(p385) {
  vO32.lockScr = p385;
  if (vO32.lockScr) {
    var vI_sxfci_42 = f362("gamedisplay");
    var vI_sxfci_43 = f362("gamescr");
    var vI_sxfci_44 = f362("whathis");
    var v407 = vI_sxfci_42.clientWidth;
    var v408 = vI_sxfci_42.clientHeight;
    if (vI_sxfci_43.className.indexOf("win") > 0) {
      // TOLOOK
      setTimeout(function () {
        v407 = vI_sxfci_43.clientWidth;
        v408 = vI_sxfci_43.clientHeight;
        var v409 = v407 / 4;
        var v410 = v408 / 3;
        if (v410 < v409) {
          v409 = v410;
          vI_sxfci_44.style.width = v409 * 4 + "px";
          vI_sxfci_44.style.height = v409 * 3 + "px";
          var v411 = (v407 - v409 * 4) / 2;
          vI_sxfci_44.style.marginLeft = v411 + "px";
          vI_sxfci_44.style.marginRight = v411 + "px";
        } else {
          vI_sxfci_44.style.width = v409 * 4 + "px";
          vI_sxfci_44.style.height = v409 * 3 + "px";
          vI_sxfci_44.style.margin = "0px";
          v411 = (v408 - v409 * 3) / 2;
          vI_sxfci_44.style.marginTop = v411 + "px";
          vI_sxfci_44.style.marginBottom = v411 + "px";
        }
      }, 500);
      return;
    }
    vI_sxfci_44.style.margin = "";
    vI_sxfci_44.style.width = "100%";
    vI_sxfci_44.style.height = "100%";
    var v412 = vI_sxfci_42.clientWidth / 4;
    var v413 = (vI_sxfci_42.clientHeight - 64) / 3;
    if (v413 < v412) {
      v412 = v413;
      vI_sxfci_43.style.width = v412 * 4 + "px";
      vI_sxfci_43.style.height = v412 * 3 + "px";
      vI_sxfci_43.style.margin = "auto";
    } else {
      vI_sxfci_43.style.width = v412 * 4 + "px";
      vI_sxfci_43.style.height = v412 * 3 + "px";
      var v414 = (vI_sxfci_42.clientHeight - 64 - v412 * 3) / 2;
      vI_sxfci_43.style.marginTop = v414 + "px";
      vI_sxfci_43.style.marginBottom = v414 + "px";
    }
  } else {
    (vI_sxfci_42 = f362("gamescr")).style.width = "";
    vI_sxfci_42.style.height = "";
    vI_sxfci_42.style.margin = "0px";
  }
}
function f345(p386) {
  if (vLN014 != 0) {
    if (f155()) {
      f150("watchset", p386 ? "1" : "0");
    } else {
      f87("房主才可设置");
    }
  } else {
    f87("单机无需设置");
  }
}
function f346(p387) {
  if (vLN014 != 0) {
    if (f155()) {
      f150("watchsay", p387 ? "1" : "0");
    } else {
      f87("房主才可设置");
    }
  } else {
    f87("单机无需设置");
  }
}
function f347() {
  f369("set_vidstyle", "change", function (p388) {
    f340(this.value > 0);
  });
  f369("set_vidimpove", "change", function () {
    f341(this.value > 0);
  });
  f369("set_vidsize", "change", function () {
    f344(this.value > 0);
  });
  f366("set_vidscanline", "change", function () {
    f343(this.checked);
  });
  f366("allowlook", "change", function () {
    f345(this.checked);
  });
  f366("allowlookermsg", "change", function () {
    f346(this.checked);
  });
  window.addEventListener("resize", f342);
}
function f348(p389, p390) {
  for (var v415 = document.getElementsByName(p389), vLN097 = 0; vLN097 < v415.length; vLN097++) {
    if (v415[vLN097].value > 0 == p390) {
      v415[vLN097].checked = true;
    } else {
      v415[vLN097].checked = false;
    }
  }
}
function f349() {
  f362("soundvol").value = vO32.gSoundVol;
  f362("soundvol").style.backgroundSize = vO32.gSoundVol + "% 100%";
  f351(vO32.gSoundVol / 100);
  f340(vO32.gScrType);
  f348("set_vidstyle", vO32.gScrType);
  f341(vO32.sHQX);
  f348("set_vidimpove", vO32.sHQX);
  f344(vO32.lockScr);
  f348("set_vidsize", vO32.lockScr);
  f343(vO32.Qn);
  f362("set_vidscanline").checked = vO32.Qn;
}
function f350() {
  f68();
  f54();
  f60();
}
var vLN098 = 0;
var vLN099 = 0;
var v416 = false;
var v417 = false;
var v418 = false;
var v419 = false;
var v420;
var v421;
var v422;
var v423;
var v424;
var vLN0100 = 0;
var vLN0101 = 0;
var vLN4096 = 4096;
var vLN0102 = 0;
var vLN0103 = 0;
var v425 = false;
var v426;
var v427;
var vLN26 = 2;
var v428 = false;
var v429 = window.AudioContext || window.webkitAudioContext;
var v430 = new v429({
  sampleRate: 48000
});
var vA2 = [];
var v431 = null;
var vA3 = [];
var vA4 = [];
var v432 = null;
var v433 = null;
var vLN0104 = 0;
var vLN0105 = 0;
var vLN0106 = 0;
var vLN10240 = 10240;
var v434 = null;
var v435 = null;
function f351(p391) {
  if (!v416) {
    f357();
  }
  if (v66) {
    window.Zn.gain.value = p391;
  }
  if (p391 > 0) {
    v417 = true;
    v430.resume();
    vO29.kn(1);
  } else {
    v417 = false;
    v430.suspend();
    vO29.kn(0);
  }
}
function f352() {
  if (typeof SharedArrayBuffer == "undefined") {
    return false;
  }
  if (48000 / (1 / v430.baseLatency) < 512) {
    return false;
  }
  vLN4096 = 10240;
  var v436 = new SharedArrayBuffer(102400);
  v423 = new Float32Array(vLN4096);
  v424 = new Float32Array(vLN4096);
  v420 = new Float32Array(v436, 0, 10240);
  v421 = new Float32Array(v436, 40960, 10240);
  v435 = new Uint32Array(v436, 81920, 10);
  var v437 = new Function("acx", "gain", "async function fsssdsad() {\n    console.log('init aw',acx);\n    await acx.audioWorklet.addModule('cyc/cycsd.js');\n\n    var igwSoundDrv = new AudioWorkletNode(acx, 'igw-sound-processor',{numberOfOutputs:2})\n    igwSoundDrv.connect(gain)\n    return igwSoundDrv;}\nreturn fsssdsad()");
  if (v66) {
    window.Zn = v430.createGain();
    window.Zn.connect(v430.destination);
    window.Zn.gain.value = 1;
    v437(v430, window.Zn).then(function (p392) {
      (v434 = p392).port.postMessage(v436);
    });
  } else {
    v437(v430, v430.destination).then(function (p393) {
      (v434 = p393).port.postMessage(v436);
    });
  }
  return true;
}
function f353() {
  vLN4096 = 1024;
  v432 = new Float32Array(102400);
  if (v66) {
    vLN4096 = 1024;
    window.et = v430.createScriptProcessor(vLN4096, 0, 2);
    window.Zn = v430.createGain();
    window.Zn.connect(v430.destination);
    window.Zn.gain.value = 1;
    window.et.connect(window.Zn);
    window.et.onaudioprocess = f355;
  } else {
    vLN4096 = 4096;
    vLN10240 = 8192;
    if (48000 / (1 / v430.baseLatency) <= 256 && !v66) {
      vLN4096 = 2048;
      vLN10240 = 8192;
    }
    window.et = v430.createScriptProcessor(vLN4096, 0, 2);
    window.et.onaudioprocess = f355;
    window.et.connect(v430.destination);
  }
  var v438 = new XMLHttpRequest();
  v438.open("Get", "./cyc/click.wav", true);
  v438.responseType = "arraybuffer";
  v438.onreadystatechange = function () {
    if (v438.readyState === 4 && v438.status === 200) {
      v430.decodeAudioData(this.response, function (p394) {
        ClickSound = p394.getChannelData(0);
      });
    }
  };
  v438.send();
}
function f354() {
  if (!v416) {
    if (!f352()) {
      f353();
    }
    v416 = true;
  }
}
function f355(p395) {
  var v439 = p395.outputBuffer.getChannelData(0);
  var v440 = p395.outputBuffer.getChannelData(1);
  if (!v418) {
    if (v419 && vO32.gCtlSound) {
      v420.set(ClickSound, 0);
      v421.set(ClickSound, 0);
      v419 = false;
    }
    if (vLN0104 < vLN0105 + vLN4096) {
      v439.fill(0);
      v440.fill(0);
      return;
    }
    var v441 = v432.subarray(vLN0106, vLN0106 + vLN4096);
    v439.set(v441);
    v440.set(v441);
    v441.fill(0);
    if ((vLN0106 += vLN4096) >= 102400) {
      vLN0106 = 0;
    }
    vLN0105 += vLN4096;
  }
}
function f356() {
  v430.resume();
  if (v430.state == "suspended") {
    // TOLOOK
    setTimeout(f356, 2000);
  } else {
    v425 = true;
  }
}
var vLN0107 = 0;
function f357() {
  if (vLN0107 > 3) {
    if (!v66) {
      f250("如果一直没声音，请检查手机是否静音了。");
    }
  }
  if (v417 == 0) {
    v417 = true;
    f354();
    f356();
    vO29.kn(1);
    vLN0107++;
  } else {
    v417 = false;
    v430.suspend();
    vO29.kn(0);
  }
}
var v442 = null;
function f358() {
  $.ajax({
    type: "get",
    url: "/nextgame/igwuser/userinfo",
    async: true,
    success: function (p396) {
      v442 = p396.info;
      if (v66) {
        f107();
      } else {
        f261();
      }
      if (v442.LevelInfo.VipLevel > 0 || v442.LevelInfo.Svip > 0) {
        f359("VipEvent", "play", ["fc", vLN012, v442.Uid, v442.LevelInfo.Level, v442.LevelInfo.VipLevel, v442.LevelInfo.Svip]);
      }
    },
    complete: function (p397, p398) {
      if (p397.status != 200) {
        location.reload(true);
      }
    }
  });
}
function f359(p399, p400, p401) {
  for (var v443 in p401) {
    if (typeof p401[v443] != "string") {
      p401[v443] = p401[v443] + "";
    }
  }
  f375("/nextgame/feedback/event", {
    Url: location.href,
    Type: p399,
    Event: p400,
    EventData: p401,
    Sign: "ok"
  });
}
var vO37 = {
  nt: "",
  addEventListener: function () {}
};
function f360(p402) {
  for (var v444 = document.cookie.split("; "), vLN0108 = 0; vLN0108 < v444.length; vLN0108++) {
    var v445 = v444[vLN0108].split("=");
    if (v445[0] == p402) {
      return v445[1];
    }
  }
  return "";
}
function f361(p403) {
  var v446 = new RegExp("(^|&)" + p403 + "=([^&]*)(&|$)");
  var v447 = window.location.search.substr(1).match(v446);
  if (v447 != null) {
    return decodeURI(v447[2]);
  } else {
    return null;
  }
}
function f362(p404) {
  var v448 = document.getElementById(p404);
  if (v448 == null) {
    vO37.nt = p404;
    v448 = vO37;
    return null;
  } else {
    return v448;
  }
}
function f363(p405) {
  if (p405 == null) {
    return "badele";
  } else {
    return p405.getAttribute("key");
  }
}
function f364(p406, p407) {
  var v449 = document.getElementById(p406);
  if (v449 != null) {
    v449.removeEventListener("click", p407);
  }
}
function f365(p408, p409) {
  var v450 = document.getElementById(p408);
  if (v450 != null) {
    v450.addEventListener("click", p409);
  }
}
function f366(p410, p411, p412) {
  var v451 = document.getElementById(p410);
  if (v451 != null) {
    v451.addEventListener(p411, p412);
  }
}
function f367(p413, p414) {
  document.getElementsByName(p413).forEach(function (p415) {
    p415.addEventListener("click", p414);
  });
}
function f368(p416, p417) {
  document.getElementsByName(p416).forEach(function (p418) {
    p417(p418);
  });
}
function f369(p419, p420, p421) {
  document.getElementsByName(p419).forEach(function (p422) {
    p422.addEventListener(p420, p421);
  });
}
function f370(p423, p424) {
  document.getElementsByName(p423).forEach(function (p425) {
    p425.classList.remove(p424);
  });
}
function f371(p426, p427) {
  var vF362 = f362(p426);
  if (vF362.style.display == "none") {
    vF362.style.display = p427;
    return true;
  } else {
    return !(vF362.style.display = "none");
  }
}
function f372() {
  var v452 = document.getElementById("whathis");
  v466.drawArrays(v466.TRIANGLES, 0, 6);
  var v453 = document.createElement("canvas");
  v453.width = 200;
  v453.height = 150;
  v453.getContext("2d").drawImage(v452, 0, 0, 200, 150);
  return v453.toDataURL("image/png");
}
function f373() {
  tempSrc = GetGameImg();
  $("#downurl").attr("href", tempSrc);
  $("#shareimg").attr("src", tempSrc);
}
function f374(p428) {
  var v454 = p428.split(",");
  var v455 = v454[0].match(/:(.*?);/)[1];
  var vAtob = atob(v454[1]);
  for (var v456 = vAtob.length, v457 = new Uint8Array(v456); v456--;) {
    v457[v456] = vAtob.charCodeAt(v456);
  }
  return new Blob([v457], {
    type: v455
  });
}
function f375(p429, p430, p431, p432) {
  var v458 = new XMLHttpRequest();
  v458.open("POST", p429, true);
  v458.setRequestHeader("Content-type", "application/json");
  v458.responseType = "json";
  v458.onreadystatechange = function () {
    if (v458.readyState == XMLHttpRequest.DONE) {
      if (v458.status == 200) {
        if (p431 != null) {
          p431(v458.response);
        }
      } else if (p432 != null) {
        p432(v458.response);
      }
    }
  };
  v458.send(JSON.stringify(p430));
}
var vO38 = {};
function f376(p433, p434) {
  vO38[p433] = 0;
  f366(p433, "touchmove", function (p435) {
    if (this.disabled) {
      p435.preventDefault();
    } else {
      var v459 = this.getClientRects();
      var vF22010 = f220(v459[0].x, v459[0].y);
      var v460 = f220(p435.changedTouches[0].clientX, p435.changedTouches[0].clientY).pn;
      this.value = (v460 - vF22010.pn) / (this.offsetWidth / (parseInt(this.max) - parseInt(this.min))) + parseInt(this.min);
      p434(this);
      p435.preventDefault();
    }
  });
}
function f377() {
  cyc_queryID("pushbtn").disabled = true;
  $.get("/helper/pushwx?type=jj&id=" + vLN012, function (p436) {
    cyc_queryID("pushbtn").innerHTML = "√请在手机微信查看";
    cyc_queryID("pushbtn").style.backgroundColor = "#3fdd2e61";
    // TOLOOK
    setTimeout(function () {
      cyc_queryID("pushbtn").style.display = "none";
    }, 5000);
  });
}
var v461 = null;
var v462 = null;
function f378() {
  v461 = f362("whathis");
  v462 = f362(v66 ? "helpergui" : "gametap");
}
function f379() {
  var v463 = 512 / vLN0109;
  var v464 = 512 / vLN0110;
  var v465 = "attribute vec2 a_position;\n            varying highp vec2 v_textureCoord;\n\n            void main() {\n                gl_Position = vec4((a_position.x * 2.0 * " + v463 + ".0) - 1.0, (a_position.y * 2.0 * " + v464 + ") * -1.0 + 1.0, 0, 1);\n                v_textureCoord = vec2(a_position.x, a_position.y);\n            }";
  if (v469) {
    v465 = "attribute vec2 a_position;\n            varying highp vec2 v_textureCoord;\n\n            void main() {\n                gl_Position = vec4((a_position.y * 2.0 * " + v464 + ") - 1.0, 0.0 - ((a_position.x * 2.0 * " + v463 + ") * -1.0 + 1.0), 0, 1);\n                v_textureCoord = vec2(a_position.x, a_position.y);\n            }";
  }
  return v465;
}
var vLSVaryingHighpVec2V_te = "  varying highp vec2 v_textureCoord;\n\n            uniform sampler2D u_sampler;\n\n            void main(void) {\n                gl_FragColor = texture2D(u_sampler, vec2(v_textureCoord.s, v_textureCoord.t));\n            }";
var v466 = null;
var vLS13 = "";
var vLS14 = "";
var vLN0109 = 0;
var vLN0110 = 0;
var v467 = null;
var vLN49 = 4;
var vLN20 = 20;
var v468 = null;
var v469 = false;
var v470 = false;
var vO39 = {
  compileShader: function (p437, p438, p439) {
    var v471 = p437.createShader(p439);
    p437.shaderSource(v471, p438);
    p437.compileShader(v471);
    if (!p437.getShaderParameter(v471, p437.COMPILE_STATUS)) {
      throw new Error("could not compile shader:" + p437.getShaderInfoLog(v471));
    }
    return v471;
  },
  createProgram: function (p440, p441, p442) {
    var v472 = p440.createProgram();
    p440.attachShader(v472, p441);
    p440.attachShader(v472, p442);
    p440.linkProgram(v472);
    if (!p440.getProgramParameter(v472, p440.LINK_STATUS)) {
      throw new Error("program filed to link:" + p440.getProgramInfoLog(v472));
    }
    return v472;
  },
  tt: function (p443, p444, p445) {
    var vLS15 = "";
    if (!p445) {
      if (p444 === "x-shader/x-vertex") {
        p445 = p443.VERTEX_SHADER;
        vLS15 = vLS13;
      } else {
        if (p444 !== "x-shader/x-fragment") {
          throw new Error("Unreachable");
        }
        p445 = p443.FRAGMENT_SHADER;
        vLS15 = vLS14;
      }
    }
    return this.compileShader(p443, vLS15, p445);
  },
  createProgramFromScripts: function (p446) {
    var v473 = this.tt(p446, "x-shader/x-vertex");
    var v474 = this.tt(p446, "x-shader/x-fragment");
    return this.createProgram(p446, v473, v474);
  },
  at: function (p447) {
    var v475 = this.compileShader(p447, f386(vLN0109, vLN0110), p447.VERTEX_SHADER);
    var v476 = this.compileShader(p447, vLSif__VERSION__130defi, p447.FRAGMENT_SHADER);
    return this.createProgram(p447, v475, v476);
  }
};
function f380() {
  if (v66) {
    if ((v466 = v461.getContext("webgl2", {
      alpha: false,
      it: false
    })) == null) {
      v466 = v461.getContext("webgl", {
        alpha: false,
        it: false
      });
    }
  } else {
    v466 = v461.getContext("webgl", {
      alpha: false,
      it: false
    });
  }
  if (vO15.g()) {
    var v477 = vO15.Ke("app.getGPUFeatureStatus()");
    if (v477.opengl.indexOf("disabled") >= 0) {
      v470 = true;
    }
  }
  if (v466 == null) {
    f87("显卡加速初始化失败😢,你会看到黑屏,请重新开游戏试试,或者联系畅玩大叔反馈问题");
    v71.onmessage = function () {};
    return;
  }
  var v478 = v466.getExtension("WEBGL_debug_renderer_info");
  if ((v478 && v466.getParameter(v478.UNMASKED_RENDERER_WEBGL)).toLowerCase().indexOf("swiftshader") >= 0) {
    v470 = true;
    f87("显卡驱动过久😢,画质提升已禁用，请升级显卡驱动");
  }
  v466.viewport(0, 0, v461.width, v461.height);
  shaderProgram = vO39.createProgramFromScripts(v466);
  texture = v466.createTexture();
  v466.bindTexture(v466.TEXTURE_2D, texture);
  var v479 = new Uint16Array(262144);
  v466.texImage2D(v466.TEXTURE_2D, 0, v466.RGBA, 512, 512, 0, v466.RGBA, v466.UNSIGNED_SHORT_5_5_5_1, v479);
  v466.texParameteri(v466.TEXTURE_2D, v466.TEXTURE_MAG_FILTER, v466.NEAREST);
  v466.texParameteri(v466.TEXTURE_2D, v466.TEXTURE_MIN_FILTER, v466.NEAREST);
  v466.texParameteri(v466.TEXTURE_2D, v466.TEXTURE_WRAP_S, v466.CLAMP_TO_EDGE);
  v466.texParameteri(v466.TEXTURE_2D, v466.TEXTURE_WRAP_T, v466.CLAMP_TO_EDGE);
  var v480 = v466.createBuffer();
  v466.bindBuffer(v466.ARRAY_BUFFER, v480);
  v466.bufferData(v466.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), v466.STATIC_DRAW);
  var v481 = v466.getAttribLocation(shaderProgram, "a_position");
  var v482 = v466.getUniformLocation(shaderProgram, "u_sampler");
  v466.useProgram(shaderProgram);
  v466.bindBuffer(v466.ARRAY_BUFFER, v480);
  v466.enableVertexAttribArray(v481);
  v466.vertexAttribPointer(v481, 2, v466.FLOAT, false, 0, 0);
  if (v66) {
    var v483 = new Image();
    v483.onload = function () {
      v468 = vO39.at(v466);
      v466.useProgram(v468);
      luadata = v466.createTexture();
      v466.activeTexture(v466.TEXTURE1);
      v466.bindTexture(v466.TEXTURE_2D, luadata);
      v466.texImage2D(v466.TEXTURE_2D, 0, v466.RGBA, v466.RGBA, v466.UNSIGNED_BYTE, v483);
      v466.texParameteri(v466.TEXTURE_2D, v466.TEXTURE_MAG_FILTER, v466.NEAREST);
      v466.texParameteri(v466.TEXTURE_2D, v466.TEXTURE_MIN_FILTER, v466.NEAREST);
      var v484 = v466.getAttribLocation(v468, "aVertexCoord");
      var v485 = v466.getAttribLocation(v468, "TexCoord");
      v466.enableVertexAttribArray(v484);
      v466.vertexAttribPointer(v484, 2, v466.FLOAT, false, 0, 0);
      v466.enableVertexAttribArray(v485);
      v466.vertexAttribPointer(v485, 2, v466.FLOAT, false, 0, 0);
      var v486 = v466.getUniformLocation(v468, "Texture");
      var v487 = v466.getUniformLocation(v468, "LUT");
      var v488 = v466.getUniformLocation(v468, "TextureSize");
      var v489 = v466.getUniformLocation(v468, "sTextureSize");
      v466.uniform1i(v486, 0);
      v466.uniform1i(v487, 1);
      v466.uniform2f(v488, 512, 512);
      v466.uniform2f(v489, 512, 512);
      v466.useProgram(shaderProgram);
      v466.activeTexture(v466.TEXTURE0);
      v466.bindTexture(v466.TEXTURE_2D, texture);
      f341(vO32.sHQX);
    };
    v483.src = "./img/hq4x.png";
  }
  v466.activeTexture(v466.TEXTURE0);
  v466.bindTexture(v466.TEXTURE_2D, texture);
  v466.uniform1i(v482, 0);
}
function f381(p448) {
  if (v466 != null && v468 != null) {
    if (v470) {
      f87("抱歉，显卡加速失败，画质提升不可用");
    }
    if (p448 && v470 == 0) {
      vLN49 = 4;
      v461.width = vLN0109 * vLN49;
      v461.height = vLN0110 * vLN49;
      v466.useProgram(v468);
      v466.viewport(0, 0, vLN0109 * vLN49, vLN0110 * vLN49);
    } else {
      vLN49 = 1;
      v461.width = vLN0109;
      v461.height = vLN0110;
      v466.activeTexture(v466.TEXTURE0);
      v466.bindTexture(v466.TEXTURE_2D, texture);
      v466.useProgram(shaderProgram);
      v466.viewport(0, 0, vLN0109, vLN0110);
    }
  }
}
function f382(p449) {
  v466.texSubImage2D(v466.TEXTURE_2D, 0, 0, 0, vLN0109, vLN0110, v466.RGBA, v466.UNSIGNED_SHORT_5_5_5_1, p449);
  v466.drawArrays(v466.TRIANGLES, 0, 6);
}
var vLN739 = 739;
var v490 = Math.ceil(Math.random() * 10000000);
function f383(p450, p451, p452) {
  return p450.split(p451).join(p452);
}
function f384(p453) {
  var vLS_$ = "|}?{:><_)(*&!@#$%^~";
  var vLS1346580azhUObsoIETRc = "1346580azhUObsoIETRcfyy23f923f3n2";
  var v491 = vLS_$.length;
  var v492 = vLS_$.charAt(v490 / 2312 % v491);
  var v493 = vLS1346580azhUObsoIETRc.charAt(v490 / 2312 % v491);
  var v494 = vLS_$.charAt(v490 / 14251 % v491);
  var v495 = vLS1346580azhUObsoIETRc.charAt(v490 / 14251 % v491);
  var v496 = vLS_$.charAt(v490 / 685342 % v491);
  var v497 = vLS1346580azhUObsoIETRc.charAt(v490 / 685342 % v491);
  var v498 = vLS_$.charAt(v490 / 124 % v491);
  var v499 = vLS1346580azhUObsoIETRc.charAt(v490 / 124 % v491);
  p453 = f383(p453 = f383(p453 = f383(p453 = f383(p453, v492, v493), v494, v495), v496, v497), v498, v499);
  return window.atob(p453);
}
function f385(p454) {
  if (p454.data.byteLength != 4) {
    if (p454.data.byteLength != 24) {
      if (vLN014 == 1 && p454.data.byteLength < 2048) {
        f161(p454.data);
      } else {
        if (++vLN093 % vO32.gGesSpeed == 0) {
          var vGetAutoPlay = GetAutoPlay();
          if (vGetAutoPlay != null) {
            SendKey(vO17.$e, vGetAutoPlay);
          }
        }
        if (vLN093 < 5000 && (vLN093 == 1 && v187 && f313(), vLN093 % 59 == 0 && vO32.gSkipFrame == 1)) {
          var v500 = performance.now();
          if (vLN093 > 150 && vLN094 != 0) {
            if (v500 - vLN094 >= 1200 && vLN111 > 0) {
              f310();
            } else if (vLN014 == 1 && v500 - vLN094 >= 1560) {
              f310();
            }
          }
          vLN094 = v500;
        }
        if (v417) {
          var v501 = false;
          var v502 = new Int16Array(p454.data, 0, 2048);
          if (vLN0100 > 0 && vLN0101 == 0) {
            v421.set(v424);
            v420.set(v423);
            vLN0101 = vLN0100;
            vLN0100 = 0;
          }
          for (var vLN0111 = 0; vLN0111 < vLN739; vLN0111++) {
            if (vLN4096 <= vLN0101) {
              if (vLN4096 / 2 <= vLN0100 && vLN014 != 1 && v501 == 0) {
                SendCommand(vO30.Nn, 0, 0);
                v501 = true;
              }
              if (vLN4096 <= vLN0100) {
                break;
              }
              v424[vLN0100] = v502[vLN0111 * 2] / 32768;
              v423[vLN0100] = v502[vLN0111 * 2 + 1] / 32768;
              vLN0100++;
            } else {
              v421[vLN0101] = v502[vLN0111 * 2] / 32768;
              v420[vLN0101] = v502[vLN0111 * 2 + 1] / 32768;
              vLN0101++;
            }
          }
        }
        if (p454.data.byteLength > 4096) {
          var v503 = new Uint16Array(p454.data, 4096);
          v466.texSubImage2D(v466.TEXTURE_2D, 0, 0, 0, v461.width, v461.height, v466.RGBA, v466.UNSIGNED_SHORT_5_5_5_1, v503);
          v466.drawArrays(v466.TRIANGLES, 0, 6);
        }
        if (v187) {
          // TOLOOK
          setTimeout(f135, 5);
        }
      }
    }
  } else {
    ProcessRecvCommand(p454.data);
  }
}
function f386(p455, p456) {
  var v504 = 512 / p455;
  var v505 = 512 / p456;
  if (v469) {
    v506 = "#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\nCOMPAT_VARYING     vec2 VARps;\nCOMPAT_VARYING     vec4 _t3;\nCOMPAT_VARYING     vec4 _t2;\nCOMPAT_VARYING     vec4 _t1;\nCOMPAT_VARYING     vec2 _texCoord1;\nCOMPAT_VARYING     vec4 _color1;\nCOMPAT_VARYING     vec4 _position1;\nstruct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n};\nstruct out_vertex {\n    vec4 _position1;\n    vec4 _color1;\n    vec2 _texCoord1;\n    vec4 _t1;\n    vec4 _t2;\n    vec4 _t3;\n    vec2 VARps;\n};\nout_vertex _ret_0;\ninput_dummy _IN1;\nvec4 _r0010;\nvec4 _v0010;\nCOMPAT_ATTRIBUTE vec4 aVertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 TEX1;\nCOMPAT_VARYING vec4 TEX2;\nCOMPAT_VARYING vec4 TEX3;\n \nuniform COMPAT_PRECISION vec2 TextureSize;\nvoid main()\n{\n    out_vertex _OUT;\n    vec2 _ps;\n    _OUT._position1 = vec4((aVertexCoord.y * 2.0 * " + v505 + ") - 1.0, 0.0 - ((aVertexCoord.x * 2.0 * " + v504 + ") * -1.0 + 1.0), 0, 1);\n    _ps = 1.00000000E+00/TextureSize;\n    _OUT._t1 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(-_ps.y)));\n    _OUT._t2 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), 0.00000000E+00);\n    _OUT._t3 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(_ps.y)));\n    _ret_0._position1 = _OUT._position1;\n    _ret_0._color1 = COLOR;\n    _ret_0._texCoord1 = TexCoord.xy;\n    _ret_0._t1 = _OUT._t1;\n    _ret_0._t2 = _OUT._t2;\n    _ret_0._t3 = _OUT._t3;\n    VARps = _ps;\n    gl_Position = _OUT._position1;\n    COL0 = COLOR;\n    TEX0.xy = TexCoord.xy;\n    TEX1 = _OUT._t1;\n    TEX2 = _OUT._t2;\n    TEX3 = _OUT._t3;\n    return;\n    COL0 = _ret_0._color1;\n    TEX0.xy = _ret_0._texCoord1;\n    TEX1 = _ret_0._t1;\n    TEX2 = _ret_0._t2;\n    TEX3 = _ret_0._t3;\n    return;\n} ";
  } else {
    var v506 = "#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\nCOMPAT_VARYING     vec2 VARps;\nCOMPAT_VARYING     vec4 _t3;\nCOMPAT_VARYING     vec4 _t2;\nCOMPAT_VARYING     vec4 _t1;\nCOMPAT_VARYING     vec2 _texCoord1;\nCOMPAT_VARYING     vec4 _color1;\nCOMPAT_VARYING     vec4 _position1;\nstruct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n};\nstruct out_vertex {\n    vec4 _position1;\n    vec4 _color1;\n    vec2 _texCoord1;\n    vec4 _t1;\n    vec4 _t2;\n    vec4 _t3;\n    vec2 VARps;\n};\nout_vertex _ret_0;\ninput_dummy _IN1;\nvec4 _r0010;\nvec4 _v0010;\nCOMPAT_ATTRIBUTE vec4 aVertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 TEX1;\nCOMPAT_VARYING vec4 TEX2;\nCOMPAT_VARYING vec4 TEX3;\n \nuniform COMPAT_PRECISION vec2 TextureSize;\nvoid main()\n{\n    out_vertex _OUT;\n    vec2 _ps;\n    _OUT._position1 = vec4((aVertexCoord.x * 2.0 * " + v504 + ".0) - 1.0, (aVertexCoord.y * 2.0 * " + v505 + ") * -1.0 + 1.0, 0, 1);\n    _ps = 1.00000000E+00/TextureSize;\n    _OUT._t1 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(-_ps.y)));\n    _OUT._t2 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), 0.00000000E+00);\n    _OUT._t3 = TexCoord.xxxy + vec4(float(float(-_ps.x)), 0.00000000E+00, float(float(_ps.x)), float(float(_ps.y)));\n    _ret_0._position1 = _OUT._position1;\n    _ret_0._color1 = COLOR;\n    _ret_0._texCoord1 = TexCoord.xy;\n    _ret_0._t1 = _OUT._t1;\n    _ret_0._t2 = _OUT._t2;\n    _ret_0._t3 = _OUT._t3;\n    VARps = _ps;\n    gl_Position = _OUT._position1;\n    COL0 = COLOR;\n    TEX0.xy = TexCoord.xy;\n    TEX1 = _OUT._t1;\n    TEX2 = _OUT._t2;\n    TEX3 = _OUT._t3;\n    return;\n    COL0 = _ret_0._color1;\n    TEX0.xy = _ret_0._texCoord1;\n    TEX1 = _ret_0._t1;\n    TEX2 = _ret_0._t2;\n    TEX3 = _ret_0._t3;\n    return;\n} ";
  }
  return v506;
}
var vLSif__VERSION__130defi = "#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\nCOMPAT_VARYING     vec2 VARps;\nCOMPAT_VARYING     vec4 _t3;\nCOMPAT_VARYING     vec4 _t2;\nCOMPAT_VARYING     vec4 _t1;\nCOMPAT_VARYING     vec2 _texCoord;\nCOMPAT_VARYING     vec4 _color;\nstruct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n};\nstruct out_vertex {\n    vec4 _color;\n    vec2 _texCoord;\n    vec4 _t1;\n    vec4 _t2;\n    vec4 _t3;\n    vec2 VARps;\n};\nvec4 _ret_0;\nfloat _TMP44;\nvec4 _TMP40;\nfloat _TMP39;\nfloat _TMP37;\nvec2 _TMP38;\nfloat _TMP36;\nfloat _TMP35;\nfloat _TMP34;\nfloat _TMP43;\nbool _TMP33;\nbool _TMP32;\nbool _TMP31;\nbool _TMP30;\nvec3 _TMP42;\nbool _TMP29;\nbool _TMP28;\nbool _TMP27;\nbool _TMP26;\nbool _TMP25;\nbool _TMP24;\nbool _TMP23;\nbool _TMP22;\nvec4 _TMP20;\nvec4 _TMP18;\nvec4 _TMP16;\nvec4 _TMP14;\nvec4 _TMP11;\nvec4 _TMP9;\nvec4 _TMP7;\nvec4 _TMP5;\nvec4 _TMP4;\nvec4 _TMP3;\nvec4 _TMP2;\nvec4 _TMP1;\nvec2 _TMP0;\nout_vertex _VAR1;\nuniform sampler2D Texture;\ninput_dummy _IN1;\nuniform sampler2D LUT;\nvec2 _x0063;\nvec2 _val0065;\nvec2 _a0065;\nvec2 _c0069;\nvec2 _c0071;\nvec2 _c0073;\nvec3 _r0077;\nvec3 _v0077;\nvec3 _r0087;\nvec3 _v0087;\nvec3 _r0097;\nvec3 _v0097;\nvec3 _r0107;\nvec3 _v0107;\nvec3 _r0115;\nvec3 _v0115;\nvec3 _r0125;\nvec3 _v0125;\nvec3 _r0135;\nvec3 _v0135;\nvec3 _r0145;\nvec3 _v0145;\nvec3 _r0155;\nvec3 _v0155;\nbvec3 _res0163;\nvec3 _a0165;\nbvec3 _res0167;\nvec3 _a0169;\nbvec3 _res0171;\nvec3 _a0173;\nbvec3 _res0175;\nvec3 _a0177;\nbvec3 _res0179;\nvec3 _a0181;\nbvec3 _res0183;\nvec3 _a0185;\nbvec3 _res0187;\nvec3 _a0189;\nbvec3 _res0191;\nvec3 _a0193;\nbvec3 _res0195;\nvec3 _a0197;\nbvec3 _res0199;\nvec3 _a0201;\nbvec3 _res0203;\nvec3 _a0205;\nbvec3 _res0207;\nvec3 _a0209;\nvec3 _a0211;\nvec3 _a0213;\nvec3 _a0215;\nvec4 _a0217;\nvec2 _x0219;\nvec2 _c0223;\nvec3 _r0229;\nvec4 _v0229;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 TEX1;\nCOMPAT_VARYING vec4 TEX2;\nCOMPAT_VARYING vec4 TEX3;\n \nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 sTextureSize;\nvoid main()\n{\n    vec2 _fp;\n    vec2 _quad;\n    vec3 _w1;\n    vec3 _w2;\n    vec3 _w3;\n    vec3 _w4;\n    vec3 _w5;\n    vec3 _w6;\n    vec3 _w7;\n    vec3 _w8;\n    vec3 _w9;\n    bvec4 _cross;\n    vec2 _index;\n    vec4 _weights;\n    float _sum;\n    bvec3 _TMP50[3];\n    _x0063 = TEX0.xy*TextureSize;\n    _fp = fract(_x0063);\n    _a0065 = -5.00000000E-01 + _fp;\n    _val0065 = vec2(float((_a0065.x > 0.00000000E+00)), float((_a0065.y > 0.00000000E+00)));\n    _TMP0 = _val0065 - vec2(float((_a0065.x < 0.00000000E+00)), float((_a0065.y < 0.00000000E+00)));\n    _quad = vec2(float(_TMP0.x), float(_TMP0.y));\n    _TMP1 = COMPAT_TEXTURE(Texture, TEX0.xy);\n    _c0069 = TEX0.xy + vec2(VARps.x, VARps.y)*vec2(float(_quad.x), float(_quad.y));\n    _TMP2 = COMPAT_TEXTURE(Texture, _c0069);\n    _c0071 = TEX0.xy + vec2(VARps.x, 0.00000000E+00)*vec2(float(_quad.x), float(_quad.y));\n    _TMP3 = COMPAT_TEXTURE(Texture, _c0071);\n    _c0073 = TEX0.xy + vec2(0.00000000E+00, VARps.y)*vec2(float(_quad.x), float(_quad.y));\n    _TMP4 = COMPAT_TEXTURE(Texture, _c0073);\n    _TMP5 = COMPAT_TEXTURE(Texture, TEX1.xw);\n    _v0077 = vec3(float(_TMP5.x), float(_TMP5.y), float(_TMP5.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0077.x), float(_v0077.y), float(_v0077.z)));\n    _r0077.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0077.x), float(_v0077.y), float(_v0077.z)));\n    _r0077.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0077.x), float(_v0077.y), float(_v0077.z)));\n    _r0077.z = float(_TMP43);\n    _w1 = vec3(float(_r0077.x), float(_r0077.y), float(_r0077.z));\n    _TMP7 = COMPAT_TEXTURE(Texture, TEX1.yw);\n    _v0087 = vec3(float(_TMP7.x), float(_TMP7.y), float(_TMP7.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0087.x), float(_v0087.y), float(_v0087.z)));\n    _r0087.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0087.x), float(_v0087.y), float(_v0087.z)));\n    _r0087.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0087.x), float(_v0087.y), float(_v0087.z)));\n    _r0087.z = float(_TMP43);\n    _w2 = vec3(float(_r0087.x), float(_r0087.y), float(_r0087.z));\n    _TMP9 = COMPAT_TEXTURE(Texture, TEX1.zw);\n    _v0097 = vec3(float(_TMP9.x), float(_TMP9.y), float(_TMP9.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0097.x), float(_v0097.y), float(_v0097.z)));\n    _r0097.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0097.x), float(_v0097.y), float(_v0097.z)));\n    _r0097.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0097.x), float(_v0097.y), float(_v0097.z)));\n    _r0097.z = float(_TMP43);\n    _w3 = vec3(float(_r0097.x), float(_r0097.y), float(_r0097.z));\n    _TMP11 = COMPAT_TEXTURE(Texture, TEX2.xw);\n    _v0107 = vec3(float(_TMP11.x), float(_TMP11.y), float(_TMP11.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0107.x), float(_v0107.y), float(_v0107.z)));\n    _r0107.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0107.x), float(_v0107.y), float(_v0107.z)));\n    _r0107.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0107.x), float(_v0107.y), float(_v0107.z)));\n    _r0107.z = float(_TMP43);\n    _w4 = vec3(float(_r0107.x), float(_r0107.y), float(_r0107.z));\n    _v0115 = vec3(float(_TMP1.x), float(_TMP1.y), float(_TMP1.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0115.x), float(_v0115.y), float(_v0115.z)));\n    _r0115.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0115.x), float(_v0115.y), float(_v0115.z)));\n    _r0115.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0115.x), float(_v0115.y), float(_v0115.z)));\n    _r0115.z = float(_TMP43);\n    _w5 = vec3(float(_r0115.x), float(_r0115.y), float(_r0115.z));\n    _TMP14 = COMPAT_TEXTURE(Texture, TEX2.zw);\n    _v0125 = vec3(float(_TMP14.x), float(_TMP14.y), float(_TMP14.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0125.x), float(_v0125.y), float(_v0125.z)));\n    _r0125.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0125.x), float(_v0125.y), float(_v0125.z)));\n    _r0125.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0125.x), float(_v0125.y), float(_v0125.z)));\n    _r0125.z = float(_TMP43);\n    _w6 = vec3(float(_r0125.x), float(_r0125.y), float(_r0125.z));\n    _TMP16 = COMPAT_TEXTURE(Texture, TEX3.xw);\n    _v0135 = vec3(float(_TMP16.x), float(_TMP16.y), float(_TMP16.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0135.x), float(_v0135.y), float(_v0135.z)));\n    _r0135.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0135.x), float(_v0135.y), float(_v0135.z)));\n    _r0135.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0135.x), float(_v0135.y), float(_v0135.z)));\n    _r0135.z = float(_TMP43);\n    _w7 = vec3(float(_r0135.x), float(_r0135.y), float(_r0135.z));\n    _TMP18 = COMPAT_TEXTURE(Texture, TEX3.yw);\n    _v0145 = vec3(float(_TMP18.x), float(_TMP18.y), float(_TMP18.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0145.x), float(_v0145.y), float(_v0145.z)));\n    _r0145.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0145.x), float(_v0145.y), float(_v0145.z)));\n    _r0145.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0145.x), float(_v0145.y), float(_v0145.z)));\n    _r0145.z = float(_TMP43);\n    _w8 = vec3(float(_r0145.x), float(_r0145.y), float(_r0145.z));\n    _TMP20 = COMPAT_TEXTURE(Texture, TEX3.zw);\n    _v0155 = vec3(float(_TMP20.x), float(_TMP20.y), float(_TMP20.z));\n    _TMP43 = dot(vec3( 2.99072266E-01, 5.86914062E-01, 1.14013672E-01), vec3(float(_v0155.x), float(_v0155.y), float(_v0155.z)));\n    _r0155.x = float(_TMP43);\n    _TMP43 = dot(vec3( -1.68945312E-01, -3.31054688E-01, 5.00000000E-01), vec3(float(_v0155.x), float(_v0155.y), float(_v0155.z)));\n    _r0155.y = float(_TMP43);\n    _TMP43 = dot(vec3( 5.00000000E-01, -4.18945312E-01, -8.09936523E-02), vec3(float(_v0155.x), float(_v0155.y), float(_v0155.z)));\n    _r0155.z = float(_TMP43);\n    _w9 = vec3(float(_r0155.x), float(_r0155.y), float(_r0155.z));\n    _a0165 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w1 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0165);\n    _res0163 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP22 = _res0163.x || _res0163.y || _res0163.z;\n    _a0169 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w2 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0169);\n    _res0167 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP23 = _res0167.x || _res0167.y || _res0167.z;\n    _a0173 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w3 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0173);\n    _res0171 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP24 = _res0171.x || _res0171.y || _res0171.z;\n    _a0177 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w4 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0177);\n    _res0175 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP25 = _res0175.x || _res0175.y || _res0175.z;\n    _a0181 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w6 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0181);\n    _res0179 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP26 = _res0179.x || _res0179.y || _res0179.z;\n    _a0185 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w7 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0185);\n    _res0183 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP27 = _res0183.x || _res0183.y || _res0183.z;\n    _a0189 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w8 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0189);\n    _res0187 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP28 = _res0187.x || _res0187.y || _res0187.z;\n    _a0193 = (_w5 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w9 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0193);\n    _res0191 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP29 = _res0191.x || _res0191.y || _res0191.z;\n    _TMP50[0] = bvec3(_TMP22, _TMP23, _TMP24);\n    _TMP50[1] = bvec3(_TMP25, false, _TMP26);\n    _TMP50[2] = bvec3(_TMP27, _TMP28, _TMP29);\n    _a0197 = (_w4 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w2 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0197);\n    _res0195 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP30 = _res0195.x || _res0195.y || _res0195.z;\n    _a0201 = (_w2 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w6 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0201);\n    _res0199 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP31 = _res0199.x || _res0199.y || _res0199.z;\n    _a0205 = (_w8 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w4 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0205);\n    _res0203 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP32 = _res0203.x || _res0203.y || _res0203.z;\n    _a0209 = (_w6 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01)) - (_w8 + vec3( 0.00000000E+00, 5.00000000E-01, 5.00000000E-01));\n    _TMP42 = abs(_a0209);\n    _res0207 = bvec3(_TMP42.x > 1.88232422E-01, _TMP42.y > 2.74505615E-02, _TMP42.z > 2.35290527E-02);\n    _TMP33 = _res0207.x || _res0207.y || _res0207.z;\n    _cross = bvec4(_TMP30, _TMP31, _TMP32, _TMP33);\n    _a0211 = vec3(float(_TMP50[0].x), float(_TMP50[0].y), float(_TMP50[0].z));\n    _TMP43 = dot(vec3(float(_a0211.x), float(_a0211.y), float(_a0211.z)), vec3( 1.00000000E+00, 2.00000000E+00, 4.00000000E+00));\n    _TMP34 = float(_TMP43);\n    _a0213 = vec3(float(_TMP50[1].x), float(_TMP50[1].y), float(_TMP50[1].z));\n    _TMP43 = dot(vec3(float(_a0213.x), float(_a0213.y), float(_a0213.z)), vec3( 8.00000000E+00, 0.00000000E+00, 1.60000000E+01));\n    _TMP35 = float(_TMP43);\n    _a0215 = vec3(float(_TMP50[2].x), float(_TMP50[2].y), float(_TMP50[2].z));\n    _TMP43 = dot(vec3(float(_a0215.x), float(_a0215.y), float(_a0215.z)), vec3( 3.20000000E+01, 6.40000000E+01, 1.28000000E+02));\n    _TMP36 = float(_TMP43);\n    _index.x = _TMP34 + _TMP35 + _TMP36;\n    _a0217 = vec4(float(_cross.x), float(_cross.y), float(_cross.z), float(_cross.w));\n    _TMP44 = dot(vec4(float(_a0217.x), float(_a0217.y), float(_a0217.z), float(_a0217.w)), vec4( 1.00000000E+00, 2.00000000E+00, 4.00000000E+00, 8.00000000E+00));\n    _TMP37 = float(_TMP44);\n    _x0219 = _fp*4.00000000E+00;\n    _TMP38 = floor(_x0219);\n    _TMP39 = dot(_TMP38, vec2( 1.00000000E+00, 4.00000000E+00));\n    _index.y = float((float((_TMP37*1.60000000E+01)) + _TMP39));\n    _c0223 = vec2(float((_index*vec2( 3.90625000E-03, 3.90625000E-03) + vec2( 1.95312500E-03, 1.95312500E-03)).x), float((_index*vec2( 3.90625000E-03, 3.90625000E-03) + vec2( 1.95312500E-03, 1.95312500E-03)).y));\n    _TMP40 = COMPAT_TEXTURE(LUT, _c0223);\n    _weights = vec4(float(_TMP40.x), float(_TMP40.y), float(_TMP40.z), float(_TMP40.w));\n    _TMP44 = dot(vec4(float(_weights.x), float(_weights.y), float(_weights.z), float(_weights.w)), vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _sum = float(_TMP44);\n    _v0229 = vec4(float((_weights/_sum).x), float((_weights/_sum).y), float((_weights/_sum).z), float((_weights/_sum).w));\n    _r0229 = _v0229.x*_TMP1.xyz;\n    _r0229 = _r0229 + _v0229.y*_TMP2.xyz;\n    _r0229 = _r0229 + _v0229.z*_TMP3.xyz;\n    _r0229 = _r0229 + _v0229.w*_TMP4.xyz;\n    _ret_0 = vec4(_r0229.x, _r0229.y, _r0229.z, 1.00000000E+00);\n    FragColor = _ret_0;\n    return;\n} ";