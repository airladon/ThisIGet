// @flow
import * as React from 'react';

type Props = {
  id: string;
};

export default class PresentationQR extends React.Component
                                    <Props> {
  render() {
    return <div id={this.props.id} className="lesson__qr__overlay">
      <div id="lesson__qr__container">
        <div id="id_qr_diagram" className="diagram__container lesson__diagram">
          <canvas id="id_qr_diagram__text" className='diagram__text'>
          </canvas>
          <canvas id="id_qr_diagram__gl" className='diagram__gl'>
          </canvas>
          <div id="id_diagram__html" className='diagram__html'>
          </div>
        </div>
      </div>
    </div>;
  }
}
