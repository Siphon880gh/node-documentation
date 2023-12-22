"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function parseTextFile(filePath) {
    const data = fs_1.default.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const nodes = [];
    let currentNode = null;
    let nodeMap = {};
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '')
            continue;
        if (trimmedLine === '===') {
            // Separator for node text
            if (currentNode) {
                currentNode.text = '';
            }
        }
        else if (trimmedLine === '<==') {
            // Text explaining the left connection
            if (currentNode) {
                const leftText = lines.shift() || ''; // Get the next line as left text
                currentNode.textLeft = leftText.trim();
            }
        }
        else if (trimmedLine === '==>') {
            // Text explaining the right connection
            if (currentNode) {
                const rightText = lines.shift() || ''; // Get the next line as right text
                currentNode.textRight = rightText.trim();
            }
        }
        else if (trimmedLine.includes('->')) {
            // Connection line (right)
            const [from, to] = trimmedLine.split('->').map((s) => s.trim());
            if (!nodeMap[from] || !nodeMap[to]) {
                // If nodes are not yet created, create them
                if (!nodeMap[from]) {
                    nodeMap[from] = { NAME: from, type: 'primary', prev: [], next: [] };
                    nodes.push(nodeMap[from]);
                }
                if (!nodeMap[to]) {
                    nodeMap[to] = { NAME: to, type: 'primary', prev: [], next: [] };
                    nodes.push(nodeMap[to]);
                }
            }
            nodeMap[from].next.push(nodeMap[to]);
        }
        else if (trimmedLine.includes('<-')) {
            // Connection line (left)
            const [from, to] = trimmedLine.split('<-').map((s) => s.trim());
            if (!nodeMap[from] || !nodeMap[to]) {
                // If nodes are not yet created, create them
                if (!nodeMap[from]) {
                    nodeMap[from] = { NAME: from, type: 'primary', prev: [], next: [] };
                    nodes.push(nodeMap[from]);
                }
                if (!nodeMap[to]) {
                    nodeMap[to] = { NAME: to, type: 'primary', prev: [], next: [] };
                    nodes.push(nodeMap[to]);
                }
            }
            nodeMap[to].prev.push(nodeMap[from]);
        }
        else if (trimmedLine.match(/^[A-Z]+$/)) {
            // Node name line
            const NAME = trimmedLine;
            const type = 'primary';
            if (!nodeMap[NAME]) {
                nodeMap[NAME] = { NAME, type, prev: [], next: [] };
                nodes.push(nodeMap[NAME]);
            }
            currentNode = nodeMap[NAME];
        }
        else {
            // Node text line
            if (currentNode) {
                currentNode.text += `${trimmedLine}\n`;
            }
        }
    }
    return nodes;
}
const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide a file path.');
}
else {
    const nodes = parseTextFile(filePath);
    //   console.log(JSON.stringify(nodes, null, 2));
    console.log(JSON.stringify(nodes, null, 0));
}
