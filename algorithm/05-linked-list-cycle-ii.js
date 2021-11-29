/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
    let po = head

    let set = new Set()
    while(po){
        if(set.has(po)) return po
        set.add(po)
        po = po.next
    }

    return null
};