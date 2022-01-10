/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
 var makeConnected = function(n, connections) {
    if(n>connections.length+1)return -1
    const uf = new UnionFind(n)
    for(let i = 0 ;i<connections.length;i++){
        const [x,y] = connections[i]
        uf.union(x,y)
    }

    return uf.count - 1
};

class UnionFind {
  constructor(n) {
    this.count = 0;
    this.parent = new Map()
    for(let i = 0;i<n;i++){
        this.find(i)
    }
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