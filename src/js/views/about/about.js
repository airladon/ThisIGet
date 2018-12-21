// @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import '../../../../css/style.scss';
// import './about.scss';
import Button from '../../components/button';
import Jumbotron from '../../jumbotron';
import Navbar from '../../components/navbar';

const aboutPage = () => {
  const aboutId: HTMLElement | null = document.getElementById('about');

  if (aboutId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <Navbar active='About'/>

        <Jumbotron className="jumbotron -fluid views-about"
                    containerFluid={false}
                    >
          <div className="col-8 col-lg-7">
            <h1 className="display-4">About It Get I</h1>
            <p className="lead">This is so you can understand.</p>
            <hr className="my-4" style={{ borderColor: 'lightGrey' }}/>
            <p>Everything is from the ground up.
            </p>
            <p className="lead">
              <Button label="Learn More" className="-primary -lg" href="#"/>
            </p>
          </div>
      </Jumbotron>
      </div>,
      aboutId,
    );
  }
};

export default aboutPage;
