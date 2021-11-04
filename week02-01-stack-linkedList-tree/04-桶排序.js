//  function readline(){
//      return '[2,3,8,7,1,2,2,8,9]'
//  }


//  const inp = JSON.parse(readline())

//  const bucket = []
//  const res = []
//  inp.forEach(val=>{
//      if(!bucket[val]){
//          bucket[val] = 1
//      } else{
//          bucket[val]++
//      }
//  })
//  bucket.forEach((cnt,val)=>{
//      while(cnt--){
//          res.push(val)
//      }
//  })
//  console.log(res.join(','))



function bucketSort(arr, size) {
    if (arr.length === 0) {
      return arr
    }
  
    let minValue = arr[0]
    let maxValue = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
        minValue = arr[i] // 输入数据的最小值
      }
      if (arr[i] > maxValue) {
        maxValue = arr[i] // 输入数据的最大值
      }
    }
  
    //桶的初始化
    let DEFAULT_BUCKET_SIZE = 2 // 设置桶的默认数量为5
    const bucketSize = size || DEFAULT_BUCKET_SIZE
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
    let buckets = new Array(bucketCount)
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = []
    }
    //利用映射函数将数据分配到各个桶中
    for (let i = 0; i < arr.length; i++) {
      buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
    }
    console.log(buckets)
  
    // arr.length = 0
    // for (let i = 0; i < buckets.length; i++) {
    //   insertionSort(buckets[i]) // 对每个桶进行排序，这里使用了插入排序
    //   for (let j = 0; j < buckets[i].length; j++) {
    //     arr.push(buckets[i][j])
    //   }
    // }
  
    // return arr
  }
  const bucketArr = [1,2,3,4,5,6,7]
//   console.log('before bucket sorting ===>', bucketArr)
  bucketSort(bucketArr)
//   console.log('after bucket sorting ===>', bucketArr)
  