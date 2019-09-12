// @flow
import Fig from 'figureone';
import baseLayout from '../layout';

const {
  DiagramElementCollection, Diagram, DiagramFont, Point, Transform,
} = Fig;
const { RGBToArray } = Fig.tools.color;

const layout = baseLayout();

type SelectorItemType = {
  id: string;
  text: string;
  subText: string;
};

export class SelectorList {
  order: Array<SelectorItemType>;
  content: Object;

  constructor() {
    this.content = {};
    this.order = [];
  }

  add(id: string, text: string, subText: string = '') {
    const selectorItem = {
      id,
      text,
      subText,
    };
    this.content[id] = selectorItem;
    this.order.push(selectorItem);
  }
}

function selectorHandler(
  listId: string,
  htmlId: string,
  cols: Array<HTMLElement>,
  onclick: (string) => void,
  subTextCols: Array<HTMLElement> = [],
  type: 'horizontal' | 'vertical' = 'horizontal',
) {
  const selectedId = `${htmlId}__${listId}`;
  cols.forEach((col, index) => {
    if (col.id !== selectedId) {
      col.classList.remove('diagram__selector_title_selected');
      col.classList.add('diagram__selector_title_not_selected');

      const subTextCol = subTextCols[index];
      if (subTextCol && type === 'vertical') {
        subTextCol.classList
          .add('topic__vertical_selector_table_subtext__hide');
        col.classList
          .remove('topic__vertical_selector_table_cell_with_subtext');
      }
      if (type === 'horizontal') {
        subTextCol.classList
          .remove('topic__horizontal_selector_table_subtext_selected');
      }
    } else {
      col.classList.add('diagram__selector_title_selected');
      col.classList.remove('diagram__selector_title_not_selected');

      const subTextCol = subTextCols[index];
      if (subTextCol.innerHTML !== '' && type === 'vertical') {
        subTextCol.classList
          .remove('topic__vertical_selector_table_subtext__hide');
        col.classList
          .add('topic__vertical_selector_table_cell_with_subtext');
      }
      if (type === 'horizontal') {
        subTextCol.classList
          .add('topic__horizontal_selector_table_subtext_selected');
      }
      // }
    }
  });
  onclick(listId);
}

// export function makeSelectorHTML(
//   selectorItems: SelectorList,
//   firstSelection: string = selectorItems.order[0].id,
//   id: string = 'id__topic_selector',
//   diagram: Diagram,
//   onclick: Function,
//   yPosition: number = diagram.limits.top - diagram.limits.height / 2,
//   separator: string = '',
// ) {
//   const table = document.createElement('table');
//   table.classList.add('diagram__selector_table');
//   const row = document.createElement('tr');
//   const cols: Array<HTMLElement> = [];

//   const numKeys = selectorItems.order.length;
//   selectorItems.order.forEach((selectorItem, index) => {
//     const col = document.createElement('td');
//     col.innerHTML = selectorItem.text;
//     col.id = `${id}__${selectorItem.id}`;
//     col.onclick = selectorHandler.bind(this, selectorItem.id, id, cols, onclick);
//     col.classList.add('diagram__selector_title_not_selected');
//     col.classList.add('diagram__selector_table_selectable');
//     col.classList.add('topic__vertical_selector_table_cell');
//     cols.push(col);
//     row.appendChild(col);
//     if (separator !== '' && index < numKeys - 1) {
//       const sep = document.createElement('td');
//       sep.innerHTML = '/';
//       sep.style.paddingLeft = '0';
//       sep.style.paddingRight = '0';
//       row.appendChild(sep);
//     }
//   });

//   table.appendChild(row);
//   const selector = diagram.shapes.htmlElement(table, id, 'diagram__selector_container');
//   selector.setPosition(diagram.limits.left, yPosition);
//   selectorHandler(firstSelection, id, cols, onclick);
//   return selector;
// }

// export function makeVerticalSelectorHTML(
//   selectorItems: SelectorList,
//   firstSelection: string = selectorItems.order[0].id,
//   id: string = 'id__topic_selector',
//   diagram: Diagram,
//   onclick: Function,
// ) {
//   const table = document.createElement('table');
//   table.classList.add('topic__vertical_selector_table');
//   const cols: Array<HTMLElement> = [];

