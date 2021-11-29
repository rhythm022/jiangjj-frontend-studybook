/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
    let hair = new ListNode()
    hair.next = head
    let le = hair
    let pre = hair
    while(left--){
        if(left !== 0 )pre = pre.next
        le = le.next
    }

    let ri = hair
    while(right--)ri = ri.next
    let end = ri.next

    ri.next = null
reverseList(le)
pre.next = ri
le.next = end

return hair.next
};


var reverseList = function(head) {
    if(!head)return head
    let res
function DFS(node,parent){
if(node.next){
    DFS(node.next,node)
}else{
    res = node
}
node.next = parent

}
DFS(head,null)
return res
};