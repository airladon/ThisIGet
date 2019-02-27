// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../../js/Lesson/LessonContent';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';

const {
  click, centerV, highlight,
} = Fig.tools.html;
const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const parallel = diag._parallel;

    this.addSection({
      title: 'Introduction',
      setContent: centerV(`
        <p>
          |Parallel lines| exist everywhere around us.
        </p>
        <p>
          Identifying parallel lines can often simplify a shape considerably, allowing faster calculation of angles and lengths.
        </p>
      `),
    });

    const commonState = {
      setInfo: [
        '<ul>',
        '<li>Move and rotate the lines to see when they are parallel.</li>',
        '<li>Move the line by dragging its <i>middle</i>.</li>',
        '<li>Rotate the line by dragging one of its <i>ends</i>.</li>',
        '<li>The lines will have color when they are parallel.</li>',
        '<li>Touch |parallel| to make the lines parallel.</li>',
        '</ul>',
      ],
      infoModifiers: {
        parallel: highlight(colors.line),
      },
      setEnterState: () => {
        parallel.setPosition(layout.position);
        parallel._line1.setColor(colors.line);
      },
      showOnly: [
      ],
      show: [
        parallel,
        parallel._line1,
        parallel._line2,
      ],
      transitionFromAny: (done) => {
        let time = Math.max(
          diag.legacyGetTimeToMoveToScenario(parallel._line1),
          diag.legacyGetTimeToMoveToScenario(parallel._line2),
        );
        time = time > 2 ? 2 : time;
        diag.moveToScenario(parallel._line1, '', time);
        diag.moveToScenario(parallel._line2, '', time, done);
      },
      setSteadyState: () => {
        diag.isParallelHighlighting = true;
        diag.moveToScenario(parallel._line1, '', 0.001);
        diag.moveToScenario(parallel._line2, '', 0.001);
      },
    };

    this.addSection(Object.assign({}, {
      title: 'Definition',
      setContent: `
        <p>
          Lines are |parallel| if they never meet.
          They have the same rotation, and are not on top of each other (even if made longer).
        </p>
        ${new Definition('Parallel', 'Greek', ['para', 'beside', 'allelois', 'each other']).html('id_lesson__related_angles_definition')}
      `,
      modifiers: {
        parallel: click(parallel.rotateLine1ToParallel, [parallel], colors.line),
      },
    }, commonState));

    this.addSection(Object.assign({}, commonState, {
      setContent: `
        <p>
          Parallel lines are |parallel| no matter how |long| or |short| they are.
        </p>
      `,
      modifiers: {
        parallel: click(parallel.rotateLine1ToParallel, [parallel], colors.line),
        long: click(parallel.scaleLine, [parallel, layout.scale.long], colors.diagram.action),
        short: click(parallel.scaleLine, [parallel, layout.scale.short], colors.diagram.action),
      },
      setInfo: [
        ...commonState.setInfo.slice(0, 5),
        '<li>Touch |long| to make the lines longer.</li>',
        '<li>Touch |short| to make the lines shorter.</li>',
        ...commonState.setInfo.slice(5),
      ],
      infoModifiers: {
        long: highlight(colors.diagram.action),
        short: highlight(colors.diagram.action),
      },
    }));
  }
}

export default Content;
