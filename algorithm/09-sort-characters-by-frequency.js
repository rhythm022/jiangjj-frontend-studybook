/**
 * @param {string} s
 * @return {string}
 */
 var frequencySort = function(s) {
    const map = new Map()
    for(let i =0 ;i<s.length;i++){
        const cur = s[i]
        map.set(cur,map.has(cur) ? map.get(cur)+1 : 1)

    }

    const q = new MaxPriorityQueue({priority:(a)=>a.cnt})
    for(const [val,cnt] of map){
        q.enqueue({val,cnt})
    }
    const res = []
    while(q.size()){
        const cur = q.dequeue().element
        for(let i = 0;i<cur.cnt;i++){
            res.push(cur.val)

        }
    }
    return res.join('')
};