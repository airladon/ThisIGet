// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  isFull: boolean;
  num: number;
  callback: Function;
  isLoggedIn: boolean;
  index: number;
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
    this.props.callback(this.props.num, this.props.index);
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
    let link = <div></div>;
    const keydown = (event: KeyboardEvent) => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        this.setRating();
      }
    };
    if (this.props.isLoggedIn) {
      link = <div
        className="rating__stars_link rating__stars_star_active"
        onClick={this.setRating.bind(this)}
        tabIndex={0}
        role="button"
        onKeyDown={keydown}
      />;
    }

    return <div className="rating__stars_star">
      {this.star()}
      {link}
    </div>;
  }
}

