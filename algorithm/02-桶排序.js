// 1.准备桶。
// 桶排序的依据？
//         数据集里所有的数都在一个区间内。找出这个总区间，然后在这个总区间里，划分子区间，把每个元素扔到属于他的子区间，然后我们只需要在每个子区间内做排序，整个数据集就能达到有序。

//         我们把处于同一区间的数据放在一块儿，这就是一个桶，一个桶里有处在同一区间的所有数据，然后在桶内做排序。

// 子区间 = 桶。我们人为划分的子区间的长度都是同一规格长度的。划分几个子区间？
//         总区间长度 = 子区间的个数 * 子区间的长度。
//         总区间长度，就是找出总数据集中最大的元素和最小的元素，最小的元素、最大的元素之间的距离就是总区间长度。
        
//         子区间涵盖了总区间里的一段区间，子区间越长，需要的子区间个数就越少，到时候放到单个子区间中的数据个数就越多。
//         比如现在[1,2,5,6,10]数据集内最小最大值分别为1和10，人为设置子区间尺寸为2，就需要5个子区间<> <> <> <> <>，分别涵盖
//         <1到2><3到4><5到6><7到8><9到10>的数据
//         如果子区间尺寸为3，就需要4个区间<><><><>，分别涵盖<1到3><4到6><7到9><10>
//         如果子区间尺寸为4，就需要3个区间<><><>，分别涵盖<1到4><5到8><9到10>
//         因此，根据区间的尺寸，用到的区间数量是动态的。根据桶的大小，用到的桶的数量是动态的。
//         现在让我们用代码实现：根据数据集内最小最大值、桶的大小，动态生成桶。
function getBuckets(min,max,subRange){
    const range = max - min + 1
    const amount = Math.ceil(range/subRange)// 总区间 / 子区间

    return new Array(amount).fill().map(()=>[])
}
// console.log(getBuckets(1,10,2))// [ [], [], [], [], [] ]
// console.log(getBuckets(1,10,3))// [ [], [], [], [] ]
// console.log(getBuckets(1,10,4))// [ [], [], [] ]

//2.把数据放入他所属的区间
//比如4，当子区间尺寸为3时，放入<4到6>第二个桶
//当子区间尺寸为4时，放入<1到4>第一个桶
//让我们用代码实现：将数值放入桶。根据当前数值距数据集最小值的距离、子区间的大小，实现放入。
function insert(number,min,subRange,buckets){
const bucketIndex = Math.floor((number - min) / subRange)

buckets[bucketIndex].push(number)

return buckets
}
// console.log(insert(4,1,3,getBuckets(1,10,3)))// [ [], [ 4 ], [], [] ]
// console.log(insert(4,1,4,getBuckets(1,10,4)))// [ [ 4 ], [], [] ]

//3.对桶内进行排序
function sortInBucket(bucket){
insertionSort(bucket)

return bucket
}
// console.log(sortInBucket([1,5,2,3]))// [1,2,3,5]

//4.把有序的数据从每个桶里拿出来
function sortedArrayFromBuckets(buckets){
return buckets.flat()

}
// console.log(sortedArrayFromBuckets([[1,2,3,5],[6,7,8]]))// [1,2,3,5,6,7,8]

function bucketSort(arr,subRange = 3){
if (!arr.length) return arr

// 获取min和max
let min = arr[0]
let max = arr[0]
for (let i = 1; i < arr.length; i++) {
if (arr[i] < min) min = arr[i] 
if (arr[i] > max) max = arr[i] 
}
// 1.生成空桶
const buckets = getBuckets(min,max,subRange)

// 2.把数据放入桶
for (let i = 0; i < arr.length; i++) {
insert(arr[i],min,subRange,buckets)
}

// 3.桶内排序
for (let i = 0; i < buckets.length; i++) {
const bucket = buckets[i]
sortInBucket(bucket)
}

// 4.把有序的数据从桶里拿出来
return sortedArrayFromBuckets(buckets)
}


console.log(bucketSort([5,4,6,7,3,2,8,1111]))


function insertionSort(input,n = 1){
for(let i = n;i<input.length;i += n){
let cur = input[i]
let j = i - n

while(j>=0 && input[j]>cur){
    input[j+n] = input[j]
    j -=n
}
input[j+n] = cur

}
}