// @flow
import * as React from 'react';

type Props = {
  endPoint: string;
  label: string;
};

export default class FooterInformation extends React.Component
                                    <Props> {
  /* eslint-disable max-len */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="footer__item">
      <a href={`/${this.props.endPoint}`} className="footer__item__label">
        {this.props.label}
      </a>
    </div>;
  }
}
