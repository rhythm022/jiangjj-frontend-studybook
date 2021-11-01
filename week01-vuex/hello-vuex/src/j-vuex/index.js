let Vue
class Store{
    constructor(options){
        this.state = new Vue({
            data:options.state
        })
        setInterval(()=>{
            this.state.counter++
        },1000)
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