// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  link: string;
  title: string;
};

const shareOnClick = (link) => {
  // $FlowFixMe
  const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  // $FlowFixMe
  const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const idealWidth = 700;
  const idealHeight = 400;
  const width = Math.min(idealWidth, viewPortWidth);
  const height = Math.min(idealHeight, viewPortHeight);
  window.open(
    link, 'newwindow', `width=${width},height=${height}`,
  );
};

export default class ShareBar extends React.Component<Props> {
  render() {
    const twitterLink = `http://twitter.com/share?text=${this.props.title}%0A&url=${this.props.link}`;
    const facebookLink = `http://www.facebook.com/sharer/sharer.php?u=${this.props.link}`;

    const twitterOnClick = () => shareOnClick(twitterLink);
    const facebookOnClick = () => shareOnClick(facebookLink);
    const emailOnClick = () => {
      window.location.href = `mailto:?subject=${this.props.title}!&body=${this.props.link}`;
    };
    return <div id="id__share_bar" className="share_bar">
      <div className="share_bar_container">
        <div className="share_icon_container">
          <img
            className="share_icon share_icon_tw"
            onClick={twitterOnClick}
            alt="Share on Twitter"/>
        </div>
        <div className="share_icon_container">
          <img
            className="share_icon share_icon_fb"
            onClick={facebookOnClick}
            alt="Share on Facebook"/>
        </div>
        <div className="share_icon_container">
        <img
          className="share_icon share_icon_mail"
          onClick={emailOnClick}
          alt="Share with email"/>
        </div>
      </div>
    </div>;
  }
}

