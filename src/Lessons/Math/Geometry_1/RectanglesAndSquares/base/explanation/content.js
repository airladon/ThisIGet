// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  // centerV,
  // highlight,
  // clickWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'related_angles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const rect = coll._rect;

    let common = {
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
        coll.resetColors();
      },
    };

    this.addSection(common, {
      title: 'Rectangle',
      setContent: [
        'A special type of |quadrangle| is one where all the angles are |90º|. This shape is called a |rectangle|.',
        `${new Definition('Rectangle', 'Latin', ['rectus', 'right', 'angulus', 'corner, angle']).html()}`,
      ],
    });

    this.addSection(common, {
      setContent: [
        'As it is a quadrangle, the rectangle also has properties of |four_side_lengths| and |four_angles|.',
      ],
      modifiers: {
        four_side_lengths: click(coll.pulseSides, [coll], colors.sides),
        four_angles: click(coll.pulseAngles, [coll], colors.angles),
      },
    });

    this.addSection(common, {
      setContent: [
        'Are these properties |related| to each other? If so, some can be used to |calculate| others.',
      ],
    });

    this.addSection(common, {
      setContent: [
        'From the definition of a rectangle, the |angles| are all equal to each other (90º), so they are |related|.',
      ],
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common = {
      setContent: [
        'The |sides are also related| to each other. The first relationship can be seen from looking at the |angle| the opposite sides |A| and |C| make with |D|.',
      ],
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
      ],
      setEnterState: () => {
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    };
    this.addSection(common, {
      title: 'Parallel Sides',
      setSteadyState: () => {
        coll.resetColors();
      },
    });
    this.addSection(common, {
      setSteadyState: () => {
        coll.disableElements([rect._top, rect._topLeft, rect._topRight]);
      },
    });

    common = {
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
      ],
      setSteadyState: () => {
        coll.disableElements([rect._top, rect._topLeft, rect._topRight]);
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    };
    this.addSection(common, {
      setContent: [
        'This configuration of lines is a form of |interior_angles| formed between a |line| intersecting |two_lines|',
      ],
      modifiers: {
        line: click(coll.pulseBottom, [coll], colors.sides),
        two_lines: click(coll.pulseLeftRight, [coll], colors.sides),
        interior_angles: click(this.showQR, [this, 'related_angles/base', 'Interior'], colors.diagram.action),
      },
    });

    this.addSection(common, {
      setContent: [
        'We also know that the |interior_angles| of two |parallel lines| intersected by a third line will always add to |180º|.',
      ],
      modifiers: {
        interior_angles: click(this.showQR, [this, 'related_angles/base', 'Interior'], colors.diagram.action),
      },
    });

    this.addSection(common, {
      setContent: [
        'The reverse of this is: if the |interior_angles| of two lines intersected by a third line |add to 180º|, then the lines |must be parallel|.',
      ],
      modifiers: {
        interior_angles: click(this.showQR, [this, 'related_angles/base', 'Interior'], colors.diagram.action),
      },
    });

    this.addSection(common, {
      setContent: [
        'In this case, the |interior_angles| do add up to 180º, and so angles |A| and |C| are |parallel|.',
      ],
      modifiers: {
        interior_angles: click(coll.pulseBottomRightAngles, [coll], colors.angles),
        parallel: click(coll.pulseLeftRight, [coll], colors.sides),
      },
    });

    this.addSection(common, {
      setContent: [
        'The same process can be performed to also show opposite sides |B| and |D| are |parallel|.',
      ],
      modifiers: {
        parallel: click(coll.pulseTopBottom, [coll], colors.sides),
      },
      setSteadyState: () => {
        coll.disableElements([rect._right, rect._topRight, rect._bottomRight]);
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    });
    this.addSection(common, {
      setContent: [
        'This can be generalized to say in a rectangle |opposite| |sides are always parallel|.',
      ],
      modifiers: {
        opposite: click(coll.toggleOppositeSides, [coll], colors.sides),
      },
      setSteadyState: () => {
        coll.resetColors();
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common = {
      setContent: 'To examine the relationship between |side lengths|, we can |draw| a line between two corners to create |two triangles|.',
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
      ],
      setEnterState: () => {
        coll.resetColors();
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    };
    this.addSection(common, {
      title: 'Equal Sides',
      modifiers: {
        draw: click(this.next, [this], colors.sides),
      },
    });
    this.addSection(common, {
      modifiers: {
        draw: click(rect._diagonal.grow, [rect._diagonal, 0, 1, false, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        rect._diagonal.showAll();
        rect._diagonal.grow(0, 1, false, done);
      },
      setSteadyState: () => {
        rect._diagonal.showAll();
      },
    });

    common = {
      setContent: 'If we look at lines |B| and |D|, we see the new |line| intersects two |parallel| lines.',
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
        rect._diagonal,
      ],
      setEnterState: () => {
        coll.resetColors();
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    };
    this.addSection(common, {
      modifiers: {
        line: this.bindNext(colors.sides),
        parallel: this.bindNext(colors.sides),
      },
    });
    this.addSection(common, {
      modifiers: {
        parallel: click(coll.pulseTopBottom, [coll], colors.sides),
        line: click(coll.pulseDiagonal, [coll], colors.sides),
      },
      setSteadyState: () => {
        coll.disableElements([
          rect._right, rect._topRight, rect._bottomRight,
          rect._left, rect._topLeft, rect._bottomLeft,
        ]);
      },
    });

    common = {
      setContent: 'We know |alternate| angles for a line intersecting parallel lines are equal, so we can say the |alternate_intersection_angles| for |B| and |D| are |equal|.',
      setEnterState: () => {
        coll.disableElements([
          rect._right, rect._topRight, rect._bottomRight,
          rect._left, rect._topLeft, rect._bottomLeft,
        ]);
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
    };
    this.addSection(common, {
      modifiers: {
        alternate: this.bindShowQR('related_angles/base', 'Alternate'),
        alternate_intersection_angles: this.bindNext(colors.angles),
      },
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
        rect._diagonal,
      ],
    });
    this.addSection(common, {
      modifiers: {
        alternate: this.bindShowQR('related_angles/base', 'Alternate'),
        alternate_intersection_angles: click(coll.pulseAlternateAngles, [coll], colors.angles),
      },
      show: [rect],
      transitionFromPrev: (done) => {
        coll.pulseAlternateAngles();
        done();
      },
      // setSteadyState: () => {

      // },
    });
  }
}

export default Content;
