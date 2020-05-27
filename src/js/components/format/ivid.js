// @flow
// import Fig from 'figureone';
import * as React from 'react';
// import PresentationFormat from '../../TopicFormat/PresentationFormat';
// import Button from '../button';
// import DropDownButton from '../dropDownButton';
// import { getCookie, createCookie, getCurrentPath } from '../../tools/misc';
import PresentationQR from '../presentationQR';
// import StaticQR from '../staticQR';
import PlaybackControl from '../playbackControl';
import InteractiveFormatComponent from './interactiveBase';

export default class IVideoFormatComponent extends InteractiveFormatComponent {

  toggleDev() {
    if (this.state.buttonClasses === '') {
      this.setState({ buttonClasses: 'topic__hide' });
    } else {
      this.setState({ buttonClasses: '' });
    }
  }

  addDevToggleButton() {
    return <div id="id_topic__dev_toggle_button__container"
      onClick={this.toggleDev.bind(this)}
      className="topic__dev_toggle_button__container">
        Toggle Dev
      </div>;
  }

  render() {
    return <div>
      <main>
      <div className="topic__widescreen_backdrop" id={this.version.content.htmlId}>
        <div id="topic__container_name" className="topic__container">
          {this.addPrevButton()}
          <div id={this.version.content.diagramHtmlId} className="diagram__container topic__diagram">
            <canvas id="id_figureone__gl__low" className='figureone__gl'>
            </canvas>
            <canvas id="id_figureone__text__low" className='figureone__text'>
            </canvas>
            <PlaybackControl getDiagram={this.getDiagram.bind(this)}/>
            <div id="id_figureone__html" className='figureone__html'>
              {this.renderContent(this.state.htmlText)}
              <div className="figureone__text_measure" id={`${this.version.content.diagramHtmlId}_measure`}>
                {'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}
              </div>
            </div>
            <div id="id_topic__qr__static_container" className="topic__qr__container topic__hide">
              {this.state.qr}
            </div>
            <div id="id_topic__qr__pres_container" className="topic__qr__container topic__hide">
              <PresentationQR
                id="id_topic__qr__content_pres__overlay"
                onClose={this.version.content.prepareToHideQR.bind(this.version.content)}
              />
            </div>
          </div>
          {this.addGoToButton()}
          {this.addNextButton()}
          {this.addInfoButton()}
          {this.addInteractiveElementButton()}
          {this.addDevToggleButton()}
        </div>
      </div>
      </main>
    </div>;
  }
}
