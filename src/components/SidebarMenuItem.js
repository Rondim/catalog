import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SidebarPopup from './SidebarPopup';
import { SIDEBAR_MENU_RUS_NAMES } from '../sidebarConsts';

export default class SidebarMenuItem extends Component {
  render() {
    const { filterName, subfilters, activeFilter, isActive,
      onMouseEnter, onMouseLeave, onMouseClick } = this.props;
    let filterButtonText, buttonStyle;
    if (!subfilters || !getFilterButtonText(subfilters)) {
      filterButtonText = SIDEBAR_MENU_RUS_NAMES[filterName]
      buttonStyle = `${isActive ? "": "disabled_button"}`
    } else {
      filterButtonText = getFilterButtonText(subfilters);
      buttonStyle = "selected_button";
    }
    return (
      <div className="btn-group-vertical btn-group-lg sidebar_button_group" role="group">
        <Button
          name={filterName}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={buttonStyle}>
          {filterButtonText}
        </Button>
        {subfilters && <SidebarPopup
          filterName={filterName}
          onMouseClick={onMouseClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isActive={activeFilter === filterName}
          subfilters={subfilters} />}
      </div>
    );
  }
}

function getFilterButtonText(subfilters) {
  let subfiltersSelected = [];
  let text ='';
  Object.keys(subfilters).forEach(subfilterId => {
    if (subfilters[subfilterId]['isSelected']) {
      subfiltersSelected.push(subfilters[subfilterId]['name'].toString());
    }
  });
  if (subfiltersSelected.length === 1) {
    text = subfiltersSelected[0];
  } else if (subfiltersSelected.length > 1) {
    text = subfiltersSelected.map(subfilter => subfilter.substr(0,4)).join(', ');
  }
  return text.substr(0,20);
}
