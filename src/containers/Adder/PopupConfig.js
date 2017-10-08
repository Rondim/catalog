/**
 * Created by xax on 25.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import AdderConfig from './AdderPopupFilters';
import UpFilters from './queries/FetchUpWithDep';
import PopupOrder from './PopupOrder';
import CreatePopupFilter from './mutations/CreatePopupFilter';


class PopupConfig extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allSidebarItems: PropTypes.array,
      allSidebarFilters: PropTypes.array,
      loading: PropTypes.bool
    }),
    createPopup: PropTypes.func
  };

  state = {
    parentFilter: ''
  };

  componentWillReceiveProps(nextProps) {
    const parentFilters = nextProps.data.allSidebarItems;
    if (parentFilters && !this.props.data.allSidebarItems) {
      this.setState({ parentFilter: parentFilters[0].id });
    }
  }

  handlePopupFilter = (variables) => {
    variables.property = variables.property.id;
    variables.order = _.filter(this.props.data.allSidebarFilters, o => o.property.id === variables.property).length;
    variables.dependentOn = _.map(variables.dependentOn, o => o.id);
    this.props.createPopup({ variables });
  };

  handleSelect = (e) => {
    this.setState({ parentFilter: e.target.value });
  };

  render() {
    const { loading, allSidebarItems } = this.props.data;
    if (loading) return <div />;
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <AdderConfig
                upFilters={allSidebarItems}
                addSecondFilter={this.handlePopupFilter}
                property={this.state.parentFilter}
              />
            </Col>
            <PopupOrder select={this.handleSelect} property={this.state.parentFilter} upFilters={allSidebarItems} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default graphql(UpFilters)(
  graphql(CreatePopupFilter, { name: 'createPopup' })(PopupConfig)
);
