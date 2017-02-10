import { SET_INITIAL_STATE, SUBFILTER_SELECT, FILTER_ENTER, FILTER_LEAVE } from '../actions/';

const initialSidebarState = {
  filters: {},
  activeFilter: ''
};


const sidebarReducer = (state=initialSidebarState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      const filters = initializeProps(action.payload);
      return {...state, filters};
    case SUBFILTER_SELECT:
      let newState = {...state};
      handleFilterSelect(newState['filters'], action.filter, action.subfilter, action.prevSelected);
      return newState;
    case FILTER_ENTER:
      return {...state, activeFilter: action.filterName };
    case FILTER_LEAVE:
      return {...state, activeFilter: '' };
    default:
      return state;
  }
}

export default sidebarReducer;


function initializeProps(filtersFromBD) {
  Object.keys(filtersFromBD).forEach(filter => {
    //Ставим какие менюхи должны быть активными на старте
    const relations = filtersFromBD[filter]['relations'];
    const isActive = !relations || !relations['dependentOn']; //Если не от кого не зависишь, то ты активен)))
    filtersFromBD[filter]['isActive'] = isActive;
    //Ставим, что вначале ничего не выбрано и показывать можно только активные подфильтры
    Object.keys(filtersFromBD[filter]['subfilters']).forEach(subfilter => {
      filtersFromBD[filter]['subfilters'][subfilter]['isSelected'] = false;
      filtersFromBD[filter]['subfilters'][subfilter]['isShow'] = isActive ? true : false;
    });
  });

  return filtersFromBD;
}

function handleFilterSelect(newFiltersState, filter, subfilter, prevSelected) {
  const relations = newFiltersState[filter]['relations'];
  //Если независимая менюха, то просто меняем значение выбранного на обратное
  if (!relations || !relations['dependent']) {
    newFiltersState[filter]['subfilters'][subfilter]['isSelected'] = !prevSelected;
  } else {
    const parentSubfilters = newFiltersState[filter]['subfilters'];
    const depFilter = newFiltersState[relations.dependent];
    const depSubfilters = depFilter['subfilters'];
    //Возвращаем в начальное состояние фильтр, на который кликнули
    Object.keys(parentSubfilters).forEach(subfilter => {
      parentSubfilters[subfilter]['isSelected'] = false;
    })
    //Возвращаем в начальное состояние зависимый фильтр
    depFilter['isActive'] = false;
    Object.keys(depSubfilters).forEach(dependentSubfilterName => {
      const depSubfilter = depSubfilters[dependentSubfilterName];
      depSubfilter['isSelected'] = false;
      depSubfilter['isShow'] = false;
    });
    //А если действие было выбирающее subfilter, то надо показать нужные зависимые подфильтры
    if (!prevSelected) {
      parentSubfilters[subfilter]['isSelected'] = true;
      depFilter['isActive'] = true;
      Object.keys(depSubfilters).forEach(dependentSubfilterName => {
        const depSubfilter = depSubfilters[dependentSubfilterName];
        depSubfilter['isShow'] = (depSubfilter['relatedTo'] === subfilter);
      });
    }
  }
}
