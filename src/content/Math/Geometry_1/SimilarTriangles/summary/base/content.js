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
  style,
  click,
//   clickW,
//   highlight,
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
    const fig = coll._fig;

    this.addSection({
      setContent: style({ top: 0 }, [
        '|Similar triangles| have |corresponding_sides| that are proportional (have the same |scaling| factor, shown as |s| in the diagram).',
        'All |similar triangles| have equal |corresponding_angles|, and all triangles with |corresponding_angles_| angles are |similar|.',
      ]),
      modifiers: {
        corresponding_angles: click(coll.pulseAngles, [coll, null], colors.angles),
        corresponding_angles_: click(coll.pulseAngles, [coll, null], colors.angles),
        corresponding_sides: click(coll.pulseTriRSide, [coll, null], colors.sides),
      },
      setEnterState: () => {
        fig._tri1.setScenario('bottomLeft');
        fig._trir.setScenario('bottomRightSummary');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
    });

    this.addSection({
      setContent: style({}, [
        '|AA| - if |two angles| in two triangles are |equal|, then the triangles are |similar|.',
      ]),
      modifiers: {
        // SAS: click(coll.toggleSas, [coll, null], colors.diagram.action),
        AA: click(coll.toggleAa, [coll, true], colors.diagram.action),
      },
      setEnterState: () => {
        fig._tri1.setScenario('bottomLeft');
        fig._trir.setScenario('bottomRightSummary');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
      setSteadyState: () => {
        coll.toggleAa(false);
      },
    });

    this.addSection({
      setContent: style({}, [
        '|SAS| - if two triangles have |two proportional corresponding sides|, and the |angle between| those sides is |equal|, then the triangles are |similar|.',
      ]),
      modifiers: {
        SAS: click(coll.toggleSas, [coll, true], colors.diagram.action),
        // AA: click(coll.toggleAa, [coll, null], colors.diagram.action),
      },
      setEnterState: () => {
        fig._tri1.setScenario('bottomLeft');
        fig._trir.setScenario('bottomRightSummary');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
      setSteadyState: () => {
        coll.toggleSas(false);
      },
    });

    this.addSection({
      setContent: style({}, [
        '|SSA| - if triangles share an equal angle, and have two corresponding sides that are proportional, then they are |only similar| if the |side opposite the angle is greater than or equal to the adjacent side|.',
      ]),
      modifiers: {
        SSA: click(coll.toggleSsa, [coll, true], colors.diagram.action),
      },
      setEnterState: () => {
        fig._tri1.setScenario('bottomLeft');
        fig._trir.setScenario('bottomRightSummary');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
      setSteadyState: () => {
        coll.toggleSsa(false);
      },
    });
  }
}

export default Content;
