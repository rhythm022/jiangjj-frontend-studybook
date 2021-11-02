let Vue
class Store{
    constructor(options){
        this._mutations = options.mutations
        this._actions = options.actions
        this._getters = options.getters

        this.getters = {}
        const computed = {}
        Object.keys(this._getters).forEach(key=>{
            computed[key] = ()=> {
                const fn = this._getters[key]

                return fn(this.state)
            }

            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return this._vm[key]// 访问getters时是访问computed
                }
            })

        })
    
        this._vm = new Vue({
            data:{
                $$state:options.state
            },
            computed
        })

        console.log(this._vm.$$state)//$$开头的，Vue不会做代理
      this.commit = this.commit.bind(this)
      this.dispatch = this.dispatch.bind(this)
     
    }
    get state(){
        return this._vm._data.$$state
    }
    set state(_){
        console.error('please use replaceState')
    }
    commit(type,payload){
        const mutation = this._mutations[type]

        if(!mutation){
            console.error('不存在该mutation')
            return 
        }

        mutation(this.state,payload)
    }

    dispatch(type,payload){
        const action = this._actions[type]

        if(!action){
            console.error('不存在该action')
            return 
        }

        action(this,payload)
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