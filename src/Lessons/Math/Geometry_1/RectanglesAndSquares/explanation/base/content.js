// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  // centerV,
  highlight,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
//    this.iconLink = imgLink;
//    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/RelatedAngles/base',
      'Math/Geometry_1/CongruentTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const rect = coll._rect;
    const square = coll._square;

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
        `${new Definition('Rectangle', 'Latin', ['rectus', 'right', 'angulus', 'corner, angle']).html(colors.sides)}`,
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
        'The |sides are also related| to each other. The first relationship can be seen from looking at the |angles| the opposite sides |A| and |C| make with |D|.',
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
        interior_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Interior', colors.diagram.action),
      },
    });

    this.addSection(common, {
      setContent: [
        'We also know that the |interior_angles| of two |parallel lines| intersected by a third line will always add to |180º|.',
      ],
      modifiers: {
        interior_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Interior', colors.diagram.action),
      },
    });

    this.addSection(common, {
      setContent: [
        'The reverse of this is: if the |interior_angles| of two lines intersected by a third line |add to 180º|, then the lines |must be parallel|.',
      ],
      modifiers: {
        interior_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Interior', colors.diagram.action),
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
        draw: click(rect._diagonal.grow, [rect._diagonal, 0, 1, true, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        rect._diagonal.showAll();
        rect._diagonal.grow(0, 1, true, done);
      },
      setSteadyState: () => {
        rect._diagonal.showAll();
      },
    });

    common = {
      setContent: 'The new |line| intersects |parallel| lines |B| and |D|.',
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
      setContent: 'We know |alternate| angles for a line intersecting parallel lines are equal, so we can say the |alternate_intersection_angles| for |B| and |D| are also |equal|.',
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
        alternate: this.qr('Math/Geometry_1/RelatedAngles/base/Alternate'),
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
        alternate: this.qr('Math/Geometry_1/RelatedAngles/base/Alternate'),
        alternate_intersection_angles: click(
          coll.pulseAlternateAngles, [coll, null], colors.angles,
        ),
      },
      show: [rect],
      transitionFromPrev: (done) => {
        coll.pulseAlternateAngles(done);
      },
    });

    common = {
      setContent: 'We know have two |triangles| that |share| the same two |angles| and common |side_length|.',
      setEnterState: () => {
        coll.resetColors();
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
      show: [rect],
    };
    this.addSection(common, {
      modifiers: {
        triangles: this.bindNext(colors.sides),
        share: this.bindNext(colors.diagram.action),
        side_length: highlight(colors.sides),
        angles: highlight(colors.angles),
      },
    });
    this.addSection(common, {
      modifiers: {
        triangles: click(coll.toggleTriangles, [coll], colors.sides),
        side_length: highlight(colors.sides),
        angles: highlight(colors.angles),
        share: click(coll.pulseCommonProperties, [coll], colors.diagram.action),
      },
      setSteadyState: () => {
        coll.triangle = false;
        coll.toggleTriangles();
      },
    });

    this.addSection({
      setContent: 'Therefore, using |Angle-Angle-Side| the congruency test, we can see the two |triangles| are |congruent|.',
      modifiers: {
        'Angle-Angle-Side': this.qr('Math/Geometry_1/CongruentTriangles/base/Aas'),
        triangles: click(coll.toggleTriangles, [coll], colors.sides),
      },
      setEnterState: () => {
        coll.resetColors();
        coll.setScenarios('center');
        coll.setRectLabels('ABCD');
      },
      setSteadyState: () => {
        if (this.comingFrom === 'prev') {
          coll.triangle = !coll.triangle;
        } else {
          coll.triangle = false;
        }
        coll.toggleTriangles();
      },
      show: [rect],
    });

    common = {
      setContent: 'As the triangles are |congruent|, then one triangle\'s sides lengths are the |same| as the other triangle.',
      show: [rect],
      setEnterState: () => {
        coll.disableElements([
          rect._topRight, rect._bottomRight,
          rect._topLeft, rect._topLeftDiag,
          rect._bottomLeft, rect._bottomRightDiag,
        ]);
        coll.setScenarios('center');
      },
    };
    this.addSection(common, {
      modifiers: {
        same: this.bindNext(colors.sides),
      },
      setSteadyState: () => {
        coll.setRectLabels('ABCD');
      },
    });
    this.addSection(common, {
      modifiers: {
        same: click(coll.toggleOppositeSides, [coll], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.setRectLabels('ABAB');
        rect._right._label.pulseScaleNow(1, 2);
        rect._bottom._label.pulseScaleNow(1, 2, 0, done);
      },
      setSteadyState: () => {
        coll.setRectLabels('ABAB');
      },
    });

    this.addSection({
      setContent: 'And so we see that a rectangle\'s |opposite| sides are |equal|.',
      modifiers: {
        opposite: click(coll.toggleOppositeSides, [coll], colors.sides),
      },
      show: [rect._left, rect._bottom, rect._top, rect._right],
      setSteadyState: () => {
        coll.resetColors();
        coll.setScenarios('center');
        coll.setRectLabels('ABAB');
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'In summary, a rectangle is a quadrangle with |all angles equal to 90º|.',
        '|Opposite sides| of a rectangle are |parallel| and have |equal length|.',
      ]),
    });

    this.addSection({
      title: 'Square',
      setContent: [
        'A special type of rectangle is one where |all the sides are equal|. This shape is called a |square|.',
        `${new Definition('Square', 'Old French', ['esquare', 'square'], 'Latin', ['quadra', 'square']).html(colors.sides)}`,
      ],
      show: [square],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });

    this.addSection({
      setContent: [
        'As a square is a rectangle, it also shares the same property relationships. All |angles are 90º|, and |opposite sides are parallel|.',
      ],
      show: [square],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });
  }
}

export default Content;
