// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import { note } from '../../../../../common/tools/note';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  clickW,
  highlight,
  highlightWord,
  // centerV,
} = Fig.tools.html;

// const  { Transform } = Fig;
// const { round } = Fig.tools.math;

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
    this.loadQRs([
      'Math/Geometry_1/AngleTypes/base',
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/AngleGroups/base',
      'Math/Geometry_1/SimilarTriangles/base',
      'Math/Geometry_1/RightAngleTriangles/base',
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/Radians/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const eqn = coll._eqn;
    const tab = coll._table;

    let commonContent = {
      setContent: 'Consider a |right_angle| |triangle| with |hypotenuse_of_1|, and an |angle_of_40º|.',
      modifiers: {
        hypotenuse_of_1: coll.bindAccent(fig._line),
        angle_of_40º: coll.bindAccent(fig._theta),
        right_angle: coll.bindAccent(fig._right),
      },
    };
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
        tab.setScenario('default');
      },
      transitionReset: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
      setSteadyState: () => {
        coll.updateRotation();
      },
      setLeaveState: () => {
        fig._line._line.isTouchable = true;
      },
    };
    let commonShow = {
      show: [
        fig._line, fig._h, fig._hypotenuse,
        fig._v, fig._right,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        [fig._hypotenuse._label, 'real'],
      ],
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Hypotenuse 1, Fixed Angle',
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'If we measure the the |angles| |opposite_side|, we will see it is |0_643|.'),
      modifiers: {
        '0_643': highlightWord('0.643', colors.components),
        angles: clickW('angle\'s', coll.accent, [coll, fig._theta, null, null], colors.angles),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        opposite_side: this.bindNext(colors.components),
      },
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta, fig._hypotenuse,
        fig._right, fig._opp,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, 'real'],
        [fig._theta._label, 'real'],
        [fig._oppLabel._label, 'real'],
      ],
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        opposite_side: coll.bindAccent(fig._opp),
      },
      transitionFromPrev: (done) => {
        coll.accent(fig._opp, done);
      },
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
        // fig._oppLabel._label.showForm('real');
        // console.log(fig._oppLabel)
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'No matter how many different ways we draw this |right angle triangle|, if it has a |40º_angle| and a |hypotenuse_of_1|, then the |opposite| side will |always| be |0_643|.'),
      modifiers: {
        '0_643': highlightWord('0.643', colors.components),
        '40º_angle': coll.bindAccent(fig._theta),
        hypotenuse_of_1: coll.bindAccent(fig._hypotenuse),
        opposite: coll.bindAccent(fig._opp),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'This is because any two triangles with the same |AAS| combination of properties, will be |congruent|. The |right_angle|, |40º_angle| and |hyptoenuse| are an |AAS_combination|.'),
      modifiers: {
        AAS: this.qr('Math/Geometry_1/CongruentTriangles/base/Aas'),
        congruent: this.qr('Math/Geometry_1/CongruentTriangles/base/CongruentTriangles'),
        right_angle: coll.bindAccent(fig._right),
        '40º_angle': coll.bindAccent(fig._theta),
        hyptoenuse: coll.bindAccent(fig._hypotenuse),
        AAS_combination: coll.bindAccent(fig, ['right', 'theta', 'hypotenuse'], colors.diagram.action),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Therefore if we see |any right angle triangle| with a |40º_angle_| and |hypotenuse_of_1|, we will |know| the side length |opposite| the |40º_angle| can |only| be |0_643|.'),
      modifiers: {
        '0_643': highlightWord('0.643', colors.components),
        '40º_angle': highlight(colors.angles),
        '40º_angle_': coll.bindAccent(fig._theta),
        hypotenuse_of_1: coll.bindAccent(fig._line),
        opposite: coll.bindAccent(fig._opp),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Now, if we |change| the length of the hypotenuse but keep the angles the |same|, then the new triangle is |similar| to the |original|.'),
      modifiers: {
        change: click(coll.setLineLength, [coll, null, true, null, true], colors.lines),
        similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
        same: coll.bindAccent(fig, ['theta', 'right']),
        original: click(coll.setLineLength, [coll, layout.r, true, null, true], colors.lines),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
    };
    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'real', 'real'],
          [fig._hypotenuse._label, 'real', 'real'],
        ],
      }, common, commonShow, commonContent,
      {
        title: 'Any Size',
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'As |similar_triangles| have |equally scaled| corresponding sides, then if we |scale the hypotenuse by r|, so the opposite side must also |scale by r|.'),
      modifiers: {
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
    };
    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'real', 'real'],
          [fig._hypotenuse._label, 'real', 'real'],
        ],
      }, common, commonShow, commonContent,
      {
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );
    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'real', 'realTimesR'],
          [fig._hypotenuse._label, 'real', 'realTimesR'],
        ],
      }, common, commonShow, commonContent,
      {
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );
    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'realTimesR', 'realTimesR'],
          [fig._hypotenuse._label, 'realTimesR', 'r'],
        ],
      }, common, commonShow, commonContent,
      {
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Here |r| is the |hypotenuse|, so now if we see |any| right angle triangle with a |40º_angle|, we know the |opposite| side will be |0.643_times_the_hypotenuse|.'),
      modifiers: {
        '40º_angle': coll.bindAccent(fig._theta),
        opposite: coll.bindAccent(fig._opp),
        '0.643_times_the_hypotenuse': coll.bindAccent(fig._oppLabel),
      },
    };

    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'realTimesR', 'realTimesR'],
          [fig._hypotenuse._label, 'r', 'r'],
        ],
      }, common, commonShow, commonContent,
      {
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );

    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'realTimesR', 'realRToHypotenuse'],
          [fig._hypotenuse._label, 'r', 'rToHyp'],
        ],
      }, common, commonShow, commonContent,
      {
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );

    this.addSectionEqnStep(
      {
        eqns: [
          [fig._theta._label, 'real', 'real'],
          [fig._oppLabel._label, 'realRToHypotenuse', 'realRHypotenuse'],
          [fig._hypotenuse._label, 'rToHyp', 'hyp'],
        ],
      }, common, commonShow, commonContent,
      {
        setSteadyState: () => {
          fig._line.setRotation(Math.PI / 18 * 4);
          coll.updateRotation();
          fig._line._line.isTouchable = false;
        },
      },
    );

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Now let\'s consider the |angles| of a right angle triangle more generally.'),
      modifiers: {
        angles: coll.bindAccent(fig, ['theta', 'complement', 'right']),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, fig._complement,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      title: 'Any Angle',
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'All angles in a triangle |add_to_180º|, which means the |two_angles| that are not right angles must be |complementary| and each therefore |less than 90º|.'),
      modifiers: {
        complementary: this.qr('Math/Geometry_1/AngleGroups/base/ComplementaryPres'),
        add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        two_angles: coll.bindAccent(fig, ['theta', 'complement']),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, fig._complement,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'So |all| right angles triangles have one angle that is |90º|, and two angles |less_than_90º|.'),
      modifiers: {
        less_than_90º: coll.bindAccent(fig, ['theta', 'complement']),
        '90º': coll.bindAccent(fig._right),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, fig._complement,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'This means if we |sweep| our angle between 0º and 90º, we will create right angle triangles with |all possible angle combinations|.'),
      modifiers: {
        sweep: click(coll.sweep, [coll], colors.lines),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, fig._complement,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'We can then |measure| the length of the |opposite| side for |different_angles| when the hypotenuse is |1|, and make a |reference_table|.',
      modifiers: {
        different_angles: click(coll.gotoRotation, [coll, null, 1, null], colors.angles),
        opposite: coll.bindAccent(fig._opp),
        reference_table: this.bindNext(colors.diagram.action),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        [fig._oppLabel._label, 'real'],
        [fig._hypotenuse._label, 'real'],
      ],
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Table',
    });

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        [fig._oppLabel._label, 'real'],
        [fig._hypotenuse._label, 'real'],
        // ...coll.tableForm('base'),
        // [tab._sineHeading, 'opp'],
        // [tab._angleHeading, 'angle'],
      ],
    };

    // commonContent = { setContent: [text, tableContent], modifiers };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        // measure: click(coll.measureAngles, [coll, null], colors.components),
        opposite: coll.bindAccent(fig._opp),
        angles: coll.bindAccent(fig._theta),
        reference_table: coll.bindAccent(tab, colors.diagram.action),
      },
      transitionReset: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          fig.setScenario('left');
          coll.resetRotation(done, 0);
        } else if (this.comingFrom === 'next') {
          fig.setScenario('left');
          coll.resetRotation(done, 0.8);
        } else {
          fig.setScenario('default');
          coll.resetRotation(done, 0.8);
        }
      },
      transitionFromPrev: (done) => {
        fig.animations.new()
          .scenario({ target: 'left', duration: 2 })
          .trigger({
            callback: () => {
              tab.showAll();
              coll.showTableForms('angle', 'opp', 'base');
              coll.accent(tab);
              // tab.pulseScaleNow(1, 1.15);
            },
            duration: 1,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig.setScenario('left');
        tab.showAll();
        coll.showTableForms('angle', 'opp', 'base');
      },
      fadeInFromPrev: false,
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        fig.setScenario('left');
        eqn.setScenario('left');
        tab.setScenario('default');
      },
      transitionReset: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
      setSteadyState: () => {
        coll.updateRotation();
      },
      setLeaveState: () => {
        fig._line._line.isTouchable = true;
      },
    };

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, tab,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        [fig._oppLabel._label, 'real'],
        [fig._hypotenuse._label, 'real'],
        ...coll.tableForm('base'),
        [tab._sineHeading, 'opp'],
        [tab._angleHeading, 'angle'],
      ],
    };

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Now, let\'s make this a |mathematical expression|.'),
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Mathematical Expression',
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'We can see from |rotating| the hypotenuse, or looking at the |table|, that the opposite side length is |dependent on|, or |a function of| the angle.'),
      modifiers: {
        table: coll.bindAccent(tab, colors.diagram.action),
        rotating: click(coll.gotoRotation, [coll, null, 1, null], colors.lines),
      },
    };
    this.addSection(common, commonShow, commonContent);

    this.addSection(common, commonShow, commonContent, {
      transitionFromPrev: (done) => {
        eqn.setScenario('left');
        eqn.showForm('base');
        coll.accent(eqn, done);
      },
      setSteadyState: () => {
        eqn.setScenario('left');
        eqn.showForm('base');
      },
    });

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, tab,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        [fig._oppLabel._label, 'real'],
        [fig._hypotenuse._label, 'real'],
        ...coll.tableForm('base'),
        [eqn, 'base'],
        [tab._sineHeading, 'opp'],
        [tab._angleHeading, 'angle'],
      ],
    };

    this.addSectionEqnStep({
      eqns: [[tab._sineHeading, 'opp', 'oppToFunc']],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        tab._sineHeading.showForm('oppToFunc');
      },
    });

    this.addSectionEqnStep({
      eqns: [[tab._sineHeading, 'oppToFunc', 'func']],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        tab._sineHeading.showForm('func');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Now, when we |scale the hypotenuse by r| and keep the |same angles|, the mathematical expression also |scales by r| as the triangles are |similar|.'),
      modifiers: {
        similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
    };
    this.addSectionEqnStep({
      eqns: [[tab._sineHeading, 'func', 'func']],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        tab._sineHeading.showForm('func');
      },
    });

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, tab,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        // [fig._oppLabel._label, 'real'],
        // [fig._hypotenuse._label, 'real'],
        ...coll.tableForm('base'),
        [tab._sineHeading, 'func'],
        [tab._angleHeading, 'angle'],
        // [eqn, 'base'],
      ],
    };

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'base', 'baseTimesR'],
        [fig._oppLabel._label, 'real', 'realTimesR'],
        [fig._hypotenuse._label, 'real', 'realTimesR'],
      ],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('baseTimesR');
        fig._oppLabel._label.showForm('realTimesR');
        fig._hypotenuse._label.showForm('realTimesR');
      },
    });

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'baseTimesR', 'baseTimesRToHypR'],
        [fig._oppLabel._label, 'realTimesR', 'realTimesR'],
        [fig._hypotenuse._label, 'realTimesR', 'realTimesR'],
      ],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('baseTimesRToHypR');
        fig._oppLabel._label.showForm('realTimesR');
        fig._hypotenuse._label.showForm('realTimesR');
      },
    });

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'baseTimesRToHypR', 'hypR'],
        [fig._oppLabel._label, 'realTimesR', 'realTimesR'],
        [fig._hypotenuse._label, 'realTimesR', 'r'],
      ],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('hypR');
        fig._oppLabel._label.showForm('realTimesR');
        fig._hypotenuse._label.showForm('r');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'As |r| is the |hypotenuse| we can now |generalize| the expression.'),
    };
    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, tab,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        ...coll.tableForm('base'),
        [tab._sineHeading, 'func'],
        [tab._angleHeading, 'angle'],
      ],
    };

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'hypR', 'hypR'],
        [fig._oppLabel._label, 'realTimesR', 'realTimesR'],
        [fig._hypotenuse._label, 'r', 'r'],
      ],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('hypRTohypRGeneral');
        fig._oppLabel._label.showForm('realTimesR');
        fig._hypotenuse._label.showForm('r');
      },
    });

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'hypR', 'hypRToGeneral'],
        [fig._oppLabel._label, 'realTimesR', 'realRToOpposite'],
        [fig._hypotenuse._label, 'r', 'rToHyp'],
      ],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('hypRToGeneral');
        fig._oppLabel._label.showForm('realRToOpposite');
        fig._hypotenuse._label.showForm('rToHyp');
      },
    });

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'hypRToGeneral', 'general'],
        [fig._oppLabel._label, 'realRToOpposite', 'opposite'],
        [fig._hypotenuse._label, 'rToHyp', 'hyp'],
      ],
      duration: 2,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('general');
        fig._oppLabel._label.showForm('opposite');
        fig._hypotenuse._label.showForm('hyp');
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'The name we use for this function today is |sine| which is often abbreviated to |sin|.'),
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp, tab,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        ...coll.tableForm('base'),
        // [tab._sineHeading, 'func'],
        [tab._angleHeading, 'angle'],
        // [eqn, 'general'],
        [fig._oppLabel._label, 'opposite'],
        [fig._hypotenuse._label, 'hyp'],
      ],
    };

    this.addSectionEqnStep({
      title: 'Sine',
      eqns: [
        [eqn, 'general', 'general'],
        [tab._sineHeading, 'func', 'func'],
      ],
      duration: 2,
    }, common, commonShow, commonContent);

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'general', 'generalToSin'],
        [tab._sineHeading, 'func', 'funcToSin'],
      ],
      duration: 2,
    }, common, commonShow, commonContent);

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'generalToSin', 'sin'],
        [tab._sineHeading, 'funcToSin', 'sin'],
      ],
      duration: 2,
    }, common, commonShow, commonContent);

    commonContent = {
      setContent: [
        style({}, 'The word |sine| originates from the word for |bowstring|.'),
      ],
    };
    this.addSectionEqnStep({
      eqns: [
        [eqn, 'sin', 'sin'],
        [tab._sineHeading, 'sin', 'sin'],
      ],
      duration: 2,
    }, common, commonShow, commonContent);
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    const pulseBowString = () => {
      fig._arc.pulseThickNow(1, 1.02, 8);
      fig._mirrorArc.pulseThickNow(1, 1.02, 8);
      coll.accent({
        element: fig, children: ['opp', 'mirrorV', 'arc', 'mirrorArc'], style: ['highlight'],
      });
      coll.accent({
        element: fig, children: ['opp', 'mirrorV'], style: ['pulse'],
      });
    };
    const pulseChord = () => {
      fig._h.hide();
      fig._right.hide();
      coll.accent({
        element: fig, children: ['opp', 'mirrorV'], style: ['highlight', 'pulse'],
      });
    };

    const pulseRightAngle = () => {
      fig._h.showAll();
      fig._right.showAll();
      coll.updateRotation();
      coll.accent({
        element: fig, children: ['h', 'right', 'line', 'opp'], style: ['highlight', 'pulse'],
      });
    };

    const pulseSine = () => {
      fig._h.hide();
      fig._right.hide();
      coll.accent({
        element: fig, children: ['opp'], style: ['highlight', 'pulse'],
      });
    };

    commonContent = {
      setContent: [
        style({}, 'The word |sine| originates from the word for |bowstring|.'),
        note({ top: 62, size: 0.9 }, 'A |right_angle_triangle| and cirlce are closely related. |Ancient_Greeks| called the line between two points on a circle a |khordḗ| (chord or string of a |bow|). The |sine_function| was first named in |Sanskrit| as |ardha-jya| (half chord) or |jya| (chord). This was translated into |Arabic| as |jiba|, which was then confused with |jaib| (meaning bay or bossom) when it was translated into |Latin| as |sinus| (bay or bossom). Our term |sine| comes from |sinus|.'),
      ],
      modifiers: {
        'khordḗ': click(pulseChord, [this], colors.components),
        'right_angle_triangle': click(pulseRightAngle, [this], colors.components),
        bow: click(pulseBowString, [this], colors.components),
        sine_function: click(pulseSine, [this], colors.components),
        Ancient_Greeks: highlight(colors.diagram.text.greek),
        Sanskrit: highlight(colors.diagram.text.sanskrit),
        Arabic: highlight(colors.diagram.text.arabic),
        Latin: highlight(colors.diagram.text.latin),
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
      setEqnForms: [
        [fig._theta._label, 'real'],
        [eqn, 'sin'],
        [fig._oppLabel._label, 'opposite'],
        [fig._hypotenuse._label, 'hyp'],
      ],
    };

    this.addSection(common, commonContent, commonShow, {
      transitionFromPrev: (done) => {
        const notes = document.querySelectorAll('.presentation__note');
        notes.forEach((n) => {
          n.classList.add('angle_table_hide');
        });
        fig.animations.new()
          .inParallel([
            fig._oppLabel.anim.dissolveOut({ duration: 1 }),
            fig._theta.anim.dissolveOut({ duration: 1 }),
            fig._hypotenuse.anim.dissolveOut({ duration: 1 }),
            fig._right.anim.dissolveOut({ duration: 1 }),
          ])
          .scenario({ target: 'small', duration: 2 })
          .trigger({
            callback: () => {
              fig._mirrorLine.showAll();
              fig._mirrorArc.showAll();
              fig._mirrorV.showAll();
              fig._arc.showAll();
              fig._mirrorLine.dim();
              fig._circle.dim();
              coll.updateRotation();
            },
          })
          .inParallel([
            fig._line.anim.dim({ duration: 1 }),
            fig._circle.anim.dissolveIn({ duration: 1 }),
            fig._arc.anim.dissolveIn({ duration: 1 }),
            fig._mirrorV.anim.dissolveIn({ duration: 1 }),
            fig._mirrorArc.anim.dissolveIn({ duration: 1 }),
            fig._mirrorLine.anim.dissolveIn({ duration: 1 }),
            fig._x.anim.dissolveIn({ duration: 1 }),
            fig._h.anim.dissolveOut({ duration: 1 }),
          ])
          .trigger({
            callback: () => {
              notes.forEach((n) => {
                n.classList.remove('angle_table_hide');
                n.classList.add('topic__diagram_text_fade_in');
              });
            },
            duration: 0.5,
          })
          .whenFinished(done)
          .start();
        eqn.animations.new()
          .dissolveOut(1)
          .start();
      },
      setSteadyState: () => {
        fig._circle.showAll();
        fig.setScenario('small');
        fig._arc.showAll();
        fig._mirrorLine.showAll();
        fig._mirrorArc.showAll();
        fig._mirrorV.showAll();
        fig._x.showAll();
        fig._h.hide();
        // fig._opp.hide();
        fig._right.hide();
        fig._theta.hide();
        fig._hypotenuse.hide();
        fig._oppLabel.hide();
        eqn.hide();
        coll.accent({
          element: fig,
          children: [
            'opp',
            'mirrorV',
            'arc',
            'mirrorArc',
          ],
          style: 'highlight',
        });
        coll.updateRotation();
      },
      blankTransition: {
        toNext: true,
      },
      transitionToNextSkip: (done) => {
        const notes = document.querySelectorAll('.presentation__note');
        notes.forEach((n) => {
          n.classList.add('angle_table_hide');
        });
        fig.animations.new()
          .inParallel([
            fig._mirrorV.anim.dissolveOut({ duration: 1 }),
            fig._mirrorArc.anim.dissolveOut({ duration: 1 }),
            fig._mirrorLine.anim.dissolveOut({ duration: 1 }),
            fig._x.anim.dissolveOut({ duration: 1 }),
            fig._arc.anim.dissolveOut({ duration: 1 }),
            fig._circle.anim.dissolveOut({ duration: 1 }),
            fig._line.anim.undim({ duration: 1 }),
            fig._opp.anim.undim({ duration: 1 }),
            fig._h.anim.dissolveIn({ duration: 1 }),
            fig._h.anim.undim({ duration: 0 }),
          ])
          .scenario({ target: 'left', duration: 2 })
          .inParallel([
            fig._oppLabel.anim.dissolveIn({ duration: 1 }),
            fig._theta.anim.dissolveIn({ duration: 1 }),
            fig._hypotenuse.anim.dissolveIn({ duration: 1 }),
            fig._right.anim.dissolveIn({ duration: 1 }),
            fig.anim.trigger({
              callback: () => {
                fig.undim();
                fig._theta._label.showForm('angle');
                fig._hypotenuse._label.showForm('hyp');
                fig._oppLabel._label.showForm('opposite');
                coll.updateRotation();
              },
            }),
            eqn.anim.dissolveIn({ duration: 1 }),
            fig.anim.trigger({
              callback: () => {
                eqn.setScenario('left');
                eqn.showForm('sin');
              },
            }),
          ])
          .whenFinished(done)
          .start();
      },
      setLeaveState: () => {
        coll.undim();
      },
      fadeInFromPrev: false,
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'Now, we constructed the |table| of sine values by |measuring| the opposite sides of right angle triangles with hypotenuse 1. Over |millennia| however, increasingly |accurate| ways have been found to do this.'),
      modifiers: {
        table: coll.bindAccent(tab, colors.diagram.action),
      },
    };

    commonShow = {
      show: [
        tab,
      ],
      setEqnForms: [
        ...coll.tableForm('base'),
        [tab._sineHeading, 'sin'],
        [tab._angleHeading, 'angle'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      title: 'History',
      modifiers: {
        table: coll.bindAccent(tab, colors.diagram.action),
      },
      setSteadyState: () => {
        tab.setScenario('center');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'In the |first century| CE, |geometry| was used to calculate the opposite side length for a selection of angles. These calculations were difficult and somewhat limited, but sufficient for many applications.'),
      modifiers: {
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        tab.setScenario('center');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'It was not until |1400 CE| that a mathematical |formula| was found that exactly represented the sine function.'),
        // note({ top: 90 }, 'Note: for |angle| in |radians|.'),
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        formula: this.bindNext(),
      },
      setSteadyState: () => {
        tab.setScenario('center');
      },
    });

    this.addSection(common, commonShow, commonContent, {
      title: 'Sine Formula',
      setContent: [
        style({}, 'It was not until |1400 CE| that a mathematical |formula| was found that exactly represented the sine function.'),
        note({ top: 90 }, 'For |angle| in |radians|.'),
      ],
      modifiers: {
        formula: coll.bindAccent(coll._powerSeries, colors.diagram.action),
        angle: highlight(colors.angles),
        radians: this.qr('Math/Geometry_1/Radians/base/Main'),
      },
      transitionFromPrev: (done) => {
        tab.setScenario('center');
        coll.animations.new()
          .dissolveOut({ element: tab, duration: 0.5 })
          .trigger({
            callback: () => {
              coll._powerSeries.showForm('base');
              coll.accent(coll._powerSeries);
            },
            duration: 1,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        tab.setScenario('high');
        tab.hide();
        coll._powerSeries.showForm('base');
      },
      fadeInFromPrev: false,
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'However, calculating sine with this formula is still |complex without a computer|. Consequently |tables| were used for many applications up until the |late 20th century CE|, when calculators and computers replaced them.'),
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        tab.setScenario('high');
        tab.hide();
        coll._powerSeries.showForm('base');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'In |all| right angle triangles, the |sine_function| relates an |angle|, the |opposite_side| to the angle and the |hypotenuse|.'),
      modifiers: {
        opposite_side: coll.bindAccent({
          element: coll,
          children: ['fig.opp', 'fig.oppLabel.label', 'eqn.opp'],
          scale: 1.4,
        }),
        angle: coll.bindAccent({
          element: coll,
          children: ['fig.theta', 'eqn.angle'],
          scale: 1.4,
        }),
        hypotenuse: coll.bindAccent({
          element: coll,
          children: ['fig.line', 'fig.hypotenuse.label', 'eqn.hyp'],
          scale: 1.4,
        }),
        sine_function: coll.bindAccent({
          element: eqn,
          children: ['sin', 'lb', 'rb', 'angle'],
          scale: 1.4,
          centerOn: 'lb',
          color: colors.diagram.action,
        }),
      },
    };

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        // fig.setScenario('default');
        // eqn.setScenario('default');
        // tab.setScenario('default');
      },
      transitionReset: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
      setSteadyState: () => {
        coll.updateRotation();
      },
      setLeaveState: () => {
        fig._line._line.isTouchable = true;
      },
    };

    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
      setEqnForms: [
        [fig._theta._label, 'angle'],
        [eqn, 'sin'],
        [fig._oppLabel._label, 'opposite'],
        [fig._hypotenuse._label, 'hyp'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      title: 'Summary',
      setSteadyState: () => {
        coll.setScenarios('default');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Often this relationship is |rearranged| to show the |sine_function| is equal to the |ratio| of the |opposite_side| and |hypotenuse|.'),
      modifiers: {
        // opposite_side: click(() => {
        //   const p = eqn._opp.getPositionInBounds('diagram', 'center', 'middle');
        //   eqn._opp.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   const p2 = fig._oppLabel._label.getPositionInBounds('diagram', 'center', 'middle');
        //   fig._oppLabel._label.pulseScaleRelativeToPoint(p2, 'diagram', 1, 1.3);
        //   coll.accent(fig._opp);
        //   this.diagram.animateNextFrame();
        // }, [this], colors.components),
        // angle: click(() => {
        //   const p = eqn._angle.getPositionInBounds('diagram', 'center', 'middle');
        //   eqn._angle.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   coll.accent(fig._theta);
        //   this.diagram.animateNextFrame();
        // }, [this], colors.angles),
        // hypotenuse: click(() => {
        //   const p = eqn._hyp.getPositionInBounds('diagram', 'center', 'middle');
        //   eqn._hyp.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   const p2 = fig._hypotenuse._label.getPositionInBounds('diagram', 'center', 'middle');
        //   fig._hypotenuse._label.pulseScaleRelativeToPoint(p2, 'diagram', 1, 1.3);
        //   coll.accent(fig._line);
        //   this.diagram.animateNextFrame();
        // }, [this], colors.lines),
        // sine_function: click(() => {
        //   const p = eqn._lb.getPositionInBounds('diagram', 'center', 'middle');
        //   eqn._sin.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   eqn._lb.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   eqn._rb.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   eqn._angle.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        //   this.diagram.animateNextFrame();
        // }, [this], colors.diagram.action),
        opposite_side: coll.bindAccent({
          element: coll,
          children: ['fig.opp', 'fig.oppLabel.label', 'eqn.opp'],
          scale: 1.4,
        }),
        // angle: coll.bindAccent({
        //   element: coll,
        //   children: ['fig.theta', 'eqn.angle'],
        //   scale: 1.4,
        // }),
        hypotenuse: coll.bindAccent({
          element: coll,
          children: ['fig.line', 'fig.hypotenuse.label', 'eqn.hyp'],
          scale: 1.4,
        }),
        sine_function: coll.bindAccent({
          element: eqn,
          children: ['sin', 'lb', 'rb', 'angle'],
          scale: 1.4,
          centerOn: 'lb',
          color: colors.diagram.action,
        }),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        coll.setScenarios('default');
      },
    });

    this.addSectionEqnStep({
      eqns: [
        [eqn, 'sin', 'sinLeft'],
      ],
      duration: 3,
    }, common, commonShow, commonContent, {
      setSteadyState: () => {
        coll.setScenarios('default');
        eqn.showForm('sinLeft');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'This |relationship| |leads| to many other relationships between sides and angles in |triangles| and |circles|. |Trigonometry| explores many of these relationships.'),
      modifiers: {
        // relationship: click(() => {
        //   coll._box1.showAll();
        //   coll._box1.surround(eqn, ['opp', 'rb'], 0.08);
        //   coll.accent(coll._box1);
        // }, [this], colors.diagram.action),
        relationship: coll.bindAccent(eqn, colors.diagram.action),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        coll.setScenarios('default');
        eqn.showForm('sinLeft');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'If you need to find the |value| of the |sine_function| for a given |angle|, you can use a |table_of_sines|, |calculator| or |computer|.'),
      modifiers: {
        angle: highlight(colors.angles),
        table_of_sines: click(() => {
          const p = tab.getPositionInBounds('diagram', 'center', 'middle');
          tab.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.2);
          this.diagram.animateNextFrame();
        }, [this], colors.diagram.action),
        sine_function: coll.bindAccent({
          element: tab._sineHeading,
          children: ['sin', 'lb', 'rb', 'angle'],
          centerOn: 'angle',
          x: 0.2,
          scale: 1.4,
        }, colors.diagram.action),
      },
    };

    this.addSection(common, commonContent, {
      show: [tab],
      setEqnForms: [
        ...coll.tableForm('base'),
        [tab._sineHeading, 'sin'],
        [tab._angleHeading, 'angle'],
      ],
      setSteadyState: () => {
        tab.setScenario('center');
      },
    });
  }
}

export default Content;
