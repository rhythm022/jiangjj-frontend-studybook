/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var getKthFromEnd = function(head, k) {
    if(!head) return null
let res
function recur(node){
    let level
    if(!node.next) {
        level = 1
    }else{
        level = recur(node.next) + 1
    }

    if(k === level){
    res = node
    }
    return level

}

recur(head)
return res
};
