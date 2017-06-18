/**
 * Created by xax on 18.06.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Adder extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('Mount');
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
          name="img"
          type="input"
          component={renderField}
          label="Image url"
          className="form-group"
        />
        <Field
          name="itemType"
          type="input"
          component={renderField}
          label="itemType"
          className="form-group"
        />
        <Field
          name="itemStonesType"
          type="input"
          component={renderField}
          label="itemStonesType"
          className="form-group"
        />
        <Field
          name="manufacturer"
          type="input"
          component={renderField}
          label="manufacturer"
          className="form-group"
        />
        <Field
          name="material"
          type="input"
          component={renderField}
          label="material"
          className="form-group"
        />
        <Field
          name="mid"
          type="input"
          component={renderField}
          label="mid"
          className="form-group"
        />
        <Field
          name="set"
          type="input"
          component={renderField}
          label="set"
          className="form-group"
        />
        <Field
          name="stones"
          type="input"
          component={renderField}
          label="stones"
          className="form-group"
        />
        <Field
          name="itemSubtype"
          type="input"
          component={renderField}
          label="itemSubtype"
          className="form-group"
        />
        <Field
          name="unique"
          type="input"
          component={renderField}
          label="unique"
          className="form-group"
        />
        <Field
          name="tags"
          type="input"
          component={renderField}
          label="tags"
          className="form-group"
        />
        <Field
          name="other"
          type="input"
          component={renderField}
          label="other"
          className="form-group"
        />
        {this.renderAlert()}
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary">
          Добавить
        </button>
      </form>
    );
  }
}
function validate(formProps) {
  const errors = {};
  return errors;
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

const AdderForm = reduxForm({
  form: 'adder',
  validate
})(Adder);

const AdderRedux = connect(mapStateToProps, actions)(AdderForm);

export default AdderRedux;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label className="form-group-addon">{label}</label>
    <input {...input} placeholder={label} type={type} className="form-control"/>
    {touched && ((error && <span className="error form-group-addon">{error}</span>) )}
  </div>
);
