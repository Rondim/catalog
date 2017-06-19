function calcSelectedFilters(prevSelection, filters, filterClicked, multiselection) {
  let selection;
  //validate there is filterClicked in filters
  if (!filters.some(filterObj => filterObj.filterId === filterClicked.filterId)) {
    throw new Error('фильтр на который кликнули не содержится в фильтрах этого меню');
  }
  //calculate newSelection based multiselection and sidebar mode(viewer or setter)
  if (multiselection === false) {
    selection = [{ filterId: filterClicked.filterId, selection: 'selected' }];
  } else {
    // prevSelection.forEach(filtersSelected)
    // selection = prevSelection.map(filtersSelected => {
    //   if (filtersSelected.filterId === filterClicked.filterId
    // });
  }
  return selection;
}

export { calcSelectedFilters };
