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
    const fig2 = coll._fig2;

    this.addSection({
      title: 'Triangle Split with Parallel Line',
      setContent: style({ top: 0 }, [
        'Any |triangle| split with a line |parallel| to one of its sides will form a |smaller_triangle| whose sides all of the |same_proportion| of their corresponding sides on the |original_triangle|.',
      ]),
      modifiers: {
        triangle: click(coll.pulseTriangle, [coll], colors.sides),
        parallel: click(coll.pulseSplit, [coll], colors.highlight),
        smaller_triangle: click(coll.pulseSmallerTriangle, [coll], colors.highlight),
        same_proportion: click(coll.pulseEqn, [coll], colors.sides),
        original_triangle: click(coll.pulseTriangle, [coll], colors.sides),
      },
      show: [fig],
      setSteadyState: () => {
        coll.setScenarios('default');
        coll._eqn.showForm('0');
      },
    });

    this.addSection({
      title: 'Triangle Split Proportionally',
      setContent: style({ top: 0 }, [
        'A |line| between |two_sides| of a triangle split by the |same_proportion| or ratio will be |parallel| to the |remaining_side|.',
      ]),
      modifiers: {
        two_sides: click(coll.pulseTwoSides, [coll], colors.sides),
        parallel: click(coll.pulseParallel, [coll], colors.highlight),
        line: click(coll.pulseSplit, [coll], colors.highlight),
        same_proportion: click(coll.pulseEqn, [coll], colors.sides),
        remaining_side: click(coll.pulseBottom, [coll], colors.sides),
      },
      show: [fig],
      setSteadyState: () => {
        coll.setScenarios('default');
        coll._eqn.showForm('1');
      },
    });

    this.addSection({
      title: 'Lines Split Between Parallel Lines',
      setContent: style({ }, [
        'Any |lines| between |parallel_lines| will be split in |equal_proportion| by a |third_parallel_line|.',
      ]),
      modifiers: {
        lines: click(coll.pulseLines, [coll], colors.sides),
        parallel_lines: click(coll.pulseFig2ParallelLines, [coll], colors.sides),
        third_parallel_line: click(coll.pulseFig2Split, [coll], colors.highlight),
        equal_proportion: click(coll.pulseEqn, [coll], colors.sides),
      },
      show: [fig2],
      setSteadyState: () => {
        coll._eqn.setScenario('top');
        coll._eqn.showForm('0');
      },
    });
  }
}

export default Content;
