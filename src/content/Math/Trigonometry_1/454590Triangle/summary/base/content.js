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
        'A triangle with two |45º| angles, and a |90º| angle have |opposite sides with ratios| of |1|, |1| and |√2| respectively. This is commonly called a |45-45-90_triangle|.',
      ],
      modifiers: {
        '45º': highlight(colors.angles),
        '90º': highlight(colors.angles),
        '45-45-90_triangle': coll.bindToggleGroups(
          tri,
          [
            ['A1', 'A2', 'Ar2'],
            ['1', '2', 'r2'],
          ],
          colors.sides,
          ['pulse', 'show'],
        ),
      },
      show: [tri],
      setSteadyState: () => {
        tri.setScenario('default');
        tri._r2._label.showForm('0');
        tri._Ar2._label.showForm('0');
        tri._A1.hide();
        tri._A2.hide();
        tri._Ar2.hide();
      },
    });
  }
}

export default Content;
