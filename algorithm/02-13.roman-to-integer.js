/**
 * @param {string} s
 * @return {number}
 */
const dict = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,

}
var romanToInt = function (s) {
    let res = 0
    for (let i = 0; i < s.length; i++) {
        let curNum = dict[s[i]]
        const nextStr = s[i + 1]
        if (
            (curNum === 1 && (nextStr === 'V' || nextStr === 'X')) ||
            (curNum === 10 && (nextStr === 'L' || nextStr === 'C')) ||
            (curNum === 100 && (nextStr === 'D' || nextStr === 'M'))
        ) {
            curNum = -curNum
        }

        res += curNum
    }

    return res
};