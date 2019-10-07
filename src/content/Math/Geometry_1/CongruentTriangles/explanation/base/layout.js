// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Transform,
  // Line,
} = Fig;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.pads = colors.get('yellow', 'darkest').rgb;
  colors.construction = colors.get('yellow', 'darkest').rgb;
  colors.disabled = colors.get('diagram', 'disabled', 'darker').rgb;
  colors.highlight = colors.get('green').rgb;
  layout.width = 0.02;

  const angle = text => ({
    color: colors.angles,
    curve: {
      radius: 0.4,
      width: layout.width,
      sides: 200,
    },
    label: {
      text,
      scale: 0.8,
    },
  });

  const side = text => ({
    color: colors.sides,
    label: {
      text,
      scale: 0.8,
      offset: 0.1,
      location: 'outside',
    },
  });

  const triangle = {
    method: 'polyLine',
    options: {
      points: [
        [0.7, 0.8],
        [1, -0.7],
        [-1.2, -0.7],
      ],
      width: layout.width,
      color: colors.sides,
      close: true,
      angle: [
        angle('c'),
        angle('b'),
        angle('a'),
      ],
      side: [
        side('A'),
        side('B'),
        side('C'),
      ],
    },
    mods: {
      scenarios: {
        left: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
        right: { position: [1.4, -0.3], rotation: 0, scale: 1 },
        summaryLeft: { position: [-1.4, -0.3], rotation: 0, scale: 0.9 },
        summaryRight: { position: [1.4, -0.3], rotation: 0, scale: 0.9 },
        summaryTri1: { position: [1, 0.2], rotation: 0, scale: 1 },
        qrLeft: { position: [-1.4, -0.3], rotation: 0, scale: 0.9 },
        qrRight: { position: [1.4, -0.3], rotation: 0, scale: 0.9 },
        qrLeftAaa: { position: [-1.4, -0.3], rotation: 0, scale: 1 },
        qrRightAaa: { position: [1.4, -0.3], rotation: 0, scale: 0.7 },
        mirror: { position: [1.4, -0.3], rotation: 0, scale: [-1, 1] },
        rotate: { position: [1.4, -0.3], rotation: Math.PI, scale: 1 },
        lowLeft: { position: [-1.4, -0.5], rotation: 0, scale: 0.9 },
        rightLeft: { position: [1.4, -0.5], rotation: 0, scale: 0.9 },
      },
    },
  };

  layout.tri1 = joinObjects({}, triangle, { name: 'tri1' });
  layout.tri2 = joinObjects({}, triangle, {
    name: 'tri2',
    mods: {
      interactiveLocation: [0.7, 0.8],
    },
  });

  layout.congruentTriangles = {
    name: 'congruentTriangles',
    method: 'collection',
    addElements: [
      layout.tri1,
      layout.tri2,
    ],
  };

  layout.addElements = [
    layout.congruentTriangles,
  ];

  layout.label = {
    position: new Point(1, -1),
  };

  // /////////////////////////////////////////////////////////////////
  // AAA
  // /////////////////////////////////////////////////////////////////
  const aaaAngle = (rc, rt) => ({
    color: colors.angles,
    curve: {
      radius: rc,
      width: layout.width,
    },
    sides: 200,
    label: {
      text: null,
      showRealAngle: true,
      precision: 0,
      radius: rt,
    },
  });

  const aaaPad = () => ({
    color: colors.pads,
    isMovable: true,
    sides: 20,
    radius: 0.07,
    touchRadius: 0.8,
    fill: true,
  });


  layout.aaaTri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
      ],
      color: colors.sides,
      width: layout.width,
      close: true,
      angle: [
        aaaAngle(0.3, 0.4),
        aaaAngle(0.3, 0.3),
        aaaAngle(0.3, 0.3),
      ],
      pad: [
        aaaPad(),
        aaaPad(),
        aaaPad(),
      ],
    },
  };


  layout.aaa = {
    name: 'fig',
    method: 'collection',
    options: {
      position: [0, -0.3],
    },
    addElements: [
      layout.aaaTri,
    ],
  };

  layout.addElementsAAA = [
    layout.aaa,
  ];

  // /////////////////////////////////////////////////////////////////
  // SSS
  // /////////////////////////////////////////////////////////////////
  layout.sssPosition = new Point(0, -0.3);
  const sssLineBase = {
    method: 'line',
    options: {
      color: colors.sides,
      width: layout.width,
      vertexSpaceStart: 'start',
    },
  };

  const hypotenuse = 1.7;
  const leftLen = hypotenuse * Math.sin(Math.PI / 3);
  const rightLen = hypotenuse * Math.sin(Math.PI / 6);
  layout.defaultLen = leftLen;
  layout.hypotenuse = hypotenuse;
  // const height = leftLen * Math.sin(Math.PI / 6);
  const base = joinObjects({}, sssLineBase, {
    name: 'base',
    options: {
      length: hypotenuse,
      label: {
        text: 'C',
        offset: 0.1,
        location: 'outside',
        // subLocation: 'left',
        orientation: 'horizontal',
      },
    },
    mods: {
      scenarios: {
        initial: { position: [0, -hypotenuse / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: 0 },
      },
    },
  });

  const left = joinObjects({}, sssLineBase, {
    name: 'left',
    options: {
      length: leftLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
      label: {
        text: 'A',
        offset: 0.1,
        location: 'outside',
        orientation: 'horizontal',
      },
    },
    mods: {
      scenarios: {
        initial: { position: [-1, -leftLen / 2], rotation: Math.PI / 2 },
        center: { position: [-hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
        top: { position: [-hypotenuse / 2, 0], rotation: Math.PI / 6 },
        bottom: { position: [-hypotenuse / 2, 0], rotation: -Math.PI / 6 },
        default: { position: [-hypotenuse / 2, 0], rotation: Math.PI / 6 },
      },
    },
  });

  const right = joinObjects({}, sssLineBase, {
    name: 'right',
    options: {
      length: rightLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
      label: {
        text: 'B',
        offset: 0.1,
        location: 'top',
        subLocation: 'left',
        orientation: 'horizontal',
      },
    },
    mods: {
      scenarios: {
        initial: { position: [1, -rightLen / 2], rotation: Math.PI / 2 },
        center: { position: [hypotenuse / 2, 0], rotation: Math.PI / 3 },
        top: { position: [hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
        bottom: { position: [hypotenuse / 2, 0], rotation: Math.PI + Math.PI / 3 },
        default: { position: [hypotenuse / 2, 0], rotation: Math.PI - Math.PI / 3 },
      },
    },
  });

  const leftCircle = {
    name: 'leftCircle',
    method: 'polygon',
    options: {
      width: layout.width / 2,
      color: colors.construction,
      sides: 200,
      radius: leftLen,
    },
    mods: {
      scenarios: {
        center: { position: [-hypotenuse / 2, 0], rotation: 0, scale: [1, 1] },
        flip: { position: [hypotenuse / 2, 0], rotation: 0, scale: [-1, 1] },
      },
    },
  };
  const rightCircle = {
    name: 'rightCircle',
    method: 'polygon',
    options: {
      width: layout.width / 2,
      color: colors.construction,
      sides: 200,
      radius: rightLen,
    },
    mods: {
      scenarios: {
        center: { position: [hypotenuse / 2, 0], rotation: 0, scale: [1, 1] },
        flip: { position: [-hypotenuse / 2, 0], rotation: 0, scale: [-1, 1] },
      },
    },
  };

  const leftBottom = joinObjects({}, left, {
    name: 'leftBottom',
    options: {
      label: {
        location: 'bottom',
      },
    },
    mods: {
      scenarios: {
        default: { position: [-hypotenuse / 2, 0], rotation: -Math.PI / 6 },
      },
    },
  });

  const rightBottom = joinObjects({}, right, {
    name: 'rightBottom',
    options: {
      label: {
        location: 'bottom',
      },
    },
    mods: {
      scenarios: {
        default: { position: [hypotenuse / 2, 0], rotation: Math.PI + Math.PI / 3 },
      },
    },
  });

  const tri = (name, scale) => ({
    name,
    method: 'polyLine',
    options: {
      close: true,
      points: [
        [-hypotenuse / 2, scale * layout.width / 5],
        [hypotenuse / 2,  scale * layout.width / 5],
        [
          -hypotenuse / 2 + leftLen * Math.cos(Math.PI / 6),
          scale * leftLen * Math.sin(Math.PI / 6),
        ],
      ],
      width: layout.width,
      color: colors.sides,
      borderToPoint: 'always',
    },
    mods: {
      scenarios: {
        default: { position: [0, 0], scale: [1, 1] },
      },
    },
  });
  // layout.sss = {
  //   name: 'fig',
  //   method: 'collection',
  //   options: {
  //     position: [0, -0.3],
  //   },
  //   addElements: [
  //     layout.aaaTri,
  //   ],
  // };

  const moveCirc = (name, r, defPos) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polygon',
        options: {
          width: 3,
          color: colors.construction,
          sides: 200,
          radius: leftLen,
          linePrimitives: true,
        },
      },
      {
        name: 'center',
        method: 'polygon',
        options: {
          width: 3,
          color: colors.construction,
          sides: 20,
          radius: 0.07,
          fill: true,
        },
      },
      {
        name: 'scale',
        method: 'polygon',
        options: {
          color: [1, 1, 1, 0.001],
          sides: 50,
          radius: leftLen * 1.2,
          fill: true,
        },
        mods: {
          move: {
            type: 'scale',
            minTransform: new Transform().scale(0.3, 0.3).rotate(0).translate(-1000, -1000),
            maxTransform: new Transform().scale(1, 1).rotate(0).translate(1000, 1000),
          },
          scenarios: {
            center: { position: [0, 0], rotation: 0, scale: r / leftLen },
          },
          interactiveLocation: [0, leftLen],
        },
      },
    ],
    mods: {
      scenarios: {
        center: { position: defPos, rotation: 0, scale: 1 },
      },
    },
  });

  const movePad = (name, defPos) => ({
    name,
    method: 'polygon',
    options: {
      color: [1, 0, 0, 0.001],
      sides: 50,
      radius: 0.2,
      fill: true,
    },
    mods: {
      move: {
        type: 'translate',
        minTransform: new Transform().scale(1, 1).rotate(0).translate(-2, 0),
        maxTransform: new Transform().scale(1, 1).rotate(0).translate(2, 0),
      },
      scenarios: {
        center: { position: defPos, rotation: 0, scale: 1 },
      },
    },
  });

  const moveRadius = (name, defPos, defRot) => joinObjects({}, sssLineBase, {
    name,
    options: {
      length: leftLen,
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 30,
    },
    mods: {
      scenarios: {
        center: { position: defPos, rotation: defRot, scale: 1 },
      },
      interactiveLocation: [leftLen * 0.8, 0],
    },
  });

  const baseLine = joinObjects({}, sssLineBase, {
    name: 'baseLine',
  });

  // const anyCircleLeft = {
  //   name: 'anyCircleLeft',
  //   method: 'polygon',
  //   options: {
  //     width: 3,
  //     color: colors.construction,
  //     sides: 200,
  //     radius: leftLen,
  //     linePrimitives: true,
  //   },
  //   mods: {
  //     scenarios: {
  //       center: { position: [-hypotenuse / 2, 0], rotation: 0, scale: 1 },
  //     },
  //     move: {
  //       type: 'scale',
  //     },
  //   },
  // };

  // const scaleLeft = {
  //   name: 'scaleLeft',
  //   method: 'polygon',
  //   options: {
  //     color: [1, 1, 1, 0.2],
  //     sides: 50,
  //     radius: leftLen * 1.2,
  //     fill: true,
  //   },
  //   mods: {
  //     scenarios: {
  //       center: { position: [-hypotenuse / 2, 0], rotation: 0, scale: 1 },
  //     },
  //     move: {
  //       type: 'scale',
  //       maxTransform: new Transform().scale(1, 1).rotate(0).translate(1000, 1000),
  //       minTransform: new Transform().scale(0.3, 0.3).rotate(0).translate(-1000, -1000),
  //     },
  //   },
  // };

  // const moveLeft = {
  //   name: 'moveLeft',
  //   method: 'polygon',
  //   options: {
  //     color: [1, 0, 0, 0.2],
  //     sides: 50,
  //     radius: 0.2,
  //     fill: true,
  //   },
  //   mods: {
  //     scenarios: {
  //       center: { position: [-hypotenuse / 2, 0], rotation: 0, scale: 1 },
  //     },
  //     move: {
  //       type: 'translate',
  //       maxTransform: new Transform().scale(1, 1).rotate(0).translate(-2, 0),
  //       minTransform: new Transform().scale(0.3, 0.3).rotate(0).translate(-2, 0),
  //     },
  //   },
  // };

  layout.addElementsSSS = [
    rightCircle,
    leftCircle,
    // anyCircleLeft,
    left,
    right,
    base,
    leftBottom,
    rightBottom,
    // scaleLeft,
    // moveLeft,
    moveCirc('circ1', leftLen, [-hypotenuse / 2, 0]),
    moveCirc('circ2', rightLen, [hypotenuse / 2, 0]),
    moveRadius('rad1', [-hypotenuse / 2, 0], 2),
    moveRadius('rad2', [hypotenuse / 2, 0], 1),
    movePad('pad1', [-hypotenuse / 2, 0]),
    movePad('pad2', [hypotenuse / 2, 0]),
    baseLine,
    tri('flipTri', -1),
    tri('fixedTri', 1),
  ];

  // /////////////////////////////////////////////////////////////////
  // SAS
  // /////////////////////////////////////////////////////////////////
  const sasLineBase = {
    method: 'line',
    options: {
      color: colors.sides,
      width: layout.width,
      length: 4,
      vertexSpaceStart: 'start',
      position: [-2, -1],
      label: {
        text: null,
        offset: 0.1,
        location: 'bottom',
      },
    },
  };
  const sasLine2 = joinObjects({}, sasLineBase, {
    options: {
      length: 4 * Math.sqrt(3) / 2,
      label: {
        text: null,
        offset: 0.1,
        location: 'top',
      },
    },
  });
  const sasAngle = {
    method: 'angle',
    options: {
      angle: Math.PI / 6,
      rotation: 0,
      color: colors.angles,
      curve: {
        radius: 0.4,
        width: layout.width,
        sides: 100,
      },
      label: {
        text: null,
        showRealAngle: true,
        precision: 0,
        radius: 0.4,
      },
      sides: {
        length: 0.5,
        color: colors.sides,
      },
    },
  };
  const sasBase1 = joinObjects({}, sasLineBase, { name: 'base' });
  const sasBase2 = joinObjects({}, sasLineBase, {
    name: 'base',
    options: {
      label: {
        location: 'top',
      },
    },
  });
  const sasBase3 = joinObjects({}, sasLineBase, { name: 'base' });
  const sasBase4 = joinObjects({}, sasLineBase, {
    name: 'base',
    options: {
      label: {
        location: 'top',
      },
    },
  });
  const sasLine21 = joinObjects({}, sasLine2, {
    name: 'line',
    options: {
      position: [-2, -1],
      angle: Math.PI / 6,
    },
  });
  const sasLine22 = joinObjects({}, sasLine2, {
    name: 'line',
    options: {
      position: [-2, -1],
      angle: -Math.PI / 6,
      label: {
        location: 'bottom',
      },
    },
  });
  const sasLine23 = joinObjects({}, sasLine2, {
    name: 'line',
    options: {
      position: [2, -1],
      angle: Math.PI - Math.PI / 6,
    },
  });
  const sasLine24 = joinObjects({}, sasLine2, {
    name: 'line',
    options: {
      position: [2, -1],
      angle: Math.PI + Math.PI / 6,
      label: {
        location: 'bottom',
      },
    },
  });
  const sasLine31 = joinObjects({}, sasLine2, {
    name: 'line3',
    options: {
      position: [2, -1],
      angle: Math.PI - Math.PI / 3,
      length: 2,
    },
  });
  const sasLine32 = joinObjects({}, sasLine2, {
    name: 'line3',
    options: {
      position: [2, -1],
      angle: Math.PI + Math.PI / 3,
      length: 2,
      label: {
        location: 'bottom',
      },
    },
  });
  const sasLine33 = joinObjects({}, sasLine2, {
    name: 'line3',
    options: {
      position: [-2, -1],
      angle: Math.PI / 3,
      length: 2,
    },
  });
  const sasLine34 = joinObjects({}, sasLine2, {
    name: 'line3',
    options: {
      position: [-2, -1],
      angle: -Math.PI / 3,
      length: 2,
      label: {
        location: 'bottom',
      },
    },
  });
  const sasAngle1 = joinObjects({}, sasAngle, {
    name: 'angle',
    options: {
      position: [-2, -1],
      rotation: 0,
      angle: Math.PI / 6,
    },
  });
  const sasAngle2 = joinObjects({}, sasAngle, {
    name: 'angle',
    options: {
      position: [-2, -1],
      rotation: Math.PI * 2 - Math.PI / 6,
      angle: Math.PI / 6,
    },
  });
  const sasAngle3 = joinObjects({}, sasAngle, {
    name: 'angle',
    options: {
      position: [2, -1],
      rotation: Math.PI - Math.PI / 6,
      angle: Math.PI / 6,
    },
  });
  const sasAngle4 = joinObjects({}, sasAngle, {
    name: 'angle',
    options: {
      position: [2, -1],
      rotation: Math.PI,
      angle: Math.PI / 6,
    },
  });
  const sasAngle21 = joinObjects({}, sasAngle, {
    name: 'angle2',
    options: {
      position: [2, -1],
      rotation: Math.PI / 3 * 2,
      angle: Math.PI / 3,
    },
  });
  const sasAngle22 = joinObjects({}, sasAngle, {
    name: 'angle2',
    options: {
      position: [2, -1],
      rotation: Math.PI,
      angle: Math.PI / 3,
    },
  });
  const sasAngle23 = joinObjects({}, sasAngle, {
    name: 'angle2',
    options: {
      position: [-2, -1],
      rotation: 0,
      angle: Math.PI / 3,
    },
  });
  const sasAngle24 = joinObjects({}, sasAngle, {
    name: 'angle2',
    options: {
      position: [-2, -1],
      rotation: Math.PI  * 2 - Math.PI / 3,
      angle: Math.PI / 3,
    },
  });
  const config1 = {
    name: 'config1',
    method: 'collection',
    addElements: [sasLine31, sasAngle21, sasBase1, sasLine21, sasAngle1],
    mods: {
      scenarios: {
        'showAll': { position: [-1.5, 0.5], scale: 0.6 },
        'center': { position: [0, 0], scale: 1 },
      },
    },
  };
  const config2 = {
    name: 'config2',
    method: 'collection',
    addElements: [sasLine32, sasAngle22, sasBase2, sasLine22, sasAngle2],
    mods: { scenarios: { 'showAll': { position: [-1.5, 0], scale: 0.6 } } },
  };
  const config3 = {
    name: 'config3',
    method: 'collection',
    addElements: [sasLine33, sasAngle23, sasBase3, sasLine23, sasAngle3],
    mods: { scenarios: { 'showAll': { position: [1.5, 0.5], scale: 0.6 } } },
  };
  const config4 = {
    name: 'config4',
    method: 'collection',
    addElements: [sasLine34, sasAngle24, sasBase4, sasLine24, sasAngle4],
    mods: { scenarios: { 'showAll': { position: [1.5, 0], scale: 0.6 } } },
  };
  const sasBaseSep = joinObjects({}, sasLineBase, {
    name: 'base',
    mods: {
      scenarios: {
        initial: { position: [-2, -1], scale: 1 },
        center: { position: [-2, -1], scale: 1 },
      },
    },
  });
  const sasLine2Sep = joinObjects({}, sasLine2, {
    name: 'line',
    mods: {
      scenarios: {
        initial: { position: [-1.75, 0.5], rotation: 0, scale: 1 },
      },
    },
  });
  const sasAngleSep = joinObjects({}, sasAngle, {
    name: 'angle',
    mods: {
      scenarios: {
        initial: { position: [-0.25, -0.4], rotation: 0, scale: 1 },
        center1: { position: [-2, -1], rotation: 0, scale: 1 },
        center2: { position: [-2, -1], rotation: Math.PI * 2 - Math.PI / 6, scale: 1 },
        center4: { position: [2, -1], rotation: Math.PI - Math.PI / 6, scale: 1 },
        center3: { position: [2, -1], rotation: Math.PI, scale: 1 },
      },
    },
  });

  const movablePad = (moveable) => {
    if (moveable) {
      return {
        color: colors.pads,
        isMovable: true,
        sides: 20,
        radius: 0.07,
        touchRadius: 0.3,
        fill: true,
        boundary: 'diagram',
        touchRadiusInBoundary: false,
      };
    }
    return {
      color: colors.diagram.background,
      radius: 0.01,
      touchRadius: 0.01,
    };
  };
  layout.sas = {
    name: 'fig',
    method: 'polyLine',
    options: {
      position: [0, 0],
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
      ],
      color: colors.sides,
      width: layout.width,
      close: false,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.4,
          width: layout.width,
          sides: 100,
        },
        label: {
          text: null,
          showRealAngle: true,
          precision: 0,
          radius: 0.4,
        },
      },
      side: {
        // offset: 0,
        label: {
          text: null,
        },
      },
      pad: [
        movablePad(true),
        movablePad(false),
        movablePad(false),
        movablePad(false),
      ],
    },
  };

  layout.addElementsSAS = [
    layout.sas,
    config1,
    config2,
    config3,
    config4,
    sasBaseSep,
    sasAngleSep,
    sasLine2Sep,
  ];

  // /////////////////////////////////////////////////////////////////
  // ASA
  // /////////////////////////////////////////////////////////////////
  layout.asa = {
    name: 'fig',
    method: 'polyLine',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
      ],
      color: colors.sides,
      width: layout.width,
      close: false,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.4,
          width: layout.width,
          sides: 100,
        },
        label: {
          text: null,
          showRealAngle: true,
          precision: 0,
          radius: 0.4,
        },
      },
      side: {
        offset: 0.1,
        label: {
          text: null,
        },
      },
      pad: [
        movablePad(true),
        movablePad(false),
        movablePad(false),
        movablePad(true),
      ],
    },
  };

  layout.addElementsASA = [
    layout.asa,
  ];

  // /////////////////////////////////////////////////////////////////
  // AAS
  // /////////////////////////////////////////////////////////////////
  const aasSide = {
    name: 'side',
    method: 'line',
    options: {
      width: layout.width,
      p1: [-2, -1],
      p2: [2, -1],
      color: colors.sides,
      label: {
        text: null,
        offset: 0.1,
        location: 'bottom',
      },
    },
  };

  const aasAngle = {
    method: 'angle',
    options: {
      color: colors.angles,
      sides: {
        color: colors.sides,
        length: 0.5,
      },
      curve: {
        radius: 0.4,
        width: layout.width,
      },
      label: {
        text: null,
        radius: 0.4,
      },
    },
  };

  const aasAngle1 = joinObjects({}, aasAngle, {
    name: 'angle1',
    options: {
      rotation: 0,
      angle: Math.PI / 6,
      position: [-2, -1],
    },
  });

  const aasAngle2 = joinObjects({}, aasAngle, {
    name: 'angle2',
    options: {
      rotation: Math.PI - Math.PI / 3,
      angle: Math.PI / 3,
      position: [2, -1],
    },
  });

  const aasAngle3 = joinObjects({}, aasAngle, {
    name: 'angle3',
    options: {
      rotation: Math.PI + Math.PI / 6,
      angle: Math.PI / 2,
      position: [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
    },
  });

  layout.addElementsAAS = [
    aasAngle1,
    aasAngle2,
    aasAngle3,
    aasSide,
  ];

  // /////////////////////////////////////////////////////////////////
  // SSA
  // /////////////////////////////////////////////////////////////////
  const ssaRadius = 1.4;
  layout.ssaRadius = ssaRadius;
  const ssaSide = {
    method: 'line',
    options: {
      width: layout.width,
      color: colors.sides,
      vertexSpaceStart: 'start',
    },
  };

  const ssaSideUnknown = joinObjects({}, ssaSide, {
    name: 'unknown',
    options: {
      angle: Math.PI / 6,
      length: 0.5,
    },
    mods: {
      scenarios: {
        init: { rotation: Math.PI / 6 },
      },
    },
  });

  const ssaSideAdjacent = joinObjects({}, ssaSide, {
    name: 'adjacent',
    options: {
      length: 2,
      angle: Math.PI,
      position: [0, 0],
      // move: { type: 'scaleX' },
    },
  });

  const ssaAdjacentMovePad = {
    name: 'adjacentMovePad',
    method: 'rectangle',
    options: {
      alignV: 'middle',
      alignH: 'left',
      width: 1,
      height: 0.3,
      corner: {
        radius: 0.1,
        sides: 0,
      },
      // reference: 'center',
      reference: [0, -1],
      color: [0, 0, 0, 0.001],
      // position: [-2, 0],
    },
    mods: {
      isMovable: true,
      interactiveLocation: [0.5, 0],
      scenarios: {
        init: { position: [-2.2, 0], rotation: 0 },
      },
    },
  };

  const ssaSideOpposite = joinObjects({}, ssaSide, {
    name: 'opposite',
    options: {
      length: ssaRadius,
      position: [0, 0],
      angle: Math.PI / 3,
      move: {
        type: 'rotation',
      },
    },
    mods: {
      interactiveLocation: [ssaRadius * 0.9, 0],
      scenarios: {
        init: { rotation: Math.PI / 3 },
      },
    },
  });
  const ssaAngle = {
    name: 'angle',
    method: 'angle',
    options: {
      angle: Math.PI / 6,
      color: colors.angles,
      // sides: {
      //   color: colors.sides,
      //   length: 0.5,
      // },
      curve: {
        radius: 0.4,
        width: layout.width,
        sides: 400,
      },
      label: {
        text: null,
        radius: 0.4,
      },
    },
    mods: {
      // scenarios: {
      //   init: { position: [-2, 0], rotation: 0 },
      // },
      // touchInBoundingRect: true,
    },
  };

  const constructionCircle = {
    name: 'constructionCircle',
    method: 'polygon',
    options: {
      color: colors.construction,
      width: layout.width / 2,
      radius: ssaRadius,
      sides: 400,
      position: [0, 0],
    },
  };

  const constructionLine = {
    name: 'constructionLine',
    method: 'line',
    options: {
      color: colors.construction,
      width: layout.width / 2,
      length: 2,
      angle: Math.PI / 6,
      vertexSpaceStart: 'start',
      move: {
        type: 'rotation',
      },
      largerTouchBorder: 50,
    },
    mods: {
      interactiveLocation: [1, 0],
      canBeMovedAfterLoosingTouch: true,
    },
  };

  layout.addElementsSSA = [
    constructionCircle,
    constructionLine,
    ssaAdjacentMovePad,
    ssaSideAdjacent,
    ssaAngle,
    ssaSideUnknown,
    ssaSideOpposite,
  ];

  layout.ssaScenarios = {
    init: { position: [0.5, -0.4], scale: 1 },
  };
  return layout;
}
