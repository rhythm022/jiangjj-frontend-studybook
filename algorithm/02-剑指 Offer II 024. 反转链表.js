var reverseList = function (head) {
    if (!head) return head

    return recur(head, null)
};

// 每次迭代，改变当前节点的next状态，用parent
function recur(node, parent) {
    const root = node.next ? recur(node.next, node) : node//有next则迭代

    node.next = parent

    return root

}