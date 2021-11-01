let Vue
class Store{
    constructor(options){
        this._vm = new Vue({
            data:{
                $$state:options.state
            }
        })

        console.log(this._vm.$$state)//$$开头的，Vue不会做代理
        setInterval(()=>{
            this.state.counter++
        },1000)
      
     
    }
    get state(){
        return this._vm._data.$$state
    }
    set state(_){
        console.error('please use replaceState')
    }
}

function install(_Vue){
    Vue = _Vue

    Vue.mixin({
        beforeCreate(){//beforeCreate在this.$options被初始化后执行
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}
export default {
    Store,
    install
}