// Define the DNode type with prev and next arrays of DNode or null
type DNode = {
    prev: (DNode | null)[];
    next: (DNode | null)[];
  };
  
  // DNode 1: Head of List 1
  let dNode1: DNode = {
    prev: [null], // Indicates that this is the head of the primary linked list
    next: []      // Will be filled with the next node (dNode2)
  };
  
  // DNode 2: Part of List 1 and head of List 2
  let dNode2: DNode = {
    prev: [dNode1], // Primary connection to dNode1, part of List 1
    next: []        // Will be filled with the next nodes (dNode3 and anotherList's node)
  };
  
  // DNode 3: Tail of List 1
  let dNode3: DNode = {
    prev: [dNode2], // Primary connection to dNode2, part of List 1
    next: [null]    // Indicates that this is the tail of the primary linked list
  };
  
  // Connect nodes for List 1
  dNode1.next.push(dNode2); // dNode1 -> dNode2
  dNode2.next.push(dNode3); // dNode2 -> dNode3
  
  // Example of a DNode in a separate List 2, where DNode 2 is also the head
  let anotherDListNode: DNode = {
    prev: [dNode2, null], // Connected to dNode2 as a secondary list, null indicates it's a head in another list
    next: [null]          // Indicates that this is the tail of the secondary list
  };
  
  // Connecting the separate node to DNode 2's next
  dNode2.next.push(anotherDListNode); // dNode2 -> anotherDListNode (secondary connection)
  
  // Now, dNode1 and dNode3 form the primary linked list (List 1), with dNode2 being a part of it but also the head of another list (List 2) through its connection to anotherDListNode.
//   console.log(JSON.stringify(dNode1, null, 0))
//   console.log(JSON.stringify(dNode1))

  function safeStringify(node: DNode, visited = new Set()): string {
    // Check for circular reference
    if (visited.has(node)) {
      return 'Circular Reference';
    }
  
    visited.add(node);
  
    // Create a simple object to represent the node
    const simpleNode: any = {};
    simpleNode.prev = node.prev.map(n => n ? safeStringify(n, visited) : null);
    simpleNode.next = node.next.map(n => n ? safeStringify(n, visited) : null);
  
    return JSON.stringify(simpleNode);
  } // safeStringify
  
  function readableStringify(node: DNode, visited = new Set(), depth = 0): string {
    if (visited.has(node)) {
      return 'Circular Reference';
    }
  
    visited.add(node);
  
    let indent = ' '.repeat(depth * 2); // Indentation for readability
    let nodeString = `${indent}DNode {\n`;
  
    indent = ' '.repeat((depth + 1) * 2); // Increase indent for properties
  
    // Process prev array
    nodeString += `${indent}prev: [`;
    nodeString += node.prev.map(n => (n ? readableStringify(n, visited, depth + 2) : 'null')).join(', ');
    nodeString += `],\n`;
  
    // Process next array
    nodeString += `${indent}next: [`;
    nodeString += node.next.map(n => (n ? readableStringify(n, visited, depth + 2) : 'null')).join(', ');
    nodeString += `]\n`;
  
    nodeString += `${' '.repeat(depth * 2)}}`; // Close the DNode block
  
    return nodeString;
  } // readableStringify
  
  console.log(readableStringify(dNode1));
  

//   console.log(safeStringify(dNode1));