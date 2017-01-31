import React, { Component } from 'react';
import { Link } from 'react-router';
import NavLink from '../components/NavLink';


class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="nav nav-pills">
          <NavLink to="/">Каталогу</NavLink>
          <NavLink to="/manager">Менеджер</NavLink>
        </ul>
      </nav>
    );
  }
};

export default Nav;
