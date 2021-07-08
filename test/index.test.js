import assert from 'assert';
import { Node, Edge, Graph } from '../index.js';

describe('Drawing PG', () => {
  it('should properly setup the right number of nodes', () => {
    assert.strictEqual((new Graph("")).getNbOfNodes(), 0);
    assert.strictEqual((new Graph("+")).getNbOfNodes(), 1);
    assert.strictEqual((new Graph("+++")).getNbOfNodes(), 1);
    assert.strictEqual((new Graph("+++ +  +++")).getNbOfNodes(), 3);
    assert.strictEqual((new Graph(
      `
      +
      +
      `
      )).getNbOfNodes(), 1);

    assert.strictEqual((new Graph(
      `
      +++++
      +   +
      +++++
      `
      )).getNbOfNodes(), 1);

    assert.strictEqual((new Graph(
      `
      +++++ ++++ +++++
      +   + +  +
      +++++ ++++ +++++
      `
    )).getNbOfNodes(), 4);

    assert.throws(() => {
      new Graph(
        `
        +++++ ++++ +++++
        +   + +  +     +
        +++++ ++++ +++++
        `
      )
    });
  });


  it('should let the user draw', () => {
    const drawnGraph = new Graph(
      `
      ++++++++++++++++     :met              ++++++++++++++
      +:Person       +     place: "Lyon"     +:Person     +
      +name: "Alice" +---------------------->+name: "Bob" +
      ++++++++++++++++                       ++++++++++++++
         |
         | :worksFor
         | since: "2021-07-01"
         |
         V
       +++++++++++++++++++++++++++++++++++++
       +:Enterprise :Company               +
       + name: "ACME"                      +
       + name: "ACME Incorporation"        +
       + description: "ACME is a company"  +
       + nbOfEmployees: 3                  +
       +++++++++++++++++++++++++++++++++++++
      `
    );

    const referenceGraph = new Graph();
    const refAlice = referenceGraph.addNode("Person").addProperty("name", "Alice");
    const refBob = referenceGraph.addNode("Person").addProperty("name", "Bob");
    referenceGraph.addEdge(refAlice, "met", refBob).addProperty("place", "Lyon");

    const refAcme = referenceGraph.addNode("Enterprise", "Company")
      .addProperty("name", "ACME")
      .addProperty("name", "ACME Incorporation")
      .addProperty("description", "ACME is a company")
      .addProperty("nbOfEmployees", 3);
    
    referenceGraph.addEdge(refAlice, "worksFor", refAcme)
      .addProperty("since", "2021-07-01");
        
    // assert.ok(drawnGraph.badIsIsomorphicTo(referenceGraph));
  });



});


/*


-------------->-------
|      | :met  |     |
--------<-------------


    ------|
    |     |
    ------|
|---|  |   ----|
|   |--+---|   |
|---|  |   ----|
    ------|
    |     |
    |------
    
*/


`

`
