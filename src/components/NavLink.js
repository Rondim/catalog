import React, {Component} from 'react';
import {Link} from 'react-router';

class NavLink extends Component {
  render() {
    let isActive = this.context.router.isActive(this.props.to, true);
    let className = isActive ? 'active' : '';

    return (
      <li role="presentation" className={className}>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object
};

export default NavLink;
