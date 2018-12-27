// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

const { click, centerV, unit } = Fig.tools.html;
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

  setElementContent() {
    const { selector } = this.diagram.elements._selector;
    selector.add('opposite', 'Opposite', 'Angles');
    selector.add('corresponding', 'Corresponding', 'Angles');
    selector.add('alternate', 'Alternate', 'Angles');
    selector.add('interior', 'Interior', 'Angles');
    selector.selectWithoutExecution('parallel');
  }

  addSections() {
    const diag = this.diagram.elements;
    const opp = diag._opposite;
    const threeLines = diag._threeLines;
    // const quiz = diag._quiz;

    this.addSection({
      title: 'Opposite Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          When two lines intersect, four angles are created.
        </p>
        <p class="lesson__diagram_text_p_width_40">
          |Opposite_Angles| at the intersection are equal.
        </p>
      `),
      modifiers: {
        Opposite_Angles: click(opp.toggleOppositeAngles, [opp], colors.angleA),
      },
      setInfo: `<ul>
          <li>Rotate the lines to change the angle.</li>
          <li>Click |Opposite Angles| to see the other pair of angles.</li>
          </ul>
      `,
      // interactiveElementsRemove: [
      //   opp._line1._mid,
      //   opp._line2._mid,
      // ],
      setEnterState: () => {
        diag._selector.selector.selectWithoutExecution('opposite');
        opp._angleA.setColor(layout.colors.angleA);
        opp._angleB.setColor(layout.colors.angleB);
        opp._angleC.setColor(layout.colors.angleA);
        opp._angleD.setColor(layout.colors.angleB);
        opp._line1.setColor(layout.colors.line);
        opp._line2.setColor(layout.colors.line);
      },
      showOnly: [
        opp,
        opp._angleA,
        opp._angleC,
        // opp._line1,
        // opp._line1._end1,
        // opp._line1._end2,
        // opp._line1._mid,
        // opp._line2,
        // opp._line2._end1,
        // opp._line2._end2,
        // opp._line2._mid,
      ],
      show: [
        diag._selector, opp._line1, opp._line2,
      ],
      transitionFromAny: (done) => {
        let time = Math.max(
          diag.getTimeToMoveToScenario(opp._line1, 'opposite'),
          diag.getTimeToMoveToScenario(opp._line2, 'opposite'),
        );
        time = time > 2 ? 2 : time;
        diag.moveToScenario(opp._line1, 'opposite', time);
        diag.moveToScenario(opp._line2, 'opposite', time, done);
      },
      setSteadyState: () => {
        diag.moveToScenario(opp._line1, 'opposite', 0.001);
        diag.moveToScenario(opp._line2, 'opposite', 0.001);
        opp._angleA._arc.show();
        opp._angleC._arc.show();
        opp._angleA.showForm('a');
        opp._angleC.showForm('a');
      },
    });

    this.addSection({
      title: 'Corresponding Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Corresponding_Angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting| line.
        </p>
        <p class="lesson__diagram_text_p_width_40">
          When the two lines are |parallel|, corresponding angles are always |equal|.
        </p>
      `),
      modifiers: {
        Corresponding_Angles: click(
          threeLines.correspondingToggleAngles, [threeLines, false, false],
          colors.angleA,
        ),
        parallel: click(threeLines.pulseParallel, [threeLines], colors.line),
        two_lines: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: `<ul>
          <li>Rotate the intersecting line to change the angle.</li>
          <li>Rotate the parallel lines to change perspective.</li>
          <li>Touch |Corresponding Angles| to change the angle pair.</li>
          </ul>
      `,
      // interactiveElementsRemove: [
      //   threeLines._line3._mid,
      //   threeLines._line1._mid,
      //   threeLines._line2._mid,
      // ],
      setEnterState: () => {
        diag._selector.selector.selectWithoutExecution('corresponding');
        if (opp.isShown) {
          threeLines.transform.updateRotation(0);
          threeLines._line1.transform = opp._line1.transform._dup();
          threeLines._line2.transform = opp._line2.transform._dup();
        }
        threeLines._line1.setColor(layout.colors.line);
        threeLines._line2.setColor(layout.colors.line);
      },
      showOnly: [
        threeLines,
        // threeLines._line1,
        // threeLines._line1._end1,
        // threeLines._line1._end2,
        // threeLines._line1._mid,
        // threeLines._line2,
        // threeLines._line2._end1,
        // threeLines._line2._end2,
        // threeLines._line2._mid,
        // threeLines._line3,
        // threeLines._line3._end1,
        // threeLines._line3._end2,
        // threeLines._line3._mid,
      ],
      show: [
        diag._selector,
        threeLines._line1, threeLines._line2, threeLines._line3,
      ],
      transitionFromAny: (done) => {
        let time = Math.max(
          diag.getTimeToMoveToScenario(threeLines._line1, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines._line2, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines._line3, 'corresponding'),
        );
        time = time > 2 ? 2 : time;
        diag.moveToScenario(threeLines._line1, 'corresponding', time);
        diag.moveToScenario(threeLines._line2, 'corresponding', time);
        diag.moveToScenario(threeLines._line3, 'corresponding', time, done);
      },
      setSteadyState: () => {
        diag.moveToScenario(threeLines._line1, 'corresponding', 0.001);
        diag.moveToScenario(threeLines._line2, 'corresponding', 0.001);
        diag.moveToScenario(threeLines._line3, 'corresponding', 0.001);
        threeLines.correspondingToggleAngles();
      },
    });

    this.addSection({
      title: 'Alternate Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Alternate_angles| are the angles that are on opposite sides of the |intersecting| line that crosses |two_lines|.
        </p>
        <p class="lesson__diagram_text_p_width_40">
          When the two lines are |parallel|, the alternate angles are always |equal|.
        </p>
      `),
      modifiers: {
        Alternate_angles: click(
          threeLines.alternateToggleAngles, [threeLines, false],
          colors.angleA,
        ),
        parallel: click(threeLines.pulseParallel, [threeLines], colors.line),
        two_lines: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: `<ul>
          <li>Rotate the intersecting line to change the angle.</li>
          <li>Rotate the parallel lines to change perspective.</li>
          <li>Touch |Alternate Angles| to change the angle pair.</li>
          </ul>
      `,
      // interactiveElementsRemove: [
      //   threeLines._line3._mid,
      //   threeLines._line1._mid,
      //   threeLines._line2._mid,
      // ],
      setEnterState: () => {
        diag._selector.selector.selectWithoutExecution('alternate');
        if (opp.isShown) {
          threeLines.transform.updateRotation(0);
          threeLines._line1.transform = opp._line1.transform._dup();
          threeLines._line2.transform = opp._line2.transform._dup();
        }
        threeLines._line1.setColor(layout.colors.line);
        threeLines._line2.setColor(layout.colors.line);
        // threeLines._line3.setColor(layout.colors.line);
      },
      showOnly: [
        threeLines,
        // threeLines._line1,
        // threeLines._line1._end1,
        // threeLines._line1._end2,
        // threeLines._line1._mid,
        // threeLines._line2,
        // threeLines._line2._end1,
        // threeLines._line2._end2,
        // threeLines._line2._mid,
        // threeLines._line3,
        // threeLines._line3._end1,
        // threeLines._line3._end2,
        // threeLines._line3._mid,
      ],
      show: [
        diag._selector,
        threeLines._line1, threeLines._line2, threeLines._line3,
      ],
      transitionFromAny: (done) => {
        let time = Math.max(
          diag.getTimeToMoveToScenario(threeLines._line1, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines._line2, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines._line3, 'corresponding'),
        );
        time = time > 2 ? 2 : time;
        diag.moveToScenario(threeLines._line1, 'corresponding', time);
        diag.moveToScenario(threeLines._line2, 'corresponding', time);
        diag.moveToScenario(threeLines._line3, 'corresponding', time, done);
      },
      setSteadyState: () => {
        diag.moveToScenario(threeLines._line1, 'corresponding', 0.001);
        diag.moveToScenario(threeLines._line2, 'corresponding', 0.001);
        diag.moveToScenario(threeLines._line3, 'corresponding', 0.001);
        threeLines.alternateToggleAngles();
      },
    });

    this.addSection({
      title: 'Interior Angles',
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_40">
          |Interior_angles| are the inside angles on the same side of the |intersecting| line that crosses |two_lines|.
        </p>
        <p class="lesson__diagram_text_p_width_40">
          When the two lines are |parallel|, the interior angles always add up to ${unit('|180&deg;|', '|&pi; radians|')}.
        </p>
      `),
      modifiers: {
        Interior_angles: click(
          threeLines.interiorToggleAngles, [threeLines, false],
          colors.angleA,
        ),
        parallel: click(threeLines.pulseParallel, [threeLines], colors.line),
        two_lines: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: `<ul>
          <li>Rotate the intersecting line to change the angle.</li>
          <li>Rotate the parallel lines to change perspective.</li>
          <li>Touch |Interior Angles| to change the angle pair.</li>
          </ul>
      `,
      // interactiveElementsRemove: [
      //   threeLines._line3._mid,
      //   threeLines._line1._mid,
      //   threeLines._line2._mid,
      // ],
      setEnterState: () => {
        diag._selector.selector.selectWithoutExecution('interior');
        if (opp.isShown) {
          threeLines.transform.updateRotation(0);
          threeLines._line1.transform = opp._line1.transform._dup();
          threeLines._line2.transform = opp._line2.transform._dup();
        }
        threeLines._line1.setColor(layout.colors.line);
        threeLines._line2.setColor(layout.colors.line);
        // threeLines._line3.setColor(layout.colors.line);
        diag._unitsSelector.select(diag.units);
      },
      showOnly: [
        threeLines,
        // threeLines._line1,
        // threeLines._line1._end1,
        // threeLines._line1._end2,
        // threeLines._line1._mid,
        // threeLines._line2,
        // threeLines._line2._end1,
        // threeLines._line2._end2,
        // threeLines._line2._mid,
        // threeLines._line3,
        // threeLines._line3._end1,
        // threeLines._line3._end2,
        // threeLines._line3._mid,
      ],
      show: [
        diag._selector,
        diag._unitsSelector,
        threeLines._line1, threeLines._line2, threeLines._line3,
      ],
      transitionFromAny: (done) => {
        let time = Math.max(
          diag.getTimeToMoveToScenario(threeLines._line1, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines._line2, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines._line3, 'corresponding'),
          diag.getTimeToMoveToScenario(threeLines),
        );
        time = time > 2 ? 2 : time;
        diag.moveToScenario(threeLines);
        diag.moveToScenario(threeLines._line1, 'corresponding', time);
        diag.moveToScenario(threeLines._line2, 'corresponding', time);
        diag.moveToScenario(threeLines._line3, 'corresponding', time, done);
      },
      setSteadyState: () => {
        diag.moveToScenario(threeLines._line1, 'corresponding', 0.001);
        diag.moveToScenario(threeLines._line2, 'corresponding', 0.001);
        diag.moveToScenario(threeLines._line3, 'corresponding', 0.001);
        diag.moveToScenario(threeLines, null, 0.001);
        threeLines.interiorToggleAngles();
        diag._unitsSelector.select(diag.units);
      },
    });
  }
}

export default Content;
