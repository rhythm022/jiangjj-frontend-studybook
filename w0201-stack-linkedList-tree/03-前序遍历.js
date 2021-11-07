function tree4arr(array){
    let root
    function insertNode(parent,child){
        if(!child.val) return 
        if(child.val<parent.val){
            if(!parent.left)parent.left = child
            else insertNode(parent.left,child)
        }else{
            if(!parent.right)parent.right = child
            else insertNode(parent.right,child)
        }

    }

    array.forEach(val=>{
        let node = new Node(val)
        if(root){
            insertNode(root,node)

        }else{
            root = node
        }

    })

    return root
}



class Node{
    constructor(val,left,right){
        this.val = val
        this.left = left
        this.right = right
    }
}


function readline(){
    return '1,,2,3'
}

const res = []
const inp = tree4arr(readline().split(','))
DFS(inp)
function DFS(root){
    if(!root) return
    res.push(root.val)
    DFS(root.left)
    DFS(root.right)
}

console.log(res.join(','))