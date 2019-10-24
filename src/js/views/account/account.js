// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './account.scss';
// import ViewAccount from '../../components/viewAccount';
import withLoginManager from '../../components/view';
import { loadColors } from '../../tools/colors';
import Footer from '../../components/footer';

loadColors();

const accountPage = () => {
  const navbarId: HTMLElement | null = document.getElementById('id_navbar');
  // const AccountView = withLoginManager(ViewAccount, true);
  const Navbar = withLoginManager(null, true, true);
  if (navbarId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <Navbar/>
      </div>,
      navbarId,
    );
  }

  // const mainId: HTMLElement | null = document.getElementById('account');
  // if (mainId instanceof HTMLElement) {
  //   ReactDOM.render(
  //     <div>
  //       <ViewAccount/>
  //     </div>,
  //     mainId,
  //   );
  // }

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

accountPage();
