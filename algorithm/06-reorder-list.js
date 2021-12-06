/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
 var reorderList = function(head) {
    const list = []
    while(head){
        list.push(head)
        head = head.next
    }
    
    let hair = new ListNode()
    let res = hair
    for(let i =0,j = list.length-1;i<=j;i++,j--){
    const cur = list[i]
    res.next = cur
    cur.next = null
    res = cur
    
    if(j!==i){
        const cur = list[j]
        res.next = cur
        cur.next = null
        res = cur
    }
    }
    
    return hair.next
    };