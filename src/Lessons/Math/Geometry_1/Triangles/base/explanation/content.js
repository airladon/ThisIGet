// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
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
    this.diagram.elements = new DiagramCollection(this.diagram);
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const examples = coll._examples;
    const custom = coll._customTriangle;

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
    //   show: [examples],
    //   hide: [],
    //   setSteadyState: () => {},
    //   setLeaveState: () => {},
    // };

    this.addSection({
      title: 'Triangle',
      setContent: [
        'A triangle is a shape formed by |three straight lines| connected at |three corners| (or angles).',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      show: [examples],
    });

    this.addSection({
      setContent: [
        'Another way to make a triangle is to draw lines between any |three_points|.',
      ],
      modifiers: {
        three_points: click(coll.newCustomTriangle, [coll, null], colors.pads),
      },
      show: [custom],
      transitionFromAny: (done) => {
        coll.newCustomTriangle(done);
      },
      // setSteadyState: () => {
      //   console.log(custom)
      //   // custom._pad0.setMoveBoundaryToDiagram([-1, -1, 2, 2])
      //   // console.log(custom._pad0.move.maxTransform.t())
      //   // console.log(custom._pad1.move.maxTransform.t())
      // },
    });
  }
}

export default Content;
