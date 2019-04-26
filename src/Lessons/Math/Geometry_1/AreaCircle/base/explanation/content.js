// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  style,
  click,
  centerV,
  highlight,
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
      'triangle_area/base',
      'congruent_triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const grid = fig._grid;
    const circle = fig._circle;
    const poly = fig._poly;
    const polyFill = fig._polyFill;
    const lightCircle = fig._lightCircle;
    const tri = fig._tri;
    const eqn = coll._eqn;
    const circleFill = fig._circleFill;

    const leastSides = layout.polygonSides[0];
    const moreSides = layout.polygonSides[1];
    const mostSides = layout.polygonSides[2];

    let common = { setSteadyState: () => { fig.setScenario('center'); } };
    this.addSection(common, {
      title: 'Introduction',
      setContent: 'The |area of a circle| can seem challenging to find as its |edge is curved| and doesn\'t align with straight lines.',
      show: [grid, circle],
    });
    this.addSection(common, {
      setContent: 'However, |we can do it| if we start by making an |approximation| of a circle, that we then |refine| later.',
      show: [grid, circle],
    });

    let content = {
      setContent: `Start by splitting the circle into |equal| pieces, for example we will use |${leastSides}|.`,
    };
    this.addSection(common, content, {
      show: [circle],
    });
    this.addSection(common, content, {
      show: [circle, poly._lines],
    });

    content = {
      setContent: [
        `Connect the ends of each line to form |${leastSides} equal triangles|, which is where we will focus.`,
        style({ top: 48, size: 0.6 }, 'Each line is the same length (radius) and each angle at the circle center the same size (equal split), so using |Side-Angle-Side| shows the resulting triangles are congruent.'),
      ],
      modifiers: {
        'Side-Angle-Side': this.bindShowQR('congruent_triangles/base', 'Sas'),
      },
    };
    this.addSection(common, content, {
      show: [circle, poly._lines],
    });
    this.addSection(common, content, {
      show: [circle, poly._lines, poly._border],
    });
    this.addSection(common, content, {
      show: [lightCircle, poly._lines, poly._border],
    });

    content = {
      setContent: '|Each| triangle has the same |height| and |base|.',
    };
    this.addSection(common, content, {
      modifiers: {
        Each: this.bindNext(colors.diagram.action),
      },
      show: [lightCircle, poly._lines, poly._border],
    });
    this.addSection(common, content, {
      modifiers: {
        Each: click(coll.toggleTri, [coll, null], colors.diagram.action),
      },
      show: [lightCircle, poly._lines, poly._border, tri._height, tri._base],
    });

    content = {
      setContent: 'And therefore |each| triangle has the same |area|.',
    };
    this.addSection(common, content, {
      modifiers: {
        each: click(coll.toggleTri, [coll, null], colors.diagram.action),
      },
      show: [lightCircle, poly._lines, poly._border, tri._height, tri._base],
    });
    this.addSection(common, content, {
      modifiers: {
        each: click(coll.toggleTri, [coll, null], colors.diagram.action),
      },
      show: [
        lightCircle, poly._lines, poly._border, tri._height, tri._base,
      ],
      transitionFromPrev: (done) => {
        fig.animations.cancelAll();
        fig.animations.new()
          .scenario({ target: 'left', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.showForm('0');
        eqn.setScenario('right');
        tri._fill.show();
      },
    });

    common = {
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
      },
    };
    content = {
      setContent: `The |area| of |all triangles| is then |${leastSides} | times the area of |one triangle|.`,
    };
    this.addSectionEqnStep({ eqn, from: '0', to: '0' }, common, content, {
      show: [
        lightCircle, poly._lines, poly._border, tri._height, tri._base,
        tri._fill,
      ],
    });
    this.addSectionEqnStep({ eqn, from: '0', to: '1' }, common, content, {
      show: [
        lightCircle, poly._lines, poly._border, tri._height, tri._base,
        polyFill,
      ],
    });

    content = {
      setContent: `Similarly, the outside |border| of |all triangles| is |${leastSides}| |base| lengths.`,
    };
    this.addSectionEqnStep({ eqn, from: '1', to: '1' }, common, content, {
      modifiers: {
        border: this.bindNext(colors.border),
        base: highlight(colors.border),
      },
      show: [
        lightCircle, poly._lines, poly._border, tri._height, tri._base,
        polyFill,
      ],
    });
    this.addSectionEqnStep({ eqn, from: '1', to: '1' }, common, content, {
      modifiers: {
        border: click(coll.pulseBorder, [coll], colors.border),
        base: highlight(colors.border),
      },
      show: [
        lightCircle, poly._lines, tri._height, tri._base,
        polyFill, poly._borderHighlight,
      ],
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
        coll.pulseBorder();
      },
    });

    content = {
      setContent: 'The last terms of the |area| equation can be seen as the |border| and so the equation can be rearranged.',
      modifiers: {
        border: click(coll.pulseBorder, [coll], colors.border),
      },
      show: [
        lightCircle, poly._lines, tri._height, tri._base,
        polyFill, poly._borderHighlight,
      ],
    };
    this.addSectionEqnStep({ eqn, from: '1', to: '1' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '1', to: '2' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '2', to: '3' }, common, content, {});

    common = {
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
      },
      show: [
        lightCircle, poly._lines, tri._height, polyFill, poly._borderHighlight,
      ],
    };
    content = {
      setContent: 'The |area| of the |triangles|, is a rough |approximation| of the |circle_area|.',
      modifiers: {
        triangles: click(coll.showTrianglesArea, [coll], colors.areaPolyLabel),
        circle_area: click(coll.showCircleArea, [coll], colors.areaCircleLabel),
      },
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {
    });

    content = {
      setContent: 'The |border| of the |triangles|, is a rough |approximation| of the circle |circumference|.',
      modifiers: {
        border: click(coll.pulseBorder, [coll], colors.border),
        circumference: click(coll.pulseCircumference, [coll], colors.disabledLabel),
      },
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});

    content = {
      setContent: 'Now, what happens when we |increase| the number of triangles?',
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});

    content = {
      setContent: `Examine |_${leastSides}|, |_${moreSides}|, and |_${mostSides}| triangles to see how the approximations change.`,
      modifiers: {},
    };
    content.modifiers[`_${leastSides}`] = click(coll.showLeastSides, [coll], colors.diagram.action);
    content.modifiers[`_${moreSides}`] = click(coll.showMoreSides, [coll], colors.diagram.action);
    content.modifiers[`_${mostSides}`] = click(coll.showMostSides, [coll], colors.diagram.action);
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});

    content = {
      setContent: 'As the number of triangles is |increased| the |area appoximation| becomes |better|.',
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});
  }
}

export default Content;
