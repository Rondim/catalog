import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import CatalogSidebar from '../containers/CatalogSidebar';
import ProductList from './ProductList';

const Catalog = () => (
  <div className="container">
    <Grid>
      <Row className="show-grid">
        <Col lg={9} md={9} xs={9}>
          <ProductList />
        </Col>
        <Col lg={3} md={3} xs={3}>
          {/* <CatalogSidebar />*/}
        </Col>
      </Row>
    </Grid>
  </div>
);
export default Catalog;
