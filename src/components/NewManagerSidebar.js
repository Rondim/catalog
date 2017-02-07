import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarPopup from './SidebarPopup';
import SidebarMenuItem from './SidebarMenuItem';
import { DEPARTMENT } from '../sidebarConsts';
import { setFilters, subFilterSelect, filterEnter, filterLeave  }  from '../actions/';



class ManagerSideBar extends Component {
  constructor (props){
    super(props);
    this.onFilterEnter = this.onFilterEnter.bind(this);
    this.onFilterLeave = this.onFilterLeave.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }
  componentWillMount(){
      this.props.setFilters();
  }
  onFilterEnter(e) {
    const filterName = e.target.name;
    this.props.filterEnter(filterName);
  }
  onFilterLeave() {
    this.props.filterLeave();
  }
  onFilterSelect(filter, subFilter) {
    this.props.subFilterSelect(filter, subFilter);
  }
  render() {
    const callbacks = {
      onMouseEnter: this.onFilterEnter,
      onMouseLeave: this.onFilterLeave,
      onMouseClick: this.onFilterSelect
    };
    const { filters, activeFilter } = this.props.sidebar;
    return (
      <div className="manager_sidebar text-center">
          <SidebarMenuItem
            {...callbacks}
            filterName={DEPARTMENT}
            activeFilter={activeFilter}
            subFilters={filters && filters[DEPARTMENT]} />
      </div>
    );
  }
}

function mapStateToProps({ sidebar }) {
  return { sidebar };
}
export default connect(mapStateToProps, { setFilters, subFilterSelect, filterEnter, filterLeave })(ManagerSideBar);
