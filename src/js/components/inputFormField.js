// // @flow

import React from 'react';
// import LoginTitle from './loginTitle';
// import ReactDOM from 'react-dom';

type Props = {
  label: string,
  onError: Function,
  autoComplete: string,
  type: string,
  id: string,
};

type State = {
  value: string;
};

export default class InputFormField extends React.Component<Props, State> {
  key: number;

  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  handleFormChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const props = Object.assign({}, this.props);
    return <div><label>
      <span className="login_label_text">{props.label}</span>
      <input
        type={props.type}
        onChange={this.handleFormChange.bind(this)}
        autoComplete={props.autoComplete}
        value={this.state.value}
        id={props.id}
      />
      <div className="login_failed">
        {props.onError()}
      </div>
    </label></div>;
  }

  // makeEntries(fields: Array<TypeField>) {
  //   const entries = [];
  //   fields.forEach((field) => {
  //     this.key += 1;
  //     entries.push(<div key={this.key}>
  //       <label>
  //           <span className="login_label_text">{field.label}</span>
  //           <input
  //             type={field.type}
  //             onChange={this.handleFormChange.bind(this)}
  //             autoComplete={field.autoComplete}
  //             value={this.state.fields[field.stateName]}
  //             id={field.stateName}
  //           />
  //           <div className="login_failed">
  //             {field.onError}
  //           </div>
  //         </label>
  //       </div>);
  //   });
  //   return entries;
  // }

  // render() {
  //   const props = Object.assign({}, this.props);
  //   return (
  //     <div className="login_form">
  //       <div className="login_centering_cell">
  //       <LoginTitle title={props.title}/>
  //         <form onSubmit={props.onSubmit} id="login_form">
  //           {this.makeEntries(props.fields)}
  //           <div>
  //             <div className="login_signin_box">
  //               <input type="submit" value={props.submit} className="login_submit" />
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
}
