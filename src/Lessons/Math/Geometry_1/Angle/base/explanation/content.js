// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
// import { easeinout } from '../../../../js/diagram/tools/mathtools';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import lessonLayout from './layout';
import details from '../../details';

const {
  click, highlightWord, centerVH, centerV,
} = Fig.tools.html;
const { Transform } = Fig;
const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new LessonDiagram(htmlId);
  }

  addSections() {
    const shapes = this.diagram.elements._shapes;
    const circle = this.diagram.elements._circle;

    this.addSection({
      title: 'Corners',
      setContent: () => `<p>
          Many |_shapes| have |_corners|.
        </p> <p>
          Somes corners are |_more_sharp|, while others are |_less_sharp|.
        </p><p style="margin-top:33%">
          The |_sharpness| of the corner is a property that can describe a shape.
        </p>`,
      modifiers: {
        // _shapes: actionWord('shapes', 'id_shapes', colors.lines),
        _shapes: click(shapes.pulseShapes, [shapes], colors.lines),
        _corners: click(shapes.toggleCorners, [shapes], colors.corners),
        _more_sharp: click(shapes.toggleMoreSharpCorners, [shapes], colors.moreSharp),
        _less_sharp: click(shapes.toggleLessSharpCorners, [shapes], colors.lessSharp),
        // _corners: actionWord('corners', 'id_corners', colors.corners),
        // _more_sharp: actionWord('more sharp', 'id_more_sharp', colors.moreSharp),
        // _less_sharp: actionWord('less sharp', 'id_less_sharp', colors.lessSharp),
        _sharpness: highlightWord('sharpness', 'english'),
      },
      hideOnly: [
        circle,
        shapes._square._corners,
        shapes._square._lessSharpCorners,
        shapes._triangle._moreSharpCorners,
        shapes._triangle._corners,
        shapes._pent._corners,
        shapes._pent._moreSharpCorners,
        shapes._pent._lessSharpCorners,
      ],
      // setSteadyState: () => {
      //   console.log('Here ');

      //   onClickId('id_shapes', shapes.pulseShapes, [shapes]);
      //   onClickId('id_corners', shapes.toggleCorners, [shapes]);
      //   onClickId('id_more_sharp', shapes.toggleMoreSharpCorners, [shapes]);
      //   onClickId('id_less_sharp', shapes.toggleLessSharpCorners, [shapes]);
      // },
    });

    this.addSection({
      setContent: () => centerVH(`
          <p>
            How can we |_measure| corner sharpness?
          </p> 
          <p>
            What |_name| do we give to the sharpness?
          </p>
        `),
      showOnly: [],
      modifiers: {
        _measure: highlightWord('measure', 'english'),
        _name: highlightWord('name', 'english'),
      },
    });

    this.addSection({
      setContent: () => `
        <p>
          Let's start with two |_lines|.
        </p>
        `,
      modifiers: {
        _lines: click(circle.pulseLines, [circle], colors.reference),
        // _lines: actionWord('lines', 'id_reference_lines', colors.reference),
      },
      showOnly: () => {
        this.diagram.elements.showOnly([
          circle._fakeRadius,
          circle._reference,
          circle,
        ]);
      },
      setSteadyState: () => {
        circle._fakeRadius.transform.updateTranslation(-1, 0);
        circle._fakeRadius.transform.updateRotation(Math.PI / 2);
        circle._reference.transform.updateTranslation(1, 0);
        circle._reference.transform.updateRotation(Math.PI / 2);

        // onClickId('id_reference_lines', circle.pulseLines, [circle]);
      },
      transitionFromAny: (done) => {
        circle._fakeRadius.animateTo(new Transform()
          .rotate(Math.PI / 2)
          .translate(-1, 0), 1);

        circle._reference.animateTo(new Transform()
          .rotate(Math.PI / 2)
          .translate(1, 0), 1, 0, 0, done);
      },
      transitionFromPrev: (done) => {
        circle._fakeRadius.transform.updateTranslation(-4.5, 1);
        circle._fakeRadius.transform.updateRotation(0);
        circle._reference.transform.updateTranslation(4.5, 1);
        circle._reference.transform.updateRotation(Math.PI);
        done();
      },
      transitionFromNext: (done) => {
        circle._fakeRadius.transform = circle._radius.transform._dup();
        done();
      },
    });
    this.addSection({
      setContent: () => `
        <p>
          Move the lines on top of each other and |_anchor| one end.
        </p>
        <p>
          Rotate one line by |_pushing| the free end and a |_corner| is formed.
        </p>
        `,
      modifiers: {
        _anchor: click(circle.pulseAnchor, [circle], colors.anchor),
        _pushing: click(circle.pushRadius, [circle], colors.arrow),
        _corner: click(circle.toggleCorners, [circle], colors.corners),
        // _anchor: actionWord('anchor', 'id_anchor', colors.anchor),
        // _pushing: actionWord('pushing', 'id_push', colors.arrow),
        // _corner: actionWord('corner', 'id_corner', colors.corners),
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._anchor,
      ],
      setSteadyState: () => {
        circle._radius.transform.updateRotation(0.01);
        circle._radius.transform.updateTranslation(0, 0);
        circle._reference.transform.updateRotation(0);
        circle._reference.transform.updateTranslation(0, 0);
        circle._anchor.color = circle.colors.anchor.slice();
        // onClickId('id_anchor', circle.pulseAnchor, [circle]);
        // onClickId('id_push', circle.pushRadius, [circle]);
        // onClickId('id_corner', circle.toggleCorners, [circle]);
        circle._arrow.show();
        circle.pulseArrow();
      },
      transitionPrev: (done) => {
        circle._fakeRadius.transform = circle._radius.transform._dup();
        done();
      },
      transitionFromAny: (done) => {
        circle._reference.animateTo(new Transform()
          .rotate(0)
          .translate(0, 0), 1);
        circle._radius.animateTo(new Transform()
          .rotate(0)
          .translate(0, 0), 1.3, 0, 0, done);

        if (circle._anchor.color[3] === 0.01) {
          circle._anchor.color[3] = 1;
          circle._anchor.disolveInWithDelay(1, 0.3);
        }
      },
      transitionFromPrev: (done) => {
        circle._anchor.color[3] = 0.01;
        circle._radius.transform = circle._fakeRadius.transform._dup();
        done();
      },
    });

    const smallRotation = [circle, Math.PI / 7, 0, 1, () => {}];
    const largeRotation = [circle, 5 * Math.PI / 6, 0, 1, () => {}];
    this.addSection({
      setContent: () => `
        <p>
          |Small_rotation| results in a |_sharp_corner|.
        </p>
        <p>
          |Large_rotation| results in a |_less_sharp_corner|.
        </p>
        `,
      modifiers: {
        Small_rotation: click(circle.rotateTo, smallRotation, colors.moreSharp),
        Large_rotation: click(circle.rotateTo, largeRotation, colors.lessSharp),
        _sharp_corner: click(circle.rotateTo, smallRotation, colors.moreSharp),
        _less_sharp_corner: click(circle.rotateTo, largeRotation, colors.lessSharp),
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._anchor,
      ],
      setSteadyState: () => {
        // const smallRotation = [circle, Math.PI / 7, 0, 1, () => {}];
        // const largeRotation = [circle, 5 * Math.PI / 6, 0, 1, () => {}];
        circle._anchor.color = circle.colors.anchor.slice();
        // onClickId('id_small_rotation', circle.rotateTo, smallRotation);
        // onClickId('id_large_rotation', circle.rotateTo, largeRotation);
        // onClickId('id_sharp_corner', circle.rotateTo, smallRotation);
        // onClickId('id_less_sharp_corner', circle.rotateTo, largeRotation);
        circle._reference.transform.updateTranslation(0, 0);
        circle._reference.transform.updateRotation(0);
        circle._radius.transform.updateTranslation(0, 0);
      },
      transitionFromAny: (done) => {
        if (circle._radius.transform.r() < Math.PI / 6) {
          circle._reference.animateTo(new Transform()
            .rotate(0)
            .translate(0, 0), Math.PI / 6);
          circle._radius.animateTo(new Transform()
            .rotate(0.5)
            .translate(0, 0), Math.PI / 6, 0, 0, done);
        } else {
          done();
        }
      },
    });

    this.addSection({
      title: 'Angle',
      setContent: () => `
        <p>
        So the |_amount| of |_rotation| determines the sharpness of the corner.
        </p>
        `,
      modifiers: {
        _amount: click(circle.pulseAngle, [circle], colors.angleText),
        _rotation: click(circle.pushRadius, [circle], colors.arrow),
        // _amount: actionWord('amount', 'id_amount', colors.angleText),
        // _rotation: actionWord('rotation', 'id_push', colors.arrow),
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._anchor,
        circle._angle,
      ],
      setSteadyState: () => {
        circle._reference.transform.updateTranslation(0, 0);
        circle._reference.transform.updateRotation(0);
        circle._radius.transform.updateTranslation(0, 0);
        // onClickId('id_push', circle.pushRadius, [circle]);
        // onClickId('id_amount', circle.pulseAngle, [circle]);
        // onClickId('id_angle', circle.pulseAngle, [circle]);
        // onClickId('id_corner', circle.toggleCorners, [circle]);
        if (circle._radius.transform.r() < 0.2) {
          circle._radius.transform.updateRotation(Math.PI / 6);
        }
        circle.updateRotation();
      },
    });

    this.addSection({
      setContent: () => centerV(`
          <p>
            What |_name| do we use for corner sharpness?
          </p> 
          <p>
            The |_Latin| word for |_corner| is |_angulus|.</p>
          <p>
            Our word for |_corner_sharpness| comes from this Latin root and is |_angle|.</p>
          </p>
        `),
      showOnly: [],
      modifiers: {
        _angle: highlightWord('angle', 'english'),
        _angulus: highlightWord('angulus', 'latin'),
        _Latin: highlightWord('Latin', 'latin'),
        _corner: highlightWord('corner', 'english'),
        _corner_sharpness: highlightWord('corner sharpness', 'english'),
        _name: highlightWord('name', 'english'),
      },
    });

    this.addSection({
      setContent: () => `
        <p>
        So |_angle| is the word that describes how sharp a corner is.
        </p>
        <p>
        A |_larger_angle| is a less sharp corner, and a |_smaller_angle| is a more sharp corner.
        </p>
        `,
      modifiers: {
        _angle: click(circle.pulseAngle, [circle], colors.angleText),
        _smaller_angle: click(circle.rotateToRandomSmall, [circle, 1, () => {}], colors.moreSharp),
        _larger_angle: click(circle.rotateToRandomLarge, [circle, 1, () => {}], colors.lessSharp),
        // _angle: actionWord('angle', 'id_angle', colors.angleText),
        // _smaller_angle: actionWord('small angle', 'id_small_rotation', colors.moreSharp),
        // _larger_angle: actionWord('large angle', 'id_large_rotation', colors.lessSharp),
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._angle,
      ],
      setSteadyState: () => {
        circle._reference.transform.updateTranslation(0, 0);
        circle._reference.transform.updateRotation(0);
        circle._radius.transform.updateTranslation(0, 0);
        const bindArray = [circle, 1, () => {}];
        circle._anchor.color = circle.colors.anchor.slice();
        // onClickId('id_small_rotation', circle.rotateToRandomSmall, bindArray);
        // onClickId('id_large_rotation', circle.rotateToRandomLarge, bindArray);

        // onClickId('id_angle', circle.pulseAngle, [circle]);
        if (circle._radius.transform.r() < 0.2) {
          circle._radius.transform.updateRotation(Math.PI / 6);
        }
        circle.updateRotation();
      },
    });

    this.addSection({
      setContent: () => centerV(`
          <p>
            Now, describing the angle as more sharp or less sharp is not that useful.
          </p> 
          <p>
            So how can we more precisely describe, or |_measure| the angle?
          </p>
        `),
      showOnly: [],
      modifiers: {
        _measure: highlightWord('measure', 'english'),
        _angle: highlightWord('angle', 'english'),
      },
    });
  }
}

export default Content;
