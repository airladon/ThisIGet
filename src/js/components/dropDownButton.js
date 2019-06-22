// @flow
// import Fig from 'figureone';
import * as React from 'react';
import DropDownButtonBase from './dropDownButtonBase';

export type TypeDropDownListItem = {
  label: string | React.Element<'div'>;
  link?: Function | string;
  active?: boolean;
};

type Props = {
  label?: string | React.Element<'div'>;
  id?: string;
  direction?: 'up' | 'down';
  xAlign?: 'left' | 'right' | 'center';
  list?: Array<TypeDropDownListItem>;
  selected?: boolean;
};

export default class DropDownButton extends React.Component <Props> {
  render() {
    // const props = Object.assign({}, this.props);
    const { props } = this;
    const listItems = [];
    if (props.list != null) {
      props.list.forEach((listElement) => {
        listItems.push({
          label: listElement.label,
          link: listElement.link,
          active: listElement.active,
        });
      });
    }
    return <DropDownButtonBase
      label={props.label}
      id={props.id}
      direction={props.direction}
      xAlign={props.xAlign}
      list={listItems}
      selected={props.selected}
    />;
    // const label = props.label || '';
    // this.xAlign = props.xAlign || 'left';
    // this.direction = props.direction || 'down';
    // let arrowDirectionClass = ' dropdown_button_arrow_down';
    // if (this.direction === 'up') {
    //   arrowDirectionClass = ' dropdown_button_arrow_up';
    // }
    // let buttonClasses = 'dropdown_button_container';
    // if (props.selected != null && props.selected === true) {
    //   buttonClasses = `${buttonClasses} dropdown_button_selected`;
    // }

    // this.id = props.id || generateUniqueId('id__dropdown_button');
    // const listContent = [];
    // props.list.forEach((listItem, index) => {
    //   let classes = '';
    //   if (listItem.active) {
    //     classes = `${classes} dropdown_button_list_item_active`;
    //   }
    //   if (listItem.separator) {
    //     classes = `${classes} dropdown_button_list_item_separator`;
    //   }
    //   if (listItem.link == null) {
    //     classes = `${classes} dropdown_button_list_item_disabled`;
    //   }

    //   let item;
    //   if (listItem.link != null) {
    //     let linkRedirect = listItem.link;
    //     if (typeof listItem.link === 'string') {
    //       linkRedirect = () => {
    //         window.location = listItem.link;
    //       };
    //     }
    //     const closeThenRedirect = () => {
    //       this.close();
    //       if (linkRedirect != null && typeof linkRedirect === 'function') {
    //         linkRedirect();
    //       }
    //     };
    //     item = <div onClick={closeThenRedirect}>
    //       {this.renderListLabel(listItem)}
    //       </div>;
    //   } else {
    //     item = <div>{this.renderListLabel(listItem)}</div>;
    //   }
    //   if (item != null) {
    //     listContent.push(
    //       <div className={`dropdown_button_list_item${classes}`}
    //            key={index}>
    //         {item}
    //       </div>,
    //     );
    //   }
    // });

    // return <div className={buttonClasses}
    //   id={`${this.id}`}>
    //   <div className="dropdown_button_label_container"
    //        id={`${this.id}_label`}>
    //     <div className="dropdown_button_label">
    //       {label}
    //     </div>
    //     <div className={`dropdown_button_arrow${arrowDirectionClass}`}>
    //     </div>
    //   </div>
    //   <div className="dropdown_button_list dropdown_button_list_hide"
    //        id={`${this.id}_list`}>
    //     {listContent}
    //   </div>
    // </div>;
  }
}
