import { extend } from "../../shared"

const objMap = new Map()
let activeEffect
let enableTrack
class ReactiveEffect{
    private _fn: any
    onStop?: () => void
    deps = []
    active = true// 当effect存续时为true
    constructor(fn,public scheduler?){//@@@
        this._fn = fn
    }

    run(){
        if(!this.active){
            return this._fn()//在暂停的情况下调用run，就是普通执行fn
        }

        enableTrack = true// 只有当执行effect API、触发set时在fn内发生get-track时才enableTrack-track
        activeEffect = this
        const res =  this._fn()
        enableTrack = false

        return res
  
    }
    stop(){
        if(this.active){
            clearUpEffect(this)
            if(this.onStop){
                this.onStop()
            }
            this.active = false

        }
    }
}


function clearUpEffect(effect){
    effect.deps.forEach((dep:any)=>{
        dep.delete(effect)
    })
    effect.deps.length = 0
}
export function track(obj,key){
    if(!enableTrack) return

    let keysMap = objMap.get(obj)
    if(!keysMap){
        keysMap = new Map()
        objMap.set(obj,keysMap)
    }

    let dep = keysMap.get(key)
    if(!dep){
        dep = new Set()
        keysMap.set(key,dep)
    }

    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }


}
export function trigger(obj,key) {
    let keysMap = objMap.get(obj)
    let dep = keysMap.get(key)
    for(const effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        }
    }
}
export function effect(fn,options:any={}){
    const _effect = new ReactiveEffect(fn,options.scheduler)
    extend(_effect,options)
    _effect.run()

    const runner :any= _effect.run.bind(_effect)
    runner.effect =  _effect
    return runner//runner用于手动effect
}

export function stop(fn) {
    fn.effect.stop()
    
}