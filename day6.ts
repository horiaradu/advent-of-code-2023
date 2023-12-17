import { readFile } from "node:fs/promises";

export const f = async () => {
  const data = await readFile("day6.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  const times = lines[0]
    .match(/[a-zA-Z:]+(.+)/)![1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");
  const distances = lines[1]
    .match(/[a-zA-Z:]+(.+)/)![1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");

  console.log(times);
  console.log(distances);

  const time = parseInt(times.join(""));
  const distance = parseInt(distances.join(""));

  let winningSpeedsCount = 0;

  for (let speed = 1; speed < time; speed++) {
    if (distance / speed < time - speed) {
      winningSpeedsCount++;
    }
  }

  console.log(winningSpeedsCount);
};
