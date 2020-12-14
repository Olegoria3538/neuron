export const signals = `1 0 1 1 1 0 0 0
0 0 0 1 0 1 1 0
1 0 0 0 1 1 1 1
0 1 0 1 1 0 0 1
0 0 0 0 0 0 0 1
1 1 1 0 0 1 1 0`
  .split("\n")
  .map((x) => x.split(" ").map(Number));
