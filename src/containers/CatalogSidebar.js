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
  }
  render() {
    const { menus, dependencies, order } = this.props.catalogSidebar;
    const menusShowed = calcShowItems(menus, dependencies, order);
    return (
      <div className="catalog_sidebar">
        <Sidebar
          menus = {menusShowed}
          order = {order}
          handleMenuSelect={this.handleMenuSelect}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { catalogSidebar: state.catalog.sidebar };
}
export default connect(mapStateToProps, actions)(CatalogSideBar);

export function calcCatalogSidebarState({ menuId, filtersSelected }, catalogSidebarState) {
  let { menus, dependencies } = catalogSidebarState;
  // Скопируем состояние
  let newMenusState = { ...menus };
  // Сбросим выбранные фильтры у дочерних фильтров
  resetChildMenuFilters(menuId, newMenusState, dependencies);
  // Установим выбранные фильтры для измененного меню
  newMenusState[menuId]['filtersSelected'] = filtersSelected;
  return { ...catalogSidebarState, menus: newMenusState };

  function resetChildMenuFilters(parentMenuId, menus, dependencies) {
    if (dependencies[parentMenuId]['childMenus']) {
      const childMenuIds = Object.keys(dependencies[parentMenuId]['childMenus']);
      childMenuIds.forEach(menuId => {
        menus[menuId]['filtersSelected'] = {};
        resetChildMenuFilters(menuId, menus, dependencies);
      });
    }
  }
}

export function calcShowItems(menus, dependencies, order) {
  let newMenus = { ...menus };
  order.forEach(menuId => {
    if (!!dependencies[menuId]['parentMenus']) {
      const parentId = Object.keys(dependencies[menuId]['parentMenus'])[0];
      const filtersSelectedIds = Object.keys(menus[parentId]['filtersSelected']);
      if (filtersSelectedIds.length === 1
        && menus[parentId]['filtersSelected'][filtersSelectedIds[0]] === 'selected') {
        let filters = newMenus[menuId]['filters'];
        const parentSelectedFilter = filtersSelectedIds[0];
        Object.keys(filters).forEach(filterId => {
          if (!filters[filterId]['dependentOn'][parentSelectedFilter]) {
            delete filters[filterId];
          }
        });
      } else {
        newMenus[menuId]['filters'] = {};
      }
    }
  });
  return newMenus;
}
