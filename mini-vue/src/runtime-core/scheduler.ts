
const queue:any[] = []
const p = Promise.resolve()
let isFlushPending = false

export function queueJobs(job){
    if(!queue.includes(job)){
        queue.push(job)
    }

     queueFlush()
}


function queueFlush(){
    if(isFlushPending)return
    isFlushPending = true

    nextTick(()=>{
        isFlushPending = false
        let job
        while(job = queue.shift()){
            job && job()
        }
    })
}

export function nextTick(fn){
    return fn ? p.then(fn) : p
}