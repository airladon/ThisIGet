// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  // style,
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
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/Quadrangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;

    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection({
      title: 'Definition',
      setContent: [
        'A |polygon| is the general term that describes a shape made up of |straight sides|.',
        `${new Definition('Polygon', 'Latin', ['polygonum', ''], 'Greek', ['polygonos', 'many-angled']).html({
          // classes: 'diagram__definition_high',
          color: colors.sides,
        })}`,
      ],
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection({
      setContent: [
        '|Triangles| and and |quadrangles| are |polygons| with |three| and |four| sides respectively.',
      ],
      modifiers: {
        Triangles: coll.bindAccent(coll._poly1),
        quadrangles: coll.bindAccent(coll._poly2),
      },
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection({
      title: 'Total Angle',
      setContent: [
        'We have previously found the |total angle| of a |triangle| and |quadrangle|. Is it possible to find the |total angle| of |any| polygon?',
      ],
      modifiers: {
        triangle: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        quadrangle: this.qr('Math/Geometry_1/Quadrangles/base/Main'),
      },
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    let commonContent = {
      setContent: [
        'Similarly, any polygon can be split into triangles to find its total angle',
      ],
    }
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    }
    this.addSection(common, commonContent, {
      modifiers: {
        any_polygon: coll.bindAccent(coll._poly0),
        build: this.bindNext(colors.sides),
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        // any_polygon: coll.bindAccent(coll._poly0),
        build: this.bindNext(colors.sides),
      },
    });
    this.addSection(common, commonContent, {
      modifiers: {
        build: this.bindNext(colors.sides),
      },
      show: [coll._polyB],
    });
  }
}

export default Content;
