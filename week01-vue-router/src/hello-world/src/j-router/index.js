let Vue

class VueRouter{
    constructor(options){
        this.options = options//先存起来整个
        Vue.util.defineReactive(this,'current',window.location.hash.slice(1) || '/')// 强依赖于Vue，所以只能在Vue生态使用

        window.addEventListener('hashchange',()=>{
            this.current = window.location.hash.slice(1)
            console.log(this.current)
        })
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
            let component = null
            const {current,options} = this.$router
            console.log(current,options.routes)
            const route = options.routes.find(r=>r.path === current)
            if(route){
                component = route.component
            }
            return h(component) 
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
            return <a href={'#' + this.to}>{this.$slots.default}</a>
        }
        // render(h){
        //     return h('a',{attrs:{
        //         href:`#${this.to}`
        //     }},this.$slots.default) 
        // }
    })
}
export default VueRouter