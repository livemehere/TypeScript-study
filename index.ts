
interface Product{
    brand:string,
    serialNumber:number,
    model:string[]
}

let 상품:Product = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }


interface Item{
    product:string,
    price:number
}

interface NewItem extends Item{
    card?:boolean
}


let 장바구니:NewItem[] = [ { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 },{ product : '청소기', price : 7000, card : false } ] 


interface Obj{
    plus:(a:number, b:number) => number,
    minus:(a:number, b:number) => number
}

let obj:Obj = {
    plus : function(a,b){return a+b},
    minus : function(a,b){return a-b}
}