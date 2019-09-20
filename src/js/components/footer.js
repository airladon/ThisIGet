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
      <FooterInformation label="About" endPoint="about"/>
      <FooterInformation label="Introduction" endPoint="introduction"/>
      { /* <FooterInformation label="Privacy" endPoint="privacy"/> */ }
      { /* <FooterInformation label="Copyright" endPoint="copyright"/> */ }
      <FooterInformation label="Contact" endPoint="contact"/>
      {this.includeHome()}
    </div>;
  }
}
