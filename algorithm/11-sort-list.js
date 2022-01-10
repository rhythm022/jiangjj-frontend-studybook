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
 var sortList = function(head) {
    return sort(head,null)
};



function sort(start,end){
    if(start === end) return start
    let fast = start
    let slow = start

    while(fast !== end && fast.next !== end){
        fast = fast.next.next
        slow = slow.next
    }
    const right = sort(slow.next,end)
    slow.next = null
    const left = sort(start,slow)

    return merge(left,right)
}

function merge(left,right){
    if(!left) return right
    if(!right) return left

    if(left.val < right.val){
        left.next = merge(left.next,right)

        return left
    }else{
        right.next = merge(left,right.next)

        return right
    }
}