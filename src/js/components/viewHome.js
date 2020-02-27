// @flow
import Fig from 'figureone';
import * as React from 'react';
import LearningPathNavigator from './learningPathNavigator';
import HomeBanner from './homeBanner';
import About from './about';
import DiagramContainer from './diagram';

const {
  Diagram, Rect, TransformLimit,
} = Fig;

type Props = {
  isLoggedIn: boolean;
  username: string;
};


// const diagram = new Diagram
// const collection = new Collection(diagram, transform)
// const collection = diagram.primitives.collection(transform)
// const polygon = diagram.primitives.polygon(options)
// collection.add(polygon)


// const diagram = new Diagram
// const collection = new Collection(transform)
// const polygon = new Polygon(options)
// collection.add(polygon)
// diagram.add(collection)
// diagram.initialize()
//   - connects all webgl instances
//   - sets all limits
//   - connects all animation frames
//   - sets all parents


function createDiagram(htmlId) {
  const diagram = new Diagram({
    htmlId,
    backgroundColor: [1, 1, 1, 1],
    limits: new Rect(-3, -2, 6, 4),
    fontScale: 1,
  });
  // diagram.addElements([
  //   {
  //     name: 'ball',
  //     type: 'polygon',
  //     definition: {
  //       radius: 0.5,
  //       sides: 100,
  //       color: [1, 0, 0, 1],
  //       fill: true,
  //     },
  //     properties: {
  //       move: {
  //         boundary: 'diagram',
  //         canBeMovedAfterLosingTouch: true,
  //         maxVelocity: new TransformLimit(10, 10, 10),
  //       },
  //     },
  //     // initialize: [
  //     //   { setMovable: [true] },
  //     //   () => {},
  //     //   { setTransformCallback: [] },
  //     // ],
  //   }]);
  const collection = diagram.primitive.collection();
  diagram.elements = collection;
  // diagram.addElements(collection, )
  // const collection = new DiagramElementCollection(new Transform(), diagram.limits);
  // diagram.elements = collection;
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
        move: {
          boundary: 'diagram',
          canBeMovedAfterLosingTouch: true,
          maxVelocity: new TransformLimit(10, 10, 10),
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
      didMount = { createDiagram }
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
