// @flow
import Fig from 'figureone';
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Navbar from '../../components/navbar';

const { colorArrayToRGB, getCSSColors } = Fig.tools.color;

function getTextColor(color: Array<number>) {
  // console.log(color)
  const colorSum = color.reduce((acc, val) => acc + val);
  let textColor = [1, 1, 1, 1];
  if (colorSum > 2) {
    textColor = [0, 0, 0, 1];
  }
  return textColor;
}

const introPage = () => {
  const elem: HTMLElement | null = document.getElementById('intro');
  const colors = getCSSColors();
  // console.log(colors)
  // console.log(colors)
  let reactKey = 0;
  const paletteRows = [];
  Object.keys(colors.palette).sort().forEach((hue) => {
    const hueCols = [];
    Object.keys(colors.palette[hue]).sort().forEach((shade) => {
      reactKey += 1;
      const color = colors.palette[hue][shade];
      const textColor = getTextColor(color);
      hueCols.push(<div className="col-1" key={reactKey} style={{
        backgroundColor: colorArrayToRGB(color),
        color: colorArrayToRGB(textColor),
        padding: '10px',
        fontSize: '10px',
      }}>{hue} {shade}</div>);
    });
    reactKey += 1;
    paletteRows.push(<div className="row" key={reactKey}>
    {hueCols}
    </div>);
  });

  const diagramCols = [];
  Object.keys(colors.diagram).sort().forEach((element) => {
    if (Array.isArray(element)) {
      const color = colors.diagram[element];
      const textColor = getTextColor(color);
      reactKey += 1;
      diagramCols.push(<div className="col-1" key={reactKey} style={{
        backgroundColor: colorArrayToRGB(color),
        color: colorArrayToRGB(textColor),
        padding: '10px',
        fontSize: '10px',
      }}>{element}</div>);
    } else if (typeof element === 'object') {
      element.forEach((e) => {
        const color = colors.diagram[e];
        const textColor = getTextColor(color);
        reactKey += 1;
        diagramCols.push(<div className="col-1" key={reactKey} style={{
          backgroundColor: colorArrayToRGB(color),
          color: colorArrayToRGB(textColor),
          padding: '10px',
          fontSize: '10px',
        }}>{e}</div>);
      });
    }
  });
  const diagramRows = [];
  reactKey += 1;
  diagramRows.push(<div className="row" key={reactKey}>{diagramCols}</div>);

  const semanticColorKeys = Object.keys(colors).filter(key => key !== 'palette' && key !== 'diagram').sort();
  const semanticColorLayout = semanticColorKeys.map((key) => {
    reactKey += 1;
    const color = colors[key];
    // console.log(color, key)
    const colorSum = color.reduce((acc, val) => acc + val);
    let textColor = [1, 1, 1, 1];
    if (colorSum > 2) {
      textColor = [0, 0, 0, 1];
    }
    return <div className="col-2" key={reactKey} style={{
      backgroundColor: colorArrayToRGB(colors[key]),
      color: colorArrayToRGB(textColor),
      padding: '20px',
    }}>{key}</div>;
  });

  if (elem instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <div className="container-fluid">
          <Navbar active='Multi Page Lesson'/>
        </div>
        <div className="container-fluid">
          <div className="row" style={ { marginTop: '70px' } }>
          </div>
          <p></p>
          <p>Palette</p>
          {paletteRows}
          <p></p>
          <p>Diagram</p>
          {diagramRows}
          <div className="row">
            {semanticColorLayout}
          </div>
        </div>
      </div>,
      elem,
    );
  }
};

export default introPage;
