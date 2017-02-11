function Percolation(n) {
	this._n = n;
	this.grid = [];
	this._uf = new unionFind(n * n + 2);
	this._ufTopOnly = new unionFind(n * n + 1);
	// virtual top cell
	this._top = n * n;
	// virtual bottom cell
	this._bottom = n * n + 1;

	for (let i = 0; i < n; i++) {
		let row = [];
		for (let j = 0; j < n; j++)
			row.push(0);
		this.grid.push(row);
	}
}

Percolation.prototype.open = function(i, j) {
	// open a cell, find open neighbors and connect to them
	if (this.isOpen(i, j))
		return;
	this.grid[i][j] = 1;
	let openNeighbors = this._getOpenNeighbors(i, j);
	for (let neighbor of openNeighbors) {
		this._uf.union(ijTo1D(this._n, i, j), ijTo1D(this._n, ...neighbor));
		this._ufTopOnly.union(ijTo1D(this._n, i, j), ijTo1D(this._n, ...neighbor));
	}
	// if cell is in top row, connect to top
	if (i === 0) {
		this._uf.union(ijTo1D(this._n, i, j), this._top);
		this._ufTopOnly.union(ijTo1D(this._n, i, j), this._top);
	}
	// if cell is in bottom row, connect to bottom
	if (i === this._n - 1)
		this._uf.union(ijTo1D(this._n, i, j), this._bottom);
}

Percolation.prototype.isOpen = function(i, j) {
	return this.grid[i][j] === 1;
}

Percolation.prototype.isFull = function(i, j) {
	return this._ufTopOnly.connected(ijTo1D(this._n, i, j), this._top);
}

Percolation.prototype.percolates = function() {
	return this._uf.connected(this._top, this._bottom);
}

Percolation.prototype._getOpenNeighbors = function(i, j) {
	let neighbors = [];
	for (let x = i-1; x <= i+1; x++) {
		for (let y = j-1; y <= j+1; y++) {
			if (isValid(this._n, x, y) && sameRowCol(i, j, x, y))
				neighbors.push([x, y]);
		}
	}
	return neighbors.filter((neighbor) => this.isOpen(...neighbor));

};

function isValid(n, i, j) {
	// checks that cells are in grid
	return i >= 0 && i < n && j >= 0 && j < n;
}

function sameRowCol(i, j, x, y) {
	// checks that cells in same row or col but not both
	return (i === x) ^ (j === y); 
}

function ijTo1D(n, i, j) {
	// convert grid representation to 1D array
	return n*i + j;
}
