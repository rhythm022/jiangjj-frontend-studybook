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


const foo={
    a:{
        b:1
    }
}
function observe(obj){//以对象为起点做响应式
    if(typeof obj !== "object" || obj === null){
        return obj
    }
    Object.keys(obj).forEach(key=>defineReactive(obj,key,obj[key]))
}
observe(foo)
foo.a.b
foo.a = {
    newB:1
}
foo.a.newB

 function set(obj,key,value){//为新增属性单独做响应式
     defineReactive(obj,key,value)
 }

 set(foo,'other',1)

 foo.other