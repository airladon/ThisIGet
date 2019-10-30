// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  // centerV,
} = Fig.tools.html;

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
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/CongruentTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const examples = coll._examples;
    const eqn = coll._eqn;

    this.addSection({
      title: 'Introduction',
      setContent: [
        'Shapes that have the |same shape|, but are a |different size|, are commonly called |similar_shapes|.',
      ],
      modifiers: {
        similar_shapes: click(coll.pulseSimilar, [coll], colors.diagram.action),
      },
      show: [examples],
      setEnterState: () => {
        examples._circ1.setScenario('small');
        examples._tri1.setScenario('small');
        examples._quad1.setScenario('small');
        examples._circ2.setScenario('large');
        examples._tri2.setScenario('large');
        examples._quad2.setScenario('large');
      },
    });

    this.addSection({
      setContent: [
        'Similar shapes can be |enlarged|, or |reduced| to become the same size (|congruent|).',
      ],
      modifiers: {
        enlarged: click(coll.growExamples, [coll, null], colors.diagram.action),
        reduced: click(coll.reduceExamples, [coll, null], colors.diagram.action),
      },
      show: [examples],
      setEnterState: () => {
        examples._circ1.setScenario('small');
        examples._tri1.setScenario('small');
        examples._quad1.setScenario('small');
        examples._circ2.setScenario('large');
        examples._tri2.setScenario('large');
        examples._quad2.setScenario('large');
      },
    });

    this.addSection({
      setContent: [
        'When a shape\'s size is |changed|, all its sides are changed by the |same proportion|.',
      ],
      modifiers: {
        changed: click(coll.goToOtherBound, [coll, null], colors.diagram.action),
      },
      show: [fig._triScaler],
      setEnterState: () => {
        fig._triScaler.setScenario('base');
        coll.scaleTri();
      },
    });

    let common = {
      show: [fig._tri1, fig._trir],
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('right');
      },
      setSteadyState: () => {
        fig._tri1.hideAngles();
        fig._trir.hideAngles();
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
      },
    };
    this.addSection(common, {
      setContent: [
        'Thus |similar triangles| are triangles whose corresponding sides have the |same proportion| or |ratio|.',
      ],
    });

    let commonContent = {
      setContent: [
        'Now, if we measure the |angles| of these two triangles, we will see they are the |same|.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        same: click(this.next, [this], colors.angles),
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('right');
        coll.setAngles('initial');
      },
      show: [fig._tri1, fig._trir],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        same: click(coll.pulseAngles, [coll], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseAllAngles(done);
      },
    });

    commonContent = {
      setContent: [
        'Is this the case for |any| pair of similar triangles? To find out, let\'s |rename| the angles to be more general.',
      ],
    };
    this.addSection(common, commonContent);

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('right');
        coll.setAngles('general');
        coll.setTri2('initial');
      },
      show: [fig._tri1, fig._trir],
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'Now, let\'s |create| a third triangle using the |base| of the smaller triangle, |angles| on the base of the larger.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        create: this.bindNext(colors.diagram.action),
        base: click(coll.pulseNewBase, [coll], colors.sides),
        angles: click(coll.pulseNewAngles, [coll], colors.angles),
      },
    });

    this.addSection(commonContent, {
      modifiers: {
        create: click(coll.createTriangle, [coll, null], colors.diagram.action),
        base: click(coll.pulseNewBase, [coll], colors.sides),
        angles: click(coll.pulseNewAngles, [coll], colors.angles),
      },
      setEnterState: () => {
        if (this.comingFrom === 'prev') {
          fig._tri1.setScenario('left');
          fig._trir.setScenario('right');
        } else {
          fig._tri1.setScenario('left');
          fig._trir.setScenario('topRight');
        }
        fig._tri2.setScenario('bottomRight');
        fig._tri2.setFirstTransform(fig.lastDrawTransform);
        coll.setAngles('general');
        coll.setTri2('initial');
      },
      transitionFromPrev: (done) => {
        fig._trir.animations.new()
          .scenario({ target: 'topRight', duration: 1 })
          .trigger(coll.createTriangle.bind(coll, done))
          .start();
      },
      show: [fig._tri1, fig._trir],
      setSteadyState: () => {
        fig._trir.setScenario('topRight');
        fig._tri2.showAll();
        coll.setTri2('initial');
      },
    });

    commonContent = {
      setContent: [
        'As all angles in a triangle |add| to 180º, then if you know |two_angles| you can always calculate the |third|.',
      ],
      modifiers: {
        add: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        two_angles: click(coll.pulseNewAnglesOnly, [coll], colors.angles),
        third: click(coll.pulseUnknownAngle, [coll], colors.angles),
      },
    };
    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('initial');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'From the |first_triangle|, we know if there are two angles |a| and |b|, then the third must be |c|.',
      ],
      modifiers: {
        add: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        first_triangle: click(coll.pulseTri1, [coll], colors.sides),
        a: click(coll.pulseA, [coll], colors.angles),
        b: click(coll.pulseB, [coll], colors.angles),
        c: click(coll.pulseC, [coll], colors.angles),
      },
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'Thus the |third_triangle\'s| unknown angle is |c|.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        'third_triangle\'s': click(coll.pulseTri2, [coll], colors.sides),
        c: this.bindNext(colors.angles),
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('abc');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        'third_triangle\'s': click(coll.pulseTri2, [coll], colors.sides),
        c: click(coll.pulseNewC, [coll], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseNewC(done);
      },
    });

    this.addSection(common, {
      setContent: [
        'The |first_triangle| and |third_triangle| have equal angles. We saw earlier that |equiangular triangles are always similar|.',
      ],
      modifiers: {
        first_triangle: click(coll.pulseTri1, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
      },
    });

    commonContent = {
      setContent: [
        'Therefore the |first_triangle| and |third_triangle| are similar, and the sides are proportionally scaled by |r|.',
      ],
      modifiers: {
        first_triangle: click(coll.pulseTri1, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
      },
    };
    this.addSection(common, commonContent);

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.setTri2('all');
        coll.pulseNewSides(done);
      },
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('all');
      },
    });

    commonContent = {
      setContent: [
        'Now we can see the |second_triangle| and |third_triangle| have the same side lengths.',
      ],
      modifiers: {
        second_triangle: click(coll.pulseTrir, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
      },
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'From |SSS| triangle congruence, any two triangles with the same side lengths are |congruent|, and thus both triangles have the |same_angles|.',
      ],
      modifiers: {
        SSS: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
        second_triangle: click(coll.pulseTrir, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
        same_angles: this.bindNext(colors.angles),
      },
    };
    this.addSection(common, commonContent);

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        SSS: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
        second_triangle: click(coll.pulseTrir, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
        same_angles: click(coll.pulseTri2rAngles, [coll], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseTri2rAngles(done);
      },
    });

    this.addSection({
      setContent: 'And so we have shown that |any two similar triangles| will also have the |same corresponding angles|.',
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
      transitionFromPrev: (done) => {
        fig._trir.animations.new()
          .scenario({ target: 'right', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig._trir.setScenario('right');
      },      
    });
  }
}

export default Content;
