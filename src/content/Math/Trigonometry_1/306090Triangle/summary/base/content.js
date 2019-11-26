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
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../common/tools/definition';

const {
//   style,
  // click,
//   clickW,
  highlight,
//   centerV,
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
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const coll = this.diagram.elements;
    const tri = coll._tri;

    this.addSection({
      setContent: [
        'A triangle with angles |30º|, |60º| and |90º| has |opposite sides with ratios| of |1|, |√3| and |2| respectively. This is commonly called a |30-60-90_triangle|.',
      ],
      modifiers: {
        '30º': highlight(colors.angles),
        '60º': highlight(colors.angles),
        '90º': highlight(colors.angles),
        '30-60-90_triangle': coll.bindToggleGroups(
          tri,
          [
            ['1A', '2A', 'r3A'],
            ['1', '2', 'r3'],
          ],
          colors.sides,
          ['pulse', 'show'],
        ),
      },
      show: [tri],
      setSteadyState: () => {
        tri.setScenario('default');
        tri._r3._label.showForm('0');
        tri._r3A._label.showForm('0');
        tri._1A.hide();
        tri._2A.hide();
        tri._r3A.hide();
      },
    });
  }
}

export default Content;
