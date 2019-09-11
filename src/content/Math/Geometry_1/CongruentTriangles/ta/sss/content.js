// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../common/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';

const {
  // centerV,
  // click,
  style,
  // highlight,
  // highlightWord,
} = Fig.tools.html;

// const { Point } = Fig;

const layout = lessonLayout();
// const { colors } = layout;

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
        'If you have two triangles with the same side lengths, are they |congruent| (the same)?',
        'In other words, if you have three fixed side lengths, |how many different triangles| can you make?',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        '|Experiment| with the diagram on the next page.',
        'Change the size and separation of the circles, and rotate the left and right sides to form explore.',
      ]),
    });

    this.addSection({
      show: [
        sss._circ1, sss._circ2, sss._pad1, sss._pad2,
        sss._rad1, sss._rad2, sss._baseLine,
      ],
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
      setInfo: [
        'Change the length of the horizontal side by dragging the circle center points',
        'Change the length of the left and right sides by dragging the circle edges',
        'Change the rotation of the left and right sides by dragging the sides themselves',
      ],
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
