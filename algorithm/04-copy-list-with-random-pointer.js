/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
 var copyRandomList = function(head) {
    if(!head) return null
    let map = new Map()
    function recur(node){
        if(!node) return null
        if(!map.has(node)){
            let newNode = new Node(node.val)
            map.set(node,newNode)
            newNode.next = recur(node.next)// newNode拿到的node.next一定是一个next和random属性都完整的字树
            newNode.random = recur(node.random)//newNode拿到的node.random大概率只是一个孤零零的节点
        }

        return map.get(node)
    }

    return recur(head)
};

