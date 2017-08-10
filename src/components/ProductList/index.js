import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

import ProductListItem from './ProductListItem';
import Loading from '../Loading';

class ProductList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    setActive: PropTypes.func,
    fetchMore: PropTypes.func,
    count: PropTypes.number
  };
  state = {
    page: 1
  };

  onSelect = (ev) => {
    const { setActive } = this.props;
    ev.preventDefault();
    setActive && setActive(ev.target.id);
  };

  handleKeyDown = (ev) => {
    if (ev.keyCode === 39) {
      this.handleChangePage(true);
    } else if (ev.keyCode === 37) {
      this.handleChangePage(false);
    }
  };

  handleChangePage = (forward, page) => {
    const { count, fetchMore, items } = this.props;
    const max = Math.ceil(count / 8);
    this.setState(prevState => {
      if (page) {
        fetchMore(page);
        return { page };
      }
      if (forward) {
        console.log(items);
        fetchMore(prevState.page + 1);
        if (prevState.page < max) return { page: prevState.page + 1 };
      } else if (prevState.page > 1) {
        !items[(prevState.page-2)*8] && fetchMore(prevState.page - 1);
        return { page: prevState.page - 1 };
      }
      return { page: prevState.page };
    });
  };

  /**
   * Renders the component List.
   *
   * @memberof app.components.ProductList.render
   * @return {string} - HTML markup for the component List
   */
  renderPages() {
    const { count } = this.props;
    let pages = [];
    for (let i = 0; i < Math.ceil(count / 8); i++) {
      pages.push(i + 1);
    }
    return pages.map(n => {
      return (
        <Button
          active={this.state.page === n}
          key={n}
          onClick={() => this.handleChangePage(null, n) }
          className="btn">{n}
        </Button>
      );
    });
  }

  renderList() {
    const { items, setActive } = this.props;
    const { page } = this.state;
    let i = 0;
    if (items.length === 0) return <Loading />;
    return _.map(items, item => {
      if (item) {
        const { active, complited, img: { url }, id } = item;
        i++;
        if (i <= page * 8 && i > (page - 1) * 8) {
          return (<ProductListItem
            id={id}
            active={active}
            complited={complited}
            key={id}
            img={url}
            handleSelect={this.onSelect}
            disabled={!setActive}
          />);
        }
      } else i++;
    });
  }

  /**
   * Renders the component.
   *
   * @memberof app.components.ProductList
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <div className="product_list_container" tabIndex="1" onKeyDown={this.handleKeyDown}>
        <div className="text-center">
          <Button onClick={() => this.handleChangePage(false)}>
            <FontAwesome name="arrow-left" />
          </Button>
          <Button onClick={() => this.handleChangePage(true)}>
            <FontAwesome name="arrow-right" />
          </Button>
        </div>
        <ul className="row product_list">
          {this.renderList()}
        </ul>
        <ButtonGroup>
          {this.renderPages()}
        </ButtonGroup>
      </div>
    );
  }
}


export default ProductList;
