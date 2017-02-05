import React, { Component } from 'react';
import { base } from '../consts';
import { Button, Col, FormGroup, ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';
import {Auth,Storage} from '../firebase/api';

class ManagerSideBar extends Component {
  constructor (props){
    super(props);
    this.state = { 
      isActivePopup:'',
      selectedFilter: {
          department: {},
          manufacturer: {}
      },
        itemsRef:{}
    };
    this.handleFilterEnter = this.handleFilterEnter.bind(this);
    this.handleFilterLeave = this.handleFilterLeave.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }
  componentWillMount(){
      const login = "lueurxax@gmail";//сюда вставить почту из firebase api
      const pass = "Ropejump2010";//сюда вставить пароль из firebase api
      Auth(login,pass);
      this.setState({itemsRef: Storage()});
  }
  handleFilterEnter(e){
    const filterName = e.target.name;
    //Дальше напишем работу со state
      this.setState({isActivePopup: filterName});
  }
    handleFilterLeave(){
        //const filterName = e.target.name;
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
  }
  renderButtons(filterName){
      const filterItems = base.filters[filterName];
      return Object.keys(filterItems).map((key)=> {
          const item = filterItems[key].name;
          return (<Button
              onClick={this.handleFilterSelect}
              key={key}
              id={key}
              bsStyle={this.state.selectedFilter[filterName][key] ? "success":"primary"}
              name={filterName}
              onMouseEnter={this.handleFilterEnter}
              onMouseLeave={this.handleFilterLeave}
          >{item}</Button>)
      });
  }
  renderFilter(filterName){
    return (this.state.isActivePopup==filterName ?
          <div
              role="group"
              className="btn-group-vertical btn-group-lg negativeMargin"
              name={filterName}
              onMouseEnter={this.handleFilterEnter}
              onMouseLeave={this.handleFilterLeave}
          >
              {this.renderButtons(filterName)}
          </div>:<div role="group" className="btn-group-vertical btn-group-lg negativeMargin"> </div>
      );
  }
  handleUploadFile(e){
      const files = e.target.files;
      for (let i=0; i<files.length; i++) {
          const fileRef=this.state.itemsRef.child(files[i].name);
          fileRef.put(files[i]).then(function(snapshot) {
              fileRef.getDownloadURL().then(function(url) {
                  console.log(url);
                  //Здесь должна быть функция записи url в БД
                  //base.main["item_123123"+i]={};
                  //base.main["item_123123"+i].url=url;
              });
          });
      }
      //console.log(base);
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
            <FormControl type="file" onChange={this.handleUploadFile} multiple accept="image/*,image/jpeg" />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default ManagerSideBar;
