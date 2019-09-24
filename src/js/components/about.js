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
          There are different approaches to learning
        </div>
        <div className="about__tiles_tiles">
          <table className="about__tiles_table">
            <tbody>
            <tr className="about__tiles_tile_row">
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_explanation">Explanation</div>
              </td>
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_discovery">Discovery</div>
              </td>
            </tr>
            <tr className="about__tiles_tile_row">
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_practice">Practice</div>
              </td>
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_examples">Examples</div>
              </td>
            </tr>
            </tbody>
          </table>
          </div>
        </div>
      <div className="about__tiles">
        
        <div className="about__tiles_tiles">
          <table className="about__tiles_table">
            <tbody>
            <tr className="about__tiles_tile_row">
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_precise">Precise</div>
              </td>
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_interactive">Interactive</div>
              </td>
            </tr>
            <tr className="about__tiles_tile_row">
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_intuitive">Intuitive</div>
              </td>
              <td className="about__tiles_tile_col">
                <div className="about__tiles_tile_cell" id="about__tile_detailed">Detailed</div>
              </td>
            </tr>
            </tbody>
          </table>
          </div>
          <div className="about__tiles_text">
            There are many different ways to describe something
          </div>
        </div>
    </div>;
  }
}
