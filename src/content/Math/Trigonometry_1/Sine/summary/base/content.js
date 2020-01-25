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
    const coll = this.diagram.elements;

    this.addSection({
      setContent: [
        'In a |right angle triangle|, the |sine_function| of an |angle| is the ratio between the angle\'s |opposite_side| and the |hypotenuse|.',
      ],
      modifiers: {
        sine_function: click(() => {
          const p = coll._eqn._angle.getPositionInBounds('diagram', 'center', 'middle');
          coll._eqn._sin.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          coll._eqn._lb.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          coll._eqn._rb.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          coll._eqn._angle.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          this.diagram.animateNextFrame();
        }, [this], colors.diagram.action),
        opposite_side: click(() => {
          const p = coll._eqn._opposite.getPositionInBounds('diagram', 'center', 'middle');
          coll._eqn._opposite.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          coll._tri._opp._label.pulseScaleNow(1, 1.2);
          this.diagram.animateNextFrame();
        }, [this], colors.components),
        angle: click(() => {
          const p = coll._eqn._angle.getPositionInBounds('diagram', 'center', 'middle');
          coll._eqn._angle.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          coll._tri._angle.pulseScaleNow(1, 1.2);
          this.diagram.animateNextFrame();
        }, [this], colors.angles),
        hypotenuse: click(() => {
          const p = coll._eqn._hypotenuse.getPositionInBounds('diagram', 'center', 'middle');
          coll._eqn._hypotenuse.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
          coll._tri._hyp._label.pulseScaleNow(1, 1.2);
          this.diagram.animateNextFrame();
        }, [this], colors.lines),
      },
      show: [
        coll._tri, coll._eqn,
      ],
      setSteadyState: () => {
        coll._eqn.showForm('sineFromHyp');
      },
    });
  }
}

export default Content;
