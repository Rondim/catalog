import React, {Component} from 'react';
import Sidebar from '../components/sidebar/Sidebar';

class ManagerSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {menus: []};
  }

  render() {
    return (
      <Sidebar menus={this.state.menus}/>
    );
  }
}

export default ManagerSidebar;
