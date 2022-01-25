import { render } from "./renderer"
import { createVNode } from "./vnode"

export function  createApp(rootComponent){// createApp 接受 根组件


    return {
        mount(rootContainer){// mount 接受 根组件的容器，简称 根容器
            // 先 component 换 vnode
            // vue 中 所有逻辑操作 都会基于 vnode 做处理
            const vnode = createVNode(rootComponent)

            render(vnode,rootContainer)
        }
    }
}


