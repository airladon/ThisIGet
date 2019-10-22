// @flow
import * as React from 'react';
import FooterInformation from './footerInformation';

type Props = {
  includeHome?: boolean;
};

export default class Footer extends React.Component
                                    <Props> {
  includeHome() {
    if (this.props.includeHome != null && this.props.includeHome === false) {
      return '';
    }
    return <FooterInformation label="Home" endPoint=""/>;
  }

  /* eslint-disable max-len */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="footer__container">
      <div className="footer__terms_of_use">By using this site you agree to the <a href="/privacy" className="footer__terms_of_use__link">Privacy Policy</a> and <a href="/terms" className="footer__terms_of_use__link">Terms of Use</a></div>
      <FooterInformation label="About" endPoint="about"/>
      <FooterInformation label="Introduction" endPoint="introduction"/>
      <FooterInformation label="Privacy" endPoint="privacy"/>
      <FooterInformation label="Terms of Use" endPoint="privacy"/>
      <FooterInformation label="Copyright" endPoint="copyright"/>
      <FooterInformation label="Contact" endPoint="contact"/>
      {this.includeHome()}
    </div>;
  }
}
