let Vue

class VueRouter{
    constructor(options){
        this.options = options//先存起来整个
    }

    
}

VueRouter.install = function(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){// 每次实例化组件时/new Vue时执行
            if(this.$options.router){//只在root组建配置上有router
                Vue.prototype.$router = this.$options.router

            }
        }
    })
    Vue.component('router-view',{
        render(h){
            return h('a','view') 
        }
    })
    Vue.component('router-link',{
        props:{
            to:{
                require:true,
                type:String
            }
        },
        render(){
            return <a href={this.to}>{this.$slots.default}</a>
        }
        // render(h){
        //     return h('a',{attrs:{
        //         href:`#${this.to}`
        //     }},this.$slots.default) 
        // }
    })
}
export default VueRouter