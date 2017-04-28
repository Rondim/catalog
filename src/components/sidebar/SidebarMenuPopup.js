import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

/* Example of props
  props = {
    isPopupShow: true,
    multiSelection: true,
    filtersSelected: ['earrings'],
    filters: [
      { name: 'Серьги', filterId: 'earrings' },
      { name: 'Кольца', filterId: 'rings' },
      { name: 'Браслеты', filterId: 'bands' }
    ],
    handleFilterClick
  };
*/
export default class SidebarMenuPopup extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(filterId, isSelected, props) {
    const { multiSelection, filtersSelected, handleFilterClick } = props;
    let nextFiltersSelected;
    if (isSelected) {
      nextFiltersSelected = filtersSelected.filter(filter => filter !== filterId);
    } else if (multiSelection) {
      nextFiltersSelected = [...filtersSelected, filterId ];
    } else {
      nextFiltersSelected = [ filterId ];
    }
    handleFilterClick(nextFiltersSelected);
  }
  renderFilters(props) {
    const { filters, filtersSelected } = props;
    return filters.map(({ name, filterId }) => {
      const isSelected = filtersSelected.some(filter => filter === filterId);
      return <Button
        key={filterId}
        bsStyle={ isSelected ? "primary" : "default" }
        className="filter-button"
        onClick={() => this.onClick(filterId, isSelected, props)}>
        {name}
      </Button>
    });
  }
  render() {
    const props = this.props;
    const { isPopupShow, handleMouseEnter, handleMouseLeave } = props;
    return (<div
      role="group"
      className="btn-group-vertical btn-group-sm sidebar-menu-popup"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {isPopupShow && this.renderFilters(props)}
    </div>);
  }
}
