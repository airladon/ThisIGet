// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonCollection from '../../explanation/base/diagramCollectionCommon';
import Definition from '../../../../../common/tools/definition';

const {
  click,
  // centerV,
} = Fig.tools.html;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonTopicDiagram({ htmlId }, layout);
    this.diagram.elements = new CommonCollection(this.diagram, layout);
  }

  addSections() {
    const diag = this.diagram.elements;
    const angle = diag._angle;

    this.addSection({
      title: 'Angle',
      setContent: [
        '|Angle| is the corner formed by two |lines|.',
        'A |larger| angle is a |less sharp| corner, and a |smaller| angle is a |more sharp| corner.',
        `${new Definition('Angle', 'Latin', ['angulus', 'MEANING', '', 'corner']).html(colors.angles)}`,
      ],
      modifiers: {
        smaller: click(diag.rotateLine, [diag, 'small'], colors.lessSharp),
        larger: click(diag.rotateLine, [diag, 'large'], colors.moreSharp),
        Angle: click(diag.pulseFill, [diag], colors.angles),
        lines: click(diag.pulseLines, [diag], colors.lines),
      },
      setEnterState: () => {
        angle._line1.setScenario('start');
        angle._line2.setScenario('start');
        angle._line1.setRotation(1);
        angle._line1.isTouchable = true;
        angle.setScenario('summary');
      },
      show: [angle._line1, angle._line2, angle._fill],
    });
  }
}

export default Content;
