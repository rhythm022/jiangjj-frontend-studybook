import { effect } from '../effect'
import { ref } from '../ref'


describe('ref',()=>{
    it('happy path',()=>{
        const a = ref(1)
        expect(a.value).toBe(1)
    })

})