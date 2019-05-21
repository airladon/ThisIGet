// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import Rating from './rating';
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
};

type TypeLink = {
  url: string;
  hash: string;
  type: 'presentation' | 'generic' | 'video',
  description: string;
  numHighRatings: ?number;
  userRating: ?number;
};

type Props = {
  links: Array<TypeLinkIn>,
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

  constructor(props: Props) {
    super(props);
    const path = window.location.pathname.split('/');
    this.links = [];
    props.links.forEach((link) => {
      this.links.push({
        url: link.url,
        hash: link.hash,
        type: link.type || 'generic',
        description: link.author || link.publisher || '',
        numHighRatings: null,
        userRating: null,
      });
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
          if (data.status === 'ok') {
            link.numHighRatings = data.numHighRatings;
            link.userRating = data.userRating;
          }
          this.waitThenCallback(callback);
        })
        .catch(() => {
          this.waitThenCallback(callback);
        });
    });
  }

  renderLinks() {
    const links = [];
    this.links.forEach((link, index) => {
      links.push(<tr key={index}>
        <td>{link.url}</td>
        <td>{link.description}</td>
        <td><Rating
          topic={this.topic}
          rating={this.state.ratings[index].userRating || 0}
          ratingCallback={this.setUserRating.bind(this)}
          isLoggedIn={this.props.isLoggedIn}
        /></td>
        <td>{this.state.ratings[index].numHighRatings}</td>
      </tr>);
    });
    return links;
  }

  render() {
    // const props = Object.assign({}, this.props);

    return <table className="lesson__links_table">
      <tbody>
        <tr className="lesson__links_table__title_row">
          <td className="lesson__links_table__link_title">Link</td>
          <td className="lesson__links_table__description_title">Description</td>
          <td className="lesson__links_table__your_rating_title">{'Your\nRating'}</td>
          <td className="lesson__links_table__total_rating_title">Total Ratings ≥4</td>
        </tr>
        {this.renderLinks()}
      </tbody>
    </table>;
  }
}
