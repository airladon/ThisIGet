// @flow
import Fig from 'figureone';
import {
  LessonContent, // interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
// import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

const {
  click, highlight, centerV, unit,
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
  }

  addSections() {
    const diag = this.diagram.elements;
    const opp = diag._opposite;
    const threeLines = diag._threeLines;

    this.addSection({
      title: 'Introduction',
      setContent: centerV(`
        <p>
          |Related angles| are angles that have the same value, but are in different locations. 
        </p>
        <p>
          This lesson will look at related angles in two scenarios:
          <ul>
            <li>when two lines intersect</li>
            <li>when a line intersects two parallel lines</li>
          </ul>
        </p>
      `),
    });

    const oppCommon = {
      // interactiveElementsRemove: [
      //   opp._line1,
      //   opp._line2,
      // ],
      // interactiveElements: [
      //   interactiveItem(opp._line1),
      //   interactiveItem(opp._line2),
      // ],
      setInfo: [
        '<ul>',
        '<li>Drag the lines to rotate and see a different perspective.</li>',
        '</ul>',
      ],
      setEnterState: () => {
        opp._line1.setColor(colors.line);
        opp._line2.setColor(colors.line);
        diag._unitsSelector.select(diag.units);
      },
      showOnly: [
        opp,
      ],
      show: [
        opp._line1,
        opp._line2,
        diag._unitsSelector,
      ],
    };

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(oppCommon, {
      title: 'Opposite Angles',
      setContent: `
      <p>
        When two lines intersect, |four_angles| are formed. If you know one angle, can you calulate all the others?
      </p>
      `,
      modifiers: {
        four_angles: click(opp.toggleAngles, [opp], layout.colors.angleA),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |four_angles| to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        four_angles: highlight(colors.angleA),
      },
      setEnterState: () => {
        oppCommon.setEnterState();
        opp.calculateFuturePositions();
        // diag._unitsSelector.select(diag.units);
      },
      hide: [
        diag._unitsSelector,
      ],
      transitionFromAny: (done) => {
        opp.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        opp.setFuturePositions();
        opp.showAngles([[opp._angleA, 'a', colors.angleA]]);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        First consider angles |a| and |b|. These are supplementary angles, and therefore they add up to ${unit('|180&deg;|', '|&pi; radians|')}.
      </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        b: highlight(colors.angleB),
      },
      // show: [
      //   diag._unitsSelector,
      // ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.angleA],
          [opp._angleB, 'b', colors.angleB],
        ]);
        // diag._unitsSelector.select('rad');
        // diag.setUnits('rad');
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        Therefore we can calculate |b| from |a|:
      </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        b: highlight(colors.angleB),
      },
      // show: [
      //   diag._unitsSelector,
      // ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.angleA],
          [opp._angleB, 'b_silent', colors.angleB],
        ]);
        opp._equation2.eqn.showForm('b');
        opp._equation2.eqn.setPosition(layout.equation2.b);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        Next we can consider |a| and |d|, which are also supplementary angles and add up to ${unit('|180&deg;|', '|&pi; radians|')}.
      </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        d: highlight(colors.angleD),
      },
      // show: [
      //   diag._unitsSelector,
      // ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.angleA],
          [opp._angleB, 'b_silent', colors.disabled],
          [opp._angleD, 'd', colors.angleD],
        ]);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        Therefore, we can calculate |d| from |a|:
      </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        d: highlight(colors.angleD),
      },
      // show: [
      //   diag._unitsSelector,
      // ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.angleA],
          [opp._angleB, 'b_silent', colors.disabled],
          [opp._angleD, 'd_silent', colors.angleD],
        ]);
        opp._equation2.eqn.showForm('d');
        opp._equation2.eqn.setPosition(layout.equation2.b);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        So we can see that the opposite angles |b| and |d| are equal.
      </p>
      `,
      modifiers: {
        b: highlight(colors.angleB),
        d: highlight(colors.angleD),
      },
      // show: [
      //   diag._unitsSelector,
      // ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.disabled],
          [opp._angleB, 'b_equals', colors.angleB],
          [opp._angleD, 'd_equals', colors.angleD],
        ]);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        Doing the same exercise with angles |b| and |c|, or |d| and |c| shows that opposite angles |a| and |c| are also equal.
      </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        b: highlight(colors.angleB),
        c: highlight(colors.angleC),
        d: highlight(colors.angleD),
      },
      // show: [
      //   diag._unitsSelector,
      // ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.disabled],
          [opp._angleB, 'b_equals', colors.disabled],
          [opp._angleC, 'c_equals', colors.angleC],
          [opp._angleD, 'd_equals', colors.disabled],
        ]);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        More generally, we can see that at the intersection of two lines, the |opposite angles are always equal|.
      </p>
      `,
      hide: [
        diag._unitsSelector,
      ],
      setSteadyState: () => {
        opp.showAngles([
          [opp._angleA, 'a', colors.angleA],
          [opp._angleB, 'b', colors.angleB],
          [opp._angleC, 'a', colors.angleA],
          [opp._angleD, 'b', colors.angleB],
        ]);
      },
    });

    this.addSection(oppCommon, {
      setContent: `
      <p>
        If we know one angle, all others can be calculated!
      </p>
      `,
      setEnterState: () => {
        oppCommon.setEnterState();
        opp.calculateFuturePositions();
      },
      hide: [
        diag._unitsSelector,
      ],
      transitionFromAny: (done) => {
        opp.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        opp.setFuturePositions();
        opp.showAngles([
          [opp._angleA, 'a', colors.angleA],
          [opp._angleB, 'b', colors.angleB],
          [opp._angleC, 'a', colors.angleA],
          [opp._angleD, 'b', colors.angleB],
        ]);
      },
    });


    // Intersecting Line
    const common = {
      interactiveElementsRemove: [
        threeLines._line1._mid,
        threeLines._line2._mid,
        threeLines._line3._mid,
      ],
      setInfo: [
        '<ul>',
        '<li>Drag the different lines see a different perspective.</li>',
        '</ul>',
      ],
      setEnterState: () => {
        threeLines._line1.setColor(layout.colors.line);
        threeLines._line2.setColor(layout.colors.line);
        threeLines.calculateFuturePositions('corresponding');
        diag._unitsSelector.select(diag.units);
      },
      showOnly: [
        threeLines,
        threeLines._line1,
        // threeLines._line1._end1,
        // threeLines._line1._end2,
        // threeLines._line1._mid,
        threeLines._line2,
        // threeLines._line2._end1,
        // threeLines._line2._end2,
        // threeLines._line2._mid,
        threeLines._line3,
        // threeLines._line3._end1,
        // threeLines._line3._end2,
        // threeLines._line3._mid,
      ],
      show: [
        threeLines._line1,
        threeLines._line2,
        threeLines._line3,
      ],
    };
    this.addSection(common, {
      title: 'Parallel Intersection',
      setContent: `
        <p>
          The next scenario is when there is a line |intersecting| two |parallel| lines. In this case, |eight_angles| are formed.
        </p>
      `,
      modifiers: {
        eight_angles: click(threeLines.toggleAllAngles, [threeLines], colors.angleA),
        parallel: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |eight_angles| to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        eight_angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.showAngles([[threeLines._angleA1, 'a', colors.angleA]]);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, {
      title: 'Corresponding Angles',
      setContent: `
        <p >
          |Corresponding_Angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting| line.
        </p>
      `,
      modifiers: {
        Corresponding_Angles: click(
          threeLines.correspondingToggleAngles, [threeLines, false, true],
          colors.angleA,
        ),
        two_lines: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |Corresponding_Angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        Corresponding_Angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.correspondingToggleAngles(false, true);
      },
    });

    this.addSection(common, {
      setContent: `
        <p >
          What is the relationship between |corresponding_angles|?
        </p>
      `,
      modifiers: {
        corresponding_angles: click(
          threeLines.correspondingToggleAngles, [threeLines, false, true],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |Corresponding_Angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        Corresponding_Angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        if (!(this.comingFrom === 'prev')) {
          threeLines.moveToFuturePositions(done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        if (!(this.comingFrom === 'prev')) {
          threeLines.setFuturePositions();
        }
        threeLines.correspondingToggleAngles(false, true);
      },
      // setSteadyState: () => {
      //   threeLines.correspondingToggleAngles(false, true);
      // },
    });

    const commonCorresponding = {
      setEnterState: () => {
        threeLines._line1.setColor(layout.colors.line);
        threeLines._line2.setColor(layout.colors.disabled);
      },
      setSteadyState: () => {
        threeLines.correspondingToggleAngles(true);
        threeLines._line1.move.type = 'translation';
        threeLines._line1.move.element = threeLines._line1;
        threeLines._line1.move.maxTransform.updateTranslation(
          10,
          layout.line1.corresponding.position.y,
        );
        threeLines._line1.move.minTransform.updateTranslation(
          -10,
          layout.line2.corresponding.position.y,
        );
        threeLines._line2.showAll();
        threeLines._line2.isTouchable = false;
        threeLines._line2.hasTouchableElements = false;
      },
      setLeaveState: () => {
        threeLines._line1.move.type = 'rotation';
        threeLines._line1.move.element = threeLines;
        threeLines._line2.isTouchable = true;
        threeLines._line2.hasTouchableElements = true;
      },
    };

    this.addSection(common, commonCorresponding, {
      setContent: `
        <p>
          When two lines intersect, an |angle| is formed. This angle doesn't change when one line is |moved| without rotation.
        </p>
      `,
      interactiveElementsRemove: [
        threeLines._line2,
      ],
      modifiers: {
        angle: click(threeLines.correspondingToggleAngles, [threeLines, true], colors.angleA),
        moved: click(
          threeLines.correspondingTranslateLine1,
          [threeLines], colors.line,
        ),
      },
      setInfo: [
        '<ul>',
        '<li>Move the horizontal line to see if the angle changes.</li>',
        '<li>Touch |moved| to move the line a random distance.</li>',
        '<li>Touch |angle| text to toggle the angles.</li>',
        '</ul>',
      ],
      infoModifiers: {
        angle: highlight(colors.angleA),
        moved: highlight(colors.line),
      },
      setEnterState: () => {
        commonCorresponding.setEnterState();
        if (this.comingFrom !== 'next') {
          threeLines.moveLine1ToLine2();
          threeLines.correspondingTranslateLine1Future(0.5);
        }
      },
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'next') {
          threeLines.moveToFuturePositions(2, done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        commonCorresponding.setSteadyState();
        if (this.comingFrom !== 'next') {
          threeLines.setFuturePositions();
        }
      },
    });

    this.addSection(common, commonCorresponding, {
      setContent: `
        <p>
          |Moving| a line without rotation means the line is |parallel| to its original.
        </p>
      `,
      modifiers: {
        Moving: click(threeLines.correspondingTranslateLine1, [threeLines], colors.line),
        parallel: click(threeLines.pulseParallel, [threeLines], colors.line),
      },
      setInfo: [
        '<ul>',
        '<li>Move the horizontal line to see if the angle changes.</li>',
        '<li>Touch |Moving| text to move the line a random distance.</li>',
        '</ul>',
      ],
      infoModifiers: {
        Moving: highlight(colors.line),
      },
      interactiveElementsRemove: [
        threeLines._line2,
      ],
      setSteadyState: () => {
        commonCorresponding.setSteadyState();
        threeLines.correspondingToggleAngles(true);
      },
    });

    this.addSection(common, commonCorresponding, {
      setContent: `
        <p>
          Therefore comparing the original and moved line, shows |corresponding_angles| are |equal|.
        </p>
      `,
      modifiers: {
        corresponding_angles: click(
          threeLines.correspondingToggleAngles, [threeLines, false, false],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |corresponding_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        corresponding_angles: highlight(colors.angleA),
      },
      interactiveElementsRemove: [
        threeLines._line2,
      ],
      setEnterState: () => {
        commonCorresponding.setEnterState();
        if (this.comingFrom !== 'prev') {
          threeLines.moveLine1ToLine2();
          threeLines.correspondingTranslateLine1Future(0.5);
        }
      },
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'prev') {
          threeLines.moveToFuturePositions(done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        if (this.comingFrom !== 'prev') {
          threeLines.setFuturePositions();
        }
        commonCorresponding.setSteadyState();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          In general, |corresponding_angles| are always |equal| when the two lines being intersected are parallel.
        </p>
      `,
      modifiers: {
        corresponding_angles: click(
          threeLines.correspondingToggleAngles, [threeLines, false, false],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |corresponding_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        corresponding_angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.correspondingToggleAngles(false, false);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, {
      title: 'Alternate Angles',
      setContent: `
        <p>
          |Alternate_angles| are the angles that are on opposite sides of the |intersecting| and |parallel_lines|.
        </p>
      `,
      modifiers: {
        Alternate_angles: click(
          threeLines.alternateToggleAngles, [threeLines, true],
          colors.angleA,
        ),
        parallel_lines: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |Alternate_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        Alternate_angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.alternateToggleAngles(true);
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          How can relationship between |alternate_angles| be determined?
        </p>
      `,
      modifiers: {
        alternate_angles: click(
          threeLines.alternateToggleAngles, [threeLines, true],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |Alternate_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        Alternate_angles: highlight(colors.angleA),
      },
      setSteadyState: () => {
        threeLines.alternateToggleAngles(true);
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          First, we know |corresponding_angles| are equal.
        </p>
      `,
      modifiers: {
        corresponding_angles: click(
          threeLines.alternateShowCorrespondingAngles, [threeLines],
          colors.angleB,
        ),
      },
      setSteadyState: () => {
        threeLines.alternateShowCorrespondingAngles();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          We also know that |opposite_angles| are equal.
        </p>
      `,
      modifiers: {
        opposite_angles: click(
          threeLines.alternateShowOppositeAngles, [threeLines],
          colors.angleC,
        ),
      },
      setSteadyState: () => {
        threeLines.alternateShowOppositeAngles();
      },
    });
    this.addSection(common, {
      setContent: `
        <p>
          Therefore |alternate_angles| are equal.
        </p>
      `,
      modifiers: {
        alternate_angles: click(
          threeLines.alternateToggleAngles, [threeLines],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |alternate_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        alternate_angles: highlight(colors.angleA),
      },
      setSteadyState: () => {
        threeLines.alternateToggleAngles();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          In general, all |alternate_angles| are equal when a line intersects with parallel lines.
        </p>
      `,
      modifiers: {
        alternate_angles: click(
          threeLines.alternateToggleAngles, [threeLines],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |alternate_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        alternate_angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.alternateToggleAngles();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, {
      title: 'Interior Angles',
      setContent: `
        <p>
          |Interior_angles| are the inside angles on the same side of the |intersecting| line that crosses |two_lines|.
        </p>
      `,
      modifiers: {
        Interior_angles: click(
          threeLines.interiorToggleAngles, [threeLines, true],
          colors.angleA,
        ),
        parallel: click(threeLines.pulseParallel, [threeLines], colors.line),
        two_lines: click(threeLines.pulseParallel, [threeLines], colors.line),
        intersecting: click(threeLines.pulseLine, [threeLines, 3], colors.intersectingLine),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |Interior_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        Interior_angles: highlight(colors.angleA),
      },
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.interiorToggleAngles(true);
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          How can the relationship between |interior_angles| be determined?
        </p>
      `,
      modifiers: {
        Interior_angles: click(
          threeLines.interiorToggleAngles, [threeLines, true],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |interior_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        interior_angles: highlight(colors.angleA),
      },
      setSteadyState: () => {
        threeLines.interiorToggleAngles(true);
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          First, we know |corresponding_angles| are equal.
        </p>
      `,
      modifiers: {
        corresponding_angles: click(
          threeLines.interiorShowCorresponding, [threeLines],
          colors.angleB,
        ),
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines._angleA1.show();
        threeLines.interiorShowCorresponding();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          We also know that |supplementary| angles add up to ${unit('|180&deg;|', '|&pi; radians|')}.
        </p>
      `,
      modifiers: {
        supplementary: click(
          threeLines.interiorShowSupplementary, [threeLines],
          colors.angleC,
        ),
      },
      setEnterState: () => {
        common.setEnterState();
        diag._unitsSelector.select(diag.units);
      },
      show: [
        diag._unitsSelector, ...common.show,
      ],
      setSteadyState: () => {
        threeLines.interiorShowSupplementary();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          Adding the |interior| angles shows they add up to ${unit('|180&deg;|', '|&pi; radians|')}.
        </p>
      `,
      modifiers: {
        interior: click(
          threeLines.interiorShowInterior, [threeLines],
          colors.angleA,
        ),
      },
      setEnterState: () => {
        common.setEnterState();
        diag._unitsSelector.select(diag.units);
      },
      show: [
        diag._unitsSelector, ...common.show,
      ],
      setSteadyState: () => {
        threeLines.interiorShowInterior();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          In general, for any line intersecting any parallel lines, the |interior_angles| always add up to ${unit('|180&deg;|', '|&pi; radians|')}.
        </p>
      `,
      modifiers: {
        interior_angles: click(
          threeLines.interiorToggleAngles, [threeLines],
          colors.angleA,
        ),
      },
      setInfo: [
        ...oppCommon.setInfo.slice(0, 2),
        '<li>Touch |interior_angles| text to toggle the angles.</li>',
        ...oppCommon.setInfo.slice(2),
      ],
      infoModifiers: {
        interior_angles: highlight(colors.angleA),
      },
      setEnterState: () => {
        common.setEnterState();
        diag._unitsSelector.select(diag.units);
      },
      show: [
        diag._unitsSelector, ...common.show,
      ],
      transitionFromAny: (done) => {
        threeLines.moveToFuturePositions(done);
      },
      setSteadyState: () => {
        threeLines.setFuturePositions();
        threeLines.interiorToggleAngles();
      },
    });

    this.addSection({
      title: 'Conculsion',
      setContent: centerV(`
        <p>
          When two lines intersect, or one line intersects a pair of parallel lines, the knowledge of |opposite|, |corresponding| and |alternate| and |interior| angles can be used to find all angles in the system.
        </p>
        <p>
          However, you don't necessarily need to remember these relationships to use them.
        </p>
        <p>
          If you forget, you can always figure them out, just using |supplementary angles|!
        </p>
      `),
    });
  }
}

export default Content;
