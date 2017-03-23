import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import AuthNav from '../components/auth/authNav';


class NavBar extends Component {
  render() {
    return (
      <Nav bsStyle="pills">
          <AuthNav/>
          <IndexLinkContainer to="/" activeHref="active">
            <NavItem>Каталог</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/manager" activeHref="active">
            <NavItem>Менеджер</NavItem>
          </LinkContainer>
          <LinkContainer to="/manager2" activeHref="active">
              <NavItem>DragAndDrop Manager</NavItem>
          </LinkContainer>
      </Nav>
    );
  }
}
export default NavBar;