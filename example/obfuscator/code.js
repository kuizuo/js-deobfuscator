Date.prototype.format = function (formatStr) {
  var str = formatStr;

  let obj = {
    name: 'kuizuo',
    age: 20
  }
  console.log(obj)
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/MM/, (this.getMonth() + 1).toString().padStart(2, '0'));
  str = str.replace(/dd|DD/, this.getDate().toString().padStart(2, '0'));
  return str;
};
console.log(new Date().format('yyyy-MM-dd'));