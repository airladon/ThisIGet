// @flow
// import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';

// const {
//   click,
//   centerV,
// } = Fig.tools.html;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends PresentationLessonContent {
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
    const coll = diag._collection;
    const area1 = coll._area1;
    const area2 = coll._area2;
    const eqn = coll._eqn;

    this.addSection({
      setContent: [
        'The area of a triangle is equal to |half its base times its height|.',
      ],
      show: [area1._tri, area1._base, area1._height],
      setSteadyState: () => {
        coll.setScenarios('summary');
        eqn.showForm('10');
      },
    });

    this.addSection({
      setContent: [
        '|Area| can be calculated with |any| side as the |base|.',
      ],
      show: [area1._tri],
      transitionFromPrev: (done) => {
        area1.animations.cancelAll();
        area1.animations.new()
          .scenario({ target: 'summary2', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        area1.hide();
        area2._tri.showAll();
        area2._height.showAll();
        area2._base.showAll();
        coll.setScenarios('summary');
        eqn.showForm('30');
      },
    });
  }
}

export default Content;
