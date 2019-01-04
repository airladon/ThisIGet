// @flow
// import Fig from 'figureone';
import * as React from 'react';
import DropDownButtonBase from './dropDownButtonBase';

export type TypeExplanationButtonListItem = {
  label: string;
  rating?: number;
  numReviews?: number;
  description?: string;
  link?: Function | string;
  active?: boolean;
  separator?: boolean;
};

type Props = {
  label?: string;
  id?: string;
  direction?: 'up' | 'down';
  xAlign?: 'left' | 'right' | 'center';
  list?: Array<TypeExplanationButtonListItem>;
  selected?: boolean;
};

export default class ExplanationButton extends React.Component <Props> {
  // eslint-disable-next-line class-methods-use-this
  renderListLabel(listItem: TypeExplanationButtonListItem) {
    if (listItem.separator === true) {
      return listItem.label;
    }
    let numReviews = listItem.numReviews || 0;
    let rating = 0;
    if (numReviews > 0) {
      rating = '\u2605'.repeat(Math.round(listItem.rating || 0));
      if (rating === '') {
        rating = '-';
      }
      numReviews = (numReviews).toLocaleString('en');
    }
    let label = '';
    let description = '';
    if (listItem.label != null) {
      ({ label } = listItem);
    }
    if (listItem.description != null) {
      ({ description } = listItem);
    }
    return <table className="explanation_button__listItem">
      <tbody>
      <tr>
        <td className="explanation_button__label">
          <div className="explanation_button__label_title">
            {label}
          </div>
          <div className="explanation_button__label_description">
            {description}
          </div>
        </td>
        <td className="explanation_button__rating">
          <div className="explanation_button__rating_value">
            {rating}
          </div>
          <div className="explanation_button__rating_num_reviews">
            {numReviews}
          </div>
        </td>
      </tr>
      </tbody>
    </table>;
  }

  render() {
    const props = Object.assign({}, this.props);
    const listItems = [];
    props.list.forEach((listElement) => {
      listItems.push({
        label: this.renderListLabel(listElement),
        link: listElement.link,
        active: listElement.active,
      });
    });
    return <DropDownButtonBase
      label={props.label}
      id={props.id}
      direction={props.direction}
      xAlign={props.xAlign}
      list={listItems}
      selected={props.selected}
    />;
  }
}
