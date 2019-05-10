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
  // style,
  click,
  // clickW,
  // highlight,
  // centerV,
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
      'right_angle_triangles',
      'rectangles_and_squares',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const topLine = fig._topLine;
    const bottomLine = fig._bottomLine;
    const point = fig._point;

    const common = {
      setEnterState: () => {
        coll.resetColors();
      },
    };

    // this.addSection(common, {
    //   title: 'Introduction',
    //   setContent: [
    //     'The |distance between two parallel lines| is a property important to understand as it sometimes allows for a more simple analysis of problems involving parallel lines.',
    //   ],
    //   show: [fig._topLine, fig._bottomLine],
    // });

    this.addSection(common, {
      title: 'Introduction',
      setContent: [
        'Similar to the distance between a |point and a line|, the distance between two parallel lines is the |smallest distance| between them.',
      ],
      show: [topLine, bottomLine],
    });

    let content = {
      setContent: 'To see if there are any special properties of this distance, we start by selecting a |point| on one of the lines.',
    };
    this.addSection(common, content, {
      show: [topLine, bottomLine],
      modifiers: {
        point: this.bindNext(colors.points),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        point: click(coll.pulsePoint, [coll], colors.points),
      },
      show: [topLine, bottomLine, point],
      transitionFromPrev: (done) => {
        coll.pulsePoint(done);
      },
    });
  }
}

export default Content;
