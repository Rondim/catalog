/**
 * Created by xax on 24.02.2017.
 */
import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

class NavBar extends Component {
  render() {
    return (this.props.auth.authenticated ?
      <Nav bsStyle="pills">
        <LinkContainer to="/signout" activeHref="active">
          <NavItem>Выход</NavItem>
        </LinkContainer>
      </Nav>:
      <Nav bsStyle="pills">
        <LinkContainer to="/signin" activeHref="active">
          <NavItem>Вход</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}


function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(NavBar);
