function unionFind(N) {
	this._id = new Array(N); // id[i] = parent of i, or i if i is root
	this._sz = new Array(N); // sz[i] = size of the tree rooted at i
	let i;
	// initialize all nodes to be roots, all sizes to be 1
	for (i = 0; i <=N; i++) {
		this._id[i] = i;
		this._sz[i] = 1;
	}
}

unionFind.prototype._root = function(i) {
	let j = i;
	// climb the tree until we find the root
	while (this._id[i] !== i)
		i = this._id[i];
	// second pass to compress the path by setting all parents in
	// the traversed path directly to the root we just found
	while (this._id[j] !== j) {
		let temp = j;
		j = this._id[j];
		this._id[temp] = i;
	}
	return i;
};

unionFind.prototype.connected = function(p, q) {
	// components are connected if they have the same root
	return this._root(p) === this._root(q);
};

unionFind.prototype.union = function(p, q) {
	// set the root of the smaller tree equal to the root of the larger tree to keep balanced
	let rootP = this._root(p);
	let rootQ = this._root(q);
	if (this._sz[rootP] > this._sz[rootQ]) {
		this._id[rootQ] = rootP;
		this._sz[rootP] += this._sz[rootQ];
	}
	else {
		this._id[rootP] = rootQ;
		this._sz[rootQ] += this._sz[rootP];
	}
};