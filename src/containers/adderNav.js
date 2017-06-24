/**
 * Created by xax on 24.06.2017.
 */
import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import AuthNav from './authNav';

class NavBar extends Component {
  render() {
    return (
        <Nav bsStyle="pills">
          <IndexLinkContainer to="/" activeHref="active">
            <NavItem>Добавление изделий</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/config1" activeHref="active">
            <NavItem>Конфигурирование первого уровня</NavItem>
          </LinkContainer>
          <LinkContainer to="/config2" activeHref="active">
            <NavItem>Конфигурирование второго уровня</NavItem>
          </LinkContainer>
          <AuthNav/>
        </Nav>
    );
  }
}

export default NavBar;
