function readline(){
    return '2,3,2,1,6,5,4'
  }
  
const input = readline().split(',').map(Number)
// 从乱序区冒泡出最大的，排队进排序区
// [动画](https://www.cnblogs.com/onepixel/p/7674659.html)

for(let i = input.length - 1;i>=0;i--){ // 迭代i次数 === length - 1
    for(let j = 0 ; j < i ; j++ ){//迭代j次数 === 迭代i次数
        if(input[j]>input[j+1]){
            [input[j],input[j+1]] = [input[j+1],input[j]]
        }
    }
}



console.log(input)
