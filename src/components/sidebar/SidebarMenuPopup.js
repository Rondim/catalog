import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
    const { handleMouseEnter, handleMouseLeave } = props;
    return (<div
      role="group"
      className="btn-group-vertical btn-group-sm sidebar-menu-popup"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {renderFilters(props)}
    </div>);
};

function renderFilters(props) {
  const { filters, filtersSelected, filtersToShow, handleFilterClick } = props;
  return filtersToShow.length > 0 ? filtersToShow.map(filterId => {
    return (<Button
        key={filterId}
        bsStyle={ getSelectionStyle(filterId, filtersSelected) }
        className="sidebar-menu-popup-button"
        onClick={() => handleFilterClick(filterId)}>
        {filters[filterId]['filterName']}
    </Button>);
  }) : null;
}

function getSelectionStyle(filterId, filtersSelected) {
  switch (filtersSelected[filterId]) {
    case 'selected':
      return 'primary';
    case 'selectedNotByAll':
      return 'warning';
    default:
      return 'default';
  }
}
