/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var swapNodes = function(head, k) {
    let fa = head
    let sl = head
    let cnt = k - 1
    while(cnt--){
        fa = fa.next
    }
    let a = fa
    while(fa.next){
        fa = fa.next
        sl = sl.next
    }
    
    let b = sl
    
    let tmp
    tmp = a.val
    a.val = b.val
    b.val = tmp
    
    return head
    };