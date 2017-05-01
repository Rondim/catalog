import React from 'react';
import SidebarMenu from './SidebarMenu';

export default ({ menus, handleFilterClick }) => {
  return (<div className="sidebar text-center">
    {menus.map(menuProps => {
      return <SidebarMenu
        key={menuProps.menuId}
        handleFilterClick={handleFilterClick}
        {...menuProps}/>
    })}
  </div>);
};
