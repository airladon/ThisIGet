// @flow
import Fig from 'figureone';
import * as React from 'react';
import LearningPathNavigator from './learningPathNavigator';
import HomeBanner from './homeBanner';
import About from './about';
import DiagramContainer from './diagram';

const { DiagramElementCollection, Diagram, Rect, Transform } = Fig;

type Props = {
  isLoggedIn: boolean;
  username: string;
};

function elements(htmlId) {
  const diagram = new Diagram({
    htmlId,
    backgroundColor: [0, 0, 0, 1],
    limits: new Rect(-3, -2, 6, 4),
    fontScale: 1,
  });
  const collection = new DiagramElementCollection(new Transform(), diagram.limits);
  // const collection = diagram.shapes.collection();
  diagram.elements = collection;
  diagram.addElements(collection, [
    {
      name: 'ball',
      method: 'polygon',
      options: {
        radius: 0.5,
        sides: 100,
        color: [1, 0, 0, 1],
        fill: true,
      },
      mods: {
        // move: { boundary: new Rect(-3, -2, 6, 4) },
        move: {
          boundary: new Rect(-3, -2, 6, 4),
          canBeMovedAfterLoosingTouch: true,
        },
      },
    },
  ]);
  collection._ball.setMovable(true);
  diagram.setFirstTransform();
}

function renderDiagram() {
  return <div>
    <DiagramContainer
      id="about__diagram"
      didMount = { elements }
    />
  </div>;
}

export default class ViewHome extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;
    return <div>
      <HomeBanner/>
      <main>
      <About diagram={renderDiagram()}/>
      { /* <div className='vertical_blank_space'/> */ }
      <LearningPathNavigator learningPath={'Geometry_1'}/>
      <div className='vertical_blank_space'/>
      { /* <LearningPathNavigator learningPath={'Trigonometry_1'}/>
      <div className='vertical_blank_space'/> */ }
      </main>
    </div>;
  }
}
