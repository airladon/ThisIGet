// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';

const { Point } = Fig;
const {
  click, centerV, highlight, clickWord,
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
      'triangle_introduction',
      'congruent_triangles',
      // 'related_angles',
      // 'quadrangles',
      // 'adjacent_angles',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const tri = diag._triangle;
    const aaa = diag._aaa;
    const sas = diag._sas;
    const sss = diag._sss;
    const ssa = diag._ssa;
    const qr = diag._qr;
    let common = {};
    this.addSection({
      title: 'Introduction',
      setContent: centerV(`
        <p>
          In mathematics, if |two shapes are the same size and shape|, then they are said to be |congruent|.
        </p>
        <p>
          The word |congruent| comes from |Latin|, where it means |"agreeing, meeting together"|.
        </p>
      `),
    });
    common = {
      setContent: `
        <p>
          For two triangles to be the same size and shape, and therefore |congruent|, the corresponding |side_lengths| and |angles| and of each triangle must be the same as the other |triangles12|.
        </p>
      `,
      setEnterState: () => {},
      modifiers: {
        side_lengths: click(tri.showLineLabels, [tri, null], colors.lineLabels),
        angles: click(tri.showAngleLabels, [tri, null], colors.angleLabels),
        triangles12: clickWord(
          'triangle\'s', 'id_triangles_angles11',
          this.showQR, [this, 'congruent_triangles', 'Aas'], colors.diagram.action,
        ),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |side_lengths| and |angles| text to toggle the side and angle annotations.</li>',
        '</ul>',
      ],
      infoModifiers: {
        side_lengths: highlight(colors.lineLabels),
        angles: highlight(colors.angleLabels),
      },
      showOnly: [
        tri,
        tri._tri1,
        tri._tri1._line,
        tri._tri2,
        tri._tri2._line,
      ],
    };
    this.addSection(common, {
      setEnterState: () => {
        const lay = layout.triangles.congruent;
        const { scenario } = lay.tri1;
        // qr.hideAll();
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        const lay = layout.triangles.congruent;
        const { scenario } = lay.tri1;
        tri.setTriangleScenarios(lay.points, lay.points, scenario, scenario);
        tri.calcTriFuturePositions(scenario, lay.tri2.scenario);
      },
      transitionFromAny: (done) => {
        tri.moveToFuturePositions(1.5, done);
      },
      setSteadyState: () => {
        tri.setFuturePositions();
        tri._tri1.showAll();
        tri._tri2.showAll();
        // qr.show();
        // qr._triangle_introduction.show();
        // qr._triangle_introduction._Main.show();
      },
    });

    common.setContent = `
        <p>
           If one triangle is |rotated|, the triangles are still congruent as the |side_lengths| and |angles| are the same.
        </p>
      `;
    this.addSection(common, {
      setEnterState: () => {
        const lay = layout.triangles.congruentRot;
        const { scenario } = lay.tri1;
        tri.setTriangleScenarios(lay.points, lay.points, scenario, scenario);
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        const lay = layout.triangles.congruentRot;
        const { scenario } = lay.tri1;
        tri.setTriangleScenarios(lay.points, lay.points, scenario, scenario);
        tri.calcTriFuturePositions(scenario, lay.tri2.scenario);
      },
      transitionFromAny: (done) => {
        tri.moveToFuturePositions(1.5, done);
      },
      setSteadyState: () => {
        tri.setFuturePositions();
        tri._tri1.showAll();
        tri._tri2.showAll();
        tri._tri1.showDimensions(true);
        tri._tri2.showDimensions(true);
      },
    });

    common.setContent = `
        <p>
          If one triangle is |flipped|, the triangles are still congruent as the |side_lengths| and |angles| are the same.
        </p>
      `;
    this.addSection(common, {
      setEnterState: () => {
        const lay = layout.triangles.congruentFlip;
        const { scenario } = lay.tri1;
        tri.setTriangleScenarios(lay.points, lay.points, scenario, scenario);
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        const lay = layout.triangles.congruentFlip;
        const { scenario } = lay.tri1;
        tri.setTriangleScenarios(lay.points, lay.points, scenario, scenario);
        tri.calcTriFuturePositions(scenario, lay.tri2.scenario);
      },
      transitionFromAny: (done) => {
        tri.moveToFuturePositions(1.5, done);
      },
      setSteadyState: () => {
        tri.setFuturePositions();
        tri._tri2.setTriangleCollectionScaleTo(new Point(1, 1));
        tri._tri1.showAll();
        tri._tri2.showAll();
      },
    });

    this.addSection({
      title: 'Determining Congruency',
      setContent: centerV(`
        <p>
          Showing two triangles are congruent can sometimes be beneficial in calculating a geometric problem.
        </p>
        <p>
          When |two triangles are known to be congruent|, unknown angles and lengths of one triangle, can be |inferred| from the other triangle.
        </p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
          So |how| can you figure out if two triangles are congruent?
        </p>
        <p>
          One way is to measure all the angles and sides and see if they are equal.
        </p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
        But this means the advantage of knowing triangles are congruent is reduced as you already know the angles and lengths of both triangles.
        </p>
        <p>
          In addition, |sometimes all properties cannot be measured or known|, so such a comparison is not practical.
        </p>
        <p>
          Therefore, it's important to explore how many side lengths and angles of a triangle really need to be known to guarantee two triangles are congruent.
        </p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
          One way to do this is to take a set of known properties, then figure out how many triangles can be created from them.
        </p>
        <p>
          If |more than one size and shape of triangle| can be created, then the selected properties are |not enough| to guarantee two triangles that share those properties are congruent.
        </p>
      `),
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    this.addSection({
      title: 'Angle Angle Angle',
      setContent: `
        <p>
          First consider when only the three angles are known. Do triangles of different sizes exist that have the same angles?
        </p>
      `,
      showOnly: [
        aaa,
        aaa._tri,
        aaa._tri._line,
        aaa._corner1,
        aaa._corner2,
        aaa._corner3,
      ],
      show: [
        aaa._corner1._angle,
        aaa._corner2._angle,
        aaa._corner3._angle,
      ],
      setSteadyState: () => {
        aaa.setCornerScenarios('AAA');
        aaa._corner1.setTransformCallback = aaa.recalculateTriangle.bind(aaa, 1);
      },
    });
    this.addSection({
      setContent: `
        <p>
          Yes. You can |move| the bottom corners of the triangle to see the same angles can make triangles of different sizes.
        </p>
      `,
      modifiers: {
        move: click(aaa.changeTriangleSize, [aaa, null], colors.diagram.action),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |move| text, or drag the triangle\'s bottom corners to change the triangle size.</li>',
        '</ul>',
      ],
      infoModifiers: {
        move: highlight(colors.diagram.action),
      },
      show: [
        aaa,
      ],
      hide: [
        aaa._corner1._line,
        aaa._corner2._line,
        aaa._corner3._line,
        aaa._tri._dimension12,
        aaa._tri._dimension23,
        aaa._tri._dimension31,
      ],
      setSteadyState: () => {
        aaa.setCornerScenarios('AAA');
        aaa._corner1.setTransformCallback = aaa.recalculateTriangle.bind(aaa, 1);
        aaa._corner2.setTransformCallback = aaa.recalculateTriangle.bind(aaa, 2);
        aaa._corner1._touchPoint.isTouchable = true;
        aaa._corner1._touchPoint.isMovable = true;
        aaa._corner2._touchPoint.isTouchable = true;
        aaa._corner2._touchPoint.isMovable = true;
      },
      setLeaveState: () => {
        aaa._corner1._touchPoint.isTouchable = false;
        aaa._corner1._touchPoint.isMovable = false;
        aaa._corner2._touchPoint.isTouchable = false;
        aaa._corner2._touchPoint.isMovable = false;
      },
    });
    this.addSection({
      setContent: centerV(`
        <p>
          So triangles with the |same angles|, can have |different side lengths|.
        </p>
        <p>
          Only knowing two triangles have the same angles, is |not enough| to know they are congruent.
        </p>
      `),
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    common = {
      setEnterState: () => {
        sas.setCornerScenarios('SASStart');
      },
      showOnly: [sas],
      show: [
        sas._corner1,
      ],
    };
    this.addSection(common, {
      title: 'Side Angle Side',
      setContent: `
        <p>
          Now consider if you know |two side lengths| and the |angle between| those two sides. How many triangles can be made with these constraints?
        </p>
      `,
    });
    this.addSection(common, {
      setContent: `
        <p>
         Well, there is |one_line| that can be drawn that connects the two end points.
        </p>
      `,
      modifiers: { one_line: highlight(colors.diagram.safe) },
    });

    common = {
      showOnly: [sas],
      show: [
        sas._corner1, sas._corner2,
      ],
    };
    this.addSection(common, {
      setContent: `
         <p>
         Well, there is |one_line| that can be drawn that connects the two end points.
        </p>
      `,
      modifiers: {
        one_line: click(
          sas.growCorner, [sas, 2, 0, layout.corner.SAS.c2.side1, 1, false],
          colors.diagram.safe,
        ),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |one_line| text to draw the unknown side.</li>',
        '</ul>',
      ],
      infoModifiers: {
        one_line: highlight(colors.diagram.safe),
      },
      setEnterState: () => {
        sas.setCornerScenarios('SASZero');
      },
      hide: [
        sas._corner2._angle,
      ],
      setSteadyState: () => {
        sas.growCorner(2, 0, layout.corner.SAS.c2.side1, 1, false);
      },
    });
    // common = {
    //   showOnly: [sas],
    //   show: [
    //     sas._corner1, sas._corner2,
    //   ],
    // };
    this.addSection(common, {
      setContent: `
        <p>
        If this line had a |different_length| or had a |different_angle|, it would not form a triangle. Therefore, the remaining side can only have one |length| and |angle|, and so there is |only one possible triangle| from this combination of properties.
        </p>
      `,
      modifiers: {
        length: click(
          sas.growCorner, [sas, 2, null, 1.5, 0.5, false], colors.diagram.safe,
        ),
        angle: click(
          sas.rotateCorner2, [sas, Math.PI / 3, 0.5, false], colors.diagram.safe,
        ),
        different_length: click(
          sas.growCorner, [sas, 2, null, null, 0.5, false], colors.diagram.warning,
        ),
        different_angle: click(
          sas.rotateCorner2, [sas, null, 0.5, false], colors.diagram.warning,
        ),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |length| or |angle| text to make the triangle side the correct length or angle.</li>',
        '<li>Touch the |different_length| and |different_angle| text to make the triangle the incorrect length or angle.</li>',
        '</ul>',
      ],
      infoModifiers: {
        length: highlight(colors.diagram.safe),
        angle: highlight(colors.diagram.safe),
        different_length: highlight(colors.diagram.warning),
        different_angle: highlight(colors.diagram.warning),
      },
      setEnterState: () => {
        sas.setCornerScenarios('SAS');
      },
    });
    this.addSection({
      setContent: `
        <p>
         Therefore if two triangles share |two sides of the same length|, and the |angle between| those two sides is also the same on both triangles, then they |are congruent|.
        </p>
        <p>
          This case is often called the |Side Angle Side| case.
        </p> 
      `,
      setEnterState: () => {
        const lay = layout.triangles.congruentLow;
        tri.setTriangleScenarios(
          lay.points, lay.points,
          lay.tri1.scenario, lay.tri2.scenario,
        );
      },
      showOnly: [
        tri,
        tri._tri1, tri._tri1._line, tri._tri2, tri._tri2._line,
      ],
      show: [
        tri._tri1._angle1, tri._tri1._dimension12, tri._tri1._dimension31,
        tri._tri2._angle1, tri._tri2._dimension12, tri._tri2._dimension31,
      ],
    });


    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    common = {
      setContent: '',
      modifiers: {},
      setEnterState: () => {
        sss.calcFutureLinePositions('SSSStart');
      },
      setInfo: [],
      infoModifiers: {},
      showOnly: [
        sss,
      ],
      show: [
        sss._line1, sss._line2, sss._line3,
      ],
      setSteadyState: () => {
        sss.resetDiagram();
        sss.setFuturePositions();
      },
      setLeaveState: () => {
        sss.resetDiagram();
      },
    };

    common.setContent = `
        <p>
          Next consider the case where only the |three side lengths| are known. How many triangles can be created with just this knowledge?
        </p>
      `;
    this.addSection(common, {
      title: 'Side Side Side',
    });


    common.setContent = `
        <p>
          We know a triangle is formed by connecting the three lines together, so we can start by connecting one line's ends to the other two lines.
        </p>
    `;
    this.addSection(common);
    this.addSection(common, {
      setEnterState: () => {
        sss.calcFutureLinePositions('SSSConnected');
      },
      transitionFromAny: (done) => {
        sss.moveToFuturePositions(1.5, done);
      },
    });


    common.setContent = `
        <p>
          Now, how can the end lines be rotated, to form a triangle, and can only one triangle be formed?
        </p>
    `;
    common.setInfo = [
      '<ul>',
      '<li>Drag the left and right lines to rotate them and see where triangles are formed.',
      '</ul>',
    ];
    common.setEnterState = () => {
      sss.calcFutureLinePositions('SSSConnectedNoRot');
    };
    common.setSteadyState = () => {
      sss.resetDiagram();
      sss.setFuturePositions();
      sss._line2.setMovable(true);
      sss._line3.setMovable(true);
    };
    common.setLeaveState = () => {
      sss.resetDiagram();
      sss._line2.setMovable(false);
      sss._line3.setMovable(false);
    };
    this.addSection(common);


    common.setContent = `
      <p>
        One way to see this is to trace all the possible end locations of the |left| and |right| line.
      </p>
    `;
    common.modifiers = {
      left: click(sss.drawCircle, [sss, 2], colors.diagram.action),
      right: click(sss.drawCircle, [sss, 3], colors.diagram.action),
    };
    common.setInfo = [
      '<ul>',
      '<li>Drag the left and right lines to rotate them and see where triangles are formed.',
      '<li>Touch the |left| and |right| text to trace out the possibilities.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      left: highlight(colors.diagram.action),
      right: highlight(colors.diagram.action),
    };
    this.addSection(common);
    common.show = [...common.show, sss._circ2, sss._circ3];
    this.addSection(common);


    common.setContent = `
      <p>
        There are only |two| locations where the traces meet, and therefore two triangles are possible.
      </p>`;
    common.modifiers = {
      two: click(sss.moveLinesToIntersect, [sss, null], colors.intersect),
    };
    common.setInfo = [
      '<ul>',
      '<li>Drag the left and right lines to rotate them and see where triangles are formed.',
      '<li>Touch the |two| text to show the locations.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      two: highlight(colors.intersect),
    };
    this.addSection(common);
    common.show = [...common.show, sss._intersectUp, sss._intersectDown];
    this.addSection(common);


    common.setContent = `
      <p>
        Now, you might also see that the horizontal line, and circles have |symmetry|.
      </p>
      `;
    common.modifiers = {
      symmetry: highlight(colors.diagram.action),
    };
    common.setInfo = [];
    common.infoModifiers = {};
    this.addSection(common);
    this.addSection(common, { show: [...common.show, sss._symmetry] });
    common.show = [sss._circ2, sss._circ3, sss._symmetry, sss._line1];
    this.addSection(common);
    common.modifiers = {
      symmetry: click(sss.pulseSymmetry, [sss], colors.diagram.action),
    };
    common.setInfo = [
      '<ul>',
      '<li>Touch the |symmetry| text to show the symmetry.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      two: highlight(colors.diagram.action),
    };
    common.show = [...common.show, sss._circ2Shaddow, sss._circ3Shaddow];
    this.addSection(common, {
      transitionFromAny: (done) => {
        sss.pulseSymmetry(done);
      },
    });


    common.setContent = `
      <p>
        This means that the upper triangle is also |symmetric| with the lower triangle.
      </p>
    `;
    common.modifiers = { symmetric: highlight(colors.diagram.action) };
    common.setInfo = [];
    common.infoModifiers = {};
    this.addSection(common);
    common.show = [
      sss._circ2, sss._circ3, sss._symmetry, sss._triangle,
      sss._circ2Shaddow, sss._circ3Shaddow, sss._triangleShaddow,
    ];
    this.addSection(common);
    this.addSection(common, {
      modifiers: {
        symmetric: click(sss.pulseSymmetry, [sss], colors.diagram.action),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |symmetric| text to show the triangle symmetry.</li>',
        '</ul>',
      ],
      infoModifiers: {
        two: highlight(colors.diagram.action),
      },
      transitionFromAny: (done) => {
        sss.pulseSymmetry(done);
      },
    });

    common.setContent = `
      <p>
        Symmetric triangles have the same side lengths and angles, and are therefore |congruent|, so actually there is |only one| size and shape of triangle possible given three side lengths.
      </p>
    `;
    this.addSection(common);

    this.addSection({
      setContent: `
      <p>
        Therefore, when two triangles have the |same side lengths|, they will also have the same angles, and therefore be |congruent|.
      </p>
      <p>
        This case is often referred to as the |Side Side Side| case.
      </p>
      `,
      setEnterState: () => {
        const lay = layout.triangles.congruentLow;
        tri.setTriangleScenarios(
          lay.points, lay.points,
          lay.tri1.scenario, lay.tri2.scenario,
        );
      },
      showOnly: [
        tri,
        tri._tri1, tri._tri1._line, tri._tri2, tri._tri2._line,
      ],
      show: [
        tri._tri1._dimension23, tri._tri1._dimension12, tri._tri1._dimension31,
        tri._tri2._dimension23, tri._tri2._dimension12, tri._tri2._dimension31,
      ],
    });


    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    common = {
      setContent: '',
      modifiers: {},
      setInfo: [],
      infoModifiers: {},
      setEnterState: () => {
        sas.setCornerScenarios('ASAStart');
      },
      showOnly: [
        sas,
      ],
      show: [
        sas._corner1, sas._corner2,
      ],
    };

    common.setContent = `
      <p>
        The next case to consider is where one side and its adjacent angles are known.
      </p>
    `;
    this.addSection(common, {
      title: 'Angle Side Angle',
    });

    common.setContent = `
      <p>
        As the two angles are fixed, the only way to complete the triangle is to |extend| the sides till they meet.
      </p>
    `;
    this.addSection(common, {
      modifiers: { extend: highlight(colors.diagram.action) },
    });
    this.addSection(common, {
      modifiers: {
        extend: click(
          sas.growBothCorners, [
            sas, 0.5, layout.corner.SAS.c1.side2, 0.5,
            layout.corner.SAS.c2.side1,
          ], colors.diagram.action,
        ),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |extend| text to extend the sides.</li>',
        '</ul>',
      ],
      infoModifiers: {
        extend: highlight(colors.diagram.action),
      },
      setSteadyState: () => {
        sas.growBothCorners(0.5, layout.corner.SAS.c1.side2, 0.5, layout.corner.SAS.c2.side1);
      },
    });

    common.setContent = `
      <p>
        Different lengths of the |left| or |right| side will not result in a triangle. Only |one_length| for each side will form the triangle. 
      </p>
    `;
    common.setEnterState = () => {
      sas.setCornerScenarios('ASA');
    };
    this.addSection(common, {
      modifiers: {
        one_length: click(
          sas.growBothCorners, [
            sas, null, layout.corner.SAS.c1.side2, null,
            layout.corner.SAS.c2.side1,
          ], colors.diagram.action,
        ),
        left: click(
          sas.growCorner, [
            sas, 1, null, null, 0.5, false, null, 2, 2.598,
          ], colors.diagram.action,
        ),
        right: click(
          sas.growCorner, [
            sas, 2, null, null, 0.5, false, null, 2, 1.5,
          ], colors.diagram.action,
        ),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |one_length| text to make the sides the correct length.</li>',
        '<li>Touch the |left| and |right| text to make the sides the incorrect length.</li>',
        '</ul>',
      ],
      infoModifiers: {
        one_length: highlight(colors.diagram.action),
        left: highlight(colors.diagram.action),
        right: highlight(colors.diagram.action),
      },
    });
    common.setContent = `
      <p>
        In addition, the remaining unknown angle can be calculated as a |triangles| angles always add up to 180º.
      </p>
    `;
    common.modifiers = {
      triangles: clickWord(
        'triangle\'s', 'id_triangles_angles',
        this.showQR, [this, 'triangle_introduction', 'Main'], colors.diagram.action,
      ),
    };
    common.setInfo = [
      '<ul>',
      '<li>Touch the |triangles| text to show a reference tile explaining the concept and a link to the lesson.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      triangles: highlight(colors.line),
    };
    this.addSection(common);
    common.show = [sas._corner1, sas._corner2, sas._corner3];
    this.addSection(common);

    common.setInfo = [];
    common.infoModifiers = {};
    this.addSection(common, {
      setContent: `
        <p>
          So for a |fixed side between two fixed angles|, there is only one set of side lengths and one set of angles possible. 
        </p>
      `,
    });

    this.addSection({
      setContent: `
      <p>
        Therefore, when two triangles share the same |two angles| and the |side between| them, then they will be |congruent|.
      </p>
      <p>
        This case is often referred to as the |Angle Side Angle| case.
      </p>
      `,
      setEnterState: () => {
        const lay = layout.triangles.congruentLow;
        tri.setTriangleScenarios(
          lay.points, lay.points,
          lay.tri1.scenario, lay.tri2.scenario,
        );
      },
      showOnly: [
        tri,
        tri._tri1, tri._tri1._line, tri._tri2, tri._tri2._line,
      ],
      show: [
        tri._tri1._angle1, tri._tri1._dimension12, tri._tri1._angle2,
        tri._tri2._angle1, tri._tri2._dimension12, tri._tri2._angle2,
      ],
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    common = {
      setContent: '',
      modifiers: {},
      setInfo: [],
      infoModifiers: {},
      setEnterState: () => {
        sas.setCornerScenarios('AASStart');
      },
      showOnly: [
        sas,
      ],
      show: [
        sas._corner1, sas._corner2,
      ],
      setSteadyState: () => {},
    };
    common.setContent = `
      <p>
        The next case is when two angles and a side not between them is known.
      </p>
    `;
    this.addSection(common, {
      title: 'Angle Angle Side',
    });

    common.setContent = `
      <p>
        First, we know the angles in |triangles| always add up to 180º. Therefore, we can calculate the third angle.
      </p>
      `;
    common.modifiers = {
      triangles: click(this.showQR, [this, 'triangle_introduction', 'Main'], colors.diagram.action),
    };
    common.setInfo = [
      '<ul>',
      '<li>Touch the |triangles| text to show a reference tile explaining the concept and a link to the lesson.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      triangles: highlight(colors.line),
    };
    this.addSection(common);
    common.show = [sas._corner1, sas._corner2, sas._corner3];
    this.addSection(common);

    common.setContent = `
      <p>
        The third angle has now given us the |Angle_Side_Angle| case. With this established, we know only one triangle can be formed.
      </p>
    `;
    common.modifiers = {
      Angle_Side_Angle: clickWord(
        'Angle Side Angle', 'id_angle_side_angle',
        this.showQR, [this, 'congruent_triangles', 'Asa'], colors.line,
      ),
    };
    common.setInfo = [
      '<ul>',
      '<li>Touch the |Angle_Side_Angle| text to show a reference tile explaining the concept and a link to the lesson.</li>',
      '</ul>',
    ];
    common.infoModifiers = {
      Angle_Side_Angle: highlight(colors.line),
    };
    this.addSection(common);
    common.setInfo = [];
    common.infoModifiers = {};
    this.addSection({
      setContent: `
      <p>
        Therefore, when two triangles share the same |two angles| and |relatively positioned side| not between those angles, then the triangles will be |congruent|.
      </p>
      <p>
        This case is often referred to as the |Angle Angle Side| case.
      </p>
      `,
      setEnterState: () => {
        const lay = layout.triangles.congruentLow;
        tri.setTriangleScenarios(
          lay.points, lay.points,
          lay.tri1.scenario, lay.tri2.scenario,
        );
      },
      showOnly: [
        tri,
        tri._tri1, tri._tri1._line, tri._tri2, tri._tri2._line,
      ],
      show: [
        tri._tri1._angle1, tri._tri1._dimension12, tri._tri1._angle3,
        tri._tri2._angle1, tri._tri2._dimension12, tri._tri2._angle3,
      ],
    });
    this.addSection({
      setContent: centerV(`
      <p>
        The |Angle Side Angle| and |Angle Angle Side| cases can be combined to be more general as all combinations of two angles and one side is covered between them.
      </p>
      <p>
        Therefore, if two triangles share the same |two angles| and |relatively positioned side|, then the |triangles are congruent|.
      </p>
      `),
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    common = {
      setContent: '',
      modifiers: {},
      setInfo: [],
      infoModifiers: {},
      setEnterState: () => {
        ssa.calcFuturePositions('SSAInitial');
        ssa.setFuturePositions();
      },
      showOnly: [
        ssa, qr,
      ],
      show: [
        ssa._line1, ssa._line2, ssa._lineCorner, ssa._angle,
      ],
      setSteadyState: () => {
        ssa._line2.setMovable(false);
        ssa._line1.setMovable(false);
        ssa._line3.setMovable(false);
      },
      setLeaveState: () => {
        ssa._line1.setMovable(false);
        ssa._line2.setMovable(false);
        ssa._line3.setMovable(false);
      },
    };
    common.setContent = `
      <p>
        Finally, consider the case where an |angle|, an |adjacent side|, and an |opposite side| to the angle are known.
      </p>
    `;
    // common.modifiers = {
    //   can: click(ssa.toggleInterceptAngles, [ssa], colors.diagram.action),
    // };
    this.addSection(common, {
      title: 'Side Side Angle',
    });

    common.setContent = `
      <p>
        How many triangles can be made with this set of constraints?
      </p>
    `;

    this.addSection(common);

    common.setContent = `
      <p>
        To help visualise, we can |extend| the unknown side, and rotate the opposite side while |tracing| its end.
      </p>
    `;
    this.addSection(common);
    this.addSection(common, {
      modifiers: {
        extend: click(ssa.growLine3, [ssa], colors.diagram.action),
        tracing: click(ssa.drawCircle, [ssa], colors.diagram.action),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |extend| text to draw the unknown side construction line.</li>',
        '<li>Touch the |tracing| text to possibilities for the opposite side.</li>',
        '</ul>',
      ],
      infoModifiers: {
        extend: highlight(colors.diagram.action),
        tracing: highlight(colors.diagram.action),
      },
      show: [
        ssa._line1, ssa._line2, ssa._lineCorner, ssa._angle, ssa._line3,
      ],
      transitionFromAny: (done) => {
        ssa.growLine3(done);
      },
      setSteadyState: () => {
        ssa.drawCircle();
      },
      setLeaveState: () => {
        ssa._circ.angleToDraw = -1;
      },
    });

    common.setContent = `
      <p>
        The |intersect| points are then the possible triangles.
      </p>
    `;
    common.setEnterState = () => {
      ssa.calcFuturePositions('SSASecond');
      ssa.setFuturePositions();
    };
    common.show = [
      ssa._line1, ssa._line2, ssa._lineCorner, ssa._angle, ssa._line3,
      ssa._circ,
    ];
    common.setSteadyState = () => {
      ssa._line2.setMovable(true);
      ssa.update();
    };
    this.addSection(common, {
      modifiers: {
        intersect: click(ssa.toggleInterceptAngles, [ssa], colors.diagram.action),
      },
      setInfo: [
        '<ul>',
        '<li>Touch the |intersect| text to show the possible triangles.</li>',
        '</ul>',
      ],
      infoModifiers: {
        intersect: highlight(colors.diagram.action),
      },
    });

    common.setContent = `
      <p>
        In this case, there are two possible |triangles|.
      </p>
    `;
    common.modifiers = {
      triangles: click(ssa.toggleInterceptAngles, [ssa], colors.diagram.action),
    };
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch the |triangles| text to show the possible triangles.</li>',
        '</ul>',
      ],
      infoModifiers: {
        intersect: highlight(colors.diagram.action),
      },
    });

    common.setContent = `
      <p>
        But what happens when we start with a different known |length| or |angle| of the adjacent side? How many |triangles| can be formed then?
      </p>
    `;
    common.modifiers = {
      length: click(ssa._line1.pulseWidth, [ssa], colors.line),
      angle: click(ssa.pulseAngle, [ssa], colors.angleA),
    };
    common.setEnterState = () => {
      ssa.calcFuturePositions('SSA');
      ssa.setFuturePositions();
    };
    this.addSection(common, {
      setInfo: [
        '<ul>',
        '<li>Touch the |length| text to highlight the known adjacent side.</li>',
        '<li>Touch the |angle| text to highlight the known angle side.</li>',
        '</ul>',
      ],
      infoModifiers: {
        length: highlight(colors.line),
        angle: highlight(colors.angleA),
      },
    });

    common.setContent = `
      <p>
        Experiment with this by changing the known angle, rotating the opposite side, and changing the length of adjacent side.
      </p>
    `;
    common.setSteadyState = () => {
      ssa._line1.setMovable(true);
      ssa._line2.setMovable(true);
      ssa._line3.setMovable(true);
      ssa.update();
    };
    common.setInfo = [
      '<ul>',
      '<li>Drag the adjacent side to change its length.</li>',
      '<li>Drag the unknown side to rotate it and change the known angle.</li>',
      '<li>Drag the opposite side to rotate it and change the known angle.</li>',
      '</ul>',
    ];
    this.addSection(common);

    common.setContent = `
      <p>
        You might see different scenarios where |two|, |one| or |zero| triangles can be formed.
      </p>
    `;
    this.addSection(common);

    common.setContent = `
      <p>
        When the |adjacent| side is |shorter| than or equal to the |opposite| side, only |one triangle| can ever be formed.
      </p>
    `;
    common.modifiers = {
      adjacent: click(ssa._line1.pulseWidth, [ssa], colors.line),
      opposite: click(ssa._line2.pulseWidth, [ssa], colors.line),
      shorter: click(ssa.calcNewScenario, [ssa, 'short'], colors.diagram.action),
    };
    this.addSection(common, {
      setInfo: [
        common.setInfo[0],
        '<li>Touch the |adjacent| text to highlight the adjacent side.</li>',
        '<li>Touch the |shorter| text to observe examples.</li>',
        '<li>Touch the |opposite| text to highlight the opposite side.</li>',
        ...common.setInfo.slice(1),
      ],
      infoModifiers: {
        adjacent: highlight(colors.line),
        opposite: highlight(colors.line),
        shorter: highlight(colors.diagram.action),
      },
      setSteadyState: () => {
        ssa._line1.setMovable(true);
        ssa._line2.setMovable(true);
        ssa._line3.setMovable(true);
        ssa.update();
        ssa.calcNewScenario('short');
      },
    });

    common.setContent = `
      <p>
        When the |adjacent| side is |longer| than the |opposite| side, then either |two|, |one| or |zero| triangles are possible.
      </p>
    `;
    common.modifiers = {
      adjacent: click(ssa._line1.pulseWidth, [ssa], colors.line),
      opposite: click(ssa._line2.pulseWidth, [ssa], colors.line),
      two: click(ssa.calcNewScenario, [ssa, 'long2'], colors.diagram.action),
      one: click(ssa.calcNewScenario, [ssa, 'long1'], colors.diagram.action),
      zero: click(ssa.calcNewScenario, [ssa, 'long0'], colors.diagram.action),
    };
    this.addSection(common, {
      setInfo: [
        common.setInfo[0],
        '<li>Touch the |adjacent| text to highlight the adjacent side.</li>',
        '<li>Touch the |opposite| text to highlight the opposite side.</li>',
        '<li>Touch the |two| text to show examples of two triangles.</li>',
        '<li>Touch the |one| text to show examples of one triangles.</li>',
        '<li>Touch the |zero| text to show examples of no triangles.</li>',
        ...common.setInfo.slice(1),
      ],
      infoModifiers: {
        adjacent: highlight(colors.line),
        opposite: highlight(colors.line),
        two: highlight(colors.diagram.action),
        one: highlight(colors.diagram.action),
        zero: highlight(colors.diagram.action),
      },
      setSteadyState: () => {
        ssa._line1.setMovable(true);
        ssa._line2.setMovable(true);
        ssa._line3.setMovable(true);
        ssa.update();
        ssa.calcNewScenario('long2');
      },
    });

    common.setContent = `
      <p>
        Note, that when the |adjacent| side is |longer| than the |opposite| side, |one| triangle is only possible when the third angle is a right angle.
      </p>
    `;
    common.modifiers = {
      adjacent: click(ssa._line1.pulseWidth, [ssa], colors.line),
      opposite: click(ssa._line2.pulseWidth, [ssa], colors.line),
      one: click(ssa.calcNewScenario, [ssa, 'long1'], colors.diagram.action),
    };
    common.show = [
      ssa._line1, ssa._line2, ssa._lineCorner, ssa._angle, ssa._line3,
      ssa._circ, ssa._angle3,
    ];
    this.addSection(common, {
      setInfo: [
        common.setInfo[0],
        '<li>Touch the |adjacent| text to highlight the adjacent side.</li>',
        '<li>Touch the |opposite| text to highlight the opposite side.</li>',
        '<li>Touch the |one| text to show examples of one triangles.</li>',
        ...common.setInfo.slice(1),
      ],
      infoModifiers: {
        adjacent: highlight(colors.line),
        opposite: highlight(colors.line),
        one: highlight(colors.diagram.action),
      },
      setSteadyState: () => {
        ssa._line1.setMovable(true);
        ssa._line2.setMovable(true);
        ssa._line3.setMovable(true);
        ssa.update();
        ssa.calcNewScenario('long1');
      },
    });

    this.addSection({
      setContent: centerV(`
      <p>
        To summarize, if we know an |angle|, an |adjacent side| and an |opposite side| of a triangle, then we can uniquely create just |one triangle if the adjacent side is shorter than or equal to the opposite side|.
        </p>
        <p>
          If the adjacent side is longer than the opposite side, then up to two triangles might be possible.
        </p>
      </p>
      `),
    });
    this.addSection({
      setContent: `
      <p>
        This case is often referred to as the |Side Side Angle| case. 
      </p>
      <p>
        If two triangles have the same |angle (a)|, |adjacent side (C)| and |opposite side (A)|, then we can only be sure they are |congruent| if the |opposite side is longer than or equal to the adjacent side, or A ≥ C|.
      </p>
      `,
      setEnterState: () => {
        const lay = layout.triangles.congruentLow;
        tri.setTriangleScenarios(
          lay.points, lay.points,
          lay.tri1.scenario, lay.tri2.scenario,
        );
      },
      showOnly: [
        tri,
        tri._tri1, tri._tri1._line, tri._tri2, tri._tri2._line,
      ],
      show: [
        tri._tri1._angle1, tri._tri1._dimension12, tri._tri1._dimension23,
        tri._tri2._angle1, tri._tri2._dimension12, tri._tri2._dimension23,
      ],
    });
  }
}

export default Content;
