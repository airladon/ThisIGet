// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'pads',
  'disabled',
  'construction',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.02;

  const angle = (text) => {
    return {
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
    };
  };

  const side = (text) => {
    return {
      color: colors.sides,
      label: {
        text,
        scale: 0.8,
        offset: 0.1,
        location: 'outside',
      },
    };
  };

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
  const ssaSide = {
    method: 'line',
    options: {
      width: layout.width,
      color: colors.sides,
      vertexSpaceStart: 'start',
    },
  };

  const ssaSideLeft = joinObjects({}, ssaSide, {
    name: 'left',
    options: {
      angle: Math.PI / 6,
      length: 0.5,
    },
  });

  const ssaSideBase = joinObjects({}, ssaSide, {
    name: 'base',
    options: {
      length: 2,
      angle: Math.PI,
      position: [0, 0],
      // move: { type: 'scaleX' },
    },
  });

  const basePad = {
    name: 'basePad',
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
      color: colors.diagram.background,
      position: [-2, 0],
    },
    mods: {
      isMovable: true,
    },
  };

  const ssaSideRight = joinObjects({}, ssaSide, {
    name: 'right',
    options: {
      length: ssaRadius,
      position: [0, 0],
      angle: Math.PI / 3,
      move: {
        type: 'rotation',
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
      scenarios: {
        init: { position: [-2, 0], rotation: 0 },
      },
      // touchInBoundingRect: true,
    },
  };

  const constructionCircle = {
    name: 'circle',
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
    name: 'line',
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
      canBeMovedAfterLoosingTouch: true,
    },
  };

  layout.addElementsSSA = [
    basePad,
    ssaAngle,
    constructionCircle,
    constructionLine,
    ssaSideLeft,
    ssaSideBase,
    ssaSideRight,
  ];

  layout.ssaScenarios = {
    init: { position: [1, -0.2], scale: 1 },
  };

  // /////////////////////////////////////////////////////////////////
  // SSS
  // /////////////////////////////////////////////////////////////////
  // const base = 1.5;
  // const left = base / ((Math.sqrt(3) + 1 / Math.sqrt(3)) / 2);
  // const right = Math.sqrt(base ** 2 - left ** 2);
  // const sssLine = {
  //   method: 'line',
  //   options: {
  //     color: colors.sides,
  //     width: layout.width,
  //     move: { type: 'rotation' },
  //     vertexSpaceStart: 'start',
  //     length: 1,
  //   },
  //   mods: {
  //     isTouchable: true,
  //     isMovable: true,
  //   },
  // };
  // layout.sssBase = joinObjects({}, sssLine, {
  //   name: 'base',
  //   options: {
  //     length: base,
  //     vertexSpaceStart: 'center',
  //   },
  //   mods: {
  //     isTouchable: false,
  //     isMovable: false,
  //     isInteractive: false,
  //     _line: {
  //       isTouchable: false,
  //     },
  //     scenarios: {
  //       disconnected: {
  //         position: [0, 0], rotation: Math.PI / 2, scale: 1,
  //       },
  //       connected: {
  //         position: [0, 0], rotation: 0, scale: 1,
  //       },
  //     },
  //   },
  // });
  // layout.sssLeft = joinObjects({}, sssLine, {
  //   name: 'left',
  //   options: {
  //     length: left,
  //   },
  //   mods: {
  //     scenarios: {
  //       disconnected: {
  //         position: [-1, -left / 2], rotation: Math.PI / 2, scale: 1,
  //       },
  //       connected: {
  //         position: [-base / 2, 0], rotation: Math.PI * 2 / 3, scale: 1,
  //       },
  //     },
  //     interactiveLocation: [left * 0.8, 0],
  //   },
  // });
  // layout.sssRight = joinObjects({}, sssLine, {
  //   name: 'right',
  //   options: {
  //     length: right,
  //   },
  //   mods: {
  //     scenarios: {
  //       disconnected: {
  //         position: [1, -right / 2], rotation: Math.PI / 2, scale: 1,
  //       },
  //       connected: {
  //         position: [base / 2, 0], rotation: Math.PI / 3, scale: 1,
  //       },
  //     },
  //     interactiveLocation: [right * 0.8, 0],
  //   },
  // });

  // const constructionCircle = {
  //   method: 'polygon',
  //   options: {
  //     width: layout.width / 4,
  //     color: colors.construction,
  //     sides: 100,
  //   },
  // };

  // layout.circleLeft = joinObjects({}, constructionCircle, {
  //   name: 'circleLeft',
  //   options: {
  //     radius: left,
  //   },
  // });

  // layout.circleRight = joinObjects({}, constructionCircle, {
  //   name: 'circleRight',
  //   options: {
  //     radius: right,
  //   },
  // });

  // layout.sss = {
  //   name: 'fig',
  //   method: 'collection',
  //   addElements: [
  //     layout.circleLeft,
  //     layout.circleRight,
  //     layout.sssBase,
  //     layout.sssLeft,
  //     layout.sssRight,
  //   ],
  //   options: {
  //     position: new Point(0, -0.3),
  //   },
  // };

  // layout.addElementsSSS = [
  //   layout.sss,
  // ];

  return layout;
}
