// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import withLoginManager from '../../components/view';
import { loadColors } from '../../tools/colors';
import Footer from '../../components/footer';

loadColors();

const page = () => {
  const navbarId: HTMLElement | null = document.getElementById('id_navbar');
  const Navbar = withLoginManager(null, true, true);
  if (navbarId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <Navbar/>
      </div>,
      navbarId,
    );
  }

  const footerId: HTMLElement | null = document.getElementById('id_footer');
  if (footerId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <Footer/>
      </div>,
      footerId,
    );
  }
};

export default page;
