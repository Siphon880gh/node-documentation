"use strict";
function parseInput(input) {
    console.log("Parsing input..."); // Log start of parsing
    // const sections = input.trim().split('\n\n');
    const sections = input.trim().split(/\n\s*\n/);
    const nodeSections = sections.slice(0, -1);
    const connectionSection = sections[sections.length - 1];
    const nodes = {};
    console.log(`Found ${nodeSections.length} node sections.`); // Log the count of node sections found
    nodeSections.forEach(section => {
        const lines = section.split('\n');
        const nameLine = lines[0];
        const nodeName = nameLine.split(': ')[1];
        console.log(`Processing node: ${nodeName}`); // Log the name of the node being processed
        const node = {
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
                node.data[key] = value;
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
            }
            else {
                console.log(`Failed to connect ${parts[i]} to ${parts[i + 1]}`); // Log failed connections
            }
        }
    });
    return nodes;
} // parseInput
// Example usage
const input = `Node: A
  text: This node is about A
  textLeft: The left of A
  textRight: The right of A
  
  Node: B
  text: This node is about B
  textLeft: The left of B
  textRight: The right of B
  
  Node: C
  text: This node is about C
  textLeft: The left of C
  textRight: The right of C
  
  Node: D
  text: This node is about D
  textLeft: The left of D
  textRight: The right of D
  
  Node: E
  text: This node is about E
  textLeft: The left of E
  textRight: The right of E
  
  Node: F
  text: This node is about F
  textLeft: The left of F
  textRight: The right of F
  
  A -> E -> F
  B -> C -> D -> E
  C -> F`;
const nodes = parseInput(input);
console.log(nodes);
// Note: You'll need to implement the logic to determine the appropriate list numbers for nodes.
