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
    // const link = `/rate/${this.props.lessonId}/${this.props.topic}/${this.props.versionId}`;
    for (let i = 0; i < this.props.rating; i += 1) {
      stars.push(<Star isFull={true}
        key={i}
        callback={this.props.ratingCallback}
        num={i + 1}
      />);
    }
    for (let i = this.props.rating; i < 5; i += 1) {
      stars.push(<Star isFull={false}
        num={i + 1}
        key={i}
        callback={this.props.ratingCallback}
      />);
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
