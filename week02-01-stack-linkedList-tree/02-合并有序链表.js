function arr4str(str){
    return JSON.parse(str)
}

const in1 =link4arr(arr4str('[1,2,3]'))
const in2 =link4arr(arr4str('[2,3,4]'))


console.log(
    arr4link(
        merge(in1,in2)
        )
    )

function merge(in1,in2){
    if(!in1) return in2
    if(!in2) return in1

    let sm = in1
    let bg = in2
    if(in1.val > in2.val){
        [sm,bg] = [bg,sm]
    }
    sm.next = merge(sm.next,bg)
    return sm

}






















function link4arr(array){
    let hair = new ListNode(0)
    let cur = hair
    array.forEach(val=>{
        cur.next = new ListNode(val)
        cur = cur.next
    })

    return hair.next
}

function ListNode(val){
    this.val = val
    this.next = null
}

function arr4link(linkedList){
    let res = []
    while(linkedList){
        res.push(linkedList.val)

        linkedList = linkedList.next
    }

    return res
}