/**
 * Created by xax on 24.06.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import 'react-widgets/lib/less/react-widgets.less';

import * as actions from '../actions';
import renderField from '../components/Adder/renderField';
import renderDropdownList from '../components/Adder/renderDropdownList';
import renderMultiselect from '../components/Adder/renderMultiselect';

class AdderConfig extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchUpFilters();
    this.props.fetchPopupFilters('itemType');
    this.props.fetchDependences();
  }
  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div> : <div/>
    );
  }
  renderSuccess() {
    return (this.props.success ?
        <div className="alert alert-success">
          <strong>Добавлено</strong>
        </div> : <div/>
    );
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.addSecondFilter)} className="form" role="form">
        <div className="row">
          <Field
            name="id"
            type="input"
            component={renderField}
            label="Идентификатор"
            className="form-group"
          />
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
                name="parent"
                component={renderDropdownList}
                data={this.props.upFilters}
                defaultValue={this.props.upFilters[0]}
                textField="parent"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-4">
            <label>Зависит?</label>
            <Field
              name="dependentOn"
              component={renderMultiselect}
              data={this.props.dependences}/>
          </div>
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


function mapStateToProps(state) {
  return {
    upFilters: state.adder.upFilters,
    dependences: state.adder.dependences,
    success: state.adder.success,
    error: state.adder.error
  };
}

const AdderForm = reduxForm({
  form: 'adder',
  validate
})(AdderConfig);

const AdderConfigRedux = connect(mapStateToProps, actions)(AdderForm);

export default AdderConfigRedux;
