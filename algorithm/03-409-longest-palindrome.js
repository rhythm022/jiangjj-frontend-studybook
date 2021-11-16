/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
    let res = 0
    const hash = {}
    for (let i = 0; i < s.length; i++) {
        const cur = s[i]
        if (hash[cur] === undefined) hash[cur] = 1
        else hash[cur]++
    }
    let plus = 0
    Object.entries(hash).forEach(([val, cnt]) => {
        if (cnt % 2 === 0) {
            res += cnt
        } else {
            res += cnt - 1
            plus = 1

        }
    })

    return res + plus
};