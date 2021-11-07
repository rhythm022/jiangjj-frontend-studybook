function readline(){
  return '2,1,3,2,1'
}

const input = readline().split(',').map(Number)
// 从乱序区选择最小的，排队进排序区
// [动画](https://www.cnblogs.com/onepixel/p/7674659.html)
for(let i = 0;i<input.length-1;i++){
  let min = i
  for(let j = i+1;j<input.length;j++){
    if(input[j]<input[min]){
      min = j
    }
  }
  [input[i],input[min]] = [input[min],input[i]]
}

console.log(input)
