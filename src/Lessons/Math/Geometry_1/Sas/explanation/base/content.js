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
  // highlightWord,
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
      'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;
    const sas = diag._sas;

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    this.addSection({
      title: 'Side Angle Side',
      setContent: [
        'If two triangles share the same corresponding |Side-Angle-Side| combination, are they congruent?',
      ],
      modifiers: {
        angle_between: highlight(colors.angles),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle0, congruent._tri1._angle1,
        congruent._tri2._angle0, congruent._tri2._angle1,
        congruent._tri1._side01, congruent._tri2._side01,
      ],
    });

    this.addSection({
      setContent: [
        'Lets build up a triangle from these constraints and see how many different triangles we can make.',
      ],
      modifiers: {
        angle: highlight(colors.angles),
        two_sides_are_adjacent: highlight(colors.sides),
      },
      show: [sas._line, sas._angle, sas._base],
      setSteadyState: () => {
        sas.setScenarios('initial');
      },
    });

    this.addSection({
      setContent: [
        'We can start by connecting the angle to one of the sides. At first look, there seem to be |four| ways to do this.',
      ],
      modifiers: {
        four: click(sas.toggleAngles, [sas], colors.angles),
      },
      show: [sas._angle, sas._base],
      transitionFromPrev: (done) => {
        sas.setScenarios('initial');
        sas.animations.cancelAll();
        sas.animations.new()
          .scenarios({ target: 'center1', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas.setScenarios('center1');
        sas.anglePosition = 1;
      },
      transitionToNext: (done) => {
        // const r = sas._angle.getRotation();
        if (sas.anglePosition !== 1) {
          sas.animations.cancelAll();
          sas.animations.new()
            .scenarios({ target: 'center1', duration: 1 })
            .whenFinished(done)
            .start();
        } else {
          done();
        }
      },
    });

    this.addSection({
      setContent: [
        'We can visualize these 4 ways at the same time.',
      ],
      transitionFromPrev: (done) => {
        sas._config1.showAll();
        sas._config1._line.hide();
        sas._config1._line3.hide();
        sas._config1._angle2.hide();
        sas._config1.setScenario('center');
        sas._config1.animations.cancelAll();
        sas._config1.animations.new()
          .scenario({ target: 'showAll', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._config1.showAll();
        sas._config2.showAll();
        sas._config3.showAll();
        sas._config4.showAll();
        sas._config1._line.hide();
        sas._config2._line.hide();
        sas._config3._line.hide();
        sas._config4._line.hide();
        sas._config1._line3.hide();
        sas._config2._line3.hide();
        sas._config3._line3.hide();
        sas._config4._line3.hide();
        sas._config1._angle2.hide();
        sas._config2._angle2.hide();
        sas._config3._angle2.hide();
        sas._config4._angle2.hide();
        sas.setScenarios('showAll');
      },
    });

    let common = {
      setContent: [
        'Next, we can connect the |second side| to be |adjacent_to_the_angle|.',
      ],
      modifiers: {
        adjacent_to_the_angle: highlight(colors.angles),
      },
      setSteadyState: () => {
        sas.setScenarios('showAll');
      },
    };
    this.addSection(common, {
      show: [sas._config1, sas._config2, sas._config3, sas._config4],
      hide: [
        sas._config1._line, sas._config2._line,
        sas._config3._line, sas._config4._line,
        sas._config1._line3, sas._config2._line3,
        sas._config3._line3, sas._config4._line3,
        sas._config1._angle2, sas._config2._angle2,
        sas._config3._angle2, sas._config4._angle2,
      ],
    });
    this.addSection(common, {
      show: [sas._config1, sas._config2, sas._config3, sas._config4],
      hide: [
        sas._config1._line3, sas._config2._line3,
        sas._config3._line3, sas._config4._line3,
        sas._config1._angle2, sas._config2._angle2,
        sas._config3._angle2, sas._config4._angle2,
      ],
    });
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'For each of these scenarios, how many triangles can be made, and are the triangles between scenarios the same or different?',
      ]),
      show: [sas._config1, sas._config2, sas._config3, sas._config4],
      hide: [
        sas._config1._line3, sas._config2._line3,
        sas._config3._line3, sas._config4._line3,
        sas._config1._angle2, sas._config2._angle2,
        sas._config3._angle2, sas._config4._angle2,
      ],

    });

    this.addSection({
      setContent: [
        'We start by considering just one of these scenarios.',
      ],
      show: [sas._config1],
      hide: [sas._config1._line3, sas._config1._angle2],
      transitionFromPrev: (done) => {
        sas._config1.animations.cancelAll();
        sas._config1.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._fig.showAll();
        sas.setProblemStatement();
        sas._config1.hide();
        // console.log(sas)
      },
    });

    this.addSection({
      setContent: [
        'You can move the |pad| to see how many different lines can be drawn to make a triangle with the known sides and angle.',
      ],
      modifiers: {
        pad: click(sas.pulsePad, [sas], colors.pads),
      },
      show: [sas._fig],
      setSteadyState: () => {
        sas.setMovableLegReady();
      },
    });

    this.addSection({
      setContent: [
        'There is |only_one| line length and angle possible. If this line has a |different_length| or |different_angle|, it does not form a triangle.',
      ],
      modifiers: {
        only_one: click(sas.goToTri, [sas, null], colors.sides),
        different_length: click(sas.randLength, [sas], colors.sides),
        different_angle: click(sas.randRotation, [sas], colors.angles),
      },
      show: [sas._fig],
      transitionFromPrev: (done) => {
        if (sas._fig._pad0.getPosition().isNotEqualTo(sas._fig._pad3.getPosition())) {
          sas.goToTri(done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        sas.setMovableLeg();
      },
    });

    this.addSection({
      setContent: [
        'So for this scenario, |only one| triangle can be made.',
      ],
      show: [sas._fig],
      transitionFromPrev: (done) => {
        if (sas._fig._pad0.getPosition().isNotEqualTo(sas._fig._pad3.getPosition())) {
          sas.goToTri(done);
        } else {
          done();
        }
      },
      interactiveItemsOnly: [],
      setSteadyState: () => {
        sas._fig.hideAll();
        sas._config1.showAll();
        sas._config1.setScenario('center');
      },
    });

    this.addSection({
      setContent: [
        'Now if we |flip| this triangle in different ways, we know all the reflections are |congruent|.',
      ],
      show: [sas._config1],
      setSteadyState: () => {
        sas._config1.setScenario('center');
      },
    });

    common = {
      setContent: [
        'Therefore, we can |flip| them to resemble the |original| four scenarios of connecting the angle to the first side.',
      ],
      show: [sas._config1],
    };
    this.addSection(common, {
      modifiers: {
        flip: click(this.next, [this], colors.sides),
        original: click(this.next, [this], colors.diagram.action),
      },
      setSteadyState: () => {
        sas._config1.setScenario('center');
      },
    });

    this.addSection(common, {
      modifiers: {
        flip: click(sas.createCongruentTriangles, [sas, null, true], colors.sides),
        original: click(sas.toggleConfig, [sas, null], colors.diagram.action),
      },
      show: [sas._config1],
      transitionFromPrev: (done) => {
        sas.setScenario('center');
        sas.animations.cancelAll();
        sas.animations.new()
          .scenarios({ target: 'showAll', duration: 1 })
          .trigger({
            callback: sas.createCongruentTriangles.bind(sas, null, false),
            duration: 3,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._config2.showAll();
        sas._config3.showAll();
        sas._config4.showAll();
        sas.setScenarios('showAll');
        sas.configColors(colors.disabled, colors.disabled);
      },
      setLeaveState: () => {
        sas.configColors(colors.sides, colors.angles);
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So all four scenarios result in the |same triangle|, just flipped or rotated compared to the first.',
        'So we see that only one triangle can be formed when given two side lengths and the angle between them.',
      ]),
    });

    this.addSection({
      setContent: [
        'Therefore if two triangles share |two sides of the same length|, and the |angle_between| those two sides is also the same on both triangles, then they |are congruent|.',
        'This case is often called the |Side Angle Side| case.',
      ],
      modifiers: {
        angle_between: highlight(colors.angles),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle0, congruent._tri1._angle1,
        congruent._tri2._angle0, congruent._tri2._angle1,
        congruent._tri1._side01, congruent._tri2._side01,
      ],
    });
  }
}

export default Content;
