// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  content: string | React.Element<'div'>;
};

export default class StaticQR extends React.Component
                                    <Props> {
  render() {
    if (typeof this.props.content === 'string') {
      return <div
        id="id_lesson__static_qr__popup"
        className="lesson__static_qr__pop_up lesson__static_qr__pop_up__hide"
        dangerouslySetInnerHTML={ { __html: this.props.content } }>
      </div>;
    }
    return <div
      id="id_lesson__static_qr__popup"
      className="lesson__static_qr__pop_up lesson__static_qr__pop_up__hide">
      {this.props.content}
    </div>;
  }
}

