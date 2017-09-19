/**
 * Created by xax on 23.02.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import {
  withRouter
} from 'react-router-dom';

import { renderField } from '../../components/fields';
import query from './queries/CurentUser';
import mutation from './mutations/SigninUser';

class Signin extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool
  };
  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/');
    }
  }

  state = {
    errors: []
  };

  signinUser = async (values) => {
    const { email, password } = values;
    try {
      const response = await this.props.mutate({
        variables: { email, password }
      });
      this.setState({ errors: [] });
      localStorage.setItem('token', response.data.signinUser.token);
      this.props.history.push('/');
    } catch (res) {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    }
  };

  renderErrors() {
    const { errors } = this.state;
    return !!errors.length && errors.map( (error, index) => {
      return (<div key={index} className="alert alert-danger">
        {error}
      </div>);
    });
  }

  render() {
    const { handleSubmit, submitting, data } = this.props;
    if (data.loading) {
      return (<div />);
    }
    return (
      <form onSubmit={handleSubmit(this.signinUser)} className="row justify-content-around">
        <div className="col-md-6">
          <h3 className="text-center">Вход</h3>
          <Field
            name="email"
            type="email"
            component={renderField}
            label="E-mail:"
            className="form-group"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Пароль:"
            className="form-group"
          />
          {this.renderErrors()}
          <div className="text-right">
            <button type="submit" disabled={submitting} className="btn btn-outline-primary">Sign in</button>
          </div>
        </div>
      </form>
    );
  }
}
function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Пожалуйста, введите email!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Почтовый адрес не верен';
  }
  if (!formProps.password) {
    errors.password = 'Пожалуйста, введите пароль!';
  }
  return errors;
}

const SigninWithData = graphql(query)(
  graphql(mutation)(Signin)
);

const SigninWithForm = reduxForm({
  form: 'signin',
  validate
})(SigninWithData);

export default withRouter(SigninWithForm);
