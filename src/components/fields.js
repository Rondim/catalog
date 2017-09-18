/**
 * Created by xax on 14.03.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class renderField extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.any,
    title: PropTypes.string,
    addon: PropTypes.string,
    className: PropTypes.string,
    meta: PropTypes.object
  };
  static defaultProps = {};

  ifError(text) {
    const { touched, error } = this.props.meta;
    return (touched && error && text) || '';
  }

  render() {
    const {
      input,
      label,
      placeholder,
      type,
      title,
      addon,
      className,
      meta: { error, active } } = this.props;
    return (
      <div className={`form-group ${className}`}>
        {label && <label title={title} >{label}</label>}
        <div className='col'>
          <input
            className={`form-control ${this.ifError('is-invalid')}`}
            {...input}
            placeholder={active ? '' : placeholder}
            type={type} title={title}
          />
          {addon && <span className="input-group-addon">{addon}</span>}
          {this.ifError(<div className="invalid-feedback">{error}</div>)}
        </div>
      </div>
    );
  }
}
