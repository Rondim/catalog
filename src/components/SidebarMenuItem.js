import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SidebarPopup from './SidebarPopup';
import { SIDEBAR_MENU_RUS_NAMES } from '../sidebarConsts';

export default class SidebarMenuItem extends Component {
  render() {
    const { filterName, subFilters, activeFilter, onMouseEnter, onMouseLeave, onMouseClick } = this.props;
    return (
      <div className="btn-group-vertical btn-group-lg sidebar_button_group" role="group">
        <Button
          name={filterName}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          {SIDEBAR_MENU_RUS_NAMES[filterName]}
        </Button>
        {subFilters && <SidebarPopup
          filterName={filterName}
          onMouseClick={onMouseClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isActive={activeFilter === filterName}
          subFilters={subFilters} />}
      </div>
    );
  }
}
