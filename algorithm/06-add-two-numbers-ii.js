/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {

    const stack = []
    const stack2 = []
    while(l1){
        stack.push(l1.val)
        l1 = l1.next
    }
    
    while(l2){
        stack2.push(l2.val)
        l2 = l2.next
    }
    let sign = 0
    
    let res = null
    while(stack.length || stack2.length || sign){
        const add1 = stack.length ? stack.pop() : 0
        const add2 = stack2.length ? stack2.pop() : 0
        let cur = add1 + add2 +sign
        sign = 0 
        if(cur>=10){
            cur %=10
            sign = 1
        }
        const newNode = new ListNode(cur)
        newNode.next = res
    
        res = newNode
    
    }
    return res
    };