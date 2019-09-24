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

function title(titleText, subText) {
  return <div className="about__tiles_text">
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
      <div className="about__tiles">
        {title(
          'Learning can be approached in different ways',
          'Different people and applications prefer different approaches',
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
      <div className="about__tiles">
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
        {title(
          'Content can be described in different ways',
          'Different ways resonate with different, their goals and their context',
        )}
      </div>
      <div className="about__title">
        {"So let's combine them"}
      </div>
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
    </div>;
  }
}
