/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
 var preorder = function(root) {
    if(!root) return []
    const res = []
    DFS(root,res)

    return res

};


function DFS(node,res){
    res.push(node.val)
    for(let i = 0;i<node.children.length;i++){
        DFS(node.children[i],res)
    }
}