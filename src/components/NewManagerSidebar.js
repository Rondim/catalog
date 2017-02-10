import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarPopup from './SidebarPopup';
import SidebarMenuItem from './SidebarMenuItem';
import { FILTER_NAMES } from '../sidebarConsts';
import { setInitialState, subFilterSelect, filterEnter, filterLeave  }  from '../actions/';

class ManagerSideBar extends Component {
  constructor (props){
    super(props);
    this.onFilterEnter = this.onFilterEnter.bind(this);
    this.onFilterLeave = this.onFilterLeave.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }
  componentWillMount(){
      this.props.setInitialState();
  }
  componentWillUpdate() {
    // console.log(this.props.sidebar);
  }
  onFilterEnter(e) {
    const filterName = e.target.name;
    this.props.filterEnter(filterName);
  }
  onFilterLeave() {
    this.props.filterLeave();
  }
  onFilterSelect(filter, subfilter, prevSelected) {
    this.props.subFilterSelect(filter, subfilter, prevSelected);
  }
  renderSidebarMenuItems(filterNames) {
    const { sidebar: { filters, activeFilter } } = this.props;
    const callbacks = {
      onMouseEnter: this.onFilterEnter,
      onMouseLeave: this.onFilterLeave,
      onMouseClick: this.onFilterSelect
    };
    return filterNames.map(filterName => {
      return <SidebarMenuItem
        {...callbacks}
        key={filterName}
        isActive={filters[filterName] && filters[filterName]['isActive']}
        filterName={filterName}
        activeFilter={activeFilter}
        subfilters={filters[filterName] && filters[filterName]['subfilters']} />
    })
  }
  render() {
    return (
      <div className="manager_sidebar text-center">
          {this.renderSidebarMenuItems(FILTER_NAMES)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { sidebar: state.sidebar };
}
export default connect(mapStateToProps, {
  setInitialState,
  subFilterSelect,
  filterEnter,
  filterLeave })(ManagerSideBar);
