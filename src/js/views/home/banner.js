import * as React from 'react';
import './banner.scss';

export default class HomeBanner extends React.Component
                                    <> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="home__banner">
      <div className="home__banner_logo_spacer"/>
      <div className="home__banner_logo">
        <div className="home__banner_logo_text_container">
          <div className="home__banner_logo_text">
            this i get
          </div>
        </div>
      </div>
      <div className="home__banner_sub_title">
        <table>
          <tbody>
          <tr>
            <td>Understand your way.</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>;
  }
}
