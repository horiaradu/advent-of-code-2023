import { readFile } from "node:fs/promises";

export const f = async () => {
  const data = await readFile("day5.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  const desiredSeeds: number[] = [];
  let previousSeedsMap = {};
  let currentSeedMap = {};
  let stepNr = 0;

  lines.forEach((line) => {
    const seedsLineData = line.match(/seeds: (.*)/);
    if (seedsLineData) {
      seedsLineData[1].split(" ").forEach((seed) => {
        const s = parseInt(seed);
        desiredSeeds.push(s);
        currentSeedMap[s] = s;
      });
      return;
    }

    if (line.match(/^[a-z :]+/)) {
      desiredSeeds.forEach((seed) => {
        if (currentSeedMap[seed] === undefined) {
          currentSeedMap[seed] = previousSeedsMap[seed];
        }
      });
      console.log(`step ${stepNr}: `, currentSeedMap);

      previousSeedsMap = currentSeedMap;
      currentSeedMap = {};

      stepNr++;
      return;
    }
    if (line === "") {
      return;
    }

    const numbers = line.match(/^([0-9]+) ([0-9]+) ([0-9]+)$/);
    if (!numbers) {
      console.error(`unknown line ${line}`);
      return;
    }
    const destinationRangeStart = parseInt(numbers[1]);
    const sourceRangeStart = parseInt(numbers[2]);
    const count = parseInt(numbers[3]);

    desiredSeeds.forEach((seed) => {
      const destination = previousSeedsMap[seed];
      if (
        sourceRangeStart <= destination &&
        destination < sourceRangeStart + count
      ) {
        currentSeedMap[seed] =
          destinationRangeStart + (destination - sourceRangeStart);
      }
    });
  });

  console.log(previousSeedsMap);

  const min = desiredSeeds.reduce((min, seed) => {
    return Math.min(min, previousSeedsMap[seed]);
  }, Infinity);
  console.log(min);
};
