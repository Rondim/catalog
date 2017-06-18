/**
 * Created by xax on 19.02.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { firebaseAuth } from '../../firebase/api';

let access;
export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes={
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        access = false;
        checkAuthFirebase()
          .then(user =>{
            this.props.checkAuthentificated(user);
          });
      } else access = true;
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        access = false;
        checkAuthFirebase()
          .then(user => {
            nextProps.checkAuthentificated(user);
          });
      } else access = true;
    }

    render() {
      return (
        access?
        <ComposedComponent {...this.props}/>:
          <div/>
      )
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
  }

  return connect(mapStateToProps, actions)(Authentication);
}

function checkAuthFirebase() {
  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged((user, err) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}