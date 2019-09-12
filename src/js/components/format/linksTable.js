// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import Rating from '../rating';
import { login } from '../../tools/misc';
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
  topicUID: string;
  approachUID: string;
  versionUID: string;
  callbackCount: number;
  numLinks: number;
  links: Array<TypeLink>;
  hasDescription: boolean;

  constructor(props: Props) {
    super(props);
    const path = window.location.pathname.replace(/\/$/, '').split('/');
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
    this.topicUID = path.slice(-3, -2)[0];
    this.approachUID = path.slice(-2, -1)[0];
    this.versionUID = path.slice(-1)[0];
    // /* eslint-enable */
    // this.topicDescription = getTopicDescription(this.topicUID);
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
    // if (this.topicDescription != null) {
    //   this.topicDescription.getRatings(this.gotRatings.bind(this));
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
      const endpoint = `/linkrating/${this.topicUID}/${this.approachUID}/${this.versionUID}/${link.hash}`;
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
    const endpoint = `/ratelink/${this.topicUID}/${this.approachUID}/${this.versionUID}/${this.links[index].hash}/${rating}`;

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
    let key = 0;
    this.links.forEach((link, index) => {
      // let rating = <div className="approach__links_table__disabled">{'-'}</div>;
      // if (this.props.isLoggedIn) {
      let userRatingValue = this.state.ratings[index].userRating;
      if (typeof userRatingValue !== 'number') {
        userRatingValue = 0;
      }
      const rating = <Rating
        topic={this.approachUID}
        rating={userRatingValue}
        ratingCallback={(r, i) => { this.setUserRating(r, i); }}
        isLoggedIn={this.props.isLoggedIn}
        index={index}
      />;
      // }
      let numHighRatings = <div className="approach__links_table__disabled">
        {'-'}
      </div>;
      if (this.state.ratings[index].numHighRatings) {
        ({ numHighRatings } = this.state.ratings[index]);
      }
      const title = <a
          className="approach__links_table__title_text"
          href={link.url}
          // rel='noreferrer noopener'
          // target="_blank"
        >
        {link.title}
      </a>;
      let typeClass = 'approach__links_table__icon approach__links_table__icon_generic';
      const { type } = link;
      if (type === 'presentation') {
        typeClass = 'approach__links_table__icon approach__links_table__icon_presentation';
      } else if (type === 'singlePage') {
        typeClass = 'approach__links_table__icon approach__links_table__icon_single_page';
      } else if (type === 'video') {
        typeClass = 'approach__links_table__icon approach__links_table__icon_video';
      }

      let description = null;
      if (this.hasDescription) {
        description = <td className="approach__links_table__description">{link.description}</td>;
      }
      links.push(<tr key={key} className="approach__links_table__large_screen">
        <td className="approach__links_table__type">
          <a
            className={typeClass}
            href={link.url}
            rel='noreferrer noopener'
            target="_blank"
            aria-label={link.title}
          >
          </a>
        </td>
        <td className="approach__links_table__title">{title}</td>
        {description}
        <td className="approach__links_table__your_rating">{rating}</td>
        <td className="approach__links_table__total_rating">{numHighRatings}</td>
      </tr>);
      key += 1;

      // if (!this.props.isLoggedIn) {
      //   rating = <span className="rating__login" onClick={login}>{'Login'}</span>
      // }
      links.push(<tr key={key} className="approach__links_table__small_screen">
        <td className="approach__links_table__small_screen__content">
          <table><tbody>
            <tr>
              <td>
                <div className="approach__links_table__small_screen__type_container">
                  <div className="approach__links_table__small_screen__type">
                    <a
                      className={typeClass}
                      href={link.url}
                      rel='noreferrer noopener'
                      target="_blank"
                      aria-label={link.title}
                    >
                    </a>
                  </div>
                </div>
                <div className="approach__links_table__small_screen__link_container">
                  <div className="approach__links_table__small_screen__link">
                    {title}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              {description}
            </tr>
            <tr>
              <td className="approach__links_table__total_rating">
                <div className="approach__links_table__small_screen__title">
                    {'Total Ratings ≥4:'}
                </div>
                <div className="approach__links_table__small_screen__value">
                  {numHighRatings}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="approach__links_table__small_screen__title">
                  {this.yourRatingTitle(true)}
                </div>
                {rating}
              </td>
            </tr>
          </tbody></table>
        </td>
        </tr>);
      key += 1;
    });
    return links;
  }

  yourRatingTitle(useColon: boolean = false) {
    let colon = '';
    if (useColon) {
      colon = ':';
    }
    let title = <div>
      <span className="rating__login" onClick={login}>{'Login'}</span>
      {` to rate${colon}`}
    </div>;
    if (this.props.isLoggedIn) {
      title = 'Your\nRating';
    }
    return title;
  }

  render() {
    let description = null;
    if (this.hasDescription) {
      description = <td className="approach__links_table__description approach__links_table__description_title">Description</td>;
    }
    // const props = Object.assign({}, this.props);
    return <table className="approach__links_table">
      <tbody>
        <tr className="approach__links_table__title_row approach__links_table__large_screen">
        <td className="approach__links_table__type_title approach__links_table__type"></td>
        <td className="approach__links_table__title_title approach__links_table__title">Link</td>
        {description}
        <td className="approach__links_table__your_rating_title approach__links_table__your_rating">{this.yourRatingTitle()}</td>
        <td className="approach__links_table__total_rating_title approach__links_table__total_rating">Total Ratings ≥4</td>
        </tr>
        {this.renderLinks()}
      </tbody>
    </table>;
  }
}
