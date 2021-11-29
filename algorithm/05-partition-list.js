/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
 var partition = function(head, x) {
    let le1 = new ListNode()
    let le = le1
    let ri1 = new ListNode()
    let ri = ri1
    let po = head 
    while(po){
        const next  = po.next
        po.next = null
        if(po.val < x){
            le.next = po
            le = po
        }else{
            ri.next = po
            ri = po
        }
        po = next

    }
    le.next = ri1.next

    return le1.next
};