/**
 * @param {string} preorder
 * @return {boolean}
 */
 var isValidSerialization = function(preorder) {
    const arr = preorder.split(',')
    let i = 0
    let cnt = 1
    while(i<arr.length){
        if(cnt<=0) return false
        const cur = arr[i]
        if(cur !== '#'){
            cnt +=2
        }
        cnt--
        i++
    }

    return cnt === 0
};