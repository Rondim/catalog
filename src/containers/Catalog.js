import React, { Component } from 'react';

import CatalogSidebar from '../components/CatalogSidebar';
import ProductList from '../components/ProductList';

class Catalog extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-9">
            <ProductList />
          </div>
          <div className="col-xs-3">
            <CatalogSidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default Catalog;
