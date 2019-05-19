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
    const path = window.location.pathname.split('/');
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

  render() {
    const props = Object.assign({}, this.props);

    return <table className="lesson__links_table">
      <tbody>
        <tr className="lesson__links_table__title_row">
          <td className="lesson__links_table__link_title">Link</td>
          <td className="lesson__links_table__description_title">Description</td>
          <td className="lesson__links_table__your_rating_title">{'Your\nRating'}</td>
          <td className="lesson__links_table__total_rating_title">Total Ratings ≥4</td>
        </tr>
        {this.renderLinks}
      </tbody>
    </table>;
  }
}
