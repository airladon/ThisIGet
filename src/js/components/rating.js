// @flow
import * as React from 'react';
import Star from './star';
// import { getCookie } from '../tools/misc';
// import { login } from '../tools/misc';

type Props = {
  topic: string,
  rating: number,
  // versionId: string,
  // lessonId: string,
  ratingCallback: Function,
  isLoggedIn: boolean,
  index?: number,
  label?: string | React.Element<'div'>,
};

export default class Rating extends React.Component
                                    <Props> {
  stars() {
    const stars = [];
    for (let i = 0; i < this.props.rating; i += 1) {
      stars.push(<Star isFull={true}
        key={i}
        callback={this.props.ratingCallback}
        index={this.props.index || 0}
        num={i + 1}
        isLoggedIn={this.props.isLoggedIn}
      />);
    }
    for (let i = this.props.rating; i < 5; i += 1) {
      stars.push(<Star isFull={false}
        num={i + 1}
        key={i}
        callback={this.props.ratingCallback}
        index={this.props.index || 0}
        isLoggedIn={this.props.isLoggedIn}
      />);
    }
    return stars;
  }

  render() {
    return <div className="rating__container">
      <div className="rating__label">
        {this.props.label || ''}
      </div>
      <div className="rating__stars">
        <div className="rating__stars_table">
            {this.stars()}
        </div>
      </div>
    </div>;
  }
}
