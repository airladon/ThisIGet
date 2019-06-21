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
  // style,
  click,
  // clickW,
  highlight,
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

    this.addSection({
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
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      {
        nav: coll._1, form: '0', toForm: '1', moveFrom: coll._0Eqn,
      },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      {
        nav: coll._1, form: '1', toForm: '1a',
      },
    ], common, content);

    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      {
        nav: coll._2, form: '1a', toForm: '2', moveFrom: coll._1Eqn,
      },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2', toForm: '2a' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2a', toForm: '2b' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2b', toForm: '2c' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2c', toForm: '2d' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2d', toForm: '2e' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2e', toForm: '2f' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2f', toForm: '2g' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2g', toForm: '2h' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2h', toForm: '2i' },
    ], common, content);
    this.addSectionEqnStory([
      { nav: coll._0, form: '0' },
      { nav: coll._1, form: '1a' },
      { nav: coll._2, form: '2i', toForm: '2j' },
    ], common, content);
  }
}

export default Content;
