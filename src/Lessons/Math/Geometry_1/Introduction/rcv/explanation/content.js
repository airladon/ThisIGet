// @flow
import Fig from 'figureone';
import {
  LessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/LessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  // click,
  centerV,
  // highlight,
  // clickWord,
} = Fig.tools.html;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends LessonContent {
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
    const rcv = diag._collection;

    const common = {
      setContent: '',
      modifiers: {},
      infoModifiers: {},
      interactiveElements: [
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    const axis = [rcv._zeroLine, rcv._halfLine, rcv._fullLine];
    this.addSection({
      setContent: 'Round 1',
      setSteadyState: () => {
        rcv.rounds[0].order.forEach((name) => {
          const element = rcv[`_0total${name}`];
          element.setScenario('end');
          element.showAll();
        });
      },
      show: axis,
    });

    for (let roundIndex = 1; roundIndex < rcv.rounds.length; roundIndex += 1) {
      const round = rcv.rounds[roundIndex];
      const lastRound = rcv.rounds[roundIndex - 1];
      const lastRoundTotalElements = [];
      const thisRoundDeltaElements = [];
      const thisRoundTotalElements = [];

      lastRound.order.forEach((name) => {
        const element = rcv[`_${roundIndex - 1}total${name}`];
        lastRoundTotalElements.push(element);
      });

      round.order.forEach((name) => {
        const totalElement = rcv[`_${roundIndex}total${name}`];
        const deltaElement = rcv[`_${roundIndex}delta${name}`];
        thisRoundDeltaElements.push(deltaElement);
        thisRoundTotalElements.push(totalElement);
      });

      this.addSection(common, {
        setContent: `Round ${roundIndex + 1}`,
        show: [...axis, ...lastRoundTotalElements],
        setEnterState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.setScenario('start');
          });
          lastRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
        },
        transitionFromPrev: (done) => {
          lastRoundTotalElements[0].animations.new()
            .scenario({ target: 'remove', duration: 1 })
            .opacity({ target: 0.5, duration: 1 })
            .whenFinished(done)
            .start();

          thisRoundDeltaElements.forEach((element) => {
            element.show();
            element._line.animations.new()
              .dissolveIn({ duration: 2, delay: 1.1 })
              .start();
            element._label.animations.new()
              .dissolveIn({ duration: 2, delay: 1.1 })
              .start();
          });
        },
        setSteadyState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.showAll();
          });
          lastRoundTotalElements[0].setScenario('remove');
          lastRoundTotalElements[0].setOpacity(0.5);
        },
        setLeaveState: () => {
          lastRoundTotalElements[0].setOpacity(1);
        },
      });

      this.addSection(common, {
        setContent: `Round ${roundIndex + 1}`,
        show: [...axis, ...lastRoundTotalElements, ...thisRoundDeltaElements],
        setEnterState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.setScenario('start');
          });
          lastRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundTotalElements[0].setScenario('remove');
          lastRoundTotalElements[0].setOpacity(0.5);
        },
        transitionFromPrev: (done) => {
          let callbackToUse = done;
          thisRoundDeltaElements.forEach((element) => {
            element.animations.new()
              .scenario({
                target: 'end',
                duration: 1,
                delay: 1,
                translationStyle: 'curved',
                translationOptions: {
                  rot: 1,
                  magnitude: 1,
                  offset: 0,
                  controlPoint: null,
                  direction: 'up',
                },
              })
              .whenFinished(callbackToUse)
              .start();
            callbackToUse = null;
          });
          lastRoundTotalElements[0].animations.new()
            .dissolveOut({ duration: 1 })
            .start();
        },
        setSteadyState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundTotalElements[0].hide();
        },
        setLeaveState: () => {
          lastRoundTotalElements[0].setOpacity(1);
        },
      });

      this.addSection(common, {
        setContent: `Round ${roundIndex + 1}`,
        show: [...axis, ...thisRoundTotalElements],
        setEnterState: () => {
          thisRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
        },
      });
    }
  }
}

export default Content;
