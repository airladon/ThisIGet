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
  style,
  click,
  // clickW,
  highlight,
  highlightWord,
  centerV,
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
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const fig2 = coll._fig2;

    this.addSection({
      title: 'Right Angle Triangle Split',
      setContent: centerV([
        'We will examine what happens when we |split a triangle with a line parallel to one of its sides|.',
        'To do this, we start with the simple case of a right angle triangle, and extend the result.',
      ]),
    });

    const centerFig = {
      setEnterState: () => {
        fig.setScenario('center');
      },
    };

    this.addSection(centerFig, {
      setContent: [
        'Start with a right angle triangle with sides |M|, |N| and |B|',
      ],
      show: [fig._tri, fig._rightAngle],
    });

    let common = {
      setContent: [
        'Then |draw_a_line| parallel to |B|.',
      ],
    };
    this.addSection(centerFig, common, {
      modifiers: { draw_a_line: this.bindNext(colors.sides) },
      show: [fig._tri, fig._rightAngle],
    });

    this.addSection(centerFig, common, {
      modifiers: {
        draw_a_line: click(coll.pulseSplit, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => { coll.pulseSplit(done); },
      show: [fig._tri, fig._rightAngle, fig._split],
    });

    common = {
      setContent: [
        'As the line is parallel, then it will also form a |right angle| with side |N| as the two |right_angles| are |corresponding_angles|.',
      ],
    };
    this.addSection(centerFig, common, {
      modifiers: {
        corresponding_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Corresponding'),
        right_angles: this.bindNext(colors.sides),
      },
      show: [fig._tri, fig._rightAngle, fig._split],
    });

    this.addSection(centerFig, common, {
      modifiers: {
        corresponding_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Corresponding'),
        right_angles: click(coll.pulseRightAngles, [coll, null], colors.sides),
      },
      show: [fig._tri, fig._rightAngle, fig._split, fig._splitRightAngle],
      transitionFromPrev: (done) => { coll.pulseRightAngles(done); },
    });

    common = {
      setContent: [
        'The split line has created a smaller |triangle| at the top. We can highlight this triangle, and label its sides.',
      ],
    };
    this.addSection(centerFig, common, {
      modifiers: {
        triangle: this.bindNext(colors.highlight),
      },
      show: [fig._tri, fig._rightAngle, fig._split, fig._splitRightAngle],
    });

    this.addSection(centerFig, common, {
      modifiers: {
        triangle: click(coll.pulseSplitTriangle, [coll, null], colors.highlight),
      },
      show: [
        fig._tri, fig._rightAngle, fig._split, fig._splitRightAngle,
        fig._splitTri,
      ],
      hide: [fig._tri._side01, fig._tri._side12],
      transitionFromPrev: (done) => { coll.pulseSplitTriangle(done); },
    });

    this.addSection(centerFig, {
      setContent: [
        'We wish to see if there is any relationship between the side lengths in the |original triangle| and the new |smaller_triangle|.',
      ],
      modifiers: {
        smaller_triangle: highlight(colors.highlight),
      },
      show: [
        fig._tri, fig._rightAngle, fig._split, fig._splitRightAngle,
        fig._splitTri,
      ],
      hide: [fig._tri._side01, fig._tri._side12],
    });

    common = {
      setContent: [
        'To do this, we will |divide| the triangle into three triangles, then look at the areas.',
      ],
    };

    this.addSection(centerFig, common, {
      modifiers: {
        divide: this.bindNext(colors.sides),
      },
      show: [
        fig._tri, fig._rightAngle, fig._split, fig._splitRightAngle,
        fig._splitTri,
      ],
      hide: [fig._tri._side01, fig._tri._side12],
    });

    this.addSection(centerFig, common, {
      modifiers: {
        divide: click(coll.pulseAreaLabels, [coll, null], colors.sides),
      },
      show: [
        fig._tri, fig._split, fig._area1, fig._area2, fig._area3,
        fig._construction,
      ],
      hide: [fig._tri._side01, fig._tri._side12, fig._tri._side20],
      transitionFromPrev: (done) => { coll.pulseAreaLabels(done); },
    });

    let content = {
      setContent: [
        'Now lets add back all the information we have about this split triangle, so we can |analyze| it.',
      ],
    };

    this.addSection(centerFig, content, {
      show: [
        fig._tri, fig._split, fig._area1, fig._area2, fig._area3,
        fig._construction,
      ],
      hide: [fig._tri._side01, fig._tri._side12, fig._tri._side20],
    });

    this.addSection(centerFig, content, {
      show: [
        fig._tri, fig._split, fig._area1, fig._area2, fig._area3,
        fig._construction,
        fig._rightAngle, fig._splitRightAngle,
      ],
      hide: [fig._tri._side01, fig._tri._side12, fig._tri._side20],
    });

    this.addSection(centerFig, content, {
      show: [
        fig._tri, fig._split, fig._area1, fig._area2, fig._area3,
        fig._construction, fig._splitTri,
        fig._rightAngle, fig._splitRightAngle,
      ],
      hide: [fig._tri._side01, fig._tri._side12, fig._tri._side20],
    });

    this.addSection(centerFig, content, {
      show: [fig],
      hide: [fig._tri._side01, fig._tri._side12],
    });

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        fig.setScenario('left');
      },
      show: [fig],
      hide: [fig._tri._side01, fig._tri._side12],
    };
    this.addSection(common, content, {
      transitionFromPrev: (done) => {
        fig.setScenario('center');
        fig.animations.new()
          .scenario({ target: 'left', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig.setScenario('left');
      },
    });

    content = {
      setContent: 'The area of the original triangle is equal to the sum of the three smaller triangles.',
    };
    this.addSectionEqnStory([{ nav: coll._0, form: '0' }], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   {
    //     nav: coll._1, form: '0', toForm: '1', moveFrom: coll._0Eqn,
    //   },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   {
    //     nav: coll._1, form: '1', toForm: '1a',
    //   },
    // ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      {
        nav: coll._1, form: '1a',
      },
    ], common, content);

    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2m' },
    ], common, content);

    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2m' },
      { nav: coll._3, form: '3f' },
    ], common, content);

    content = {
      setContent: 'This means both |n_| and |b_| are the same proportion of their corresponding sides |N| and |B|.',
      modifiers: {
        N: highlight(colors.sides),
        n_: highlight(colors.highlight),
        B: highlight(colors.sides),
        b_: highlight(colors.highlight),
      },
    };
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2m' },
      { nav: coll._3, form: '3f' },
    ], common, content);

    content = {
      setContent: 'We can then use this, and the Pythagorean theorem, to find the relationship with |m|.',
      modifiers: {
        m: highlight(colors.highlight),
      },
    };
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2m' },
      { nav: coll._3, form: '3f' },
    ], common, content);

    this.addSection(common, content, {
      transitionFromPrev: (done) => {
        coll._4Eqn.showForm('4');
        coll._4Eqn.setPositionToElement(coll._3Eqn);
        const target = coll._0Eqn.getPosition();
        coll._4Eqn.animations.new()
          .position({ target, duration: 2 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._4.showForm('4');
        coll._4.setPositionToElement(coll._0);
        coll._4Eqn.setPositionToElement(coll._0Eqn);
      },
    });

    this.addSectionEqnStory([
      { nav: coll._4, form: '4' },
      { nav: coll._5, form: '5' },
    ], common, content);

    this.addSectionEqnStory([
      { nav: coll._4, form: '4' },
      { nav: coll._5, form: '5' },
      { nav: coll._6, form: '6c' },
    ], common, content);

    this.addSectionEqnStory([
      { nav: coll._4, form: '4' },
      { nav: coll._5, form: '5' },
      { nav: coll._6, form: '6c' },
      { nav: coll._7, form: '7c' },
    ], common, content);

    content = {
      setContent: style({ top: 0 }, 'And so we have the |relationships| between each side of the split triangle and the corresponding side of the original triangle.'),
    };

    this.addSectionEqnStory([
      { nav: coll._4, form: '4' },
      { nav: coll._5, form: '5' },
      { nav: coll._6, form: '6c' },
      { nav: coll._7, form: '7c' },
    ], common, content);

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        fig.setScenario('left');
      },
      show: [fig],
      hide: [
        fig._tri._side01, fig._tri._side12, fig._split,
        fig._area1, fig._area2, fig._area3,
        fig._construction,
        fig._rightAngle, fig._splitRightAngle,
      ],
    };

    // this.addSectionEqnStory([
    //   { eqn: coll._4Eqn, form: '4' },
    //   { eqn: coll._7Eqn, form: '7c' },
    // ], common, content);

    this.addSection(common, content, {
      transitionFromPrev: (done) => {
        coll._4Eqn.showForm('4');
        coll._7Eqn.showForm('7c');
        coll._7Eqn.animations.new()
          .scenario({ target: 'midRight', duration: 2 })
          .whenFinished(done)
          .start();
        coll._4Eqn.animations.new()
          .scenario({ target: 'midLeft', duration: 2 })
          .start();
      },
      setSteadyState: () => {
        coll._4Eqn.showForm('4Comma');
        coll._4Eqn.setScenario('midLeft');
        // coll._4Eqn.setPositionToElement(coll._0);
        // const target = coll._4Eqn.getPosition().add(0, -0.5);
        coll._7Eqn.showForm('7c');
        coll._7Eqn.setScenario('midRight');
        // coll._7Eqn.setPosition(0, 0);
      },
    });

    content = {
      setContent: style({ top: 0 }, 'Each side of the smaller triangle has been reduced by the |same amount| (r) from the corresponding side on the original triangle.'),
    };

    this.addSection(common, content, {
      setSteadyState: () => {
        coll._4Eqn.showForm('4Comma');
        coll._4Eqn.setScenario('midLeft');
        coll._7Eqn.showForm('7c');
        coll._7Eqn.setScenario('midRight');
      },
    });

    this.addSection({
      setContent: centerV([
        'If a right angle triangle is |split with a line parallel to one of its perpendicular sides|, then the new split triangle\'s sides are all in |equal proportion| to their corresponding sides of the original triangle.',
      ]),
    });

    this.addSection({
      title: 'Arbitrary Triangle Split',
      setContent: centerV([
        'We now can apply this learning to |any triangle|.',
        '|Any triangle| can be split into a sum or difference of |right angle triangles|.',
        'We can then apply our learnings on each right angle triangle.',
      ]),
    });

    content = {
      setContent: 'Consider an arbitrary triangle, and then |split| it with a line parallel to its base.',
    };
    this.addSection(content, {
      modifiers: { split: this.bindNext(colors.sides) },
      show: [fig2._tri],
    });

    this.addSection(content, {
      modifiers: {
        split: click(coll.growFig2Split, [coll, null], colors.sides),
      },
      show: [fig2._tri, fig2._hSplit],
      transitionFromPrev: (done) => {
        coll.growFig2Split(done);
      },
    });

    content = {
      setContent: 'We want to find the relationship between the side lengths of the |original_triangle|, and the |split_triangle|.',
    };

    this.addSection(content, {
      modifiers: {
        original_triangle: highlight(colors.sides),
        split_triangle: highlight(colors.highlight),
      },
      show: [fig2._tri, fig2._hSplit],
    });

    this.addSection({
      setContent: 'We want to find the relationship between the side lengths of the |original_triangle|, and the |split_triangle|.',
      modifiers: {
        original_triangle: click(coll.toggleOriginalTriangle, [coll], colors.sides),
        split_triangle: click(coll.toggleSplitTriangle, [coll], colors.highlight),
      },
      show: [
        fig2._tri, fig2._hSplit,
        fig2._topTri,
        fig2._labelM, fig2._labelB, fig2._labelN,
      ],
    });

    content = {
      setContent: 'The triangles can be vertically |split| into two right angle triangles.',
    };
    this.addSection(content, {
      modifiers: { split: this.bindNext(colors.sides) },
      show: [
        fig2._tri, fig2._hSplit,
        fig2._topTri,
        fig2._labelM, fig2._labelB, fig2._labelN,
      ],
    });

    this.addSection(content, {
      modifiers: {
        split: click(coll.growFig2VSplit, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.growFig2VSplit(done);
      },
      show: [
        fig2._tri, fig2._hSplit, fig2._vSplit,
        fig2._topTri,
        fig2._labelM, fig2._labelB, fig2._labelN,
        fig2._rightAngle, fig2._splitRightAngle,
      ],
    });

    content = {
      setContent: 'The |base| is then the sum of the two bases |B1| and |B2|.',
    };

    this.addSection(content, {
      modifiers: {
        B1: this.bindNext(colors.sides),
        B2: this.bindNext(colors.sides),
        base: click(coll.pulseB, [coll, null], colors.sides),
      },
      show: [
        fig2._tri, fig2._hSplit, fig2._vSplit,
        fig2._topTri,
        fig2._labelM, fig2._labelB, fig2._labelN,
        fig2._rightAngle, fig2._splitRightAngle,
      ],
    });

    this.addSection(content, {
      modifiers: {
        base: click(coll.pulseB, [coll, null], colors.sides),
        B1: click(coll.pulseB1, [coll, null], colors.sides),
        B2: click(coll.pulseB2, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.pulseB1(done);
        coll.pulseB2(null);
      },
      show: [
        fig2._tri, fig2._hSplit, fig2._vSplit,
        fig2._topTri,
        fig2._labelM, fig2._labelB, fig2._labelN,
        fig2._rightAngle, fig2._splitRightAngle,
        fig2._B1, fig2._B2,
      ],
    });

    // content = {
    //   setContent: 'The |base| is then the sum of the two bases |B1| and |B2|.',
    // };

    // this.addSection(content, {
    //   modifiers: {
    //     B1: this.bindNext(colors.sides),
    //     B2: this.bindNext(colors.sides),
    //     base: click(coll.pulseB, [coll, null], colors.sides),
    //   },
    //   show: [
    //     fig2._tri, fig2._hSplit, fig2._vSplit,
    //     fig2._topTri,
    //     fig2._labelM, fig2._labelB, fig2._labelN,
    //     fig2._rightAngle, fig2._splitRightAngle,
    //   ],
    // });

    // this.addSection(content, {
    //   modifiers: {
    //     base: click(coll.pulseB, [coll, null], colors.sides),
    //     B1: click(coll.pulseB1, [coll, null], colors.sides),
    //     B2: click(coll.pulseB2, [coll, null], colors.sides),
    //   },
    //   transitionFromPrev: (done) => {
    //     coll.pulseB1(done);
    //     coll.pulseB2(null);
    //   },
    //   show: [
    //     fig2._tri, fig2._hSplit, fig2._vSplit,
    //     fig2._topTri,
    //     fig2._labelM, fig2._labelB, fig2._labelN,
    //     fig2._rightAngle, fig2._splitRightAngle,
    //     fig2._B1, fig2._B2,
    //   ],
    // });

    content = {
      setContent: 'Now consider just the left triangles with total height |H|.',
    };

    this.addSection(content, {
      show: [
        fig2._tri, fig2._hSplit, fig2._vSplit,
        fig2._topTri,
        fig2._labelM, fig2._labelB, fig2._labelN,
        fig2._rightAngle, fig2._splitRightAngle,
        fig2._B1, fig2._B2,
      ],
    });

    this.addSection(content, {
      show: [
        fig2._greyTri, fig2._labelM, fig2._greyHSplit, fig2._B1,
        fig2._leftTri, fig2._topLeftTri._line, fig2._labelH,
      ],
    });

    content = {
      setContent: 'We know from earlier that the top triangle\'s |sides| will all be reduced by the |same ratio|.',
    };

    this.addSection(content, {
      modifiers: { sides: this.bindNext(colors.highlight) },
      show: [
        fig2._greyTri, fig2._labelM, fig2._greyHSplit, fig2._B1,
        fig2._leftTri, fig2._topLeftTri._line, fig2._labelH,
      ],
    });

    this.addSection(content, {
      modifiers: {
        sides: click(coll.pulseTopLeft, [coll, null], colors.highlight),
      },
      transitionFromPrev: (done) => {
        coll.pulseTopLeft(done);
      },
      show: [
        fig2._greyTri, fig2._labelM, fig2._greyHSplit, fig2._B1,
        fig2._leftTri, fig2._topLeftTri, fig2._labelH,
        fig2._rH,
      ],
    });

    content = {
      setContent: 'Similarly, for the right triangles, the |sides| will be reduced by the same ratio.',
    };

    this.addSection(content, {
      modifiers: { sides: this.bindNext(colors.highlight) },
      show: [
        fig2._greyTri, fig2._labelM, fig2._greyHSplit, fig2._B1,
        fig2._leftTri, fig2._topLeftTri, fig2._labelH,
        fig2._rH,
      ],
    });

    this.addSection(content, {
      modifiers: {
        sides: click(coll.pulseTopRight, [coll, null], colors.highlight),
      },
      transitionFromPrev: (done) => {
        coll.pulseTopRight(done);
      },
      show: [
        fig2._greyTri, fig2._labelN, fig2._greyHSplit, fig2._B2,
        fig2._rightTri, fig2._topRightTri, fig2._labelH,
        fig2._rH,
      ],
    });

    content = {
      setContent: 'Let\'s now consider the original triangles.',
    };

    this.addSection(content, {
      show: [
        fig2._greyTri, fig2._labelN, fig2._greyHSplit, fig2._B2,
        fig2._rightTri, fig2._topRightTri, fig2._labelH,
        fig2._rH,
      ],
    });

    this.addSection(content, {
      show: [
        fig2._tri, fig2._labelN, fig2._labelM, fig2._labelB,
        fig2._B1, fig2._B2,
        fig2._topTri._line,
        fig2._vSplit,
        fig2._topRightTri._side12, fig2._topLeftTri._side01,
        fig2._topRightTri._side20, fig2._topLeftTri._side20,
      ],
    });

    content = {
      setContent: 'Note that:',
    };

    this.addSection(content, {
      show: [
        fig2._tri, fig2._labelN, fig2._labelM, fig2._labelB,
        fig2._B1, fig2._B2,
        fig2._topTri._line,
        fig2._vSplit,
        fig2._topRightTri._side12, fig2._topLeftTri._side01,
        fig2._topRightTri._side20, fig2._topLeftTri._side20,
      ],
      setSteadyState: () => {
        coll._fig2Eqn.showForm('1');
        coll._fig2Eqn.setScenario('top');
      },
    });

    content = {
      setContent: 'And so we have:',
    };

    this.addSection(content, {
      show: [
        fig2._tri, fig2._labelN, fig2._labelM, fig2._labelB,
        fig2._topTri,
      ],
      setSteadyState: () => {
        coll._fig2Eqn.showForm('2');
        coll._fig2Eqn.setScenario('topLeft');
      },
    });

    this.addSection({
      setContent: centerV([
        'So we have seen if |any| triangle is |split with a line parallel to one of its  sides|, then the new split triangle\'s sides are all in |equal proportion| to their corresponding sides of the original triangle.',
      ]),
    });
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   {
    //     nav: coll._2, form: '1a', toForm: '2', moveFrom: coll._1Eqn,
    //   },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2', toForm: '2a' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2a', toForm: '2b' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2b', toForm: '2c' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2c', toForm: '2d' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2d', toForm: '2e' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2e', toForm: '2f' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2f', toForm: '2g' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2g', toForm: '2h' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2h', toForm: '2i' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2i', toForm: '2j' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2j', toForm: '2k' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2k', toForm: '2l' },
    // ], common, content);
    // this.addSectionEqnStory([
    //   { nav: coll._0, form: '0' },
    //   { nav: coll._1, form: '1a' },
    //   { nav: coll._2, form: '2l', toForm: '2m' },
    // ], common, content);
  }
}

export default Content;
