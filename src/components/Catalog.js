import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CatalogSidebar from '../containers/CatalogSidebar';
import ProductList from '../containers/CatalogList';

class Catalog extends Component {
  componentWillMount() {
    if (this.props.uid) {
      this.props.fetchItemList('catalog');
    }
  }
  render() {
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <ProductList
                items={this.props.ProductList.items.catalog}
                resetPage={this.props.resetPage}
                afterResetPage={this.props.afterResetPage}
              />
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
function mapStateToProps(state) {
  return {
    ProductList: state.ProductList,
    uid: state.auth.authenticated,
    resetPage: state.catalog.resetPage
  };
}

export default connect(mapStateToProps, actions)(Catalog);
