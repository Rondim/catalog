import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarPopup from './SidebarPopup';
import SidebarMenuItem from './SidebarMenuItem';
import { FILTER_NAMES } from '../sidebarConsts';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { setInitialState, subFilterSelect, filterEnter, filterLeave,newItem  }  from '../actions/';

class ManagerSideBar extends Component {
  constructor (props){
    super(props);
    this.onFilterEnter = this.onFilterEnter.bind(this);
    this.onFilterLeave = this.onFilterLeave.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
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
  handleUploadFile(e){
      const files = e.target.files;
      for (let i=0, filesLength = files.length; i<filesLength; i++) {
          this.props.newItem(files[i]);
      }
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
          <form className="text-center">
            <FormGroup controlId="formControlsFile" className="btn-group-vertical btn-group-lg file_upload">
              <Button>Добавить</Button>
              <FormControl type="file" onChange={this.handleUploadFile} multiple accept="image/*,image/jpeg" />
            </FormGroup>
          </form>
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
  filterLeave,
    newItem })(ManagerSideBar);
