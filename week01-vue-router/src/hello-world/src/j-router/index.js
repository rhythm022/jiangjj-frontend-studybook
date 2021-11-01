let Vue

class VueRouter{
    constructor(){

    }

    
}

VueRouter.install = function(_Vue){
    Vue = _Vue

    Vue.component('router-view',{
        render(h){
            return h('a','view') 
        }
    })
    Vue.component('router-link',{
        render(h){
            return h('a',this.$slots.default) 
        }
    })
}
export default VueRouter