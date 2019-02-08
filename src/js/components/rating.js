// @flow
import * as React from 'react';
import Star from './star';

type Props = {
  topic: string,
  rating: number,
  // versionId: string,
  // lessonId: string,
  ratingCallback: Function,
  isLoggedIn: boolean,
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
        isLoggedIn={this.props.isLoggedIn}
      />);
    }
    for (let i = this.props.rating; i < 5; i += 1) {
      stars.push(<Star isFull={false}
        num={i + 1}
        key={i}
        callback={this.props.ratingCallback}
        isLoggedIn={this.props.isLoggedIn}
      />);
    }
    return stars;
  }

  getRatingLabel() {
    const topic = this.props.topic.charAt(0).toUpperCase() + this.props.topic.slice(1);
    if (this.props.isLoggedIn) {
      return `Did this ${topic} help you understand?`;
    }
    return `Login to rate ${topic}`;
  }

  render() {
    return <div className="rating__container">
      <div className="rating__label">
        {this.getRatingLabel()}:
      </div>
      <div className="rating__stars">
        <div className="rating__stars_table">
            {this.stars()}
        </div>
      </div>
    </div>;
  }
}
