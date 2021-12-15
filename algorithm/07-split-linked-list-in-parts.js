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
 * @return {ListNode[]}
 */
 var splitListToParts = function(head, k) {
    const res = new Array(k).fill(null)

    if(!head)return res

    let cnt = 0
    let po = head
    while(po){
        cnt++
        po = po.next
    }

    const N = Math.floor(cnt/k)
    let M = cnt%k

    po = head

    for(let i = 0;i<k && po;i++){
        res[i] = po

        let cnt = N + ( i<M ? 1 : 0 ) -1
        while(cnt--){
            po = po.next
        }

        const next = po.next
        po.next = null
        po = next
    }

    return res
};