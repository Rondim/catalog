import React from 'react';
import SidebarMenuButton from './SidebarMenuButton';
import SidebarMenuPopup from './SidebarMenuPopup';


export default (props) => {
  return (<div className="btn-group-vertical btn-group-lg sidebar-menu" role="group">
    <SidebarMenuButton />
    <SidebarMenuPopup />
  </div>);
};
