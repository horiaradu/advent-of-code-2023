import { readFile } from "node:fs/promises";

export const f = async () => {
  const data = await readFile("day2.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  let sum = 0;

  lines.forEach((line) => {
    const matchData1 = line.match(/Game ([0-9]+): (.*)/);
    if (!matchData1) return;

    const gameIndex = parseInt(matchData1[1]);
    const cubes = matchData1[2].split(";").map((setOfCubes) => {
      return setOfCubes.split(",").reduce(
        (acc, cubeData) => {
          const parsed = cubeData.match(/([0-9]+) ([a-z]+)/);
          if (!parsed) return acc;

          return {
            ...acc,
            [parsed[2] as "red" | "green" | "blue"]: parseInt(parsed[1]),
          };
        },
        {} as Record<"red" | "green" | "blue", number>,
      );
    });

    let minRed = 0,
      minGreen = 0,
      minBlue = 0;
    cubes.forEach(({ red, green, blue }) => {
      if (minRed < red) minRed = red;
      if (minGreen < green) minGreen = green;
      if (minBlue < blue) minBlue = blue;
    });

    sum += minRed * minGreen * minBlue;
  });

  console.log(sum);
};
