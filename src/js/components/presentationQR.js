// @flow
import * as React from 'react';
import QuickReferencePopup from './quickReferencePopup';

type Props = {
  id: string;
  onClose?: () => void;
  // title: string;
  // link: string;
};

export default class PresentationQR extends React.Component
                                    <Props> {
  renderContent() {
    return <div id={this.props.id} className="lesson__presentation_qr__container">
        <div id="id_qr_diagram" className="diagram__container lesson__diagram">
          <canvas id="id_qr_diagram__text" className='diagram__text'>
          </canvas>
          <canvas id="id_qr_diagram__gl" className='diagram__gl'>
          </canvas>
          <div id="id_qr_diagram__html" className='diagram__html'>
            <div id="id_lesson__qr_diagram_container">
            </div>
            <div id="id_lesson__qr_description_container" className="lesson__qr_description_container">
              <div className="lesson__qr_description_table_cell">
                <div className="lesson__qr_description_relative">
                  <div className="lesson__qr_description_text" id="id_lesson__qr_description">
                  </div>
                </div>
              </div>
            </div>
            <div className="diagram__text_measure" id={`${this.props.id}_measure`}>
              {'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}
            </div>
          </div>
        </div>
    </div>;
  }

  render() {
    const title = <div id="id_lesson__qr__title_text__pres"></div>;
    const link = <a
        className="lesson__qr__link_link"
        id="id_lesson__qr__link_link__pres"
        href={''}
        // rel='noreferrer noopener'
        // target="_blank"
      >
        Go to lesson to see why
    </a>;
    return <QuickReferencePopup
      id="id_lesson__qr__content_pres"
      content={this.renderContent()}
      title={title}
      link={link}
      closeId="id_lesson__qr__pres_container"
      onClose={this.props.onClose}
    />;
  }
}
