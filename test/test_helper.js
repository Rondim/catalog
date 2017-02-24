import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import React from 'react';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';
import chai from 'chai';

//Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

//build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass,props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
      <Provider store={createStore(reducers,state)}>
        <ComponentClass {...props}/>
      </Provider>
  );

  return $(ReactDom.findDOMNode(componentInstance));
}


// Build helper for simulating events
$.fn.simulate = function(eventName,value) {
  if(value){
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};


//Set up chai - jquery
chaiJquery(chai,chai.util, $);


export {renderComponent, expect};