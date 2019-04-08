// @flow
import Fig from 'figureone';

const {
  Point, minAngleDiff, normAngle, Line, Rect,
} = Fig.tools.g2;
const {
  DiagramElementPrimative, DiagramElementCollection,
} = Fig;

export function makeAnglesClose(
  element1: DiagramElementCollection | DiagramElementPrimative,
  element2: DiagramElementCollection | DiagramElementPrimative,
) {
  const r1 = element1.transform.r();
  const r2 = element2.transform.r();
  if (r1 != null && r2 != null) {
    if (Math.abs(minAngleDiff(r2, r1)) > Math.PI / 2) {
      element2.transform.updateRotation(normAngle(r2 + Math.PI));
    }
  }
}

export function checkValuesForParallel(
  r1: number,
  t1: Point,
  r2: number,
  t2: Point,
  distanceThreshold: number,
  rotThreshold: number = Math.PI / 300,
) {
  const angleSameThreshold = rotThreshold;
  let isParallel = true;
  const lineRotationDifference = Math.min(
    Math.abs(minAngleDiff(r1, r2)),
    Math.abs(minAngleDiff(r1, r2 - Math.PI)),
  );
  if (lineRotationDifference > angleSameThreshold) {
    isParallel = false;
  }
  if (isParallel) {
    const line2 = new Line(t2, t2.add(Math.cos(r2), Math.sin(r2)));
    const line2DistanceToLineCenter1 = line2.distanceToPoint(t1);
    if (line2DistanceToLineCenter1 < distanceThreshold) {
      isParallel = false;
    }
  }
  return isParallel;
}

export function checkElementsForParallel(
  element1: DiagramElementPrimative | DiagramElementCollection,
  element2: DiagramElementPrimative | DiagramElementCollection,
  makeRotationEqual: boolean = false,
  distanceThreshold: number,
  rotThreshold: number = Math.PI / 300,
) {
  const r1 = element1.transform.r();
  const r2 = element2.transform.r();
  const t1 = element1.transform.t();
  const t2 = element2.transform.t();
  if (r1 != null && r2 != null && t1 != null && t2 != null) {
    let isParallel = true;
    isParallel = checkValuesForParallel(
      r1, t1, r2, t2,
      distanceThreshold, rotThreshold,
    );
    if (isParallel && makeRotationEqual) {
      if (!element2.state.isBeingMoved) {
        element1.transform.updateRotation(r2);
      } else if (!element1.state.isBeingMoved) {
        element2.transform.updateRotation(r1);
      }
    }
    return isParallel;
  }
  return false;
}

type TypeLineLayout = {
  length: {
    full: number;
  };
  boundary: Rect;
};

export function randomizeParallelLine(lineLayout: TypeLineLayout) {
  const limit = new Rect(
    lineLayout.boundary.left + lineLayout.length.full / 2,
    lineLayout.boundary.bottom + lineLayout.length.full / 2,
    lineLayout.boundary.width - lineLayout.length.full,
    lineLayout.boundary.height - lineLayout.length.full,
  );

  const x = Math.random() * limit.width + limit.left;
  const y = Math.random() * limit.height + limit.bottom;
  const r = Math.random() * Math.PI;
  return {
    position: new Point(x, y),
    rotation: r,
  };
}
