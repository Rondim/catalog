/**
 * Created by xax on 25.06.2017.
 */
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';
import AdderConfig from './adderConfig';
import ChangerOrder from '../components/order/changerOrder';

class MainConfig extends Component {
  constructor(props) {
    super(props);
    this.handleNewUpFilters = this.handleNewUpFilters.bind(this);
  }
  handleNewUpFilters(newFilters) {
    this.props.orderUpFilters(newFilters);
  }
  render() {
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <AdderConfig/>
            </Col>
            <Col lg={3} md={3} xs={3}>
              <ChangerOrder list={this.props.upFilters} handleNew = {this.handleNewUpFilters} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    upFilters: state.adder.upFilters,
    dependences: state.adder.dependences,
    success: state.adder.success
  };
}

export default connect(mapStateToProps, actions)(MainConfig);
