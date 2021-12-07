import { readonly,isReadonly,isProxy} from '../reactive'
describe('readonly',()=>{
    it('should make nested values readonly',()=>{
        const original = {foo:1}
        const wrapped = readonly(original)
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)
        expect(isReadonly(wrapped)).toBe(true)
        expect(isProxy(wrapped)).toBe(true)
        expect(isReadonly(original)).toBe(false)
    })

    it('warn when call set',()=>{
        console.warn = jest.fn()

        const user = readonly({
            age:10
        })

        user.age = 11

        expect(console.warn).toBeCalled()
    })

    it('nested readonly',()=>{
        const original = {
            nested:{
                foo:1
            },
            array:[{bar:2}]
        }
        const wrapped = readonly(original)
        expect(isReadonly(wrapped.nested)).toBe(true)
        expect(isReadonly(wrapped.array)).toBe(true)
        expect(isReadonly(wrapped.array[0])).toBe(true)
    })
})