import React, { Component } from 'react';
import { Grid,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../actions'

import CatalogSidebar from '../components/CatalogSidebar';
import ProductList from '../components/ProductList';

class Catalog extends Component {
    shouldComponentUpdate(nextProps){
        if(nextProps.uid&&this.props.uid !== nextProps.uid){
            return true;
        }
        if(this.props.ProductList.activeList !== nextProps.ProductList.activeList){
            return true;
        }
        if(!this.props.ProductList.items&&nextProps.ProductList.items){
            return true;
        }
        return false;
    }
    componentWillUpdate(nextProps){
        if(nextProps.uid){
            nextProps.fetchItemList();
        }
    }
  render() {
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <ProductList items={this.props.ProductList.items.catalog} />
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
    return { ProductList: state.ProductList,uid: state.auth.authenticated };
}

export default connect(mapStateToProps,actions)(Catalog);
