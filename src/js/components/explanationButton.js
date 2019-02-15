// @flow
import Fig from 'figureone';
import * as React from 'react';
import DropDownButtonBase from './dropDownButtonBase';

const { round } = Fig.tools.math;

export type TypeExplanationButtonListItem = {
  label: string;
  rating?: number;
  numReviews?: number;
  numHighRatings?: number;
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
    let rating = listItem.rating || 0;
    let numHighRatings = listItem.numHighRatings || 0;
    let highRatingsSubText = '4 or higher';
    if (numReviews > 0) {
      // rating = '\u2605'.repeat(Math.round(listItem.rating || 0));
      // if (rating === '') {
      //   rating = '-';
      // }
      rating = (rating).toLocaleString('en');
      numReviews = `${(numReviews).toLocaleString('en')} reviews`;
      numHighRatings = `${round(parseInt(numHighRatings, 10) / parseInt(numReviews, 10) * 100, 0)}%`;
    }
    if (numReviews === 0) {
      numReviews = '';
      rating = '';
      numHighRatings = '';
      highRatingsSubText = '';
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
        <td className="explanation_button__rating">
          <div className="explanation_button__rating_value">
            {numHighRatings}
          </div>
          <div className="explanation_button__rating_num_reviews">
            {highRatingsSubText}
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
        separator: listElement.separator == null ? false : listElement.separator,
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
