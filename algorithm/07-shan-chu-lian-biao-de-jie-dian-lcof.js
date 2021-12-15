/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
 var deleteNode = function(head, val) {
    let hair = new ListNode(null)
    hair.next = head
    let po = hair
    let parent
    while(po){
        if(po.val === val){
            parent.next = po.next
            break
        }
        parent = po
        po = po.next
    }
    return hair.next
};