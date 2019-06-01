// @flow
import * as React from 'react';
import QuickReferencePopup from './quickReferencePopup';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  content: string | React.Element<'div'>;
  title: string;
  link: string;
};

export default class StaticQR extends React.Component
                                    <Props> {
  id: string;

  render() {
    return <QuickReferencePopup
      id="id_lesson__qr__content_static"
      content={this.props.content}
      title={this.props.title}
      link={this.props.link}
      closeId="id_lesson__qr__static_container"
    />;
  }
}
