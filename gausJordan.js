// utils/gaussJordan.js
export function gaussJordan(a, b) {
  const n = a.length;
  const aug = a.map((row, i) => [...row, b[i]]);
  const steps = [];

  for (let i = 0; i < n; i++) {
    if (aug[i][i] === 0) {
      for (let j = i + 1; j < n; j++) {
        if (aug[j][i] !== 0) {
          [aug[i], aug[j]] = [aug[j], aug[i]];
          break;
        }
      }
    }

    const pivot = aug[i][i];
    aug[i] = aug[i].map((val) => val / pivot);
    steps.push(JSON.parse(JSON.stringify(aug))); // Store step after normalization

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const factor = aug[j][i];
        aug[j] = aug[j].map((val, k) => val - factor * aug[i][k]);
        steps.push(JSON.parse(JSON.stringify(aug))); // Store step after elimination
      }
    }
  }

  const solution = aug.map((row) => row[n]);
  return { solution, steps };
}
