// @flow

import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import LearningPathNavigator from './learningPathNavigator';
import TopicTitle from './topicTitle';
import getTopicIndex from '../../content/topicIndex';
import TopicDescription from '../Lesson/topicDescription';
import TopicButton from './topicButton';
import Rating from './rating';
import { login } from '../tools/misc';
import PresentationFormatComponent from './format/presentation';
import SimpleFormatComponent from './format/simple';
import SinglePageFormatComponent from './format/singlePage';
import LinksFormatComponent from './format/links';
import { setVersionRating } from '../Lesson/rating';

type Props = {
  version: Object;
  isLoggedIn: boolean;
};

type State = {
  userRating: number;
  ratings: {
    [approachUID: string]: {
      [versionName: string]: {
        aveRating: number,
        numRatings: number,
        numHighRatings: number,
        userRating: number,
      },
    }
  },
};

function getTopicDescription(uid: string) {
  const topicIndex = getTopicIndex();
  return topicIndex[uid];
}

export default class TopicComponent extends React.Component
                                    <Props, State> {
  version: Object;
  key: number;
  state: State;
  // diagrams: Object;
  componentUpdateCallback: ?() => void;
  learningPathNavigator: ?LearningPathNavigator;
  showNavigator: boolean;
  topicDescription: null | TopicDescription;
  versionDetails: Object;
  approachUID: string;
  firstPage: number;
  topicName: string;
  versionName: string;
  versionUID: string;

  constructor(props: Props) {
    super(props);
    this.version = props.version;
    const path = window.location.pathname.replace(/\/$/, '').split('/');
    /* eslint-disable prefer-destructuring */
    this.topicName = path.slice(-3, -2)[0];
    this.approachUID = path.slice(-2, -1)[0];
    this.versionName = path.slice(-1)[0];
    /* eslint-enable */
    this.versionUID = window.location.pathname.replace(/^.*\/content\//, '');
    const topicUID = window.location.pathname.replace(/^.*\/content\//, '')
      .split('/').slice(0, -2).join('/');
    this.topicDescription = getTopicDescription(topicUID);
    this.state = {
      userRating: 0,
      ratings: this.fillRatings(),
    };
    this.key = 0;
    this.showNavigator = false;
    // this.getRating(this.approachUID);
    if (this.topicDescription != null) {
      this.topicDescription.getRatings(this.gotRatings.bind(this));
    }
  }

  fillRatings() {
    const { topicDescription } = this;
    if (topicDescription == null) {
      return {};
    }
    const ratings = {};
    Object.keys(topicDescription.approaches).forEach((approachUID) => {
      const versions = topicDescription.approaches[approachUID];
      if (!(approachUID in ratings)) {
        ratings[approachUID] = {};
      }
      Object.keys(versions).forEach((versionName) => {
        const version = versions[versionName];
        if (version.rating != null) {
          ratings[approachUID][versionName] = {
            aveRating: version.rating.ave,
            numRatings: version.rating.num,
            numHighRatings: version.rating.high,
            userRating: version.rating.user,
          };
        }
      });
    });
    return ratings;
  }

  gotRatings() {
    // Get ratings of all versions of topic
    const ratings = this.fillRatings();
    // Get user rating for selected version
    let userRating = 0;
    if (ratings[this.approachUID] != null) {
      const approach = ratings[this.approachUID];
      if (approach[this.versionName] != null) {
        const rating = approach[this.versionName].userRating;
        if (typeof rating === 'number') {
          userRating = rating;
        }
      }
    }
    this.setState({ ratings, userRating });
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
    // Immediately change state. State will change back if it didn't work when
    // setVersionRating returns
    this.setState({ userRating: rating });
    setVersionRating(this.versionUID, rating, (newRating) => {
      if (newRating != null && typeof newRating.user === 'number') {
        const { ratings } = this.state;
        ratings[this.approachUID][this.versionName] = {
          aveRating: newRating.ave,
          numRatings: newRating.num,
          numHighRatings: newRating.high,
          userRating: newRating.user,
        };
        // $FlowFixMe
        this.setState({ ratings, userRating: newRating.user });
      }
    });
  }

  renderTitle(title: string) {
    this.key += 1;
    return <div className='topic__title' key={this.key}>
        {title}
      </div>;
  }

  titleAsTile() {
    return <div id="id_topic__title_tile" className="topic__title_tile">
      <img src={'/static/'} className="navigator__topic_tile_image" />
      <div className="topic__title_tile_containter topic__title_tile_shadow">
        <div className="topic__title_tile_title">
          {this.version.content.title}
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
      return ' topic__title_bar_force_low';
    }
    if (count > 8) {
      return ' topic__title_bar_force_high';
    }
    return '';
  }

  getApproaches() {
    const approaches = {};
    // const [currentTopic, currentVersion] = window.location.href.split('/').slice(-2);

    const { topicDescription } = this;
    if (topicDescription != null) {
      Object.keys(topicDescription.approaches).forEach((approachUID) => {
        const approach = topicDescription.approaches[approachUID];
        Object.keys(approach).forEach((versionName) => {
          const version = topicDescription.approaches[approachUID][versionName];
          const label = version.title;
          let link = `${topicDescription.path}/${topicDescription.uid}/${approachUID}/${versionName}`;
          if (approachUID === 'dev') {
            link = `/dev${topicDescription.path}/${topicDescription.uid}/quickReference/${versionName}`;
          }
          // const { description } = version;
          const { fullTopic } = version;
          const { type } = version;
          let rating = {
            aveRating: 0,
            numRatings: 0,
            numHighRatings: 0,
            userRating: 0,
          };
          if (this.state.ratings != null
            && this.state.ratings[approachUID] != null
            && this.state.ratings[approachUID][versionName] != null) {
            rating = this.state.ratings[approachUID][versionName];
          }
          let { userRating } = rating;

          if (!(approachUID in approaches)) {
            approaches[approachUID] = {};
          }
          let active = false;
          // console.log(currentExplanation, version, topic)
          if (this.versionName === versionName
            && this.approachUID === approachUID) {
            active = true;
            ({ userRating } = this.state);
          }
          approaches[approachUID][versionName] = {
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

  addApproaches() {
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
            <div className="topic__approach_tile" key={this.key}>
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
            <div className="topic__approach_tile" key={this.key}>
              <TopicButton
                id={`id__topic__topic_button_${approachUID}`}
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

  renderTopic() {
    if (this.version.type === 'presentation') {
      return <PresentationFormatComponent
        version={this.version}
      />;
    }
    if (this.version.type === 'singlePage') {
      return <SinglePageFormatComponent
        version={this.version}
      />;
    }
    if (this.version.type === 'links') {
      return <LinksFormatComponent
        version={this.version}
        isLoggedIn={this.props.isLoggedIn}
      />;
    }
    return <SimpleFormatComponent
      version={this.version}
    />;
  }

  ratingLabel() {
    const approachName = this.approachUID.charAt(0).toUpperCase() + this.approachUID.slice(1);
    if (this.props.isLoggedIn) {
      if (this.version.type === 'links') {
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
      <div className={`topic__title_bar${this.calcTitleHeight()}`}>
        <TopicTitle
          // imgLink={`${this.topic.content.iconLinkGrey}`}
          imgLink={imgLink}
          // imgLink={`${window.location.pathname}/tile.svg`}
          key='1'
          label={this.version.content.title}
          />
        <div className="topic__approach_container">
          <div className="topic__approach_mid_tiles">
            {this.addApproaches()}
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
      {this.renderTopic()}
      <div className='vertical_blank_space'/>
      <LearningPathNavigator
          selected={this.version.content.title}
          learningPath={'Geometry_1'}
          ref={(learningPathNavigator) => { this.learningPathNavigator = learningPathNavigator; }}
        />
      <div className='vertical_blank_space'/>
    </div>;
  }
}
