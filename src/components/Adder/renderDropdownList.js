/**
 * Created by xax on 24.06.2017.
 */
import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
const renderDropdownList = ({
                              input,
                              data,
                              valueField,
                              textField,
                              defaultValue,
                              meta: { touched, error, warning }

}) =>
  (<div>
    <DropdownList
      {...input}
      data={data}
      defaultValue={defaultValue}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange}
    />
    {touched && ((error && <span className="error form-group-addon">{error}</span>) )}
  </div>);


export default renderDropdownList;
