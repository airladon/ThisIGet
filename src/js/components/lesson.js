// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
// import '../../css/style.scss';
// import Lesson from '../Lesson/Lesson';

// import Button from './button';
import LearningPathNavigator from './learningPathNavigator';
// import LessonTilePath from './lessonPathTile';
import TopicTitle from './topicTitle';
// import getContentIndex from '../../content/common/lessonindex';
import getContentIndex from '../../content/contentIndex';
import TopicDescription from '../Lesson/topicDescription';
// import DropDownButton from './dropDownButton';
import TopicButton from './topicButton';
import Rating from './rating';
import { getCookie, login } from '../tools/misc';
import PresentationFormatComponent from './presentationLesson';
import SimpleFormatComponent from './simpleLesson';
import SinglePageFormatComponent from './singlePageLesson';
import LinksFormatComponent from './linksLesson';

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
  //   fullTopic: boolean,
  //   type: 'presentation' | 'singlePage' | 'generic',
  // },
  isLoggedIn: boolean;
};

type State = {
  userRating: number;
  ratings: {
    [approachUID: string]: {
      [versionUID: string]: {
        aveRating: number,
        numRatings: number,
        numHighRatings: number,
        userRating: number,
      },
    }
  },
};

function getTopicDescription(uid: string) {
  const lessons = getContentIndex();
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
  learningPathNavigator: ?LearningPathNavigator;
  showNavigator: boolean;
  topicDescription: null | TopicDescription;
  versionDetails: Object;
  approachUID: string;
  firstPage: number;
  lessonUID: string;
  versionUID: string;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    const path = window.location.pathname.replace(/\/$/, '').split('/');
    // const lessonUID = path.slice(-3, -2)[0];
    // const topic = path.slice(-2, -1)[0];
    // const versionUID = path.slice(-1)[0];
    // this.lessonDetails = props.lessonDetails;
    /* eslint-disable prefer-destructuring */
    this.lessonUID = path.slice(-3, -2)[0];
    this.approachUID = path.slice(-2, -1)[0];
    this.versionUID = path.slice(-1)[0];
    /* eslint-enable */
    this.topicDescription = getTopicDescription(this.lessonUID);
    this.state = {
      userRating: 0,
      ratings: this.fillRatings(),
    };
    // this.versionDetails = props.versionDetails;
    // const [topic] = window.location.pathname.split('/').slice(-2, -1);
    // this.topic = topic;
    this.key = 0;
    this.showNavigator = false;
    this.getRating(this.approachUID);
    if (this.topicDescription != null) {
      this.topicDescription.getRatings(this.gotRatings.bind(this));
    }
  }

  fillRatings() {
    const { topicDescription } = this;
    if (topicDescription != null) {
      const ratings = {};
      Object.keys(topicDescription.approaches).forEach((approachUID) => {
        const versions = topicDescription.approaches[approachUID];
        if (!(approachUID in ratings)) {
          ratings[approachUID] = {};
        }
        Object.keys(versions).forEach((versionUID) => {
          const version = versions[versionUID];
          ratings[approachUID][versionUID] = {
            aveRating: version.aveRating,
            numRatings: version.numRatings,
            numHighRatings: version.numHighRatings,
            userRating: version.userRating,
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

  getRating(approachUID: string) {
    // const lessonUid = this.lessonDetails.details.uid;
    // const versionUid = this.versionDetails.details.uid;
    const link = `/rating/${this.lessonUID}/${approachUID}/${this.versionUID}`;
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

    const link = `/rate/${this.lessonUID}/${this.approachUID}/${this.versionUID}/${rating}?page=${page + 1};pages=${this.lesson.content.sections.length}`;
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
    const { topicDescription } = this;
    let count = 0;
    if (topicDescription != null) {
      // count = topicDescription.paths.length;
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

  getApproaches() {
    const approaches = {};
    // const [currentTopic, currentVersion] = window.location.href.split('/').slice(-2);

    const { topicDescription } = this;
    if (topicDescription != null) {
      Object.keys(this.state.ratings).forEach((approachUID) => {
        const approach = this.state.ratings[approachUID];
        Object.keys(approach).forEach((versionUID) => {
          const version = topicDescription.approaches[approachUID][versionUID];
          const label = version.title;
          let link = `${topicDescription.path}/${topicDescription.uid}/${approachUID}/${versionUID}`;
          if (approachUID === 'dev') {
            link = `/dev${topicDescription.path}/${topicDescription.uid}/quickReference/${versionUID}`;
          }
          // const { description } = version;
          const { fullTopic } = version;
          const { type } = version;
          const rating = this.state.ratings[approachUID][versionUID];
          let { userRating } = rating;

          if (!(approachUID in approaches)) {
            approaches[approachUID] = {};
          }
          let active = false;
          // console.log(currentExplanation, version, topic)
          if (this.versionUID === versionUID
            && this.approachUID === approachUID) {
            active = true;
            ({ userRating } = this.state);
          }
          approaches[approachUID][versionUID] = {
            label,
            link,
            userRating,
            rating: rating.aveRating,
            numReviews: rating.numRatings,
            numHighRatings: rating.numHighRatings,
            description: '',
            active,
            fullTopic,
            type,
          };
        });
      });
    }
    return approaches;
  }

  addTopics() {
    const output = [];
    const approaches = this.getApproaches();
    const approachUIDs = [
      'discover', 'explanation', 'summary', 'examples', 'implications', 'history', 'quiz', 'ta', 'links',
    ];
    Object.keys(approaches).forEach((approachUID) => {
      if (approachUIDs.indexOf(approachUID) === -1) {
        approachUIDs.push(approachUID);
      }
    });
    // const currentTopic = window.location.href.split('/').slice(-2, -1)[0];
    approachUIDs.forEach((approachUID) => {
      if (approaches[approachUID] != null && approachUID !== 'quickReference') {
        const approach = approaches[approachUID];
        // $FlowFixMe - onPath is there and boolean
        const fullTopicCount = Object.keys(approach)
          .filter(ver => approach[ver].fullTopic).length;
        // $FlowFixMe - onPath is there and boolean
        const partialLessonCount = Object.keys(approach)
          .filter(ver => !approach[ver].fullTopic).length;
        let selected = false;
        if (this.approachUID === approachUID) {
          selected = true;
        }
        let vUIDs = Object.keys(approach);
        vUIDs = vUIDs.sort((aKey, bKey) => {
          const a = approach[aKey];
          const b = approach[bKey];
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
          const a = approach[aKey];
          const b = approach[bKey];
          if (a.fullTopic === true && b.fullTopic === false) { return -1; }
          if (a.fullTopic === false && b.fullTopic === true) { return 1; }
          return 0;
        });
        const listItems = [];
        vUIDs.forEach((vUID) => {
          listItems.push(approach[vUID]);
          if (approachUID === 'quickReference') {
            listItems.slice(-1)[0].label = vUID;
          }
        });
        this.key += 1;
        if (partialLessonCount > 0
          && (approachUID === 'explanation' || approachUID === 'discover' || approachUID === 'summary')
        ) {
          listItems.splice(fullTopicCount, 0, {
            label: <div className="topic_button__portion_separator">
              <div className="topic_button__portion_separator_label">
                {'Portion of Topic'}
              </div>
            </div>,
            separator: true,
          });
          listItems.splice(0, 0, {
            label: <div className="topic_button__portion_separator">
              <div className="topic_button__portion_separator_label">
                {'Full Topic'}
              </div>
            </div>,
            separator: true,
          });
        }
        let nameLabel = approachUID.charAt(0).toUpperCase() + approachUID.slice(1);
        if (approachUID === 'ta') {
          nameLabel = 'TA';
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
                  {nameLabel}
                </a>
              </div>
            </div>,
          );
        } else {
          output.push(
            <div className="lesson__path_tile" key={this.key}>
              <TopicButton
                id={`id__lesson__topic_button_${approachUID}`}
                label={nameLabel}
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
    return this.approachUID.charAt(0).toUpperCase() + this.approachUID.slice(1);
  }

  renderLesson() {
    if (this.lesson.type === 'presentation') {
      return <PresentationFormatComponent
        lesson={this.lesson}
      />;
    }
    if (this.lesson.type === 'singlePage') {
      return <SinglePageFormatComponent
        lesson={this.lesson}
      />;
    }
    if (this.lesson.type === 'links') {
      return <LinksFormatComponent
        lesson={this.lesson}
        isLoggedIn={this.props.isLoggedIn}
      />;
    }
    return <SimpleFormatComponent
      lesson={this.lesson}
    />;
  }

  ratingLabel() {
    const approachName = this.approachUID.charAt(0).toUpperCase() + this.approachUID.slice(1);
    if (this.props.isLoggedIn) {
      if (this.lesson.type === 'links') {
        return 'Are these links helpful?';
      }
      return `Is this ${approachName} helpful?`;
    }
    return <div>
      <span className="rating__login" onClick={login}>Login</span> to rate {approachName}:
    </div>;
  }

  render() {
    // console.log(`${window.location.pathname}/tile.svg`)
    let path = window.location.pathname.replace(/\/$/, '').split('/').slice(0, -2);
    if (path[1] === 'dev') {
      path = ['', ...window.location.pathname.replace(/\/$/, '').split('/').slice(2, -2)];
    }
    const imgLink = `/static/dist${path.join('/')}/tile.svg`;
    return <div>
      <div className={`lesson__title_bar${this.calcTitleHeight()}`}>
        <TopicTitle
          // imgLink={`${this.lesson.content.iconLinkGrey}`}
          imgLink={imgLink}
          // imgLink={`${window.location.pathname}/tile.svg`}
          // imgLink={`${this.lesson.lessonDetails.imgLink}`}
          key='1'
          label={this.lesson.content.title}
          />
        <div className="lesson__path_container">
          <div className="lesson__path_mid_tiles">
            {this.addTopics()}
          </div>
        </div>
        <Rating
          topic={this.approachUID}
          rating={this.state.userRating}
          ratingCallback={this.setUserRating.bind(this)}
          isLoggedIn={this.props.isLoggedIn}
          label={this.ratingLabel()}
        />
      </div>
      {this.renderLesson()}
      <div className='lesson__white_spacer'/>
      <LearningPathNavigator
          selected={this.lesson.content.title}
          learningPath={'Geometry_1'}
          ref={(learningPathNavigator) => { this.learningPathNavigator = learningPathNavigator; }}
        />
      <div className='lesson__white_spacer'/>
    </div>;
  }
}
