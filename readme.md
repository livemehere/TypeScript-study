# Typescript 익히기

### typescript 글로벌 설치

```bash
npm i -g typescript
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs"
  }
}
```

### ts to js

```bash
tsc -w
```

### tsconfig.json에 들어갈 기타항목들

[tsconfig](https://www.typescriptlang.org/tsconfig)

```json
{
  "compilerOptions": {
    "target": "es5", // 'es3', 'es5', 'es2015', 'es2016', 'es2017','es2018', 'esnext' 가능
    "module": "commonjs", //무슨 import 문법 쓸건지 'commonjs', 'amd', 'es2015', 'esnext'
    "allowJs": true, // js 파일들 ts에서 import해서 쓸 수 있는지
    "checkJs": true, // 일반 js 파일에서도 에러체크 여부
    "jsx": "preserve", // tsx 파일을 jsx로 어떻게 컴파일할 것인지 'preserve', 'react-native', 'react'
    "declaration": true, //컴파일시 .d.ts 파일도 자동으로 함께생성 (현재쓰는 모든 타입이 정의된 파일)
    "outFile": "./", //모든 ts파일을 js파일 하나로 컴파일해줌 (module이 none, amd, system일 때만 가능)
    "outDir": "./", //js파일 아웃풋 경로바꾸기
    "rootDir": "./", //루트경로 바꾸기 (js 파일 아웃풋 경로에 영향줌)
    "removeComments": true, //컴파일시 주석제거

    "strict": true, //strict 관련, noimplicit 어쩌구 관련 모드 전부 켜기
    "noImplicitAny": true, //any타입 금지 여부
    "strictNullChecks": true, //null, undefined 타입에 이상한 짓 할시 에러내기
    "strictFunctionTypes": true, //함수파라미터 타입체크 강하게
    "strictPropertyInitialization": true, //class constructor 작성시 타입체크 강하게
    "noImplicitThis": true, //this 키워드가 any 타입일 경우 에러내기
    "alwaysStrict": true, //자바스크립트 "use strict" 모드 켜기

    "noUnusedLocals": true, //쓰지않는 지역변수 있으면 에러내기
    "noUnusedParameters": true, //쓰지않는 파라미터 있으면 에러내기
    "noImplicitReturns": true, //함수에서 return 빼먹으면 에러내기
    "noFallthroughCasesInSwitch": true //switch문 이상하면 에러내기
  }
}
```

## 기본적인 Type들

```ts
// 이런것들은 자동으로 타입유추를 해줌
let myname: string = "kong";
let age: number = 24;
let isMerried: boolean = false;
let members: string[] = ["kong", "ha"];
let person: { name: string; age: number } = { name: "kong", age: 25 };

let autoName = "kong";
autoName = 123; // 최초에 string이 들어갔음으로 에러남
```

## 예제 문제들

```ts
let favorit: { song: string; singer: string } = {
  song: "love yourself",
  singer: "justin bieber",
};

type mytype = {
  member: string[];
  days: number;
  started: boolean;
};

let project: mytype = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};
```

## union 타입

```ts
// union 타입
let 회원: string | number = "string";
let 회원들: (string | number)[] = ["kong", 2, "ha"];
let 오브젝트: { a: string | number } = { a: 123 };

// 만능 type
let 아무거나: any;
let 아무거나2: unknown;
아무거나 = 123;
아무거나 = "크크크";

// 만능 type은 unkown만 에러를 감지할 수 있다
let 변수: string = 아무거나; // 에러안남 any는 그냥 ts 해제문법임 쓰지말거라
변수 = 아무거나2; // 에러남

// 연산도 엄격하다
let 변수2: string | number;
console.log(변수2 - 1); //변수2가 아직은 할당되지않은 string 혹은 number 일수있기에 연산이 불가능

let 변수3: unknown = 1;
console.log(변수3 - 1); //이건 숫자로 선언핸줬음에도 안됨, 연산은 숫자관련 타입만 되니까
```

## type 연습

```ts
let user: string = "kim";
let age: undefined | number = undefined;
let married: boolean = false;
let 철수: (string | number | undefined | boolean)[] = [user, age, married];

let 학교: {
  score: (number | boolean)[];
  teacher: string;
  friend: string | string[];
} = {
  score: [100, 97, 84],
  teacher: "Phil",
  friend: "John",
};

학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];
```

## 함수의 type, 파라미터의 type, 그리고 optional parameter

```ts
let x; // 타입을 지정하지 않으면 any 타입이 된다

function 함수(x: number): number {
  //return 값에 대한 type은 여기다가 해줌
  return x * 2;
}
함수(3);

//void 함수
function 함수2(): void {
  console.log("리턴하는게 없습니다");
}

// 파라미터 옵션으로 주기
// ? 의 의마는 number | undefined 가된다(js에서 안주면 undefined되는거 처럼)
function 파라미터옵션(x?: number): void {
  let obj: { name?: string; age: number } = { age: 25 }; //object도 옵션으로 줄수있음

  if (typeof x == "number") {
    // 파라미터가 "?" 라는 것은 "number | undefined" 라는 소리다, 연산은 확실하게 number일때만 가능하기 때문에, 타입이 명확함을 조건으로 걸어주어야한다
    console.log(x + 3);
  }
}
```

## Narrowing & assertion

- type이 정확하지 않으면 연산을 할수없다
- 그래서 Narrowing 이라는 방법으로, type을 하나로 특정한다
- 방법에는 typeof, instanceof.. 등이있다.
- 간단한방법으로는 as 를 사용하여 type을 특정할 수 있다(단 변경하는 것이아니다)

> x:nubmer|string -> 이런경우에 x as number 이런식으로 해줄수 있는것이다. 막연히 x as boolean 이런식으로 변경하는 것은 불가능하다(쓸일이 없음 as를 쓰면 버그 추정이 불가능해짐)

```ts
function 함수(x?: number): void {
  if (typeof x == "number") {
    //if 문으로 Narrowing 하기
    console.log(x + 3);
  }
  console.log((x as number) + 3); // assertion 문법으로 Narrowing 하기
}
```

## 연습문제

### number와 string이 섞인 배열을 깔끔한 number[]로 리턴하는 함수를 만들어보자

```ts
function clean(arr: (number | string)[]): number[] {
  let newArr = arr.map((item) => {
    if (typeof item == "string") {
      return parseInt(item);
    } else {
      return item;
    }
  });
  return newArr;
}

let data: (number | string)[] = [1, 2, "3", 4, "5"];
let cleanData = clean(data);
console.log(data);
console.log(cleanData);
```

### 주어진 object에서 마지막 과목을 추출해주는 함수를 만들어라!

```ts
let 철수쌤: { subject: string | string[] } = { subject: "math" };
let 영희쌤: { subject: string | string[] } = {
  subject: ["science", "english"],
};
let 민수쌤: { subject: string | string[] } = {
  subject: ["science", "art", "korean"],
};

function pickLastOne(arr: { subject: string | string[] }): string {
  let lastSubject: string = "";

  if (typeof arr.subject === "string") {
    lastSubject = arr.subject;
  } else if (typeof arr.subject === "object") {
    lastSubject = arr.subject[arr.subject.length - 1];
  }

  return lastSubject;
}

console.log(pickLastOne({ subject: "math" })); //이 경우 'math'를 return
console.log(pickLastOne({ subject: ["science", "art", "korean"] })); //이 경우 'korean'을 return
pickLastOne({ hello: "hi" }); //이 경우 타입에러 나면 됩니다
```

## type 변수만들기(type alias)

```ts
// 타입 변수로 담아서 사용하기
// 대문자 시작이 국룰
type Animal = string | number | undefined;
let 동물: Animal = 123;
```

## readonly 속성

- obejct의 property는 값을 수정할 수 있는데, 이를 막아주는 키워드이다

> 하지만 개발환경에서 에러만 띄워줄 뿐 javascript 컴파일시에는 수정된다

```ts
const person: { readonly name: string; age: number } = {
  name: "ha",
  age: 25,
};

person.name = "kong"; // readonly 속성을 줄 경우 object의 값을 바꾸지못함
```

## type alias extend

```ts
type name = string;
type age = number;
type person = name | age; // 선언후 사용가능
```

```ts
type X = { x: number };
type Y = { y: number };

type NewType = X & Y;

let position: NewType = { x: 10, y: 20 };
```

## literal type

```ts
// literal type
let person: "kong";
person = "ha"; // kong 만 들어올수있음

//union
let me: "대머리" | "솔로";

me = "대머리";
me = "솔로";
me = "멋쟁이"; // 에러
```

### 함수에서 유용하다!

- literal type을 parameter 와 return 값으로 지정한다면 아주 유용한 함수가 될 수있다

```ts
function myfn(x: "yes" | "no"): 1 | 0 {
  return 1;
}

myfn("sdf"); // 에러
myfn("yes"); // OK
```

### 연습문제

- 가위,바위,보 만을 입력받고, 배열을 리턴하는함수를 만들어라
- 단, 배열에는 가위,바위,보만 들어갈수있다

```ts
function game(a: "가위" | "바위" | "보"): ("가위" | "바위" | "보")[] {
  return ["가위", "보"];
}

console.log(game("가위"));
```

## literal type의 문제점

Q. 자료.name은 'kong'인데 왜 에러가날까?
A. 함수에서 지정한것은 'kong'이라는 타입이다. 'kong'이라는 값이아니라!

```ts
let 자료 = {
  name: "kong",
};

function 함수(a: "kong") {}

함수("kong"); // 에러안남
함수(자료.name); //에러남 왜? 자료.name 은 타입이 string임
```

### 해결책1

```ts
let 자료: { name: "kong" } = {
  name: "kong",
};

function 함수(a: "kong") {}

함수(자료.name); // OK
```

### 해결책2

```ts
let 자료 = {
  name: "kong",
};

function 함수(a: "kong") {}

함수(자료.name as "kong"); //OK
```

### 해결책3

```ts
let 자료 = {
  name: "kong",
} as const;

function 함수(a: "kong") {}

함수(자료.name); // OK
```

- as const 키워드는 프로퍼티트을 각 값으로 type을 지정해달라는 것임
- 프로퍼티 모두를 readonly로 변경해줌

```ts
let 자료 = {
  name: "kong", //'kong' 타입
  age: 24, //24 타입
  arr: [1, 2, "hi"], // [1,2,'hi'] 타입
} as const;

function 함수(a: "kong") {}

함수(자료.name); // OK
```

> 즉, object를 const 로 지정해버리는것임

## 함수 type alias 만들어 부착하는 방법

```ts
type 함수타입 = (a: string) => number;

let 함수: 함수타입 = function () {
  return 1;
};
```

## object 내의 메서드들 type 지정

```ts
type myType = {
  name: string;
  plusOne: (a: number) => number;
  changeName: () => void;
};

let 회원정보: myType = {
  name: "kim",
  plusOne(a) {
    return a + 1;
  },
  changeName: () => {},
};
```

## 정규식과 함께 연습문제

```ts
// 받은 문자열이 0으로시작한다면 0을제거하고 반환 하는 함수를 만들어라
function cutZero(str: string): string {
  str = str.replace(/0/, "");
  return str;
}

console.log(cutZero("0hih"));

// 문자열을 받으면 - 를 제거해서 숫자로 반환하는 함수를 만들어라
type myType = (str: string) => number;
let removeDash: myType = (str) => {
  str = str.replace(/-/g, "");
  return parseInt(str);
};
console.log(removeDash("010-2220-1212"));
```

### 위 두함수를 파라미터로 받은 함수 두개를 만들어라

- 위두함수와 문자열하나를 받고, 함수내에서 cutZero함수의결과를 removeDash함수로 넣고 그 결과값을 return 하는 함수를 만들어라

```ts
type All = (
  str: string,
  callback1: (str: string) => string,
  callback2: (str: string) => number
) => number;

let AllFn: All = (str, callback1, callback2) => {
  return callback2(callback1(str));
};
console.log(AllFn("010-1111-2222", cutZero, removeDash));
```

## 타입스크립트로 html 조작하기

> DOM을 조작할때는 없는 값 즉, null 이 잡힐수있기 때문에, 항상 Element | null 인상태이다. 이럴때는 모호하기때문에 narrowing을 해주어야 이후 연산이나 작업이 가능하다

```ts
let 제목 = document.querySelector("#title");
제목.innerHTML = "바보"; // Element or null 일수있음으로 모호함, 그래서 에러
```

### 해결책1

```ts
let 제목 = document.querySelector("#title");
if (제목 != null) {
  제목.innerHTML = "바보"; // Element or null 일수있음으로 모호함, 그래서 에러
}
```

### 해결책2(가장많이 사용함)

```ts
let 제목 = document.querySelector("#title");
if (제목 instanceof Element) {
  제목.innerHTML = "바보";
}
```

### 해결책3 as 사용하기(사용하면 안됨)

- as 로 해결이가능하다, 이것은 타입을 강제로 단정짓는 것이다.
- 만약 null 이들어왔다해도 type을 Element로 단정짓는 행위이기 때문에 이 경우에는 적절하지 못하다

```ts
let 제목 = document.querySelector("#title") as Element;
if (제목) {
  제목.innerHTML = "바보";
}
```

### 해결책4 optional chaning 사용하기(신문법)

- 제목안에 innerHTML이라는 속성이 있고 & undefined 아니면이 조건이다

```ts
let 제목 = document.querySelector("#title");
if (제목?.innerHTML != undefined) {
  제목.innerHTML = "바보";
}
```

### 해결책5 tsconfig.json 수정하기

- 이건 해결은 아니다(방법이 될수있음)

```js
{
    "compilerOptions" : {
      "target": "es5",
      "module": "commonjs",
      "noImplicitAny": true,
      "strictNullChecks": true // 이거를 false로 바꿔주면 됨
    }
  }
```

## 다 Element는 아닙니다

- 아래의 경우에는 a태그를 가져왔는데, a태그는 HTMLAnchorElement이다. Element를 상속받은 다른 객체

```ts
let a태그 = document.querySelector("#link");
if (a태그 instanceof Element) {
  a태그.href = "https://kakao.com"; //에러
}

// 이렇게 해야 에러안남
let a태그 = document.querySelector("#link");
if (a태그 instanceof HTMLAnchorElement) {
  a태그.href = "https://kakao.com"; //에러
}
```

## Optional chaning으로 narrowing 하기

- 버튼의 addEventListener의 경우 객체를 가져온다음 그 메서드를 사용한다. 이경우에는 ?. 기호는 "있으면~~"이라는 뜻이기때문에 narrowing 효과가 나는것이다.

```ts
let btn = document.querySelector("#btn");
btn?.addEventListener("click", () => {});
```

### a 태그처럼 assign에는 안됨

```ts
let a태그 = document.querySelector("#link");
a태그?.href = "https://kakao.com"; // assign은 안됨 왜안되는지는 생각해보면 쉽게 이해될것임
```

### 연습문제

- img태그의 src속성을 바꿔보기

```ts
let myimg = document.querySelector("#myimg");
if (myimg instanceof HTMLImageElement) {
  myimg.setAttribute("src", "kong.jpg");
}

//or

// 메서드는 optional chaning으로 narrowing 가능
let myimg = document.querySelector("#myimg");
myimg?.setAttribute("src", "kong.jpg");
```

### 연습문제2

- 모든 naver 클래스 요소를 가져와서 속성을 카카오로 바꾸시오

```ts
let naver = document.querySelectorAll(".naver");

naver.forEach((item) => {
  if (item instanceof HTMLAnchorElement) {
    item.href = "https://kakao.com";
  }
});
```

## class

- typescript 에서는 constructor에서 this.변수 로 사용할것을 최상위에서 선언해주어야 사용가능하다(javascript에서는 안해도 됨)

```ts
class Person {
  name: string;

  constructor(name: string) {
    // :string 이렇게 type 지정을 해주지않아도된다. obect에서 반환하는것은 다 object이다
    this.name = name;
  }
  add() {}
}

let p1 = new Person("kong");
let p2 = new Person("ha");
console.log(p1.name); // kong
console.log(p2.name); // ha
```

### 그냥 class 팁

- 1,2 번은 같은 뜻임 둘중하나의 방식으로 택하면되는데, 1번은 정의할때 넣는거고, 2번은 정의후 추가하는것이다. 모든 자식 object는 해당 함수를 가지게된다

```ts
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  add(a: string): void {} //1
}
Person.prototype.add = function () {}; // 2
```

### 연습문제1

```ts
class Car {
  model: string;
  price: number;
  constructor(model: string, price: number) {
    this.model = model;
    this.price = price;
  }
  tax(): number {
    return this.price * 0.1;
  }
}

let car1 = new Car("소나타", 3000);
console.log(car1); //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()); //콘솔창 출력결과는 300
```

### 연습문제2

- 제한없는 파라미터 연습

```ts
class Word {
  num: number[] = [];
  str: string[] = [];
  constructor(...args: (number | string)[]) {
    args.forEach((item) => {
      if (typeof item == "number") {
        this.num.push(item);
      } else if (typeof item == "string") {
        this.str.push(item);
      }
    });
  }
}

let obj = new Word("kim", 3, 5, "park");
console.log(obj.num); //[3,5]
console.log(obj.str); //['kim', 'park']
```

## class 는 type 대신 interface 사용가능

```ts
interface Person {
  name: string;
  age?: number;
}

let 학생: Person = { name: "kong" };
let 선생: Person = { name: "ha", age: 24 };
```

### 혹은 extends 상용

```ts
interface Student {
  name: string;
}
interface Teacher extends Student {
  age?: number;
}

let 학생: Student = { name: "kong" };
let 선생: Teacher = { name: "ha", age: 24 };
```

### type 도 비슷한기능 가능함

```ts
type Student = { name: string };
type Teacher = { age: number } & Student;

let 학생: Student = { name: "kong" };
let 선생: Teacher = { name: "ha", age: 24 };
```

> 단 차이는 interface의 경우에는 다중 상속이 가능하다는 장점이있다.

- 또한 아래의경우처럼 중복 선언도가능하다
- 이경우 `Person{name:string,job:string}`이된다(유연하다)
- type은 안됨(엄격하다)

```ts
interface Person {
  name: string;
}
interface Person {
  job: string;
}
```

> 그래서 외부 라이브러리같은경우 interface로 도배가된경우가많다. 커스터마이징이 쉽도록 하기위해서이다. 내가만약 모듈을 만든다면 interface가 더 좋은 방안일것이다.

### type의 속성 쭝복

> 아래의 원인은 name은 중복이되어 string도 만족하고 number도 만족하는 자료형이와야하는데, 그건 말도 안된다.그래서 타입을 validate 해주는 순간이 사용할때라는 점이 interface와 또다른 차이점이다

```ts
type Person = { name: string };
type Man = { name: number }; // 여기선  에러가안나지만

let Kong: Man = { name: "kong" }; //여기선 에러가난다. 이경우에 type 이 'naver'이 된다
```

### 연습 예제들

```ts
interface Obj {
  plus: (a: number, b: number) => number;
  minus: (a: number, b: number) => number;
}

let obj: Obj = {
  plus: function (a, b) {
    return a + b;
  },
  minus: function (a, b) {
    return a - b;
  },
};
```

```ts
interface Product {
  brand: string;
  serialNumber: number;
  model: string[];
}

let 상품: Product = {
  brand: "Samsung",
  serialNumber: 1360,
  model: ["TV", "phone"],
};
```

```ts
interface Item {
  product: string;
  price: number;
}

interface NewItem extends Item {
  card?: boolean;
}

let 장바구니: NewItem[] = [
  { product: "청소기", price: 7000 },
  { product: "삼다수", price: 800 },
  { product: "청소기", price: 7000, card: false },
];
```
