// @flow

import * as React from 'react';
// import '../../css/style.scss';
// import img from '../../tile.png';

type Props = {
  links: Array<{
    link: string;
    uid?: string;
    description?: string;
  }>,
};

type State = {
  ratings: {
    [linkUID: string]: {
      userRating: number;
      totalRating: number;
    }
  },
};

export default class LinksTable extends React.Component
                                    <Props, State> {
  constructor(props: Props) {
    super(props);
    // const path = window.location.pathname.split('/');
    /* eslint-disable prefer-destructuring */
    // this.lessonUID = path.slice(-3, -2)[0];
    // this.versionUID = path.slice(-1)[0];
    // this.topic = path.slice(-2, -1)[0];
    // /* eslint-enable */
    // this.lessonDescription = getLessonDescription(this.lessonUID);
    // this.state = {
    //   userRating: 0,
    //   ratings: this.fillRatings(),
    // };
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

  // waitThenCallback(callback: Function) {
  //   this.callbackCount += 1;
  //   if (this.callbackCount === this.numVersions) {
  //     callback();
  //   }
  // }

  // getLinkRatings(callback: Function) {
  //   this.callbackCount = 0;
  //   this.numLinks = 0;
  //   Object.keys(this.topics).forEach((topicName) => {
  //     const topic = this.topics[topicName];
  //     this.numVersions += Object.keys(topic).length;
  //     Object.keys(topic).forEach((versionUID) => {
  //       const version = topic[versionUID];
  //       const link = `/rating/${this.uid}/${topicName}/${versionUID}`;
  //       fetchPolyfill(link, { credentials: 'same-origin' })
  //         .then((response) => {
  //           if (!response.ok) {
  //             this.waitThenCallback(callback);
  //             throw Error(response.statusText);
  //           }
  //           return response.json();
  //         })
  //         .then((data: {
  //           status: 'ok' | 'fail',
  //           message?: string,
  //           userRating?: number,
  //           aveRating?: number,
  //           numRatings?: number,
  //           numHighRatings: number,
  //         }) => {
  //           if (data.status === 'ok') {
  //             version.aveRating = data.aveRating;
  //             version.numRatings = data.numRatings;
  //             version.numHighRatings = data.numHighRatings;
  //             version.userRating = data.userRating;
  //           }
  //           this.waitThenCallback(callback);
  //         })
  //         .catch(() => {
  //           this.waitThenCallback(callback);
  //         });
  //     });
  //   });
  // }
  renderLinks() {
    const links = [];
    this.props.links.forEach((link, index) => {
      links.push(<tr key={index}>
        <td>{link.link}</td>
        <td>{link.description}</td>
        <td>3</td>
        <td>4</td>
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
