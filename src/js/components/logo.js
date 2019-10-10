// @flow

import * as React from 'react';

type Props = {};

export default class Logo extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="logo__container_all">
      <div className="logo__text_container">
        <div className="logo__text">
          This I Get
        </div>
      </div>
    </div>;
  }
}
