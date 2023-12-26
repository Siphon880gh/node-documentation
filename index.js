/** Edit this line **/
const readFile = "test.txt"

const {parseInput} = require("./libs/parser.js")
const {createHTML} = require("./libs/presenter.js")
const fs = require("fs");

// Example usage
//   const input = `Node: A
//   text: This node is about A
//   textLeft: The left of A
//   textRight: The right of A
  
//   Node: B
//   text: This node is about B
//   textLeft: The left of B
//   textRight: The right of B
  
//   Node: C
//   text: This node is about C
//   textLeft: The left of C
//   textRight: The right of C
  
//   Node: D
//   text: This node is about D
//   textLeft: The left of D
//   textRight: The right of D
  
//   Node: E
//   text: This node is about E
//   textLeft: The left of E
//   textRight: The right of E
  
//   Node: F
//   text: This node is about F
//   textLeft: The left of F
//   textRight: The right of F
  
//   A -> E -> F
//   B -> C -> D -> E
//   C -> F`;

const input = fs.readFileSync(readFile, 'utf8');
  
const [nodes,heads] = parseInput(input);
// console.log(transformed);

const html = createHTML(heads)
// console.log(html);

fs.writeFile("resulted.php", html, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File written successfully\n");
    }
})