import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';


class NavBar extends Component {
    renderAuth(){
        return(this.props.authenticated ?
            <LinkContainer to="/signout" activeHref="active">
                <NavItem>Выход</NavItem>
            </LinkContainer>:
            <LinkContainer to="/signin" activeHref="active">
            <NavItem>Вход</NavItem>
            </LinkContainer>
        )
    }
  render() {
    return (
      <Nav bsStyle="pills">
          {this.renderAuth()}
          <IndexLinkContainer to="/" activeHref="active">
            <NavItem>Каталог</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/manager" activeHref="active">
            <NavItem>Менеджер</NavItem>
          </LinkContainer>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps)(NavBar);
