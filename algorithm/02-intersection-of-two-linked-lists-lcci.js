/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let i = headA
    let j = headB
    while (i !== j) {
        i = i !== null ? i.next : headB
        j = j !== null ? j.next : headA
    }

    return i
};