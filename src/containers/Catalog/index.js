import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import CatalogSidebar from '../CatalogSidebar';
import ProductList from '../../components/ProductList';
import FetchItems from './queries/FetchItems';


const Catalog = ({ loading, allItems, loadMoreItems, _allItemsMeta }) => (
  <div className="container">
    <Grid>
      <Row className="show-grid">
        <Col lg={9} md={9} xs={9}>
          <ProductList
            count={_allItemsMeta && _allItemsMeta.count || 0}
            items={loading ? [] : allItems }
            fetchMore={loadMoreItems}
          />
        </Col>
        <Col lg={3} md={3} xs={3}>
           {/* <CatalogSidebar /> */}
        </Col>
      </Row>
    </Grid>
  </div>
);

Catalog.propTypes = {
  loading: PropTypes.bool,
  allItems: PropTypes.array,
  loadMoreItems: PropTypes.func
};
export default graphql(FetchItems, {
  options(props) {
    return {
      variables: {
        skippedItems: 0,
        size: 16,
      },
      fetchPolicy: 'network-only',
    };
  },
  props({ data: { loading, allItems, fetchMore, _allItemsMeta } }) {
    return {
      loading,
      allItems,
      _allItemsMeta,
      loadMoreItems(page) {
        return fetchMore({
          variables: {
            skippedItems: (page)*8,
            size: 8
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult;
            }
            return Object.assign({}, previousResult, {
              allItems: [...previousResult.allItems, ...fetchMoreResult.allItems],
            });
          },
        });
      },
    };
  },
})(Catalog);
