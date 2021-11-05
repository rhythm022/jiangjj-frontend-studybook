function readline(){
    return '2,3,2,1,6,5,4'
  }


const input = readline().split(',').map(Number)

partition(input,0,input.length-1)

console.log(input)

function partition(input,le,ri){
    if(le >= ri) return 
    const base = input[ri]
    let brok = le
    for(let i = le;i<ri;i++){
        if(input[i]<base){
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
    const base = input[ri]
    const sm = []
    const bg = []
    for(let i = le;i<ri;i++){
        if(input[i]<base){
            sm.push(input[i])
        }else{
            bg.push(input[i])
        }
    }
    input.splice(le,ri-le+1,...[...sm,base,...bg])
    partition(input,le,le+sm.length-1)
    partition(input,ri-bg.length+1,ri)
}
*/



// 第三版
/*
function quickSort(arr, low, high) {
    if (high <= low) return
    let base = arr[low]

    let le = low
    let ri = high
    while (le < ri) {
        while (le < ri && arr[ri] >= base) ri--// 找到右边小的
        if (le < ri) arr[le++] = arr[ri]//放到左边

        while (le < ri && arr[le] <= base) le++;// 找到左边大的
        if (le < ri) arr[ri--] = arr[le];//放到右边
    }
    arr[le] = base;// 此时le必等于ri
    quickSort(arr, low, le - 1);
    quickSort(arr, le + 1, high);
}



const xxx = [3, 2, 1]
quickSort(xxx, 0, xxx.length - 1)
console.log(xxx)
*/