// @flow
//
//  {
//    default: 10,
//    goto: 10,
//    next: 10,
//    prev: 10,
//    pages: {
//      1: 10,
//      2: { next: 10 },
//      3: { next: 10, prev: 10 },
//      4: { next: 10, prev: 10, goto: 10 },
//    }
//  }
//
//  Where lowest priority is default, with increasingly higher priority
//  as you go down the object

export default function getThreshold(
  page: number,
  thresholds: {
    default?: number,
    goto?: number,
    next?: number,
    prev?: number,
    pages?: {
      [pageNumber: number]: number | {
        next?: number,
        prev?: number,
        goto?: number,
      }
    }
  } = {},
  comingFrom?: 'next' | 'goto' | 'prev' = 'goto',
) {
  const defaultThreshold = thresholds.default || 10;
  const t = {
    next: thresholds.next || defaultThreshold,
    prev: thresholds.prev || defaultThreshold,
    goto: thresholds.goto || defaultThreshold,
  };
  if (thresholds.pages != null && thresholds.pages[page] != null) {
    const pageThreshold = thresholds.pages[page];
    if (typeof pageThreshold === 'number') {
      t.next = pageThreshold;
      t.prev = pageThreshold;
      t.goto = pageThreshold;
    } else {
      t.next = pageThreshold.next || t.next;
      t.prev = pageThreshold.prev || t.prev;
      t.goto = pageThreshold.goto || t.goto;
    }
  }
  return t[comingFrom];
}
