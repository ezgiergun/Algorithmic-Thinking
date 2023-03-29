// 10391 Compound Words Problem
// Inputs: [a,alien,born,less,lien,never,nevertheless,new,newborn,the,zebra]
//Max input size = 120.000 words
//Outputs: [alien, newborn]
// Output should be in alphabetical order.

const words = [
  "a",
  "alien",
  "born",
  "less",
  "lien",
  "never",
  "nevertheless",
  "new",
  "newborn",
  "the",
  "zebra",
  "zebra",
];
let compoundArr = [];
let memo = new Map();

setFixes = () => {
  for (let word of words) {
    for (let i = 1; i < word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);
      memo.set(prefix, false);
      memo.set(suffix, false);
    }
  }
};
findCompound = () => {
  setFixes();
  for (let word of words) {
    for (let i = 1; i < word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);

      if (memo[prefix] === true && memo[suffix] === true) {
        compoundArr.push(word);
        break;
      } else {
        if (words.includes(prefix) && words.includes(suffix)) {
          compoundArr.push(word);
          memo.set(prefix, true);
          memo.set(prefix, true);
        }
      }
    }
  }
  return compoundArr;
};

findCompound();
console.log(compoundArr);
