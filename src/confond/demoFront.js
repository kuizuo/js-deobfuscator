(function (myArr, num) {
  var kuizuo = function (nums) {
    while (--nums) {
      myArr.push(myArr.shift());
    }
  };
  kuizuo(++num);
}(arr, 0x10));