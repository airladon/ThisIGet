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
  // centerV,
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
    const line1 = coll._line1;
    const line2 = coll._line2;

    const common = {
      setContent: '',
      modifiers: {},
      // setInfo: `
      //     <ul>
      //       <li></li>
      //     </ul>
      // `,
      infoModifiers: {},
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    this.addSection({
      title: 'Parallel LInes',
      setContent: style({ centerV: true }, [
        '|Parallel lines| exist everywhere around us.',
        'Identifying parallel lines can often simplify analysis of a shape, allowing faster calculation of angles and lengths.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'Lines are |parallel| if they never meet. They have the same rotation, and are not on top of each other (even if made longer).',
        `${new Definition('Parallel', 'Greek', ['para', 'beside', 'allelois', 'each other']).html()}`,
      ],
      modifiers: {
        parallel: click(coll.rotateLine1ToParallel, [coll], colors.lines),
      },
      show: [line1, line2],
      setSteadyState: () => {
        line1.setScenario('center');
        line2.setScenario('center');
      },
    });
  }
}

export default Content;
