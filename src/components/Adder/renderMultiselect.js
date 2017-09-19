/**
 * Created by xax on 24.06.2017.
 */
import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
               onBlur={() => input.onBlur()}
               value={input.value || []} // requires value to be an array
               data={data}
               valueField={valueField}
               textField={textField}
  />;

export default renderMultiselect;
