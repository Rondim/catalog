/**
 * Created by xax on 25.06.2017.
 */
import React, { Component } from 'react';

class ChangerOrder extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      active: false
    };
  }
  handleKeyDown(e) {
    let newFilters = [];
    if (e.keyCode === 40) {
      let activeFilter = false;
      this.props.list.map(filter => {
        if (activeFilter) {
          newFilters.push(filter);
          newFilters.push(this.state.active);
          activeFilter = false;
        } else if (filter !== this.state.active && !activeFilter) {
          newFilters.push(filter);
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
        if (!oldFilter && filter !== this.state.active) {
          oldFilter = filter;
        } else if (oldFilter && filter !== this.state.active) {
          newFilters.push(oldFilter);
          oldFilter = filter;
        } else if (filter === this.state.active) {
          newFilters.push(filter);
        }
      });
      newFilters.push(oldFilter);
    }
    this.props.handleNew(newFilters);
  }
  handleSelect(e) {
    this.setState({ active: e.target.id });
  }
  renderList() {
    return this.props.list.map(filter => {
      const style = filter === this.state.active?
        'list-group-item active':
        'list-group-item';
      return (
        <li
        className={style}
        onClick={this.handleSelect}
        id={filter}
        key={filter}>
        {filter}
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
