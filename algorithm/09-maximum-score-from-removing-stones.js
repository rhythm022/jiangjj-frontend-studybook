/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
 var maximumScore = function(a, b, c) {
    const arr = [a,b,c]
    let res = 0
    while(true){
        arr.sort((a,b)=>b - a)
        if(arr[2]+arr[1] === 0)break
        res++
        arr[0]--
        arr[1]--
        

    }
    return res
};