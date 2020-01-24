// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import { note, hint } from '../../../../../common/tools/note';
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

const  { Transform } = Fig;
const { round } = Fig.tools.math;

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
        AAS_combination: coll.bindAccent(
          fig, ['right', 'theta', 'hypotenuse'], colors.diagram.action,
        ),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 18 * 4);
        coll.updateRotation();
        fig._line._line.isTouchable = false;
      },
    });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({}, 'Therefore |all| right angle triangles with a 40º angle and a hypotenuse of 1 will be |congruent|. This means the |unknown_sides| can have |only one set of values|.'),
    //   modifiers: {
    //     unknown_sides: coll.bindAccent(fig, ['v', 'h']),
    //     congruent: this.qr('Math/Geometry_1/CongruentTriangles/base/CongruentTriangles'),
    //   },
    // };
    // this.addSection(common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig._line.setRotation(Math.PI / 18 * 4);
    //     coll.updateRotation();
    //     fig._line._line.isTouchable = false;
    //   },
    // });


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

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({}, 'Conversely, if we ever see a right angle triangle with a |hypotenuse_of_1|, and |side_length_of_0.643|, we will know the |opposite_angle_is_40º|.'),
    //   modifiers: {
    //     'side_length_of_0.643': coll.bindAccent(fig._opp),
    //     hypotenuse_of_1: coll.bindAccent(fig._line),
    //     opposite_angle_is_40º: coll.bindAccent(fig._theta),
    //   },
    // };

    // this.addSection(common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig._line.setRotation(Math.PI / 18 * 4);
    //     coll.updateRotation();
    //     fig._line._line.isTouchable = false;
    //   },
    // });


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
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({}, 'So, now if we see |any| right angle triangle with a |40º_angle|, we know the |opposite| side will be |0.643_times_the_hypotenuse|.'),
    //   modifiers: {
    //     '40º_angle': coll.bindAccent(fig._theta),
    //     opposite: coll.bindAccent(fig._opp),
    //     '0.643_times_the_hypotenuse': coll.bindAccent(fig._oppLabel),
    //   },
    // };

    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     [fig._oppLabel._label, 'realRHypotenuse'],
    //     [fig._hypotenuse._label, 'hyp'],
    //   ],
    // };

    // this.addSection(common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig._line.setRotation(Math.PI / 18 * 4);
    //     coll.updateRotation();
    //     fig._line._line.isTouchable = false;
    //   },
    // });

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
              tab.pulseScaleNow(1, 1.15);
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
    // commonContent = {
    //   setContent: 'Similarly, if the hypotenuse is scaled by |r|, we can scale the table by |r|.',
    // };
    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     [fig._oppLabel._label, 'real'],
    //     [fig._hypotenuse._label, 'real'],
    //     ...coll.tableForm('base'),
    //     [tab._sineHeading, 'opp'],
    //     [tab._angleHeading, 'angle'],
    //   ],
    // };
    // // commonContent = { setContent: [text, tableContent], modifiers };
    // this.addSection(common, commonShow, commonContent, {
    //   // setSteadyState: () => {
    //   //   fig.setScenario('left');
    //   // },
    //   // fadeInFromPrev: false,
    // });

    // // let [tableContent, modifiers] = makeTable(
    // //   '<span class="angle_text">angle</span>',
    // //   '<span class="component_text">opposite</span>',
    // //   [0, 1, 2, 3, 'dots', 43, 44, 45, 46, 47, 'dots', 90],
    // //   true,
    // // );
    // // commonContent = { setContent: [text, tableContent], modifiers };
    // this.addSectionEqnStep({
    //   eqns: [
    //     [tab._sineHeading, 'opp', 'oppHypR'],
    //     [fig._oppLabel._label, 'real', 'realTimesR'],
    //     [fig._hypotenuse._label, 'real', 'realTimesR'],
    //     ...coll.tableForm('base', 'baseTimesR', false),
    //   ],
    //   duration: 1,
    // }, common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig.setScenario('left');
    //   },
    // });

    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     [fig._oppLabel._label, 'real'],
    //     [fig._hypotenuse._label, 'real'],
    //     ...coll.tableForm('base'),
    //     [tab._sineHeading, 'oppHypR'],
    //     [tab._angleHeading, 'angle'],
    //   ],
    // };

    // this.addSectionEqnStep({
    //   eqns: [
    //     [tab._sineHeading, 'oppHypR', 'oppHypR'],
    //     [fig._oppLabel._label, 'realTimesR', 'realR'],
    //     [fig._hypotenuse._label, 'realTimesR', 'r'],
    //     ...coll.tableForm('baseTimesR', 'baseR', false),
    //   ],
    //   duration: 2,
    //   // animate: 'move',
    // }, common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig.setScenario('left');
    //   },
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: [
    //     'For |any size| right angle triangle, if the |angle| is in the |table|, then we will have an |approximation| of the |opposite_side|.',
    //   ],
    //   modifiers: {
    //     table: coll.bindAccent(tab, colors.diagram.action),
    //     angle: highlight(colors.angles),
    //     opposite_side: highlight(colors.components),
    //   },
    // };
    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     [fig._oppLabel._label, 'realR'],
    //     [fig._hypotenuse._label, 'r'],
    //     ...coll.tableForm('baseR'),
    //     [tab._sineHeading, 'oppHypR'],
    //     [tab._angleHeading, 'angle'],
    //   ],
    // };
    // this.addSection(common, commonShow, commonContent, {
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: [
    //     'For |any size| right angle triangle, if the |angle| is in the |table|, then we will have an |approximation| of the |opposite_side|.',
    //     note({ label: 'Note:', top: 93 }, 'This is only an approximation as the table values are from measurement which is inexact.'),
    //   ],
    //   modifiers: {
    //     table: coll.bindAccent(tab, colors.diagram.action),
    //     angle: highlight(colors.angles),
    //     opposite_side: highlight(colors.components),
    //   },
    // };
    // this.addSection(common, commonShow, commonContent, {
    //   transitionFromPrev: (done) => {
    //     fig.setScenario('left');
    //     const noteLabel = document.querySelector('.presentation__note');
    //     if (noteLabel != null) {
    //       noteLabel.classList.add('topic__diagram_text_pulse');
    //     }
    //     done();
    //   },
    //   fadeInFromPrev: false,
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({ top: 0 }, 'In the |first century CE|, instead of |measuring| the values for the |table|, |geometric techniques| were used to find |precise| side lengths for many different right angle triangles.'),
    // };
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
    // this.addSection(common, commonShow, commonContent, {
    //   modifiers: {
    //     table: coll.bindAccent(tab, colors.diagram.action),
    //   },
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({}, 'While this is a |difficult set of calculations| that limits the number of angles, it is sufficient for |many applications|.'),
    // };
    // this.addSection(common, commonShow, commonContent);

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'Now, let\'s make this a |mathematical expression|.'),
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Mathematical Expression',
    });

    // this.addSectionEqnStep({
    //   eqns: [
    //     [tab._sineHeading, 'oppHypR', 'oppHyp1'],
    //     [fig._oppLabel._label, 'realR', 'real'],
    //     [fig._hypotenuse._label, 'realR', 'real'],
    //     ...coll.tableForm('baseR', 'base', false),
    //   ],
    //   duration: 2,
    // }, common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig.setScenario('left');
    //     fig._oppLabel._label.showForm('real');
    //     fig._hypotenuse._label.showForm('real');
    //     coll.showTableForms('angle', 'oppHyp1', 'base');
    //   },
    // });

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
    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     [fig._oppLabel._label, 'real'],
    //     [fig._hypotenuse._label, 'real'],
    //     ...coll.tableForm('base'),
    //     [tab._sineHeading, 'oppHyp1'],
    //     [tab._angleHeading, 'angle'],
    //   ],
    // };
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

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // commonContent = {
    //   setContent: style({}, 'This |function| is an idealized form of the |table|, where it always provides the |exact| opposite side length for any angle.'),
    //   modifiers: {
    //     // table: click(coll.pulseTable, [coll], colors.diagram.action),
    //     table: click(() => {
    //       coll._box2.showAll();
    //       this.diagram.setFirstTransform();
    //       coll._box2.surround(tab, '', 0.08, 'diagram');
    //       coll.accent(coll._box2);
    //     }, [this], colors.diagram.action),
    //     // function: coll.bindAccent(eqn._func, colors.diagram.action),
    //     function: click(() => {
    //       coll._box1.showAll();
    //       coll._box1.surround(eqn, ['func', 'rb'], 0.08);
    //       coll.accent(coll._box1);
    //     }, [this], colors.diagram.action),
    //   },
    // };
    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     [fig._oppLabel._label, 'real'],
    //     [fig._hypotenuse._label, 'real'],
    //     ...coll.tableForm('base'),
    //     [tab._sineHeading, 'oppHyp1'],
    //     [tab._angleHeading, 'angle'],
    //     [eqn, 'base'],
    //   ],
    // };
    // this.addSection(common, commonShow, commonContent, {
    //   // setSteadyState: () => {
    //   //   eqn._func.pulseSettings.transformMethod = (s) => {
    //   //     const bounds = eqn._func.getBoundingRect('vertex');
    //   //     return new Transform().translate(-bounds.left - bounds.width / 2, -bounds.bottom - bounds.height / 2).scale(s, s).translate(bounds.width / 2 + bounds.left, bounds.height / 2 + bounds.bottom);
    //   //   };
    //   // },
    // });
    
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
      }
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

    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //     // ...coll.tableForm('base'),
    //     // [tab._sineHeading, 'func'],
    //     // [tab._angleHeading, 'angle'],
    //     [eqn, 'sin'],
    //     [fig._oppLabel._label, 'opposite'],
    //     [fig._hypotenuse._label, 'hyp'],
    //   ],
    // };
    // this.addSection(common, commonShow, commonContent, {
    //   transitionFromPrev: (done) => {
    //     fig.animations.new()
    //       .scenario({ target: 'default', duration: 1.5 })
    //       .whenFinished(done)
    //       .start();
    //     eqn.animations.new()
    //       .scenario({ target: 'default', duration: 1.5 })
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     fig.setScenario('default');
    //     eqn.setScenario('default');
    //   },
    // });

    // common = {
    //   setEnterState: () => {
    //     coll.setScenarios('default');
    //     fig.setScenario('default');
    //     eqn.setScenario('default');
    //   },
    //   transitionReset: (done) => {
    //     coll.updateRotation();
    //     if (this.comingFrom === 'goto') {
    //       coll.resetRotation(done, 0);
    //     } else {
    //       coll.resetRotation(done, 0.8);
    //     }
    //   },
    //   setSteadyState: () => {
    //     coll.updateRotation();
    //   },
    //   setLeaveState: () => {
    //     fig._line._line.isTouchable = true;
    //   },
    // };

    commonContent = {
      setContent: [
        style({}, 'The word |sine| originates from the word for |bowstring|.'),
      ],
      // modifiers: {
      //   right_angle_triangle: this.bindNext(colors.diagram.action, 'right_tri'),
      // },
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
        // note({ top: 75 }, '|Ancient_Greeks| called the line between two points on a circle a |khordḗ| (chord or string of a |bow|).'),
        // note({ top: 80 }, 'The |sine_function| was first named in |Sanskrit| as |ardha-jya| (half chord) or |jya| (chord).'),
        // note({ top: 85 }, 'This was translated into |Arabic| as |jiba|, which was then confused with |jaib| (meaning bay or bossom) when it was translated into |Latin| as |sinus| (bay or bossom). Our term |sine| comes from |sinus|.'),
        note({ top: 62, size: 0.9 }, 'A |right_angle_triangle| and cirlce are closely related. |Ancient_Greeks| called the line between two points on a circle a |khordḗ| (chord or string of a |bow|). The |sine_function| was first named in |Sanskrit| as |ardha-jya| (half chord) or |jya| (chord). This was translated into |Arabic| as |jiba|, which was then confused with |jaib| (meaning bay or bossom) when it was translated into |Latin| as |sinus| (bay or bossom). Our term |sine| comes from |sinus|.'),
      ],
      modifiers: {
        // 'khordḗ': coll.bindAccent({
        //   element: fig, children: ['opp', 'mirrorV'], style: ['highlight', 'pulse'],
        // }),
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
        // ...coll.tableForm('base'),
        // [tab._sineHeading, 'sin'],
        // [tab._angleHeading, 'angle'],
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
            // fig._right.anim.dissolveIn({ duration: 1 }),
            // fig._theta.anim.dissolveIn({ duration: 1 }),
            // fig._theta._label.showForm('real'),
          ])
          .scenario({ target: 'left', duration: 2 })
          // .trigger({
          //   callback: () => {
          //     // fig._mirrorLine.showAll();
          //     // fig._mirrorArc.showAll();
          //     // fig._mirrorV.showAll();
          //     // fig._arc.showAll();
          //     // fig._mirrorLine.dim();
          //     // fig._circle.dim();
          //     fig._oppLabel._label.showForm('opposite')
          //     fig._hypotenuse._label.showForm('hyp')
          //     coll.updateRotation();
          //   },
          // })
          .inParallel([
            fig._oppLabel.anim.dissolveIn({ duration: 1 }),
            fig._theta.anim.dissolveIn({ duration: 1 }),
            fig._hypotenuse.anim.dissolveIn({ duration: 1 }),
            fig._right.anim.dissolveIn({ duration: 1 }),
            fig.anim.trigger({
              // delay: 0.05,
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
            // fig._h.anim.dissolveIn({ duration: 1 }),
          ])
          // .trigger({
          //   callback: () => {
          //     notes.forEach((n) => {
          //       n.classList.remove('angle_table_hide');
          //       n.classList.add('topic__diagram_text_fade_in');
          //     });
          //   },
          //   duration: 0.5,
          // })
          // .inParallel([
          // ])
          .whenFinished(done)
          .start();
        // eqn.animations.new()
        //   .dissolveIn(1)
        //   .start();
      },
      setLeaveState: () => {
        coll.undim();
      },
      fadeInFromPrev: false,
    });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({}, 'So the |sine_function| relates the |hypotenuse|, |angle| and |opposite_side| for |any| right angle triangle.'),
    //   modifiers: {
    //     function: click(() => {
    //       coll._box1.showAll();
    //       coll._box1.surround(eqn, ['sin', 'rb'], 0.08);
    //       coll.accent(coll._box1);
    //     }, [this], colors.diagram.action),
    //     opposite_side: coll.bindAccent(fig._opp),
    //     hypotenuse: coll.bindAccent(fig._line),
    //     angle: coll.bindAccent(fig._theta),
    //     'sine_function': click(() => {
    //       coll._box1.showAll();
    //       coll._box1.surround(eqn, ['sin', 'rb'], 0.08);
    //       coll.accent(coll._box1);
    //     }, [this], colors.diagram.action),
    //     // right_angle_triangle: coll.bindAccent(fig, ['right', 'h', 'opp', 'line']),
    //   },
    // };

    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'angle'],
    //     ...coll.tableForm('base'),
    //     [tab._sineHeading, 'sin'],
    //     [tab._angleHeading, 'angle'],
    //     [eqn, 'sin'],
    //     [fig._oppLabel._label, 'opposite'],
    //     [fig._hypotenuse._label, 'hyp'],
    //   ],
    // };

    // this.addSection(common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig.setScenario('left');
    //     eqn.setScenario('left');
    //     tab.setScenario('default');
    //   },
    // });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'Now, we constructed the |table| of sine values by |measuring| the opposite sides of right angle triangles with hypotenuse 1. Over |millenia| however, increasingly |accurate| ways have been found to do this.'),
      modifiers: {
        table: coll.bindAccent(tab, colors.diagram.action),
      },
    };

    // this.addSection(common, commonShow, commonContent, {
    //   modifiers: {
    //     table: this.bindNext(),
    //   },
    //   setSteadyState: () => {
    //     fig.setScenario('left');
    //     eqn.setScenario('left');
    //     tab.setScenario('default');
    //   },
    // });

    commonShow = {
      show: [
        // fig._line, fig._h, fig._theta,
        // fig._right, fig._opp, tab,
        tab,
      ],
      setEqnForms: [
        // [fig._theta._label, 'angle'],
        ...coll.tableForm('base'),
        [tab._sineHeading, 'sin'],
        [tab._angleHeading, 'angle'],
        // [eqn, 'sin'],
        // [fig._oppLabel._label, 'opposite'],
        // [fig._hypotenuse._label, 'hyp'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      title: 'History',
      modifiers: {
        table: coll.bindAccent(tab, colors.diagram.action),
      },
      // transitionFromPrev: (done) => {
      //   tab.animations.new()
      //     .scenario({ target: 'center', duration: 1.5 })
      //     .whenFinished(done)
      //     .start();
      // },
      setSteadyState: () => {
        // fig.setScenario('left');
        // eqn.setScenario('left');
        tab.setScenario('center');
      },
    });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // commonContent = {
    //   setContent: style({}, '.'),
    //   modifiers: {
    //   },
    // };

    // this.addSection(common, commonShow, commonContent, {
    //   setSteadyState: () => {
    //     fig.setScenario('left');
    //     eqn.setScenario('left');
    //   },
    // });

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
      setContent: style({}, 'It was not until |1400 CE| that a mathematical |formula| was found that exactly represented the sine function.'),
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
      modifiers: {
        formula: coll.bindAccent(coll._powerSeries, colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        tab.setScenario('center');
        // tab.animations.new()
        //   .scenario({ target: 'high', duration: 0.4 })
        //   .trigger({
        //     callback: () => {
        //       coll._powerSeries.showForm('base');
        //       coll.accent(coll._powerSeries);
        //     },
        //     duration: 1,
        //   })
        //   .whenFinished(done)
        //   .start();
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
        opposite_side: coll.bindAccent(fig, ['opp']),
        angle: coll.bindAccent(fig._theta),
        hypotenuse: coll.bindAccent(fig, ['line']),
        sine_function: click(() => {
          coll._box1.showAll();
          coll._box1.surround(eqn, ['sin', 'rb'], 0.08);
          coll.accent(coll._box1);
        }, [this], colors.diagram.action),
      },
    };


    commonShow = {
      show: [
        fig._line, fig._h, fig._theta,
        fig._right, fig._opp,
      ],
      setEqnForms: [
        [fig._theta._label, 'angle'],
        // ...coll.tableForm('base'),
        // [tab._sineHeading, 'sin'],
        // [tab._angleHeading, 'angle'],
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
      setContent: style({}, 'This |relationship| |leads| to many other relationships between sides and angles in |triangles| and |circles|. |Trigonometry| explores many of these relationships.'),
      modifiers: {
        relationship: click(() => {
          coll._box1.showAll();
          coll._box1.surround(eqn, ['opp', 'rb'], 0.08);
          coll.accent(coll._box1);
        }, [this], colors.diagram.action),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        coll.setScenarios('default');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, 'If you need to find the |value| of the |sine_function| for a given |angle|, you can use a |table_of_sines|, |calculator| or |computer|.'),
      modifiers: {
        // table_of_sines: coll.bindAccent(tab, colors.diagram.action),
        angle: highlight(colors.angles),
        sine_function: click(() => {
          coll._box1.showAll();
          coll._box1.surround(tab._sineHeading, ['sin', 'rb'], 0.08);
          coll.accent(coll._box1);
        }, [this], colors.diagram.action),
        table_of_sines: click(() => {
          coll._box1.showAll();
          coll._box1.surround(tab, '', 0.08);
          coll.accent(coll._box1);
        }, [this], colors.diagram.action),
      },
    };

    this.addSection(common, commonContent, {
      show: [tab],
      setEqnForms: [
        // [fig._theta._label, 'angle'],
        ...coll.tableForm('base'),
        [tab._sineHeading, 'sin'],
        [tab._angleHeading, 'angle'],
        // [eqn, 'sin'],
        // [fig._oppLabel._label, 'opposite'],
        // [fig._hypotenuse._label, 'hyp'],
      ],
      setSteadyState: () => {
        tab.setScenario('center');
        console.log(tab)
      },
    });

    

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // text = [
    //   style({}, 'When we scale the hypotenuse by |r|, we can now scale this mathatical expression as well.'),
    // ];
    // commonContent = { setContent: [...text, tableContent], modifiers };

    // // [tableContent, modifiers] = makeTable(
    // //   '<span class="angle_text">angle</span>',
    // //   '<span class="component_text">opposite</span>',
    // //   [0, 1, 2, 3, 'dots', 43, 44, 45, 46, 47, 'dots', 90],
    // //   true,
    // // );
    // commonContent = { setContent: [...text, tableContent], modifiers };
    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp,
    //   ],
    //   setEqnForms: [
    //     [fig._theta._label, 'real'],
    //   ],
    // };
    // // this.addSection(common, commonShow, commonContent, {
      
    // //   setSteadyState: () => {
    // //     fig._oppLabel._label.showForm('realTimesR');
    // //     fig._hypotenuse._label.showForm('realTimesR');
    // //     fig.setScenario('left');
    // //   },
    // //   fadeInFromPrev: false,
    // // });

    // this.addSectionEqnStep({
    //   eqns: [
    //     [eqn, 'base', 'baseTimesR', 2],
    //     [fig._hypotenuse._label, 'real', 'realTimesR', 2],
    //     [fig._oppLabel._label, 'real', 'realTimesR', 2],
    //   ],
    //   duration: 2,
    // }, common, commonShow, commonContent, {
    //   transitionFromPrev: (done) => {
    //     fig.setScenario('left');
    //     const rElements = document.querySelectorAll('.angle_table_r');
    //     rElements.forEach((r) => {
    //       r.classList.add('topic__diagram_text_fade_in');
    //     });
    //     done();
    //   },
    //   fadeInFromPrev: false,
    // });

    // this.addSectionEqnStep({
    //   eqns: [
    //     [eqn, 'baseTimesR', 'baseTimesRToHypR', 2],
    //     [fig._hypotenuse._label, 'realTimesR', 'realTimesR', 2],
    //     [fig._oppLabel._label, 'realTimesR', 'realTimesR', 2],
    //   ],
    //   duration: 2,
    // }, common, commonShow, commonContent, {
    //   fadeInFromPrev: false,
    // });
    // commonContent = { setContent: [...text], modifiers };
    // this.addSectionEqnStep({
    //   eqns: [
    //     [eqn, 'baseTimesRToHypR', 'hypR', 2],
    //     [fig._hypotenuse._label, 'realTimesR', 'realTimesR', 2],
    //     [fig._oppLabel._label, 'realTimesR', 'realTimesR', 2],
    //     ...coll.tableForm('base', 'baseTimesR', false),
    //     [tab._sineHeading, 'opp', 'oppHyp1'],
    //     [tab._angleHeading, 'angle', 'angleToTheta'],
    //   ],
    //   duration: 2,
    // }, common, commonShow, commonContent, {
    //   fadeInFromPrev: false,
    //   show: [
    //     fig._line, fig._h, fig._theta,
    //     fig._right, fig._opp, tab,
    //   ],
    //   setSteadyState: () => {
    //     // tab.showAll();
    //   },
    // });


  // Rename table heading "opposite" to "Function"


    

    // commonContent = {
    //   setContent: [
    //     text,
    //     tableContent,
    //   ],
    //   modifiers,
    // };
    // commonShow = {
    //   show: [
    //     fig._line, fig._h, fig._real,
    //     fig._right, fig._opp, fig._sine,
    //   ],
    //   setEqnForms: [
    //     // [fig._sineTheta._label, '0'],
    //     [fig._hypotenuse._label, '0'],
    //   ],
    // };
  //   // this.addSection(common, commonShow, commonContent, {
  //   //   modifiers: {
  //   //     measure: click(coll.growTable, [coll, null], colors.components),
  //   //   },
  //   //   transitionFromPrev: (done) => {
  //   //     fig.setScenario('left');
  //   //     // coll.growTable(done);
  //   //   },
  //   //   fadeInFromPrev: false,
  //   //   setSteadyState: () => {
  //   //     fig.setScenario('left');
  //   //   },
  //   // });

  //   // const row = (angle, prec = 3) => `<tr><td>|${angle}º|</td><td>${round(Math.sin(angle * Math.PI / 180), prec)}</td></tr>`;
  //   // const dots = '<tr><td>\u22EE</td><td>\u22EE</td></tr>';
  //   // const table = `
  //   //     <table id="angle_table">
  //   //       <tr><th><i>\u03B8</i></th><th>function(<span id='angle_text'>\u03B8</span>)</th></tr>
  //   //       ${dots}
  //   //       ${row(20)}
  //   //       ${row(21)}
  //   //       ${row(22)}
  //   //       ${row(23)}
  //   //       ${row(24)}
  //   //       ${row(25)}
  //   //       ${dots}
  //   //       ${row(75)}
  //   //       ${row(76)}
  //   //       ${row(77)}
  //   //       ${row(78)}
  //   //       ${row(79)}
  //   //       ${row(80)}
  //   //       ${dots}
  //   //     </table>
  //   //     `;
  //   // const tableModifiers = {
  //   //   '20º': click(coll.gotoRotation, [coll, 20 * Math.PI / 180, 0.5, null]),
  //   //   '21º': click(coll.gotoRotation, [coll, 21 * Math.PI / 180, 0.5, null]),
  //   //   '22º': click(coll.gotoRotation, [coll, 22 * Math.PI / 180, 0.5, null]),
  //   //   '23º': click(coll.gotoRotation, [coll, 23 * Math.PI / 180, 0.5, null]),
  //   //   '24º': click(coll.gotoRotation, [coll, 24 * Math.PI / 180, 0.5, null]),
  //   //   '25º': click(coll.gotoRotation, [coll, 25 * Math.PI / 180, 0.5, null]),
  //   //   '75º': click(coll.gotoRotation, [coll, 75 * Math.PI / 180, 0.5, null]),
  //   //   '76º': click(coll.gotoRotation, [coll, 76 * Math.PI / 180, 0.5, null]),
  //   //   '77º': click(coll.gotoRotation, [coll, 77 * Math.PI / 180, 0.5, null]),
  //   //   '78º': click(coll.gotoRotation, [coll, 78 * Math.PI / 180, 0.5, null]),
  //   //   '79º': click(coll.gotoRotation, [coll, 79 * Math.PI / 180, 0.5, null]),
  //   //   '80º': click(coll.gotoRotation, [coll, 80 * Math.PI / 180, 0.5, null]),
  //   // };

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'The line has |horizontal| and |vertical| components, that change with |rotation_angle|.',
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       rotation_angle: click(coll.gotoRotation, [coll, null, 0.8, null], colors.angles),
  //       horizontal: this.bindNext(colors.components, 'h'),
  //       vertical: this.bindNext(colors.components, 'v'),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //     ],
  //   });
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       rotation_angle: click(coll.gotoRotation, [coll, null, 0.8, null], colors.angles),
  //       horizontal: coll.bindAccent(fig._h),
  //       vertical: coll.bindAccent(fig._v),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //     ],
  //     transitionFromPrev: (done) => {
  //       fig._h.showAll();
  //       fig._v.showAll();
  //       coll.updateRotation();
  //       if (this.message === 'h') {
  //         coll.accent(fig, ['h'], done);
  //       } else if (this.message === 'v') {
  //         coll.accent(fig, ['v'], done);
  //       } else {
  //         coll.accent(fig, ['h', 'v'], done);
  //       }
  //     },
  //     setSteadyState: () => {
  //       fig._h.showAll();
  //       fig._v.showAll();
  //       coll.updateRotation();
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'These |components| and the |line| are a |right_angle_triangle|. |Rotating| the line |changes the shape| of the right angle triangle.',
  //     modifiers: {
  //       components: coll.bindAccent(fig, ['h', 'v']),
  //       line: coll.bindAccent(fig._line),
  //       Rotating: click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
  //     },
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       right_angle_triangle: this.bindNext(colors.lines),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._h, fig._v,
  //     ],
  //   });
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       right_angle_triangle: coll.bindAccent(fig, ['line', 'h', 'v', 'right']),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._h, fig._v,
  //     ],
  //     transitionFromPrev: (done) => {
  //       fig._right.showAll();
  //       coll.updateRotation();
  //       coll.accent(fig, ['h', 'v', 'line', 'right'], done);
  //     },
  //     setSteadyState: () => {
  //       fig._right.showAll();
  //       coll.updateRotation();
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       'In fact, sweeping the line between 0º to 90º represents |all right angle triangles with a hypotenuse of 1|.',
  //       hint({ label: 'Why?', top: 80, size: 0.6 }, 'As a triangle\'s angles |add_to_180º|, the right angle must be the largest angle and the other two angles must be |less than 90º|. Thus sweeping the line between 0º and 90º represents |all angle combinations| of a right angle triangle. At each angle, all angles and the hypotenuse are |known|, thus the |ASA| similarity criteria can be used to determine |all triangles with those angles and hypotenuse are congruent|.'),
  //     ],
  //     modifiers: {
  //       components: coll.bindAccent(fig, ['h', 'v']),
  //       line: coll.bindAccent(fig._line),
  //       Rotating: click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
  //       ASA: this.qr('Math/Geometry_1/CongruentTriangles/base/Asa'),
  //       add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
  //     },
  //   };

  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       right_angle_triangle: coll.bindAccent(fig, ['line', 'h', 'v', 'right']),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._h, fig._v, fig._right,
  //     ],
  //   });

  //   // commonContent = {
  //   //   setContent: [
  //   //     'This is because:',
  //   //     style({ list: 'unordered', listStyleType: 'disc' }, [
  //   //       'All angles in a triangle add to 180º',
  //   //       'Therefore the two angles that aren\'t the right angle add to 90º',
  //   //       'Therefore the two angles are less than 90º',
  //   //       'Therefore sweeping the line between 0º and 90º represents all possible angle combinations of a right angle triangle',
  //   //       'At each angle combination, the ASA triangle congruence critieria is met (using the known hypotenuse of 1)',
  //   //       'Therefore all triangles with that hypotenuse and angle combination are contruent',
  //   //       'Therefore sweeping a fixed hypotenuse between 0º and 90º and forming a right angle triangle with the vertical and horizontal components will represent all right angle triangles with that hypotenuse',
  //   //     ]),
  //   //   ],
  //   // };
  //   // this.addSection(commonContent, {
  //   //   modifiers: {
  //   //     right_angle_triangle: coll.bindAccent(fig, ['line', 'h', 'v', 'right']),
  //   //   },
  //   // });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'Now let’s consider just the |vertical| component.',
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       vertical: this.bindNext(colors.components),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._h, fig._v, fig._right,
  //     ],
  //   });
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       vertical: coll.bindAccent(fig._v),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._h, fig._v, fig._right,
  //     ],
  //     transitionFromPrev: (done) => {
  //       coll.accent(fig._v);
  //       fig.animations.new()
  //         .dissolveOut({ element: fig._h, duration: 1 })
  //         .whenFinished(done)
  //         .start();
  //     },
  //     setSteadyState: () => {
  //       fig._h.hide();
  //       coll.updateRotation();
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'As the angle gets |closer_to_90º|, the vertical component gets |longer|. As it gets |closer_to_0º|, the vertical component gets |shorter|.',
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       closer_to_0º: click(coll.gotoSmallAngle, [coll], colors.angles),
  //       closer_to_90º: click(coll.gotoLargeAngle, [coll], colors.angles),
  //       longer: highlight(colors.components),
  //       shorter: highlight(colors.components),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._v, fig._right,
  //     ],
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'Therefore we can say the |vertical| component is |related to|, |dependent on|, or |a function of| the rotation |angle|.',
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       vertical: highlight(colors.components),
  //       angle: highlight(colors.angles),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._hypotenuse,
  //       fig._v, fig._right,
  //     ],
  //   });

  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       vertical: highlight(colors.components),
  //       angle: highlight(colors.angles),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._theta, fig._hypotenuse,
  //       fig._v, fig._right, fig._sineTheta,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [fig._sineTheta._label, '0'],
  //       [eqn, '0'],
  //       [fig._theta._label, '0'],
  //     ],
  //     transitionFromPrev: (done) => {
  //       coll.resetRotation(() => {
  //         coll.accent(eqn, done);
  //         // coll.accent(fig._theta);
  //       }, 0.8);
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'The name we use for this function is |sine|, though sometimes just |sin| is also used.',
  //   };
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._theta, fig._hypotenuse,
  //       fig._v, fig._right, fig._sineTheta,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [fig._sineTheta._label, '0'],
  //       // [eqn, '0'],
  //       [fig._theta._label, '0'],
  //     ],
  //   };
  //   this.addSectionEqnStep(
  //     {
  //       eqns: [[eqn, '0', '0']],
  //       duration: 2,
  //     }, common, commonShow, commonContent,
  //   );
  //   this.addSectionEqnStep(
  //     {
  //       eqns: [[eqn, '0', '0sine1']],
  //       duration: 2,
  //     }, common, commonShow, commonContent,
  //   );
  //   this.addSectionEqnStep(
  //     {
  //       eqns: [[eqn, '0sine1', '0sine2']],
  //       duration: 2,
  //     }, common, commonShow, commonContent,
  //   );

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   const pulseBowString = () => {
  //     fig._arc.pulseThickNow(1, 1.02, 8);
  //     fig._mirrorArc.pulseThickNow(1, 1.02, 8);
  //     coll.accent({
  //       element: fig, children: ['v', 'mirrorV', 'arc', 'mirrorArc'], style: ['highlight'],
  //     });
      
  //     coll.accent({
  //       element: fig, children: ['v', 'mirrorV'], style: ['pulse'],
  //     });
  //   };
  //   commonContent = {
  //     setContent: [
  //       'The word |sine| originates in the word for meaning bow string.',
  //       // `${new Definition('Sine', 'Latin', ['sinus', 'bay, bossum'], 'Arabic', ['juib', 'something']).html()}`,
  //       note({ top: 75 }, 'Ancient Greeks called the line between two points on a circle a |khordḗ|, meaning chord or |bowstring|.'),
  //       note({ top: 80 }, 'The |sine_function| was first named in Sanskrit as ardha-jya (half chord) or jya (chord).'),
  //       note({ top: 85 }, 'Arabic translated this into jiba, which was then confused with jaib (meaning bay or bossom) when it was translated into Latin as sinus (bay or bossom). Our term |sine| comes from |sinus|.'),
  //     ],
  //     modifiers: {
  //       'khordḗ': coll.bindAccent({
  //         element: fig, children: ['v', 'mirrorV'], style: ['highlight', 'pulse'],
  //       }),
  //       bowstring: click(pulseBowString, [this], colors.components),
  //       sine_function: coll.bindAccent({
  //         element: fig, children: ['v'], style: ['highlight', 'pulse'],
  //       }),
  //     },
  //   };
  //   this.addSection(common, commonContent, {
  //     show: [
  //       fig._line, fig._x, fig._theta, fig._hypotenuse,
  //       fig._v, fig._right, fig._sineTheta,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [fig._sineTheta._label, '0'],
  //       // [eqn, '0sine2'],
  //       [fig._theta._label, '0'],
  //     ],
  //     transitionFromPrev: (done) => {
  //       fig.animations.new()
  //         .inParallel([
  //           fig._sineTheta.anim.dissolveOut({ duration: 1 }),
  //           fig._right.anim.dim({ duration: 1 }),
  //           fig._theta.anim.dissolveOut({ duration: 1 }),
  //           fig._hypotenuse.anim.dissolveOut({ duration: 1 }),
  //           fig._right.anim.dissolveOut({ duration: 1 }),
  //           fig._line.anim.dim({ duration: 1 }),
  //           // fig._hypotenuse.anim.dim({ duration: 1 }),
  //           // fig._theta.anim.dim({ duration: 1 }),
  //         ])
  //         .scenario({ target: 'small', duration: 2 })
  //         .trigger({
  //           callback: () => {
  //             fig._mirrorLine.showAll();
  //             fig._mirrorArc.showAll();
  //             fig._mirrorV.showAll();
  //             fig._arc.showAll();
  //             fig._mirrorLine.dim();
  //             fig._mirrorArc.dim();
  //             fig._mirrorV.dim();
  //             fig._arc.dim();
  //             fig._circle.dim();
  //             coll.updateRotation();
  //           },
  //         })
  //         .inParallel([
  //           fig._circle.anim.dissolveIn({ duration: 1 }),
  //           fig._arc.anim.dissolveIn({ duration: 1 }),
  //           fig._mirrorV.anim.dissolveIn({ duration: 1 }),
  //           fig._mirrorArc.anim.dissolveIn({ duration: 1 }),
  //           fig._mirrorLine.anim.dissolveIn({ duration: 1 }),
  //         ])
  //         .whenFinished(done)
  //         .start();
  //     },
  //     setSteadyState: () => {
  //       fig._circle.showAll();
  //       fig.setScenario('small');
  //       fig._arc.showAll();
  //       fig._mirrorLine.showAll();
  //       fig._mirrorArc.showAll();
  //       fig._mirrorV.showAll();
  //       fig._sineTheta.hide();
  //       fig._right.hide();
  //       fig._theta.hide();
  //       fig._hypotenuse.hide();
  //       coll.accent({
  //         element: fig,
  //         children: [
  //           'v',
  //           // 'mirrorV',
  //           // 'arc',
  //           // 'mirrorArc',
  //         ],
  //         style: 'highlight',
  //       });
  //       coll.updateRotation();
  //     },
  //     setLeaveState: () => {
  //       coll.undim();
  //       fig._line.undim();
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'In greek, a line between two points of a circle was called a khordḗ (meaning |chord| of a bow).',
  //   };

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'Moving forward, we will call the vertical component the side |opposite| the angle, and call the angle |theta|.',
  //     modifiers: {
  //       opposite: coll.bindAccent(fig._v),
  //       theta: coll.bindAccent(fig._theta),
  //     },
  //   };
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._hypotenuse,
  //       fig._v, fig._right, fig._theta,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //     ],
  //   };
  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '0', '0'],
  //       [fig._theta._label, '0', '0'],
  //       [fig._sineTheta._label, '0', '0'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '0', '1'],
  //       [fig._theta._label, '0', '1'],
  //       [fig._sineTheta._label, '0', '0b'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '1', '2'],
  //       [fig._theta._label, '1', '2'],
  //       [fig._sineTheta._label, '0b', '1'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'More specifically, this function relates the |opposite| side to |theta| only when the |hypotenuse is 1|.',
  //     modifiers: {
  //       opposite: coll.bindAccent(fig._sineTheta),
  //       theta: coll.bindAccent(fig._theta),
  //     },
  //   };

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2', '2'],
  //       [fig._theta._label, '2', '2'],
  //       [fig._sineTheta._label, '1', '1'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2', '2a0'],
  //       [fig._theta._label, '2', '2'],
  //       [fig._sineTheta._label, '1', '1a'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'If the |hypotenuse_changes| length, then the |opposite_side| length will also change.',
  //     modifiers: {
  //       opposite_side: coll.bindAccent(fig._v),
  //       // hypotenuse: click(coll.setLineLength, [coll, layout.r, true, null, true], colors.lines),
  //       hypotenuse_changes: click(coll.setLineLength, [coll, null, true, null, true], colors.lines),
  //     },
  //   };
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._hypotenuse,
  //       fig._v, fig._right, fig._theta,
  //     ],
  //     setEqnForms: [
  //       [fig._theta._label, '2'],
  //     ],
  //   };
  //   this.addSectionEqnStep({
  //     eqns: [
  //       // { eqn, from: '2a0', to: '2a0' },
  //       { eqn: fig._hypotenuse._label, from: '0', to: '0' },
  //     ],
  //   }, common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: style({ top: 0 }, '|Changing| the hypotenuse doesn’t change the |angles| of the triangle and thus creates a |similar| triangle whose sides will be |scaled by the same amount as the hypotenuse|.'),
  //     modifiers: {
  //       angles: coll.bindAccent(fig, ['right', 'theta']),
  //       Changing: click(coll.setLineLength, [coll, null, true, null, true], colors.lines),
  //       similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
  //     },
  //   };
  //   this.addSectionEqnStep({
  //     eqns: [
  //       // { eqn, from: '2', to: '2' },
  //       { eqn: fig._hypotenuse._label, from: '0', to: '0' },
  //     ],
  //   }, common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: style({ top: 0 }, 'The corresponding sides of |similar_triangles| are all |scaled by the same factor|. Thus if we scale the hypotenuse by |r|, then the |opposite| side must also be scaled by |r|.'),
  //     modifiers: {
  //       opposite: highlight(colors.components),
  //       similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
  //     },
  //   };

  //   // this.addSectionEqnStep({
  //   //   eqns: [
  //   //     [eqn, '2', '2a0'],
  //   //     [fig._theta._label, '2', '2'],
  //   //     [fig._sineTheta._label, '1', '1a'],
  //   //   ],
  //   //   duration: 2,
  //   // }, common, commonShow, commonContent);


  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._hypotenuse,
  //       fig._v, fig._right, fig._theta,
  //     ],
  //     setEqnForms: [
  //       [fig._theta._label, '2'],
  //     ],
  //   };
  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2a0', '2a0'],
  //       [fig._hypotenuse._label, '0', '0'],
  //       [fig._sineTheta._label, '1a', '1a'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2a0', '2a'],
  //       [fig._hypotenuse._label, '0', '1'],
  //       [fig._sineTheta._label, '1a', '1b'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2a', '2b'],
  //       [fig._hypotenuse._label, '1', '1a'],
  //       [fig._sineTheta._label, '1b', '1c'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2b', '2c'],
  //       [fig._hypotenuse._label, '1a', '2'],
  //       [fig._sineTheta._label, '1c', '1d'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({ top: 0 }, 'We have now extended the last relationship that applied to all right angle triangles with a hypotenuse of 1, to include any hypotenuse |r|. Therefore, this relationship holds for |all right angle triangles|.'),
  //     ],
  //   };

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2c', '2c'],
  //       [fig._hypotenuse._label, '2', '2'],
  //       [fig._sineTheta._label, '1d', '1d'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);

  //   this.addSectionEqnStep({
  //     eqns: [
  //       [eqn, '2c', '2d'],
  //       [fig._hypotenuse._label, '2', '2'],
  //       [fig._sineTheta._label, '1d', '1e'],
  //     ],
  //     duration: 2,
  //   }, common, commonShow, commonContent);


  //   // this.addSectionEqnStep({
  //   //   eqns: [
  //   //     [eqn, '2b', '2b'],
  //   //     [fig._hypotenuse._label, '2', '2'],
  //   //     [fig._sineTheta._label, '1e', '1e'],
  //   //   ],
  //   //   duration: 2,
  //   // }, common, commonShow, commonContent);

  //   // this.addSectionEqnStep({
  //   //   eqns: [
  //   //     [eqn, '2b', '2c'],
  //   //     [fig._hypotenuse._label, '2', '2'],
  //   //     [fig._sineTheta._label, '1e', '1e'],
  //   //   ],
  //   //   duration: 2,
  //   // }, common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       'So |what is this function|?',
  //     ],
  //   };
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._hypotenuse,
  //       fig._v, fig._right, fig._theta,
  //     ],
  //     setEqnForms: [
  //       [fig._sineTheta._label, '1e'],
  //       [fig._hypotenuse._label, '2'],
  //       [fig._theta._label, '2'],
  //       [eqn, '2d'],
  //     ],
  //     setSteadyState: () => {
  //       coll.accent({
  //         element: coll,
  //         children: [
  //           'eqn.func',
  //           'eqn.lb',
  //           'eqn.rb',
  //           'eqn.theta',
  //           'eqn.hyp1_1',
  //         ],
  //         style: 'highlight',
  //       });
  //     },
  //     setLeaveState: () => {
  //       coll.undim();
  //     },
  //   };

  //   this.addSection(common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({ top: 0 }, 'Actually, for over a |thousand years| it was not known exactly what the formula of this function was even though the |relationship| between |side and angle was clear|, and side lengths could be |measured or geometrically calculated| for different angles.'),
  //     ],
  //   };
  //   this.addSection(common, commonShow, commonContent);

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   const row = (angle, prec = 3) => `<tr><td>|${angle}º|</td><td>${round(Math.sin(angle * Math.PI / 180), prec)}</td></tr>`;
  //   const dots = '<tr><td>\u22EE</td><td>\u22EE</td></tr>';
  //   const table = `
  //       <table id="angle_table">
  //         <tr><th><i>\u03B8</i></th><th>function(<span id='angle_text'>\u03B8</span>)</th></tr>
  //         ${dots}
  //         ${row(20)}
  //         ${row(21)}
  //         ${row(22)}
  //         ${row(23)}
  //         ${row(24)}
  //         ${row(25)}
  //         ${dots}
  //         ${row(75)}
  //         ${row(76)}
  //         ${row(77)}
  //         ${row(78)}
  //         ${row(79)}
  //         ${row(80)}
  //         ${dots}
  //       </table>
  //       `;
  //   const tableModifiers = {
  //     '20º': click(coll.gotoRotation, [coll, 20 * Math.PI / 180, 0.5, null]),
  //     '21º': click(coll.gotoRotation, [coll, 21 * Math.PI / 180, 0.5, null]),
  //     '22º': click(coll.gotoRotation, [coll, 22 * Math.PI / 180, 0.5, null]),
  //     '23º': click(coll.gotoRotation, [coll, 23 * Math.PI / 180, 0.5, null]),
  //     '24º': click(coll.gotoRotation, [coll, 24 * Math.PI / 180, 0.5, null]),
  //     '25º': click(coll.gotoRotation, [coll, 25 * Math.PI / 180, 0.5, null]),
  //     '75º': click(coll.gotoRotation, [coll, 75 * Math.PI / 180, 0.5, null]),
  //     '76º': click(coll.gotoRotation, [coll, 76 * Math.PI / 180, 0.5, null]),
  //     '77º': click(coll.gotoRotation, [coll, 77 * Math.PI / 180, 0.5, null]),
  //     '78º': click(coll.gotoRotation, [coll, 78 * Math.PI / 180, 0.5, null]),
  //     '79º': click(coll.gotoRotation, [coll, 79 * Math.PI / 180, 0.5, null]),
  //     '80º': click(coll.gotoRotation, [coll, 80 * Math.PI / 180, 0.5, null]),
  //   };
  //   commonContent = {
  //     setContent: [
  //       style({ top: 0 }, 'In the |first century| AD, |geometry| was used to calculate the opposite side length for a selection of angles. These calculations were then published in |large tables|.'),
  //       table,
  //     ],
  //     modifiers: tableModifiers,
  //   };
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._real, fig._v, fig._right, fig._hypotenuse,
  //       fig._sine,
  //     ],
  //     setEqnForms: [
  //       // [fig._sineTheta._label, '1e'],
  //       [fig._hypotenuse._label, '2'],
  //       // [fig._theta._label, '2'],
  //       [eqn, '2d'],
  //     ],
  //   };
  //   this.addSection(common, commonShow, commonContent, {
  //     transitionFromPrev: (done) => {
  //       const angleTable = document.getElementById('angle_table');
  //       if (angleTable != null) {
  //         angleTable.classList.add('angle_table_hide')
  //       }

  //       eqn.goToForm({ name: '2e', duration: 1.5, animate: 'move' });
  //       fig._hypotenuse._label.goToForm({ name: '0', duration: 1.5, animate: 'move' });

  //       eqn.animations.new()
  //         .scenario({ target: 'left', duration: 1.5 })
  //         .start();

  //       fig.animations.new()
  //         .scenario({ target: 'left', duration: 1.5 })
  //         .trigger({
  //           callback: () => {
  //             if (angleTable != null) {
  //               angleTable.classList.remove('angle_table_hide');
  //               angleTable.classList.add('topic__diagram_text_fade_in');
  //             }
  //           },
  //         })
  //         .whenFinished(done)
  //         .start();
  //     },
  //     setSteadyState: () => {
  //       fig.setScenario('left');
  //       eqn.setScenario('left');
  //       eqn.showForm('2e');
  //       fig._hypotenuse._label.showForm('0');
  //     },
  //     // fadeInFromPrev: false,
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._real, fig._v, fig._right, fig._hypotenuse,
  //       fig._sine,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [eqn, '2e'],
  //     ],
  //   };
  //   commonContent = {
  //     setContent: [
  //       style({ top: 0 }, 'Even when the formula for the function was first discovered in |1400 CE|, tables continued to be used for most applications as it was |simpler| than calculating each time.'),
  //       table,
  //     ],
  //     modifiers: tableModifiers,
  //   };
  //   this.addSection(common, commonShow, commonContent, {
  //     setSteadyState: () => {
  //       fig.setScenario('left');
  //       eqn.setScenario('left');
  //       if (this.comingFrom === 'prev') {
  //         const pgraphs = document.querySelectorAll('#id_topic__diagram_text p');
  //         pgraphs.forEach((p) => {
  //           p.classList.add('topic__diagram_text_fade_in');
  //         });
  //       }
  //     },
  //     fadeInFromPrev: false,
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({ top: 0 }, 'In fact, tables that represented this function were used up until the |late 20th century|, when personal calculators and computers started to replace tables.'),
  //       table,
  //     ],
  //     modifiers: tableModifiers,
  //   };
  //   this.addSection(common, commonShow, commonContent, {
  //     setSteadyState: () => {
  //       fig.setScenario('left');
  //       eqn.setScenario('left');
  //       if (this.comingFrom === 'prev') {
  //         const pgraphs = document.querySelectorAll('#id_topic__diagram_text p');
  //         pgraphs.forEach((p) => {
  //           p.classList.add('topic__diagram_text_fade_in');
  //         });
  //       }
  //     },
  //     fadeInFromPrev: false,
  //   });


  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({ top: 0 }, 'Today we call this function the |sine| function.'),
  //     ],
  //   };
  //   commonShow = {
  //     show: [
  //       fig._line, fig._x, fig._real, fig._v, fig._right, fig._hypotenuse,
  //       fig._sine,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [eqn, '2e'],
  //     ],
  //   };

  //   this.addSection(common, commonShow, commonContent, {
  //     transitionFromPrev: (done) => {
  //       const moveDone = () => {
  //         eqn.goToForm({ name: '2f', duration: 1.5, animate: 'move' });
  //         fig._real._label.animations.new()
  //           .dissolveOut({ duration: 0.75 })
  //           .start();
  //         fig._theta._label.showForm('2');
  //         coll.updateRotation();
  //         fig._theta._label.setOpacity(0);
  //         fig._theta._label.animations.new()
  //           .delay({ duration: 0.75 })
  //           // .trigger({ callback: () => { fig._theta._label.showForm('2'); } })
  //           .dissolveIn({ duration: 0.75 })
  //           .whenFinished(done)
  //           .start();
  //       };

  //       eqn.setScenario('left');
  //       eqn.animations.new()
  //         .scenario({ target: 'default', duration: 1.5 })
  //         .start();
  //       fig.setScenario('left');
  //       fig.animations.new()
  //         .scenario({ target: 'default', duration: 1.5 })
  //         .whenFinished(moveDone)
  //         .start();
  //     },
  //     setSteadyState: () => {
  //       fig.setScenario('default');
  //       eqn.setScenario('default');
  //       eqn.showForm('2f');
  //       fig._real.hide();
  //       // fig._theta._label.showForm('2');
  //       coll.updateRotation();
  //     },
  //     // fadeInFromPrev: false,
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'As the |horizontal| and |vertical| components are |perpendicular|, we have a |right_angle_triangle|.',
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       horizontal: coll.bindAccent(fig._h),
  //       vertical: coll.bindAccent(fig._v),
  //       perpendicular: this.qr('Math/Geometry_1/AngleTypes/base/Perpendicular'),
  //       right_angle_triangle: this.bindNext(colors.lines),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._hypotenuse,
  //       fig._v, fig._right, fig._theta,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [fig._sineTheta._label, '1'],
  //       [eqn, '2'],
  //       [fig._theta._label, '2'],
  //     ],
  //   });

  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       horizontal: coll.bindAccent(fig._h),
  //       vertical: coll.bindAccent(fig._v),
  //       perpendicular: this.qr('Math/Geometry_1/AngleTypes/base/Perpendicular'),
  //       right_angle_triangle: coll.bindAccent(fig, ['line', 'v', 'h']),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._hypotenuse,
  //       fig._v, fig._right, fig._theta,
  //     ],
  //     setEqnForms: [
  //       [fig._hypotenuse._label, '0'],
  //       [fig._sineTheta._label, '1'],
  //       [eqn, '2'],
  //       [fig._theta._label, '2'],
  //     ],
  //     transitionFromPrev: (done) => {
  //       coll.resetRotation(() => {
  //         fig._right.showAll();
  //         coll.updateRotation();
  //         coll.accent(fig, ['h', 'v', 'line', 'right'], done);
  //       }, 0.8);
  //     },
  //     setSteadyState: () => {
  //       fig._right.showAll();
  //       coll.updateRotation();
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       'Now, when we |rotate| the line between |0º_to_90º|, we are actually forming |every possible combination of angles| for a right angle triangle.',
  //       note('Note: a triangle\'s angles |sum_to_180º|, so when |one angle is 90º| then the other two angles must be |less than 90º|. Therefore is we sweep one angle from 0 to 90º, '),
  //     ]
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       '0º_to_90º': click(coll.rotateFrom0To90, [coll], colors.angles),
  //       sum_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
  //       // angles: highlight(colors.angles),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._h, fig._v, fig._right,
  //     ],
  //   });

  //   this.addSection({
  //     setContent: [
  //       'Our setup can create all possible angle combinations of right angle triangles',
  //     ],
  //   });
  //   this.addSection({
  //     setContent: [
  //       'Our setup creates right angle triangles with all the possible angle combinations.',
  //       'Triangles with the same corresponding angles are similar triangles, and the sides of similar triangles all have the same proportion or relatipnship between other sides of',
  //       'Similar triangles are just scaled - their corresponding sides all have the same proportion to each other',
  //       'Therefore, any relationship we find in out setup between angles and sides, will translate '
  //     ],
  //     fadeInFromPrev: false,
  //   });
  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   common = {
  //     setEnterState: () => {
  //       coll.setScenarios('default');
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._h, fig._v, fig._right,
  //     ],
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   };
  //   commonContent = {
  //     setContent: 'We also know from |similar_triangles| that any triangles with the |same corresponding angles| will be |similar|.',
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: 'In other words, we can create a triangle .',
  //   };
  //   this.addSection(common, commonContent, {
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: style({ top: 0 }, 'This also means that |any relationship we find| between angle and side length in our setup, will be |valid for all right angle triangles| with the |same corresponding angles|.'),
  //   };
  //   this.addSection(common, commonContent, {
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       'We will focus on just the |vertical| component, which is the side |opposite| to the angle.',
  //       note('Note: we will see in |future topics| that the horiztonal and vertical components are |closely related| and can be |calculated| from each other.'),
  //     ],
  //     modifiers: {
  //       vertical: coll.bindAccent(fig._v),
  //       opposite: coll.bindAccent(fig._v),
  //     },
  //   };
  //   this.addSection(common, commonContent, {
  //   });
  //   this.addSection(common, commonContent, {
  //     transitionFromPrev: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       coll.resetRotation(() => {
  //         fig._opposite.showAll();
  //         coll.labelForm('0');
  //         coll.updateRotation();
  //         coll.accent(fig, ['opposite'], done);
  //       }, 0.8);
  //     },
  //     setSteadyState: () => {
  //       fig._opposite.showAll();
  //       coll.updateRotation();
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, [
  //         'We will also label the angle |theta|, and set the |hypotenuse| to length |1|.',
  //       ]),
  //       note('Note: setting the hypotenuse to 1 will make scaling the triangle easier in the future.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       opposite: coll.bindAccent(fig._v),
  //       angle: coll.bindAccent(fig._real),
  //       theta: highlightWord('\u03B8', colors.angles),
  //       hypotenuse: this.qr('Math/Geometry_1/RightAngleTriangles/base/Hypotenuse'),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._v, fig._right, fig._opposite,
  //     ],
  //   });

  //   common = {
  //     setEnterState: () => {
  //       coll.setScenarios('default');
  //     },
  //     show: [
  //       fig._line, fig._x, fig._theta, fig._v, fig._right, fig._hypotenuse,
  //       fig._opposite,
  //     ],
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   };
  //   commonContent = {
  //     setContent: [
  //       style({}, [
  //         'We will also label the angle |theta|, and set the |hypotenuse| to length |1|.',
  //       ]),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       opposite: coll.bindAccent(fig._v),
  //       angle: coll.bindAccent(fig._real),
  //       theta: highlightWord('\u03B8', colors.angles),
  //       hypotenuse: this.qr('Math/Geometry_1/RightAngleTriangles/base/Hypotenuse'),
  //     },
  //     fadeInFromPrev: false,
  //     transitionFromPrev: (done) => {
  //       fig._theta.hide();
  //       fig._hypotenuse.hide();
  //       fig._real.showAll();
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       coll.resetRotation(() => {
  //         fig._theta.showAll();
  //         fig._hypotenuse.showAll();
  //         fig._real.hide();
  //         coll.labelForm('0');
  //         coll.updateRotation();
  //         coll.accent(fig, ['theta', 'hypotenuse'], done);
  //       }, 0.8);
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, 'So, can we find a |relationship| between the |angle| and |opposite| side?.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       opposite: coll.bindAccent(fig._v),
  //       angle: coll.bindAccent(fig._theta),
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, 'Ideally we would find a |mathematical formula| or |function| that can be used to |calculate| one from the other.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //   });

  //   this.addSection(common, commonContent, {
  //     transitionFromPrev: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       coll.resetRotation(() => {
  //         eqn.showForm('0');
  //         coll.labelForm('0');
  //         // eqn.animations.new()
  //         //   .dissolveIn(1)
  //         //   .whenFinished(done)
  //         //   .start();
  //         coll.accent(eqn, done);
  //       }, 0.8);
  //     },
  //     setSteadyState: () => {
  //       eqn.showForm('0');
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   common = {
  //     setEnterState: () => {
  //       coll.setScenarios('default');
  //     },
  //     show: [
  //       fig._line, fig._x, fig._theta, fig._v, fig._right, fig._hypotenuse,
  //       fig._opposite,
  //     ],
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('0');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //     setSteadyState: () => {
  //       eqn.showForm('0');
  //     },
  //   };
  //   commonContent = {
  //     setContent: [
  //       style({}, 'We use the name |sine| for this function. Often the name is shortened to |sin| and the brackets are sometimes not used.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //   });

  //   this.addSection(common, commonContent, {
  //     transitionFromPrev: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('0');
  //       coll.resetRotation(() => {
  //         // eqn.showForm('0a');
  //         coll.labelForm('0');
  //         eqn.goToForm({
  //           name: '0a',
  //           animate: 'move',
  //           duration: 1,
  //           // callback: done,
  //           callback: () => {
  //             eqn.goToForm({
  //               name: '0b',
  //               animate: 'move',
  //               duration: 1,
  //               callback: done,
  //             });
  //           },
  //         });
  //       }, 0.8);
  //     },
  //     setSteadyState: () => {
  //       eqn.showForm('0b');
  //     },
  //   });

  //   // this.addSection(common, commonContent, {
  //   //   transitionFromPrev: (done) => {
  //   //     coll.updateRotation();
  //   //     coll.labelForm('0');
  //   //     eqn.showForm('0a');
  //   //     coll.resetRotation(() => {
  //   //       // eqn.showForm('0b');
  //   //       coll.labelForm('0');
  //   //       // coll.accent(eqn, ['sin1', 'theta1', 'lb1', 'rb1'], done);
  //   //       eqn.goToForm({
  //   //         name: '0b',
  //   //         animate: 'move',
  //   //         duration: 1,
  //   //         callback: done,
  //   //         // callback: () => {
  //   //         //   eqn.goToForm({
  //   //         //     name: '0c',
  //   //         //     animate: 'move',
  //   //         //     duration: 1,
  //   //         //     callback: done,
  //   //         //   });
  //   //         // },
  //   //       });
  //   //     }, 0.8);
  //   //   },
  //   //   setSteadyState: () => {
  //   //     eqn.showForm('0b');
  //   //   },
  //   // });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   common = {
  //     setEnterState: () => {
  //       coll.setScenarios('default');
  //     },
  //     show: [
  //       fig._line, fig._x, fig._theta, fig._v, fig._right, fig._hypotenuse,
  //       fig._opposite,
  //     ],
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('0');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   };
  //   commonContent = {
  //     setContent: [
  //       style({}, 'However, for over one |thousand| years, such a formula or function couldn\'t be found.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, 'In the |first century| AD, |geometry| was used to calculate the opposite side length for a selection of angles. These calculations were then published in |large tables|.'),
  //     ],
  //   };

  //   this.addSection(common, commonContent, {
  //   });

  //   // const row = (angle, prec = 3) => `<tr><td>${angle}º</td><td>${round(Math.sin(angle * Math.PI / 180), prec)}</td></tr>`;
  //   // const dots = '<tr><td>\u22EE</td><td>\u22EE</td></tr>';
  //   // this.addSection(common, commonContent, {
  //   //   setContent: [
  //   //     'In the |first century| AD, |geometry| was used to calculate the opposite side length for a selection of angles. These calculations were then published in |large tables|.',
  //   //     `
  //   //     <table>
  //   //       <tr><th><i>\u03B8</i></th><th>Opposite</th></tr>
  //   //       ${dots}
  //   //       ${row(20)}
  //   //       ${row(21)}
  //   //       ${row(22)}
  //   //       ${row(23)}
  //   //       ${row(24)}
  //   //       ${row(25)}
  //   //       ${row(26)}
  //   //       ${row(27)}
  //   //       ${row(28)}
  //   //       ${row(29)}
  //   //       ${dots}
  //   //     </table>
  //   //     `,
  //   //   ],
  //   //   show: [
  //   //     fig._line, fig._x, fig._real, fig._v, fig._right, fig._hypotenuse,
  //   //     fig._sine,
  //   //   ],
  //   //   transitionFromAny: (done) => {
  //   //     coll.updateRotation();
  //   //     coll.labelForm('0');
  //   //     eqn.showForm('0');
  //   //     if (this.comingFrom === 'goto') {
  //   //       coll.resetRotation(done, 0);
  //   //     } else {
  //   //       coll.resetRotation(done, 0.8);
  //   //     }
  //   //   },
  //   //   fadeInFromPrev: false,
  //   // });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, 'By the |7th century|, the first formulas that |approximated| the side length were discovered.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //   });
  //   this.addSection(common, commonContent, {
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('1');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else if (this.comingFrom === 'prev') {
  //         coll.resetRotation(() => {
  //           coll.accent(eqn, done);
  //         }, 0.8);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, 'And in |1400 AD|, a formula that |exactly modeled| the relationship was found.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('1');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   });
  //   this.addSection(common, commonContent, {
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('2');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else if (this.comingFrom === 'prev') {
  //         coll.resetRotation(() => {
  //           coll.accent(eqn, done);
  //         }, 0.8);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   });

  //   // **********************************************************************
  //   // **********************************************************************
  //   // **********************************************************************
  //   commonContent = {
  //     setContent: [
  //       style({}, 'But the formulas are |complex|, and for most uses it was still more convenient to use a |table of values|.'),
  //       note({ top: 22, id: 'id_computer_note' }, 'Note: it wasn\'t till the |late 20<sup>th</sup> century| when tables were superseded by personal calculators and computers.'),
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('2');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   });
  //   // this.addSection(common, commonContent, {
  //   //   setContent: [
  //   //     style({}, 'These formulas provided insight into the properties of the relationship, but were also used to generate more |accurate| tables.'),
  //   //     `<table>
  //   //       <tr><th><i>\u03B8</i></th><th>Opposite</th></tr>
  //   //       ${dots}
  //   //       ${row(20, 8)}
  //   //       ${row(21, 8)}
  //   //       ${row(22, 8)}
  //   //       ${row(23, 8)}
  //   //       ${row(24, 8)}
  //   //       ${row(25, 8)}
  //   //       ${row(26, 8)}
  //   //       ${row(27, 8)}
  //   //       ${row(28, 8)}
  //   //       ${row(29, 8)}
  //   //       ${dots}
  //   //     </table>`,
  //   //   ],
  //   //   transitionFromAny: (done) => {
  //   //     coll.updateRotation();
  //   //     coll.labelForm('0');
  //   //     eqn.showForm('2');
  //   //     if (this.comingFrom === 'goto') {
  //   //       coll.resetRotation(done, 0);
  //   //     } else {
  //   //       coll.resetRotation(done, 0.8);
  //   //     }
  //   //   },
  //   // });

  //   this.addSection(common, commonContent, {
  //     setContent: [
  //       style({}, 'In fact, tables were used by most people until '),
  //       `<table>
  //         <tr><th><i>\u03B8</i></th><th>Opposite</th></tr>
  //         ${dots}
  //         ${row(20, 8)}
  //         ${row(21, 8)}
  //         ${row(22, 8)}
  //         ${row(23, 8)}
  //         ${row(24, 8)}
  //         ${row(25, 8)}
  //         ${row(26, 8)}
  //         ${row(27, 8)}
  //         ${row(28, 8)}
  //         ${row(29, 8)}
  //         ${dots}
  //       </table>`,
  //     ],
  //     transitionFromAny: (done) => {
  //       coll.updateRotation();
  //       coll.labelForm('0');
  //       eqn.showForm('2');
  //       if (this.comingFrom === 'goto') {
  //         coll.resetRotation(done, 0);
  //       } else {
  //         coll.resetRotation(done, 0.8);
  //       }
  //     },
  //   });


  //   commonContent = {
  //     setContent: [
  //       'So, can we find a |relationship| between the |angle| and |opposite| side?. Ideally we would find a |mathematical formula| or |function| that can be used to |calculate| one from the other.',
  //     ],
  //   };
  //   this.addSection(common, commonContent, {
  //     modifiers: {
  //       opposite: coll.bindAccent(fig._v),
  //       angle: coll.bindAccent(fig._real),
  //     },
  //     show: [
  //       fig._line, fig._x, fig._real, fig._v, fig._right,
  //     ],
  //   });


  //   this.addSection({
  //     show: [coll],
  //     setSteadyState: () => {
  //       coll.setScenarios('default');
  //       coll._fig._line.setMovable(true);
  //       coll.labelForm('2');
  //     },
  //   });
  }

  // this.addSectionEqnStep({ eqn: eqn, from: '0', to: '1' }, common, commonContent);
}

export default Content;
