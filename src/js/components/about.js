// @flow
import * as React from 'react';

function tile(id, label) {
  return <div className="about__tiles_tile_col">
    <div className="about__tiles_tile_cell" id={id}>
      {label}
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
        <div className="about__tiles_text">
          <div className="about__tiles_text_table">
            <div className="about__tiles_text_container">
              <div className="about__tiles_text_title">
                There are many different approaches to learning
              </div>
              <div className="about__tiles_text_text">
                Depending on the learner or application, different appraoches might be more efficient
              </div>
            </div>
          </div>
        </div>
        <div className="about__tiles_tiles">
          <div className="about__tiles_group">
            {tile('about__tile_explanation', 'Explanation')}
            {tile('about__tile_discovery', 'Discovery')}
          </div>
          <div className="about__tiles_group">
            {tile('about__tile_practice', 'Practice')}
            {tile('about__tile_examples', 'Examples')}
          </div>
        </div>
      </div>
    </div>;
  }
}
