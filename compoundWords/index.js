// 10391 Compound Words Problem
// Inputs: [a,alien,born,less,lien,never,nevertheless,new,newborn,the,zebra]
//Max input size = 120.000 words
//Outputs: [alien, newborn]
// Output should be in alphabetical order.

class CompoundWords {
  constructor() {
    this.words = [
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
    this.compoundArr = [];
    this.table = new Array(100);
  }
  hashStingToInt(str) {
    let hash = 17;
    for (let i = 0; i < str.length; i++) {
      hash = (13 * hash * str.charCodeAt(i)) % this.table.length;
    }
    return hash;
  }
  setItem = (key, value) => {
    const idx = this.hashStingToInt(key);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };
  getItem = (key) => {
    const idx = this.hashStingToInt(key);
    return this.table[idx]?.find((x) => x[0] === key)?.[1] ?? null;
  };
  changeItem = (key) => {
    const idx = this.hashStingToInt(key);
    this.table[idx].find((x) => x[0] === key)[1] = true;
  };

  findCompound = function () {
    for (let word of this.words) {
      if (this.getItem(word)) {
        break;
      } else {
        this.setItem(word, false);
        for (let i = 1; i < word.length; i++) {
          let prefix = word.substring(0, i);
          let suffix = word.substring(i);
          if (this.words.includes(prefix) && this.words.includes(suffix)) {
            this.compoundArr.push(word);
            this.changeItem(word);
          }
        }
      }
    }
    return this.compoundArr;
  };
}

const myTable = new CompoundWords();
console.log(myTable.findCompound());
console.log(myTable.table);
