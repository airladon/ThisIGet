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
//   click,
//   centerV,
} = Fig.tools.html;

const layout = diagramLayout();
// const { colors } = layout;

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
    // const examples = coll._examples;
    // const meas = coll._measure;
    const unit = coll._unitShape;
    const shapes = coll._shapes;
    const rect = coll._rectangle;
    const square = coll._square;
    const eqn = coll._eqn;
    // const nav = coll._eqnNav;

    this.addSection({
      title: 'Area',
      setContent: style({ top: 0 }, [
        '|Area| is the |amount of space| a shape takes up and is measured in |squared length| units, such as |square meters| normally written as |m<sup>2</sup>|.',
        `${new Definition('Area', 'Mid 16<sup>th</sup> century', ['area', 'space allocated for a specific purpose'], 'Latin', ['area', 'vacant piece of level ground']).html({ classes: 'diagram__definition_high' })}`,
      ]),
      show: [
        shapes._circle, shapes._triangle, shapes._square, unit._grid,
        shapes._triangleHtmlLabel, shapes._squareHtmlLabel,
        shapes._circleHtmlLabel,
      ],
      setSteadyState: () => {
        coll.setScenarios('summary');
      },
    });

    this.addSection({
      title: 'Rectangle',
      setContent: [
        'The |area of a rectangle| is equal to its |width| multiplied by its |height|.',
      ],
      show: [rect._line, rect._labelWidth, rect._labelHeight, eqn],
      setSteadyState: () => {
        coll.setScenarios('summary');
        eqn.showForm('summaryRect');
      },
    });

    this.addSection({
      title: 'Square',
      setContent: [
        'The |area of a square| is equal to its |side length squared|.',
      ],
      show: [square._line, square._labelB1, square._labelB2, eqn],
      setSteadyState: () => {
        coll.setScenarios('summary');
        eqn.showForm('summarySquare');
      },
    });
  }
}

export default Content;
