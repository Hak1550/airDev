const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (d, currentPage) => {
  return {
    id: d * currentPage + 1,
    collectionTitle: `Collections - ${Math.floor(Math.random() * 30)}`,
    assets: `${Math.floor(Math.random() * 1000)} Assets`,
    modified: 'Dec 1, 2022 at 10:00PM',
  };
};

export default function makeData(currentPage, ...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(d, currentPage),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
