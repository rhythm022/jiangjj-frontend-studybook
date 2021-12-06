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
    return returnCopyed(head,new Map())
};

function returnCopyed(node,global){
    if(!node)return null
    if(global.has(node))return global.get(node)

    const copyed = new Node(node.val)
    global.set(node,copyed)
    copyed.next = returnCopyed(node.next,global)
    copyed.random = returnCopyed(node.random,global)

    return copyed
}