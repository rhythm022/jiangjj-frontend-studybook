/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
    const res = []
    recur(head, res)
    return res
};

function recur(node, res) {
    if (!node) return
    recur(node.next, res)
    res.push(node.val)
}