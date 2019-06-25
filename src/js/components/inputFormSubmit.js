// // @flow

import React from 'react';

type Props = {
  label: string,
  onError: string,
};


export default class InputFormSubmit extends React.Component<Props> {
  render() {
    // const props = Object.assign({}, this.props);
    const { props } = this;
    return <div>
      <div className="input_form__submit_container">
        <div className="input_form__submit_container_small">
          <input type="submit" value={props.label} className="login_submit" />
          <div className="input_form__submit_failed">
            {props.onError}
          </div>
        </div>
      </div>
    </div>;
  }
}
