// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'important_angles',
      'triangle_introduction',
      'side_angle_relationship',
      'area_triangle',
      'adjacent_angles',
    ]);
  }


  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const main = fig._main;
    const pyth = fig._pythagorusSquare;

    let common = {
      show: [main._tri._line, main._tri._angle1],
      setSteadyState: () => {
        main.setScenarios('default');
        coll.updateMainLabels();
      },
    };
    this.addSection(common, {
      title: 'Right Angle Triangle',
      setContent: [
        'A |right angle triangle|, or |right triangle|, is a triangle where one of the |angles| is a |right_angle|.',
      ],
      modifiers: {
        angles: click(coll.pulseRightAngle, [coll], colors.rightAngle),
        right_angle: this.bindShowQR('important_angles/base', 'Right'),
      },
    });

    this.addSection({
      setContent: [
        'The |right_angle| is the largest angle in the triangle as the |total_angle| in a triangle is 180º and the sum of the |remaining_angles| is 90º.',
      ],
      modifiers: {
        remaining_angles: click(coll.pulseNonRightAngles, [coll], colors.angles),
        right_angle: click(coll.pulseRightAngle, [coll], colors.rightAngle),
        total_angle: this.bindShowQR('triangle_introduction/base', 'Main'),
      },
      show: [
        main._tri._line, main._tri._angle1,
        main._tri._angle0, main._tri._angle2,
      ],
      setSteadyState: () => {
        main.setScenarios('default');
      },
    });

    this.addSection(common, {
      setContent: [
        'A triangle\'s sides and angles are |related| such that the |opposite_side| to the |largest_angle| will have the |longest| length in any triangle.',
      ],
      modifiers: {
        opposite_side: click(coll.pulseOpposite, [coll], colors.opposite),
        related: this.bindShowQR('side_angle_relationship/base', 'Main'),
        largest_angle: click(coll.pulseRightAngle, [coll], colors.opposite),
      },
      show: [
        main._tri._line, main._tri._angle1, main._opposite,
      ],
    });

    this.addSection(common, {
      setContent: [
        'Therefore the |side opposite the right angle is always the longest| in a right triangle.',
      ],
      modifiers: {
        opposite_side: click(coll.pulseOpposite, [coll], colors.opposite),
        sides_and_angles: this.bindShowQR('side_angle_relationship/base', 'Main'),
      },
      show: [
        main._tri._line, main._tri._angle1, main._opposite,
      ],
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'The |opposite_side| to the right angle is often called the |hypotenuse|. The word comes from the |Greek| word |hypoteinousa| which means “stretching under”. Therefore the |hypotenuse is the side stretching under the right angle|.',
      ]),
      modifiers: {
        opposite_side: click(coll.pulseOpposite, [coll], colors.opposite),
        hypotenuse: click(coll.pulseOpposite, [coll], colors.opposite),
        Greek: highlight('lesson__greek'),
        hypoteinousa: highlight('lesson__greek'),
      },
      show: [
        main._tri._line, main._tri._angle1, main._opposite,
      ],
    });

    this.addSection(common, {
      setContent: style({}, [
        'To calculate |triangle_area|, the triangle |height| is required. The height is a |perpendicular line| from the triangle |base_side| to the opposite |vertex|.',
      ]),
      modifiers: {
        base_side: click(coll.pulseBase, [coll], colors.sides),
        height: click(coll.pulseHeight, [coll], colors.sides),
        triangle_area: this.bindShowQR('area_triangle/base', 'Main'),
        vertex: click(coll.pulseVertex, [coll], colors.vertex),
      },
      show: [
        main._tri._line, main._tri._angle1,
        main._base, main._height, main._vertex,
      ],
    });

    let content = {
      setContent: style({}, [
        'However, in a right angle triangle, |two_sides| of the triangle are already perpendicular.',
      ]),
    };
    this.addSection(common, content, {
      modifiers: {
        two_sides: this.bindNext(colors.perpendicular),
      },
      show: [
        main._tri._line, main._tri._angle1,
        // main._base, main._height, main._vertex,
      ],
    });

    this.addSection(common, content, {
      modifiers: {
        two_sides: click(coll.pulsePerpendicularSides, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.pulsePerpendicularSides(done);
      },
      show: [
        main._tri._line, main._tri._angle1,
        // main._base, main._height, main._vertex,
        main._leftSide, main._rightSide,
      ],
    });

    content = {
      setContent: style({}, [
        'Therefore, |these sides can be used as the base and the height|, instead of needing to find a new dimension across the triangle.',
      ]),
    };
    this.addSection(common, content, {
      modifiers: {
        two_sides: click(coll.pulsePerpendicularSides, [coll, null], colors.sides),
      },
      show: [
        main._tri._line, main._tri._angle1, main._leftSide, main._rightSide,
      ],
    });

    this.addSection(common, content, {
      modifiers: {
        two_sides: click(coll.pulsePerpendicularSides, [coll, null], colors.sides),
      },
      show: [
        main._tri._line, main._tri._angle1, main._leftSide, main._rightSide,
      ],
      transitionFromPrev: (done) => {
        main.setScenario('default');
        main.animations.cancelAll();
        main.animations.new()
          .scenario({
            target: 'aDown',
            duration: 1,
            afterFrame: coll.updateMainLabels.bind(coll),
            rotDirection: -1,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        main.setScenario('aDown');
        main._baseA.showAll();
        main._heightB.showAll();
        coll.updateMainLabels();
      },
    });

    this.addSection({
      setContent: [
        'Another important property of right angle triangles is the |relationship| between |side_lengths|.',
      ],
      modifiers: {
        side_lengths: click(coll.pulseSideLengths, [coll], colors.sides),
      },
      show: [
        pyth._topLeft,
      ],
      hide: [
        pyth._topLeft._angle0, pyth._topLeft._angle2,
      ],
      setSteadyState: () => {
        pyth.setScenarios('normalSize');
        coll.updatePythagorusSquareLabels();
      },
    });

    content = {
      setContent: [
        'We can see this by taking |four congruent right angle triangle\'s| and rotating them into a |square|.',
      ],
    };

    this.addSection(content, {
      modifiers: {
        square: this.bindNext(colors.sides),
      },
      show: [
        pyth._topLeft,
      ],
      hide: [
        pyth._topLeft._angle0, pyth._topLeft._angle2,
      ],
      setSteadyState: () => {
        pyth.setScenarios('normalSize');
        coll.updatePythagorusSquareLabels();
      },
    });

    this.addSection(content, {
      modifiers: {
        square: click(coll.pulseLargeSquare, [coll, null], colors.sides),
      },
      show: [
        pyth._topLeft, pyth._topRight, pyth._bottomLeft, pyth._bottomRight,
      ],
      hide: [
        pyth._topLeft._angle0, pyth._topLeft._angle2,
        pyth._topRight._angle0, pyth._topRight._angle2,
        pyth._bottomLeft._angle0, pyth._bottomLeft._angle2,
        pyth._bottomRight._angle0, pyth._bottomRight._angle2,
      ],
      transitionFromPrev: (done) => {
        fig.setScenario('default');
        coll.updatePythagorusSquareLabels();
        fig.setScenarios('normalSize');
        fig.animations.new()
          .scenarios({ target: 'together', duration: 1 })
          .scenarios({ target: 'split', duration: 2 })
          .scenarios({
            target: 'square',
            duration: 3,
            afterFrame: coll.updatePythagorusSquareLabels.bind(coll),
          })
          .trigger({ callback: () => { pyth._largeSquare.show(); } })
          .whenFinished(coll.pulseLargeSquare.bind(coll, done))
          .start();
      },
      setSteadyState: () => {
        fig.setScenarios('square');
        pyth._largeSquare.show();
        coll.updatePythagorusSquareLabels();
      },
    });

    common = {
      show: [
        pyth._topLeft, pyth._topRight, pyth._bottomLeft, pyth._bottomRight,
        pyth._largeSquare, pyth._smallSquare,
      ],
      hide: [
        pyth._topLeft._angle0, pyth._topLeft._angle2,
        pyth._topRight._angle0, pyth._topRight._angle2,
        pyth._bottomLeft._angle0, pyth._bottomLeft._angle2,
        pyth._bottomRight._angle0, pyth._bottomRight._angle2,
        pyth._vertex1, pyth._vertex2, pyth._vertex3, pyth._vertex4,
      ],
      setSteadyState: () => {
        fig.setScenarios('square');
        coll.updatePythagorusSquareLabels();
      },
    };

    content = {
      setContent: 'Actually, there is a second |smaller_square| in the picture.',
      modifiers: {
        smaller_square: click(coll.pulseSmallSquare, [coll], colors.sides),
      },
    };
    this.addSection(common, content);

    content = {
      setContent: 'We can show this is a |square| by showing the |angles| of the triangles.',
    };
    this.addSection(common, content, {
      modifiers: {
        angles: this.bindNext(colors.angles),
        square: click(coll.pulseSmallSquare, [coll], colors.sides),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        angles: click(coll.pulseTriangleAngles, [coll, null], colors.angles),
        square: click(coll.pulseSmallSquare, [coll], colors.sides),
      },
      show: [pyth],
      hide: [
        pyth._vertex1, pyth._vertex2, pyth._vertex3, pyth._vertex4,
        pyth._bottomLeftArea,
        pyth._topLeftArea, pyth._bottomRightArea,
        pyth._topRightArea, pyth._largeSquareArea, pyth._smallSquareArea,
      ],
      transitionFromPrev: (done) => {
        coll.pulseTriangleAngles(done);
      },
    });

    content = {
      setContent: style({ top: 0 }, ['At each |point| where two triangles touch, angles |a|, |b| and the |inside_shape| are |supplementary| angles. As |_a| and |_b| sum to 90º, the remaining angle is then also |90º|.']),
    };
    this.addSection(common, content, {
      modifiers: {
        inside_shape: click(coll.pulseSmallSquare, [coll], colors.sides),
        a: highlight(colors.angles),
        b: highlight(colors.angles),
        _a: highlight(colors.angles),
        _b: highlight(colors.angles),
        supplementary: this.bindShowQR('adjacent_angles/base', 'Supplementary'),
        point: click(coll.pulseVertices, [coll], colors.vertex),
      },
      show: [pyth],
      hide: [
        pyth._bottomLeftArea, pyth._topLeftArea, pyth._bottomRightArea,
        pyth._topRightArea, pyth._largeSquareArea, pyth._smallSquareArea,
      ],
    });


    // this.addSection(common, content, {
    //   modifiers: {
    //     angles: this.bindNext(colors.angles),
    //   },
    // });
    // this.addSection(common, content, {
    //   modifiers: {
    //     angles: click(coll.pulseTriangleAngles, [coll, null], colors.angles),
    //   },
    //   show: [pyth],
    //   hide: [],
    //   transitionFromPrev: (done) => {
    //     coll.pulseTriangleAngles(done);
    //   },
    // });

    common = {
      show: [
        pyth._topLeft, pyth._topRight, pyth._bottomLeft, pyth._bottomRight,
        pyth._largeSquare, pyth._smallSquare,
      ],
      hide: [
        pyth._topLeft._angle0, pyth._topLeft._angle2,
        pyth._topRight._angle0, pyth._topRight._angle2,
        pyth._bottomLeft._angle0, pyth._bottomLeft._angle2,
        pyth._bottomRight._angle0, pyth._bottomRight._angle2,
      ],
      setSteadyState: () => {
        fig.setScenarios('square');
        coll.updatePythagorusSquareLabels();
      },
    };

    content = {
      setContent: 'We can now calculate the area of the |large_square|.',
      modifiers: {
        large_square: click(coll.pulseLargeSquare, [coll], colors.sides),
      },
    };

    this.addSection(common, content);

    content = {
      setContent: 'The area of the |large_square| is the sum of the areas of the |four_triangles| and |small_square|.',
      modifiers: {
        large_square: click(coll.showLargeSquareArea, [coll, null], colors.sides),
        small_square: click(coll.showSmallSquareArea, [coll], colors.sides),
        four_triangles: click(coll.showTriangleAreas, [coll], colors.sides),
      },
    };
    this.addSection(common, content);

    this.addSection(common, content, {
      transitionFromPrev: (done) => {
        pyth.setScenarios('square');
        pyth.animations.new()
          .scenario({ target: 'left', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        pyth.setScenarios('square');
        pyth.setScenario('left');
        coll.updatePythagorusSquareLabels();
      },
    });

    common = {
      show: [
        pyth._topLeft, pyth._topRight, pyth._bottomLeft, pyth._bottomRight,
        pyth._largeSquare, pyth._smallSquare,
      ],
      hide: [
        pyth._topLeft._angle0, pyth._topLeft._angle2,
        pyth._topRight._angle0, pyth._topRight._angle2,
        pyth._bottomLeft._angle0, pyth._bottomLeft._angle2,
        pyth._bottomRight._angle0, pyth._bottomRight._angle2,
        pyth._vertex1, pyth._vertex2, pyth._vertex3, pyth._vertex4,
      ],
      setEnterState: () => {
        coll.setScenarios('default');
        fig.setScenarios('left');
        coll.updatePythagorusSquareLabels();
      },
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll.updatePythagorusSquareLabels();
        coll._0.showForm('0');
      },
    });

    content = {
      setContent: 'We know area length of a square is ',
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll.updatePythagorusSquareLabels();
        coll._0.showForm('0');
        coll._1.showForm('1');
        coll._2.showForm('2');
        coll._3.showForm('3');
      },
    });
    // this.addSection({
    //   title: 'Right Angle Triangle',
    //   setContent: [
    //     'A right angle triangle, or right triangle, is a triangle where one of the angles is a right angle.',
    //   ],
    //   show: [fig._pythagorusSquare],
    //   setSteadyState: () => {
    //     coll.setScenarios('default');
    //     fig.setScenarios('left');
    //     coll.updatePythagorusSquareLabels();
    //     coll._0.showForm('0');
    //     coll._1.showForm('1');
    //     coll._2.showForm('2');
    //     coll._3.showForm('3');
    //   },
    // });
  }
}

export default Content;
