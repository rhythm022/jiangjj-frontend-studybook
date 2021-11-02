function defineReactive(obj,key,value){
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
    a:1
}
function observe(obj){//observe批量为一个对象的所有属性defineReactive
    if(typeof obj !== "object" || obj === null){
        return obj
    }
    Object.keys(obj).forEach(key=>defineReactive(obj,key,obj[key]))
}
observe(foo)
foo.a++