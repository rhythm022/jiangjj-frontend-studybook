import { hasChanged, isObject } from '../../shared';
import {trackEffects,triggerEffects,isTracking} from './effect'
import { reactive } from './reactive';
class RefImp{
    private _value: any;
    public dep// 不同于之前把dep放在effect.ts
    private _rawValue: any;
    public __v_isRef = true
    constructor(value){
        this._value = convert(value)
        this._rawValue = value

        this.dep = new Set()
    }

    get value(){
        trackRefValue(this)
        return this._value
    }
    set value(value){
        if(!hasChanged(value,this._rawValue))return 

        this._value = convert(value)
        this._rawValue = value   
         
        triggerEffects(this.dep)
    }
}

function trackRefValue(ref){
    if(isTracking()){
        trackEffects(ref.dep)

    }


}

function convert(value){
    return isObject(value) ?  reactive(value) : value
}
export function ref(value) {
    return new RefImp(value)
}

export function isRef(ref) {
    return !!ref.__v_isRef
}

