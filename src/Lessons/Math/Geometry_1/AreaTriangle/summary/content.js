// @flow
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
// import {
//   click,
// } from '../../../../../js/tools/htmlGenerator';
import LessonDiagram from './diagram';
// import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const layout = lessonLayout();
// const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new LessonDiagram(htmlId, layout);
  }

  addSections() {
    const diag = this.diagram.elements;
    const tri = diag._tri;

    this.addSection({
      title: 'Area of a Triangle',
      setContent: 'The |area of a triangle| is equal to |half its base times its height|.',
      showOnly: [tri],
      show: [
        tri._tri2,
      ],
      transitionFromNext: (done) => {
        tri.moveToScenario(tri._tri2, layout.tri2Scenario, 1, done, 0);
      },
      setSteadyState: () => {
        tri._sideTri2Base.showAll();
        tri._sideTri2Height.showAll();
        tri.eqns.tri2AreaEqn.showForm('10');
      },
    });

    this.addSection({
      setContent: '|Area| can be calculated with any side as the |base|.',
      showOnly: [tri],
      show: [
        tri._tri2,
      ],
      transitionFromPrev: (done) => {
        tri.moveToScenario(tri._tri2, layout.tri3Scenario, 1, done, 0);
      },
      setSteadyState: () => {
        tri.setScenario(tri._tri2, layout.tri3Scenario);
        tri._sideTri3Base.showAll();
        tri._sideTri3Height.showAll();
        tri.eqns.tri3AreaEqn.showForm('10');
      },
    });
  }
}

export default Content;
