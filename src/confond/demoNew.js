Date.prototype.format = function (formatStr, str, Week) {
  return str = (str = (str = (Week = (str = formatStr, ['日', '一', '二', '三', '四', '五', '六']), str).replace(/yyyy|YYYY/, this.getFullYear()), str).replace(/MM/, this.getMonth() + 1 > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1)), str).replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate()), str;
};

console.log(new Date().format('yyyy-MM-dd')); //输出结果 2020-07-04