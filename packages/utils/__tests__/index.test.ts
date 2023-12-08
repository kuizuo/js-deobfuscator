import { describe, expect, it } from 'vitest'
import { Deob } from '../main'

describe('deob', async () => {
  it('nestedFnReplace', () => {
    const rawCode = `
    function _0x49afe4(_0x254ae1, _0x559602, _0x3dfa50, _0x13ee81) {
      return _0x4698(_0x13ee81 - -674, _0x3dfa50);
    };

    var _0x50abcd = function (_0x254ae1, _0x559602, _0x3dfa50, _0x13ee81) {
      return _0x4698(_0x13ee81 - -555, _0x3dfa50);
    };
    _0x49afe4(-57, 1080, 828, 469)
    _0x50abcd(-57, 1080, 424, 570)
    `

    const deob = new Deob(rawCode)

    deob.nestedFnReplace()

    const code = deob.getCode()

    expect(code).toContain(`_0x4698(469 - -674, 828);`)
    expect(code).toContain(`_0x4698(570 - -555, 424);`)
  })

  it('findDecryptFnByCallCount', () => {
    const rawCode = `
    function _0x4698(_0x254ae1){
      return atob(_0x254ae1)
    }

    _0x4698("SGVsbG8sIHdvcmxk")
    _0x4698("ZGVidWdnZXI=")
    `

    const deob = new Deob(rawCode)

    const decryptFnCode = deob.findDecryptFnByCallCount(2, true)
    deob.decryptReplace(decryptFnCode)

    const code = deob.getCode()
    expect(code).toContain(`Hello, world`)
    expect(code).toContain(`debugger`)
  })

  it('findDecryptFnByBigArr', () => {
    const rawCode = `
    var arr = ["hello,world", "debugger"]
    function _0x4698(i){
      return arr[i]
    }

    _0x4698(0)
    _0x4698(1)
    `

    const deob = new Deob(rawCode)

    const decryptFnCode = deob.findDecryptFnByBigArr (2, true)
    deob.decryptReplace(decryptFnCode)

    const code = deob.getCode()
    expect(code).toBe(`
"hello,world";
"debugger";
    `.trim())
  })

  it('evalCode', () => {
    const evalCode = `
    function foo(){
      return 'bar'
    }
  `

    const deob = new Deob(';')

    deob.evalCode(evalCode)
    const result = global.foo()

    expect(result).toBe(`bar`)
  })

  it('designDecryptFn', () => {
    const rawCode = `
      function foo() {}
      var bar = foo;
      
      bar()
    `

    const deob = new Deob(rawCode)

    deob.designDecryptFn('foo')

    const code = deob.getCode()

    expect(code).toBe(`
 function foo() {}

foo();`.trim())
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

  it('controlFlowFlat', () => {
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

    deob.controlFlowFlat()
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

  it('removeSelfCallFn', () => {
    const rawCode = `
    !function() {
     a()
    }();
    `

    const deob = new Deob(rawCode)

    deob.removeSelfCallFn()
    const code = deob.getCode()

    expect(code).toBe(`
{
  a();
}
    `.trim())
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

    expect(code).toBe(`Function("Function(arguments[0]+" + "bugger" + ")()")("de");`)
  })

  it('saveAllObject', () => {
    const rawCode = `
    var _0x52627b = {
      'QqaUY': "attribute",
      'SDgrw': function (_0x45e680) {
         return _0x45e680();
      },
    }

    var e = {};
    e["ESKQL"] = function (n, t) {
      return n ^ t;
    };
    var u = e;
    `

    const deob = new Deob(rawCode)

    deob.saveAllObject()

    const objects = deob.getAllObject()
    console.log(objects)
    expect(Object.keys(objects).length).toBe(2)
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

    expect(code).toContain(`"attribute";`)
    expect(code).toContain(`_0x4547db();`)
    expect(code).toContain(`a + b;`)
  })

  it('restoreSequence', () => {
    const rawCode = `_0x6cbcff(), console.log('foo')`
    const deob = new Deob(rawCode)

    deob.restoreSequence()
    const code = deob.getCode()

    expect(code).toBe(`
_0x6cbcff();

console.log('foo');
`.trim())
  })

  it('splitMultipleDeclarations', () => {
    const rawCode = `var a = 1, b = 2;`

    const deob = new Deob(rawCode)

    deob.splitMultipleDeclarations()
    const code = deob.getCode()

    expect(code).toBe(`
var a = 1;
var b = 2;`.trim())
  })

  it('calcBinary', () => {
    const rawCode = `
    let a = 1 + 2;
    let b = "debu" + "gger" 
    let c = !![];
    `

    const deob = new Deob(rawCode)

    deob.calcBinary()
    const code = deob.getCode()

    expect(code).toBe(
      `
let a = 3;
let b = "debugger";
let c = true;`.trim(),
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

  it('removeUnusedBlock', () => {
    const rawCode = `
        let a = "foo"
        if(true){ 
          let a = "bar"
        } else {
          // xxx
        }

        var result = false ? 'true' : 'false';
    `

    const deob = new Deob(rawCode)

    deob.removeUnusedBlock()
    const code = deob.getCode()

    expect(code).toContain(`let a = "foo"`)
    expect(code).toContain(`var result = 'false'`)
  })

  it('removeUnusedVariables', () => {
    const rawCode = `
      let a = 1;
      function b(){}
    `

    const deob = new Deob(rawCode)

    deob.removeUnusedVariables(null, false)
    const code = deob.getCode()

    expect(code).toBe('')
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

  it('removeSelfDefendingCode', () => {
    const rawCode = `
    var _0x318428 = function () {
      var _0x17ed27 = true;
      return function (_0x5a26f9, _0x2a79cb) {
        var _0x175044 = _0x17ed27 ? function () {
          if (_0x2a79cb) {
            var _0x421594 = _0x2a79cb["apply"](_0x5a26f9, arguments);
  
            _0x2a79cb = null;
            return _0x421594;
          }
        } : function () {};
  
        _0x17ed27 = false;
        return _0x175044;
      };
    }();  
  
    var _0x336d51 = _0x318428(this, function () {
      return _0x336d51["toString"]()["search"]("(((.+)+)+)+$")["toString"]()["constructor"](_0x336d51)["search"]("(((.+)+)+)+$");
    });
  
    _0x336d51();
    `

    const deob = new Deob(rawCode)

    deob.removeSelfDefendingCode()
    const code = deob.getCode()

    expect(code).toBe('')
  })
})
