/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
 var smallestStringWithSwaps = function(s, pairs) {

    const uf = new UnionFind()

    for(let i = 0;i<pairs.length;i++){
        const [x,y]  = pairs[i]
        uf.union(x,y)
    }
    const hash = {}
    for(let i = 0;i<s.length;i++){
        const root = uf.find(i)
        if(!hash[root]){
           hash[root] = new MinPriorityQueue({priority:a=>a.codePointAt()})

           hash[root].enqueue(s[root])
        }
        if(!hash[i]){

           hash[i] = hash[root]
           hash[i].enqueue(s[i])
        }

    }

    let res = []
    for(let i = 0;i<s.length;i++){
       const cur = hash[i]
        res.push(cur.dequeue().element)
    }

    return res.join('')

};




class UnionFind {
  constructor() {
    this.count = 0;
    this.parent = new Map()
  }
  find(x) {
    const {parent} = this

      if(!parent.has(x)){
          parent.set(x,x)
            this.count++
      }

      if(x !== parent.get(x)){
          parent.set(x,this.find(parent.get(x)))
      }


    return parent.get(x);
  }
  union(p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);
    if (rootP === rootQ) return;
    this.parent.set(rootP,rootQ)
    this.count--;
  }
}