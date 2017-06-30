/**
 * Created by xax on 23.02.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';


class Signin extends Component {
  componentWillUpdate() {
    this.props.authenticated ? hashHistory.push('/') : '';
  }

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div> : <div/>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.signinUser)} className="form" role="form">
        <Field
          name="email"
          type="email"
          component={renderField}
          label="e-mail"
          className="form-group"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="password"
          className="form-group"
        />
        {this.renderAlert()}
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          Sign in
        </button>
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

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin);

Signin = connect(mapStateToProps, { signinUser })(Signin);

export default Signin;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label className="form-group-addon">{label}</label>
    <input {...input} placeholder={label} type={type} className="form-control"/>
    {touched && ((error && <span className="error form-group-addon">{error}</span>) )}
  </div>
);
