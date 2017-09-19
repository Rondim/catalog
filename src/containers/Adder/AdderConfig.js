/**
 * Created by xax on 24.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import 'react-widgets/lib/less/react-widgets.less';
import _ from 'lodash';

import renderField from '../../components/Adder/renderField';
import renderDropdownList from '../../components/Adder/renderDropdownList';
import renderMultiselect from '../../components/Adder/renderMultiselect';

class AdderConfig extends Component {
  static propTypes = {
    data: PropTypes.shape({
      error: PropTypes.object
    }),
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    upFilters: PropTypes.array,
    addUpFilter: PropTypes.func.isRequired
  };

  renderAlert() {
    return (_.get(this.props, 'data.error.message') ?
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.data.error.message}
        </div> : <div />
    );
  }

  render() {
    const { handleSubmit, submitting, upFilters } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.addUpFilter)} className="form" role="form">
        <div className="row">
          <Field
            name="name"
            type="input"
            component={renderField}
            label="Отображаемое имя"
            className="form-group"
          />
          <div className="form-group col-xs-4">
            <label>Родительские фильтры</label>
            <Field
              name="parents"
              component={renderMultiselect}
              data={upFilters}
              textField = 'name'
              valueField = 'id'
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-4">
            <label>Дочерние фильтры</label>
            <Field
              name="childs"
              component={renderMultiselect}
              data={upFilters}
              textField = 'name'
              valueField = 'id'
            />
          </div>
          <Field
            name="multiselection"
            type="checkbox"
            component={renderField}
            label="Множественный выбор"
            className="form-control"
          />
          {false && <Field
            name="block"
            type="checkbox"
            component={renderField}
            label="Заблокированы для изменений"
            className="form-control"
          />}
        </div>
        <div className="row">
          <div className="form-group col-xs-4">
            <label>Тип меню</label>
            <div>
              <Field
                name="type"
                component={renderDropdownList}
                data={['filter', 'button']}
                defaultValue='filter'
                textField="menuType" />
            </div>
          </div>
        </div>
        {this.renderAlert()}
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
  if (!formProps.id) {
    errors.id = 'Обязательно введи id!';
  }
  if (!formProps.name) {
    errors.name = 'Обязательно введи Имя!';
  }
  if (!formProps.menuType) {
    errors.menuType = 'Обязательно выбери тип меню!';
  }
  return errors;
}

const AdderForm = reduxForm({
  form: 'adder',
  validate
})(AdderConfig);

export default AdderForm;

