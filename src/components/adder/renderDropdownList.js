/**
 * Created by xax on 24.06.2017.
 */
import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/lib/less/react-widgets.less';
const renderDropdownList = ({ input, data, valueField, textField, defaultValue }) =>
  <DropdownList {...input}
                data={data}
                defaultValue={defaultValue}
                valueField={valueField}
                textField={textField}
                onChange={input.onChange} />;
export default renderDropdownList;
