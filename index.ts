
// 받은 문자열이 0으로시작한다면 0을제거하고 반환 하는 함수를 만들어라
function cutZero(str:string):string{
    str = str.replace(/0/,"")
    return str;
}

console.log(cutZero('0hih'))

// 문자열을 받으면 - 를 제거해서 숫자로 반환하는 함수를 만들어라
type myType = (str:string)=>number
let removeDash:myType = (str)=>{
    str = str.replace(/-/g,"");
    return parseInt(str);
}
console.log(removeDash('010-2220-1212'))


type All = (str:string,callback1:(str:string)=>string,callback2:(str:string)=>number)=>number

let AllFn:All = (str,callback1,callback2)=>{
    return callback2(callback1(str));
}
console.log(AllFn('010-1111-2222', cutZero, removeDash));