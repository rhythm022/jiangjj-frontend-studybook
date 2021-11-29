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