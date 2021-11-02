function defineReactive(obj,key,value){
    observe(value)

    Object.defineProperty(obj,key,{
        get(){
            console.log('get',value)

            return value
        },
        set(newValue){
            if(value !== newValue){
                console.log('set',value,newValue)
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
function observe(obj){//observe以对象为单位为属性做defineReactive
    if(typeof obj !== "object" || obj === null){
        return obj
    }
    Object.keys(obj).forEach(key=>defineReactive(obj,key,obj[key]))
}
observe(foo)
foo.a.b