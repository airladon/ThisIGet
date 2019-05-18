// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
// import '../../css/style.scss';
// import Lesson from '../Lesson/Lesson';

// import Button from './button';
import LessonNavigator from './lessonNavigator';
// import LessonTilePath from './lessonPathTile';
import LessonTitle from './lessonTitle';
import getLessonIndex from '../../Lessons/LessonsCommon/lessonindex';
import LessonDescription from '../Lesson/lessonDescription';
// import DropDownButton from './dropDownButton';
import TopicButton from './topicButton';
import Rating from './rating';
import { getCookie } from '../tools/misc';
import PresentationLessonComponent from './presentationLesson';
import SimpleLessonComponent from './simpleLesson';
import SinglePageLessonComponent from './singlePageLesson';

type Props = {
  lesson: Object;
  // lessonUID: string,
  // topicName: string,
  // versionUID: string,
  // lessonDetails: {
  //   uid: string,
  //   title: string,
  //   dependencies: Array<string>,
  //   enabled?: boolean,
  // },
  // versionDetails: {
  //   uid: string,
  //   topic: string,
  //   title: string,
  //   description: string,
  //   fullLesson: boolean,
  //   type: 'presentation' | 'singlePage' | 'generic',
  // },
  isLoggedIn: boolean;
};

type State = {
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

export default class LessonComponent extends React.Component
                                    <Props, State> {
  lesson: Object;
  lessonDetails: Object;
  key: number;
  state: State;
  // diagrams: Object;
  componentUpdateCallback: ?() => void;
  centerLessonFlag: boolean;
  lessonNavigator: ?LessonNavigator;
  showNavigator: boolean;
  lessonDescription: null | LessonDescription;
  versionDetails: Object;
  topic: string;
  firstPage: number;
  lessonUID: string;
  versionUID: string;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    const path = window.location.pathname.split('/');
    // const lessonUID = path.slice(-3, -2)[0];
    // const topic = path.slice(-2, -1)[0];
    // const versionUID = path.slice(-1)[0];
    // this.lessonDetails = props.lessonDetails;
    /* eslint-disable prefer-destructuring */
    this.lessonUID = path.slice(-3, -2)[0];
    this.versionUID = path.slice(-1)[0];
    this.topic = path.slice(-2, -1)[0];
    /* eslint-enable */
    this.lessonDescription = getLessonDescription(this.lessonUID);
    this.state = {
      userRating: 0,
      ratings: this.fillRatings(),
    };
    // this.versionDetails = props.versionDetails;
    // const [topic] = window.location.pathname.split('/').slice(-2, -1);
    // this.topic = topic;
    this.key = 0;
    this.showNavigator = false;
    this.getRating(this.topic);
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
    this.setState({ ratings: this.fillRatings() });
  }

  getRating(topic: string) {
    // const lessonUid = this.lessonDetails.details.uid;
    // const versionUid = this.versionDetails.details.uid;
    const link = `/rating/${this.lessonUID}/${topic}/${this.versionUID}`;
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
    const page = parseInt(getCookie('page'), 10) - 1 || 0;

    const link = `/rate/${this.lessonUID}/${this.topic}/${this.versionUID}/${rating}?page=${page + 1};pages=${this.lesson.content.sections.length}`;
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

  renderTitle(title: string) {
    this.key += 1;
    return <div className='lesson__title' key={this.key}>
        {title}
      </div>;
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
    // const [currentTopic, currentVersion] = window.location.href.split('/').slice(-2);

    const { lessonDescription } = this;
    if (lessonDescription != null) {
      Object.keys(this.state.ratings).forEach((topicName) => {
        const topic = this.state.ratings[topicName];
        Object.keys(topic).forEach((versionUID) => {
          const version = lessonDescription.topics[topicName][versionUID];
          const label = version.title;
          let link = `${lessonDescription.path}/${lessonDescription.uid}/${topicName}/${versionUID}`;
          if (topicName === 'dev') {
            link = `/dev${lessonDescription.path}/${lessonDescription.uid}/quickReference/${versionUID}`;
          }
          const { description } = version;
          const { fullLesson } = version;
          const { type } = version;

          if (!(topicName in topics)) {
            topics[topicName] = {};
          }
          let active = false;
          // console.log(currentExplanation, version, topic)
          if (this.versionUID === versionUID
            && this.topic === topicName) {
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
            fullLesson,
            type,
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
    // const currentTopic = window.location.href.split('/').slice(-2, -1)[0];
    topicNames.forEach((name) => {
      if (topics[name] != null && name !== 'quickReference') {
        const topic = topics[name];
        // $FlowFixMe - onPath is there and boolean
        const fullLessonCount = Object.values(topic).filter(ver => ver.fullLesson).length;
        // $FlowFixMe - onPath is there and boolean
        const partialLessonCount = Object.values(topic).filter(ver => !ver.fullLesson).length;
        let selected = false;
        if (this.topic === name) {
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
          if (name === 'quickReference') {
            listItems.slice(-1)[0].label = vUID;
          }
        });
        this.key += 1;
        if (partialLessonCount > 0 && name !== 'quiz') {
          listItems.splice(fullLessonCount, 0, {
            label: 'Lesson Portion',
            separator: true,
          });
        }
        if (listItems.length === 1) {
          let singleItemClass = 'dropdown_button_container';
          if (selected) {
            singleItemClass = `${singleItemClass} dropdown_button_selected`;
          }
          output.push(
            <div className="lesson__path_tile" key={this.key}>
              <div className={singleItemClass}>
                <a href={listItems[0].link || '/'}
                  className = "topic_button__single_item_label">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              </div>
            </div>,
          );
        } else {
          output.push(
            <div className="lesson__path_tile" key={this.key}>
              <TopicButton
                id={`id__lesson__topic_button_${name}`}
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                direction="down"
                xAlign="left"
                selected={selected}
                list={listItems}/>
            </div>,
          );
        }
      }
    });
    return output;
  }

  // eslint-disable-next-line class-methods-use-this
  getTopic() {
    // const topicName = window.location.href.split('/').slice(-2, -1)[0];
    return this.topic.charAt(0).toUpperCase() + this.topic.slice(1);
  }

  renderLesson() {
    if (this.lesson.type === 'presentation') {
      return <PresentationLessonComponent
        lesson={this.lesson}
      />;
    }
    if (this.lesson.type === 'singlePage') {
      return <SinglePageLessonComponent
        lesson={this.lesson}
      />;
    }
    return <SimpleLessonComponent
      lesson={this.lesson}
    />;
  }

  render() {
    return <div>
      <div className={`lesson__title_bar${this.calcTitleHeight()}`}>
        <LessonTitle
          imgLink={`${this.lesson.content.iconLinkGrey}`}
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
      {this.renderLesson()}
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
