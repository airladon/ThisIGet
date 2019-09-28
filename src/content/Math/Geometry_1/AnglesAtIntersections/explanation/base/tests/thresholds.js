
const thresholds = {
  // pages: {
  //   15: { threshold: { next: 1300, prev: 1300, goto: 10 } },
  //   16: { threshold: { next: 1300, prev: 1300, goto: 10 } },
  // },
  // default: 10,
  // goto: 10,
  // next: 10,
  // prev: 10,
  pages: {
    // 1: 10,
    // 2: { next: 10 },
    // 3: { next: 10, prev: 10 },
    // 4: { next: 10, prev: 10, goto: 10 },
    15: { next: 1700, prev: 1700 },
    16: { next: 1700, prev: 1700 },
  },
};

export default thresholds;
