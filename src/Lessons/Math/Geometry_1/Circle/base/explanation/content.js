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
  click,
  centerV,
  // highlight,
  // clickWord,
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
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    // const collection = diag._collection;
    const objects = diag._objects;
    const circ = diag._circle;
    console.log(diag)

    const common = {
      setContent: '',
      modifiers: {},
      // setInfo: `
      //     <ul>
      //       <li></li>
      //     </ul>
      // `,
      infoModifiers: {},
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    this.addSection(common, {
      title: 'Introduction',
      setContent: centerV([
        'The first shape we will explore is the one you see everytime you look at the |moon|, a |wheel|, a |ball|, or a |ring.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'Their size, mass and material is all very different, but they have a common |shape|.',
      ],
      modifiers: {
        shape: click(objects.objectToCircle, [objects], colors.circle),
      },
      show: [
        objects._moon, objects._wheel, objects._ring, objects._ball,
        objects._circle, objects._activator,
      ],
    });
    this.addSection(common, {
      setContent: centerV([
        'If you were naming this shape today, you might name it after a |familiar object|.',
        'For example, you might call it a |moon| shape or a |ring|.',
        'However, this shape has been studied for thousands of years, and therefore it already has a common name.',
      ]),
    });
    this.addSection(common, {
      setContent: centerV([
        'In ancient |Greek|, this shape was named |krikos|, which was their word for |ring|.',
        'Similarly, |Latin| also used the word for |ring|, with |circulus|.',
        'Today, our name comes from the Latin root, and it is |circle|.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'We can create a circle by |anchoring| a |line| at one end, and tracing the other end while |pushing| it around a |full| rotation.',
      ],
      modifiers: {
        anchoring: click(circ.pulseAnchor, [circ], colors.center),
        line: click(circ.pulseRadius, [circ], colors.radius),
        pushing: click(circ.pushRadius, [circ, null], colors.circle),
        full: click(circ.pushRadius, [circ, Math.PI * 1.999], colors.circle),
      },
      show: [circ._radius, circ._arc, circ._anchor],
      setSteadyState: () => {
        circ._radius.setRotation(0.001);
      },
    });
  }
}

export default Content;
