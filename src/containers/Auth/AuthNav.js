/**
 * Created by xax on 24.02.2017.
 */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withRouter
} from 'react-router-dom';

import query from './queries/CurentUser';
import { signoutUser } from './actions';

class AuthNav extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    signoutUser: PropTypes.func.isRequired
  };

  logout = () => {
    const { history, signoutUser } = this.props;
    history.push('/signin');
    signoutUser();
  };

  render() {
    const { loading, user } = this.props.data;
    if (loading) return <div />;
    return (user ?
      <button className='btn btn-outline-primary' onClick={() => this.logout()}>
        Выход
      </button>:
      <button className='btn btn-outline-primary' onClick={() => this.props.history.push('/signin')}>
        Вход
      </button>
    );
  }
}

export default connect(null, { signoutUser })(
  graphql(query)(withRouter(AuthNav))
);
