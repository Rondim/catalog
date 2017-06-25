/**
 * Created by xax on 25.06.2017.
 */
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';
import AdderConfig from './adderConfig2';
import ChangerOrder from '../components/order/changerOrder';

class PopupConfig extends Component {
  constructor(props) {
    super(props);
    this.handleNewFilters = this.handleNewFilters.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      parentFilter: 'itemType'
    };
  }
  handleNewFilters(newFilters) {
    this.props.orderPopupFilters(newFilters, this.state.parentFilter);
  }
  handleSelect(e) {
    this.props.fetchPopupFilters(e.target.value);
    this.setState({ parentFilter: e.target.value });
  }
  renderOptions() {
    return this.props.upFilters.map(filter => {
      return <option key={filter} value={filter}>{filter}</option>;
    });
  }
  renderChanger() {
    return (
      this.props.popupFilters ?
      <ChangerOrder list={this.props.popupFilters} handleNew = {this.handleNewFilters} />:
      <div/>
    );
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
              <form role="form" onChange={this.handleSelect}>
                <select className="form-control">
                  {this.renderOptions()}
                </select>
              </form>
              {this.renderChanger()}
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
    popupFilters: state.adder.popupFilters,
    dependences: state.adder.dependences,
    success: state.adder.success
  };
}

export default connect(mapStateToProps, actions)(PopupConfig);
