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
      // 'Math/Geometry_1/Triangles/base',
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
        angles: click(coll.pulseNewAngles, [coll], colors.sides),
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
      },
    });
  }
}

export default Content;
