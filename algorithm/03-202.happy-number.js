/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    let sl = n
    let fa = n
    while (next(fa) !== 1) {
        fa = next(fa)
        if (next(fa) === 1) return true
        fa = next(fa)
        sl = next(sl)
        if (fa === sl) return false
    }
    return true
};



function next(n) {
    let res = 0

    while (n) {

        const cur = n % 10
        res += cur ** 2
        n = Math.floor(n / 10)
    }

    return res

}

