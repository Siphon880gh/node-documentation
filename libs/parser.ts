  // @ts-ignore
  type DNode = {
    prev: (DNode | null)[];
    next: (DNode | null)[];
    data: {
      name: string;        // Mandatory 'name' property
      text?: string;       // Optional 'text' property
      textLeft?: string;   // Optional 'textLeft' property
      textRight?: string;  // Optional 'textRight' property
    };
    listMemberships: Set<number>; // Tracks which lists the node belongs to
  };
  
  function parseInput(input: string): [Record<string, DNode>, DNode[]] {

    console.log("Parsing input..."); // Log start of parsing
    // const sections = input.trim().split('\n\n');
    const sections = input.trim().split(/\n\s*\n/);
  
    const nodeSections = sections.slice(0, -1);
    const connectionSection = sections[sections.length - 1];
  
    const nodes: Record<string, DNode> = {};
    let heads:DNode[] = [];
  
    console.log(`Found ${nodeSections.length} node sections.`); // Log the count of node sections found
  
    nodeSections.forEach(section => {
      const lines = section.split('\n');
      const nameLine = lines[0];
      const nodeName = nameLine.split(': ')[1];
  
      console.log(`Processing node: ${nodeName}`); // Log the name of the node being processed
  
      const node: DNode = {
        prev: [],
        next: [],
        data: {
          name: nodeName,
          text: '',
          textLeft: '',
          textRight: ''
        },
        listMemberships: new Set()
      };
  
      lines.slice(1).forEach(line => {
        const [key, value] = line.split(': ').map(part => part.trim());
        if (key && value && key in node.data) {
          node.data[key as keyof DNode['data']] = value;
          console.log(`Set ${key} for node ${nodeName}`); // Log the setting of each property
        }
      });
  
      nodes[nodeName] = node;
    });
  
    console.log(`Processing connections: ${connectionSection}`); // Log the connections section
  
    const connections = connectionSection.split('\n');
    connections.forEach((connection, listIndex) => {
      const parts = connection.split('->').map(part => part.trim());
      const currentListNumber = listIndex + 1;
  
      for (let i = 0; i < parts.length - 1; i++) {
        if(i===0) {
          heads.push(nodes[parts[i]]);
        }

        const currentNode = nodes[parts[i]];
        const nextNode = nodes[parts[i + 1]];
  
        if (currentNode && nextNode) {
          currentNode.next.push(nextNode);
          nextNode.prev.push(currentNode);
  
          // @ts-ignore
          currentNode.listMemberships.add(currentListNumber);
          // @ts-ignore
          nextNode.listMemberships.add(currentListNumber);
  
          console.log(`Connected ${parts[i]} to ${parts[i + 1]} in list ${currentListNumber}`); // Log the connection
        } else {
          console.log(`Failed to connect ${parts[i]} to ${parts[i + 1]}`); // Log failed connections
        }
      }
    });
  
    return [nodes, heads];
  } // parseInput

  module.exports = {
    parseInput
  }