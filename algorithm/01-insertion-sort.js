function readline(){
    return '2,3,2,1,6,5,4'
  }
  
const input = readline().split(',').map(Number)
// 从乱序区依次迭代，插入排序区合理位置
// [动画](https://www.cnblogs.com/onepixel/p/7674659.html)

for(let i = 1;i<input.length;i++){
    let cur = input[i]
    let j = i - 1

    while(j>=0 && input[j]>cur){
        input[j+1] = input[j]
        j--
    }
    input[j+1] = cur

}


console.log(input)
