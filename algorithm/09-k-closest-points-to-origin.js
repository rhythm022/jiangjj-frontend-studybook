/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
 var kClosest = function(points, k) {
    const kq = new MaxPriorityQueue({priority:it=>it.distance})
    for(let i = 0;i<points.length;i++){
        const cur = points[i]
        kq.enqueue({
            distance: cur[0] ** 2 + cur[1] ** 2,
            val:cur
        })
        if(kq.size()>k){
            kq.dequeue()
        }
    }
    const res = []
    while(kq.size()){
        res.push(kq.dequeue().element.val)
    }


    return res
};