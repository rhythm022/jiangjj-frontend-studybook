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


const foo={}

defineReactive(foo,'a',1)

foo.a++