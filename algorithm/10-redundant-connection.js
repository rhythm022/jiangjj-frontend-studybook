/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantConnection = function(edges) {
    const uf = new UnionFind(1000)

    for(let i = 0;i<edges.length;i++){
        const [x,y] = edges[i]

        if(uf.find(x) === uf.find(y)){
            return [x,y]
        }else{
            uf.union(x,y)
        }
    }
};



class UnionFind {
  constructor(n) {
    this.count = n;
    this.parent = new Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }
  find(p) {
    const {parent} = this
    while (p !== parent[p]) {
      parent[p] = parent[parent[p]];
      p = parent[p]
    }

    return p;
  }
  union(p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);
    if (rootP === rootQ) return;
    this.parent[rootP] = rootQ;
    this.count--;
  }
}