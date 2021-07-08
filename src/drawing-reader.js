

class NodeLocalizer {
  #knownNodes = {};

  constructor(addNode, addEdge) {
    this.addNode = addNode;
    this.addEdge = addEdge;
  }

  #toKey(line, col) {
    return `${line},${col}`;
  }

  addPlus(line, col) {
    const thisOne = this.#toKey(line, col);

    const onTheLeft = this.#toKey(line, col - 1);

    if (this.#knownNodes[onTheLeft] !== undefined) {
      this.#knownNodes[thisOne] = this.#knownNodes[onTheLeft];
      return;
    }

    const onTheTop = this.#toKey(line - 1, col);
    if (this.#knownNodes[onTheTop] !== undefined) {
      this.#knownNodes[thisOne] = this.#knownNodes[onTheTop];
      return;
    }

    const onTheTopLeft = this.#toKey(line - 1, col - 1);
    if (this.#knownNodes[onTheTopLeft] !== undefined) {
      this.#knownNodes[thisOne] = this.#knownNodes[onTheTopLeft];
      return;
    }

    this.#knownNodes[thisOne] = this.addNode();
  }

}


function drawingReader(cuteDrawing, addNode, addEdge) {
  const lines = cuteDrawing.split(/\r?\n/).map(line => [...line]);

  const localizer = new NodeLocalizer(addNode, addEdge);

  for (let lineId = 0; lineId < lines.length; ++lineId) {
    let line = lines[lineId];
    for (let charId = 0; charId != line.length; ++charId) {
      const char = line[charId];

      if (char === '+') {
        localizer.addPlus(lineId, charId);
      } else {

      }
    }

  }

  // TODO

}







module.exports = drawingReader;
