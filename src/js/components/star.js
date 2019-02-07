// @flow
import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  isFull: boolean;
  link: string;
};

export default class Star extends React.Component <Props> {
  postRating() {
    fetchPolyfill(this.props.link, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .catch(() => {});
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
      {/*<a href={this.props.link}
        className="rating__stars_link"
      />*/}
      <div className="rating__stars_link" onClick={this.postRating()}/>
    </div>;
  }
}

