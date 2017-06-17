/**
 * Created by xax on 24.02.2017.
 */
import React, {Component} from 'react';
import {NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

class NavBar extends Component {
  render() {
    return (this.props.auth.authenticated ?
        <LinkContainer to="/signout" activeHref="active">
          <NavItem>Выход</NavItem>
        </LinkContainer> :
        <LinkContainer to="/signin" activeHref="active">
          <NavItem>Вход</NavItem>
        </LinkContainer>
    );
  }
}


function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(NavBar);
