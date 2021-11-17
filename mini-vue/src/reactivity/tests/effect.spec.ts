import { effect,stop } from "../effect";
import { reactive } from "../reactive";

describe('effect', () => {
    it('happy path', () => {
        const user = reactive({
            age: 10
        })

        let nextAge
        effect(() => {
            nextAge = user.age + 1
        })

        expect(nextAge).toBe(11)

        //update
        user.age++
        expect(nextAge).toBe(12)
    })

    it('should return runner when call effect', () => {
        let foo = 10
        const runner = effect(() => {
            foo++
            return 'foo'
        })
        expect(foo).toBe(11)

        const r = runner()
        expect(foo).toBe(12)
        expect(r).toBe('foo')
    })

    it("scheduler", () => {
        // 1. 通过 effect 的第二个参数给定的 一个 scheduler
        // 2. effect 第一次执行时 还会执行 fn
        // 3. 当响应式对象 set update 不执行 fn 而是执行scheduler
        // 4. 只有当执行 runner 的时候，会执行 fn
        let dummy
        let run
        const scheduler = jest.fn(() => {
            run = runner
        })
        const obj = reactive({ foo: 1 })
        const runner = effect(() => {
            dummy = obj.foo
        }, { scheduler })

        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        //
        obj.foo++
        expect(scheduler).toBeCalledTimes(1)
        expect(dummy).toBe(1)
        //
        run()
        expect(dummy).toBe(2)

    })
    it('stop',()=>{
        let dummy
        const obj = reactive({foo:1})
        const runner = effect(()=>{
            dummy = obj.foo // effect读foo的时候，track上了
        })
        // 
        obj.foo = 2// 导致effect执行，effect执行的时候读obj.foo，又track，无害
        expect(dummy).toBe(2)
        
        //
        stop(runner)// untrack/释放effect
        obj.foo++// effect外面读obj.foo，不会track上//写obj.foo，也没有effect可执行
        expect(dummy).toBe(2)
        
        //
        runner();// 执行effect。effect读的时候，track上了
        expect(dummy).toBe(3)
    })

    it('onStop',()=>{
        const obj = reactive({
            foo:1
        })
        const onStop = jest.fn()
        let dummy
        const runner = effect(()=>{
            dummy = obj.foo
        },{ onStop })

        stop(runner)
        expect(onStop).toBeCalledTimes(1)
    })
});