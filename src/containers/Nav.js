import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { onMenuClick } from '../actions';
import { CATALOG, MANAGER } from '../consts';


class Nav extends Component {
  handleClick(menuName) {
    if (menuName === CATALOG) {
      hashHistory.push("/");
    } else if (menuName === MANAGER){
      hashHistory.push("/manager")
    }
    this.props.onMenuClick(menuName);
  }
  render() {
    return (
      <nav>
        <ul className="nav nav-pills">
          <li role="presentation"
            className={this.props.menuSelected === CATALOG ? "active" : ""}
            onClick={() => this.handleClick(CATALOG)} >
              <a>{CATALOG}</a>
          </li>
          <li role="presentation"
            className={this.props.menuSelected === MANAGER ? "active" : ""}
            onClick={() => this.handleClick(MANAGER)} >
              <a>{MANAGER}</a>
          </li>
        </ul>
      </nav>
    );
  }
};

const mapStateToProps = ({ menuSelected }) => ({ menuSelected });

export default connect(mapStateToProps, { onMenuClick })(Nav);
