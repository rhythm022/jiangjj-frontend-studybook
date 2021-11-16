/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    return bisect_left(nums, target)
};

function bisect_left(nums, target) {
    let le = 0
    let ri = nums.length - 1
    while (le <= ri) {
        let next = (le + ri) >> 1
        let cur = nums[next]

        if (target === cur) {
            return next
        } else if (target < cur) {
            ri = --next
        } else {
            le = ++next
        }
    }

    return le
}