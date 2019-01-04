// @flow
import Fig from 'figureone';
import * as React from 'react';

const { generateUniqueId } = Fig.tools.misc;

export type TypeListItem = {
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
  list?: Array<TypeListItem>;
  selected?: boolean;
};

export default class DropDownButton extends React.Component
                                    <Props> {
  id: string;
  buttonElement: HTMLElement;
  labelElement: HTMLElement;
  // bodyElement: HTMLElement;
  itemList: HTMLElement;
  xAlign: 'left' | 'right' | 'center';
  direction: 'up' | 'down';
  constructor(props: Props) {
    super(props);
    this.id = '';
  }

  offButtonEvent(event: MouseEvent | TouchEvent) {
    if (event.target instanceof HTMLElement) {
      const parent = event.target.parentElement;
      if (parent instanceof HTMLElement) {
        if (event.target !== this.labelElement) {
          this.close();
          if (event.target instanceof HTMLElement
            && parent.parentElement === this.itemList) {
            event.target.click();
          }
        }
      }
    }
  }

  close() {
    this.itemList.classList.add('dropdown_button_list_hide');
    this.itemList.style.left = '';
    this.itemList.style.top = '';
  }

  toggle() {
    const rect = this.buttonElement.getBoundingClientRect();
    const listRect = this.itemList.getBoundingClientRect();
    if (this.itemList.classList.contains('dropdown_button_list_hide')) {
      if (this.direction === 'down') {
        this.itemList.style.top = `${rect.height}px`;
      } else {
        this.itemList.style.top = `${-listRect.height}px`;
      }
      if (this.xAlign === 'left') {
        this.itemList.style.left = '0px';
      } else if (this.xAlign === 'right') {
        this.itemList.style.left = `${rect.width - listRect.width}px`;
      } else if (this.xAlign === 'center') {
        this.itemList.style.left = `${rect.width / 2 - listRect.width / 2}px`;
      }
      this.itemList.classList.remove('dropdown_button_list_hide');
    } else {
      this.itemList.style.left = '';
      this.itemList.style.top = '';
      this.itemList.classList.add('dropdown_button_list_hide');
    }
  }

  componentDidMount() {
    const button = document.getElementById(this.id);
    const label = document.getElementById(`${this.id}_label`);
    const { body } = document;
    const itemList = document.getElementById(`${this.id}_list`);
    if (button != null && body != null && itemList != null && label != null) {
      this.buttonElement = button;
      this.labelElement = label;
      // this.bodyElement = body;
      this.itemList = itemList;
      button.addEventListener('mousedown', this.toggle.bind(this));
      body.addEventListener('mousedown', this.offButtonEvent.bind(this), true);
    }
    window.addEventListener('resize', this.close.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  renderListLabel(listItem: TypeListItem): string | React.Element<'div'> | React.Element<'table'> {
    return listItem.label;
  }

  render() {
    const props = Object.assign({}, this.props);
    const label = props.label || '';
    this.xAlign = props.xAlign || 'left';
    this.direction = props.direction || 'down';
    let arrowDirectionClass = ' dropdown_button_arrow_down';
    if (this.direction === 'up') {
      arrowDirectionClass = ' dropdown_button_arrow_up';
    }
    let buttonClasses = 'dropdown_button_container';
    if (props.selected != null && props.selected === true) {
      buttonClasses = `${buttonClasses} dropdown_button_selected`;
    }

    this.id = props.id || generateUniqueId('id__dropdown_button');
    const listContent = [];
    props.list.forEach((listItem, index) => {
      let classes = '';
      if (listItem.active) {
        classes = `${classes} dropdown_button_list_item_active`;
      }
      if (listItem.separator) {
        classes = `${classes} dropdown_button_list_item_separator`;
      }
      if (listItem.link == null) {
        classes = `${classes} dropdown_button_list_item_disabled`;
      }

      let item;
      if (listItem.link != null) {
        let linkRedirect = listItem.link;
        if (typeof listItem.link === 'string') {
          linkRedirect = () => {
            window.location = listItem.link;
          };
        }
        const closeThenRedirect = () => {
          this.close();
          if (linkRedirect != null && typeof linkRedirect === 'function') {
            linkRedirect();
          }
        };
        item = <div onClick={closeThenRedirect}>
          {this.renderListLabel(listItem)}
          </div>;
      } else {
        item = <div>{this.renderListLabel(listItem)}</div>;
      }
      if (item != null) {
        listContent.push(
          <div className={`dropdown_button_list_item${classes}`}
               key={index}>
            {item}
          </div>,
        );
      }
    });

    return <div className={buttonClasses}
      id={`${this.id}`}>
      <div className="dropdown_button_label_container"
           id={`${this.id}_label`}>
        <div className="dropdown_button_label">
          {label}
        </div>
        <div className={`dropdown_button_arrow${arrowDirectionClass}`}>
        </div>
      </div>
      <div className="dropdown_button_list dropdown_button_list_hide"
           id={`${this.id}_list`}>
        {listContent}
      </div>
    </div>;
  }
}
