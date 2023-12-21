(function (c, d) {
  const e = c()
  function i(c, d) {
    return b(c - 0xFE, d)
  }
  function h(c, d) {
    return b(d - 0x18, c)
  }
  while ([]) {
    try {
      const f = -Number.parseInt(h(0x1F2, 0x1EE)) / 0x1 * (-Number.parseInt(h(0x1E3, 0x1E7)) / 0x2) + Number.parseInt(h(0x1E7, 0x1E8)) / 0x3 * (Number.parseInt(h(0x1EE, 0x1EB)) / 0x4) + Number.parseInt(i(0x2D2, 0x2D5)) / 0x5 + Number.parseInt(h(0x1EA, 0x1EA)) / 0x6 + Number.parseInt(h(0x1E9, 0x1E6)) / 0x7 + -Number.parseInt(h(0x1EE, 0x1ED)) / 0x8 + -Number.parseInt(h(0x1ED, 0x1E9)) / 0x9
      if (f === d)
        break
      else
        e.push(e.shift())
    }
    catch (g) {
      e.push(e.shift())
    }
  }
}(a, 0xC71DF))
function a() {
  const l = [
    '26lXZnwX',
    '7665TFaIau',
    '41173479smVmSq',
    '8671866UKJeoQ',
    '2248AbRzil',
    '4815390FpneTs',
    '8173520gTrJtD',
    '93523fumJGz',
    'log',
    'Hello\x20World!',
    '9464042oOXGKH',
  ]
  a = function () {
    return l
  }
  return a()
}
function b(c, d) {
  const e = a()
  return b = function (f, g) {
    f = f - 0x1CC
    const h = e[f]
    return h
  }, b(c, d)
}
function hi() {
  console[j(0x175, 0x170)](j(0x176, 0x179))
  function k(c, d) {
    return b(d - -0x33, c)
  }
  console[j(0x175, 0x17A)](0x1E)
  function j(c, d) {
    return b(c - -0x57, d)
  }
  console[j(0x175, 0x172)](undefined)
  function notAWrapper(c, d) {
    return j(0x175, 0x172)
  }
  console[j(0x175, 0x172)](notAWrapper(foo(), bar()))
}
hi()
