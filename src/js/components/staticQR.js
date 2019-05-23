// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  content: string | React.Element<'div'>;
  title: string;
  link: string;
};

export default class StaticQR extends React.Component
                                    <Props> {
  renderContent() {
    if (typeof this.props.content === 'string') {
      return <div
        className="lesson__static_qr__pop_up_content"
        dangerouslySetInnerHTML={ { __html: this.props.content } }>
      </div>;
    }
    return <div
      className="lesson__static_qr__pop_up_content">
      {this.props.content}
    </div>;
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    const element = document.getElementById('id_lesson__static_qr__popup');
    if (element != null) {
      element.classList.add('lesson__static_qr__pop_up__hide');
    }
  }

  render() {
    return <div
      id="id_lesson__static_qr__popup"
      className="lesson__static_qr__pop_up lesson__static_qr__pop_up__hide"
      >
      <div className="lesson__static_qr__title">
        <div className="lesson__static_qr__title_text">
          {this.props.title}
        </div>
        <div className="lesson__static_qr__title_close" onClick={this.close.bind(this)}>
          X
        </div>
      </div>
      {this.renderContent()}
      <div className="lesson__static_qr__link_container">
        <a className="lesson__static_qr__link_link"
          href={`${window.location.origin}/Lessons/${this.props.link}`}
          rel='noreferrer noopener'
          target="_blank"
        >
          Go to lesson to see why
        </a>
      </div>
    </div>;
  }
}

