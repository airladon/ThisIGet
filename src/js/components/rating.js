import * as React from 'react';

export default class Rating extends React.Component
                                    <> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="rating__container">
      <div className="rating__label">
        Login to rate Explanation:
      </div>
      <div className="rating__stars">
        {'\u2606 \u2606 \u2606 \u2606 \u2606'}
      </div>
    </div>;
  }
}
