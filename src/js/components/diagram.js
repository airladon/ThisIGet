// @flow
import * as React from 'react';
// import Fig from 'figureone';

// const { Diagram, Rect, DiagramElementCollection } = Fig;
type Props = {
  id: string;
  // limits?: Rect;
  // backgroundColor?: Array<number>;
  // fontScale?: number;
  // elements?: DiagramElementCollection;
  didMount: (string) => void;
};

export default class DiagramContainer extends React.Component
                                    <Props> {
  componentDidMount() {
    // const backgroundColor = this.props.backgroundColor || [1, 0, 0, 1];
    // const limits = this.props.limits || new Rect(-1, -1, 2, 2);
    // const fontScale = this.props.fontScale || 1;
    // this.diagram = new Diagram({
    //   htmlId: this.props.id,
    //   backgroundColor,
    //   limits,
    //   fontScale,
    // });
    // this.diagram.elements = this.props.elements || new DiagramElementCollection();
    this.props.didMount(this.props.id);
  }

  render() {
    return <div id={this.props.id} className="diagram__container topic__diagram">
      <canvas id="id_qr_diagram__text" className='diagram__text'>
      </canvas>
      <canvas id="id_qr_diagram__gl" className='diagram__gl'>
      </canvas>
      <div id="id_qr_diagram__html" className='diagram__html'>
        <div className="diagram__text_measure" id={`${this.props.id}_measure`}>
          {'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}
        </div>
      </div>
    </div>;
  }
}
