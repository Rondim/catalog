import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import CatalogSidebar from '../CatalogSidebar';
import ProductList from '../../components/ProductList';
import query from './queries/FetchItems';

const Catalog = ({ data: { loading, allItems } }) => (
  <div className="container">
    <Grid>
      <Row className="show-grid">
        <Col lg={9} md={9} xs={9}>
          <ProductList items={loading ? [] : allItems } />
        </Col>
        <Col lg={3} md={3} xs={3}>
          {/* <CatalogSidebar />*/}
        </Col>
      </Row>
    </Grid>
  </div>
);

Catalog.propTypes = {
  data: PropTypes.object
};
export default graphql(query)(Catalog);
