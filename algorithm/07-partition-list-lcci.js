/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
 var partition = function(head, x) {
    const bigger_hair = new ListNode(null)
    let left = bigger_hair

    const hair = new ListNode(null)
    hair.next = head

    let pre  = hair
    let cur = hair.next
    while(cur){
        const next = cur.next
        if(cur.val < x){
            cur.next = null

            left.next = cur
            left = cur

            pre.next = next

        }else{
            pre = cur

        }
        cur = next

    }
    left.next = hair.next
    return bigger_hair.next

};