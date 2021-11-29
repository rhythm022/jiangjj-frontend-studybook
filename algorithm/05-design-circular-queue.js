class Node{
    constructor(value = null,next = null){
        this.value = value
        this.next = next
    }
}/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.size = k
    this.cnt = 0
    this.head = null
    this.tail = null
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
if(this.size === this.cnt)return false

if(this.cnt === 0){
    this.head = this.tail = new Node(value)
}else{
    this.tail.next = new Node(value)
    this.tail=this.tail.next
}

this.cnt++
return true
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if(this.cnt === 0 )return false
    this.head = this.head.next
    this.cnt--

    return true
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
if(this.cnt === 0 )return -1
return this.head.value

};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
if(this.cnt === 0 )return -1
return this.tail.value
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
return this.cnt === 0
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
return this.cnt === this.size

};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */