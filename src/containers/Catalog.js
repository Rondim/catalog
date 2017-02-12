import React, { Component } from 'react';
import { Grid,Row,Col } from 'react-bootstrap';

import CatalogSidebar from '../components/CatalogSidebar';
import ProductList from '../components/ProductList';

class Catalog extends Component {
  render() {
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <ProductList />
            </Col>
            <Col lg={3} md={3} xs={3}>
            <CatalogSidebar />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Catalog;