//   selectorItems.order.forEach((selectorItem) => {
//     const row = document.createElement('tr');
//     const col = document.createElement('td');
//     col.innerHTML = selectorItem.text;
//     col.id = `${id}__${selectorItem.id}`;
//     col.onclick = selectorHandler.bind(this, selectorItem.id, id, cols, onclick);
//     col.classList.add('diagram__selector_title_not_selected');
//     col.classList.add('diagram__selector_table_selectable');
//     col.classList.add('topic__vertical_selector_table_cell');
//     cols.push(col);
//     row.appendChild(col);
//     table.appendChild(row);
//   });

//   const selector = diagram.shapes.htmlElement(table, id, 'diagram__selector_container');
//   selector.setPosition(0, 0);
//   selectorHandler(firstSelection, id, cols, onclick);
//   return selector;
// }

export class SelectorHTML {
  list: SelectorList;
  table: HTMLTableElement;
  titleElements: Array<HTMLElement>;
  subTextElements: Array<HTMLElement>;
  onclick: (string) => void;
  id: string;
  type: 'horizontal' | 'vertical';

  constructor(
    id: string = 'id__topic_selector',
    onclick: (string) => void = () => {},
  ) {
    this.list = new SelectorList();
    this.table = document.createElement('table');
    // this.table.classList.add('topic__vertical_selector_table');
    this.id = id;
    this.onclick = onclick;
    this.titleElements = [];
    this.subTextElements = [];
    this.type = 'horizontal';
  }

  select(listId: string) {
    selectorHandler(
      listId,
      this.id,
      this.titleElements,
      this.onclick,
      this.subTextElements,
      this.type,
    );
  }

  selectWithoutExecution(listId: string) {
    selectorHandler(
      listId,
      this.id,
      this.titleElements,
      () => {},
      this.subTextElements,
      this.type,
    );
  }
}

export class HorizontalSelectorHTML extends SelectorHTML {
  titleRow: HTMLElement;
  subTextRow: HTMLElement;
  separator: string;

  constructor(
    id: string = 'id__topic_horizontal_selector',
    onclick: (string) => void = () => {},
    separator: string = '',
  ) {
    super(id, onclick);
    this.table.classList.add('topic__horizontal_selector_table');
    this.titleRow = document.createElement('tr');
    this.table.appendChild(this.titleRow);

    this.subTextRow = document.createElement('tr');
    this.table.appendChild(this.subTextRow);

    this.type = 'horizontal';
    this.separator = separator;
  }

  add(listId: string, text: string, subText: string = '') {
    if (this.separator && this.list.order.length > 0) {
      const sepTitleCol = document.createElement('td');
      sepTitleCol.innerHTML = this.separator;
      sepTitleCol.classList
        .add('topic__horiztonal_selector_table_separator_cell');
      this.titleElements.push(sepTitleCol);
      this.titleRow.appendChild(sepTitleCol);

      const sepSubTextCol = document.createElement('td');
      this.subTextElements.push(sepSubTextCol);
      this.subTextRow.appendChild(sepSubTextCol);
    }

    this.list.add(listId, text, subText);
    const newItem = this.list.order.slice(-1)[0];
    const titleCol = document.createElement('td');
    titleCol.innerHTML = newItem.text;
    titleCol.id = `${this.id}__${newItem.id}`;
    titleCol.onclick = selectorHandler.bind(
      this,
      newItem.id,
      this.id,
      this.titleElements,
      this.onclick,
      this.subTextElements,
      this.type,
    );
    titleCol.classList.add('diagram__selector_title_not_selected');
    titleCol.classList.add('diagram__selector_table_selectable');
    titleCol.classList.add('topic__horiztonal_selector_table_cell');
    this.titleElements.push(titleCol);
    this.titleRow.appendChild(titleCol);

    const subTextCol = document.createElement('td');
    subTextCol.innerHTML = newItem.subText;
    subTextCol.id = `${this.id}__${newItem.id}__subtext`;
    subTextCol.classList.add('topic__horizontal_selector_table_subtext');
    this.subTextElements.push(subTextCol);
    this.subTextRow.appendChild(subTextCol);
  }
}

export class VerticalSelectorHTML extends SelectorHTML {
  constructor(
    id: string = 'id__topic_selector',
    onclick: (string) => void = () => {},
  ) {
    super(id, onclick);
    this.table.classList.add('topic__vertical_selector_table');
    this.type = 'vertical';
  }

