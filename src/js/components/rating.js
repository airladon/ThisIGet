// @flow
import * as React from 'react';
import Star from './star';

type Props = {
  topic: string,
  rating: number,
  versionId: string,
  lessonId: string,
  ratingCallback: Function,
};

export default class Rating extends React.Component
                                    <Props> {
  stars() {
    const stars = [];
    let num = 5;
    // const link = `/rate/${this.props.lessonId}/${this.props.topic}/${this.props.versionId}`;
    for (let i = 0; i < 5 - this.props.rating; i += 1) {
      stars.push(<Star isFull={false}
        key={num}
        callback={this.props.ratingCallback}
        num={num}
      />);
      num -= 1;
    }
    for (let i = 0; i < this.props.rating; i += 1) {
      stars.push(<Star isFull={true}
        num={num}
        key={num}
        callback={this.props.ratingCallback}
      />);
      num -= 1;
    }
    return stars;
  }

  render() {
    return <div className="rating__container">
      <div className="rating__label">
        {`Login to rate ${this.props.topic}`}:
      </div>
      <div className="rating__stars">
        <div className="rating__stars_table">
            {this.stars()}
        </div>
      </div>
    </div>;
  }
}
