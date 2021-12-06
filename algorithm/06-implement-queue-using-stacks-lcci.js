/**
 * Initialize your data structure here.
 */
 var MyQueue = function() {
    this.in_stack = []
    this.out_stack = []
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.in_stack.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if(this.empty())return 

    if(!this.out_stack.length){
          while(this.in_stack.length){
            this.out_stack.push(this.in_stack.pop())
        }

    }


    return this.out_stack.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
       if(this.empty())return 

    if(!this.out_stack.length){
          while(this.in_stack.length){
            this.out_stack.push(this.in_stack.pop())
        }

    }


    return this.out_stack[this.out_stack.length -1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.in_stack.length && !this.out_stack.length
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */