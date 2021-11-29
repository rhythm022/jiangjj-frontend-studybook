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
 var deleteDuplicates = function(head) {
    if(!head)return head
        let po = head
        while(po.next){
            if(po.val === po.next.val){
                po.next = po.next.next
            }else{
                po = po.next
            }
        }
    
        return head
    };