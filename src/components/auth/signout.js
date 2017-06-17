/**
 * Created by xax on 23.02.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Goodbye to see you later...</div>;
  }
}

export default connect(null, actions)(Signout);
