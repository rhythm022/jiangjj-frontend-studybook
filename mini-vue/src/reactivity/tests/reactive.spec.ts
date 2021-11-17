import { reactive,readonly,isReactive} from '../reactive'
describe('reactive',()=>{
    it('happy path',()=>{
        const original = {foo:1}
        const observed = reactive(original)
        const wrapped = readonly(original)
        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)
        expect(isReactive(observed)).toBe(true)
    })

    it('warn when call set',()=>{
        console.warn = jest.fn()

        const user = readonly({
            age:10
        })

        user.age = 11

        expect(console.warn).toBeCalled()
    })
})