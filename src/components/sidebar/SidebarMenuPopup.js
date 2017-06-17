import React from 'react';
import {Button} from 'react-bootstrap';

/* Example of props
 props = {
 menuId,
 filtersSelected: ['earrings'],
 filters: [
 { name: 'Серьги', filterId: 'earrings' },
 { name: 'Кольца', filterId: 'rings' },
 { name: 'Браслеты', filterId: 'bands' }
 ],
 handleFilterClick,
 handleMouseEnter,
 handleMouseLeave
 };
 */
export default (props) => {
  const {handleMouseEnter, handleMouseLeave} = props;
  return (<div
    role="group"
    className="btn-group-vertical btn-group-sm sidebar-menu-popup"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
    {renderFilters(props)}
  </div>);
};

function renderFilters(props) {
  const {filters, filtersSelected, handleFilterClick, menuId} = props;
  return filters.map(({name, filterId}) => {
    const isSelected = filtersSelected.some(filter => filter === filterId);
    return <Button
      key={filterId}
      bsStyle={ isSelected ? 'primary' : 'default' }
      className="sidebar-menu-popup-filter-button"
      onClick={() => handleFilterClick({menuId, filterClicked: filterId})}>
      {name}
    </Button>;
  });
}
