// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrPointsLineDistance_lines = colors.get('blue').rgb;
  colors.qrPointsLineDistance_points = colors.get('blue').rgb;
  colors.qrPointsLineDistance_distance = colors.get('yellow').rgb;
  colors.qrPointsLineDistance_distance2 = colors.get('violet').rgb;
  const p0 = new Point(0, 0.7);
  const p1 = new Point(-2, -0.7);
  const p2 = new Point(2, -0.7);
  const mid = new Point(0, -0.7);
  const p3 = p0.add(p1.x - 0.4, 0);

  layout.mid = mid;
  layout.p1 = p1;

  const point = {
    name: 'point',
    method: 'polygon',
    options: {
      sides: 100,
      radius: 0.05,
      color: colors.qrPointsLineDistance_points,
      fill: true,
      position: p0,
    },
    mods: {
      scenarios: {
        default: { position: p0 },
        end: { position: p3 },
      },
    },
  };

  const pointEnd = {
    name: 'pointEnd',
    method: 'polygon',
    options: {
      sides: 100,
      radius: 0.05,
      color: colors.qrPointsLineDistance_points,
      fill: true,
      position: p3,
    },
  };

  const line = {
    name: 'line',
    method: 'line',
    options: {
      vertexSpaceStart: 'center',
      color: colors.qrPointsLineDistance_lines,
      width: 0.03,
      p1,
      p2,
    },
  };


  const perpendicular = {
    name: 'perpendicular',
    method: 'line',
    options: {
      p1: p0,
      p2: mid,
      color: colors.qrPointsLineDistance_distance,
      width: 0.01,
      label: {
        text: 'd',
        scale: 1.4,
        location: 'left',
        offset: 0.05,
        linePosition: 0.5,
      },
    },
  };

  const distanceEnd = {
    name: 'distanceEnd',
    method: 'line',
    options: {
      p1: p3,
      p2: p1,
      color: colors.qrPointsLineDistance_distance2,
      width: 0.01,
      label: {
        text: 'd',
        scale: 1.4,
        location: 'top',
        offset: 0.05,
        linePosition: 0.5,
      },
    },
  };

  const rightAngle = {
    name: 'rightAngle',
    method: 'angle',
    options: {
      p1: p2,
      p2: mid,
      p3: p0,
      color: colors.qrPointsLineDistance_distance,
      autoRightAngle: true,
      curve: {
        radius: 0.2,
        width: 0.01,
      },
    },
  };

  const end = {
    name: 'end',
    method: 'polygon',
    options: {
      color: colors.qrPointsLineDistance_lines,
      radius: 0.01,
      sides: 100,
      position: p1,
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      end,
      point,
      line,
      perpendicular,
      rightAngle,
      pointEnd,
      distanceEnd,
    ],
    mods: {
      scenarios: {
        default: { position: [0, 0] },
        low: { position: [0, -0.5] },
        summary: { position: [0, -0.5] },
      },
    },
  };

  layout.addElements = [fig];
  return layout;
}
