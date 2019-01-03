// @flow
// import Fig from 'figureone';
import * as React from 'react';
import DropDownButton from './dropDownButton';
import type { TypeListItem } from './dropDownButton';

// const { generateUniqueId } = Fig.tools.misc;

export default class ExplanationButton extends DropDownButton {
  // eslint-disable-next-line class-methods-use-this
  renderListLabel(listItem: TypeListItem) {
    return <div className="explanation_button__label">
      <div className="explanation_button__label_text">
        {listItem.label}
      </div>
      <div className="explanation_button__label_rating">
        {listItem.rating}
      </div>
    </div>;
  }
}