  add(listId: string, text: string, subText: string = '') {
    this.list.add(listId, text, subText);
    const newItem = this.list.order.slice(-1)[0];
    const titleRow = document.createElement('tr');
    const titleCol = document.createElement('td');
    titleCol.innerHTML = newItem.text;
    titleCol.id = `${this.id}__${newItem.id}`;
    titleCol.onclick = selectorHandler.bind(
      this,
      newItem.id,
      this.id,
      this.titleElements,
      this.onclick,
      this.subTextElements,
      this.type,
    );
    titleCol.classList.add('diagram__selector_title_not_selected');
    titleCol.classList.add('diagram__selector_table_selectable');
    titleCol.classList.add('topic__vertical_selector_table_cell');
    this.titleElements.push(titleCol);
    titleRow.appendChild(titleCol);
    this.table.appendChild(titleRow);

    const subTextRow = document.createElement('tr');
    const subTextCol = document.createElement('td');
    subTextCol.innerHTML = newItem.subText;
    subTextCol.id = `${this.id}__${newItem.id}__subtext`;
    subTextCol.classList.add('topic__vertical_selector_table_subtext');
    subTextCol.classList.add('topic__vertical_selector_table_subtext__hide');
    this.subTextElements.push(subTextCol);
    subTextRow.appendChild(subTextCol);
    this.table.appendChild(subTextRow);
  }
}


export function addSelectorHTML(
  diagram: Diagram,
  collection: DiagramElementCollection,
  elementName: string,
  uniqueString: string,
  onclick: (string) => void,
  style: 'horizontal' | 'vertical' = 'horizontal',
  separator: string = '',
  vAlign: 'top' | 'bottom' | 'middle' = 'middle',
  hAlign: 'left' | 'right' | 'center' = 'center',
) {
  let selector;
  if (style === 'vertical') {
    selector = new VerticalSelectorHTML(
      `id_${uniqueString}`,
      onclick,
    );
  } else {
    selector = new HorizontalSelectorHTML(
      `id_${uniqueString}`,
      onclick,
      separator,
    );
  }
  const element = diagram.shapes.htmlElement(
    selector.table,
    `${uniqueString}`,
    'diagram__selector_container',
    new Point(0, 0),
    vAlign,
    hAlign,
  );
  element.selector = selector;
  collection.add(elementName, element);
}

// export function makeExpandingVerticalSelectorHTML(
//   selectorItems: SelectorList,
//   firstSelection: string = selectorItems.order[0].id,
//   id: string = 'id__topic_selector',
//   diagram: Diagram,
//   onclick: Function,
// ) {
//   const table = document.createElement('table');
//   table.classList.add('topic__vertical_selector_table');
//   const cols: Array<HTMLElement> = [];
//   const subTextCols: Array<?HTMLElement> = [];

//   selectorItems.order.forEach((selectorItem) => {
//     const row = document.createElement('tr');
//     const col = document.createElement('td');
//     col.innerHTML = selectorItem.text;
//     col.id = `${id}__${selectorItem.id}`;
//     col.onclick = selectorHandler.bind(this, selectorItem.id, id, cols, onclick, subTextCols);
//     col.classList.add('diagram__selector_title_not_selected');
//     col.classList.add('diagram__selector_table_selectable');
//     col.classList.add('topic__vertical_selector_table_cell');
//     cols.push(col);
//     row.appendChild(col);
//     table.appendChild(row);
//     if (selectorItem.subText) {
//       const rowSub = document.createElement('tr');
//       const colSub = document.createElement('td');
//       colSub.innerHTML = selectorItem.subText;
//       colSub.id = `${id}__${selectorItem.id}__subtext`;
//       colSub.classList.add('diagram__selector_table_subtext');
//       colSub.classList.add('diagram__selector_table_subtext__hide');
//       subTextCols.push(colSub);
//       rowSub.appendChild(colSub);
//       table.appendChild(rowSub);
//     } else {
//       subTextCols.push(null);
//     }
//   });

//   const selector = diagram.shapes.htmlElement(table, id, 'diagram__selector_container');
//   selector.setPosition(0, 0);
//   selectorHandler(firstSelection, id, cols, onclick, subTextCols);
//   return selector;
// }

