import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Col } from 'react-bootstrap';

import PopupFilters from './queries/FetchPopupFiltersByParent';
import ChangerOrder from '../../components/order/changerOrder';
import SetOrderPopupFilters from './mutations/SetOrderPopupFilters';

class PopupOrder extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      allSidebarFilters: PropTypes.array,
      refetch: PropTypes.func
    }),
    upFilters: PropTypes.array,
    property: PropTypes.string,
    select: PropTypes.func,
    setOrder: PropTypes.func
  };
  static defaultProps = {};

  changeOrderFilters = newFilters => {
    const { property } = this.props;
    let order =0;
    newFilters.forEach(id => {
      const variables = { id, order };
      this.props.setOrder({ variables, refetchQueries: [{ query: PopupFilters, variables: { property } }] });
      order++;
    });
  };

  renderOptions() {
    const { upFilters } = this.props;
    return upFilters.map(filter => {
      return <option key={filter.id} value={filter.id}>{filter.name}</option>;
    });
  }

  renderChanger() {
    const { allSidebarFilters } = this.props.data;
    return (
      allSidebarFilters ?
        <ChangerOrder list={allSidebarFilters} handleNew = {this.changeOrderFilters} />:
        <div />
    );
  }

  render() {
    const { loading } = this.props.data;
    if (loading) return <div />;
    return (
      <Col lg={3} md={3} xs={3}>
        <form role="form" onChange={this.props.select}>
          <select className="form-control">
            {this.renderOptions()}
          </select>
        </form>
        {this.renderChanger()}
      </Col>
    );
  }
}

export default graphql(PopupFilters, {
  options({ property }) {
    return {
      variables: {
        property
      }
    };
  }
})(
  graphql(SetOrderPopupFilters, { name: 'setOrder' })(PopupOrder)
);
