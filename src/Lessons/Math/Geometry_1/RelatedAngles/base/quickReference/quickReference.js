// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import ThreeLinesCollection from '../common/diagramCollectionThreeLines';
import OppositeCollection from '../common/diagramCollectionOpposite';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';

const { Transform } = Fig;
const { html } = Fig.tools;

function showThreeLines(
  threeLines: ThreeLinesCollection,
  toggleFunction: Function,
  color: Array<number>,
) {
  threeLines.transform.updateScale(0.6, 0.6);
  threeLines.transform.updateRotation(0);
  threeLines.calculateFuturePositions('corresponding');
  threeLines.setFuturePositions();
  threeLines.setPosition(0, 0.3);
  threeLines.show();
  threeLines._line1.showAll();
  // threeLines._line1._end1.show();
  // threeLines._line1._end2.show();
  // threeLines._line1._mid.show();
  threeLines._line2.showAll();
  // threeLines._line2._end1.show();
  // threeLines._line2._end2.show();
  // threeLines._line2._mid.show();
  threeLines._line3.showAll();
  // threeLines._line3._end1.show();
  // threeLines._line3._end2.show();
  // threeLines._line3._mid.show();

  toggleFunction();
  threeLines._line1.setColor(color);
  threeLines._line2.setColor(color);
}

export class QRCorrespondingAngles extends PopupBoxCollection {
  _threeLines: ThreeLinesCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'threeLines',
      ThreeLinesCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      Corresponding_Angles: html.click(
        this._threeLines.correspondingToggleAngles,
        [this._threeLines, null], this.layout.colors.angleA,
      ),
    };

    this.setTitle('Corresponding Angles');
    this.setDescription('|Corresponding_Angles| are angles in the same relative position at the intersection of two lines and an intersecting line. When the two lines are parallel, |corresponding angles are equal|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.55);
    super.show();
    showThreeLines(
      this._threeLines,
      this._threeLines.correspondingToggleAngles.bind(this._threeLines),
      this.layout.colors.line,
    );
  }
}

export class QRAlternateAngles extends PopupBoxCollection {
  _threeLines: ThreeLinesCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'threeLines',
      ThreeLinesCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      Alternate_angles: html.click(
        this._threeLines.alternateToggleAngles,
        [this._threeLines, null], this.layout.colors.angleA,
      ),
    };

    this.setTitle('Alternate Angles');
    this.setDescription('|Alternate_angles| are angles on opposite sides of an intersecting line crossing two lines. When the two lines are parallel, |alternate angles are equal|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.55);
    super.show();
    showThreeLines(
      this._threeLines,
      this._threeLines.alternateToggleAngles.bind(this._threeLines),
      this.layout.colors.line,
    );
  }
}


export class QRInteriorAngles extends PopupBoxCollection {
  _threeLines: ThreeLinesCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'threeLines',
      ThreeLinesCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      Interior_angles: html.click(
        this._threeLines.interiorToggleAngles,
        [this._threeLines, false], this.layout.colors.angleA,
      ),
    };

    this.setTitle('Interior Angles');
    this.setDescription('|Interior_angles| are angles on opposite sides of an intersecting line crossing two lines. When the two lines are parallel, |interior angles add up to 180º (π radians)|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.55);
    super.show();
    this._threeLines.setUnits('deg');
    showThreeLines(
      this._threeLines,
      this._threeLines.interiorToggleAngles.bind(this._threeLines, false),
      this.layout.colors.line,
    );
  }
}

export class QROppositeAngles extends PopupBoxCollection {
  _opposite: OppositeCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'opposite',
      OppositeCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      opposite_angles: html.click(
        this._opposite.toggleOppositeAngles,
        [this._opposite, false], this.layout.colors.angleA,
      ),
    };

    this.setTitle('Opposite Angles');
    this.setDescription('When two lines intersect, the |opposite_angles| at the intersection are always equal.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.55);
    super.show();
    const opp = this._opposite;
    opp.transform.updateScale(0.7, 0.7);

    opp._angleA.setColor(this.layout.colors.angleA);
    opp._angleB.setColor(this.layout.colors.angleB);
    opp._angleC.setColor(this.layout.colors.angleA);
    opp._angleD.setColor(this.layout.colors.angleB);
    opp._line1.setColor(this.layout.colors.intersectingLine);
    opp._line2.setColor(this.layout.colors.intersectingLine);

    opp.calculateFuturePositions();
    opp.setPosition(0, 0.15);

    opp.show();
    opp._angleA.show();
    opp._angleC.show();
    opp._line1.showAll();
    // opp._line1._end1.show();
    // opp._line1._end2.show();
    // opp._line1._mid.show();
    opp._line2.showAll();
    // opp._line2._end1.show();
    // opp._line2._end2.show();
    // opp._line2._mid.show();

    opp.setFuturePositions();
    opp._angleA._arc.show();
    opp._angleC._arc.show();
    opp._angleA.showForm('a');
    opp._angleC.showForm('a');
    // opp.toggleOppositeAngles();
    this.diagram.animateNextFrame();
  }
}


function attachQuickReference() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  window.quickReference[details.details.uid] = {
    Opposite: QROppositeAngles,
    Interior: QRInteriorAngles,
    Alternate: QRAlternateAngles,
    Corresponding: QRCorrespondingAngles,
  };
}

attachQuickReference();
