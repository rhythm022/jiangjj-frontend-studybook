/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    const dp = []
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i]
        const le = bisect_left(dp, cur)
        dp[le] = cur
    }
    return dp.length
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
    // [3,4,1,2,8,5,6]               []
    // 3: 1=>3                       [3]
    // 4:      2=>4                  [3,4]
    // 1: 1=>1                       [1,4]
    // 2:      2=>2                  [1,2]     
    // 8:            3=>8            [1,2,8]
    // 5:            3=>5            [1,2,5]
    // 6:                   4=>6     [1,2,5,6]