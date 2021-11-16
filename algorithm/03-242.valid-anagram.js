/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) return false
    const hash = {}
    for (let i = 0; i < s.length; i++) {
        const cur_s = s[i]

        if (hash[cur_s] === undefined) hash[cur_s] = 1
        else hash[cur_s]++

        const cur_t = t[i]
        if (hash[cur_t] === undefined) hash[cur_t] = -1
        else hash[cur_t]--
    }

    return !Object.entries(hash).find(it => it[1] !== 0)
};