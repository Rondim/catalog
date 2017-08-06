/**
 * Created by xax on 24.02.2017.
 */
import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { graphql } from 'react-apollo';
import query from './queries/CurentUser';
import PropTypes from 'prop-types';

class AuthNav extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { loading, user } = this.props.data;
    if (loading) return <div />;
    return (user ?
        <NavItem onClick={() => localStorage.clear()}>
          Выход
        </NavItem> :
        <LinkContainer to="/signin" activeHref="active">
          <NavItem>Вход</NavItem>
        </LinkContainer>
    );
  }
}

export default graphql(query)(AuthNav);
