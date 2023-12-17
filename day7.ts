import { readFile } from "node:fs/promises";

const type = (hand: string[]) => {
  const counts = hand.reduce((acc, card) => {
    acc[card] ||= 0;
    acc[card] = acc[card] + 1;
    return acc;
  }, {});

  const values = Object.values(counts);
  if (values.some((x) => x === 5)) {
    return 7;
  }
  if (values.some((x) => x === 4)) {
    return 6;
  }
  if (values.length === 2) {
    return 5;
  }
  if (values.some((x) => x === 3)) {
    return 4;
  }
  if (values.filter((x) => x === 2).length === 2) {
    return 3;
  }
  if (values.some((x) => x === 2)) {
    return 2;
  }
  return 1;
};

const ordered = "23456789TJQKA".split("");

export const f = async () => {
  const data = await readFile("day7.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  const hands: Array<{ hand: string[]; bid: number }> = [];
  lines.forEach((line) => {
    const lineData = line.match(/([A-Z0-9]{5}) ([0-9]+)/);
    if (!lineData) {
      console.error(lineData);
      return;
    }

    const hand = lineData[1].split("");
    const bid = parseInt(lineData[2]);

    hands.push({ hand, bid });
  });

  const sortedHands = hands.sort((a, b) => {
    const aType = type(a.hand);
    const bType = type(b.hand);
    if (aType !== bType) {
      return aType - bType;
    } else {
      for (let i = 0; i < 5; i++) {
        const diff =
          ordered.findIndex((x) => x === a.hand[i]) -
          ordered.findIndex((x) => x === b.hand[i]);
        if (diff !== 0) {
          return diff;
        }
      }
      return 0;
    }
  });

  let total = 0;
  for (let i = 0; i < sortedHands.length; i++) {
    total += (i + 1) * sortedHands[i].bid;
  }

  console.log(total);
};
