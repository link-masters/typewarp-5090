// Zalgo/Cursed text generation constants and functions

const UP = [
  "\u030d",
  "\u030e",
  "\u0304",
  "\u0305",
  "\u033f",
  "\u0311",
  "\u0306",
  "\u0310",
  "\u0352",
  "\u033d",
  "\u0313",
  "\u0314",
  "\u0301",
  "\u0341",
  "\u0300",
  "\u0340",
  "\u0307",
  "\u0308",
  "\u030a",
  "\u0342",
  "\u0343",
  "\u0344",
  "\u034a",
  "\u034b",
  "\u034c",
  "\u0303",
  "\u0302",
  "\u030c",
  "\u0350",
  "\u030b",
  "\u030f",
  "\u0312",
  "\u0315",
  "\u031b",
  "\u031c",
  "\u031d",
  "\u035d",
  "\u035e",
  "\u035f",
  "\u0360",
  "\u0361",
  "\u0362",
  "\u0309",
  "\u0323",
  "\u0324",
  "\u0325",
  "\u0326",
  "\u0327",
  "\u0328",
  "\u0329",
  "\u032a",
  "\u032b",
  "\u032c",
  "\u032d",
  "\u032e",
  "\u032f",
  "\u0330",
  "\u0331",
  "\u0332",
  "\u0333",
  "\u033a",
  "\u033b",
  "\u033c",
  "\u0345",
  "\u0347",
  "\u0348",
  "\u0349",
  "\u034d",
  "\u034e",
  "\u0353",
  "\u0354",
  "\u0355",
  "\u0356",
  "\u0359",
  "\u035a",
  "\u0321",
  "\u0322",
];

const MIDDLE = [
  "\u0315",
  "\u031b",
  "\u031c",
  "\u031d",
  "\u035d",
  "\u035e",
  "\u035f",
  "\u0360",
  "\u0361",
  "\u0362",
  "\u0334",
  "\u0335",
  "\u0336",
  "\u0337",
  "\u0338",
];

const DOWN = [
  "\u0316",
  "\u0317",
  "\u0318",
  "\u0319",
  "\u031a",
  "\u031e",
  "\u031f",
  "\u0320",
  "\u0321",
  "\u0322",
  "\u0323",
  "\u0324",
  "\u0325",
  "\u0326",
  "\u0327",
  "\u0328",
  "\u0329",
  "\u032a",
  "\u032b",
  "\u032c",
  "\u032d",
  "\u032e",
  "\u032f",
  "\u0330",
  "\u0331",
  "\u0332",
  "\u0333",
  "\u0339",
  "\u033a",
  "\u033b",
  "\u033c",
  "\u0345",
  "\u0347",
  "\u0348",
  "\u0349",
  "\u034d",
  "\u034e",
  "\u0353",
  "\u0354",
  "\u0355",
  "\u0356",
  "\u0359",
  "\u035a",
  "\u035b",
];

export const corruptText = (
  text: string,
  intensity: number = 5,
  zalgo?: { up: number; middle: number; down: number },
): string => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += text[i];

    if (zalgo) {
      for (let j = 0; j < zalgo.up; j++)
        result += UP[Math.floor(Math.random() * UP.length)];
      for (let j = 0; j < zalgo.middle; j++)
        result += MIDDLE[Math.floor(Math.random() * MIDDLE.length)];
      for (let j = 0; j < zalgo.down; j++)
        result += DOWN[Math.floor(Math.random() * DOWN.length)];
    } else {
      // Add marks based on intensity
      for (let j = 0; j < intensity; j++) {
        const rand = Math.random();
        if (rand < 0.33) {
          result += UP[Math.floor(Math.random() * UP.length)];
        } else if (rand < 0.66) {
          result += MIDDLE[Math.floor(Math.random() * MIDDLE.length)];
        } else {
          result += DOWN[Math.floor(Math.random() * DOWN.length)];
        }
      }
    }
  }
  return result;
};
