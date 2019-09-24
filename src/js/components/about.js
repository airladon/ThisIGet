// @flow
import * as React from 'react';
import Logo from './logo';

function tile(label, fileName) {
  const style = {
    backgroundImage: `url(/static/assets/about/${fileName})`,
  };
  return <div className="about__tiles_tile_col">
    <div className="about__tiles_tile_container">
      <div className="about__tiles_tile_img" style={style}></div>
      <div className="about__tiles_tile_label">{label}</div>
    </div>
  </div>;
}

function title(titleText, subText, textRight = false) {
  let classes = 'about__tiles_text';
  if (textRight) {
    classes = 'about__tiles_text about__tiles_text_right';
  }
  return <div className={classes}>
    <div className="about__tiles_text_table">
      <div className="about__tiles_text_container">
        <div className="about__tiles_text_title">
          {titleText}
        </div>
        <div className="about__tiles_text_text">
          {subText}
        </div>
      </div>
    </div>
  </div>;
}

type Props = {};

export default class About extends React.Component
                                    <Props> {
  /* eslint-disable max-len */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="about__container">
      <div className="about__spacer"></div>
      <div className="about_section">
        <div className="about__tiles">
          {title(
            'Learning can be approached in different ways',
            'Are you trying to understand something, or just remember it? Do you want the concept shown to you, or do you want to figure it out?',
          )}
          <div className="about__tiles_tiles">
            <div className="about__tiles_group">
              {tile('Discovery', 'discovery.png')}
              {tile('Explanation', 'explanation.png')}
            </div>
            <div className="about__tiles_group">
              {tile('Examples', 'examples.png')}
              {tile('Practice', 'practice.png')}
            </div>
          </div>
        </div>
      </div>
      <div className="about__spacer"></div>
      <div className="about_section">
        <div className="about__tiles">
          {title(
            'Content can be described in different ways',
            'Do you prefer descriptive or brief content? Maybe both? Are interactive diagrams helpful or a distraction for you?',
            true,
          )}
          <div className="about__tiles_tiles">
            <div className="about__tiles_group">
              {tile('Detailed', 'detailed.png')}
              {tile('Intuitive', 'intuitive.png')}
            </div>
            <div className="about__tiles_group">
              {tile('Interactive', 'interactive.png')}
              {tile('Precise', 'precise.png')}
            </div>
          </div>
        </div>
      </div>
      <div className="about__spacer"></div>
      <div className="about_section">
        <div className="about__tiles">
          <div className="about__title">
            <div className="about__arrow_text">{'Different ways resonate with different people'}</div>
            <div className="about__arrow_subtext">{'Your individual experiences, knowledge, language, context, personality and learning goals influence your preferred way to learn.'}</div>
            <div className="about__arrow_subtext">{"If one way of learning is not sufficient for everybody, then let's make them all available."}</div>
            <img className="about__arrow" src="/static/assets/about/arrow.png"></img>
          </div>
        </div>
      </div>
      <div className="about__spacer"></div>
      <div className="about_section">
        <div className="about__tiles about__logo_section">
            <div className="about__logo">
              <div className="about__logo_table">
                <div className="about__logo_container">
                  <Logo />
                </div>
              </div>
            </div>
            {title(
              'Different versions of the same content',
              'Find the way that works for you, and rate it for others',
            )}
        </div>
      </div>
      <div className="about__spacer"></div>
      <div className="about__spacer"></div>
      <div className="about__spacer"></div>
      <div className="about__spacer"></div>
      <div className="about__spacer"></div>
      <div className="about__spacer"></div>
      <div className="about__spacer"></div>
      <div className="about_section about__get_started">
        <div className="about__tiles">
          <div className="about__title">
            <div className="about__get_started_text">{'Get Started'}</div>
            <div className="about__get_started_subtext">{'Navigate the learning path below and select a topic to start.'}</div>
          </div>
        </div>
      </div>
    </div>;
  }
}
