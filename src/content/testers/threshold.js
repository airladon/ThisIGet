// @flow

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
  // const defaultThreshold = options.thresholds[comingFrom];
  // if (options.pages[page] == null) {
  //   return defaultThreshold.toString();
  // }
  // const pageOptions = options.pages[page];
  // if (pageOptions.threshold != null
  //   && (typeof pageOptions.threshold === 'string' || typeof pageOptions.threshold === 'number')
  // ) {
  //   return pageOptions.threshold.toString();
  // }
  // if (pageOptions.threshold != null && pageOptions.threshold[comingFrom] != null) {
  //   return pageOptions.threshold[comingFrom].toString();
  // }
  // return defaultThreshold.toString();
}
