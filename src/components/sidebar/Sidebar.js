import React from 'react';
import SidebarMenu from './SidebarMenu';

export default (props) => {
  const { menus, order, handleMenuSelect } = props;
  console.log('menus', menus);
  return (<div className="sidebar text-center">
    {order.map(menuId => {
      return <SidebarMenu
        key={menuId}
        handleMenuSelect={handleMenuSelect}
        {...menus[menuId]}/>;
    })}
  </div>);
};
