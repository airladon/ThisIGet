// @flow
import Fig from 'figureone';
import * as React from 'react';
import DropDownButton from './dropDownButton';
import type { TypeListItem } from './dropDownButton';

const { round } = Fig.tools.math;
// const { generateUniqueId } = Fig.tools.misc;

export default class ExplanationButton extends DropDownButton {
  // eslint-disable-next-line class-methods-use-this
  renderListLabel(listItem: TypeListItem) {
    if (listItem.separator === true) {
      return listItem.label;
    }
    let ratingCss = 'explanation_button__label_rating_value_0';
    const prefix = 'explanation_button__label_rating_value_';
    const rating = Math.round((listItem.rating || 0) * 2) / 2;
    if (rating === 0.5) { ratingCss = `${prefix}0p5`; }
    if (rating === 1) { ratingCss = `${prefix}1`; }
    if (rating === 1.5) { ratingCss = `${prefix}1p5`; }
    if (rating === 2) { ratingCss = `${prefix}2`; }
    if (rating === 2.5) { ratingCss = `${prefix}2p5`; }
    if (rating === 3) { ratingCss = `${prefix}3`; }
    if (rating === 3.5) { ratingCss = `${prefix}3p5`; }
    if (rating === 4) { ratingCss = `${prefix}4`; }
    if (rating === 4.5) { ratingCss = `${prefix}4p5`; }
    if (rating === 5) { ratingCss = `${prefix}5`; }
    const classes = `explanation_button__label_rating_value ${ratingCss}`;
    return <div className="explanation_button__label">
      <div className="explanation_button__label_text">
        {listItem.label}
      </div>
      <div className="explanation_button__label_rating">
        <div className={classes}/>
      </div>
    </div>;
  }
}
