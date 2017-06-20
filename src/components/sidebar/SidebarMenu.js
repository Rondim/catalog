import React, { Component } from 'react';
import SidebarMenuButton from './SidebarMenuButton';
import SidebarMenuPopup from './SidebarMenuPopup';


export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isPopupShow: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }
  handleMouseEnter() {
    this.setState({ isPopupShow: true });
  }
  handleMouseLeave() {
    this.setState({ isPopupShow: false });
  }
  handleFilterClick(filterId) {
    const { filtersSelected, multiselection, handleMenuSelect, menuId } = this.props;
    const newFiltersSelected = getFiltersSelected(filtersSelected, filterId, multiselection);
    handleMenuSelect({ menuId, filtersSelected: newFiltersSelected });
  }
  render() {
    const { filters, filtersOrder, filtersSelected, menuName,
      blocked, handleMenuSelect } = this.props;
    const active = Object.keys(filters).length > 0;
    const text = getText(filtersOrder, filters, filtersSelected, menuName);
    const selection = getSelection(filtersSelected);
    const props = { ...this.props, text, selection, active,
      handleFilterClick: this.handleFilterClick,
      handleMouseEnter: this.handleMouseEnter,
      handleMouseLeave: this.handleMouseLeave };
    return (<div
      className="btn-group-vertical btn-group-lg sidebar-menu"
      role="group">
      <SidebarMenuButton {...props}/>
      {this.state.isPopupShow && <SidebarMenuPopup {...props}/>}
    </div>);
  }
}

function getText(filtersOrder, filters, filtersSelected, menuName) {
  const filterIds = Object.keys(filtersSelected);
  let menuButtonText;

  if (filterIds.length === 0) {
    menuButtonText = menuName;
  } else {
    let namesArr = [];
    // Заполняем массив имен именами выбранных фильтров
    filtersOrder.forEach(filterId => {
      if (filtersSelected[filterId]) {
        namesArr.push(filters[filterId]['filterName']);
      }
    });
    // Формируем текст кнопки из массива в завимости от длины массива
    if (namesArr.length === 0) {
      menuButtonText = menuName;
    } else if (namesArr.length === 1) {
      menuButtonText = namesArr[0];
    } else if (namesArr.length > 1) {
      menuButtonText = namesArr.map(filterName => filterName.substr(0, 4)).join(', ');
    }
  }
  return menuButtonText.substr(0, 20);
}

function getSelection(filtersSelected) {
  const filterIds = Object.keys(filtersSelected);
  const hasSelected = filterIds.some(filterId => filtersSelected[filterId] === 'selected');
  const hasSelectedNotByAll = filterIds.some(filterId => filtersSelected[filterId] === 'selectedNotByAll' );
  if (hasSelectedNotByAll) {
    return 'selectedNotByAll';
  } else if (hasSelected) {
    return 'selected';
  } else {
    return 'notSelected';
  }
}

function getFiltersSelected(filtersSelected, filterId, multiselection) {
  let newFiltersSelected = { ...filtersSelected };
  if (multiselection) {
    if (filtersSelected[filterId] === 'selected') {
      delete newFiltersSelected[filterId];
    } else {
      newFiltersSelected[filterId] = 'selected';
    }
  } else {
    if (filtersSelected[filterId] === 'selected' && Object.keys(filtersSelected).length === 1) {
      newFiltersSelected = {};
    } else {
      newFiltersSelected = { [filterId]: 'selected' };
    }
  }
  return newFiltersSelected;
}
