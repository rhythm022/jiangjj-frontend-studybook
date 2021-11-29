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
 var deleteDuplicates = function(head) {
    if(!head)return head
    const hair = new ListNode()
    hair.next = head

    let pre = hair
    let dup = false
    let cur = head

    while(cur){
        if(cur.next && cur.val === cur.next.val){
            cur.next = cur.next.next
            dup = true
        }else{
            if(dup){
                pre.next = cur.next
                dup = false
            }else{
                pre = cur
            }
            cur = cur.next
        }
    }

    return hair.next
};