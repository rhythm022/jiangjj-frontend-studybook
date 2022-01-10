/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
 var smallestK = function(arr, k) {
    if(!arr.length || !k) return []
    const h = new MaxPriorityQueue({priority:a=>a})

    for(let i = 0 ;i<arr.length;i++){
        h.enqueue(arr[i])

        if(h.size()>k){
            h.dequeue()
        }
    }

    let res = []
    while(h.size()){
        res.push(h.dequeue().element)
    }

    return res.reverse()
};