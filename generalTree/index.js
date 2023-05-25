//Problem 2: Descendant Distance

class Node {
  constructor(name) {
    this.name = name;
  }
  numChildren;
  children = [];
  score;
}

const fs = require("fs");

let file = [];

function readTreeFromFile(filename) {
  const data = fs.readFileSync(filename, "utf8");
  const lines = data.trim().split("\n");
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i].trim().split(" ");
    file.push(a);
  }
}
const filename = "test.txt";
readTreeFromFile(filename);

const findNode = (nodes, numNodes, name) => {
  for (i = 0; i < numNodes; i++) {
    if (nodes[i].name === name) {
      return nodes[i];
    }
  }
  return null;
};

const newNode = (name) => {
  const n = new Node(name);
  n.numChildren = 0;
  return n;
};

const readTree = (nodes, numLines) => {
  let i,
    j,
    numChildren,
    numNodes = 0,
    parentName,
    parentNode,
    childName,
    childNode;

  for (i = 2; i <= numLines + 1; i++) {
    parentName = file[i]?.[0];
    numChildren = parseInt(file[i]?.[1]);

    parentNode = findNode(nodes, numNodes, parentName);

    if (parentNode === null) {
      parentNode = newNode(parentName);

      nodes[numNodes] = parentNode;
      numNodes++;
    }
    parentNode.numChildren = numChildren;

    for (j = 2; j < numChildren + 2; j++) {
      childName = file[i]?.[j];
      childNode = findNode(nodes, numNodes, childName);
      if (childNode === null) {
        childNode = newNode(childName);
        nodes[numNodes] = childNode;
        numNodes++;
      }

      parentNode.children.push(childNode);
    }
  }

  return numNodes;
};

const scoreOne = (n, d) => {
  let total, i;
  if (d === 1) return n.numChildren;
  total = 0;
  for (i = 0; i < n.numChildren; i++) {
    total = total + scoreOne(n.children[i], d - 1);
  }
  return total;
};

const scoreAll = (nodes, numNodes, d) => {
  for (let i = 0; i < numNodes; i++) {
    nodes[i].score = scoreOne(nodes[i], d);
  }
};

const compare = (n1, n2) => {
  if (n1.score > n2.score) return -1;
  if (n1.score < n2.score) return 1;
  return n1.name.localeCompare(n2.name);
};

const outputInfo = (nodes, numNodes) => {
  let i = 0;
  while (i < 3 && i < numNodes && nodes[i].score > 0) {
    console.log(nodes[i].name, nodes[i].score);
    i++;
  }
  while (i < numNodes && nodes[i].score === nodes[i - 1].score) {
    console.log(nodes[i].name, nodes[i].score);
    i++;
  }
};

const main = () => {
  let numCases,
    caseNum,
    n,
    d,
    numNodes,
    nodes = new Array(100);
  numCases = parseInt(file[0]);
  for (caseNum = 1; caseNum <= numCases; caseNum++) {
    console.log(`Tree ${caseNum}:`);
    n = parseInt(file[1][0]);
    d = parseInt(file[1][1]);
    numNodes = readTree(nodes, n);
    scoreAll(nodes, numNodes, d);
    nodes.sort(compare);
    outputInfo(nodes, numNodes);
    if (caseNum < numCases) console.log(" ");
  }
  return 0;
};

main();
