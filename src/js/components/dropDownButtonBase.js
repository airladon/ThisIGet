// @flow
import Fig from 'figureone';
import * as React from 'react';

const { generateUniqueId } = Fig.tools.misc;

type Props = {
  label?: string | React.Element<'div'>;
  id?: string;
  direction?: 'up' | 'down';
  xAlign?: 'left' | 'right' | 'center';
  list?: Array<{
    label: React.Element<'div'> | React.Element<'table'> | string,
    active?: boolean,
    link?: Function | string,
    separator?: boolean,
    }>;
  selected?: boolean;
  classes?: string;
};

export default class DropDownButtonBase extends React.Component
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
    // $FlowFixMe
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    let left = 0;
    if (this.itemList.classList.contains('dropdown_button_list_hide')) {
      if (this.direction === 'down') {
        this.itemList.style.top = `${rect.height}px`;
      } else {
        this.itemList.style.top = `${-listRect.height}px`;
      }
      if (this.xAlign === 'left') {
        left = 0;
      } else if (this.xAlign === 'right') {
        left = rect.width - listRect.width;
      } else if (this.xAlign === 'center') {
        left = rect.width / 2 - listRect.width / 2;
      }
      if ((rect.left + left + listRect.width) > windowWidth) {
        const delta = (rect.left + left + listRect.width) - windowWidth;
        left -= delta + 5;
      }
      this.itemList.style.left = `${left}px`;
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
    if (props.classes) {
      buttonClasses = `${buttonClasses} ${props.classes}`;
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
          {listItem.label}
          </div>;
      } else {
        item = <div>{listItem.label}</div>;
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
