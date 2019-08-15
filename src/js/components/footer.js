import * as React from 'react';

export default class Footer extends React.Component
                                    <> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="footer__container">
      <div className="footer__terms_of_use">
        By using this site, you agree to the <a href="/terms" className="footer__terms_of_use__link">Terms of Use</a> and <a href="/privacy" className="footer__terms_of_use__link">Privacy Policy</a>.
      </div>
      <div className="footer__item">
      <a
            href="/about"
            className="footer__item__label"
            >
            About
      </a>
      </div>

      <div className="footer__item">
      <a
            href="/terms"
            className="footer__item__label"
            >
            Terms of Use
      </a>
      </div>

      <div className="footer__item">
      <a
            href="/privacy"
            className="footer__item__label"
            >
            Privacy Policy
      </a>
      </div>

      <div className="footer__item">
      <a
            href="/disclaimer"
            className="footer__item__label"
            >
            Disclaimer
      </a>
      </div>
      <div className="footer__item">
      <a
            href="mailto:feedback@thisiget.com?Subject=Feedback"
            className="footer__item__label"
            >
            Contact
      </a>
      </div>
    </div>;
  }
}
