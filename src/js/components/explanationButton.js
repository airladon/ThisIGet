// @flow
import Fig from 'figureone';
import * as React from 'react';

const { generateUniqueId } = Fig.tools.misc;

type Props = {
  label?: string;
  id?: string;
  direction?: 'up' | 'down';
  xAlign?: 'left' | 'right' | 'center';
  list?: Array<{
    label: string;
    aveStars?: number;
    numReviews?: number;
    description?: string;
    link: Function | string;
    active?: boolean;
  }>;
};

export default class ExplanationButton extends React.Component
                                    <Props> {
  id: string;
  buttonElement: HTMLElement;
  bodyElement: HTMLElement;
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
        if (event.target !== this.buttonElement) {
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
    this.itemList.classList.add('explanation_button_list_hide');
    this.itemList.style.left = '';
    this.itemList.style.top = '';
  }

  toggle() {
    this.itemList.classList.toggle('explanation_button_list_hide');
    const parent = this.buttonElement.parentElement;
    if (parent != null) {
      const parentsParent = parent.parentElement;
      if (parentsParent != null) {
        const rect = parentsParent.getBoundingClientRect();
        const listRect = this.itemList.getBoundingClientRect();
        if (!this.itemList.classList.contains('explanation_button_list_hide')) {
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
        } else {
          this.itemList.style.left = '';
          this.itemList.style.top = '';
        }
      }
    }
  }

  componentDidMount() {
    const button = document.getElementById(this.id);
    const { body } = document;
    const itemList = document.getElementById(`${this.id}_list`);
    if (button != null && body != null && itemList != null) {
      this.buttonElement = button;
      this.bodyElement = body;
      this.itemList = itemList;
      button.addEventListener('mousedown', this.toggle.bind(this));
      body.addEventListener('mousedown', this.offButtonEvent.bind(this), true);
    }
  }

  render() {
    const props = Object.assign({}, this.props);
    const label = props.label || '';
    this.xAlign = props.xAlign || 'left';
    this.direction = props.direction || 'down';
    let arrowDirectionClass = ' explanation_button_arrow_down';
    if (this.direction === 'up') {
      arrowDirectionClass = ' explanation_button_arrow_up';
    }
    this.id = props.id || generateUniqueId('id__explanation_button');
    const listContent = [];
    props.list.forEach((listItem, index) => {
      let activeClass = '';
      if (listItem.active) {
        activeClass = ' explanation_button_list_item_active';
      }
      let linkRedirect = listItem.link;
      if (typeof listItem.link === 'string') {
        linkRedirect = () => {
          window.location = listItem.link;
        };
      }
      const link = <div onClick={linkRedirect}>
        {listItem.label}
        </div>;
      // if (typeof listItem.link === 'string') {

      //   link = <a href={listItem.link}>
      //     <div className="explanation_button_list_item_container">
      //       {listItem.label}
      //     </div>
      //   </a>;
      // }
      // console.log(listItem.link)
      // const link = <a
      //     href={listItem.link}
      //     className="explanation_button_list_link">
      //       <div className="explanation_button_list_item_container">
      //         {listItem.label}
      //       </div>
      //   </a>;

      listContent.push(
        <div className={`explanation_button_list_item${activeClass}`}
             key={index}>
          {link}
        </div>,
      );
    });

    return <div className='explanation_button_container'>
      <div className="explanation_button_button_container"
           id={this.id}>
        <div className="explanation_button_label">
          {label}
        </div>
        <div className={`explanation_button_arrow${arrowDirectionClass}`}>
        </div>
      </div>
      <div className="explanation_button_list explanation_button_list_hide"
           id={`${this.id}_list`}>
        {listContent}
      </div>
    </div>;
  }
}
