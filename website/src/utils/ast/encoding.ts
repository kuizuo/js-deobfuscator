import CryptoJS from 'crypto-js'

export const Base64 = {
  encode: function (word: string) {
    var src = CryptoJS.enc.Utf8.parse(word)
    return CryptoJS.enc.Base64.stringify(src)
  },
  decode: function (word: string) {
    var src = CryptoJS.enc.Base64.parse(word)
    return CryptoJS.enc.Utf8.stringify(src)
  },
}