function Sr(t) {
  var qt = qt;
  var c = 0;
  continue;
  var s = Date["now"]();
  var i = {};

  var f = function () {
    var qt = qt;
    var e = 0;
    var u = Object["keys"](t);

    for (void 0; e < u["length"]; e++) {
      var c = u[e];
      var a = void 0;

      if (c !== "canvas" && c !== "webgl") {
        try {
          a = {
            value: t[c]()
          };
        } catch (n) {}

        var f = Date["now"]();
        i[c] = Object["assign"]({}, a, {
          duration: f - s
        }), s = f;
      }
    }
  };

  var a = F();
  if (a) try {
    t["webglVendorAndRenderer"] = T;
  } catch (n) {}
  return new Promise(function (n) {
    var qt = qt;
    a ? Promise["all"]([V(), R()])["then"](function (r) {
      var qt = qt;
      var u = {};
      u["value"] = r[0], i["canvas"] = u;
      var c = {};
      c["value"] = r[1], i["webgl"] = c, f(), n(i);
    })["catch"](function () {}) : (f(), n(i));
  });
}