/**
 * Created by xax on 18.06.2017.
 */
import React from 'react';
import { Field } from 'redux-form';

import renderField from './renderField';

const renderList = ({ fields, meta: { error } }, name) => (
  <div className="col-xs-4">
    <button type="button" className="btn btn-primary" onClick={() => fields.push()}>
      Добавить {name}
    </button>
    <div className="form-group">
    {fields.map((val, index) => (
      <div key={index} className="col-xs-12">
        <button
          type="button"
          className="btn btn-danger"
          title="Удалить {name}"
          onClick={() => fields.remove(index)}
        >
          <span className="glyphicon glyphicon-trash"/>
        </button>
        <Field
          name={val}
          type="text"
          component={renderField}
          label={`${name} #${index + 1}`}
        />
      </div>
    ))}
    </div>
    {error && <li className="error">{error}</li>}
  </div>
);

export default renderList;
