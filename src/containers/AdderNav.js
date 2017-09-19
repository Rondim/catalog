/**
 * Created by xax on 24.06.2017.
 */
import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import AuthNav from './Auth/AuthNav';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <IndexLinkContainer className='nav-item' to="/adder" activeHref="active">
              <NavItem className="nav-link">Добавление изделий</NavItem>
            </IndexLinkContainer>
            <LinkContainer className='nav-item' to="/config1" activeHref="active">
              <NavItem className="nav-link">Конфигурирование первого уровня</NavItem>
            </LinkContainer>
            <LinkContainer className='nav-item' to="/config2" activeHref="active">
              <NavItem className="nav-link">Конфигурирование второго уровня</NavItem>
            </LinkContainer>
            <AuthNav />
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
