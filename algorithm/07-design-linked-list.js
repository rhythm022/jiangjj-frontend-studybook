var MyLinkedList = function() {
    this.cnt = 0
    this.head = new Node()
};

class Node{
    constructor(val,next = null){
        this.val = val
        this.next = next
    }
}
/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if(index >= this.cnt)return -1

    let po =this.head

    while(index--){
        po = po.next
    }
    return po.next.val
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
this.addAtIndex(0,val)
  
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
this.addAtIndex(this.cnt,val)
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index>this.cnt){
        return
    }
    if(index<0){
        index = 0
    }
 


    this.cnt++
    const newNode = new Node(val)
    let pa = this.head
    while(index--){
        pa = pa.next
    }
    newNode.next = pa.next
    pa.next = newNode
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
        if(index >= this.cnt || index < 0)return

     
        this.cnt--

        let po = this.head
        while(index--){
            po = po.next
        }
        po.next = po.next.next
       

};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */