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
    ]);
  }


  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const main = fig._main;

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
        'The total angle in a |triangle| is 180º, and a |right_angle| is 90º, so then the sum of the |remaining_angles| must be 90º. Therefore the 90º angle is the |largest| angle in a right triangle.',
      ],
      modifiers: {
        remaining_angles: click(coll.pulseNonRightAngles, [coll], colors.angles),
        right_angle: this.bindShowQR('important_angles/base', 'Right'),
        triangle: this.bindShowQR('triangle_introduction/base', 'Main'),
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
        main._baseA, main._heightB,
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
        coll.updateMainLabels();
      },
    });

    // this.addSection({
    //   title: 'Right Angle Triangle',
    //   setContent: [
    //     'A right angle triangle, or right triangle, is a triangle where one of the angles is a right angle.',
    //   ],
    //   show: [main._line, main._angle1],
    //   setSteadyState: () => {
    //     main.setScenarios('default');
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
