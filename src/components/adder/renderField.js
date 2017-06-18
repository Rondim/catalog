/**
 * Created by xax on 18.06.2017.
 */
import React from 'react';
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="col-xs-4 form-group">
    <label className="form-group-addon">{label}</label>
    <input {...input} placeholder={label} type={type} className="form-control"/>
    {touched && ((error && <span className="error form-group-addon">{error}</span>) )}
  </div>
);

export default renderField;
