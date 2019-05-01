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
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const shortestExample = coll._shortestExample;
    const longestExample = coll._longestExample;
    const fig = coll._fig;

    this.addSection({
      title: 'Introduction',
      setContent: [
        'There are some triangles where the |longest| side’s opposite angle is the |largest|, and the |shortest| side’s opposite angle is the |smallest|.',
      ],
      modifiers: {
        shortest: click(coll.pulseShortestSide, [coll], colors.sides),
        smallest: click(coll.pulseSmallestAngle, [coll], colors.angles),
        longest: click(coll.pulseLongestSide, [coll], colors.sides),
        largest: click(coll.pulseLargestAngle, [coll], colors.angles),
      },
      show: [shortestExample, longestExample],
      setEnterState: () => {
        coll.setScenarios('default');
      },
      // setSteadyState: () => {
      //   coll.setScenarios('default');
      //   coll._0.showForm('sides0');
      //   coll._1.showForm('sides1');
      //   coll._2.showForm('sides2');
      //   coll._3.showForm('sides3');
      //   coll._4.showForm('sides4');
      //   coll._fig.setScenarios('left');
      // },
    });
  }
}

export default Content;
