export function initializeProps(filtersFromBD) {
  Object.keys(filtersFromBD).forEach(filter => {
    // Ставим какие менюхи должны быть активными на старте
    const relations = filtersFromBD[filter]['relations'];
    const isActive = !relations || !relations['dependentOn']; // Если не от кого не зависишь, то ты активен)))
    filtersFromBD[filter]['isActive'] = isActive;
    // Ставим, что вначале ничего не выбрано и показывать можно только активные подфильтры
    Object.keys(filtersFromBD[filter]['subfilters']).forEach(subfilter => {
      filtersFromBD[filter]['subfilters'][subfilter]['isSelected'] = false;
      filtersFromBD[filter]['subfilters'][subfilter]['isShow'] = isActive ? true : false;
    });
  });

  return filtersFromBD;
}

export function handleFilterSelect(newFiltersState, filter, subfilter, prevSelected) {
  const relations = newFiltersState[filter]['relations'];
  // Если независимая менюха, то просто меняем значение выбранного на обратное
  if (!relations || !relations['dependent']) {
    newFiltersState[filter]['subfilters'][subfilter]['isSelected'] = !prevSelected;
  } else {
    const parentSubfilters = newFiltersState[filter]['subfilters'];

    // Возвращаем в начальное состояние фильтр, на который кликнули
    resetParentSubfilters(parentSubfilters);
    // и ставим новое состояние выбранного подфильтра
    parentSubfilters[subfilter]['isSelected'] = !prevSelected;
    // Возвращаем в начальное состояние все подфильтры зависимых фильтров
    resetDependentFilters(relations.dependent, newFiltersState);
    // Если действие было активировать подфильтр, то показать соответствующие
    // подфильтры в связанных фильтрах
    if (prevSelected === false) {
      showRelatedSubfilters(relations.dependent, subfilter, newFiltersState);
    }
  }


  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ handleFilterSelect
  function showRelatedSubfilters(dependentObj, parentSubfilterSelected, newFiltersState) {
    Object.keys(dependentObj).forEach(depId => {
      const depFilter = newFiltersState[dependentObj[depId]];
      const depSubfilters = depFilter['subfilters'];

      depFilter['isActive'] = true;
      Object.keys(depSubfilters).forEach(dependentSubfilterName => {
        const depSubfilter = depSubfilters[dependentSubfilterName];
        depSubfilter['isShow'] = (depSubfilter['relatedTo'] === parentSubfilterSelected);
      });
    });
  }

  function resetParentSubfilters(parentSubfilters) {
    Object.keys(parentSubfilters).forEach(subfilter => {
      parentSubfilters[subfilter]['isSelected'] = false;
    });
  }

  function resetDependentFilters(dependentObj, newFiltersState) {
    Object.keys(dependentObj).forEach(depId => {
      const depFilter = newFiltersState[dependentObj[depId]];
      const depSubfilters = depFilter['subfilters'];
      // Возвращаем в начальное состояние зависимый фильтр
      depFilter['isActive'] = false;
      Object.keys(depSubfilters).forEach(dependentSubfilterName => {
        const depSubfilter = depSubfilters[dependentSubfilterName];
        depSubfilter['isSelected'] = false;
        depSubfilter['isShow'] = false;
      });
    });
  }
}
