/**
 * Created by xax on 18.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';

import renderList from '../../components/Adder/renderList';
import renderField from '../../components/Adder/renderField';
import mutation from './mutations/AddItem';

class Adder extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool
  };

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div> : <div />
    );
  }

  renderSuccess() {
    return (this.props.success ?
        <div className="alert alert-success">
          <strong>Добавлено</strong>
        </div> : <div />
    );
  }

  addItem = (values) => {
    console.log(values);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.addItem)} className="form" role="form">
        <div className="row">
          <Field
            name="img"
            type="input"
            component={renderField}
            label="Ссылка на изображение"
            className="form-group"
          />
          <Field
            name="itemType"
            type="input"
            component={renderField}
            label="Тип изделия"
            className="form-group"
          />
          <Field
            name="itemStonesType"
            type="input"
            component={renderField}
            label="Тип камней"
            className="form-group"
          />
        </div>
        <div className="row">
          <Field
            name="manufacturer"
            type="input"
            component={renderField}
            label="Производитель"
            className="form-group"
          />
          <Field
            name="material"
            type="input"
            component={renderField}
            label="Материал"
            className="form-group"
          />
          <Field
            name="mid"
            type="input"
            component={renderField}
            label="mid"
            className="form-group"
          />
        </div>
        <div className="row">
          <Field
            name="set"
            type="input"
            component={renderField}
            label="set"
            className="form-group"
          />
          <Field
            name="itemSubtype"
            type="input"
            component={renderField}
            label="itemSubtype"
            className="form-group"
          />
        </div>
        <div className="row">
          <FieldArray name="stones" component={param => renderList(param, 'камень')} />
          <FieldArray name="tags" component={param => renderList(param, 'тэг')} />
          <FieldArray name="others" component={param => renderList(param, 'другое')} />
        </div>
        {this.renderAlert()}
        {this.renderSuccess()}
        <div className="row">
          <button
            type="submit"
            disabled={submitting}
            className="col-xs-12 btn btn-success">
            Добавить
          </button>
        </div>
      </form>
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (!formProps.img) {
    errors.img = 'Обязательно введи ссылку на изделие!';
  } else if (!/http:\/\//i.test(formProps.img) && !/https:\/\//i.test(formProps.img)) {
    errors.img = 'Это не ссылка';
  }
  if (!formProps.itemType) {
    errors.itemType = 'Обязательно введи тип изделия!';
  }
  if (!formProps.mid) {
    errors.mid = 'Обязательно введи id производителя!';
  }
  return errors;
}

const AdderForm = reduxForm({
  form: 'adder',
  validate
})(Adder);

export default graphql(mutation)(AdderForm);

