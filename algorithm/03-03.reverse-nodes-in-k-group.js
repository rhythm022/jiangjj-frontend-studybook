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
var reverseKGroup = function (head, k) {
    const hair = new ListNode()
    hair.next = head

    let res = -1
    let pre = hair
    let start = pre.next

    while (start) {
        let cnt = k - 1
        let end = start
        while (cnt-- && end) {
            end = end.next
        }

        // console.log('start',start,'end',end,res)

        if (end) {
            if (res === -1) res = end

            let next = end.next
            end.next = null

            reverseList(start)


            // console.log('after reverse:','start',start,'end',end)
            pre.next = end
            start.next = next

            pre = start
            start = next
        } else {
            break
        }

    }
    return res === -1 ? head : res
};


function reverseList(head) {
    // console.log('head',head)
    if (!head) return head

    return recur(head, null)

};

// 每次迭代，改变当前节点的next状态，用parent
function recur(node, parent) {
    const root = node.next ? recur(node.next, node) : node//有next则迭代 

    node.next = parent

    return root
}

