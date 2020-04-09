// @flow
import Fig from 'figureone';
import { PresentationFormatContent } from './PresentationFormatContent';
import SimpleFormat from './SimpleFormat';
// import Diagram from '../diagram/Diagram';

const { Diagram } = Fig;

function hideInfoButton() {
  const infoButton = document.getElementById('id_topic__info_button');
  if (infoButton instanceof HTMLElement) {
    infoButton.classList.add('topic__info_hide');
  }
}

function hideInteractiveHighlightButton() {
  const interactiveHighlightButton = document
    .getElementById('id_topic__interactive_element_button');
  if (interactiveHighlightButton instanceof HTMLElement) {
    interactiveHighlightButton.classList.add('topic__interactive_element_button__hide');
  }
}

function closeQRs() {
  const presQR = document.getElementById('id_topic__qr__pres_container');
  if (presQR != null) {
    presQR.classList.add('topic__hide');
  }
  const overlay = document.getElementById('presentation_topic__qr__overlay');
  if (overlay != null) {
    overlay.style.zIndex = '-1';
  }
  const staticQR = document.getElementById('id_topic__qr__static_container');
  if (staticQR != null) {
    staticQR.classList.add('topic__hide');
  }
}

// Flow:
//
//  Coming from any section
//    - setEnterState               Guaranteed
//    - showOnly                    Guaranteed
//    - hideOnly                    Guaranteed
//    - show                        Guaranteed
//    - hide                        Guaranteed
//    - setEqnForms                 Guaranteed
//    - afterShow...................Guaranteed
//    - transitionReset             Can be cancelled / skipped
//    - transitionFromPrev/Next     Can be cancelled / skipped
//    - transitionEqnForms          Can be cancelled / skipped
//    - transitionFromAny           Can be cancelled / skipped
//    - setPlannedPositions?        Can be cancelled / skipped
//    - setSteadyState              Guaranteed
//
//  Go to next, prev or goTo
//    - transitionToPrev/Next       Can be cancelled / skipped
//    - transitionToAny             Can be cancelled / skipped
//    - saveState                   Guaranteed
//    - setLeaveState               Guaranteed


// Flow of when a page is first loaded
// Rect Component finishes mounting
//    gotoSection
//    transitionToAny
//    finishTransitionToAny
//    setLeaveStateAndMoveToNextSection
//    setLeaveState
//    refresh -> topic.refreshText called with setState callback
//               callback is then called on topic.component update complete
//
//  When topic.component is finished updating
//    setState
//       setEnterState
//    transitionFromAny
//    finishTransitionFromAny
//    refresh -> topic.refreshText called with componentUpdateComplete
//
//  When topic.component is finished updating
//    componentUpdateComplete
//      setOnclicks
//      setSteadyState
//      setInfoButton
//      setInteractiveElements
//
//  Then ratings will be received asynchronously causing another react
//  component state update, meaning the onclicks need to be set again.

class PresentationFormat extends SimpleFormat {
  content: PresentationFormatContent;

  currentSectionIndex: number;
  diagram: Diagram | null;
  // overlayDiagram: Diagram | null;
  state: Object;
  inTransition: boolean;
  transitionCancelled: boolean;
  comingFrom: 'next' | 'prev' | 'goto' | '' ;
  goingTo: 'next' | 'prev' | 'goto' | '' ;
  refresh: (string, number, ?() => void) => void;
  goToSectionIndex: number;
  firstPageShown: boolean;
  elementStates: Object;
  recorded: Object;
  // type: string;

  //  recorded: {
  //    0: [[x, y, down | up | html click]
  //
  //

  constructor(content: Object) {
    super(content);
    // this.content = content;
    this.diagram = null;
    // this.overlayDiagram = null;
    this.currentSectionIndex = 0;
    this.firstPageShown = true;
    this.state = {};
    this.inTransition = false;
    window.presentationFormatTransitionStatus = 'noSteady';
    this.refresh = function () {}; // eslint-disable-line func-names
    this.comingFrom = '';
    this.transitionCancelled = false;
    this.goToSectionIndex = 0;
    this.type = 'presentation';
    this.elementStates = {};
  }

  getContentHtml(): string {
    let htmlText = '';
    const section = this.content.sections[this.currentSectionIndex];
    htmlText = section.getContent();
    return htmlText;
  }

