import { hasChanged, isObject } from '../../shared';
import {trackEffects,triggerEffects,isTracking} from './effect'
import { reactive } from './reactive';
class RefImp{
    private _value: any;
    public dep// 不同于之前把dep放在effect.ts
    private _rawValue: any;
    
    constructor(value){
        this._value = isObject(value) ?  reactive(value) : value
        this._rawValue = value

        this.dep = new Set()
    }

    get value(){
        trackRefValue(this)
        return this._value
    }
    set value(value){
        if(!hasChanged(value,this._rawValue))return 

        this._value = isObject(value) ?  reactive(value) : value
        this._rawValue = value   
         
        triggerEffects(this.dep)
    }
}

function trackRefValue(ref){
    if(isTracking()){
        trackEffects(ref.dep)

    }


}
export function ref(value) {
    return new RefImp(value)
}