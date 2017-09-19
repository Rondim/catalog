/**
 * Created by xax on 25.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChangerOrder extends Component {
  static propTypes = {
    handleNew: PropTypes.func,
    list: PropTypes.array
  };

  state = {
    active: false
  };

  handleKeyDown = (e) => {
    let newFilters = [];
    if (e.keyCode === 40) {
      let activeFilter = false;
      this.props.list.map(filter => {
        if (activeFilter) {
          newFilters.push(filter.id);
          newFilters.push(this.state.active);
          activeFilter = false;
        } else if (filter.id !== this.state.active && !activeFilter) {
          newFilters.push(filter.id);
        } else {
          activeFilter = true;
        }
      });
      if (this.props.list.length !== newFilters.length) {
        newFilters.push(this.state.active);
      }
    } else if (e.keyCode === 38) {
      let oldFilter = false;
      this.props.list.map(filter => {
        if (!oldFilter && filter.id !== this.state.active) {
          oldFilter = filter.id;
        } else if (oldFilter && filter.id !== this.state.active) {
          newFilters.push(oldFilter);
          oldFilter = filter.id;
        } else if (filter.id === this.state.active) {
          newFilters.push(filter.id);
        }
      });
      newFilters.push(oldFilter);
    }
    this.props.handleNew(newFilters);
  };

  handleSelect = (e) => {
    this.setState({ active: e.target.id });
  };

  renderList() {
    return this.props.list.map(filter => {
      const style = filter.id === this.state.active?
        'list-group-item active':
        'list-group-item';
      return (
        <li
        className={style}
        onClick={this.handleSelect}
        id={filter.id}
        key={filter.id}>
        {filter.name}
        </li>
      );
    });
  }
  render() {
    return (
      <ul className="list-group" tabIndex="0" onKeyDown={this.handleKeyDown}>
        {this.renderList()}
      </ul>
      );
  }
}

export default ChangerOrder;
