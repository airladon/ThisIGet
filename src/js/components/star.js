// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  isFull: boolean;
  num: number;
  callback: Function;
};

export default class Star extends React.Component
                                    <Props> {
  // postRating() {
  //   this.props.callback()
  //   fetchPolyfill(this.props.link, { credentials: 'same-origin' })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //     })
  //     .catch(() => {});
  // }

  setRating() {
    this.props.callback(this.props.num);
  }

  star() {
    if (this.props.isFull) {
      return <div className="rating__stars_full">
      </div>;
    }

    return <div className="rating__stars_empty">
    </div>;
  }

  render() {
    return <div className="rating__stars_star">
      {this.star()}
      <div className="rating__stars_link" onClick={this.setRating.bind(this)}/>
    </div>;
  }
}

