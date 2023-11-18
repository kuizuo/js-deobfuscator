import { describe, expect, it } from 'vitest'
import { Deob } from '../main'

describe('deob', async () => {
  it('splitMultipleDeclarations', () => {
    const rawCode = `var a = 1, b = 2;`

    const deob = new Deob(rawCode)

    deob.splitMultipleDeclarations()
    const code = deob.getCode()

    expect(code).toBe(`
var a = 1;
var b = 2;`.trim())
  })

  it('transformForLoop', () => {
    const rawCode = `for (a = 1, w = "2|1|2|3"["split"]("|"), void 0;;) {
      var a;
      var w;
      break;
    }`

    const deob = new Deob(rawCode)

    deob.transformForLoop()
    const code = deob.getCode()

    expect(code).toBe(`
var a = 1;
var w = "2|1|2|3"["split"]("|");

for (void 0;;) {
  break;
}`.trim())
  })

  it('deleteExtra', () => {
    const rawCode = `
          console.log("\x6B\x75\x69\x7A\x75\x6F")
    `

    const deob = new Deob(rawCode)

    deob.deleteExtra()
    const code = deob.getCode()

    expect(code).toBe(`console.log("kuizuo");`)
  })

  it('removeUnusedBlock', () => {
    const rawCode = `
        if(false){ 
          console.log("foo")
        } else {
          console.log("bar")
        }
    `

    const deob = new Deob(rawCode)

    deob.removeUnusedBlock()
    const code = deob.getCode()

    expect(code).toBe(`console.log("bar");`)
  })

  it('removeUnusedVariables', () => {
    const rawCode = `
      let a = 1;
    `

    const deob = new Deob(rawCode)

    deob.removeUnusedVariables(null, false)
    const code = deob.getCode()

    expect(code).toBe('')
  })

  it('calcBinary', () => {
    const rawCode = `
    let a = 1 + 2;
    let b = "debu" + "gger" 

    let c = !![];
    let d = ![] ; 
    `

    const deob = new Deob(rawCode)

    deob.calcBinary()
    const code = deob.getCode()

    expect(code).toBe(
      `
let a = 3;
let b = "debugger";

let c = true;
let d = false;
    `.trim(),
    )
  })

  it('replaceConstant', () => {
    const rawCode = `
    let a = "debugger";
    console.log(a)
    `

    const deob = new Deob(rawCode)

    deob.replaceConstant()
    const code = deob.getCode()

    expect(code).toBe(`console.log("debugger");`)
  })

  it('switchFlat', () => {
    const rawCode = `
    function a() {
      var _0x263cfa = "1|3|2|0"["split"]("|"),
        _0x105b9b = 0;
  
      while (true) {
        switch (_0x263cfa[_0x105b9b++]) {
          case "0":
            return _0x4b70fb;
  
          case "1":
            if (_0x3d66ff !== "link" && _0x3d66ff !== "script") {
              return;
            }
  
            continue;
  
          case "2":
            _0x4b70fb["charset"] = "utf-8";
            continue;
  
          case "3":
            var _0x4b70fb = document["createElement"](_0x3d66ff);
  
            continue;
        }
  
        break;
      }
    }
    `

    const deob = new Deob(rawCode)

    deob.switchFlat()
    const code = deob.getCode()

    expect(code).toBe(
      `
function a() {
  var _0x105b9b = 0;

  if (_0x3d66ff !== "link" && _0x3d66ff !== "script") {
    return;
  }

  var _0x4b70fb = document["createElement"](_0x3d66ff);

  _0x4b70fb["charset"] = "utf-8";
  return _0x4b70fb;
}`.trim(),
    )
  })

  it('selfCallFnReplace', () => {
    const rawCode = `
(function (_0x4f0d08) {
      return function (_0x4f0d08) {
        return Function("Function(arguments[0]+" + _0x4f0d08 + ")()");
      }(_0x4f0d08);
    })("bugger")("de");
    `

    const deob = new Deob(rawCode)

    deob.selfCallFnReplace()
    const code = deob.getCode()

    expect(code).toBe(
      `Function("Function(arguments[0]+" + "bugger" + ")()")("de");`,
    )
  })

  it('objectMemberReplace', () => {
    const rawCode = `
    var _0x52627b = {
      'QqaUY': "attribute",
      'SDgrw': function (_0x45e680) {
         return _0x45e680();
      },
      'GOEUR': function (_0xeaa58e, _0x247ba7) {
         return _0xeaa58e + _0x247ba7;
      }
    }
     
_0x52627b["QqaUY"]
_0x52627b["SDgrw"](_0x4547db)
_0x52627b["GOEUR"](a, b)
`

    const deob = new Deob(rawCode)

    deob.saveAllObject()
    deob.objectMemberReplace()
    deob.removeUnusedVariables(null, false)
    const code = deob.getCode()

    expect(code).toBe(
      `
"attribute";

_0x4547db();

a + b;`.trim(),
    )
  })
})
