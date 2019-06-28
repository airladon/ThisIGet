// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  highlight,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/Isosceles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;

    this.addSection({
      title: 'Introduction',
      setContent: style({ centerV: true }, [
        'If two triangles have the same |side lengths| and |angles|, then they are |congruent|.',
        'Sometimes, only |three| of the side lengths and angles are needed to show two triangles are congruent.',
      ]),
    });
    this.addSection({
      setContent: style({ centerV: true, size: 0.9 }, [
        'For instance, if two triangles share the same |two angles|, and |one relatively positioned side|, then they are |congruent|. These cases are called the |Angle-Side-Angle| and |Angle-Angle-Side| congruency tests.',
        'If the triangles share the same angle and adjacent two sides (|Side-Angle-Side|), they are also congruent.',
        'If triangles share the same angle, adjacent side and opposite side (|Side-Side-Angle|) they are congruent only when the adjacent side is shorter than or equal to the opposite side.',
        'If triangles share the same angles only, then they cannot be determined to be congruent (|Angle-Angle-Angle|).',
      ]),
      modifiers: {
        'Angle-Side-Angle': this.qr('Math/Geometry_1/CongruentTriangles/base/Asa', colors.diagram.action),
        'Angle-Angle-Side': this.qr('Math/Geometry_1/CongruentTriangles/base/Aas', colors.diagram.action),
        'Side-Angle-Side': this.qr('Math/Geometry_1/CongruentTriangles/base/Sas', colors.diagram.action),
        'Side-Side-Angle': this.qr('Math/Geometry_1/CongruentTriangles/base/Ssa', colors.diagram.action),
        'Angle-Angle-Angle': this.qr('Math/Geometry_1/CongruentTriangles/base/Aaa', colors.diagram.action),
      },
    });
    this.addSection({
      title: 'Side-Side-Side Congruency',
      setContent: style({}, [
        'The remaining combination of properties is when you only know |three side lengths|. How many triangles can be made?',
      ]),
      show: [coll._left, coll._base, coll._right],
      setSteadyState: () => {
        coll.setScenarios('initial');
        coll.updateLabels();
        coll.hasTouchableElements = false;
      },
    });

    let common = {
      setContent: [
        'We can start by connecting two sides to the third.',
      ],
    };
    this.addSection(common, {
      show: [coll._left, coll._base, coll._right],
      setSteadyState: () => {
        coll.setScenarios('initial');
        coll.updateLabels();
        coll.hasTouchableElements = false;
      },
    });
    this.addSection(common, {
      show: [coll._left, coll._base, coll._right],
      transitionFromPrev: (done) => {
        coll.animations.cancelAll();
        coll.animations.new()
          .scenarios({
            target: 'center',
            duration: 1,
            afterFrame: () => { coll.updateLabels(); },
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.updateLabels();
        coll.hasTouchableElements = false;
      },
    });

    common = {
      setContent: 'We can then |rotate| the two end sides to see where they meet to form a triangle.',
    };
    this.addSection(common, {
      modifiers: {
        rotate: click(this.next, [this], colors.diagram.action),
      },
      show: [coll._left._line, coll._base._line, coll._right._line],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.hasTouchableElements = false;
      },
    });
    this.addSection(common, {
      modifiers: {
        rotate: click(coll.createConstructionLines, [coll, null], colors.diagram.action),
      },
      show: [
        coll._left._line, coll._base._line, coll._right._line,
        coll._leftCircle, coll._rightCircle,
      ],
      transitionFromPrev: (done) => {
        coll.createConstructionLines(done);
      },
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.hasTouchableElements = true;
      },
    });

    this.addSection(common, {
      setContent: 'The two |intersect| points of the circles, are the two side rotations where triangles can be formed.',
      modifiers: {
        intersect: click(coll.toggleIntersects, [coll, null, null], colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll.toggleIntersects('top', done);
      },
      show: [
        coll._left._line, coll._base._line, coll._right._line,
        coll._leftCircle, coll._rightCircle,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('top');
        coll.hasTouchableElements = true;
      },
    });

    this.addSection({
      setContent: 'Are these the same triangles or different?',
      show: [
        coll._left._line, coll._base._line, coll._right._line,
        coll._leftCircle, coll._rightCircle,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll._leftBottom._line.showAll();
        coll._rightBottom._line.showAll();
        coll.setScenarios('default');
        coll.hasTouchableElements = false;
      },
    });

    this.addSection({
      setContent: 'First we know the two |left| sides are the same length, and the two |right| sides are the same length.',
      modifiers: {
        left: click(coll.pulseLeftLabels, [coll], colors.diagram.action),
        right: click(coll.pulseRightLabels, [coll], colors.diagram.action),
      },
      show: [
        coll._left._line, coll._base._line, coll._right._line,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom._line, coll._rightBottom._line,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
    });

    common = {
      setContent: 'We can also |draw| a line from the top intersect point to the bottom.',
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
    };
    this.addSection(common, {
      modifiers: {
        draw: click(this.next, [this], colors.sides),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom,
      ],
    });
    this.addSection(common, {
      modifiers: {
        draw: click(
          coll._constructionLine.grow,
          [coll._constructionLine, 0, 0.7, false, null],
          colors.sides,
        ),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom,
        coll._constructionLine,
      ],
      transitionFromPrev: (done) => {
        coll._constructionLine.grow(0, 0.7, false, done);
      },
    });

    common = {
      setContent: 'We now have two |isosceles| triangles of which we will first look at the |left|.',
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
      ],
      setLeaveState: () => {
        coll.setDefaultColors();
      },
    };
    this.addSection(common, {
      modifiers: {
        left: click(this.next, [this], colors.sides),
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main', colors.sides),
      },
    });
    this.addSection(common, {
      modifiers: {
        left: click(coll.pulseLeftIsosceles, [coll, null], colors.sides),
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main', colors.sides),
      },
      setEnterState: () => {
        coll.colorLeftIsosceles();
      },
      transitionFromPrev: (done) => {
        coll.pulseLeftIsosceles(done);
      },
    });

    common = {
      setContent: 'We know an |isosceles| triangle\'s |two_angles| opposite the two equal sides will be equal.',
      setEnterState: () => {
        coll.colorLeftIsosceles();
      },
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll._angleBottomLeft.setScenario('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
      setLeaveState: () => {
        coll.setDefaultColors();
      },
    };
    this.addSection(common, {
      modifiers: {
        two_angles: click(this.next, [this], colors.angles),
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main', colors.sides),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
      ],
    });
    this.addSection(common, {
      modifiers: {
        two_angles: click(coll.pulseLeftIsoscelesAngles, [coll, null], colors.angles),
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main', colors.sides),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
      ],
      transitionFromPrev: (done) => {
        coll.pulseLeftIsoscelesAngles(done);
      },
    });

    common = {
      setContent: 'Next we look at the |right| isosceles triangle.',
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll._angleBottomLeft.setScenario('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
      setLeaveState: () => {
        coll.setDefaultColors();
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
      ],
    };

    this.addSection(common, {
      modifiers: {
        right: click(this.next, [this], colors.sides),
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main', colors.sides),
      },
      setEnterState: () => {
        coll.colorLeftIsosceles();
      },
    });
    this.addSection(common, {
      modifiers: {
        right: click(coll.pulseRightIsosceles, [coll, null], colors.sides),
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main', colors.sides),
      },
      setEnterState: () => {
        coll.colorRightIsosceles();
      },
      transitionFromPrev: (done) => {
        coll.pulseRightIsosceles(done);
      },
    });

    common = {
      setContent: 'It also has |two_equal_angles| opposite the two equal sides.',
      setEnterState: () => {
        coll.colorRightIsosceles();
      },
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll._angleBottomLeft.setScenario('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
      setLeaveState: () => {
        coll.setDefaultColors();
      },
    };
    this.addSection(common, {
      modifiers: {
        two_equal_angles: click(this.next, [this], colors.angles),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
      ],
    });
    this.addSection(common, {
      modifiers: {
        two_equal_angles: click(coll.pulseRightIsoscelesAngles, [coll, null], colors.angles),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
        coll._angleTopRight, coll._angleBottomRight,
      ],
      transitionFromPrev: (done) => {
        coll.pulseRightIsoscelesAngles(done);
      },
    });

    common = {
      setContent: 'Lets now |simplify this diagram| by removing unnecessary lines and joining angles |a| and |b|.',
      modifiers: {
        a: highlight(colors.angles),
        b: highlight(colors.angles),
      },
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
      setLeaveState: () => {
        coll.setDefaultColors();
      },
    };
    this.addSection(common, {
      setEnterState: () => {
        coll.colorRightIsosceles();
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftCircle, coll._rightCircle,
        coll._leftBottom, coll._rightBottom, coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
        coll._angleTopRight, coll._angleBottomRight,
      ],
    });
    this.addSection(common, {
      setEnterState: () => {
        coll.colorRightIsosceles();
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftBottom, coll._rightBottom,
        coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
        coll._angleTopRight, coll._angleBottomRight,
      ],
    });
    this.addSection(common, {
      setEnterState: () => {
        coll.colorTopBottomTriangles();
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftBottom, coll._rightBottom,
        coll._constructionLine,
        coll._angleTopLeft, coll._angleBottomLeft,
        coll._angleTopRight, coll._angleBottomRight,
      ],
    });
    this.addSection(common, {
      setEnterState: () => {
        coll.colorTopBottomTriangles();
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftBottom, coll._rightBottom,
        coll._angleTop, coll._angleBottom,
      ],
    });

    this.addSection({
      setContent: 'Finally, we can use the |Side-Angle-Side| congruency test to see the |top| and |bottom| triangles are the |same|.',
      modifiers: {
        'Side-Angle-Side': this.qr(
          'Math/Geometry_1/CongruentTriangles/base/Sas', colors.diagram.action,
        ),
        top: click(coll.pulseTopTriangle, [coll], colors.sides),
        bottom: click(coll.pulseBottomTriangle, [coll], colors.sides),
      },
      show: [
        coll._left, coll._base._line, coll._right,
        coll._leftBottom, coll._rightBottom,
        coll._angleTop, coll._angleBottom,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setScenarios('default');
        coll.hasTouchableElements = false;
        coll.updateLabels();
      },
      setLeaveState: () => {
        coll.setDefaultColors();
      },
      setEnterState: () => {
        coll.colorTopBottomTriangles();
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So if you know |three side lengths|, there is only one triangle that can be made, with one set of angles.',
      ]),
    });

    this.addSection({
      setContent: [
        'If two triangles share the same |side_lengths|, then they will be |congruent|.',
        'This case is often called the |Side Side Side| case.',
      ],
      modifiers: {
        side_lengths: highlight(colors.sides),
      },
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle1, congruent._tri2._angle1,
        congruent._tri1._angle2, congruent._tri2._angle2,
        congruent._tri1._angle0, congruent._tri2._angle0,
      ],
    });
  }
}

export default Content;
