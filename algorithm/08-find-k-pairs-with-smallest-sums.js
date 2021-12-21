/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
 var kSmallestPairs = function(nums1, nums2, k) {
    const heap = new Heap()
for(let i = 0;i<k;i++){
    const cur_i = nums1[i]
    for(let j = 0;j<k;j++){
        const cur_j = nums2[j]
if(cur_i !== undefined && cur_j !== undefined){
  const cur ={
            sum:cur_i+cur_j,
            value:[cur_i,cur_j]
        }
        heap.offer(cur)
        if(heap.size()>k){
            heap.poll()
        }
}
      

        
    }

}

    let res = []
    for(let i =0;i<k;i++){
        const cur = heap.poll()

        if(cur){
            res.push(cur.value)

        }
    }
    return res.reverse()
};

class Heap {
    constructor(data = []) {
        this.data = [...data]
        this.comparator = (b,a) => a.sum - b.sum
        this.heapify()

    }

    heapify() {
        if (this.size() <= 1) return
        // n -1 
        for (let i = 1; i < this.size(); i++) {
            this.bubbleUp(i)
        }
    }
    bubbleUp(index) {
        const {comparator,data} = this
        while (index > 0) {
            const parentIndex = (index - 1) >> 1
            if (comparator(data[index], data[parentIndex]) < 0) {
                this.swap(index,parentIndex)
                index = parentIndex
             }else{
                 break
             }
        }
    }

    swap(in1,in2){
        [this.data[in1], this.data[in2]] = [this.data[in2], this.data[in1]];
    }
    size(){
        return this.data.length
    }

    offer(val){
        this.data.push(val)
        this.bubbleUp(this.size() - 1)
    }
    peek(){
        if(this.size() === 0) return null

        return this.data[0]
    }

    poll(){
        if(this.size() === 0)return null
        const res = this.data[0]
        const last = this.data.pop()
        if(this.size() !== 0){
            this.data[0] = last
            this.bubbleDown(0)
        }

        return res
    }
    bubbleDown(index){
        const {comparator,data} = this

        const lastIndex = this.size() - 1
        while(true){
            let i = index
            const le = index * 2 + 1
            const ri = index * 2 + 2
            if(le<=lastIndex){
                if(comparator(data[le],data[i])<0){//le/ri中小的那个和较大的父亲换
                    i = le
                }
            }
            if(ri<=lastIndex){
                if(comparator(data[ri],data[i])<0){
                    i = ri
                }
            }
            if(i !== index){
                this.swap(i,index)
                index = i//i是le或ri
            }else{
                break
            }
        }
    }
}