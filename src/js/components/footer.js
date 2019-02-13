import * as React from 'react';

export default class Footer extends React.Component
                                    <> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="footer__container">
      <div className="footer_contact">
        <a
          href="mailto:feedback@thisiget.com?Subject=Feedback"
          className="footer_email"
          >
          feedback@thisiget.com
        </a>
      </div>
    </div>;
  }
}
