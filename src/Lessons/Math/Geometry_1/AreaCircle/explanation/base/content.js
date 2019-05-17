// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  style,
  click,
  clickW,
  highlight,
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
      'AreaTriangle/base',
      'CongruentTriangles/base',
      'Circle/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const grid = fig._grid;
    const circle = fig._circle;
    const poly = fig._poly;
    const polyMost = fig._polyMost;
    const lightCircle = fig._lightCircle;
    const eqn = coll._eqn;

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
      title: 'Approximation',
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
        'Side-Angle-Side': this.bindShowQR('CongruentTriangles/base', 'Sas'),
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
      show: [lightCircle, poly._lines, poly._border, poly._height, poly._base],
    });

    content = {
      setContent: 'And therefore |each| triangle has the same |area|.',
    };
    this.addSection(common, content, {
      modifiers: {
        each: click(coll.toggleTri, [coll, null], colors.diagram.action),
        area: this.bindShowQR('AreaTriangle/base', 'Main', colors.areaTriLabel),
      },
      show: [lightCircle, poly._lines, poly._border, poly._height, poly._base],
    });
    this.addSection(common, content, {
      modifiers: {
        each: click(coll.toggleTri, [coll, null], colors.diagram.action),
        area: this.bindShowQR('AreaTriangle/base', 'Main', colors.areaTriLabel),
      },
      show: [
        lightCircle, poly._lines, poly._border, poly._height, poly._base,
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
        poly._triFill.show();
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
        lightCircle, poly._lines, poly._border, poly._height, poly._base,
        poly._triFill,
      ],
    });
    this.addSectionEqnStep({ eqn, from: '0', to: '1' }, common, content, {
      show: [
        lightCircle, poly._lines, poly._border, poly._height, poly._base,
        poly._fill,
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
        lightCircle, poly._lines, poly._border, poly._height, poly._base,
        poly._fill,
      ],
    });
    this.addSectionEqnStep({ eqn, from: '1', to: '1' }, common, content, {
      modifiers: {
        border: click(coll.pulseBorder, [coll], colors.border),
        base: highlight(colors.border),
      },
      show: [
        lightCircle, poly._lines, poly._height, poly._base,
        poly._fill, poly._borderHighlight,
      ],
      transitionFromPrev: (done) => {
        fig._poly._borderHighlight.pulseThickNow(1, 1.03, 7, done);
      },
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
      },
    });

    content = {
      setContent: 'The last terms of the |area| equation can be seen as the |border| and so the equation can be rearranged.',
      modifiers: {
        border: click(coll.pulseBorder, [coll], colors.border),
      },
      show: [
        lightCircle, poly._lines, poly._height, poly._base,
        poly._fill, poly._borderHighlight,
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
        lightCircle, poly._lines, poly._height, poly._fill, poly._borderHighlight,
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
      title: 'Refine Approximation',
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


    common = {
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
      },
      show: [
        lightCircle, polyMost._lines, polyMost._height, polyMost._fill, polyMost._borderHighlight,
      ],
    };
    content = {
      setContent: 'As the number of triangles is |increased| the |area appoximation| becomes |better|.',
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '3', to: '4' }, common, content, {});

    content = {
      setContent: 'Also the |height| gets closer to the circle\'s |radius| length.',
      modifiers: {
        height: highlight(colors.height),
        radius: highlight(colors.radius),
      },
    };
    this.addSectionEqnStep({ eqn, from: '4', to: '4' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '4', to: '5' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '5', to: '6' }, common, content, {
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
        polyMost._radius.setScenario('height');
        polyMost._radius.updateLabel(polyMost._radius.getRotation() + polyMost.getRotation());
        polyMost._radius.showAll();
        polyMost._height.hide();
        if (this.comingFrom === 'prev') {
          polyMost._radius._label.pulseScaleNow(1, 2);
        }
      },
    });

    common = {
      show: [
        lightCircle, polyMost._lines, polyMost._radius, polyMost._fill, polyMost._borderHighlight,
      ],
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
        polyMost._radius.setScenario('height');
        polyMost._radius.updateLabel(polyMost._radius.getRotation() + polyMost.getRotation());
      },
    };
    content = {
      setContent: 'And the outside |border| gets closer to the circle\'s |circumference|, |_2pir|.',
      modifiers: {
        border: click(coll.pulseMostBorder, [coll], colors.border),
        circumference: click(coll.pulseCircumference, [coll], colors.disabledLabel),
        _2pir: clickW('2πr', this.showQR, [this, 'Circle/base', 'Circumference'], colors.diagram.action),
      },
    };
    this.addSectionEqnStep({ eqn, from: '6', to: '6' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '6', to: '7' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '7', to: '8' }, common, content, {});

    content = { setContent: 'We can now |simplify| the equation.' };
    this.addSectionEqnStep({ eqn, from: '8', to: '8' }, common, content, {});
    this.addSectionEqnStep({
      eqn, from: '8', to: '9', duration: 1.3,
    }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '9', to: '10' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '10', to: '11' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '11', to: '12' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '12', to: '13' }, common, content, {});

    this.addSection({
      title: 'Area',
      setContent: 'So we have found the |area of a circle| and can see it is related to its |radius|.',
      show: [circle, polyMost._radius],
      transitionFromPrev: (done) => {
        polyMost._radius.animations.cancelAll();
        polyMost._radius.animations.new()
          .scenario({
            target: 'circle',
            duration: 0.4,
            afterFrame: () => {
              polyMost._radius.updateLabel(polyMost._radius.getRotation() + polyMost.getRotation());
            },
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('right');
        eqn.showForm('14');
        polyMost._radius.setScenario('circle');
        polyMost._radius.updateLabel(polyMost._radius.getRotation() + polyMost.getRotation());
      },
    });
    // this.addSectionEqnStep({ eqn, from: '13', to: '14' }, common, content, {});
  }
}

export default Content;
