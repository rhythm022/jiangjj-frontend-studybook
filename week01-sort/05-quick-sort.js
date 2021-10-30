function readline(){
    return '2,3,2,1,6,5,4'
  }
  

const input = readline().split(',').map(Number)

partition(input,0,input.length-1)

console.log(input)

function partition(input,le,ri){
    if(le >= ri) return 
    const pivot = input[ri]
    let brok = le
    for(let i = le;i<ri;i++){
        if(input[i]<pivot){
            [input[brok],input[i]] = [input[i],input[brok]]
            brok++
        }
    }
    [input[brok],input[ri]] = [input[ri],input[brok]]

    
    partition(input,le,brok-1)
    partition(input,brok+1,ri)
}




// 第一版
/*
partition(input,0,input.length-1)
function partition(input,le,ri){
    if(le >= ri) return 
    const pivot = input[ri]
    const sm = []
    const bg = []
    for(let i = le;i<ri;i++){
        if(input[i]<pivot){
            sm.push(input[i])
        }else{
            bg.push(input[i])
        }
    }
    input.splice(le,ri-le+1,...[...sm,pivot,...bg])
    partition(input,le,le+sm.length-1)
    partition(input,ri-bg.length+1,ri)
}
*/