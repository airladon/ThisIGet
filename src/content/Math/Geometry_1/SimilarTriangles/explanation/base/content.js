// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
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
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const examples = coll._examples;

    this.addSection({
      title: 'Introduction',
      setContent: style({ centerV: true }, [
        'Shapes that have the |same shape|, but are a |different size|, are commonly called |similar shapes|.',
        'Similar shapes can be enlarged, or reduced to be congruent (the same size).',
      ]),
    });
    this.addSection({
      setContent: [
        'Shapes that have the |same shape|, but are a |different size|, are commonly called |similar_shapes|.',
      ],
      modifiers: {
        similar_shapes: click(coll.pulseSimilar, [coll], colors.sides),
      },
      show: [examples],
      setEnterState: () => {
        examples._circ1.setScenario('small');
        examples._tri1.setScenario('small');
        examples._quad1.setScenario('small');
        examples._circ2.setScenario('large');
        examples._tri2.setScenario('large');
        examples._quad2.setScenario('large');
      },
    });

    this.addSection({
      setContent: [
        'Similar shapes can be |enlarged|, or |reduced| to become the same size (|congruent|).',
      ],
      modifiers: {
        enlarged: click(coll.growExamples, [coll, null], colors.sides),
        reduced: click(coll.reduceExamples, [coll, null], colors.sides),
      },
      show: [examples],
      setEnterState: () => {
        examples._circ1.setScenario('small');
        examples._tri1.setScenario('small');
        examples._quad1.setScenario('small');
        examples._circ2.setScenario('large');
        examples._tri2.setScenario('large');
        examples._quad2.setScenario('large');
      },
    });

  }
}

export default Content;
