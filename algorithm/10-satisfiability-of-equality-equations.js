/**
 * @param {string[]} equations
 * @return {boolean}
 */
 var equationsPossible = function(equations) {
    const uf = new UnionFind(26)
    for(let i = 0;i<equations.length;i++){
        const cur = equations[i]
        if(cur[1] === '='){
            const x = cur[0].codePointAt() - 'a'.codePointAt()
            const y = cur[3].codePointAt() - 'a'.codePointAt()
            uf.union(x,y)
        }
    }
    for(let i = 0;i<equations.length;i++){
        const cur = equations[i]
        if(cur[1] === '!'){
            const x = cur[0].codePointAt() - 'a'.codePointAt()
            const y = cur[3].codePointAt() - 'a'.codePointAt()
            if(uf.find(x) === uf.find(y))return false
        }
    }

    return true

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