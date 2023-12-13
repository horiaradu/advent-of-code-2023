import { readFile } from "node:fs/promises";

type NumberData = {
  number: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export const f = async () => {
  const data = await readFile("day3.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  const numbers: NumberData[] = [];
  let currentData: NumberData | null = null;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j].match(/[0-9]/)) {
        if (!currentData) {
          currentData = {
            number: lines[i][j],
            start: { x: i, y: j },
            end: { x: i, y: j },
          };
        } else {
          currentData = {
            number: `${currentData.number}${lines[i][j]}`,
            start: currentData.start,
            end: { x: i, y: j },
          };
        }
      } else {
        if (currentData) {
          numbers.push(currentData);
          currentData = null;
        }
      }
    }
  }
  if (currentData) {
    numbers.push(currentData);
  }

  // const partNumbers = numbers.filter(({ start, end }) => {
  //   const neighbours = [
  //     { x: start.x, y: start.y - 1 },
  //     { x: start.x - 1, y: start.y - 1 },
  //     { x: start.x + 1, y: start.y - 1 },

  //     { x: end.x, y: end.y + 1 },
  //     { x: end.x - 1, y: end.y + 1 },
  //     { x: end.x + 1, y: end.y + 1 },
  //   ];
  //   if (start.x > 0) {
  //     for (let i = start.y; i <= end.y; i++) {
  //       neighbours.push({ x: start.x - 1, y: i });
  //     }
  //   }
  //   if (start.x < lines.length - 1) {
  //     for (let i = start.y; i <= end.y; i++) {
  //       neighbours.push({ x: start.x + 1, y: i });
  //     }
  //   }

  //   return neighbours
  //     .filter(
  //       ({ x, y }) =>
  //         x >= 0 && y >= 0 && x < lines.length && y < lines[x].length,
  //     )
  //     .some(({ x, y }) => lines[x][y]?.match(/[^0-9.]/));
  // });

  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "*") {
        const adjacentNumbers = numbers.filter((number) =>
          isAdjacent({ x: i, y: j }, number),
        );
        if (adjacentNumbers.length === 2) {
          console.log(adjacentNumbers);
          sum +=
            parseInt(adjacentNumbers[0].number) *
            parseInt(adjacentNumbers[1].number);
        }
      }
    }
  }

  console.log(sum);
};

const isAdjacent = (
  { x, y }: { x: number; y: number },
  { start, end }: NumberData,
) => {
  if (start.x > x + 1) return false;
  if (end.x < x - 1) return false;
  if (start.y > y + 1) return false;
  if (end.y < y - 1) return false;
  return true;
};
