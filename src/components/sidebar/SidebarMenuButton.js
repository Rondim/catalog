import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
  const { filtersSelected, menuName, filters, isActive,
    handleMouseEnter, handleMouseLeave } = props;
  return <Button
    className={getMenuButtonClass(isActive, filtersSelected)}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
    { getMenuButtonText(filtersSelected, filters, menuName) }
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

function getMenuButtonClass(isActive, filtersSelected) {
  let menuButtonClass = '';
  if (!isActive) {
    menuButtonClass= 'sidebar-menu-button-disabled';
  } else if (filtersSelected.length > 0) {
    menuButtonClass = 'sidebar-menu-button-selected';
  }

  return menuButtonClass;
}
