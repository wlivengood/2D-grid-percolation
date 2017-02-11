initialize(20);

function initialize(n) {
  let p = new Percolation(n);
  createGrid(p, n);
};

function animate(n) {
  let p = new Percolation(n);
  nextFrame(p, n);
}
function nextFrame(p, n) {
  if (!p.percolates()) {
    let randCell = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)];
    if (!p.isOpen(...randCell)) {
      p.open(...randCell);
      updateGrid(p);
      setTimeout(function(){nextFrame(p, n)}, 50);
    }
    else {
      nextFrame(p, n);
    }
  }
}

function createGrid(p, n) {
  let table = document.createElement("tbody");

  let tableHtml = '';
  for (let i = 0; i < n; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < n; j++)
      tableHtml += "<td class='closed' id='" + j + "-" + i + "'></td>";
    tableHtml += "</tr>";
  }

  table.innerHTML = tableHtml;

  let grid = document.getElementById("grid");
  grid.appendChild(table);

  (function setUpPlay() {
    let playBtn = document.getElementById("play_btn");
    playBtn.onclick = function() {animate(n)};
  })();

  (function setUpClear() {
    let clearBtn = document.getElementById("clear_btn");
    clearBtn.onclick = window.location.reload.bind(window.location);
  })();
}

function updateGrid(p) {
  for (let i = 0; i < p.grid.length; i++) {
    for (let j = 0; j < p.grid.length; j++) {
      let id = j + "-" + i;
      let cell = document.getElementById(id);
      if (p.isOpen(i, j)) {
        cell.className = "open";
      }
      if (p.isFull(i, j)) {
        cell.className = "full";
      }
    }
  }
}