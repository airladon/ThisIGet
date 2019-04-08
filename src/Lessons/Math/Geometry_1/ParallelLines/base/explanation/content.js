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
        'Identifying parallel lines can |simplify| analysis of a shape, allowing faster calculation of angles and lengths.',
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
      transitionFromAny: (done) => {
        line1.stop(true, 'noComplete');
        line2.stop(true, 'noComplete');
        coll.scaleLine(layout.length);
        line1.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .whenFinished(done)
          .start();

        // line1.animations.addTo()
        //   .custom({ target: 'center', duration: 1 })
        //   .whenFinished(done)
        //   .start();
        line2.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .start();
      },
      setSteadyState: () => {
        // line1.setScale(layout.length, 1);
        // line2.setScale(layout.length, 1);
        line1.setScenario('center');
        line2.setScenario('center');
        console.log(line1)
      },
    });

    this.addSection(common, {
      setContent: [
        'Parallel lines are |parallel| no matter how |long| or |short| they are.',
      ],
      modifiers: {
        parallel: click(coll.rotateLine1ToParallel, [coll], colors.lines),
        long: click(coll.scaleLine, [coll, layout.scale.long], colors.diagram.action),
        short: click(coll.scaleLine, [coll, layout.scale.short], colors.diagram.action),
      },
      show: [line1, line2],
      transitionFromAny: (done) => {
        line1.stop(true, 'noComplete');
        line2.stop(true, 'noComplete');
        line1.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .whenFinished(done)
          .start();
        line2.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .start();
      },
      setSteadyState: () => {
        line1.setScenario('center');
        line2.setScenario('center');
      },
    });
  }
}

export default Content;