  nextSection(message: ?string = null) {
    closeQRs();
    if (typeof message === 'string') {
      this.content.message = message;
    }
    const { diagram } = this;
    window.presentationFormatTransitionStatus = 'notSteady';
    if (this.currentSectionIndex < this.content.sections.length - 1 && diagram) {
      // If in transition, then cancel the transition.
      if (this.inTransition) {
        const { firstPageShown } = this;
        const { comingFrom } = this;
        this.stopTransition();
        if (comingFrom === 'prev' || firstPageShown) {
          return;
        }
      } else {
        // Stop diagrams if not in transition to stop any animations.
        this.stopDiagrams();
      }
      this.firstPageShown = false;
      if (this.currentSection().blankTransition.toNext) {
        this.refresh('', this.currentSectionIndex);
      }
      this.content.toggleInfo(false);
      // this.currentSection().goingTo = 'next';
      // this.sections.[this.currentSectionIndex + 1].comingFrom = 'prev';
      this.transitionStart('prev');
      this.goToSectionIndex = this.currentSectionIndex + 1;
      this.currentSection().transitionToNext(this.finishTransToNextOrPrev.bind(this));
    }
    this.renderDiagrams();
  }

  prevSection(message: ?string = null) {
    closeQRs();
    if (typeof message === 'string') {
      this.content.message = message;
    }
    const { diagram } = this;
    window.presentationFormatTransitionStatus = 'notSteady';
    if (this.currentSectionIndex > 0 && diagram) {
      if (this.inTransition) {
        const { comingFrom } = this;
        const { firstPageShown } = this;
        this.stopTransition();
        if (comingFrom === 'next' || firstPageShown) {
          return;
        }
      } else {
        this.stopDiagrams();
      }
      this.firstPageShown = false;
      if (this.currentSection().blankTransition.toNext) {
        this.refresh('', this.currentSectionIndex);
      }
      // this.currentSection().goingTo = 'prev';
      // this.sections.[this.currentSectionIndex + 1].comingFrom = 'next';
      this.content.toggleInfo(false);
      this.transitionStart('next');
      this.goToSectionIndex = this.currentSectionIndex - 1;
      if (this.content.sections[this.currentSectionIndex - 1].skipWhenComingFromNext) {
        if (this.currentSectionIndex - 1 > 0) {
          this.goToSectionIndex = this.currentSectionIndex - 2;
        }
      }
      this.currentSection().transitionToPrev(this.finishTransToNextOrPrev.bind(this));
    }
    this.renderDiagrams();
  }

  goToSection(sectionId: number | string) {
    closeQRs();
    window.presentationFormatTransitionStatus = 'notSteady';
    // console.log('goToSection')
    let sectionIndex = 0;
    if (typeof sectionId === 'number') {
      sectionIndex = sectionId;
    } else {
      this.content.sections.forEach((section, index) => {
        if (section.title === sectionId) {
          sectionIndex = index;
        }
      });
    }
    // this.firstPageShown = false;
    if (sectionIndex >= 0 && sectionIndex < this.content.sections.length) {
      if (this.inTransition) {
        this.stopTransition();
        if (this.firstPageShown) {
          this.firstPageShown = false;
        }
      } else {
        this.stopDiagrams();
      }
      // this.currentSection().goingTo = 'goto';
      // this.sections.[this.currentSectionIndex + 1].comingFrom = 'goto';
      if (this.currentSection().blankTransition.toGoto) {
        this.refresh('', this.currentSectionIndex);
      }
      this.content.toggleInfo(false);
      this.transitionStart('goto');
      this.goToSectionIndex = sectionIndex;
      this.currentSection().transitionToAny(this.finishTransToAny.bind(this));
    }
    this.renderDiagrams();
  }

  transitionStart(direction: 'next' | 'prev' | 'goto' | '' = '') {
    this.transitionCancelled = false;
    this.inTransition = true;
    this.comingFrom = direction;
    if (direction === 'prev') {
      this.content.goingTo = 'next';
      this.content.comingFrom = 'prev';
    } else if (direction === 'next') {
      this.content.goingTo = 'prev';
      this.content.comingFrom = 'next';
    } else {
      this.content.goingTo = 'goto';
      this.content.comingFrom = 'goto';
    }
    const { diagram } = this;
    if (diagram) {
      diagram.inTransition = true;
    }
  }

