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

        // 实例化组件时编译/渲染dom
        new Compile(options.el,this)//??? 编译：输入vdom(暂时以实dom讲解)，输出dom
    }
}
class Compile{
    constructor(el,vm){
        this.$el = document.querySelector(el)
        this.$vm = vm

        if(this.$el){
            this.compile(this.$el)
        }
    }

    compile(node){//处理某节点的所有子节点
        const childNodes = node.childNodes

        Array.from(childNodes).forEach(n=>{
            if(this.isElement(n)){
                console.log('元素',n.nodeName)

                this.compileElement(n)//不包含子节点的子节点
                if(n.childNodes.length>0){//不包含子节点的子节点
                    this.compile(n)
                }
            }else{
                if(this.isInter(n)){
                    console.log('非元素(文本):动态文本',n.textContent)
                    this.compileText(n)
                }
            }
        })
    }
    isElement(n){
        return n.nodeType === 1
    }

    isInter(n){
        return n.nodeType === 3 &&
        /\{\{(.*)\}\}/.test(n.textContent)
    }

    compileText(n){
        n.textContent = this.$vm[RegExp.$1]
    }
    compileElement(n){//编译element by name和attrs
        const attributes = Array.from(n.attributes)
        attributes.forEach(attribute=>{
            const name = attribute.name
            const value = attribute.value

            if(this.isDirective(name)){
                const directive = name.slice(2)

                this[directive] && this[directive](value,n)// 指令钩子
            }
        })
    }
    text(){

    }
    isDirective(name){
        return name.startsWith('j-')
    }

}


export default Vue