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
var rotateRight = function (head, k) {
    if (!head) return head
    let sl = head
    let fa = head
    let length = 1
    while (fa.next) {
        length++
        fa = fa.next
    }
    fa.next = head
    k = length - k % length - 1

    while (k--) {
        sl = sl.next
    }
    const tmp = sl.next
    sl.next = null
    return tmp

};