type DNode = {
    prev: (DNode | null)[];
    next: (DNode | null)[];
    data: {
      name: string;        // Mandatory 'name' property
      text?: string;       // Optional 'text' property
      textLeft?: string;   // Optional 'textLeft' property
      textRight?: string;  // Optional 'textRight' property
    };
    listMemberships?: Set<number>; // Set to keep track of which lists the node belongs to
  };
  
  function readableStringify(node: DNode, visited = new Set<DNode>(), depth = 0): string {
    if (visited.has(node)) {
      return 'Circular Reference';
    }
  
    visited.add(node);
  
    let indent = ' '.repeat(depth * 2);
    let nodeString = `${indent}DNode {\n`;
  
    indent = ' '.repeat((depth + 1) * 2);
  
    // Handle the mandatory data property and its optional sub-properties
    nodeString += `${indent}data: {\n`;
    nodeString += `${indent}  name: "${node.data.name}",\n`;
    nodeString += node.data.text ? `${indent}  text: "${node.data.text}",\n` : '';
    nodeString += node.data.textLeft ? `${indent}  textLeft: "${node.data.textLeft}",\n` : '';
    nodeString += node.data.textRight ? `${indent}  textRight: "${node.data.textRight}"\n` : '';
    nodeString = nodeString.trimEnd().endsWith(',') ? nodeString.trimEnd().slice(0, -1) + '\n' : nodeString;
    nodeString += `${indent}},\n`;
  
    // Handle the prev array
    nodeString += `${indent}prev: [`;
    nodeString += node.prev.map(n => (n ? readableStringify(n, visited, depth + 2) : 'null')).join(', ');
    nodeString += `],\n`;
  
    // Handle the next array
    nodeString += `${indent}next: [`;
    nodeString += node.next.map(n => (n ? readableStringify(n, visited, depth + 2) : 'null')).join(', ');
    nodeString += `]\n`;
  
    nodeString += `${' '.repeat(depth * 2)}}`; // Close the DNode block
  
    return nodeString;
  }
  
  // Example usage:
  let dNode1: DNode = {
    prev: [null],
    next: [],
    data: {
      name: "Node 1",  
      text: "Node 1 Text",
      textLeft: "Left Text for Node 1",
      textRight: "Right Text for Node 1"
    },
    listMemberships: new Set([1]) // This node is initially part of list 1
  };
  
  let dNode2: DNode = {
    prev: [dNode1],
    next: [],
    data: {
      name: "Node 2",
      // text, textLeft, and textRight are omitted for this node
    },
    listMemberships: new Set([])
  };
  
  // Connect the nodes
  dNode1.next.push(dNode2);
  
  
// Create a new separate linked list (List 2)
let dNode3: DNode = {
    prev: [null],
    next: [],
    data: {
      name: "Node 3",
      text: "Node 3 Text",
      textLeft: "Left Text for Node 3"
    },
    listMemberships: new Set([2]) // This node is initially part of list 2
  };
  
  let dNode4: DNode = {
    prev: [dNode3],
    next: [null],  // This indicates that dNode4 is the tail of List 2
    data: {
      name: "Node 4",
      textRight: "Right Text for Node 4"
    },
    listMemberships: new Set([])
  };
  
  // Connect nodes for the second list
  dNode3.next.push(dNode4);
  
  // Create another linked list (List 3) that intersects with List 1 and List 2
  let dNode5: DNode = {
    prev: [null],
    next: [dNode2, dNode4],  // Intersecting with dNode2 from List 1 and dNode4 from List 2
    data: {
      name: "Node 5",
      text: "Node 5 is connected to Node 2 and Node 4"
    },
    listMemberships: new Set([3]) // This node is initially part of list 3
  };
  
  // Update connections for the intersecting nodes
  dNode2.next.push(dNode5);  // Connecting dNode2 to dNode5
  dNode4.prev.push(dNode5);  // Connecting dNode4 to dNode5

  // Array to hold the head nodes of each list
    let heads: DNode[] = [dNode1, dNode3, dNode5];

    // Logging the structure starting from each head node
    console.log("Total linked lists: ", heads.length);
    heads.forEach((head, index) => {
    console.log(`\nList ${index + 1} from ${head.data.name}:`);
    console.log(readableStringify(head));
    });
  
  // Logging the structure starting from dNode1 and dNode3
  console.log("List 1 from dNode1:");
  console.log(readableStringify(dNode1));
  
  console.log("\nList 2 from dNode3:");
  console.log(readableStringify(dNode3));
  
  console.log("\nList 3 from dNode5:");
  console.log(readableStringify(dNode5));

  // HTML PORTION
  function renderNode(node: DNode, listNumber: number, visited = new Set<DNode>()): string {
    if (visited.has(node)) return ''; 
  
    visited.add(node);
  
    console.log(`Rendering node: ${node.data.name}`); // Log the node being rendered
  
    // Determine the class for the node's border color
    let classList = `node-box list-${listNumber}`;
  
    // Determine if the node is an intersection
    if (node.listMemberships && node.listMemberships.size > 1) {
      classList += ' intersected';
    }
  
    let content = `<div class="${classList}">`;
    content += `<strong>${node.data.name}</strong><br>`; // Display the node's name
  
    // Check and append text properties if they exist
    if (node.data.text) {
      console.log(`Text for ${node.data.name}: ${node.data.text}`); // Log the text
      content += `${node.data.text}<br>`;
    }
    if (node.data.textLeft) {
      console.log(`TextLeft for ${node.data.name}: ${node.data.textLeft}`); // Log the textLeft
      content += `${node.data.textLeft}<br>`;
    }
    if (node.data.textRight) {
      console.log(`TextRight for ${node.data.name}: ${node.data.textRight}`); // Log the textRight
      content += `${node.data.textRight}<br>`;
    }
  
    // Render the 'next' nodes recursively
    node.next.forEach(nextNode => {
      if (nextNode) {
        nextNode.listMemberships = nextNode.listMemberships || new Set();
        nextNode.listMemberships.add(listNumber);
        content += renderNode(nextNode, listNumber, visited);
      }
    });
  
    content += `</div>`;
    return content;
  }
  
  

// Render each list and append it to the container
heads.forEach((head, index) => {
    let listContent = renderNode(head, index + 1);
    document.getElementById('linkedListsContainer')!.innerHTML += listContent;
  });