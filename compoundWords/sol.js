// 10391 Compound Words Problem
// Inputs: [a,alien,born,less,lien,never,nevertheless,new,newborn,the,zebra]
//Max input size = 120.000 words
//Outputs: [alien, newborn]

const setFixes = (words) => {
  const wordSet = new Set(words);
  const fixes = new Set();
  for (const word of words) {
    for (let i = 1; i < word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);

      if (wordSet.has(prefix)) fixes.add(prefix);
      if (wordSet.has(suffix)) fixes.add(suffix);
    }
  }
  return fixes;
};

const findCompound = (words) => {
  const fixes = setFixes(words);
  const compounds = new Set();
  for (const word of words) {
    for (let i = 1; i < word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);
      if (fixes.has(prefix) && fixes.has(suffix)) {
        compounds.add(word);
      }
    }
  }
  return [...compounds];
};

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
const compoundArr = findCompound(words);
console.log(compoundArr);
