function printReport(results, verbose) {
  const output = results.map(({ name, done, undone }) => {
    return {
      name: name,
      progress: `${done.length}/${done.length + undone.length}`,
      visualized: generateProgress(done.length, done.length + undone.length),
      ...(verbose && { done: done.join("\n"), undone: undone.join("\n") }),
    };
  });

  consoleTableNewline(output);
}

function generateProgress(progress, max, scale = 20) {
  const scaledProgress = Math.floor((scale * progress) / max);

  const params = {
    progress: scaledProgress,
    max: scale,
    opening: "[",
    ending: "]",
    filled: "|",
    empty: " ",
  };

  return generateProgressInternal(params);
}

function generateProgressInternal({
  progress,
  max,
  opening,
  ending,
  filled,
  empty,
}) {
  const output = [
    opening,
    ...filled.repeat(progress),
    ...empty.repeat(max - progress),
    ending,
  ];

  return output.join("");
}

function consoleTableNewline(array) {
  const output = [];

  for (const item of array) {
    const stringColumns = Object.keys(item).filter(
      (k) => typeof item[k] === "string"
    );

    const stringColumnLines = stringColumns.reduce(
      (acc, cur) => ({ ...acc, [cur]: item[cur].split("\n") }),
      {}
    );

    const rowHeight = stringColumns
      .map((k) => item[k].split("\n").length)
      .reduce((acc, cur) => (cur > acc ? cur : acc), 1);

    for (let i = 0; i < rowHeight; i++) {
      let row = i === 0 ? Object.assign({}, item) : {};

      for (const col of stringColumns) {
        const value = stringColumnLines[col][i];

        if (value == null || value === "") {
          delete row[col];
        } else {
          row[col] = value;
        }
      }

      output.push(row);
    }
  }

  console.table(output);
}

exports.printReport = printReport;
