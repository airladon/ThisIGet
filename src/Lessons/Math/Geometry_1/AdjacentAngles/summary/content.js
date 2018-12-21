// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
// import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const { click, unit, centerV } = Fig.tools.html;
const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    // this.overlayDiagram = new OverlayLessonDiagram(htmlId, layout);
    this.diagram = new LessonDiagram(htmlId, layout);
  }

  setElementContent() {
    const { selector } = this.diagram.elements._selector;
    selector.add('adjacent', 'Adjacent', 'Angles');
    selector.add('complementary', 'Complementary', 'Angles');
    selector.add('supplementary', 'Supplementary', 'Angles');
    selector.add('explementary', 'Explementary', 'Angles');
    selector.selectWithoutExecution('adjacent');
  }

  addSections() {
    const diag = this.diagram.elements;
    const adjacent = diag._adjacent;

    const common = {
      setEnterState: () => {
        diag._selector.selector.selectWithoutExecution(adjacent.angleType);
        adjacent.calculateFuturePositions(adjacent.angleType);
        diag._unitsSelector.select(diag.units);
      },
      showOnly: () => {
        adjacent.show();
        adjacent._lines.show();
        adjacent._lines._line1.showAll();
        adjacent._lines._line2.showAll();
        adjacent._lines._line3.showAll();
        adjacent.showAngles([
          [adjacent._lines._angleA, 'a', colors.angleA],
          [adjacent._lines._angleB, 'b', colors.angleB],
        ]);
        adjacent._eqn.hideAll();
        diag._unitsSelector.showAll();
      },
      show: [
        diag._unitsSelector,
        diag._selector,
      ],
      transitionFromAny: (done) => {
        adjacent.moveToFuturePositions(null, done, 2);
      },
      setSteadyState: () => {
        adjacent.setFuturePositions();
        adjacent.showAngles([
          [adjacent._lines._angleA, 'a', colors.angleA],
          [adjacent._lines._angleB, 'b', colors.angleB],
        ]);
      },
    };
    this.addSection(common, {
      title: 'Adjacent Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Adjacent_angles| are any angles that share a common vertex and edge.
        </p>
      `),
      modifiers: {
        Adjacent_angles: click(adjacent.goToRandomAdjacentAngle, [adjacent], colors.diagram.action),
      },
      hide: [
        diag._unitsSelector,
      ],
      setEnterState: () => {
        adjacent.angleType = 'adjacent';
        common.setEnterState();
      },
      setSteadyState: () => {
        common.setSteadyState();
        adjacent._lines._line3.move.element = adjacent._lines._line3;
      },
    });
    this.addSection(common, {
      title: 'Complementary Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Complementary_angles| add up to be a right angle, which is ${unit('|90&deg;|', '|&pi;/2 radians|')}. 
        </p>
      `),
      modifiers: {
        Complementary_angles: click(
          adjacent.goToRandomComplementaryAngle,
          [adjacent], colors.diagram.action,
        ),
      },
      interactiveElements: [
        adjacent._eqn._a,
        adjacent._eqn._b,
        adjacent._eqn._c,
      ],
      setEnterState: () => {
        adjacent.angleType = 'complementary';
        common.setEnterState();
      },
      setSteadyState: () => {
        common.setSteadyState();
        adjacent._eqn.show();
        adjacent.eqn.showForm('com_add');
        adjacent._lines._line3.move.element = adjacent._lines;
      },
    });

    this.addSection(common, {
      title: 'Supplementary Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Supplementary_angles| add up to be a straight angle, which is ${unit('|180&deg;|', '|&pi; radians|')}. 
        </p>
      `),
      modifiers: {
        Supplementary_angles: click(
          adjacent.goToRandomSupplementaryAngle,
          [adjacent], colors.diagram.action,
        ),
      },
      interactiveElements: [
        adjacent._eqn._a,
        adjacent._eqn._b,
        adjacent._eqn._c,
      ],
      setEnterState: () => {
        adjacent.angleType = 'supplementary';
        common.setEnterState();
      },
      setSteadyState: () => {
        common.setSteadyState();
        adjacent._eqn.show();
        adjacent.eqn.showForm('sup_add');
        adjacent._lines._line3.move.element = adjacent._lines;
      },
    });

    this.addSection(common, {
      title: 'Explementary Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Explementary_angles| add up to be a full angle, which is ${unit('|360&deg;|', '|2&pi; radians|')}. 
        </p>
      `),
      modifiers: {
        Explementary_angles: click(
          adjacent.goToRandomExplementaryAngle,
          [adjacent], colors.diagram.action,
        ),
      },
      interactiveElements: [
        adjacent._eqn._a,
        adjacent._eqn._b,
        adjacent._eqn._c,
      ],
      setEnterState: () => {
        adjacent.angleType = 'explementary';
        common.setEnterState();
      },
      setSteadyState: () => {
        common.setSteadyState();
        adjacent._eqn.show();
        adjacent.eqn.showForm('exp_add');
        adjacent._lines._line3.move.element = adjacent._lines;
      },
    });
  }
}

export default Content;

