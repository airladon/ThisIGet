// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import Rating from './rating';
import { login } from '../tools/misc';
// import { getCookie } from '../tools/misc';
// import '../../css/style.scss';
// import img from '../../tile.png';

type TypeLinkIn = {
  url: string;
  hash: string;
  uid?: string;
  topic?: string,
  type?: 'presentation' | 'generic' | 'video',
  author?: string;
  publisher?: string;
  description?: string;
};

type TypeLink = {
  url: string;
  hash: string;
  type: 'presentation' | 'generic' | 'video',
  description: string;
  title: string;
  numHighRatings: ?number;
  userRating: ?number;
  userRatingIsHigh: boolean;
};

type Props = {
  links: Array<TypeLinkIn>,
  isLoggedIn: boolean;
};

type State = {
  ratings: Array<{
      userRating: ?number;
      numHighRatings: ?number;
  }>,
};

export default class LinksTable extends React.Component
                                    <Props, State> {
  lessonUID: string;
  versionUID: string;
  topic: string;
  callbackCount: number;
  numLinks: number;
  links: Array<TypeLink>;
  hasDescription: boolean;

  constructor(props: Props) {
    super(props);
    const path = window.location.pathname.split('/');
    this.links = [];
    props.links.forEach((link) => {
      this.links.push({
        url: link.url,
        hash: link.hash,
        type: link.type || 'generic',
        title: link.author || link.publisher || '',
        description: link.description || '',
        numHighRatings: null,
        userRating: 0,
        userRatingIsHigh: false,
      });
    });
    this.hasDescription = false;
    this.links.forEach((link) => {
      if (link.description) {
        this.hasDescription = true;
      }
    });
    /* eslint-disable prefer-destructuring */
    this.lessonUID = path.slice(-3, -2)[0];
    this.versionUID = path.slice(-1)[0];
    this.topic = path.slice(-2, -1)[0];
    // /* eslint-enable */
    // this.lessonDescription = getLessonDescription(this.lessonUID);
    this.state = {
      ratings: this.fillRatings(),
    };
    // // this.versionDetails = props.versionDetails;
    // // const [topic] = window.location.pathname.split('/').slice(-2, -1);
    // // this.topic = topic;
    // this.key = 0;
    // this.showNavigator = false;
    // this.getRating(this.topic);
    this.getLinkRatings(this.gotLinkRatings.bind(this));
    // if (this.lessonDescription != null) {
    //   this.lessonDescription.getRatings(this.gotRatings.bind(this));
    // }
  }

  fillRatings() {
    const ratings = [];
    this.links.forEach((link) => {
      ratings.push({
        userRating: link.userRating,
        numHighRatings: link.numHighRatings,
      });
    });
    return ratings;
  }

  gotLinkRatings() {
    this.setState({ ratings: this.fillRatings() });
  }

  waitThenCallback(callback: Function) {
    this.callbackCount += 1;
    if (this.callbackCount === this.props.links.length) {
      callback();
    }
  }

  getLinkRatings(callback: Function) {
    this.callbackCount = 0;
    this.numLinks = 0;
    this.links.forEach((link) => {
      const endpoint = `/linkrating/${this.lessonUID}/${this.topic}/${this.versionUID}/${link.hash}`;
      fetchPolyfill(endpoint, { credentials: 'same-origin' })
        .then((response) => {
          if (!response.ok) {
            this.waitThenCallback(callback);
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data: {
          status: 'ok' | 'fail',
          message?: string,
          userRating?: number,
          aveRating?: number,
          numRatings?: number,
          numHighRatings: number,
        }) => {
          let userRatingIsHigh = false;
          if (data.userRating != null && data.userRating > 3) {
            userRatingIsHigh = true;
          }
          if (data.status === 'ok') {
            /* eslint-disable no-param-reassign */
            link.numHighRatings = data.numHighRatings;
            link.userRating = data.userRating || 0;
            link.userRatingIsHigh = userRatingIsHigh;
            /* eslint-enable */
          }
          this.waitThenCallback(callback);
        })
        .catch(() => {
          this.waitThenCallback(callback);
        });
    });
  }

  setUserRating(rating: number, index: number) {
    const { cookie } = document;
    if (cookie != null) {
      const username = cookie.match(/username=[^;]*;/);
      if (username != null) {
        if (username[0].split('=')[1].slice(0, -1) === '') {
          return;
        }
      }
    }
    // const page = parseInt(getCookie('page'), 10) - 1 || 0;
    this.links[index].userRating = rating;
    const endpoint = `/ratelink/${this.lessonUID}/${this.topic}/${this.versionUID}/${this.links[index].hash}/${rating}`;

    let updateState = false;
    if (this.links[index].userRatingIsHigh && rating < 4) {
      if (this.links[index].numHighRatings != null) {
        this.links[index].numHighRatings -= 1;
      }
      this.links[index].userRatingIsHigh = false;
      updateState = true;
    }
    if (this.links[index].userRatingIsHigh === false && rating > 3) {
      if (this.links[index].numHighRatings != null) {
        this.links[index].numHighRatings += 1;
      } else {
        this.links[index].numHighRatings = 1;
      }
      this.links[index].userRatingIsHigh = true;
      updateState = true;
    }
    if (updateState) {
      this.setState({ ratings: this.fillRatings() });
    }
    fetchPolyfill(endpoint, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'done') {
          this.setState({ ratings: this.fillRatings() });
        } else {
          // console.log('failed to set rating:', data.message);
        }
      })
      .catch(() => {});
  }

  renderLinks() {
    const links = [];
    this.links.forEach((link, index) => {
      let rating = <div className="lesson__links_table__disabled">{'-'}</div>;
      if (this.props.isLoggedIn) {
        let userRatingValue = this.state.ratings[index].userRating;
        if (typeof userRatingValue !== 'number') {
          userRatingValue = 0;
        }
        rating = <Rating
          topic={this.topic}
          rating={userRatingValue}
          ratingCallback={(r, i) => { this.setUserRating(r, i); }}
          isLoggedIn={this.props.isLoggedIn}
          index={index}
        />;
      }
      let numHighRatings = <div className="lesson__links_table__disabled">
        {'-'}
      </div>;
      if (this.state.ratings[index].numHighRatings) {
        ({ numHighRatings } = this.state.ratings[index]);
      }
      const title = <a
          className="lesson__links_table__title_text"
          href={link.url}
          rel='noreferrer noopener'
          target="_blank"
        >
        {link.title}
      </a>;
      let typeClass = 'lesson__links_table__icon lesson__links_table__icon_generic';
      const { type } = link;
      if (type === 'presentation') {
        typeClass = 'lesson__links_table__icon lesson__links_table__icon_presentation';
      } else if (type === 'singlePage') {
        typeClass = 'lesson__links_table__icon lesson__links_table__icon_single_page';
      } else if (type === 'video') {
        typeClass = 'lesson__links_table__icon lesson__links_table__icon_video';
      }

      let description = null;
      if (this.hasDescription) {
        description = <td className="lesson__links_table__description">{link.description}</td>;
      }
      links.push(<tr key={index}>
        <td className="lesson__links_table__type">
          <a
            className={typeClass}
            href={link.url}
            rel='noreferrer noopener'
            target="_blank"
          >
          </a>
        </td>
        <td className="lesson__links_table__title">{title}</td>
        {description}
        <td className="lesson__links_table__your_rating">{rating}</td>
        <td className="lesson__links_table__total_rating">{numHighRatings}</td>
      </tr>);
    });
    return links;
  }

  yourRatingTitle() {
    let title = <div>
      <span className="rating__login" onClick={login}>{'Login'}</span>
      {' to rate'}
    </div>;
    if (this.props.isLoggedIn) {
      title = 'Your\nRating';
    }
    return title;
  }

  render() {
    let description = null;
    if (this.hasDescription) {
      description = <td className="lesson__links_table__description lesson__links_table__description_title">Description</td>;
    }
    // const props = Object.assign({}, this.props);
    return <table className="lesson__links_table">
      <tbody>
        <tr className="lesson__links_table__title_row">
        <td className="lesson__links_table__type_title lesson__links_table__type"></td>
        <td className="lesson__links_table__title_title lesson__links_table__title">Link</td>
        {description}
        <td className="lesson__links_table__your_rating_title lesson__links_table__your_rating">{this.yourRatingTitle()}</td>
        <td className="lesson__links_table__total_rating_title lesson__links_table__total_rating">Total Ratings ≥4</td>
        </tr>
        {this.renderLinks()}
      </tbody>
    </table>;
  }
}
