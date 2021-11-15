import { effect } from "../effect";
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
});