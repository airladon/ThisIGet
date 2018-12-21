// @flow

import * as React from 'react';
// import '../../css/style.scss';
import Lesson from '../Lesson/Lesson';
import Button from './button';
import LessonNavigator from './lessonNavigator';
import LessonTilePath from './lessonPathTile';
import LessonTitle from './lessonTitle';
import getLessonIndex from '../../Lessons/index';
import LessonDescription from '../../Lessons/lessonDescription';
import DropDownButton from './dropDownButton';

type Props = {
  lesson: Lesson;
  lessonDetails: Object;
  section?: number;
};

type State = {
  htmlText: string,
  numPages: number,
  page: number,
  listOfSections: Array<{
    label: string;
    link: Function | string;
    active?: boolean;
  }>;
};

function getLessonDescription(uid: string) {
  const lessons = getLessonIndex();
  for (let i = 0; i < lessons.length; i += 1) {
    const lessonDescription = lessons[i];
    if (lessonDescription.uid === uid) {
      return lessonDescription;
    }
  }
  return null;
}

function getCurrentLesson() {
  const currentLocation = window.location.href;
  return currentLocation.split('/').pop();
}

export default class LessonComponent extends React.Component
                                    <Props, State> {
  lesson: Lesson;
  lessonDetails: Object;
  key: number;
  state: State;
  diagrams: Object;
  componentUpdateCallback: ?() => void;
  centerLessonFlag: boolean;
  lessonNavigator: ?LessonNavigator;
  showNavigator: boolean;
  lessonDescription: null | LessonDescription;

  constructor(props: Props) {
    super(props);
    this.state = {
      htmlText: '',
      numPages: 0,
      page: 0,
      listOfSections: [],
    };
    this.lesson = props.lesson;
    this.lessonDetails = props.lessonDetails;
    this.lessonDescription = getLessonDescription(props.lessonDetails.details.uid);
    this.key = 0;
    this.lesson.refresh = this.refreshText.bind(this);
    this.componentUpdateCallback = null;
    this.centerLessonFlag = false;
    this.showNavigator = false;
  }

  componentDidUpdate() {
    if (this.componentUpdateCallback) {
      const callback = this.componentUpdateCallback;
      this.componentUpdateCallback = null;
      callback();
    }
  }

  refreshText(htmlText: string, page: number, callback: ?() => void = null) {
    // this.setState({
    //   listOfSections: this.addListOfSections(),
    // });
    this.updateGoToButtonListHighlight();
    if (htmlText !== this.state.htmlText || page !== this.state.page) {
      this.componentUpdateCallback = callback;
      this.setState({ htmlText, page });
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

  componentDidMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.lesson.initialize();
    this.setState({
      listOfSections: this.addListOfSections(),
      numPages: this.lesson.content.sections.length,
    });
    this.lesson.goToSection(0);

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
    // const infoBox = document.getElementById('id_lesson__info_box');
    // if (infoButton instanceof HTMLElement && infoBox instanceof HTMLElement) {
    //   infoButton.onclick = () => {
    //     infoBox.classList.toggle('lesson__info_hide');
    //     infoButton.classList.toggle('lesson__info_button_show');
    //   };
    // }
    window.addEventListener('resize', this.centerLesson.bind(this));
    window.addEventListener('orientationchange', this.orientationChange.bind(this));
    // const nav = document.getElementById('id_navigator__container');
    // if (nav) {
    //   nav.addEventListener('mouseover', this.expandLessonNavigator.bind(this));
    // }
    // const title = document.getElementById('id_navigator__scroll_container');
    // if (title) {
    //   // title.onclick = this.titleToNav.bind(this);
    //   title.addEventListener('mouseover', this.test.bind(this));
    //   console.log("asdf");
    //   // title.onclick = this.test()
    // }
    // const angle = document.getElementById('id_lesson__navigator_tile_circle');
    // if (angle) {
    //   angle.onclick = this.test.bind(this);
    // }
    // if (this.lessonNavigator) {
    //   this.lessonNavigator.showSelectedImediately();
    // }
    // const nav = document.getElementById('id_navigator__scroll_container');
    // if (nav) {
    //   nav.onclick = this.showHideNavigator.bind(this);
    // }

    // uncomment this if the lesson should be centered on going to it
    this.orientationChange();
    this.centerLessonFlag = !this.centerLessonFlag;
    this.centerLesson();
  }

  // showHideNavigator() {
  //   if (this.showNavigator) {
  //     if (this.lessonNavigator) {
  //       this.lessonNavigator.selectTitle();
  //     }
  //     this.showNavigator = false;
  //   } else {
  //     if (this.lessonNavigator) {
  //       this.lessonNavigator.showNavigator();
  //     }
  //     this.showNavigator = true;
  //   }
  // }

  // test() {
  //   const { lessonNavigator } = this;
  //   if (lessonNavigator) {
  //     lessonNavigator.selectTitle();
  //     setTimeout(() => { lessonNavigator.showNavigator(); }, 2000);
  //     // this.lessonNavigator.zoomInSelected();
  //   }
  //   // console.log("1");
  // }

  // // eslint-disable-next-line class-methods-use-this
  // titleScaleDown() {
  //   const title = document.getElementById('id_lesson__title_tile');
  //   if (title) {
  //     title.style.borderRadius = '13px';
  //     title.style.width = '180px';
  //     title.style.height = '40px';
  //     title.style.fontSize = '12px';
  //     title.style.left = 'calc(50% - 90px)';
  //   }
  // }

  // // eslint-disable-next-line class-methods-use-this
  // titleToNav() {
  //   this.titleScaleDown();
  //   setTimeout(this.expandLessonNavigator, 1000);
  //   const nav = document.getElementById('id_navigator__scroll_container');
  //   // const title_container = document.getElementById('id_lesson__title_container');
  //   // const title = document.getElementById('id_lesson__title_tile');
  //   if (this.lessonNavigator && nav) {
  //     const { x, y } = this.lessonNavigator.selectedLesson.location;
  //     nav.scrollTop = y;
  //     nav.scrollLeft = x - nav.clientWidth / 2 + 90;
  //     // title.style.height = '0';
  //     // title_container.style.height = '0';
  //   }
  // }

  // // eslint-disable-next-line class-methods-use-this
  // expandLessonNavigator() {
  //   const nav = document.getElementById('master_containter');
  //   const container =
  //     document.getElementById('id_lesson__title_navigator_container');
  //   if (nav && container) {
  //     nav.style.height = '30vh';
  //     container.style.height = '30vh';
  //   }
  // }

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

  renderTitle(title: string) {
    this.key += 1;
    return <div className='lesson__title' key={this.key}>
        {title}
      </div>;
  }

  renderContent(content: string) {
    this.key += 1;
    return <div key={this.key} className='lesson__diagram_text'
      dangerouslySetInnerHTML={ {
        __html: content.slice(0, content.length - 1),
      } }
      />;
  }

  // eslint-disable-next-line class-methods-use-this
  addPrevButton() {
    return <Button label="" id="lesson__button-previous" className=" lesson__np_button lesson__button-prev-enabled"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  addNextButton() {
    return <Button label="" id="lesson__button-next" className=" lesson__np_button lesson__button-next-enabled"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  addInfoButton() {
    return <Button label="i" id="id_lesson__info_button" className="lesson__info_button lesson__info_hide"/>;
  }

  // eslint-disable-next-line class-methods-use-this
  // addInfoBox() {
  //   return <div
  //     id="id_lesson__info_box"
  //     className="lesson__info_box lesson__info_hide">
  //     <div className="lesson__info_box__close">{'X'}</div>
  //     <div id="id_lesson__info_box__text"
  //          className="lesson__info_box__text"></div>
  //   </div>;
  // }

  // eslint-disable-next-line class-methods-use-this
  addInteractiveElementButton() {
    return <div id="id_lesson__interactive_element_button__container"
      className="lesson__interactive_element_button__container">
        <img
          id="id_lesson__interactive_element_button"
          className="lesson__interactive_element_button lesson__interactive_element_button__hide"
          onClick={this.lesson.highlightNextInteractiveItem.bind(this.lesson)}
          src="/static/star.png"/>
      </div>;
  }

  addGoToButton() {
    return <div
      className="lesson__button-goto_container"
      id="id__lesson__button-goto_container">
      <DropDownButton
      id="id__lesson__goto_button"
      label={`${this.state.page + 1} / ${this.state.numPages}`}
      direction="up"
      xAlign="right"
      list={this.state.listOfSections}/>
    </div>;
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
    const activeItems = document.getElementsByClassName('drop_down_button_list_item_active');
    [].forEach.call(activeItems, item => item.classList.remove('drop_down_button_list_item_active'));
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
        children[listIndex].classList.add('drop_down_button_list_item_active');
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
        // <div
        // className={classNames}
        // onClick={this.clickList.bind(this, index)}
        // key={this.key}>
        //   {section.title}
        // </div>);
      }
    });
    return output;
  }

  titleAsTile() {
    return <div id="id_lesson__title_tile" className="lesson__title_tile">
      <img src={'/static/'} className="navigator__lesson_tile_image" />
      <div className="lesson__title_tile_containter lesson__title_tile_shadow">
        <div className="lesson__title_tile_title">
          {this.lesson.content.title}
        </div>
      </div>
    </div>;
  }

  addQuizSummary() {
    const output = [];
    const { lessonDescription } = this;
    if (lessonDescription != null) {
      const paths = lessonDescription.paths.slice();
      const quiz = paths.indexOf('quiz');
      const summary = paths.indexOf('summary');
      const currentLocation = getCurrentLesson();
      if (summary !== -1) {
        this.key += 1;
        let selected = '';
        if (currentLocation.toLowerCase() === 'summary') {
          selected = 'selected';
        }
        output.push(
          <LessonTilePath
            id='id_lesson__tile_path_summary'
            link={`${lessonDescription.link}/summary`}
            key={this.key}
            label='Summary'
            state={selected}
            right={true}/>,
        );
      }
      if (quiz !== -1) {
        this.key += 1;
        let selected = '';
        if (currentLocation.toLowerCase() === 'quiz') {
          selected = 'selected';
        }
        output.push(
          <LessonTilePath
            id='id_lesson__tile_path_quiz'
            link={`${lessonDescription.link}/quiz`}
            key={this.key}
            label='Quiz'
            state={selected}
            />,
        );
      }
    }
    return output;
  }

  calcTitleHeight() {
    const { lessonDescription } = this;
    let count = 0;
    if (lessonDescription != null) {
      count = lessonDescription.paths.length;
    }
    if (count === 1) {
      return ' lesson__title_bar_force_low';
    }
    if (count > 8) {
      return ' lesson__title_bar_force_high';
    }
    return '';
  }

  addLessonPaths() {
    const output = [];
    const { lessonDescription } = this;
    const currentLocation = getCurrentLesson();
    if (lessonDescription != null && lessonDescription.paths.length > 1) {
      let paths = lessonDescription.paths.slice();
      paths = paths.sort((a, b) => {
        const upperA = a.toUpperCase();
        const upperB = b.toUpperCase();
        if (upperA < upperB) {
          return -1;
        }
        if (upperA > upperB) {
          return 1;
        }
        return 0;
      });
      paths.forEach((path) => {
        if (path.toLowerCase() !== 'quiz' && path.toLowerCase() !== 'summary') {
          this.key += 1;
          let selected = '';
          if (path === currentLocation) {
            selected = 'selected';
          }
          output.push(
            <LessonTilePath
              id={`id_lesson__tile_path_${path}`}
              link={`${lessonDescription.link}/${path}`}
              key={this.key}
              label={path}
              state={selected}
              />,
          );
        }
      });
    }
    return output;
  }

  render() {
    return <div>
      <div className={`lesson__title_bar${this.calcTitleHeight()}`}>
        <div className="lesson__path_container">
          <div className="lesson__path_left_tiles">
            {this.addLessonPaths()}
          </div>
          <div className="lesson__path_right_tiles">
            {this.addQuizSummary()}
          </div>
        </div>
        <LessonTitle
          imgLink={`/${this.lesson.content.iconLinkGrey}`}
          key='1'
          label={this.lesson.content.title}
          />
      </div>
      <div className="lesson__widescreen_backdrop">
        <div id="lesson__container_name" className="lesson__container">
              {this.addPrevButton()}
              <div id={this.lesson.content.diagramHtmlId} className="diagram__container lesson__diagram">
                <canvas id="id_diagram__text__low" className='diagram__text'>
                </canvas>
                <canvas id="id_diagram__gl__low" className='diagram__gl'>
                </canvas>
                <div id="id_diagram__html" className='diagram__html'>
                  {this.renderContent(this.state.htmlText)}
                </div>
                <canvas id="id_diagram__text__high" className='diagram__text'>
                </canvas>
                <canvas id="id_diagram__gl__high" className='diagram__gl'>
                </canvas>
              </div>
              {this.addGoToButton()}
              {this.addNextButton()}
              {this.addInfoButton()}
              {this.addInteractiveElementButton()}
        </div>
      </div>

      <div className='lesson__white_spacer'/>
      <LessonNavigator
          selected={this.lesson.content.title}
          topic={'Geometry_1'}
          ref={(lessonNavigator) => { this.lessonNavigator = lessonNavigator; }}
        />
      <div className='lesson__white_spacer'/>
    </div>;
  }
}
