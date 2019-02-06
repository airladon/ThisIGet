// // @flow

import React from 'react';
// import ReactDOM from 'react-dom';

type Props = {
  title?: string;
};

export default class LoginTitle extends React.Component<Props> {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <div>
      <div className="login_title_spacer"/>
        <div className="home__banner_logo login_title__logo">
          <div className="home__banner_logo_text_container">
            <div className="home__banner_logo_text login_title__logo_text">
              this i get
            </div>
          </div>
        </div>
        <div className="login_title">
          {props.title}
        </div>
      </div>
    );
  }
}
