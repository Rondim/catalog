import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import * as actions from '../actions';

class CatalogSideBar extends Component {
  constructor(props) {
    super(props);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
  }
  componentWillMount() {
    this.props.fetchSidebarConfig('catalogSidebar');
  }
  handleMenuSelect(menuChanged) {
    const newCatalogSidebarState = calcCatalogSidebarState(menuChanged, this.props.catalogSidebar);
    this.props.setCatalogSidebarState(newCatalogSidebarState);
    const filters = Object.keys(newCatalogSidebarState.filtersSelected);
    let query = {};
    filters.forEach(filter => {
      const selected = Object.keys(newCatalogSidebarState.filtersSelected[filter]);
      if (selected.length > 0) {
        query[filter] = selected;
      }
    });
    this.props.fetchItemList('catalog', query);
  }
  render() {
    const { menus, order, filtersSelected } = this.props.catalogSidebar;
    if (!validateProps(this.props.catalogSidebar)) return null;
    return <div className="catalog_sidebar">
        <Sidebar
          menus={menus}
          order={order}
          filtersToShow={calcShowItems(this.props.catalogSidebar)}
          filtersSelected={filtersSelected}
          handleMenuSelect={this.handleMenuSelect}
        />
    </div>;
  }
}

function mapStateToProps(state) {
  return { catalogSidebar: state.catalog.sidebar };
}
export default connect(mapStateToProps, actions)(CatalogSideBar);

export function calcCatalogSidebarState({ menuId, filtersSelected }, catalogSidebarState) {
  const { dependencies } = catalogSidebarState;
  let newFiltersSelectedState = { ...catalogSidebarState.filtersSelected };
  // Сбросим выбранные фильтры у дочерних фильтров
  resetChildMenuFilters(menuId, dependencies, newFiltersSelectedState);
  // Установим выбранные фильтры для измененного меню
  newFiltersSelectedState[menuId] = filtersSelected;
  return { ...catalogSidebarState, filtersSelected: newFiltersSelectedState };

  function resetChildMenuFilters(parentMenuId, dependencies, filtersSelectedState) {
    if (dependencies[parentMenuId]['childMenus']) {
      const childMenuIds = Object.keys(dependencies[parentMenuId]['childMenus']);
      childMenuIds.forEach(menuId => {
        newFiltersSelectedState[menuId] = {};
        resetChildMenuFilters(menuId, dependencies, filtersSelectedState);
      });
    }
  }
}

export function calcShowItems(sidebarState) {
  let { menus, dependencies, order, filtersSelected } = sidebarState;
  let result = {};
  order.forEach(menuId => {
    let filtersToShow = [];
    if (dependencies[menuId]['parentMenus']) {
      const parentId = Object.keys(dependencies[menuId]['parentMenus'])[0];
      const filtersSelectedIds = Object.keys(filtersSelected[parentId]);
      if (filtersSelectedIds.length === 1
        && filtersSelected[parentId][filtersSelectedIds[0]] === 'selected') {
        let filters = menus[menuId]['filters'];
        const parentSelectedFilter = filtersSelectedIds[0];
        menus[menuId]['filtersOrder'].forEach(filterId => {
          if (filters[filterId]['dependentOn'][parentSelectedFilter]) {
            filtersToShow.push(filterId);
          }
        });
      }
    } else {
      filtersToShow = [...menus[menuId].filtersOrder];
    }
    result[menuId] = filtersToShow;
  });
  return result;
}

function validateProps(sidebarState) {
  const { menus, dependencies, order, filtersSelected } = sidebarState;
  return !(menus === {} || dependencies === {} || order === [] || filtersSelected === {});
}
