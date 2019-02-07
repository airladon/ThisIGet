// @flow
import * as React from 'react';
import Star from './star';

type Props = {
  topicName: string,
  rating: number,
  topicUid: string,
};

export default class Rating extends React.Component
                                    <Props> {
  stars() {
    const stars = [];
    let num = 5;
    for (let i = 0; i < 5 - this.props.rating; i += 1) {
      stars.push(<Star isFull={false}
        link={`/rating/${this.props.topicUid}/${num}`}
        key={num}
      />);
      num -= 1;
    }
    for (let i = 0; i < this.props.rating; i += 1) {
      stars.push(<Star isFull={true}
        link={`/rating/${this.props.topicUid}/${num}`}
        key={num}
      />);
      num -= 1;
    }
    return stars;
  }

  render() {
    return <div className="rating__container">
      <div className="rating__label">
        {`Login to rate ${this.props.topicName}`}:
      </div>
      <div className="rating__stars">
        <div className="rating__stars_table">
            {this.stars()}
        </div>
      </div>
    </div>;
  }
}
