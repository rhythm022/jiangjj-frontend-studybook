/**
 * @param {number} k
 */
var MyCircularDeque = function(k) {
this.q = new Array(k)
this.cnt = 0
this.headIndex = 0
this.tailIndex = 0
this.cap = k

};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {

    if(this.isFull())return false

    this.headIndex = (this.headIndex - 1+this.cap)% this.cap 
    this.q[this.headIndex] = value

    this.cnt++

    return true
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
  if(this.isFull())return false

    this.q[this.tailIndex] = value
    this.tailIndex = (this.tailIndex + 1)% this.cap 
    this.cnt++

    return true
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
   if(this.isEmpty())return false
    this.headIndex = (this.headIndex + 1)% this.cap 
    this.cnt--
    return true

};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
   if(this.isEmpty())return false
    this.tailIndex = (this.tailIndex - 1+this.cap)% this.cap 

    this.cnt--
    return true
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
   if(this.isEmpty())return -1

   return this.q[this.headIndex]

};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {

   if(this.isEmpty())return -1

   return this.q[(this.tailIndex - 1+this.cap)% this.cap ]
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
    return this.cnt === 0
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
    return this.cnt === this.cap

};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */