/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    let hair = new ListNode()
    hair.next = head
    let stack = []
    let po = hair
    while(po){
        stack.push(po)

        po = po.next
    }
    

    
    while(n--){
        stack.pop()
    }

    let pre = stack[stack.length - 1]
    pre.next = pre.next.next
    return hair.next
};