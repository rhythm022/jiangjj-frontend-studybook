export const extend = Object.assign

export const isObject = target =>target !== null && typeof target === 'object'

export const hasChanged = (value,newValue)=>{
    return !Object.is(newValue,value)
}

export const hasOwn = (target,key)=> Object.prototype.hasOwnProperty.call(target,key)

export const capitalize = (str:string)=> str.charAt(0).toUpperCase() + str.slice(1)
