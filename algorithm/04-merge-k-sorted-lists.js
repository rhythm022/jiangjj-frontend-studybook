/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
    const pq = new MinHeap()

    lists.forEach((node)=>{
        if(node){
            pq.offer(node)

        }
       
    })

    const dummy = new ListNode()
    let pointer = dummy 

    while(pq.size()){
        const node = pq.poll()

        pointer.next = node
        pointer = pointer.next
        if(node.next){
            pq.offer(node.next)
        }

    }

    return dummy.next

};


class MinHeap {
    constructor(data = []) {
        this.data = [...data]
        this.comparator = (a, b) => a.val - b.val
        this.heapify()

        // console.log(this.data)
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