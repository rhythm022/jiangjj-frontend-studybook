/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
    let res = 0
    for(let i = 0,j = height.length - 1 ; i < j ;){
        const le_height = height[i]
        const ri_height = height[j]
        const width = j - i
        res = Math.max(res,width * Math.min(le_height,ri_height))

        if(le_height >ri_height){
            j--
        }else{
            i++
        }
    }

    return res
};