function defineReactive(obj,key,value){//以属性为起点做响应式
    observe(value)
    const dep = new Dep()// 属性成为发布者
    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key,':',value)

            Dep.target && dep.on(Dep.target)// 有条件被观察
            return value
        },
        set(newValue){
            if(value !== newValue){
                observe(newValue)//@@@
                console.log('set',key,'from',value,'to',newValue)
                value = newValue
                dep.emit()
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
class Dep{
    constructor(){
        this.watchers = []
    }

    on(watcher){
        this.watchers.push(watcher)
    }
    emit(){
        this.watchers.forEach(watcher=>watcher.update())
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