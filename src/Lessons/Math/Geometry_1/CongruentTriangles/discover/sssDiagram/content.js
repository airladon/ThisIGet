// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  // centerV,
  click,
  style,
  // highlight,
  // highlightWord,
} = Fig.tools.html;

const { Point } = Fig;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const sss = diag._sss;

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    this.addSection({
      title: 'Side Side Side',
      setContent: style({ centerV: true }, [
        'If you are given three fixed side lengths, how many triangles can you make? Are they the same?',
        'Use this diagram on the next page to experiment with changing the side lengths, and then seeing how many triangles are possible.',
      ]),
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        '|Experiment| by changing the circle\'s sizes and positions.',
      ]),
      show: [
        sss._circ1, sss._circ2, sss._pad1, sss._pad2,
        sss._rad1, sss._rad2, sss._baseLine,
      ],
      // interactiveElements: [
      //   // { element: sss._pad1, location: 'center' },
      //   // { element: sss._pad2, location: 'center' },
      //   { element: sss._circ1._scale, location: [-1, -1] },
      // ],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'next') {
          sss.animations.new()
            .scenarios({ target: 'center', duration: 0.8 })
            .whenFinished(done)
            .start();
          return;
        }
        sss.setScenarios('center');
        done();
      },
      setSteadyState: () => {
        // sss._circ1._scale.interactiveLocation = new Point(0, layout.defaultLen);
        // sss._circ2._scale.interactiveLocation = new Point(0, layout.defaultLen);
        // sss._rad1.interactiveLocation = new Point(0.5, 0);
        // sss._rad2.interactiveLocation = new Point(0.5, 0);
        sss.hasTouchableElements = true;
      },
    });
  }
}

export default Content;
