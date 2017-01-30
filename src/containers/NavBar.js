import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';


class NavBar extends Component {
  render() {
    return (
      <Nav bsStyle="pills">
          <IndexLinkContainer to="/" activeHref="active">
            <NavItem>Каталог</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/manager" activeHref="active">
            <NavItem>Менеджер</NavItem>
          </LinkContainer>
      </Nav>
    );
  }
};

export default NavBar;
