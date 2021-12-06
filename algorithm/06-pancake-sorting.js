/**
 * @param {number[]} arr
 * @return {number[]}
 */
 var pancakeSort = function(arr) {
    const res = []
    for(let i = arr.length - 1;i>=0;i--){
        const maxIndex = findMaxIndex(0,i,arr)
        res.push(maxIndex + 1)
        reserve(0,maxIndex,arr)
        res.push(i+1)
        reserve(0,i,arr)

    }

    return res
};


function findMaxIndex(start,end,arr){
    let res = 0
    for(let i = start;i<=end;i++){
        const cur = arr[i]
        if(cur > arr[res]){
            res = i
        }
    }

    return res
}

function reserve(start,end,arr){
    for(let i = start,j = end;i<j;i++,j--){
     [arr[i],arr[j]] = [arr[j],arr[i]]
    }

    
}

//  3 2 4 1
//  4 2 3 1
//  1 3 2 4
//  3 1 2 4
//  2 1 3 4
//  1 2 3 4