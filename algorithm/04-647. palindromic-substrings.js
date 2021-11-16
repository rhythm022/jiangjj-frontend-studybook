/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let res = 0
    for (let i = 0; i < s.length; i++) {
        for (let offset = 0; offset <= 1; offset++) {
            let le = i
            let ri = i + offset
            while (le >= 0 && ri < s.length) {
                if (s[le] === s[ri]) {
                    res++
                    le--
                    ri++
                } else { break }
            }
        }

    }
    return res
};