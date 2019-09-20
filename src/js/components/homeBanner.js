// @flow
import * as React from 'react';

type Props = {};

export default class HomeBanner extends React.Component
                                    <Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="home__banner">
      <div className="home__banner_logo_spacer"/>
      <div className="home__banner_logo">
        <div className="home__banner_logo_text_container">
          <div className="home__banner_logo_text">
            This I Get
          </div>
        </div>
      </div>
      <div className="home__banner_sub_title">
        <table>
          <tbody>
          <tr>
            <td>Understand Your Way</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>;
  }
}
