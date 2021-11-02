import { observe } from './j-reactive.js'


function proxy(vm){
    Object.keys(vm.$data).forEach(key=>{
        Object.defineProperty(vm,key,{
            get(){
                return vm.$data[key]
            },
            set(newValue){
                vm.$data[key] = newValue
            }
        })
    })
}
class Vue{
    constructor(options){
        this.$options = options
        this.$data = options.data

        observe(this.$data)

        proxy(this)
    }
}

export default Vue