import { readFile } from "node:fs/promises";

export const f = async () => {
  const data = await readFile("day4.txt", { encoding: "utf8" });
  const lines = data.split("\n");

  const cards = lines.reduce(
    (acc, line) => {
      const parsed = line.match(/Card\s*([0-9]*):\s*([^|]+)\s*\|\s*([^|]+)/);
      if (!parsed) {
        console.warn(line);
        return acc;
      }

      const cardNumber = parseInt(parsed[1]);
      const winningNumbers = parsed[2].split(" ").filter((x) => x !== "");
      const cardNumbers = parsed[3].split(" ").filter((x) => x !== "");
      const found = cardNumbers.filter((number) =>
        winningNumbers.includes(number),
      );
      const count = found.length;

      const copiesOfCurrentCard = acc[cardNumber] || 1;

      const copiesWon = { [cardNumber]: copiesOfCurrentCard };
      for (let i = 1; i <= count; i++) {
        copiesWon[cardNumber + i] =
          (acc[cardNumber + i] || 1) + copiesOfCurrentCard;
      }
      return { ...acc, ...copiesWon };
    },
    { 1: 1 },
  );

  const sum = Object.values(cards).reduce((acc, c) => acc + c, 0);

  console.log(sum);
};
