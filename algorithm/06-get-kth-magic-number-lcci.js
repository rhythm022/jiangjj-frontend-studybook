/**
 * @param {number} k
 * @return {number}
 */
 var getKthMagicNumber = function(k) {
    const num = []
    num[1] = 1
    let po1 = 1
    let po2 = 1
    let po3 = 1
    for(let i = 2;i<=k;i++){
        const po1_num = num[po1] * 3
        const po2_num = num[po2] * 5
        const po3_num = num[po3] * 7
        num[i] = Math.min(Math.min(po1_num,po2_num),po3_num)

        if(po1_num === num[i])po1++
        if(po2_num === num[i])po2++
        if(po3_num === num[i])po3++
    }

    return num[k]
};



// 1 3 5 7 9 15 21
// 1 = 3x   5x    7x
// 3 = 9x   15x    21x
// 5 = 15x  25c
// 7 = 21c
