/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
    let le = 0
    let ri = Math.floor(Math.sqrt(c))

    while (le <= ri) {
        const cur = le ** 2 + ri ** 2

        if (c === cur) {
            return true
        } else if (cur > c) {
            ri--
        } else {
            le++
        }
    }
    return false
};