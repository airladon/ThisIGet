// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../../js/Lesson/LessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click, centerV, clickWord,
} = Fig.tools.html;

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
    this.loadQRs([
      'isosceles_triangles',
      'triangle_introduction',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const equil = diag._equil;

    let common = {
      setContent: '',
      setInfo: '',
      modifiers: {},
      infoModifiers: {},
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    // ***************************************************************
    // ***************************************************************
    // ***************************************************************
    // ***************************************************************
    // ***************************************************************
    // ***************************************************************
    common = {
      setContent: '',
      showOnly: [equil, equil._tri],
      show: [
        equil._tri._line,
        equil._tri._side12, equil._tri._side23, equil._tri._side31,
      ],
      setSteadyState: () => {
        equil.legacySetScenario(equil._tri, layout.equil.scenario.center);
        equil._tri._angle1.label.setText('a');
        equil._tri._angle1.update();
        equil._tri._angle2.label.setText('a');
        equil._tri._angle2.update();
        equil._tri._angle3.label.setText('a');
        equil._tri._angle3.update();
      },
    };
    this.addSection(common, {
      title: 'Equilateral',
      setContent: [
        'A triangle that has all |three sides| the |same length| is called an |equilateral| triangle.',
        `${new Definition('Equilateral', 'Latin', ['aequilateralis', '', 'aequi', 'equal', 'lateralis', 'side']).html('id_lesson__eqiuilateral_definition')}`,
      ],
    });

    this.addSection(common, {
      setContent: 'As |any| two sides are equal, an |equilateral| triangle is a special case of an |isosceles| triangle.',
      modifiers: {
        any: click(equil.toggleIsoOrientation, [equil, null, false], colors.equalLength),
        isosceles: click(this.showQR, [this, 'isosceles_triangles', 'Main'], colors.diagram.action),
      },
    });

    this.addSection(common, {
      setContent: 'Therefore, as |all pairs| of sides are equal, then |all_pairs| of angles are |equal|.',
      modifiers: {
        all_pairs: click(equil.toggleIsoOrientation, [equil, null, true], colors.equalLength),
      },
    });

    this.addSection(common, {
      setContent: 'And so, in an |equilateral| triangle, |all_sides| and |all_angles| are |equal|.',
      modifiers: {
        all_angles: click(equil.pulseAngles, [equil], colors.angles),
        all_sides: click(equil.pulseSides, [equil], colors.lines),
      },
      show: [
        equil._tri._line,
        equil._tri._angle1, equil._tri._angle2, equil._tri._angle3,
        equil._tri._side12, equil._tri._side23, equil._tri._side31,
      ],
    });

    this.addSection({
      setContent: centerV([
        'As an equilateral triangle is a special case of an isosceles triangle, then the same method can be used to show |any triangle with equal angles| will also have |equal sides|.',
        'Therefore, if you |know| a triangle has |equal angles|, you will then know it will be an |equilateral| triangle with |equal sides|.',
      ]),
    });

    common.show = [
      equil._tri._line,
      equil._tri._angle1, equil._tri._angle2, equil._tri._angle3,
      equil._tri._side12, equil._tri._side23, equil._tri._side31,
    ];
    this.addSection(common, {
      setContent: [
        'Next we can consider the |relationship| between an equilateral triangle\'s angles.',
      ],
    });

    common.setContent = 'We know all the angles of a triangle sum to |_180|. Therefore, each angle must be a |third of 180º|, which is |60º|.';
    this.addSection(common, {
      modifiers: {
        _180: clickWord(
          '180º',
          'id_equilateral_180',
          this.showQR, [this, '_triangle_introduction', '_Main'],
          colors.diagram.action,
        ),
      },
    });

    this.addSection(common, {
      modifiers: {
        _180: clickWord(
          '180º',
          'id_equilateral_180',
          this.showQR, [this, '_triangle_introduction', '_Main'],
          colors.diagram.action,
        ),
      },
      setSteadyState: () => {
        equil._tri._angle1.label.setText('60º');
        equil._tri._angle1.update();
        equil._tri._angle2.label.setText('60º');
        equil._tri._angle2.update();
        equil._tri._angle3.label.setText('60º');
        equil._tri._angle3.update();
      },
    });

  // // ***************************************************************
  // // ***************************************************************
  // // ***************************************************************
  // // ***************************************************************
  // // ***************************************************************
  // // ***************************************************************
  }
}

export default Content;
