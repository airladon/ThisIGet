// @flow
// import Fig from 'figureone';
import * as React from 'react';
import PresentationFormat from '../Lesson/PresentationFormat';
import Button from './button';
import DropDownButton from './dropDownButton';
import { getCookie, createCookie } from '../tools/misc';
import PresentationQR from './presentationQR';
import StaticQR from './staticQR';
// import '../../css/presentationLesson.scss';

// const { DiagramElementCollection } = Fig;

type Props = {
  lesson: PresentationFormat;
};

type State = {
  htmlText: string,
  numPages: number,
  page: number,
  listOfSections: Array<{
    label: string | React.Element<'div'>;
    link?: Function | string;
    active?: boolean;
  }>;
  qr: React.Element<'div'> | React.Element<typeof StaticQR>,
  presQR: {
    title: string;
    link: string;
  },
};

export default class PresentationFormatComponent extends React.Component
                                    <Props, State> {
  lesson: PresentationFormat;
  key: number;
  state: State;
  componentUpdateCallback: ?() => void;
  centerLessonFlag: boolean;
  topic: string;
  firstPage: number;
  // refreshCallback: ?() => void;

  constructor(props: Props) {
    super(props);
    this.firstPage = parseInt(getCookie('page'), 10) - 1 || 0;
    if (this.firstPage === -1) {
      this.firstPage = 0;
    }
    this.lesson = props.lesson;
    this.state = {
      htmlText: '',
      numPages: 0,
      page: 0,
      listOfSections: [],
      qr: <StaticQR content="Loading Reference" link="" title=""/>,
      presQR: {
        title: '',
        link: '',
      },
    };
    this.key = 0;
    this.lesson.refresh = this.refreshText.bind(this);
    this.componentUpdateCallback = null;
    this.centerLessonFlag = false;
    // this.refreshCallback = null;
  }

  componentDidUpdate() {
    if (this.componentUpdateCallback) {
      const callback = this.componentUpdateCallback;
      this.componentUpdateCallback = null;
      callback();
    } else {
      this.lesson.setOnclicks();
    }
    // if (this.refreshCallback != null) {
    //   this.refreshCallback();
    // }
    this.lesson.content.diagram.updateHTMLElementTie();
  }

  refreshText(htmlText: string, page: number, callback: ?() => void = null) {
    this.updateGoToButtonListHighlight();
    if (htmlText !== this.state.htmlText || page !== this.state.page) {
      this.componentUpdateCallback = callback;
      this.setState({ htmlText, page });
      createCookie('page', `${page + 1}`, 30, window.location.pathname.replace(/\/$/, ''));
    } else if (callback) {
      callback();
    }
    const nextButton = document.getElementById('lesson__button-next');
    if (nextButton) {
      if (this.lesson.currentSectionIndex ===
        this.lesson.content.sections.length - 1) {
        nextButton.classList.add('lesson__button-next-disabled');
      } else {
        nextButton.classList.remove('lesson__button-next-disabled');
      }
    }
    const prevButton = document.getElementById('lesson__button-previous');
    if (prevButton) {
      if (this.lesson.currentSectionIndex === 0) {
        prevButton.classList.add('lesson__button-prev-disabled');
      } else {
        prevButton.classList.remove('lesson__button-prev-disabled');
      }
    }
  }

  goToNext() {
    this.lesson.nextSection();
  }

  goToPrevious() {
    this.lesson.prevSection();
  }

  // eslint-disable-next-line class-methods-use-this
  resize() {
    const style = window.getComputedStyle(document.documentElement);
    if (style) {
      const docElem = document.documentElement;
      if (docElem) {
        // docElem.style.setProperty('--pres__vw', `${window.innerWidth}px`);
        docElem.style.setProperty('--pres__vw1', `${window.innerWidth}`);
        // docElem.style.setProperty('--pres__vh', `${window.innerHeight}px`);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setCSSVariables(elementId: string) {
    const container = document.getElementById('lesson__content_diagram');
    if (container != null) {
      const containerRect = container.getBoundingClientRect();
      const width = Math.min(containerRect.width * 0.7, 600);
      const doc = document.documentElement;
      if (doc != null) {
        doc.style.setProperty('--lesson__qr__content_width', `${width}px`);
        doc.style.setProperty('--lesson__qr__content_height', `calc(${width / 1.5}px)`);
      }
    }

    const diagramHTML = document.getElementById('id_diagram__html');
    const element = document.getElementById(elementId);
    if (diagramHTML != null && element != null) {
      const diagramFontSize = parseFloat(diagramHTML.style.fontSize);
      const bodyFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
      element.style.fontSize = `${Math.min(diagramFontSize, bodyFontSize)}px`;
    }
  }

  showStaticQR(id: string, parameters: string) {
    const presQR = document.getElementById('id_lesson__qr__pres_container');
    if (presQR != null) {
      presQR.classList.add('lesson__hide');
    }
    this.setState({ qr: window.quickReference[parameters] });
    this.setCSSVariables('id_lesson__qr__static_container');
    const element = document.getElementById('id_lesson__qr__static_container');
    if (element != null) {
      element.classList.remove('lesson__hide');
    }
  }

  showPresQR(id: string, parameters: string) {
    const staticQR = document.getElementById('id_lesson__qr__static_container');
    if (staticQR != null) {
      staticQR.classList.add('lesson__hide');
    }
    this.setCSSVariables('id_lesson__qr__pres_container');
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.lesson.content.showQR(path, qrid);
    const element = document.getElementById('id_lesson__qr__pres_container');
    if (element != null) {
      element.classList.remove('lesson__hide');
    }
    this.lesson.content.qrDiagram.resize();
    this.lesson.content.qrDiagram.animateNextFrame();
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    // Instantiate diagram now that the canvas elements have been
    // created.
    window.lessonFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };
    this.lesson.initialize();
    this.lesson.content.diagram.resize();
    this.setState({
      listOfSections: this.addListOfSections(),
      numPages: this.lesson.content.sections.length,
    });

    if (this.firstPage != null && this.firstPage < this.lesson.content.sections.length) {
      this.lesson.goToSection(this.firstPage);
    } else {
      this.lesson.goToSection(0);
    }

    const nextButton = document.getElementById('lesson__button-next');
    if (nextButton instanceof HTMLElement) {
      nextButton.onclick = this.goToNext.bind(this);
    }
    const prevButton = document.getElementById('lesson__button-previous');
    if (prevButton instanceof HTMLElement) {
      prevButton.onclick = this.goToPrevious.bind(this);
    }

    const infoButton = document.getElementById('id_lesson__info_button');
    if (infoButton instanceof HTMLElement) {
      infoButton.onclick = this.lesson.content.toggleInfo.bind(this.lesson.content);
    }

    // window.addEventListener('resize', this.centerLesson.bind(this));
    // window.addEventListener('orientationchange', this.orientationChange.bind(this));

    // uncomment this if the lesson should be centered on going to it
    // this.orientationChange();
    // this.centerLessonFlag = !this.centerLessonFlag;
    // this.centerLesson();
  }

  orientationChange() {
    const doc = document.documentElement;
    if (doc) {
      // if currently in portrait, then want to center.
      if (doc.clientHeight > doc.clientWidth) {
        this.centerLessonFlag = true;
      }
    }
  }

  centerLesson() {
    // console.log("Asdf1");
    if (this.centerLessonFlag) {
      const lesson = document.getElementById('lesson__container_name');
      if (lesson) {
        const y = this.centerLessonPosition(lesson);
        // setTimeout(function center() { window.scroll(0, a); }, 500);
        setTimeout(() => window.scroll(0, y), 500);
      }
    }
    this.centerLessonFlag = false;
  }

  // eslint-disable-next-line class-methods-use-this
  centerLessonPosition(element: HTMLElement) {
    const doc = document.documentElement;
    if (element != null && doc != null) {
      const r = element.getBoundingClientRect();
      const top = r.top + window.pageYOffset;
      const { height } = r;
      const windowHeight = doc.clientHeight;
      if (windowHeight >= height) {
        return top - (windowHeight - height) / 2;
      }
      return top;
    }
    return 0;
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.centerLesson.bind(this));
  }

  renderContent(content: string) {
    this.key += 1;
    return <div key={this.key} className='lesson__diagram_text' id='id_lesson__diagram_text'
      dangerouslySetInnerHTML={ {
        __html: content.slice(0, content.length - 1),
      } }
      />;
  }

  // eslint-disable-next-line class-methods-use-this
  addPrevButton() {
    return <Button label="" id="lesson__button-previous" className=" lesson__np_button lesson__button-prev-enabled"
    aria-label="Previous slide"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  addNextButton() {
    return <Button label="" id="lesson__button-next" className=" lesson__np_button lesson__button-next-enabled" aria-label="Next slide"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  addInfoButton() {
    return <div id="id_lesson__info_button" className="lesson__info_button lesson__info_hide">
      <div className="lesson__info_button_label_container">
        <div className="lesson__info_button_label">
          <div className="lesson__info_button_label_text">
            i
          </div>
        </div>
      </div>
    </div>;
  }

  // eslint-disable-next-line class-methods-use-this
  addInteractiveElementButton() {
    return <div id="id_lesson__interactive_element_button__container"
      className="lesson__interactive_element_button__container">
        <div
          id="id_lesson__interactive_element_button"
          className="lesson__interactive_element_button lesson__interactive_element_button__hide"
          onClick={this.lesson.highlightNextInteractiveItem.bind(this.lesson)}
          />
      </div>;
  }

  addGoToButton() {
    if (this.state.listOfSections.length > 0) {
      return <div
        className="lesson__button-goto_container"
        id="id__lesson__button-goto_container">
        <DropDownButton
          id="id__lesson__goto_button"
          label={
            <div className="pres__goto_button_label">
              <div className="pres__goto_button_label_page">{`${this.state.page + 1} `}</div>
              <div className="pres__goto_button_label_num_pages">
                {`of ${this.state.numPages}`}
              </div>
            </div>
          }
          direction="up"
          xAlign="right"
          list={this.state.listOfSections}/>
      </div>;
    }
    return '';
  }

  belongsTo(index: number) {
    let i = index;
    while (i > 0) {
      const { title } = this.lesson.content.sections[i];
      if (title) {
        break;
      }
      i -= 1;
    }
    return i;
  }

  clickList(index: number) {
    this.lesson.goToSection(index);
  }

  updateGoToButtonListHighlight() {
    const button = document.getElementById('id__lesson__button-goto_container');
    if (button != null) {
      const activeItems = button.getElementsByClassName('dropdown_button_list_item_active');
      [].forEach.call(activeItems, item => item.classList.remove('dropdown_button_list_item_active'));
      const listItems = document.getElementById('id__lesson__goto_button_list');
      const activeSection = this.belongsTo(this.lesson.currentSectionIndex);
      const titleIndeces = this.lesson.content.sections.map((section, index) => {
        if (section.title) {
          return index;
        }
        return -1;
      }).filter(index => index !== -1);
      const listIndex = titleIndeces.indexOf(activeSection);

      if (listItems) {
        const { children } = listItems;
        if (children.length > 0) {
          children[listIndex].classList.add('dropdown_button_list_item_active');
        }
      }
    }
  }

  addListOfSections() {
    const output = [];
    const activeSection = this.belongsTo(this.lesson.currentSectionIndex);
    this.lesson.content.sections.forEach((section, index) => {
      if (section.title) {
        let isActive = false;
        if (index === activeSection) {
          isActive = true;
        }
        this.key += 1;
        output.push({
          label: section.title,
          link: this.clickList.bind(this, index),
          active: isActive,
        });
      }
    });
    return output;
  }


  render() {
    return <div>
      <main>
      <div className="lesson__widescreen_backdrop" id={this.lesson.content.htmlId}>
        <div id="lesson__container_name" className="lesson__container">
              {this.addPrevButton()}
              <div id={this.lesson.content.diagramHtmlId} className="diagram__container lesson__diagram">
                <canvas id="id_diagram__gl__low" className='diagram__gl'>
                </canvas>
                <canvas id="id_diagram__text__low" className='diagram__text'>
                </canvas>
                <div id="id_diagram__html" className='diagram__html'>
                  {this.renderContent(this.state.htmlText)}
                  <div className="diagram__text_measure" id={`${this.lesson.content.diagramHtmlId}_measure`}>
                    {'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}
                  </div>
                </div>
                <div id="id_lesson__qr__static_container" className="lesson__qr__container lesson__hide">
                  {this.state.qr}
                </div>
                <div id="id_lesson__qr__pres_container" className="lesson__qr__container lesson__hide">
                  <PresentationQR
                    id="id_lesson__qr__content_pres__overlay"
                    onClose={this.lesson.content.prepareToHideQR.bind(this.lesson.content)}
                  />
                </div>
              </div>
              {this.addGoToButton()}
              {this.addNextButton()}
              {this.addInfoButton()}
              {this.addInteractiveElementButton()}
        </div>
      </div>
      </main>
    </div>;
  }
}
