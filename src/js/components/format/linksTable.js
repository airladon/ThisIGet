// @flow

import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import Rating from '../rating';
import { login } from '../../tools/misc';
import { getLinkRatings, setLinkRating } from '../../Lesson/rating';
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
  // numHighRatings: ?number;
  // userRating: ?number;
  userRatingIsHigh: boolean;
};

type Props = {
  links: Array<TypeLinkIn>,
  isLoggedIn: boolean;
};

type State = {
  ratings: Array<Array<number>>,
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
  versionPath: string;

  constructor(props: Props) {
    super(props);
    const path = window.location.pathname.replace(/^.*\/content\//, '').split('/');
    this.links = [];
    const initialRatings = [];
    props.links.forEach((link) => {
      this.links.push({
        url: link.url,
        hash: link.hash,
        type: link.type || 'generic',
        title: link.author || link.publisher || '',
        description: link.description || '',
        // numHighRatings: null,
        // userRating: 0,
        userRatingIsHigh: false,
      });
      initialRatings.push([0, 0, 0, 0]);
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
    this.versionPath = path.join('/');
    // /* eslint-enable */

    this.state = {
      ratings: initialRatings,
    };
    getLinkRatings(this.versionPath, this.gotLinkRatings.bind(this));
  }

  // fillRatings(ratings: Array<Array<number>>) {
  //   const stateRatings = [];
  //   for (let i = 0; i < this.links.length; i += 1) {
  //     const link = this.links[i];
  //     // if (ratings.length > i) {
  //     //   link.userRating = ratings[i][3];
  //     //   link.numHighRatings = ratings[i][1];
  //     // } else {
  //     //   link.userRating = 0;
  //     //   link.numHighRatings = 0;
  //     // }
  //     // if (link.userRating > 3) {
  //     //   link.userRatingIsHigh = true;
  //     // } else {
  //     //   link.userRatingIsHigh = false;
  //     // }
  //     stateRatings.push({
  //       userRating: link.userRating,
  //       numHighRatings: link.numHighRatings,
  //     });
  //   }
  //   return stateRatings;
  // }

  gotLinkRatings(ratings: Array<Array<number>>) {
    this.setState({ ratings });
  }

  waitThenCallback(callback: Function) {
    this.callbackCount += 1;
    if (this.callbackCount === this.props.links.length) {
      callback();
    }
  }

  setUserRating(rating: number, index: number) {
    const userRatingIndex = 3;
    const highRatingIndex = 1;
    const { ratings } = this.state;
    const { cookie } = document;
    if (cookie != null) {
      const username = cookie.match(/username=[^;]*;/);
      if (username != null) {
        if (username[0].split('=')[1].slice(0, -1) === '') {
          return;
        }
      }
    }
    ratings[index][userRatingIndex] = rating;

    if (this.links[index].userRatingIsHigh && rating < 4) {
      if (ratings[index][highRatingIndex] != null) {
        ratings[index][highRatingIndex] -= 1;
      }
      this.links[index].userRatingIsHigh = false;
    }
    if (this.links[index].userRatingIsHigh === false && rating > 3) {
      if (ratings[index][highRatingIndex] != null) {
        ratings[index][highRatingIndex] += 1;
      } else {
        ratings[index][highRatingIndex] = 1;
      }
      this.links[index].userRatingIsHigh = true;
    }
    this.setState({ ratings });
    setLinkRating(
      this.versionPath, this.links[index].hash, rating,
      (finalRating: Array<number>) => {
        ratings[index] = finalRating;
        this.setState({ ratings });
      },
    );
  }

  renderLinks() {
    const links = [];
    let key = 0;
    const userRatingIndex = 3;
    const highRatingIndex = 1;
    this.links.forEach((link, index) => {
      let userRatingValue = this.state.ratings[index][userRatingIndex];
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
      if (this.state.ratings[index][highRatingIndex]) {
        numHighRatings = this.state.ratings[index][highRatingIndex];
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
