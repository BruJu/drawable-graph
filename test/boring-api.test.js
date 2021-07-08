import assert from 'assert';
import { Graph } from '../index.js';

describe('The boring API', () => {
  describe('Graph with nodes', () => {
    it('should work', () => {
      const graph = new Graph();

      const jesse = graph.addNode('Person', 'Director')
        .addProperty('name', 'Jesse');
      
      const bob = graph.addNode('Person')
        .addProperty('name', 'Bob')
        .addProperty('name', 'Bobby')
        .addProperty('lives', 'Lyon');
      
      const jesseMetBob = graph.addEdge(jesse, 'met', bob)
        .addProperty('since', 'a long time');

      const lyon = graph.addNode('City').addProperty('name', 'Lyon');
      
      const boringNode = graph.addNode();

      assert.strictEqual(graph.getNodes().length, 4);
      assert.strictEqual(graph.getEdges().length, 1);

      [jesse, bob, lyon, boringNode].forEach(node => {
        assert.ok(graph.getNodes().includes(node));
      });

      assert.ok(graph.getEdges().includes(jesseMetBob));
    });

  });


});
