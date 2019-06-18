// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';

const {
//   style,
  click,
//   clickW,
//   highlight,
//   centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
//    this.iconLink = imgLink;
//    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const topLine = fig._topLine;
    const bottomLine = fig._bottomLine;
    const middleLine = fig._middleLine;
    const topMiddleAngle = fig._topMiddleAngle;
    const bottomMiddleAngle = fig._bottomMiddleAngle;

    this.addSection({
      title: 'Summary',
      setContent: 'The distance between |parallel_lines| is the length of a |line_perpendicular| to both lines, and is |constant| everywhere along the lines.',
      show: [
        topLine, bottomLine, middleLine, topMiddleAngle, bottomMiddleAngle,
      ],
      modifiers: {
        line_perpendicular: click(coll.pulseMiddleLineAndAngles, [coll], colors.distance),
        parallel_lines: click(coll.pulseParallelLines, [coll, null], colors.lines),
      },
    });
  }
}

export default Content;
