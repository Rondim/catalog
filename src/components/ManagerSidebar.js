import React, { Component } from 'react';
import SidebarButton from './SidebarButton';
import DualSidebarButton from './DualSidebarButton'

class ManagerSideBar extends Component {
  render() {
    return (
      <div className="manager_sidebar text-center">
        <SidebarButton btnName="Отдел" />
        <SidebarButton btnName="Производитель" />

        <DualSidebarButton leftName="Au" rightName="Ag" />

        <SidebarButton btnName="Серьги" />
        <SidebarButton btnName="Пластины" />
        <SidebarButton btnName="Размеры" />

        <SidebarButton btnName="Фианиты" />
        <SidebarButton btnName="Агат" />


      </div>
    );
  }
}

export default ManagerSideBar;
