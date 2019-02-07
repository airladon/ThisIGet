// @flow
import * as React from 'react';
import Star from './star';

type Props = {
  topicName: string,
  rating: number,
};

export default class Rating extends React.Component
                                    <Props> {
  stars() {
    const stars = [];
    for (let i = 0; i < 5 - this.props.rating; i += 1) {
      stars.push(<Star isFull={false}/>);
    }
    for (let i = 0; i < this.props.rating; i += 1) {
      stars.push(<Star isFull={true}/>);
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
          <tr>
            {this.stars()}
          </tr>
        </div>
      </div>
    </div>;
  }
}
