const objMap = new Map()
let activeEffect
class ReactiveEffect{
    private _fn: any
    deps = []
    active = true
    constructor(fn,public scheduler?){//@@@
        this._fn = fn
    }

    run(){
        this.active = true
        activeEffect = this
        return this._fn()
        // activeEffect = null//???
    }
    stop(){
        if(this.active){
            clearUpEffect(this)
            this.active = false

        }
    }
}


function clearUpEffect(effect){
    effect.deps.forEach((dep:any)=>{
        dep.delete(effect)
    })
}
export function track(obj,key){
    if(!activeEffect) return 
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
    dep.add(activeEffect)
    activeEffect.deps.push(dep)

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

    _effect.run()

    const runner :any= _effect.run.bind(_effect)
    runner.effect =  _effect
    return runner//runner用于手动effect
}

export function stop(fn) {
    fn.effect.stop()
    
}