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
      <div className="qr_container">
        {
        /* }
        <div className="lesson__popup_box__title">
          <div className="lesson__popup_box__title_i">
          </div>
          <div className="lesson__popup_box__close">
          </div>
          <div className="lesson__popup_box__title_text">
          </div>
        </div> */
      }
        <div id="id_qr_diagram" className="diagram__container lesson__diagram">
          <canvas id="id_qr_diagram__text" className='diagram__text'>
          </canvas>
          <canvas id="id_qr_diagram__gl" className='diagram__gl'>
          </canvas>
          <div id="id_diagram__html" className='diagram__html'>
          </div>
        </div>
        <div className="lesson__popup_box__text">
        </div>
        <div className="lesson__popup_box__link">
        </div>
      </div>
    );
  }
}
