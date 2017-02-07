import React, { Component } from 'react';
import { Grid,Row,Col } from 'react-bootstrap';

import ProductList from '../components/ProductList';
import NewManagerSideBar from '../components/NewManagerSidebar';

class Manager extends Component {
  render() {
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <ProductList />
            </Col>
            <Col lg={3} md={3} xs={3}>
              <NewManagerSideBar />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Manager;
