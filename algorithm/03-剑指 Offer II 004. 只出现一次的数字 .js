/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let res
    for (let i = 0; i < 32; i++) {
        let bit_res = 0
        nums.forEach(val => {
            const cur = val >> i & 1
            bit_res += cur
        })
        if (bit_res % 3) {
            res |= 1 << i
        }
    }


    return res
};