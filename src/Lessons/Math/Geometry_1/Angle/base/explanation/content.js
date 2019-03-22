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
import CommonCollection from '../common/diagramCollectionCommon';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerV,
  withClass,
  // highlight,
  // clickWord,
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
    this.diagram.elements = new CommonCollection(this.diagram, layout);
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const shapes = diag._shapes;
    const angle = diag._angle;
    console.log(diag);

    // const common = {
    //   setContent: '',
    //   modifiers: {},
    //   // setInfo: `
    //   //     <ul>
    //   //       <li></li>
    //   //     </ul>
    //   // `,
    //   infoModifiers: {},
    //   interactiveElements: [
    //     // interactiveItem(quiz._check),
    //   ],
    //   setEnterState: () => {},
    //   showOnly: [],
    //   show: [],
    //   hide: [],
    //   setSteadyState: () => {},
    //   setLeaveState: () => {},
    // };
    console.log(withClass('The sharpness of a corner is a property that can describe a shape . ', 'content_angles_bottom'));
    this.addSection({
      setContent: [
        'Many |shapes| have |corners|.',
        'Some corners are |more_sharp|, while others are |less_sharp|.',
        withClass(['The sharpness of a corner is a property that can describe a shape.'], 'content_angles_bottom'),
      ],
      modifiers: {
        shapes: click(diag.pulseShapeElement, [diag, 'lines'], colors.lines),
        corners: click(diag.pulseShapeElement, [diag, 'corners'], colors.lines),
        more_sharp: click(diag.pulseShapeElement, [diag, 'moreSharp'], colors.moreSharp),
        less_sharp: click(diag.pulseShapeElement, [diag, 'lessSharp'], colors.lessSharp),
      },
      show: [shapes._shape1._line, shapes._shape2._line, shapes._shape3._line],
      // setSteadyState: () => {
      //   shapes.setScenario('center');
      //   console.log(shapes)
      // },
    });
    // this.addSection(common, {
    //   title: '',
    //   setContent: centerV([
    //     '',
    //   ]),
    //   show: [shapes, angle],
    // });
  }
}

export default Content;
