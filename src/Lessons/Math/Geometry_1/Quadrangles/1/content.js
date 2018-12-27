// @flow
import Fig from 'figureone';
import {
  LessonContent, infoList,
} from '../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const {
  click, centerV, highlight, clickWord, highlightWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new LessonDiagram(htmlId, layout);
    this.loadQRs([
      'triangle_introduction',
      'congruent_triangles',
      'adjacent_angles',
      'related_angles',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const quad = diag._quad;
    const rect = diag._rect;
    const square = diag._square;
    // const qr = diag._qr;
    let common = {};


    let mods = {
      add_up_to_180: clickWord('add up to 180º', 'add_up_to_180', this.showQR, [this, 'triangle_introduction', 'Main'], colors.diagram.action),
      a: highlight(colors.angles),
      b: highlight(colors.angles),
    };
    rect.abEqn.changeDescription('0', 'Angles in a triangle |add_up_to_180|.', mods);
    rect.abEqn.changeDescription('1', 'Subtract 90º from both sides of the equation.');
    rect.abEqn.changeDescription('2a', '90º is cancelled and goes to 0º on left side.');
    rect.abEqn.changeDescription('2b', '0º on left side can be removed');
    rect.abEqn.changeDescription('2c', '180º is reduced to 90º on right side.');
    rect.abEqn.changeDescription('3', 'Right side remainder is 90º.');
    rect.abEqn.changeDescription('4', 'Subtract angle |a| from both sides of the equation.', mods);
    rect.abEqn.changeDescription('5', '|a| cancels on the left side', mods);
    rect.abEqn.changeDescription('5a', 'No |a| remaining on left side, so can be removed', mods);
    rect.abEqn.changeDescription('6', 'End with |b| in terms of |a|.', mods);


    mods = {
      Complementary: click(this.showQR, [this, 'adjacent_angles', 'Complementary'], colors.diagram.action),
      a: highlight(colors.angles),
      d: highlight(colors.angles),
    };
    rect.adEqn.changeDescription('0', 'Angles |a| and |d| combine to make the rectangle corner, which is 90º.', mods);
    rect.adEqn.changeDescription('1', 'Subtract |a| from both sides.', mods);
    rect.adEqn.changeDescription('2', '|a| cancels on the left side', mods);
    rect.adEqn.changeDescription('3', 'No |a| remaining on left side, so can be removed.', mods);
    rect.adEqn.changeDescription('4', 'End with |d| in terms of |a|.', mods);

    mods = {
      _90ma: highlightWord('90º - a', colors.angles),
      c: highlight(colors.angles),
      a: highlight(colors.angles),
    };
    rect.bcEqn.changeDescription('0', 'Angles |_90ma| and |c| combine to make the rectangle corner, which is 90º.', mods);
    rect.bcEqn.changeDescription('1', 'Subtract 90º from both sides of the equation.');
    rect.bcEqn.changeDescription('2', '90º is cancelled and goes to 0º on the left side of the equation.');
    rect.bcEqn.changeDescription('3', 'The left side has other terms, so the 0º can be removed.');
    rect.bcEqn.changeDescription('4', '90º is cancelled and goes to 0º on the right side of the equation.');
    rect.bcEqn.changeDescription('5', 'The right side has no other terms, so it is just 0º.');
    rect.bcEqn.changeDescription('6', 'Add |a| to both sides of the equation.', mods);
    rect.bcEqn.changeDescription('7', '|a| cancels on left side of equation.', mods);
    rect.bcEqn.changeDescription('8', 'No |a| remaining on left side, so can be removed.', mods);
    rect.bcEqn.changeDescription('9', 'Right side simplifies to one line.');
    rect.bcEqn.changeDescription('10', 'Remove 0º on right side, as it adds nothing.');
    rect.bcEqn.changeDescription('11', 'Results in |c| being equal to |a|.', mods);

    common = {
      setContent: '',
      showOnly: [
        quad, quad._quad1, quad._quad2, quad._quad3,
      ],
      show: [],
      hide: [],
      setEnterState: () => {},
      setSteadyState: () => {},
    };
    this.addSection(common, {
      title: 'Quadrangle',
      setContent: [
        'A |quadrangle| is a shape with |four sides| and |four angles|. This shape is also somtimes called a |quadrilateral|.',
        `${new Definition('Quadrangle', 'Latin', ['quattuor', 'four', 'angulus', 'angle, corner']).html('id_lesson__quadrilateral_definition')}
        ${new Definition('Quadrilateral', 'Latin', ['quattuor', 'four', 'latus, later', 'side']).html('id_lesson__quadrilateral_definition', 'lesson__definition_low')}`,
      ],
    });

    this.addSection(common, {
      setContent: [
        'The four side lengths and four angles are |properties| of a quadrangle.',
      ],
    });

    this.addSection(common, {
      title: 'Total Angle',
      setContent: [
        'Similar to a |triangle|, all the angles in a quadrangle are related to each other and will |always add up to the same angle|.',
      ],
      modifiers: {
        triangle: click(this.showQR, [this, 'triangle_introduction', 'Main'], colors.diagram.action),
      },
      setInfo: [
        '<ul>',
        '<li>Touch |triangle| to see more details on the triangle lesson.</li>',
        '</ul>',
      ],
      infoModifiers: {
        triangle: highlight(colors.diagram.action),
      },
    });

    common.setContent = `
      <p>
        We can show this by drawing a line between opposite corners of a quadrangle.
      </p>
    `;
    this.addSection(common);

    common.showOnly = [];
    common.show = [quad];
    this.addSection(common);

    this.addSection(common, {
      setContent: `<p>
        A quadrangle can always be split into two triangles.
      </p>`,
    });

    this.addSection(common, {
      setContent: `<p>
        As each |triangle|, has a total angle of 180º, the total angle of a quadrangle must be two times that, or |360º|.
      </p>`,
      modifiers: {
        triangle: click(this.showQR, [this, 'triangle_introduction', 'Main'], colors.diagram.action),
      },
      setInfo: infoList([
        'Touch |triangle| to see more details on the triangle lesson.',
      ]),
      infoModifiers: {
        triangle: highlight(colors.diagram.action),
      },
    });

    this.addSection({
      setContent: centerV(`
        <p>
          So to summarize, a |quadrangle| is a shape with |four sides| and |four angles|.
        </p>
        <p>
          A quadrangle's angles will |always add up to 360º| (|2π radians|).
        </p>
      `),
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    common = {
      setContent: '',
      modifiers: {},
      setInfo: [],
      infoModifiers: {},
      setEnterState: () => {
        // rect.resetColors();
      },
      showOnly: [
        rect, rect._rect,
        rect._rect._lineA, rect._rect._lineA._line,
        rect._rect._lineB, rect._rect._lineB._line,
        rect._rect._lineC, rect._rect._lineC._line,
        rect._rect._lineD, rect._rect._lineD._line,
      ],
      show: [
        rect._rect._rightAngle1, rect._rect._rightAngle2,
        rect._rect._rightAngle3, rect._rect._rightAngle4,
      ],
      hide: [
        rect._rect._lineC._label.__1,
        rect._rect._lineD._label.__1,
      ],
      transitionFromAny: (done) => {
        rect.moveToScenario(rect._rect, layout.rect.scenarios.start, 1, done);
      },
      setSteadyState: () => {
        rect.setScenario(rect._rect, layout.rect.scenarios.start);
      },
      setLeaveState: () => {
        rect.resetColors();
      },
    };

    this.addSection(common, {
      title: 'Rectangle',
      setContent: `<p>
        A special type of quadrangle is one where all the |angles are equal to 90º|. This shape is called a |rectangle|.
      </p>
      ${new Definition('Rectangle', 'Latin', ['rectus', 'right', 'angulus', 'corner, angle']).html('id_lesson__rectangle_definition', 'lesson__definition_low')}
      `,
      setEnterState: () => {
        rect.resetColors();
        if (this.comingFrom === 'prev') {
          rect.setScenario(rect._rect, layout.rect.scenarios.start);
        }
      },
    });

    common.show = [
      rect._rect._rightAngle1, rect._rect._rightAngle2,
      rect._rect._rightAngle3, rect._rect._rightAngle4,
      rect._rect._lineA, rect._rect._lineB,
      rect._rect._lineC, rect._rect._lineD,
    ];
    this.addSection(common, {
      setContent: `<p>
        As a quadrangle, the rectangle also has properties of four |side_lengths| and four |angles|.
      </p>`,
      modifiers: {
        side_lengths: click(rect.pulseSideLabels, [rect], colors.lines),
        angles: click(rect.pulseRightAngles, [rect], colors.angles),
      },
      setInfo: infoList([
        'Touch |side_lengths| to highlight the sides.',
        'Touch |angles| to highlight the angles.',
      ]),
      infoModifiers: {
        side_lengths: highlight(colors.lines),
        angles: highlight(colors.angles),
      },
    });

    this.addSection(common, {
      setContent: `<p>
        Are these properties |related| to each other? If so, some can be used to calculate others.
      </p>`,
    });

    this.addSection(common, {
      setContent: `<p>
        The |angles| are all equal to each other (90º) from the definition of a rectangle, so they |are related|.
      </p>`,
    });


    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common.setContent = `<p>
      The |sides are also related| to each other. The first relationship can be seen from looking at the |angle two opposite sides make with a third side|.
    </p>`;
    common.setEnterState = () => {
      rect._rect._lineD.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle1.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle4.setColor(colors.diagram.disabledDark);
    };
    this.addSection(common, {
      title: 'Parallel Sides',
    });

    common.modifiers = {
      interior_angles: click(this.showQR, [this, 'related_angles', 'Interior'], colors.diagram.action),
    };

    common.setContent = `<p>
      This configuration is a form of |interior_angles| formed between a |line| intersecting |two_lines|.
    </p>`;
    this.addSection(common, {
      modifiers: {
        interior_angles: click(this.showQR, [this, 'related_angles', 'Interior'], colors.diagram.action),
        line: click(rect.pulseLine, [rect, 'B'], colors.lines),
        two_lines: click(rect.pulseLine, [rect, ['A', 'C']], colors.lines),
      },
      setInfo: [
        '<ul>',
        '<li>Touch |interior_angles| to show more details on the lesson.</li>',
        '<li>Touch |line| to highlight the intersecting line.</li>',
        '<li>Touch |two_lines| to highlight the two lines intersected.</li>',
        '</ul>',
      ],
      infoModifiers: {
        interior_angles: highlight(colors.diagram.action),
        line: highlight(colors.lines),
        two_lines: highlight(colors.lines),
      },
    });

    common.setContent = `<p>
      The |interior_angles| of two |parallel lines| intersected by a third line will always add to |180º|.
    </p>`;
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch |interior_angles| to show more details on the lesson.</li>',
        '</ul>',
      ],
      infoModifiers: { interior_angles: highlight(colors.diagram.action) },
    });

    common.setContent = `<p>
      The reverse of this is, if the |interior_angles| of two lines intersected by a third line |add to 180º|, then the lines |must be parallel|.
    </p>`;
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch |interior_angles| to show more details on the lesson.</li>',
        '</ul>',
      ],
      infoModifiers: { interior_angles: highlight(colors.diagram.action) },
    });

    common.setContent = `<p>
      Therefore, lines |A| and |C| are parallel.
    </p>`;
    this.addSection(common);

    common.setEnterState = () => {
      rect._rect._lineC.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle3.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle4.setColor(colors.diagram.disabledDark);
    };
    common.setContent = `<p>
      Similarly, lines |B| and |D| are parallel.
    </p>`;
    this.addSection(common);

    common.setEnterState = () => {};
    common.setContent = `<p>
      This can be generalized to |opposite sides| in a rectangle are |parallel|.
    </p>`;
    this.addSection(common);

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common.setContent = `<p>
        To examine the relationship between side lengths, we can |split| the rectangle into |two triangles|.
      </p>`;
    this.addSection(common, {
      title: 'Equal Sides',
    });

    common.showOnly = [
      rect, rect._rect,
      rect._rect._lineA, rect._rect._lineA._line,
      rect._rect._lineB, rect._rect._lineB._line,
      rect._rect._lineC, rect._rect._lineC._line,
      rect._rect._lineD, rect._rect._lineD._line,
      rect._rect._lineE, rect._rect._lineE._line,
    ];
    this.addSection(common);

    common.setContent = `<p>
      Let's start by looking at just one triangle.
    </p>`;
    this.addSection(common);
    common.showOnly = [
      rect, rect._rect, rect._rect._lineE, rect._rect._lineE._line,
      rect._rect._lineA, rect._rect._lineA._line,
      rect._rect._lineB, rect._rect._lineB._line,
      rect._rect._lineC, rect._rect._lineC._line,
      rect._rect._lineD, rect._rect._lineD._line,
    ];
    common.setEnterState = () => {
      // rect._navAB.setEquation(rect.abEqn);
      rect._rect._angleB.showForm('0');
      rect._rect._lineC.setColor(colors.diagram.disabledDark);
      rect._rect._lineD.setColor(colors.diagram.disabledDark);
    };
    common.show = [
      rect._rect._rightAngle2,
    ];
    common.modifiers = {
      b: highlight(colors.angles),
      a: highlight(colors.angles),
      c: highlight(colors.angles),
      d: highlight(colors.angles),
      _90ma: highlightWord('90º - a', colors.angles),
      third_angle: click(rect.pulseRightAngles, [rect], colors.angles),
      _180: clickWord('180º', 'id__lesson__rectangle_180', this.showQR, [this, 'triangle_introduction', 'Main'], colors.diagram.action),
    };

    this.addSection(common);
    common.setContent = `<p>
      Unknown angles can be labelled |a| and |b|.
    </p>`;
    this.addSection(common);
    common.show = [
      rect._rect._rightAngle2,
      rect._rect._angleA, rect._rect._angleB,
    ];
    common.hide = [
      rect._rect._angleB._label.__1,
    ];
    common.setSteadyState = () => {
      rect._rect._angleB.showForm('0');
      rect.setScenario(rect._rect, layout.rect.scenarios.start);
    };
    this.addSection(common);

    common.setContent = `<p>
      The |third_angle| is a |right angle|, and all angles add up to |_180|, so we can find angle |b| in terms of |a|.
    </p>`;
    // common.modifiers = Object.assign(common.modifiers, {
    // });
    common.setInfo = [
      '<ul>',
      '<li>Touch |third_angle| to highlight the right angle.</li>',
      '<li>Touch |_180| to show information on the Triangles lesson.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      third_angle: highlight(colors.angles),
      _180: highlightWord('180º', colors.diagram.action),
    };

    this.addSection(common);

    common.setInfo = [
      '<ul>',
      '<li>Touch |third_angle| to highlight the right angle.</li>',
      '<li>Touch |_180| to show information on the Triangles lesson.</li>',
      '<li>Touch the equation and equation description to step through its progression</li>',
      '</ul>',
    ];
    common.transitionFromAny = (done) => {
      rect.moveToScenario(rect._rect, layout.rect.scenarios.analysis, 1, done);
    };

    this.addSection(common, {
      interactiveElements: [
        // rect._navAB.prev,
        // rect._navAB.prevDescription,
        // rect._navAB.refresh,
        // rect._navAB.nextDescription,
        // rect._navAB.next,
      ],
      setSteadyState: () => {
        // rect._navAB.showAll();
        rect._rect._angleB.showForm('0');
        rect._navAB.showForm('0');
        rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
        // rect._navAB.updateButtons();
      },
    });

    this.addSection(common, {
      interactiveElements: [
        // rect._navAB.prev,
        // rect._navAB.prevDescription,
        // rect._navAB.refresh,
        // rect._navAB.next,
        // rect._navAB.nextDescription,
      ],
      setSteadyState: () => {
        // rect._navAB.showAll();
        rect._rect._angleB.showForm('1');
        rect._navAB.showForm('6');
        rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
        // rect._navAB.updateButtons();
        rect.pulseAngleB();
      },
    });

    common.setInfo = [];
    common.infoModifiers = {};
    common.setContent = `<p>
      Next, consider the |second triangle| that forms the rectangle.
    </p>`;
    common.setSteadyState = () => {
      rect._rect._angleB.showForm('1');
      rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
    };
    this.addSection(common);

    common.setEnterState = () => {
      rect._rect._angleA.setColor(colors.diagram.disabledDark);
      rect._rect._angleB.setColor(colors.diagram.disabledDark);
      rect._rect._lineA.setColor(colors.diagram.disabledDark);
      rect._rect._lineB.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle2.setColor(colors.diagram.disabledDark);
    };
    this.addSection(common);

    common.setContent = `<p>
      Once again, start by labelling all the angles. Unknown angles are labelled |c| and |d|.
    </p>`;
    // this.addSection(common);
    common.show = [
      rect._rect._rightAngle2,
      rect._rect._angleA, rect._rect._angleB,
    ];
    common.hide = [
      rect._rect._angleB._label.__0,
      rect._rect._angleC._label.__1,
      rect._rect._angleD._label.__1,
    ];
    common.setSteadyState = () => {
      rect._rect._angleB.showForm('1');
      rect._rect._angleC.showForm('0');
      rect._rect._angleD.showForm('0');
      rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
    };
    this.addSection(common);

    common.show = [
      rect._rect._rightAngle2, rect._rect._rightAngle4,
      rect._rect._angleA, rect._rect._angleB,
      rect._rect._angleC, rect._rect._angleD,
    ];
    this.addSection(common);

    common.setContent = `<p>
    Angles |a| and |d| are unknown, but form the rectangle corner, which is 90º.
    </p>`;
    this.addSection(common);

    common.setEnterState = () => {
      rect._rect._angleB.setColor(colors.diagram.disabledDark);
      rect._rect._angleC.setColor(colors.diagram.disabledDark);
      rect._rect._lineB.setColor(colors.diagram.disabledDark);
      rect._rect._lineC.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle2.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle4.setColor(colors.diagram.disabledDark);
      rect._navAD.setPosition(layout.adEqnPosition);
    };
    this.addSection(common);

    common.setContent = `<p>
    Therefore, we can show angle |d| in terms of angle |a|.
    </p>`;
    this.addSection(common);

    common.setInfo = [
      '<ul>',
      '<li>Touch the equation and equation description to step through its progression</li>',
      '</ul>',
    ];
    this.addSection(common, {
      setSteadyState: () => {
        rect._rect._angleA.showForm('0');
        rect._rect._angleB.showForm('1');
        rect._rect._angleC.showForm('0');
        rect._rect._angleD.showForm('0');
        rect._navAD.showForm('0');
        // rect._navAD.updateButtons();
        // rect.adEqn.showForm('0');
      },
    });

    this.addSection(common, {
      setSteadyState: () => {
        rect._rect._angleA.showForm('0');
        rect._rect._angleB.showForm('1');
        rect._rect._angleC.showForm('0');
        rect._rect._angleD.showForm('1');
        rect._navAD.showForm('0');
        // rect._navAD.showAll();
        // rect.adEqn.showForm('4');
        rect._rect._angleD.showForm('1');
        // rect._navAD.updateButtons();
        rect.pulseAngleD();
      },
    });

    common.setInfo = [];
    common.setContent = `<p>
      Next consider angle |c|. It forms a rectangle corner with angle |_90ma|.
    </p>`;
    common.setSteadyState = () => {
      rect._rect._angleA.showForm('0');
      rect._rect._angleB.showForm('1');
      rect._rect._angleC.showForm('0');
      rect._rect._angleD.showForm('1');
      rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
    };
    this.addSection(common);

    common.setEnterState = () => {
      rect._rect._angleA.setColor(colors.diagram.disabledDark);
      rect._rect._angleD.setColor(colors.diagram.disabledDark);
      rect._rect._lineA.setColor(colors.diagram.disabledDark);
      rect._rect._lineD.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle2.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle4.setColor(colors.diagram.disabledDark);
      rect._navBC.setPosition(layout.adEqnPosition);
    };
    this.addSection(common);

    common.setContent = `<p>
      Similar to the other angles, we will find |c| in terms of angle |a|.
    </p>`;
    this.addSection(common);

    common.setInfo = [
      '<ul>',
      '<li>Touch the equation and equation description to step through its progression</li>',
      '</ul>',
    ];
    this.addSection(common, {
      setSteadyState: () => {
        rect._rect._angleA.showForm('0');
        rect._rect._angleB.showForm('1');
        rect._rect._angleC.showForm('0');
        rect._rect._angleD.showForm('1');
        rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
        rect._navBC.showForm('0');
        // rect._navBC.showAll();
        // rect.bcEqn.showForm('0');
        // rect._navBC.updateButtons();
      },
    });

    common.hide = [
      rect._rect._angleB._label.__0,
      rect._rect._angleC._label.__0,
      rect._rect._angleD._label.__0,
      rect._rect._lineC._label.__0,
      rect._rect._lineD._label.__0,
    ];
    this.addSection(common, {
      setSteadyState: () => {
        rect._rect._angleA.showForm('0');
        rect._rect._angleB.showForm('1');
        rect._rect._angleC.showForm('1');
        rect._rect._angleD.showForm('1');
        rect.setScenario(rect._rect, layout.rect.scenarios.analysis);
        rect._navBC.showForm('0');
        // rect._navBC.showAll();
        // rect.bcEqn.showForm('11');
        // rect._navBC.updateButtons();
        rect.pulseAngleC();
      },
    });

    common.setInfo = [];
    common.setContent = `<p>
      All unknown angles are in terms of angle |a|, so it is easier to see similarities between the two triangles.
    </p>`;
    common.setSteadyState = () => {
      rect._rect._angleA.showForm('0');
      rect._rect._angleB.showForm('1');
      rect._rect._angleC.showForm('1');
      rect._rect._angleD.showForm('1');
      rect.setScenario(rect._rect, layout.rect.scenarios.start);
    };
    common.transitionFromAny = (done) => {
      rect.moveToScenario(rect._rect, layout.rect.scenarios.start, 1, done);
    };
    common.setEnterState = () => {
      rect._rect._angleA.showForm('0');
      rect._rect._angleB.showForm('1');
      rect._rect._angleC.showForm('1');
      rect._rect._angleD.showForm('1');
    };
    this.addSection(common);

    common.setContent = `<p>
      In particular, there is a similarity in the |diagonal_line| and the |angles| on either side.
    </p>`;
    common.modifiers = {
      angles: click(rect.toggleASAColors, [rect], colors.angles),
      diagonal_line: click(rect.pulseDiagonalLine, [rect], colors.lines),
    };
    common.setEnterState = () => {
      rect._rect._lineA.setColor(colors.diagram.disabledDark);
      rect._rect._lineB.setColor(colors.diagram.disabledDark);
      rect._rect._lineC.setColor(colors.diagram.disabledDark);
      rect._rect._lineD.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle2.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle4.setColor(colors.diagram.disabledDark);
      rect._navBC.setPosition(layout.adEqnPosition);
    };
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch |diagonal_line| to highlight the line.</li>',
        '<li>Touch |angles| to toggle highlighting the angle pairs.</li>',
        '</ul>',
      ],
      infoModifiers: {
        diagonal_line: highlight(colors.lines),
        angles: highlight(colors.angles),
      },
    });

    common.setContent = `<p>
      When two triangles have |two_angles_and_side_between| them the same, then they are |congruent|.
    </p>`;
    common.modifiers = {
      congruent: click(this.showQR, [this, 'congruent_triangles', 'Asa'], colors.diagram.action),
      two_angles_and_side_between: click(rect.toggleASAColors, [rect], colors.diagram.action),
    };
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch |two_angles_and_side_between| to toggle highlighting the angle pairs around the side of interest.</li>',
        '<li>Touch |congruent| to show more information on the Angle-Side-Angle congruency test.</li>',
        '</ul>',
      ],
      infoModifiers: {
        two_angles_and_side_between: highlight(colors.diagram.action),
        congruent: highlight(colors.diagram.action),
      },
    });

    common.setContent = `<p>
      As the triangles are congruent, then one triangle's sides lengths are the same as the other triangle.
    </p>`;
    this.addSection(common);

    common.setEnterState = () => {
      rect._rect._angleA.setColor(colors.diagram.disabledDark);
      rect._rect._angleB.setColor(colors.diagram.disabledDark);
      rect._rect._angleC.setColor(colors.diagram.disabledDark);
      rect._rect._angleD.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle1.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle2.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle3.setColor(colors.diagram.disabledDark);
      rect._rect._rightAngle4.setColor(colors.diagram.disabledDark);
      rect._navBC.setPosition(layout.adEqnPosition);
    };

    common.show = [
      rect._rect._rightAngle2,
      rect._rect._rightAngle4,
      rect._rect._lineA, rect._rect._lineB,
      rect._rect._lineC, rect._rect._lineD,
      rect._rect._angleA, rect._rect._angleB,
      rect._rect._angleC, rect._rect._angleD,
    ];
    this.addSection(common);

    common.showOnly = [
      rect, rect._rect,
    ];
    common.show = [
      rect._rect._rightAngle1,
      rect._rect._rightAngle2,
      rect._rect._rightAngle3,
      rect._rect._rightAngle4,
      rect._rect._lineA, rect._rect._lineB,
      rect._rect._lineC, rect._rect._lineD,
    ];
    this.addSection(common);

    common.setContent = `<p>
      And so, it can be seen that in a rectangle the |opposite_sides| are |equal|.
    </p>`;
    common.modifiers = {
      opposite_sides: click(rect.toggleOppositeSides, [rect], colors.diagram.action),
    };
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch |opposite_sides| to toggle highlighting the opposite sides.</li>',
        '</ul>',
      ],
      infoModifiers: {
        opposite_sides: highlight(colors.diagram.action),
      },
    });

    this.addSection({
      setContent: centerV(`
        <p>
          So, a |rectangle| is a quadrangle with |all angles equal to 90º|.
        </p>
        <p>
          |Opposite sides| of a rectangle are |parallel|, and |equal in length|.
        </p>
        `),
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common = {
      setContent: '',
      modifiers: {},
      setEnterState: () => {},
      showOnly: [
        square, square._square,
      ],
      show: [
        square._square._rightAngle1, square._square._rightAngle2,
        square._square._rightAngle3, square._square._rightAngle4,
        square._square._lineA, square._square._lineB,
        square._square._lineC, square._square._lineD,
      ],
      hide: [],
      setSteadyState: () => {
        rect.setScenario(square._square, layout.square.scenarios.start);
      },
      setLeaveState: () => {
        rect.resetColors();
      },
    };

    this.addSection(common, {
      title: 'Square',
      setContent: `<p>
        A special type of rectangle is one where all the |sides are equal|. This shape is called a |square|.
      </p>
      ${new Definition('Square', 'Old French', ['esquare', 'square'], 'Latin', ['quadra', 'square']).html('id_lesson__square_definition', 'lesson__definition_low')}
      `,
    });
    this.addSection(common, {
      setContent: `<p>
        As a square is a rectangle, it also shares the same relationships between properties. All |angles are 90º|, and |opposite sides are parallel|.
      </p>`,
    });
  }
}

export default Content;
