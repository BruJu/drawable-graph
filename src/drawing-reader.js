

class NodeLocalizer {
  #knownNodes = {};

  constructor(addNode) {
    this.addNode = addNode;
  }

  #toKey(line, col) {
    return `${line},${col}`;
  }

  addPlus(line, col) {
    const thisOne = this.#toKey(line, col);

    const onTheLeft = this.#toKey(line, col - 1);

    let myNode = undefined;

    const affectMyNode = node => {
      if (myNode !== undefined && myNode !== node) {
        throw Error("Multiple candidates");
      }

      myNode = node;
    };

    if (this.#knownNodes[onTheLeft] !== undefined) {
      affectMyNode(this.#knownNodes[onTheLeft]);
    }

    const onTheTop = this.#toKey(line - 1, col);
    if (this.#knownNodes[onTheTop] !== undefined) {
      affectMyNode(this.#knownNodes[onTheTop]);
    }

    const onTheTopLeft = this.#toKey(line - 1, col - 1);
    if (this.#knownNodes[onTheTopLeft] !== undefined) {
      affectMyNode(this.#knownNodes[onTheTopLeft]);
    }


    if (myNode === undefined) {
      myNode = this.addNode();
    }

    this.#knownNodes[thisOne] = myNode;
  }

}

/**
 * 
 * @param {string} cuteDrawing 
 * @param {*} addNode 
 * @param {*} addEdge 
 */
export default function drawingReader(cuteDrawing, addNode, addEdge) {
  const lines = cuteDrawing.split(/\r?\n/).map(line => [...line]);

  const nodeLocalizer = new NodeLocalizer(addNode);

  // Find nodes
  for (let lineId = 0; lineId < lines.length; ++lineId) {
    let line = lines[lineId];
    for (let charId = 0; charId != line.length; ++charId) {
      const char = line[charId];

      if (char === '+') {
        nodeLocalizer.addPlus(lineId, charId);
      }
    }
  }

//  const x = nodeLocalizer.consolidateNodes();
//
//  x.forEachNode(([parseContent, requiredLines]) => {
//    requiredLines.forEach(requiredLine => {
//      parseContent(lines[requiredLine.lineNumber].slice(requiredLine.start, requiredLine.length));
//    });
//  });



  /*
      } else if (char === '-') {
        // Horizontal edge

      } else if (char === '|') {
        // Vertical edge
      } else if (char === '^') {

      } else if (char === 'v') {

      } else if (char === '<') {

      } else if (char === '>') {

      } else if (char !== ' ') {

      }
    }

  }
  */
}
