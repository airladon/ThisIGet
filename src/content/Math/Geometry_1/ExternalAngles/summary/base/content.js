// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/Lesson/PresentationFormatContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../common/tools/definition';

const {
//   style,
  click,
//   clickW,
//   highlight,
//   centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      setContent: [
        'The |external_angle|, or |exterior_angle| of a triangle is the angle between a |side| and its adjacent side |extended_outwards|, and is |equal| to the |sum_of_the_opposite_angles|.',
      ],
      modifiers: {
        external_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
        exterior_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
        sum_of_the_opposite_angles: click(coll.pulseOppositeAngles, [coll, null], colors.angles),
        side: click(coll.pulseAdjacent, [coll], colors.sides),
        extended_outwards: click(coll.pulseExternalLine, [coll], colors.externalSide),
      },
      show: [
        fig._tri._line, fig._tri._angle0, fig._tri._angle1,
        fig._externalLine, fig._externalAngle,
        fig._adjacent,
      ],
      setEnterState: () => {
        fig.setScenario('default');
        fig._externalAngle.label.setText('a + b');
        fig._externalAngle.updateLabel();
      },
    });
  }
}

export default Content;
