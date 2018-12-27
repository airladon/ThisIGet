// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';

// import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const { highlight, click } = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const circ = diag._circ;

    const common = {
      setContent: '',
      setInfo: [],
      modifiers: {},
      infoModifiers: {},
      setEnterState: () => {},
      showOnly: [],
      show: [circ],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
      transitionFromAny: (done) => { done(); },
    };
    const leastSides = layout.polygonSides[0];
    const midSides = layout.polygonSides[1];
    const mostSides = layout.polygonSides[2];

    common.setSteadyState = () => {
      circ.setScenario(circ, layout.collection.scenarios.center);
    };
    common.showOnly = [circ];
    this.addSection(common, {
      title: 'Introduction',
      setContent: ['The |area of a circle| can seem challenging to find as its |edge is curved| and doesn\'t align with straight lines.'],
      show: [circ._circle, circ._grid],
    });


    common.setContent = 'However, |we can do it| if we start by making an |approximation| of a circle, that we then |refine| later.';
    this.addSection(common, { show: [circ._grid, circ._circle] });

    common.setContent = `Start by splitting the circle into |equal| pieces, for example we will use |${leastSides}|.`;
    this.addSection(common, { show: [circ._circle] }, { title: 'Approximation' });
    this.addSection(common, { show: [circ._circle, circ._lines0] });


    common.setContent = `These pieces can then be made into ${leastSides} |equal triangles| which is where we will focus.`;
    this.addSection(common, { show: [circ._circle, circ._lines0] });
    this.addSection(common, { show: [circ._circle, circ._lines0, circ._poly0] });
    this.addSection(common, { show: [circ._backgroundCircle, circ._lines0, circ._poly0] });


    common.setContent = 'Each triangle has the same |height| and |base|.';
    common.modifiers = {
      height: highlight(colors.height),
      base: highlight(colors.border),
      area: highlight(colors.area),
      radius: highlight(colors.radius),
      all: click(circ.rotateArea, [circ, leastSides, null], colors.diagram.action),
      Each: click(circ.rotateArea, [circ, leastSides, null], colors.diagram.action),
      each_: click(circ.rotateArea, [circ, leastSides, null], colors.diagram.action),
      border: click(circ.pulseBorder, [circ], colors.border),
      border_: highlight(colors.border),
      circumference: click(circ.pulseCircumference, [circ], colors.circumference),
    };
    this.addSection(common, {
      show: [
        circ._backgroundCircle, circ._lines0, circ._poly0,
      ],
    });
    common.setContent = '|Each| triangle has the same |height| and |base|.';
    common.showOnly = [circ, circ._tri0];
    common.setEnterState = () => {
      circ.rotateArea(leastSides, circ.triRotation);
    };
    common.setLeaveState = () => {
      circ.rotateArea(leastSides, 0);
    };
    common.setInfo = ['Touch |Each| to change the height and base to a different triangle'];
    common.infoModifiers = {
      Each: highlight(colors.diagram.action),
    };
    this.addSection(common, {
      show: [
        circ._backgroundCircle, circ._lines0, circ._poly0,
        circ._tri0._height, circ._tri0._base,
      ],
    });


    common.setInfo = ['Touch |each| to change the height and base to a different triangle'];
    common.infoModifiers = {
      each: highlight(colors.diagram.action),
    };
    common.setContent = 'And therefore |each_| triangle has the same |area|.';
    let show = [
      circ._backgroundCircle, circ._lines0, circ._poly0,
      circ._tri0._height, circ._tri0._base,
    ];
    this.addSection(common, {
      show: [
        circ._backgroundCircle, circ._lines0, circ._poly0,
        circ._tri0._height, circ._tri0._base,
      ],
    });
    common.setInfo = [
      'Touch |each| to change the height and base to a different triangle',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |b| in the equation to highlight the triangle base.',
    ];
    common.infoModifiers = {
      each: highlight(colors.diagram.action),
      Area: highlight(colors.area),
      h: highlight(colors.height),
      b: highlight(colors.border),
      border: highlight(colors.border),
      circumference: highlight(colors.circumference),
    };
    this.addSection(common, {
      show: [...show],
      transitionFromPrev: (done) => {
        circ.moveToScenario(circ, layout.collection.scenarios.left, null, done);
      },
      setSteadyState: () => {
        circ.setScenario(circ, layout.collection.scenarios.left);
        circ._tri0._fill.show();
        circ.eqns.triRectEqn.showForm('0');
      },
    });

    common.setInfo = [
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |b| in the equation to highlight the triangle base.',
    ];
    common.setLeaveState = () => {};
    common.show = [...show, circ._tri0._fill];
    common.setEnterState = () => {
      circ.setScenario(circ, layout.collection.scenarios.left);
    };
    common.setSteadyState = () => {
      circ.setScenario(circ, layout.collection.scenarios.left);
    };
    common.setContent = `The |area| of |all triangles| is then |${leastSides} | times the area of |one triangle|.`;
    this.addEqnStep(circ.eqns.triRectEqn, '0', '0', common);
    common.show = [...show, circ._fill0];
    this.addEqnStep(circ.eqns.triRectEqn, '0', ['1', '0'], common);


    common.show = [...show, circ._fill0, circ._border0];
    common.setContent = `Similarly, the outside |border_| of |all triangles| is |${leastSides}| |base| lengths.`;

    this.addEqnStep(circ.eqns.triRectEqn, ['1', '0'], ['1', '0'], common);

    common.setInfo = [
      'Touch |border| to highlight the border.',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |b| in either equation to highlight the triangle base.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.setContent = `Similarly, the outside |border| of |all triangles| is |${leastSides}| |base| lengths.`;
    common.setSteadyState = () => {
      circ.setScenario(circ, layout.collection.scenarios.left);
      circ.eqns.borderEqn.showForm('0', '0');
    };
    this.addEqnStep(circ.eqns.triRectEqn, ['1', '0'], ['1', '0'], common);


    common.setContent = 'The last terms of the |area| equation can be seen as the |border| and so the equation can be rearranged.';
    this.addEqnsStep([
      [circ.eqns.triRectEqn, ['1', '0'], ['1', '0']],
      [circ.eqns.borderEqn, '0', '0'],
    ], common);
    common.setInfo = [
      'Touch |border| to highlight the border.',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |b| in either equation to highlight the triangle base.',
      'Touch |border| in either equation to highlight the triangle base.',
    ];
    this.addEqnsStep([
      [circ.eqns.triRectEqn, ['1', '0'], ['2', '0']],
      [circ.eqns.borderEqn, '0', '0'],
    ], common);
    common.setInfo = [
      'Touch |border| to highlight the border.',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |b| in the equation to highlight the triangle base.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    this.addEqnsStep([
      [circ.eqns.triRectEqn, ['2', '0'], '3'],
      [circ.eqns.borderEqn, '0', '0'],
    ], common);


    common.setInfo = [
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.setSteadyState = () => {
      circ.setScenario(circ, layout.collection.scenarios.left);
    };
    show = [
      circ._backgroundCircle, circ._lines0, circ._poly0,
      circ._tri0._height,
    ];
    common.show = [...show, circ._fill0, circ._border0];
    common.setContent = 'The |area| of the |triangles|, is a rough |approximation| of the |circle area|.';
    this.addEqnStep(circ.eqns.triRectEqn, '3', '3', common);


    common.setInfo = [
      'Touch |border| to highlight the border.',
      'Touch |circumference| to highlight the circle\'s circumference.',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.setContent = 'The |border| of the |triangles|, is a rough |approximation| of the circle |circumference|.';
    this.addEqnStep(circ.eqns.triRectEqn, '3', '3', common);

    common.setInfo = [
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.setContent = 'Now, what happens when we |increase| the number of triangles?';
    this.addEqnStep(circ.eqns.triRectEqn, '3', '3', common, { title: 'Refine Approximation' });

    common.setInfo = [
      `Touch |${leastSides}_|, |${midSides}_| or |${mostSides}_| to change the number of triangles.`,
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.infoModifiers[`${leastSides}_`] = highlight(colors.diagram.action);
    common.infoModifiers[`${midSides}_`] = highlight(colors.diagram.action);
    common.infoModifiers[`${mostSides}_`] = highlight(colors.diagram.action);
    common.modifiers[`${leastSides}_`] = click(circ.selectorClicked, [circ, leastSides.toString()], colors.diagram.action);
    common.modifiers[`${midSides}_`] = click(circ.selectorClicked, [circ, midSides.toString()], colors.diagram.action);
    common.modifiers[`${mostSides}_`] = click(circ.selectorClicked, [circ, mostSides.toString()], colors.diagram.action);
    common.setContent = `Examine |${leastSides}_|, |${midSides}_| and |${mostSides}_| triangles to see how the approximations change.`;
    common.show = [...show, circ._fill0, circ._border0];
    common.setEnterState = () => {
      circ.setScenario(circ, layout.collection.scenarios.left);
      // circ._selector.selector.select(leastSides.toString());
      circ.rotateArea(leastSides, 0);
    };
    this.addEqnStep(circ.eqns.triRectEqn, '3', '3', common);

    common.setInfo = [
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |h| in the equation to highlight the triangle height.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.setContent = 'As the number of triangles is |increased| the |area appoximation| becomes |better|.';
    common.showOnly = [circ, circ._tri2];
    show = [
      circ._backgroundCircle, circ._lines2, circ._poly2,
      circ._tri2._height, circ._fill2, circ._border2,
    ];
    common.show = [...show];
    common.setEnterState = () => {
      circ.setScenario(circ, layout.collection.scenarios.left);
      // circ._selector.selector.select(mostSides.toString());
      circ.rotateArea(leastSides, 0);
    };
    this.addEqnStep(circ.eqns.triRectEqn, '3', '3', common);
    this.addEqnStep(circ.eqns.triRectEqn, '3', '4', common);


    common.setContent = 'Also the |height| gets closer to the circle\'s |radius| length.';
    this.addEqnStep(circ.eqns.triRectEqn, '4', '4', common);
    common.setInfo = [
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |r| in the equation to highlight the circle\'s radius.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    this.addEqnStep(circ.eqns.triRectEqn, '4', '5', common);
    common.show = [
      circ._backgroundCircle, circ._lines2, circ._poly2,
      circ._fill2,
      circ._border2,
      circ._radius,
    ];
    this.addEqnStep(circ.eqns.triRectEqn, '5', '6', common);

    common.setInfo = [
      'Touch |border| to highlight the border.',
      'Touch |circumference| to highlight the circle\'s circumference.',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |r| in the equation to highlight the circle\'s radius.',
      'Touch |border| in the equation to highlight the triangle base.',
    ];
    common.setContent = 'And the outside |border| gets closer to the circle |circumference| which is |2πr|.';
    this.addEqnStep(circ.eqns.triRectEqn, '6', '6', common);
    this.addEqnStep(circ.eqns.triRectEqn, '6', '7', common);
    common.setInfo = [
      'Touch |border| to highlight the border.',
      'Touch |circumference| to highlight the circle\'s circumference.',
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |r| in the equation to highlight the circle\'s radius.',
    ];
    this.addEqnStep(circ.eqns.triRectEqn, '7', '8', common);

    common.setInfo = [
      'Touch |Area| in the equation to toggle the area fill.',
      'Touch |r| in the equation to highlight the circle\'s radius.',
    ];
    common.setContent = 'We can now simplify the equation.';
    this.addEqnStep(circ.eqns.triRectEqn, '8', '8', common);
    this.addEqnStep(circ.eqns.triRectEqn, '8', '9', common);
    this.addEqnStep(circ.eqns.triRectEqn, '9', '10', common);
    this.addEqnStep(circ.eqns.triRectEqn, '10', '11', common);
    this.addEqnStep(circ.eqns.triRectEqn, '11', '12', common);
    this.addEqnStep(circ.eqns.triRectEqn, '12', '13', common);


    common.show = [
      circ._circle, circ._radius,
    ];
    common.setContent = 'So we have found the |area of a circle| and can see it is related to its |radius|.';
    this.addSection(common, {
      title: 'Area',
      content: 'So we can see the |area of a circle| is related to its |radius|.',
      transitionFromPrev: (done) => {
        circ.eqns.triRectEqn.showForm('14');
        circ.moveToScenario(circ._radius, { rotation: 0 }, 0.5, done);
      },
      setSteadyState: () => {
        circ.eqns.triRectEqn.showForm('14');
        circ.setScenario(circ, layout.collection.scenarios.left);
        circ.setScenario(circ._radius, { rotation: 0 });
      },
      setLeaveState: () => {
        circ._radius.transform.updateRotation(layout.circle.radiusLine.angle);
      },
    });
  }
}

export default Content;
