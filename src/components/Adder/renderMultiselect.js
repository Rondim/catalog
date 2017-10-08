/**
 * Created by xax on 24.06.2017.
 */
import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import _ from 'lodash';

const renderMultiselect = ({ input, data, valueField, textField, groupBy }) =>
  <Multiselect {...input}
               onBlur={() => input.onBlur()}
               value={input.value || []} // requires value to be an array
               data={data}
               valueField={valueField}
               textField={textField}
               groupBy={item =>  _.get(item, groupBy)}
  />;

export default renderMultiselect;
