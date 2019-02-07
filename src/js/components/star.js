// @flow
import * as React from 'react';

type Props={
  isFull: boolean;
};

export default class Star extends React.Component <Props> {
  star() {
    if (this.props.isFull) {
      return <div className="rating__stars_full">
        { /* '\u2605' */ }
      </div>;
    }

    return <div className="rating__stars_empty">
        { /* '\u2606' */ }
    </div>;
  }

  render() {
    return <div className="rating__stars_star">
      {this.star()}
    </div>;
  }
}

