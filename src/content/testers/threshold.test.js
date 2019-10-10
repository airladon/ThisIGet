import getThreshold from './threshold';

describe('Threshold Tests', () => {
  test('Thresholds not defined', () => {
    let t = getThreshold(1);
    expect(t).toBe(10);

    t = getThreshold(1, { default: 10 });
    expect(t).toBe(10);

    t = getThreshold(1, {}, 'next');
    expect(t).toBe(10);
  });
  test('Different default', () => {
    const thresholds = { default: 100 };
    expect(getThreshold(1, thresholds)).toBe(100);
    expect(getThreshold(1, thresholds, 'next')).toBe(100);
  });
  test('Specify one direction default', () => {
    const thresholds = { default: 100, next: 10 };
    expect(getThreshold(1, thresholds)).toBe(100);
    expect(getThreshold(1, thresholds, 'goto')).toBe(100);
    expect(getThreshold(1, thresholds, 'next')).toBe(10);
    expect(getThreshold(1, thresholds, 'prev')).toBe(100);
  });
  test('Specify two direction defaults', () => {
    const thresholds = { default: 100, next: 10, prev: 20 };
    expect(getThreshold(1, thresholds)).toBe(100);
    expect(getThreshold(1, thresholds, 'goto')).toBe(100);
    expect(getThreshold(1, thresholds, 'next')).toBe(10);
    expect(getThreshold(1, thresholds, 'prev')).toBe(20);
  });
  test('Specify three direction defaults', () => {
    const thresholds = {
      default: 100, goto: 30, next: 10, prev: 20,
    };
    expect(getThreshold(1, thresholds)).toBe(30);
    expect(getThreshold(1, thresholds, 'goto')).toBe(30);
    expect(getThreshold(1, thresholds, 'next')).toBe(10);
    expect(getThreshold(1, thresholds, 'prev')).toBe(20);
  });
  test('Specify page value default', () => {
    const thresholds = {
      default: 10,
      goto: 20,
      pages: {
        1: 30,
      },
    };
    expect(getThreshold(1, thresholds, 'goto')).toBe(30);
    expect(getThreshold(1, thresholds, 'next')).toBe(30);
    expect(getThreshold(1, thresholds, 'prev')).toBe(30);
    expect(getThreshold(2, thresholds, 'goto')).toBe(20);
    expect(getThreshold(2, thresholds, 'next')).toBe(10);
    expect(getThreshold(2, thresholds, 'prev')).toBe(10);
  });
  test('Specify page one direction', () => {
    const thresholds = {
      default: 10,
      goto: 20,
      pages: {
        1: { next: 30 },
      },
    };
    expect(getThreshold(1, thresholds, 'goto')).toBe(20);
    expect(getThreshold(1, thresholds, 'next')).toBe(30);
    expect(getThreshold(1, thresholds, 'prev')).toBe(10);
    expect(getThreshold(2, thresholds, 'goto')).toBe(20);
    expect(getThreshold(2, thresholds, 'next')).toBe(10);
    expect(getThreshold(2, thresholds, 'prev')).toBe(10);
  });
  test('Specify page two direction', () => {
    const thresholds = {
      default: 10,
      goto: 20,
      pages: {
        1: { next: 30, prev: 40 },
      },
    };
    expect(getThreshold(1, thresholds, 'goto')).toBe(20);
    expect(getThreshold(1, thresholds, 'next')).toBe(30);
    expect(getThreshold(1, thresholds, 'prev')).toBe(40);
    expect(getThreshold(2, thresholds, 'goto')).toBe(20);
    expect(getThreshold(2, thresholds, 'next')).toBe(10);
    expect(getThreshold(2, thresholds, 'prev')).toBe(10);
  });
  test('Specify page three direction', () => {
    const thresholds = {
      default: 10,
      goto: 20,
      pages: {
        1: { next: 30, prev: 40, goto: 50 },
      },
    };
    expect(getThreshold(1, thresholds, 'goto')).toBe(50);
    expect(getThreshold(1, thresholds, 'next')).toBe(30);
    expect(getThreshold(1, thresholds, 'prev')).toBe(40);
    expect(getThreshold(2, thresholds, 'goto')).toBe(20);
    expect(getThreshold(2, thresholds, 'next')).toBe(10);
    expect(getThreshold(2, thresholds, 'prev')).toBe(10);
  });
});
