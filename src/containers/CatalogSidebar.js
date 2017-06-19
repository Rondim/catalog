import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import * as actions from '../actions';

class CatalogSideBar extends Component {
  constructor(props) {
    super(props);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
  }
  handleMenuSelect(menuChanged) {
    const newCatalogSidebarState = calcCatalogSidebarState(menuChanged, this.props.catalogSidebar);
    setCatalogSidebarState(newCatalogSidebarState);
  }
  render() {
    return (
      <div className="catalog_sidebar">
        <Sidebar {...this.props.catalogSidebar } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { catalogSidebar: state.catalog.sidebar };
}
export default connect(mapStateToProps, actions)(CatalogSideBar);

function calcCatalogSidebarState({ menuId, filtersSelected }, catalogSidebarState) {
  let { menus, dependencies } = catalogSidebarState;
  //Скопируем состояние
  let newMenusState = {...menus};
  //Сбросим выбранные фильтры у дочерних фильтров
  resetChildMenuFilters(menuId, newMenusState, dependencies);
  //Установим выбранные фильтры для измененного меню
  newMenusState = {...newMenusState, [menuId]: filtersSelected };

  return {...catalogSidebarState, menus: newMenusState };

  function resetChildMenuFilters(parentMenuId, menus, dependencies) {
    if (dependencies[parentMenuId]['childMenus']) {
      const childMenuIds = Object.keys(dependencies[parentMenuId]['childMenus']);
      childMenusIds.forEach(menuId => {
        menus[menuId]['filtersSelected'] = {};
        resetChildMenuFilters(menuId, menus, dependencies);
      });
    }
  }
}
