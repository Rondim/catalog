import React, { Component } from 'react';

import ProductList from '../components/ProductList';
import ManagerSideBar from '../components/ManagerSideBar';

class Manager extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-9 product_list_container">
            <ProductList />
          </div>
          <div className="col-xs-3">
            <ManagerSideBar />
          </div>
        </div>
      </div>
    );
  }
}

export default Manager;
