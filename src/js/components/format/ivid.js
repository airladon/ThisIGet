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
import type { Props } from './interactiveBase';

export default class IVideoFormatComponent extends InteractiveFormatComponent {

  constructor(props: Props) {
    super(props);
    this.state.buttonClasses = 'hide__override';
    this.state.topicContainerClasses = 'topic__container__ivid';
  }

  componentDidMount() {
    super.componentDidMount();
    const diagram = this.getDiagram();
    if (diagram != null) {
      // console.log(diagram.recorder.duration)
      this.setState({
        duration: diagram.recorder.duration
      });
    }
    const elements = document.getElementsByClassName('figureone_dev_only');
    
    // for (let i = 0; i < elements.length; i += 1) {
    //   elements[i].style.visibility = 'hidden';
    // }
    // console.log('1234')
    // console.log(this.state)
  }

  toggleDev() {
    if (this.state.buttonClasses === '') {
      this.setState({
        buttonClasses: 'hide__override',
        topicContainerClasses: 'topic__container__ivid',
        dev: false,
      });
      const container = document.getElementById('id_figureone__html');
      container.classList.remove('figureone_dev');
    } else {
      this.setState({
        buttonClasses: '',
        topicContainerClasses: '',
        dev: true,
      });
      const container = document.getElementById('id_figureone__html');
      container.classList.add('figureone_dev');
    //   for (let i = 0; i < elements.length; i += 1) {
    //     elements[i].style.visibility = 'visible';
    //   }
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
        <div id="topic__container_name" className={`topic__container ${this.state.topicContainerClasses}`}>
          {this.addPrevButton()}
          <div id={this.version.content.diagramHtmlId} className="diagram__container topic__diagram">
            <canvas id="id_figureone__gl__low" className='figureone__gl'>
            </canvas>
            <canvas id="id_figureone__text__low" className='figureone__text'>
            </canvas>
            <PlaybackControl
              // getDiagram={this.getDiagram.bind(this)}
              diagram={this.state.diagram}
              dev={this.state.dev}
              duration={this.state.duration}
              tester={() => {
                this.componentUpdateCallback = null
              }}
            />
            { /*<div id="id_ivid_animation_finishing" className="ivid_animation_finishing_container ivid_animation_hidden">
              <div className="ivid_animation_finishing_text">
                Animation Finishing before interaction
              </div>
              <div className="ivid_animating_finishing_progress_container">
                <div className="ivid_animating_finishing_progress_rot ivid_animating_finishing_progress_half_circle"></div>
                <div className="ivid_animating_finishing_progress_fixed ivid_animating_finishing_progress_half_circle"></div>
                <div className="ivid_animating_finishing_progress_mask ivid_animating_finishing_progress_half_circle"></div>
              </div>
            </div>
            */ }
            <div id="id_figureone__html" className='figureone__html'>
              {this.renderContent(this.state.htmlText)}
              <div className="figureone__text_measure" id={`${this.version.content.diagramHtmlId}_measure`}>
                {'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}
              </div>
            </div>
            {/* <video controls id="id_video" className="temp_video" src="/static/test.mp4" type="video/mp4"></video> */}
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
