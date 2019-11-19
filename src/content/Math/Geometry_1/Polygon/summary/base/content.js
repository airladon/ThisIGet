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
import Definition from '../../../../../common/tools/definition';

const {
  style,
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
    const diag = this.diagram.elements;
    const coll = diag._collection;

    this.addSection({
      title: 'Polygon',
      setContent: [
        'A |polygon| is a shape made up of |straight sides|. A polygon with |n| sides has a |total_angle| of:',
        `${new Definition('Polygon', 'Latin', ['polygonum', ''], 'Greek', ['polygonos', 'many-angled']).html({
          // classes: 'diagram__definition_high',
          color: colors.sides,
        })}`,
      ],
      modifiers: {
        total_angle: highlight(colors.angles),
      },
      setEnterState: () => {
        coll.setScenarios('default');
        coll._eqnTot.setScenario('default');
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
      setSteadyState: () => {
        coll._eqnTot.showForm('0');
      },
    });

    this.addSection({
      title: 'Regular Polygon',
      setContent: [
        style({ top: 0 }, 'A |regular polygon| is a polygon with |equal sides and angles|. Each angle of an |n|-sided polygon has a measure of:'),
        style({ top: 17 }, '|Click_here| to see examples of regular polygons:'),
      ],
      modifiers: {
        Click_here: coll.bindToggleGroups(
          coll, [['p3'], ['p4'], ['p5'], ['p6'], ['p7'], ['p8'], ['p9'], ['p10']],
          colors.sides, ['show'],
        ),
      },
      setEnterState: () => {
        coll.setScenarios('default');
        coll._eqnTot.setScenario('default');
      },
      show: [coll._p3],
      setSteadyState: () => {
        coll.currentToggleIndex['0'] = 1;
        coll._eqnTot.showForm('1');
      },
    });
  }
}

export default Content;
