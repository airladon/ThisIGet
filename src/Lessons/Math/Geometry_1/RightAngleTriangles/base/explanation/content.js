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
      show: [main._tri._line, main._tri._angle1, main._opposite],
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
        'In |any| triangle, the |side_opposite| the largest angle will have the |longest| length. Therefore the side opposite the right angle is always the longest| in a right triangle.',
      ],
      modifiers: {
        side_opposite: click(coll.pulseOpposite, [coll], colors.sides),
        any: this.bindShowQR('side_angle_relationship/base', 'Main'),
      },
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'The |side_opposite| the right angle is often called the |hypotenuse|. The word comes from the |Greek| word |hypoteinousa| which means “stretching under”. Therefore the |hypotenuse is the side stretching under the right angle|.',
      ]),
      modifiers: {
        side_opposite: click(coll.pulseOpposite, [coll], colors.sides),
        Greek: highlight('lesson__greek'),
        hypoteinousa: highlight('lesson__greek'),
      },
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'To calculate triangle |area|, the triangle |height| is required. The height is a perpendicular line from the triangle |base_side| to the opposite vertex.',
      ]),
      modifiers: {
        base_side: click(coll.pulseOpposite, [coll], colors.sides),
        height: click(coll.pulseHeight, [coll], colors.sides),
        area: this.bindShowQR('area_triangle/base', 'Main'),
      },
      show: [
        main._tri._line, main._tri._angle1, main._opposite,
        main._base, main._height,
      ],
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
