function foo() {
  const k = {
    c: 0x2F2,
    d: '0x396',
    e: '0x397',
    f: '0x39a',
    g: '0x39d',
    h: 0x398,
    l: 0x394,
    m: '0x39b',
    n: '0x39f',
    o: 0x395,
    p: 0x395,
    q: 0x399,
    r: '0x399',
  }
  const c = i(k.d, k.e)
  const d = i(k.f, k.g)
  const e = i(k.h, k.l)
  const f = i(k.m, k.n)
  function i(c, d) {
    return b(c - k.c, d)
  }
  const g = i(k.o, k.p)
  const h = i(k.q, k.r)
}
function j(c, d) {
  const l = { c: 0x14B }
  return b(c - -l.c, d)
}
console[j(-'0xa6', -'0xa6')](foo())
function b(c, d) {
  const e = a()
  b = function (f, g) {
    f = f - 0xA3
    const h = e[f]
    return h
  }
  return b(c, d)
}
function a() {
  const m = [
    'string5',
    'string1',
    'log',
    'string3',
    'string6',
    'string2',
    'string4',
  ]
  a = function () {
    return m
  }
  return a()
}
