// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
// import '../../css/style.scss';
import Lesson from '../Lesson/Lesson';
import Button from './button';
import LessonNavigator from './lessonNavigator';
// import LessonTilePath from './lessonPathTile';
import LessonTitle from './lessonTitle';
import getLessonIndex from '../../Lessons/index';
import LessonDescription from '../Lesson/lessonDescription';
import DropDownButton from './dropDownButton';
import ExplanationButton from './explanationButton';
import Rating from './rating';
import { getCookie, createCookie } from '../tools/misc';


type Props = {
  lesson: Lesson;
  lessonDetails: Object;
  versionDetails: Object;
  section?: number;
  isLoggedIn: boolean;
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
  userRating: number;
  ratings: {
    [topicName: string]: {
      [versionName: string]: {
        aveRating: number,
        numRatings: number,
        numHighRatings: number,
      },
    }
  },
};

function getLessonDescription(uid: string) {
  const lessons = getLessonIndex();
  return lessons[uid];
}

// function getCurrentLesson() {
//   const currentLocation = window.location.href;
//   return currentLocation.split('/').pop();
// }

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
  versionDetails: Object;
  topic: string;
  firstPage: number;

  constructor(props: Props) {
    super(props);
    this.firstPage = parseInt(getCookie('page'), 10) - 1;
    this.lesson = props.lesson;
    this.lessonDetails = props.lessonDetails;
    this.lessonDescription = getLessonDescription(props.lessonDetails.details.uid);
    console.log(this.lessonDescription);
    this.state = {
      htmlText: '',
      numPages: 0,
      page: 0,
      listOfSections: [],
      userRating: 0,
      ratings: this.fillRatings(),
    };
    this.versionDetails = props.versionDetails;
    const [topic] = window.location.pathname.split('/').slice(-1);
    this.topic = topic;
    this.key = 0;
    this.lesson.refresh = this.refreshText.bind(this);
    this.componentUpdateCallback = null;
    this.centerLessonFlag = false;
    this.showNavigator = false;
    this.getRating(this.topic);
    // this.getRatings();
    if (this.lessonDescription != null) {
      this.lessonDescription.getRatings(this.gotRatings.bind(this));
    }
  }

  fillRatings() {
    const { lessonDescription } = this;
    if (lessonDescription != null) {
      const ratings = {};
      Object.keys(lessonDescription.topics).forEach((topicName) => {
        const topic = lessonDescription.topics[topicName];
        if (!(topicName in ratings)) {
          ratings[topicName] = {};
        }
        Object.keys(topic).forEach((versionUID) => {
          const version = topic[versionUID];
          ratings[topicName][versionUID] = {
            aveRating: version.aveRating,
            numRatings: version.numRatings,
            numHighRatings: version.numHighRatings,
          };
        });
      });
      return ratings;
    }
    return {};
  }

  gotRatings() {
    this.setState( {ratings: this.fillRatings() });
  }

  getRating(topic: string) {
    const lessonUid = this.lessonDetails.details.uid;
    const versionUid = this.versionDetails.details.uid;
    const link = `/rating/${lessonUid}/${topic}/${versionUid}`;
    fetchPolyfill(link, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          if (data.userRating
            && data.userRating !== 'not rated'
            && data.userRating !== 'not logged in'
          ) {
            // this.setUserRating(data.userRating);
            this.setState({ userRating: data.userRating });
          }
        }
      })
      .catch(() => {});
  }

  setUserRating(rating: number) {
    const { cookie } = document;
    if (cookie != null) {
      const username = cookie.match(/username=[^;]*;/);
      if (username != null) {
        if (username[0].split('=')[1].slice(0, -1) === '') {
          return;
        }
      }
    }
    const lessonUid = this.lessonDetails.details.uid;
    const versionUid = this.versionDetails.details.uid;
    const link = `/rate/${lessonUid}/${this.topic}/${versionUid}/${rating}?page=${this.state.page + 1};pages=${this.state.numPages}`;
    fetchPolyfill(link, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'done') {
          this.setState({ userRating: rating });
        } else {
          // console.log('failed to set rating:', data.message);
        }
      })
      .catch(() => {});
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
      // document.cookie = `page=${page + 1}; path=/`;
      createCookie('page', `${page + 1}`, 30, window.location.pathname);
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

    // const { cookie } = document;
    // let page = cookie.match(/page=[^;]*/);
    if (this.firstPage != null) {
      // page = page[0].trim();
      // if (page.slice(-1).charAt(0) === ';') {
      //   page = page.slice(0, -1);
      // }
      // this.setState({ page: parseInt(page, 10) });
      this.lesson.goToSection(this.firstPage);
    }
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

  calcTitleHeight() {
    const { lessonDescription } = this;
    let count = 0;
    if (lessonDescription != null) {
      // count = lessonDescription.paths.length;
      count = 9;
    }
    if (count === 1) {
      return ' lesson__title_bar_force_low';
    }
    if (count > 8) {
      return ' lesson__title_bar_force_high';
    }
    return '';
  }

  getTopics() {
    const topics = {};
    const [currentExplanation, currentTopic] = window.location.href.split('/').slice(-2);
    const { lessonDescription } = this;
    if (lessonDescription != null) {
      Object.keys(this.state.ratings).forEach((topicName) => {
        const topic = this.state.ratings[topicName];
        Object.keys(topic).forEach((versionUID) => {
          const version = lessonDescription.topics[topicName][versionUID];
          const label = version.title;
          const link = `${lessonDescription.path}/${version.path}/${topicName}`;
          const { description } = version;
          const { onPath } = version;

          if (!(topicName in topics)) {
            topics[topicName] = {};
          }
          let active = false;
          if (currentExplanation === version.path
            && currentTopic === topic) {
            active = true;
          }

          const rating = this.state.ratings[topicName][versionUID];
          topics[topicName][versionUID] = {
            label,
            link,
            rating: rating.aveRating,
            numReviews: rating.numRatings,
            numHighRatings: rating.numHighRatings,
            description,
            active,
            onPath,
          };
        });
      });
    }
    return topics;
  }

  addTopics() {
    const output = [];
    const topics = this.getTopics();
    const topicNames = [
      'summary', 'explanation', 'implications', 'history',
      'references', 'quiz',
    ];
    Object.keys(topics).forEach((topicName) => {
      if (topicNames.indexOf(topicName) === -1) {
        topicNames.push(topicName);
      }
    });
    const currentTopic = window.location.href.split('/').slice(-1)[0];
    topicNames.forEach((name) => {
      if (topics[name] != null) {
        const topic = topics[name];
        // $FlowFixMe - onPath is there and boolean
        const onPathCount = Object.values(topic).filter(ver => ver.onPath).length;
        // $FlowFixMe - onPath is there and boolean
        const offPathCount = Object.values(topic).filter(ver => !ver.onPath).length;
        let selected = false;
        if (currentTopic === name) {
          selected = true;
        }
        let vUIDs = Object.keys(topic);
        vUIDs = vUIDs.sort((aKey, bKey) => {
          const a = topic[aKey];
          const b = topic[bKey];
          if (a.rating < b.rating) { return 1; }
          if (a.rating > b.rating) { return -1; }
          if (a.numReviews < b.numReviews) { return 1; }
          if (a.numReviews > b.numReviews) { return -1; }
          const labelA = a.label.toUpperCase();
          const labelB = b.label.toUpperCase();
          if (labelA > labelB) { return 1; }
          if (labelA < labelB) { return -1; }
          return 0;
        });
        vUIDs = vUIDs.sort((aKey, bKey) => {
          const a = topic[aKey];
          const b = topic[bKey];
          if (a.onPath === true && b.onPath === false) { return -1; }
          if (a.onPath === false && b.onPath === true) { return 1; }
          return 0;
        });
        const listItems = [];
        vUIDs.forEach((vUID) => {
          listItems.push(topic[vUID]);
        });
        this.key += 1;
        if (offPathCount > 0 && name !== 'quiz') {
          listItems.splice(onPathCount, 0, {
            label: 'Portion of Lesson',
            separator: true,
          });
        }

        output.push(
          <div className="lesson__path_tile" key={this.key}>
            <ExplanationButton
              id={`id__lesson__explanation_button_${name}`}
              label={name.charAt(0).toUpperCase() + name.slice(1)}
              direction="down"
              xAlign="left"
              selected={selected}
              list={listItems}/>
          </div>,
        );
      }
    });
    // const { lessonDescription } = this;
    // const currentLocation = getCurrentLesson();
    // // Get all topics from various explanations
    // if (lessonDescription != null && lessonDescription.paths.length > 1) {
    //   let paths = lessonDescription.paths.slice();
    //   paths = paths.sort((a, b) => {
    //     const upperA = a.toUpperCase();
    //     const upperB = b.toUpperCase();
    //     if (upperA < upperB) {
    //       return -1;
    //     }
    //     if (upperA > upperB) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   paths.forEach((path) => {
    //     if (path.toLowerCase() !== 'quiz' && path.toLowerCase() !== 'summary') {
    //       this.key += 1;
    //       let selected = '';
    //       if (path === currentLocation) {
    //         selected = 'selected';
    //       }
    //       output.push(
    //         <LessonTilePath
    //           id={`id_lesson__tile_path_${path}`}
    //           link={`${lessonDescription.path}/${path}`}
    //           key={this.key}
    //           label={path}
    //           state={selected}
    //           />,
    //       );
    //     }
    //   });
    // }
    return output;
  }

  // eslint-disable-next-line class-methods-use-this
  getTopic() {
    const topicName = window.location.href.split('/').slice(-1)[0];
    return topicName.charAt(0).toUpperCase() + topicName.slice(1);
  }

  render() {
    return <div>
      <div className={`lesson__title_bar${this.calcTitleHeight()}`}>
        <LessonTitle
          imgLink={`/${this.lesson.content.iconLinkGrey}`}
          key='1'
          label={this.lesson.content.title}
          />
        <div className="lesson__path_container">
          <div className="lesson__path_mid_tiles">
            {this.addTopics()}
          </div>
        </div>
        <Rating
          topic={this.topic}
          rating={this.state.userRating}
          ratingCallback={this.setUserRating.bind(this)}
          isLoggedIn={this.props.isLoggedIn}
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
          learningPath={'Geometry_1'}
          ref={(lessonNavigator) => { this.lessonNavigator = lessonNavigator; }}
        />
      <div className='lesson__white_spacer'/>
    </div>;
  }
}
