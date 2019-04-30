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
    const markings = coll._markings;

    const common = {
      setInfo: [
        style({ list: 'unordered', listStyleType: 'disc' }, [
          'Move and rotate the lines to see when they are parallel.',
          'Move the line by dragging its |middle|.',
          'Rotate the line by dragging one of its |ends|.',
          'The lines will have color when they are parallel.',
          'Touch |parallel| to make the lines parallel.',
        ]),
      ],
      interactiveElementsOnly: [
        'id__parallel_lines__parallel',
        line1._line, line1._midLine,
        line2._line, line2._midLine,
      ],
      setSteadyState: () => {
        line1.setScenario('center');
        line2.setScenario('center');
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
        line2.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .start();
      },
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
        'Lines are |parallel| if they have the |same rotation| and |do not touch|. Therefore, the lines cannot be on top of each other, and if extended to an infinite length, would never cross.',
        `${new Definition('Parallel', 'Greek', ['para', 'beside', 'allelois', 'each other']).html()}`,
      ],
      modifiers: {
        parallel: click(coll.rotateLine1ToParallel, [coll], colors.lines, true, 'id__parallel_lines__parallel'),
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
    });

    this.addSection({
      title: 'Markings',
      setContent: [
        'Lines that are parallel are sometimes marked with small |arrows| to make it clear they are parallel. When different numbers of arrows are used, the lines with the same number are parallel to each other.',
      ],
      show: [markings],
    });
  }
}

export default Content;
