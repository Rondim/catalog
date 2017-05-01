import React, { Component } from 'react';
import SidebarMenuButton from './SidebarMenuButton';
import SidebarMenuPopup from './SidebarMenuPopup';


export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isPopupShow: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() {
    this.setState({ isPopupShow: true });
  }
  handleMouseLeave() {
    this.setState({ isPopupShow: false });
  }
  render() {
    const props = { ...this.props,
      handleMouseEnter: this.handleMouseEnter,
      handleMouseLeave: this.handleMouseLeave };
    return (<div
      className="btn-group-vertical btn-group-lg sidebar-menu"
      role="group">
      <SidebarMenuButton {...props}/>
      {this.state.isPopupShow && <SidebarMenuPopup {...props}/>}
    </div>);
  }
};
