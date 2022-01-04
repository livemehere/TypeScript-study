// 받은 문자열이 0으로시작한다면 0을제거하고 반환 하는 함수를 만들어라
function cutZero(str) {
    str = str.replace(/0/, "");
    return str;
}
console.log(cutZero('0hih'));
var removeDash = function (str) {
    str = str.replace(/-/g, "");
    return parseInt(str);
};
console.log(removeDash('010-2220-1212'));
var AllFn = function (str, callback1, callback2) {
    return callback2(callback1(str));
};
console.log(AllFn('010-1111-2222', cutZero, removeDash));
