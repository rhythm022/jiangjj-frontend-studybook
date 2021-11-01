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