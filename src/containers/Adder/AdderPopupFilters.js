/**
 * Created by xax on 24.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import renderField from '../../components/Adder/renderField';
import renderDropdownList from '../../components/Adder/renderDropdownList';
import renderMultiselect from '../../components/Adder/renderMultiselect';
import PopupFilters from './queries/FetchPopupFilters';

class AdderConfig extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    addSecondFilter: PropTypes.func,
    submitting: PropTypes.bool,
    upFilters: PropTypes.array,
    dependences: PropTypes.array,
    data: PropTypes.object
  };

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div> : <div />
    );
  }

  render() {
    const { handleSubmit, submitting, upFilters, data: { loading, allSidebarFilters } } = this.props;
    if (loading) return <div />;
    return (
      <form onSubmit={handleSubmit(this.props.addSecondFilter)} className="form" role="form">
        <div className="row">
          <Field
            name="name"
            type="input"
            component={renderField}
            label="Отображаемое имя"
            className="form-group"
          />
          <div className="form-group col-xs-4">
            <label>Фильтр первого уровня</label>
            <div>
              <Field
                name="property"
                component={renderDropdownList}
                data={upFilters}
                defaultValue={upFilters[0]}
                textField="name"
                valueField='id'
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-4">
            <label>Зависит?</label>
            <Field
              name="dependentOn"
              component={renderMultiselect}
              data={allSidebarFilters}
              textField='name'
              valueField='id'
              groupBy='property.name'
            />
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
  if (!formProps.parent) {
    errors.parent = 'Обязательно выбери фильтр первого уровня!';
  }
  return errors;
}

const AdderForm = reduxForm({
  form: 'adder',
  validate
})(AdderConfig);

export default graphql(PopupFilters)(AdderForm);
