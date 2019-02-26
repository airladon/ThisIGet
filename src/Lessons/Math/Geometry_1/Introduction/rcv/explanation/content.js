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
  centerVH,
  // highlight,
  // clickWord,
} = Fig.tools.html;

const { Point } = Fig;
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

    this.addSection({
      setContent: centerVH(['|Rank Choice Voting|', 'Counting Process']),
    });
    this.addSection({
      setContent: centerVH([
        `Total votes: ${rcv.rounds[0].data.length}`,
        `Votes needed to win: ${Math.floor(rcv.rounds[0].data.length / 2) + 1}`,
      ]),
    });
    const axis = [rcv._zeroLine, rcv._halfLine, rcv._fullLine];
    this.addSection({
      setContent: 'Count Round 1',
      setSteadyState: () => {
        rcv.rounds[0].order.forEach((name) => {
          const element = rcv[`_0total${name}`];
          element.setScenario('end');
          element.showAll();
          const nameElement = rcv[`_${name}`];
          nameElement.showAll();
          nameElement.setScenario('base');
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
      const lastRoundNameElements = [];

      lastRound.order.forEach((name) => {
        const element = rcv[`_${roundIndex - 1}total${name}`];
        const nameElement = rcv[`_${name}`];
        lastRoundTotalElements.push(element);
        lastRoundNameElements.push(nameElement);
      });

      round.order.forEach((name) => {
        const totalElement = rcv[`_${roundIndex}total${name}`];
        const deltaElement = rcv[`_${roundIndex}delta${name}`];
        thisRoundDeltaElements.push(deltaElement);
        thisRoundTotalElements.push(totalElement);
      });
      // console.log(lastRoundNameElements)

      // Move candidate to remove and show preference votes
      this.addSection(common, {
        setContent: `Count Round ${roundIndex + 1}`,
        show: [...axis, ...lastRoundTotalElements, ...lastRoundNameElements],
        setEnterState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.setScenario('start');
          });
          lastRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundNameElements.forEach((element) => {
            element.setScenario('base');
          });
        },
        transitionFromPrev: (done) => {
          lastRoundTotalElements[0].animations.new()
            .scenario({ target: 'remove', duration: 1 })
            .opacity({ target: 0.5, duration: 1 })
            .whenFinished(done)
            .start();

          lastRoundNameElements[0].animations.new()
            .scenario({ target: 'remove', duration: 1 })
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
          lastRoundNameElements[0].setScenario('remove');
        },
        setLeaveState: () => {
          lastRoundTotalElements[0].setOpacity(1);
        },
      });

      // Move preferences onto remaining candidates
      this.addSection(common, {
        setContent: `Count Round ${roundIndex + 1}`,
        show: [
          ...axis, ...lastRoundTotalElements,
          ...thisRoundDeltaElements, ...lastRoundNameElements,
        ],
        setEnterState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.setScenario('start');
          });
          lastRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundNameElements.forEach((element) => {
            element.setScenario('base');
          });
          lastRoundNameElements[0].setScenario('remove');
          lastRoundTotalElements[0].setScenario('remove');
          lastRoundTotalElements[0].setOpacity(0.5);
        },
        transitionFromPrev: (done) => {
          // let callbackToUse = done;
          let delay = 1;
          thisRoundDeltaElements.reverse().forEach((element) => {
            element.animations.new()
              .scenario({
                target: 'end',
                duration: 1.5,
                delay,
                translationStyle: 'curved',
                translationOptions: {
                  rot: 1,
                  magnitude: 0.8,
                  offset: 0,
                  controlPoint: null,
                  direction: 'up',
                },
              })
              // .whenFinished(callbackToUse)
              .start();
            delay += 1.5;
            // callbackToUse = null;
          });
          thisRoundDeltaElements.reverse();
          lastRoundTotalElements[0].animations.new()
            .dissolveOut({ duration: 1 })
            .start();
          lastRoundNameElements[0].animations.new()
            .dissolveOut({ duration: 1 })
            .start();
          rcv.animations.new()
            .delay(delay)
            .whenFinished(done)
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
          lastRoundNameElements[0].hide();
        },
        setLeaveState: () => {
          lastRoundTotalElements[0].setOpacity(1);
        },
      });

      // Join remaining candidates votes and preferences into just votes
      this.addSection(common, {
        setContent: `Count Round ${roundIndex + 1}`,
        show: [
          ...axis, ...thisRoundTotalElements,
          ...lastRoundTotalElements, ...thisRoundDeltaElements,
          ...lastRoundNameElements,
        ],
        setEnterState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundTotalElements.forEach((element) => {
            element.setScenario('end');
          });
          lastRoundTotalElements[0].hide();
          lastRoundNameElements.forEach((element) => {
            element.setScenario('base');
          });
          lastRoundNameElements[0].hide();
          thisRoundTotalElements.forEach((element) => {
            element.setScenario('end');
            element.hide();
          });
        },
        transitionFromPrev: (done) => {
          lastRoundTotalElements[0].hide();
          lastRoundNameElements[0].hide();
          thisRoundDeltaElements.forEach((element) => {
            element._label.animations.new()
              .dissolveOut({ duration: 1 })
              .start();
          });
          lastRoundTotalElements.forEach((element, index) => {
            if (index > 0) {
              element._label.animations.new()
                .dissolveOut({ duration: 1 })
                .start();
            }
          });
          thisRoundTotalElements.forEach((element, index) => {
            element._line.animations.new()
              .dissolveIn({ duration: 1 })
              .start();
            const delay = 1;
            element._label.animations.new()
              .dissolveIn({ duration: 1, delay })
              .start();
          });
          rcv.animations.new()
            .delay(2)
            .whenFinished(done)
            .start();
        },
        setSteadyState: () => {
          thisRoundDeltaElements.forEach((element) => {
            element.hide();
          });
          lastRoundTotalElements.forEach((element) => {
            element.hide();
          });
          thisRoundTotalElements.forEach((element) => {
            element.show();
          });
          lastRoundNameElements[0].hide();
        },
      });
    }
  }
}

export default Content;