  finishTransToNextOrPrev() {
    if (this.transitionCancelled) {
      this.finishTransToAny();
    } else {
      this.currentSection().transitionToAny(this.finishTransToAny.bind(this));
    }
  }

  finishTransToAny() {
    // console.log('finishTransToAny')
    this.setLeaveStateAndMoveToNextSection();
  }

  setLeaveStateAndMoveToNextSection() {
    // console.log('setLeaveStateAndMoveToNextSection')
    hideInfoButton();
    hideInteractiveHighlightButton();

    const possibleState = this.currentSection().setLeaveState();
    if (possibleState !== null && possibleState !== undefined) {
      this.state = possibleState;
    }

    this.currentSectionIndex = this.goToSectionIndex;
    this.currentSection().setBlanks();

    let contentHTML = this.getContentHtml();
    if ((this.comingFrom === 'prev' && this.currentSection().blankTransition.fromPrev)
     || (this.comingFrom === 'next' && this.currentSection().blankTransition.fromNext)
     || (this.comingFrom === 'goto' && this.currentSection().blankTransition.fromGoto)) {
      contentHTML = '';
    }
    this.refresh(
      contentHTML, this.currentSectionIndex,
      this.setState.bind(this),
    );
  }

  fadeInTextFromPrev() {
    const section = this.content.sections[this.currentSectionIndex];
    if (section.fadeInFromPrev) {
      const lastSection = this.content.sections[this.currentSectionIndex - 1];
      const thisContent = section.getContent(false);
      const lastContent = lastSection.getContent(false);
      if (thisContent !== lastContent) {
        const element = document.getElementById('id_topic__diagram_text');
        if (element != null) {
          element.classList.add('topic__diagram_text_fade_in');
        }
      }
    }
  }

  setState() {
    // console.log('setState')
    const { diagram } = this;
    const section = this.content.sections[this.currentSectionIndex];
    if (diagram) {
      // this.content.resetToggle();
      section.setEnterState(this.state);
      section.currentInteractiveItem = -1;
      // if (this.overlayDiagram) {
      //   this.overlayDiagram.elements.hideAll();
      // }
      section.setVisible();
      this.renderDiagrams();
      if (this.transitionCancelled) {
        this.finishTransitionFromAny();
      }
      if (this.comingFrom === 'prev') {
        this.fadeInTextFromPrev();
      }
      section.transitionReset(this.finishTransitionReset.bind(this));
      // if (this.comingFrom === 'next') {
      //   section.transitionFromNext(this.finishTransFromNextOrPrev.bind(this));
      // } else if (this.comingFrom === 'prev') {
      //   this.fadeInTextFromPrev();
      //   section.transitionFromPrev(this.finishTransFromNextOrPrev.bind(this));
      // } else {
      //   section.transitionFromAny(this.finishTransitionFromAny.bind(this));
      // }
    }
  }

  finishTransitionReset() {
    if (this.transitionCancelled) {
      this.finishTransitionFromAny();
    } else {
      const section = this.content.sections[this.currentSectionIndex];
      if (this.comingFrom === 'next') {
        section.transitionFromNext(this.finishTransFromNextOrPrev.bind(this));
      } else if (this.comingFrom === 'prev') {
        // this.fadeInTextFromPrev();
        section.transitionFromPrev(this.finishTransFromNextOrPrev.bind(this));
      } else {
        section.transitionEqnForms(this.finishTransitionEqnForms.bind(this));
      }
    }
  }

  finishTransFromNextOrPrev() {
    if (this.transitionCancelled) {
      this.finishTransitionFromAny();
    } else {
      const section = this.content.sections[this.currentSectionIndex];
      section.transitionEqnForms(this.finishTransitionEqnForms.bind(this));
    }
  }

  finishTransitionEqnForms() {
    if (this.transitionCancelled) {
      this.finishTransitionFromAny();
    } else {
      const section = this.content.sections[this.currentSectionIndex];
      section.transitionFromAny(this.finishTransitionFromAny.bind(this));
    }
  }

  finishTransitionFromAny() {
    // console.log('finishTransitionFromAny')
    this.refresh(
      this.getContentHtml(),
      this.currentSectionIndex,
      this.componentUpdateComplete.bind(this),
    );
  }

  setOnclicks() {
    // console.log('setting conclicks')
    const section = this.content.sections[this.currentSectionIndex];
    section.setOnClicks();
    if (section.refresh != null) {
      section.refresh();
    }
    this.setHintOnClicks();
  }


