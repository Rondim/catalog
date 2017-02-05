import React, { Component } from 'react';
import { base } from '../consts';
import { Button, Col, FormGroup, ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';

class ManagerSideBar extends Component {
  constructor (props){
    super(props);
    this.state = { 
      isActivePopup:'',
      selectedFilter: {
          department: {},
          manufacturer: {}
      }
    };
    this.handleFilterEnter = this.handleFilterEnter.bind(this);
    this.handleFilterLeave = this.handleFilterLeave.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }
  handleFilterEnter(e){
    const filterName = e.target.name;
    //Дальше напишем работу со state
    
    this.setState({isActivePopup: filterName});
  }
    handleFilterLeave(e){
        const filterName = e.target.name;
        //Дальше напишем работу со state

        this.setState({isActivePopup: false});
    }
  handleFilterSelect(e){
      const id = e.target.id;
      this.setState(PrevState =>{
          let selectedFilterVal = PrevState.selectedFilter[this.state.isActivePopup];
          selectedFilterVal[id]= selectedFilterVal[id] ? false:true;
          let selectedFilter=PrevState.selectedFilter;
          selectedFilter[this.state.isActivePopup]=(selectedFilterVal);
          return{selectedFilter};
      });
      console.log(this.state.selectedFilter);
  }
  renderButtons(filterName){
      const filterItems = base.filters[filterName];
      return Object.keys(filterItems).map((key)=> {
          const item = filterItems[key].name;
          return (<Button
              name={filterName}
              onClick={this.handleFilterSelect}
              key={key}
              id={key}
              bsStyle={this.state.selectedFilter[filterName][key] ? "success":"primary"}
              onMouseEnter={this.handleFilterEnter}
              onMouseLeave={this.handleFilterLeave}
          >{item}</Button>)
      });
  }
  renderFilter(filterName){
    return (this.state.isActivePopup==filterName ?
          <Col className="btn-group-vertical btn-group-lg negativeMargin" role="group"  lg={7} md={9}>
              {this.renderButtons(filterName)}
          </Col>:<Col  lg={7} md={7} className="negativeMargin"></Col>
      );
  }
  render() {
    return (
      <div className="manager_sidebar text-center">
        <div className="btn-group-vertical btn-group-lg department_manufacturer" role="group">
          <Button name="department" onMouseEnter={this.handleFilterEnter} onMouseLeave={this.handleFilterLeave}>Отдел</Button>
          {this.renderFilter('department')}
          <Button name="manufacturer" onMouseEnter={this.handleFilterEnter} onMouseLeave={this.handleFilterLeave}>Производитель</Button>
          {this.renderFilter('manufacturer')}
        </div>
        <form className="text-center">
          <FormGroup controlId="formControlsFile" className="btn-group-vertical btn-group-lg file_upload">
            <Button>Добавить</Button>
            <FormControl type="file" multiple accept="image/*,image/jpeg" />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default ManagerSideBar;
