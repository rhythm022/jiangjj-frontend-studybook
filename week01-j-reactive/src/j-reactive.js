function defineReactive(obj,key,value){//以属性为起点做响应式
    observe(value)

    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key,':',value)

            return value
        },
        set(newValue){
            if(value !== newValue){
                observe(newValue)//@@@
                console.log('set',key,'from',value,'to',newValue)
                value = newValue
            }
        }
    })
}



export function observe(obj){//以对象为起点做响应式
    if(typeof obj !== "object" || obj === null){
        return obj
    }
    new Observer(obj)//observe时new Observer：准备为数组做响应式
}

class Observer{
    constructor(obj){
        if(Array.isArray(obj)){
            //todo
        }else{
            this.walk(obj)
        }
    }

    walk(obj){
        Object.keys(obj).forEach(key=>defineReactive(obj,key,obj[key]))

    }
}
// const foo={
//     a:{
//         b:1
//     }
// }
// observe(foo)
// foo.a.b
// foo.a = {
//     newB:1
// }
// foo.a.newB

 export function set(obj,key,value){//为新增属性单独做响应式
     defineReactive(obj,key,value)
 }
export default{
    defineReactive,
    set,
    observe
}
//  set(foo,'other',1)
//  foo.other