  setHintOnClicks() {
    if (this.elementStates.hints == null) {
      this.elementStates.hints = {};
    }
    const oldStates = this.elementStates.hints;
    this.elementStates.hints = {};
    const hints = document.getElementsByClassName('presentation__hint_label');
    for (let i = 0; i < hints.length; i += 1) {
      const hint = hints[i];
      const parent = hint.parentElement;
      if (parent == null) {
        return;
      }
      const content = parent.querySelector('.presentation__hint__content');
      if (content == null) {
        return;
      }
      if (hint.id in oldStates) {
        const hidden = oldStates[hint.id];
        if (!hidden) {
          content.classList.remove('presentation__hint__content__hidden');
          this.setInteractiveWords(content, true);
        } else {
          this.setInteractiveWords(content, false);
        }
        this.elementStates.hints[hint.id] = hidden;
      } else {
        this.elementStates.hints[hint.id] = true;
        this.setInteractiveWords(content, false);
      }

      hint.onclick = () => {
        const hidden = content.classList.contains('presentation__hint__content__hidden');
        this.elementStates.hints[hint.id] = !hidden;
        if (hidden) {
          content.classList.remove('presentation__hint__content__hidden');
          this.setInteractiveWords(content, true);
        } else {
          content.classList.add('presentation__hint__content__hidden');
          this.setInteractiveWords(content, false);
        }
      };
    }
  }

  setInteractiveWords(parentElement: HTMLElement, show: boolean) {
    const elements = parentElement.querySelectorAll('.interactive_word');
    for (let i = 0; i < elements.length; i += 1) {
      this.setInteractiveWord(elements[i], show);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setInteractiveWord(element: HTMLElement, show: boolean) {
    if (show) {
      element.classList.remove('not_interactive_word');
    } else {
      element.classList.add('not_interactive_word');
    }
  }

  componentUpdateComplete() {
    // console.log('componentUpdateComplete');
    this.setOnclicks();
    const section = this.content.sections[this.currentSectionIndex];
    // section.setOnClicks();
    section.setSteadyState(this.state);
    this.content.message = null;
    this.firstPageShown = false;
    this.inTransition = false;
    const { diagram } = this;
    if (diagram) {
      diagram.inTransition = false;
      // diagram.setFirstTransform();
    }
    section.setInfoButton();
    // console.log('updateInteractiveItems')
    this.updateInteractiveItems();
    this.comingFrom = '';
    this.transitionCancelled = false;
    this.renderDiagrams();
    window.presentationFormatTransitionStatus = 'steady';
  }

  updateInteractiveItems() {
    const section = this.content.sections[this.currentSectionIndex];
    section.setInteractiveElements();
    section.setInteractiveElementsButton();
  }

  currentSection() {
    return this.content.sections[this.currentSectionIndex];
  }

  stopDiagrams() {
    const { diagram } = this;
    if (diagram) {
      diagram.stop(true, true);
    }
  }

  highlightNextInteractiveItem() {
    const section = this.content.sections[this.currentSectionIndex];
    const interactiveItem = section.getNextInteractiveItem();
    if (interactiveItem) {
      const { element, location } = interactiveItem;
      this.content.highlightInteractiveElement(element, location);
    }
  }

  stopTransition() {
    const { diagram } = this;
    this.transitionCancelled = true;
    if (diagram) {
      diagram.inTransition = false;
      // console.log('stopping')
      diagram.stop(true, true);
    }
    this.inTransition = false;
  }

  renderDiagrams() {
    const { diagram } = this;
    if (diagram) {
      diagram.animateNextFrame();
    }
  }

  closeDiagram() {
    const { diagram } = this;
    if (diagram) {
      diagram.destroy();
    }
    this.diagram = null;
  }

  initialize() {
    this.closeDiagram();
    super.initialize();
    // this.content.initialize();
    this.diagram = this.content.diagram;

    // this.overlayDiagram = this.content.overlayDiagram;
    this.diagram.version = this;
  }

  // eslint-disable-next-line class-methods-use-this
  disableInteractiveItems() {
    const button = document.getElementById('id_topic__interactive_element_button');
    if (button != null) {
      button.classList.add('topic__interactive_element_button__hide');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  enableInteractiveItems() {
    this.updateInteractiveItems();
  }
}

export default PresentationFormat;
