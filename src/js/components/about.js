// @flow
import * as React from 'react';

export default class About extends React.Component
                                    <Props> {

  /* eslint-disable max-len */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="about__container">
      {/*<div className="about__title_top">
        <div className="about__title_text">
          There are many ways to learn
        </div>
      </div>*/}
      <div className="about__tiles">
        <div className="about__tiles_text">
          <div className="about__tiles_text_table">
            <div className="about__tiles_text_container">
              <div className="about__tiles_text_title">
                There are different approaches to learning
              </div>
              <div className="about__tiles_text_text">
                Depending on the learner or application, different appraoches might be more efficient
              </div>
            </div>
          </div>
        </div>
        <div className="about__tiles_tiles">
          <div className="about__tiles_group">
            <div className="about__tiles_tile_col">
              <div className="about__tiles_tile_cell" id="about__tile_explanation">
                Explanation
              </div>
            </div>
            <div className="about__tiles_tile_col">
              <div className="about__tiles_tile_cell" id="about__tile_discovery">
                Discovery
              </div>
            </div>
          </div>
          <div className="about__tiles_group">
            <div className="about__tiles_tile_col">
              <div className="about__tiles_tile_cell" id="about__tile_practice">
                Practice
              </div>
            </div>
            <div className="about__tiles_tile_col">
              <div className="about__tiles_tile_cell" id="about__tile_examples">
                Examples
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
