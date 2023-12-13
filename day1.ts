import { readFile } from "node:fs/promises";

export const f = async () => {
  const data = await readFile("day1.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  let sum = 0;

  lines.forEach((line) => {
    let number = "";
    for (let i = 0; i < line.length; i++) {
      const maybeDigit = getDigit(line.substring(i));
      if (maybeDigit) {
        number = number.concat(maybeDigit.toString());
        break;
      }
    }

    for (let i = line.length - 1; i >= 0; i--) {
      const maybeDigit = getDigit(line.substring(i));
      if (maybeDigit) {
        number = number.concat(maybeDigit.toString());
        break;
      }
    }

    if (number) {
      console.log(number);

      sum += parseInt(number);
    }
  });

  console.log(sum);
};

const digits = [
  ["0", 0],
  ["1", 1],
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["5", 5],
  ["6", 6],
  ["7", 7],
  ["8", 8],
  ["9", 9],
  ["zero", 0],
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
] as const;
const getDigit = (input: string) => {
  for (let digit of digits) {
    if (input.startsWith(digit[0])) {
      return digit[1];
    }
  }

  return null;
};
