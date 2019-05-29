// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  content: string | React.Element<'div'>;
  title: string;
  link: string;
  id: string;
};

export default class QuickReferencePopup extends React.Component
                                    <Props> {
  // id: string;

  renderContent() {
    if (typeof this.props.content === 'string') {
      return <div
        className="lesson__qr__pcontent"
        dangerouslySetInnerHTML={ { __html: this.props.content } }>
      </div>;
    }
    return <div
      className="lesson__qr__content">
      {this.props.content}
    </div>;
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    const element = document.getElementById(this.props.id);
    if (element != null) {
      element.classList.add('lesson__hide');
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.close.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.close.bind(this));
  }

  render() {
    return <div
      id={this.props.id}
      className="lesson__qr__pop_up lesson__hide"
      >
      <div className="lesson__qr__title">
        <div
          className="lesson__qr__title_text"
          id="id_lesson__qr__title_text"
        >
          {this.props.title}
        </div>
        <div
          className="lesson__qr__title_close"
          onClick={this.close.bind(this)}
        >
          X
        </div>
      </div>
      <div className="lesson__qr__content_container">
        {this.renderContent()}
      </div>
      <div className="lesson__qr__link_container">
        <a
          className="lesson__qr__link_link"
          id="id_lesson__qr__link_link"
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

