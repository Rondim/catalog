import React, { Component } from 'react';
import { base } from '../consts';
import { Button, Col, FormGroup, ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';

class ManagerSideBar extends Component {
  constructor (props){
    super(props);
    this.state = { 
      isActivePopup:{
          department: false
      }
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }
  handleFilterClick(e){
    const filterName = e.target.name;
    const filterItems = base.filters[filterName];
    //Дальше напишем работу со state
    
    this.setState((PrevState)=>{
        let isActivePopup={};
        isActivePopup[filterName]= PrevState.isActivePopup[filterName] ? false:true;
      return {isActivePopup:isActivePopup};
    });
  }
  renderButtons(filterName){
      const filterItems = base.filters[filterName];
      return Object.keys(filterItems).map((key)=> {
          const item = filterItems[key].name;
          return (<Button key={key}>{item}</Button>)
      });
  }
  renderFilter(filterName){
    return (this.state.isActivePopup[filterName] ?
          <Col className="btn-group-vertical btn-group-lg negativeMargin" role="group"  lg={7} md={9}>
              {this.renderButtons(filterName)}
          </Col>:<Col  lg={7} md={7} className="negativeMargin"></Col>
      );
  }
  render() {
    return (
      <div className="manager_sidebar text-center">
        <div className="btn-group-vertical btn-group-lg department_manufacturer" role="group">
          <Button name="department" onClick={this.handleFilterClick}>Отдел</Button>
          {this.renderFilter('department')}
          <Button name="manufacturer" onClick={this.handleFilterClick}>Производитель</Button>
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
