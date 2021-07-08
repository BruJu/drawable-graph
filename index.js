
/**
 * Something that can have properties
 */
class PropertyHolder {
  /** @type {{key: string, value: any}} */
  #properties = [];

  /** @type {number} */ #uid;

  /**
   * Builds a property holder with the given unique id.
   * @param {number} uniqueId A unique id
   */
  constructor(uniqueId) {
    this.#uid = uniqueId;
  }

  /**
   * Returns the unique id passed during construction
   * @returns {number} The unique id
   */
  getId() {
    return this.#uid;
  }

  /**
   * Add a property to this object. 
   * @param {string} propertyKey The property key
   * @param {any} propertyValue The property value
   */
  addProperty(propertyKey, propertyValue) {
    this.#properties.push({ key: propertyKey, value: propertyValue });
    return this;
  }
  
  /**
   * Return all the properties
   * @returns {{ key: string, value: any }[]} All the properties
   */
  getProperties() {
    return this.#properties;
  }

  /**
   * Return the values stored for the given property key
   * @param {string} key The key
   * @returns {any[]} The values of the given key
   */
  getProperty(key) {
    return this.#properties
      .filter(prop => prop.key === key)
      .map(prop => prop.value);
  }
}


/**
 * A node in the graph
 */
class Node extends PropertyHolder {
  /** @type {string[]} */ #labels = [];

  /**
   * Adds the given label to the node.
   * 
   * The labels of a node are a set
   * @param {string} theLabel The label to add
   */
  addLabel(theLabel) {
    if (!this.#labels.includes(theLabel)) {
      this.#labels.push(theLabel);
    }
    return this;
  }

  /**
   * Returns the labels of this node
   * @returns {string[]} The labels of this node
   */
  getLabels() {
    return this.#labels;
  }
}

/**
 * An edge in the graph
 */
class Edge extends PropertyHolder {
  /** @type {Node} */ #source;
  /** @type {Node} */ #destination;
  /** @type {string} */ #label;

  /**
   * Builds a new edge that goes from source to destination.
   * @param {number} uid An unique id
   * @param {Node} source The source of the edge
   * @param {Node} destination The destination of the edge
   * @param {string} label The label of the edge
   */
  constructor(uid, source, destination, label) {
    super(uid);
    this.#source = source;
    this.#destination = destination;
    this.#label = label;
  }

  /**
   * Returns the label of this edge
   * @returns {string} The label of this edge
   */
  getLabel() {
    return this.#label;
  }

  /**
   * Returns the source node
   * @returns {Node} The source node
   */
  getSource() {
    return this.#source;
  }

  /**
   * Returns the destination node
   * @returns {Node} The destination node
   */
  getDestination() {
    return this.#destination;
  }
}

/**
 * A Property Graph
 */
class Graph {
  /** @type {Node[]} */ #nodes = [];
  /** @type {Edge[]} */ #edges = [];
  /** @type {number} */ #nextUniqueId = 1;

  /**
   * 
   * @param {string|undefined} drawing If given, a cute drawing of the graph
   */
  constructor(drawing) {
    if (drawing !== undefined) {
      // TODO
    }
  }

  getNodes() {
    return this.#nodes;
  }

  getEdges() {
    return this.#edges;
  }

  getNbOfNodes() {
    return this.#nodes.length;
  }

  getNbOfEdges() {
    return this.#edges.length;
  }

  /**
   * Adds a new node to the graph
   * @param  {...string} labels Labels of the node 
   * @returns {Node} The created node
   */
  addNode(...labels) {
    const node = new Node(this.#nextUniqueId++);
    this.#nodes.push(node);
    labels.forEach(label => node.addLabel(label));
    return node;
  }

  /**
   * Adds a new edge to the graph.
   * 
   * The two given nodes are supposed to be in the graph
   * @param {Node} source The source node 
   * @param {string} label The label of the edge
   * @param {Node} destination The destination node
   * @returns {Edge} The created edge
   */
  addEdge(source, label, destination) {
    const edge = new Edge(this.#nextUniqueId++, source, destination, label);
    this.#edges.push(edge);
    return edge;
  }


  /**
   * Checks if the two graphs are isomorphic.
   * 
   * This function only works for trivial graphs (ie the one
   * where no node / edge shares the exact same labels and properties)
   * @param {Graph} otherGraph
   * @returns {boolean} True if the two graphs are isomoprhic, false
   * if they are not or the algorithm coudln't guess
   */
  badIsIsomorphicTo(otherGraph) {
    // TODO
  }
}

module.exports = { Graph, Node, Edge };
