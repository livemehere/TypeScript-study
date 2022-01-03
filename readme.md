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
