import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
  const { filtersSelected, menuName, filters, isActive,
    handleMouseEnter, handleMouseLeave } = props;
  const menuButtonClass = isActive ? getMenuButtonClass(filtersSelected)
    : 'sidebar-menu-button-disabled';
  const menuButtonText = isActive ? getMenuButtonText(filtersSelected, filters, menuName)
    : menuName;
  return <Button
    className={`sidebar-menu-button ${menuButtonClass}`}
    onMouseEnter={isActive && handleMouseEnter}
    onMouseLeave={isActive && handleMouseLeave}>
    {menuButtonText}
  </Button>
};


function getMenuButtonText(filtersSelected, filters, menuName) {
  let menuButtonText;

  if (filtersSelected.length === 0) {
    menuButtonText = menuName;
  } else {
    let namesArr = [];
    //Заполняем массив имен именами выбранных фильтров
    filtersSelected.forEach(filterId => {
      const filterName = filters.filter(filter => {
        return filter.filterId === filterId;
      })[0]['name'];
      namesArr.push(filterName);
    });
    //Формируем текст кнопки из массива в завимости от длины массива
    if (namesArr.length === 1) {
      menuButtonText = namesArr[0]
    } else if (namesArr.length > 1) {
      menuButtonText = namesArr.map(filterName => filterName.substr(0,4)).join(', ');
    }
  }

  return menuButtonText.substr(0, 20);
}

function getMenuButtonClass(filtersSelected) {
  let menuButtonClass = '';
  if (filtersSelected.length > 0) {
    menuButtonClass = 'sidebar-menu-button-selected';
  }

  return menuButtonClass;
}
