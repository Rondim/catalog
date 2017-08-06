import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ProductListItem from './ProductListItem';
import Loading from '../Loading';

class ProductList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    setActive: PropTypes.func
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

  handleChangePage = (forward) => {
    const max = Object.keys(this.props.items).length / 8;
    this.setState((prevState) => {
      if (forward) {
        if (prevState.page < max) return { page: prevState.page + 1 };
      } else if (prevState.page > 1) return { page: prevState.page - 1 };
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
    const itemsCount = Object.keys(this.props.items).length;
    let pages = [];
    for (let i = 0; i < itemsCount / 8; i++) {
      pages.push(i + 1);
    }
    return pages.map(n => {
      return (
        <Button
          active={this.state.page === n}
          key={n}
          onClick={() => this.setState({ page: n }) }
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
          <Button onClick={() => this.handleChangePage(false)}>{'<'} </Button>
          <Button onClick={() => this.handleChangePage(true)}> {'>'} </Button>
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
