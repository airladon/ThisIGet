// @flow
import * as React from 'react';

function tile(label, fileName) {
  const style = {
    backgroundImage: `url(/static/assets/about/${fileName})`,
  };
  return <div className="about__tiles_tile_col">
    <div className="about__tiles_tile_cell" style={style}>
      {label}
    </div>
  </div>;
}

function title(title, text) {
  return <div className="about__tiles_text">
    <div className="about__tiles_text_table">
      <div className="about__tiles_text_container">
        <div className="about__tiles_text_title">
          {title}
        </div>
        <div className="about__tiles_text_text">
          {text}
        </div>
      </div>
    </div>
  </div>;
}

export default class About extends React.Component
                                    <Props> {

  /* eslint-disable max-len */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="about__container">
      <div className="about__tiles">
        {title(
          'There are many different approaches to learning',
          'Depending on the learner or application, different appraoches might be more efficient',
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
    </div>;
  }
}
