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
  // style,
  click,
  // clickW,
  highlight,
  // centerV,
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
      'triangle_introduction',
      'adjacent_angles',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      // title: 'External ',
      setContent: [
        'An |exterior_angle| or |external_angle| is the angle between a |side| of a shape and an adjacent side |extended_outwards|.',
      ],
      modifiers: {
        side: click(coll.pulseAdjacent, [coll], colors.sides),
        extended_outwards: click(coll.pulseExternalLine, [coll], colors.externalSide),
        external_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
        exterior_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
      },
      show: [
        fig._tri._line, fig._externalAngle._curve, fig._externalLine,
        fig._adjacent,
      ],
      setSteadyState: () => {
        fig.setScenario('default');
      },
    });

    this.addSection({
      // title: 'External ',
      setContent: [
        'Is there a |relationship| between the |external_angle| of a triangle and its |inernal_angles|?',
      ],
      modifiers: {
        inernal_angles: click(coll.pulseInternalAngles, [coll], colors.angles),
        external_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
      },
      show: [
        fig._tri._line, fig._externalAngle._curve, fig._externalLine,
        fig._adjacent,
        fig._tri._angle0._curve, fig._tri._angle1._curve,
        fig._tri._angle2._curve,
      ],
      setSteadyState: () => {
        fig.setScenario('default');
      },
    });

    let common = {
      setContent: [
        'Start be labelling all the angles.',
      ],
      setSteadyState: () => {
        fig.setScenario('default');
      },
    };
    this.addSection(common, {
      show: [
        fig._tri._line, fig._externalAngle._curve, fig._externalLine,
        fig._adjacent,
        fig._tri._angle0._curve, fig._tri._angle1._curve,
        fig._tri._angle2._curve,
      ],
    });
    this.addSection(common, {
      show: [
        fig._tri._line, fig._externalAngle, fig._externalLine,
        fig._adjacent,
        fig._tri._angle0, fig._tri._angle1,
        fig._tri._angle2,
      ],
      setSteadyState: () => {
        fig.setScenario('default');
        fig._tri._angle2.label.setText('c');
        fig._tri._angle2.updateLabel();
        fig._externalAngle.label.setText('e');
        fig._externalAngle.updateLabel();
      },
    });

    common = {
      setContent: [
        'As a triangle\'s |internal_angles| add up to 180º, we can put |c| in terms of |a| and |b|.',
      ],
      modifiers: {
        internal_angles: this.bindShowQR('triangle_introduction/base', 'Main'),
        c: highlight(colors.angles),
        a: highlight(colors.angles),
        b: highlight(colors.angles),
      },
      setSteadyState: () => {
        fig.setScenario('default');
      },
      show: [fig],
    };
    this.addSection(common, {
      setSteadyState: () => {
        fig.setScenario('default');
        fig._tri._angle2.label.setText('c');
        fig._tri._angle2.updateLabel();
        fig._externalAngle.label.setText('e');
        fig._externalAngle.updateLabel();
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        fig.setScenario('default');
        fig._tri._angle2.label.setText('180º-a-b');
        fig._tri._angle2.updateLabel();
        fig._externalAngle.label.setText('e');
        fig._externalAngle.updateLabel();
      },
      transitionFromPrev: (done) => {
        coll.pulseAngleC(done);
      },
    });

    common = {
      setContent: [
        'Now |c| and |_e| are |supplementary| angles, so we can calculate |e|.',
      ],
      modifiers: {
        supplementary: this.bindShowQR('adjacent_angles/base', 'Supplementary'),
        c: highlight(colors.angles),
        _e: highlight(colors.externalAngle),
        e: highlight(colors.externalAngle),
      },
      setSteadyState: () => {
        fig.setScenario('default');
      },
      show: [fig],
    };
    this.addSection(common, {
      setSteadyState: () => {
        fig.setScenario('default');
        fig._tri._angle2.label.setText('180º-a-b');
        fig._tri._angle2.updateLabel();
        fig._externalAngle.label.setText('e');
        fig._externalAngle.updateLabel();
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        fig.setScenario('default');
        fig._tri._angle2.label.setText('180º-a-b');
        fig._tri._angle2.updateLabel();
        fig._externalAngle.label.setText('a + b');
        fig._externalAngle.updateLabel();
      },
      transitionFromPrev: (done) => {
        coll.pulseExternalAngle(done);
      },
    });

    this.addSection(common, {
      setContent: [
        'So we see the |external_angle| of a triangle is the sum of the |opposite_angles|.',
      ],
      modifiers: {
        external_angle: click(coll.pulseExternalAngle, [coll, null], colors.externalAngle),
        opposite_angles: click(coll.pulseOppositeAngles, [coll, null], colors.angles),
      },
      setEnterState: () => {
        fig.setScenario('default');
        fig._tri._angle2.label.setText('180º-a-b');
        fig._tri._angle2.updateLabel();
        fig._externalAngle.label.setText('a + b');
        fig._externalAngle.updateLabel();
        fig._tri._angle2.setColor(colors.disabled);
      },
      setLeaveState: () => {
        fig._tri._angle2.setColor(colors.angles);
      },
    });
  }
}

export default Content;
