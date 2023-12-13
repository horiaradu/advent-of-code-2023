import { readFile } from "node:fs/promises";

export const f = async () => {
  const data = await readFile("day5.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  const desiredSeeds: number[] = [];
  let previousSeedsMap = {};
  let currentSeedMap = {};

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
      previousSeedsMap = { ...currentSeedMap };
      currentSeedMap = { ...previousSeedsMap };
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

    for (let i = 0; i < count; i++) {
      const sourceToUpdate = Object.entries(previousSeedsMap).find(
        ([_, destination]) => {
          if (destination === sourceRangeStart + i) {
            return true;
          }
          return false;
        },
      );

      if (sourceToUpdate) {
        currentSeedMap[sourceToUpdate[0]] = destinationRangeStart + i;
      } else {
        currentSeedMap[sourceRangeStart + i] = destinationRangeStart + i;
      }
    }
  });

  console.log(desiredSeeds);
  desiredSeeds.map((seed) => {
    console.log(`${seed} -> ${currentSeedMap[seed]}`);
  });
};
