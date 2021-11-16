/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let le = 0
    let ri = nums.length - 1
    while (le <= ri) {
        let next = (le + ri) >> 1
        let cur = nums[next]

        if (target === cur) {
            return next
        } else if (target > cur) {
            le = ++next
        } else {
            ri = --next
        }
    }

    return -1
};