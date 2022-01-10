/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */



 var swapPairs = function(head) {
    let hair = new ListNode()
    hair.next = head

    recur(hair)

    return hair.next
};


function recur(node){
    if(!node.next || !node.next.next)return 
    let pre = node
    let le = node.next
    let ri = node.next.next
    recur(ri)
    let next = ri.next
    
    pre.next = ri
    ri.next = le
    le.next = next



}