function fn<T>(a:T[]):T{
    return a[0]// 받은 배열의 첫번째 요소를 출력해주는 함수
}

let data = fn([4,2])
console.log(typeof data) //number 