export function makeSelectorText(
  selectorItems: SelectorList,
  firstSelection: string = selectorItems.order[0].id,
  diagram: Diagram,
  onclick: Function = () => {},
  yPosition: number = diagram.limits.top - diagram.limits.height / 2,
  font: DiagramFont = layout.defaultFont,
  selectedColor: Array<number> = layout.colors.diagram.text.base,
  separator: string = '',
  spacing: ?number = null,
) {
  const selector = diagram.shapes.collection(new Transform().translate(0, 0));
  let width = 0;
  const widthRecord = [];

  let disabledColor = font.color;
  if (typeof disabledColor === 'string') {
    disabledColor = RGBToArray(disabledColor).slice();
  } else if (disabledColor == null) {
    disabledColor = [0.5, 0.5, 0.5, 1];
  } else {
    disabledColor = disabledColor.slice();
  }

  const selectorHandlerText = (id: string) => {
    selector.setColor(disabledColor);
    selector[`_${id}`].setColor(selectedColor.slice());
    onclick(id);
    diagram.animateNextFrame();
  };

  const numTitles = selectorItems.order.length;
  selectorItems.order.forEach((selectorItem, index) => {
    const text = diagram.shapes.text(
      selectorItem.text,
      new Point(0, 0),
      disabledColor,
      font,
    );
    text.setFirstTransform(diagram.spaceTransforms.diagramToGL);
    text.isTouchable = true;
    text.onClick = selectorHandlerText.bind(this, selectorItem.id);
    const bounds = text.getRelativeDiagramBoundingRect();
    width += bounds.width;
    widthRecord.push(bounds.width);
    selector.add(selectorItem.id, text);

    if (separator !== '' && index < numTitles - 1) {
      const sep = diagram.shapes.text(
        separator,
        new Point(0, 0),
        disabledColor,
        font,
      );
      sep.setFirstTransform(diagram.spaceTransforms.diagramToGL);
      const sepBounds = sep.getRelativeDiagramBoundingRect();
      width += sepBounds.width;
      widthRecord.push(sepBounds.width);
      selector.add(`sep${index}`, sep);
    }
  });

  let space = 0;
  if (spacing == null) {
    space = (diagram.limits.width - width) / numTitles;
  } else {
    space = spacing;
  }

  let x = 0 - width / 2 - space * numTitles / 2;
  selector.drawOrder.forEach((key, index) => {
    const element = selector.elements[key];
    if (separator !== '' && index % 2 === 1) {
      element.setPosition(x + widthRecord[index] / 2, 0);
      x += widthRecord[index];
    } else {
      element.setPosition(x + widthRecord[index] / 2 + space / 2, 0);
      x += widthRecord[index] + space;
    }
  });
  selector.hasTouchableElements = true;
  selector.setPosition(0, yPosition);
  selectorHandlerText(firstSelection);
  selector.select = selection => selectorHandlerText(selection);
  return selector;
}

export function makeVerticalSelectorText(
  selectorItems: SelectorList,
  firstSelection: string = selectorItems.order[0].id,
  diagram: Diagram,
  onclick: Function = () => {},
  font: DiagramFont = layout.defaultFont,
  selectedColor: Array<number> = layout.colors.diagram.text.base,
  spacing: ?number = null,
) {
  const selector = diagram.shapes.collection(new Transform().translate(0, 0));
  let height = 0;
  const heightRecord = [];

  let disabledColor = font.color;
  if (typeof disabledColor === 'string') {
    disabledColor = RGBToArray(disabledColor).slice();
  } else if (disabledColor == null) {
    disabledColor = [0.5, 0.5, 0.5, 1];
  } else {
    disabledColor = disabledColor.slice();
  }

  const selectorHandlerText = (id: string) => {
    selector.setColor(disabledColor);
    selector[`_${id}`].setColor(selectedColor.slice());
    onclick(id);
    diagram.animateNextFrame();
  };

  const numTitles = selectorItems.order.length;
  selectorItems.order.forEach((selectorItem) => {
    const text = diagram.shapes.text(
      selectorItem.text,
      new Point(0, 0),
      disabledColor,
      font,
    );
    text.setFirstTransform(diagram.spaceTransforms.diagramToGL);
    text.isTouchable = true;
    text.onClick = selectorHandlerText.bind(this, selectorItem.id);
    const bounds = text.getRelativeDiagramBoundingRect();
    height += bounds.height;
    heightRecord.push(bounds.height);
    selector.add(selectorItem.id, text);
  });

  let space = 0;
  if (spacing == null) {
    space = (diagram.limits.height - height) / numTitles;
  } else {
    space = spacing;
  }

  let y = 0;
  selector.order.forEach((key, index) => {
    const element = selector.elements[key];
    element.setPosition(0, y - heightRecord[index] / 2 - space / 2);
    y -= heightRecord[index] + space;
    // }
  });
  selector.hasTouchableElements = true;
  selectorHandlerText(firstSelection);
  return selector;
}

