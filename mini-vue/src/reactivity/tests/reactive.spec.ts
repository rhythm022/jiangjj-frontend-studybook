import { reactive,readonly} from '../reactive'
describe('reactive',()=>{
    it('happy path',()=>{
        const original = {foo:1}
        const observed = reactive(original)
        const wrapped = readonly(original)
        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)
    })
})