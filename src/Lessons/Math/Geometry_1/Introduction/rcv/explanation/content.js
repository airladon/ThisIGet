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

    this.addSection({
      setContent: 'Round 1',
      setSteadyState: () => {
        rcv.rounds[0].order.forEach((name) => {
          const element = rcv[`_0${name}`];
          element.setScenario('end');
          element.showAll();
        });
      },
      show: [rcv._zeroLine, rcv._halfLine, rcv._fullLine],
    });

    rcv.rounds.forEach((round, roundIndex) => {
      if (roundIndex > 0) {
        const elementsToShow = [];
        const thisRoundElements = [];
        const remainingCandidates = round.order;
        for (let i = 0; i <= roundIndex; i += 1) {
          const candidatesInRound = rcv.rounds[i].order;
          for (let j = 0; j < candidatesInRound.length; j += 1) {
            const name = candidatesInRound[j];
            if (remainingCandidates.indexOf(name) > -1) {
              const element = rcv[`_${i}${name}`];
              elementsToShow.push(element);
              if (i === roundIndex) {
                thisRoundElements.push(element);
              }
            }
          }
        }
        // this.addSection(common, {
        //   setContent: `Round ${roundIndex + 1}`,
        //   show: [...elementsToShow, rcv._zeroLine, rcv._halfLine, rcv._fullLine],
        //   setEnterState: () => {
        //     elementsToShow.forEach((element) => {
        //       element.setScenario('end');
        //     });
        //   },
        //   setSteadyState: () => {
        //     elementsToShow.forEach((element) => {
        //       if (element.name.charAt(0) === roundIndex.toString()) {
        //         element.setScenario('start');
        //       }
        //     });
        //   },
        // });
        this.addSection(common, {
          setContent: `Round ${roundIndex + 1}`,
          show: [...elementsToShow, rcv._zeroLine, rcv._halfLine, rcv._fullLine],
          transitionFromPrev: (done) => {
            let callbackToUse = done;
            thisRoundElements.forEach((element) => {
              if (element.length > 0) {
                element.animations.cancelAll();
                element.animations.new()
                  .scenario({
                    target: 'end',
                    duration: 1.5,
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
              }
            });
          },
          setSteadyState: () => {
            elementsToShow.forEach((element) => {
              element.setScenario('end');
            });
          },
        });
      }
    });
  }
}

export default Content;
