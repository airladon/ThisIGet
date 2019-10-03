// @flow
// import Fig from 'figureone';
import * as React from 'react';
import PresentationFormat from '../../TopicFormat/PresentationFormat';
import Button from '../button';
import DropDownButton from '../dropDownButton';
import { getCookie, createCookie, getCurrentPath } from '../../tools/misc';
import PresentationQR from '../presentationQR';
import StaticQR from '../staticQR';
// import '../../css/presentationFormat.scss';

// const { DiagramElementCollection } = Fig;

type Props = {
  version: PresentationFormat;
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
  version: PresentationFormat;
  key: number;
  state: State;
  componentUpdateCallback: ?() => void;
  centerContentFlag: boolean;
  topic: string;
  firstPage: number;
  // refreshCallback: ?() => void;

  constructor(props: Props) {
    super(props);
    this.firstPage = parseInt(getCookie('page'), 10) - 1 || 0;
    if (this.firstPage === -1) {
      this.firstPage = 0;
    }
    this.version = props.version;
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
    this.version.refresh = this.refreshText.bind(this);
    this.componentUpdateCallback = null;
    this.centerContentFlag = false;
    // this.refreshCallback = null;
  }

  componentDidUpdate() {
    if (this.componentUpdateCallback) {
      const callback = this.componentUpdateCallback;
      this.componentUpdateCallback = null;
      callback();
    } else {
      this.version.setOnclicks();
    }
    // if (this.refreshCallback != null) {
    //   this.refreshCallback();
    // }
    this.version.content.diagram.updateHTMLElementTie();
  }

  refreshText(htmlText: string, page: number, callback: ?() => void = null) {
    this.updateGoToButtonListHighlight();
    if (htmlText !== this.state.htmlText || page !== this.state.page) {
      this.componentUpdateCallback = callback;
      this.setState({ htmlText, page });
      createCookie('page', `${page + 1}`, 30, getCurrentPath());
    } else if (callback) {
      callback();
    }
    const nextButton = document.getElementById('topic__button-next');
    if (nextButton) {
      if (this.version.currentSectionIndex ===
        this.version.content.sections.length - 1) {
        nextButton.classList.add('topic__button-next-disabled');
      } else {
        nextButton.classList.remove('topic__button-next-disabled');
      }
    }
    const prevButton = document.getElementById('topic__button-previous');
    if (prevButton) {
      if (this.version.currentSectionIndex === 0) {
        prevButton.classList.add('topic__button-prev-disabled');
      } else {
        prevButton.classList.remove('topic__button-prev-disabled');
      }
    }
  }

  goToNext() {
    this.version.nextSection();
  }

  goToPrevious() {
    this.version.prevSection();
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
    const container = document.getElementById('topic__content_diagram');
    if (container != null) {
      const containerRect = container.getBoundingClientRect();
      const width = Math.min(containerRect.width * 0.7, 600);
      const doc = document.documentElement;
      if (doc != null) {
        doc.style.setProperty('--topic__qr__content_width', `${width}px`);
        doc.style.setProperty('--topic__qr__content_height', `calc(${width / 1.5}px)`);
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
    const presQR = document.getElementById('id_topic__qr__pres_container');
    if (presQR != null) {
      presQR.classList.add('topic__hide');
    }
    this.setState({ qr: window.quickReference[parameters] });
    this.setCSSVariables('id_topic__qr__static_container');
    const element = document.getElementById('id_topic__qr__static_container');
    if (element != null) {
      element.classList.remove('topic__hide');
    }
  }

  showPresQR(id: string, parameters: string) {
    const staticQR = document.getElementById('id_topic__qr__static_container');
    if (staticQR != null) {
      staticQR.classList.add('topic__hide');
    }
    this.setCSSVariables('id_topic__qr__pres_container');
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.version.content.showQR(path, qrid);
    const element = document.getElementById('id_topic__qr__pres_container');
    if (element != null) {
      element.classList.remove('topic__hide');
    }
    this.version.content.qrDiagram.resize();
    this.version.content.qrDiagram.animateNextFrame();
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    // Instantiate diagram now that the canvas elements have been
    // created.
    window.topicFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };
    this.version.initialize();
    this.version.content.diagram.resize();
    this.setState({
      listOfSections: this.addListOfSections(),
      numPages: this.version.content.sections.length,
    });

    if (this.firstPage != null && this.firstPage < this.version.content.sections.length) {
      this.version.goToSection(this.firstPage);
    } else {
      this.version.goToSection(0);
    }

    const nextButton = document.getElementById('topic__button-next');
    if (nextButton instanceof HTMLElement) {
      nextButton.onclick = this.goToNext.bind(this);
    }
    const prevButton = document.getElementById('topic__button-previous');
    if (prevButton instanceof HTMLElement) {
      prevButton.onclick = this.goToPrevious.bind(this);
    }

    const infoButton = document.getElementById('id_topic__info_button');
    if (infoButton instanceof HTMLElement) {
      infoButton.onclick = this.version.content.toggleInfo.bind(this.version.content);
    }

    // window.addEventListener('resize', this.centerContent.bind(this));
    // window.addEventListener('orientationchange', this.orientationChange.bind(this));

    // uncomment this if the topic should be centered on going to it
    // this.orientationChange();
    // this.centerContentFlag = !this.centerContentFlag;
    // this.centerContent();
  }

  orientationChange() {
    const doc = document.documentElement;
    if (doc) {
      // if currently in portrait, then want to center.
      if (doc.clientHeight > doc.clientWidth) {
        this.centerContentFlag = true;
      }
    }
  }

  centerContent() {
    // console.log("Asdf1");
    if (this.centerContentFlag) {
      const contentContainer = document.getElementById('topic__container_name');
      if (contentContainer) {
        const y = this.centerContentPosition(contentContainer);
        // setTimeout(function center() { window.scroll(0, a); }, 500);
        setTimeout(() => window.scroll(0, y), 500);
      }
    }
    this.centerContentFlag = false;
  }

  // eslint-disable-next-line class-methods-use-this
  centerContentPosition(element: HTMLElement) {
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
    window.removeEventListener('orientationchange', this.centerContent.bind(this));
  }

  renderContent(content: string) {
    this.key += 1;
    return <div key={this.key} className='topic__diagram_text' id='id_topic__diagram_text'
      dangerouslySetInnerHTML={ {
        __html: content.slice(0, content.length - 1),
      } }
      />;
  }

  // eslint-disable-next-line class-methods-use-this
  addPrevButton() {
    return <Button label="" id="topic__button-previous" className=" topic__np_button topic__button-prev-enabled"
    aria-label="Previous slide"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  addNextButton() {
    return <Button label="" id="topic__button-next" className=" topic__np_button topic__button-next-enabled" aria-label="Next slide"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  addInfoButton() {
    return <div id="id_topic__info_button" className="topic__info_button topic__info_hide">
      <div className="topic__info_button_label_container">
        <div className="topic__info_button_label">
          <div className="topic__info_button_label_text">
            i
          </div>
        </div>
      </div>
    </div>;
  }

  // eslint-disable-next-line class-methods-use-this
  addInteractiveElementButton() {
    return <div id="id_topic__interactive_element_button__container"
      className="topic__interactive_element_button__container">
        <div
          id="id_topic__interactive_element_button"
          className="topic__interactive_element_button topic__interactive_element_button__hide"
          onClick={this.version.highlightNextInteractiveItem.bind(this.version)}
          />
      </div>;
  }

  addGoToButton() {
    if (this.state.listOfSections.length > 0) {
      return <div
        className="topic__button-goto_container"
        id="id__topic__button-goto_container">
        <DropDownButton
          id="id__topic__goto_button"
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
      const { title } = this.version.content.sections[i];
      if (title) {
        break;
      }
      i -= 1;
    }
    return i;
  }

  clickList(index: number) {
    this.version.goToSection(index);
  }

  updateGoToButtonListHighlight() {
    const button = document.getElementById('id__topic__button-goto_container');
    if (button != null) {
      const activeItems = button.getElementsByClassName('dropdown_button_list_item_active');
      [].forEach.call(activeItems, item => item.classList.remove('dropdown_button_list_item_active'));
      const listItems = document.getElementById('id__topic__goto_button_list');
      const activeSection = this.belongsTo(this.version.currentSectionIndex);
      const titleIndeces = this.version.content.sections.map((section, index) => {
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
    const activeSection = this.belongsTo(this.version.currentSectionIndex);
    this.version.content.sections.forEach((section, index) => {
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
      <div className="topic__widescreen_backdrop" id={this.version.content.htmlId}>
        <div id="topic__container_name" className="topic__container">
              {this.addPrevButton()}
              <div id={this.version.content.diagramHtmlId} className="diagram__container topic__diagram">
                <canvas id="id_diagram__gl__low" className='diagram__gl'>
                </canvas>
                <canvas id="id_diagram__text__low" className='diagram__text'>
                </canvas>
                <div id="id_diagram__html" className='diagram__html'>
                  {this.renderContent(this.state.htmlText)}
                  <div className="diagram__text_measure" id={`${this.version.content.diagramHtmlId}_measure`}>
                    {'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}
                  </div>
                </div>
                <div id="id_topic__qr__static_container" className="topic__qr__container topic__hide">
                  {this.state.qr}
                </div>
                <div id="id_topic__qr__pres_container" className="topic__qr__container topic__hide">
                  <PresentationQR
                    id="id_topic__qr__content_pres__overlay"
                    onClose={this.version.content.prepareToHideQR.bind(this.version.content)}
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
