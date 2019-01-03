// @flow
// import Fig from 'figureone';
import * as React from 'react';
import DropDownButton from './dropDownButton';
import type { TypeListItem } from './dropDownButton';

export default class ExplanationButton extends DropDownButton {
  // eslint-disable-next-line class-methods-use-this
  renderListLabel(listItem: TypeListItem) {
    if (listItem.separator === true) {
      return listItem.label;
    }
    let ratingCss = 'explanation_button__label_rating_value_0';
    let numReviews = listItem.numReviews || 0;
    const prefix = 'explanation_button__label_rating_value_';
    if (numReviews > 0) {
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
      numReviews = (numReviews).toLocaleString('en');
    }
    const classes = `explanation_button__label_rating_value ${ratingCss}`;
    let label = '';
    let description = ' ';
    if (listItem.label != null) {
      ({ label } = listItem);
    }
    if (listItem.description != null) {
      ({ description } = listItem);
    }
    return <div className="explanation_button__label">
      <div className="explanation_button__label_text">
        <div className="explanation_button__label_text_title">
          {label}
        </div>
        <div className="explanation_button__label_text_description">
          {description}
        </div>
      </div>
      <div className="explanation_button__label_rating">
        <div className={classes}/>
        <div className="explanation_button__label_num_reviews">
        {numReviews}
        </div>
      </div>
    </div>;
  }
}
