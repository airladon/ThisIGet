// @flow
import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

type Props={
  content: string | React.Element<'div'>;
  title: string | React.Element<'div'>;
  link: string | React.Element<'a'>;
  id: string;
  closeId: string;
  onClose?: () => void;
};

export default class QuickReferencePopup extends React.Component
                                    <Props> {
  // id: string;

  renderContent() {
    if (typeof this.props.content === 'string') {
      return <div
        className="topic__qr__content"
        dangerouslySetInnerHTML={ { __html: this.props.content } }>
      </div>;
    }
    return <div
      className="topic__qr__content">
      {this.props.content}
    </div>;
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    if (this.props.onClose != null) {
      this.props.onClose();
    }
    const element = document.getElementById(this.props.closeId);
    if (element != null) {
      element.classList.add('topic__hide');
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.close.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.close.bind(this));
  }

  render() {
    let link = '';
    if (typeof this.props.link === 'string') {
      link = <a
        className="topic__qr__link_link"
        id="id_topic__qr__link_link"
        href={`${window.location.origin}/content/${this.props.link}`}
        // rel='noreferrer noopener'
        // target="_blank"
      >
        Go to topic to see why
      </a>;
    }

    if (React.isValidElement(this.props.link)) {
      ({ link } = this.props);
    }

    return <div
      id={this.props.id}
      className="topic__qr"
      >
      <div className="topic__qr__title">
        <div
          className="topic__qr__title_text"
          // id="id_topic__qr__title_text"
        >
          {this.props.title}
        </div>
        <div className="topic__qr__title_close__container">
          <div className="topic__qr__title_close__cell">
            <div
              className="topic__qr__title_close"
              onClick={this.close.bind(this)}
            >
              X
            </div>
          </div>
        </div>
      </div>
      <div className="topic__qr__content_container">
        {this.renderContent()}
      </div>
      <div className="topic__qr__link_container">
        {link}
      </div>
    </div>;
  }
}

