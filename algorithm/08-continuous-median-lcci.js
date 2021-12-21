/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
    this.left_maxHeap = new Heap({comparator:(a, b) => b - a})
    this.right_minHeap = new Heap({})
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if(this.left_maxHeap.peek() && this.left_maxHeap.peek() >= num){
        this.left_maxHeap.offer(num)
    }else if(this.right_minHeap.peek() && this.right_minHeap.peek() <= num){
        this.right_minHeap.offer(num)
    }else{
        if(this.left_maxHeap.size() <= this.right_minHeap.size()){
            this.left_maxHeap.offer(num)
        }else{
            this.right_minHeap.offer(num)
        }
    }
 
    if(this.left_maxHeap.size() === this.right_minHeap.size() +2 ){
        this.right_minHeap.offer(this.left_maxHeap.poll())
    }else if(this.left_maxHeap.size() + 1 === this.right_minHeap.size()){
        this.left_maxHeap.offer(this.right_minHeap.poll())
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {

    if(this.left_maxHeap.size() === this.right_minHeap.size()){
        return (this.left_maxHeap.peek() + this.right_minHeap.peek())/2
    }else{
        return this.left_maxHeap.peek()
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */


 class Heap {
    constructor({data = [],comparator = (a, b) => a - b}) {
        this.data = [...data]
        this.comparator = comparator
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

