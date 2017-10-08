/**
 * Created by xax on 25.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';

import AdderConfig from './AdderUpFilters';
import ChangerOrder from '../../components/order/changerOrder';
import query from './queries/FetchUpWithDep';
import SetOrderUpFilters from './mutations/SetOrderUpFilters';
import CreateUpFilters from './mutations/CreateUpFilter';

class MainConfig extends Component {
  static propTypes = {
    orderUpFilters: PropTypes.func,
    data: PropTypes.shape({
      allSidebarItems: PropTypes.array,
      loading: PropTypes.bool
    }),
    setOrderUpFilters: PropTypes.func,
    createUpFilters: PropTypes.func
  };

  handleNewUpFilters = (newFilters) => {
    let order =0;
    newFilters.forEach(id => {
      const variables = { id, order };
      this.props.setOrderUpFilters({ variables, refetchQueries: [{ query }] });
      order++;
    });
  };

  handleUpFilter = (variables) => {
    variables.order = this.props.data.allSidebarItems.length;
    variables.childIds = _.map(variables.childs, o => o.id);
    variables.parentIds = _.map(variables.parents, o => o.id);
    this.props.createUpFilters({ variables, refetchQueries: [{ query }] });
  };

  render() {
    const { loading, allSidebarItems } = this.props.data;
    if (loading) return <div />;
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col lg={9} md={9} xs={9}>
              <AdderConfig upFilters={allSidebarItems} addUpFilter={this.handleUpFilter} />
            </Col>
            <Col lg={3} md={3} xs={3}>
              <ChangerOrder list={allSidebarItems} handleNew = {this.handleNewUpFilters} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default graphql(query)(
    compose(
      graphql(SetOrderUpFilters, { name: 'setOrderUpFilters' }),
      graphql(CreateUpFilters, { name: 'createUpFilters' })
    )(MainConfig)
);
