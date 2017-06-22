import React from 'react';
import SidebarMenu from './SidebarMenu';

export default (props) => {
  const { menus, order, filtersSelected, filtersToShow,
    handleMenuSelect } = props;
  return (<div className="sidebar text-center">
    {order.map(menuId => {
      return <SidebarMenu
        key={menuId}
        handleMenuSelect={handleMenuSelect}
        filtersSelected={filtersSelected[menuId]}
        filtersToShow = {filtersToShow[menuId]}
        {...menus[menuId]}/>;
    })}
  </div>);
};
