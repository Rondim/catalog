import React, { Component } from 'react';
import { base } from '../consts';

class ManagerSideBar extends Component {
  constructor (props){
        super(props);
        this.handleFilter=this.handleFilter.bind(this);
    }
    handleFilter(Filter){
        return Object.keys(base.filter[Filter]).map((key)=>{
            const item = base.filter[Filter][key].name;
            console.log(item);
        });
    }
  render() {
    return (
      <div className="manager_sidebar text-center">
            <div className="btn-group-vertical btn-group-lg department_manufacturer" role="group">
              <button type="button" name="department" onFocus={e=>this.handleFilter(e.target.name)} className="btn btn-default">Отдел</button>
              <button type="button" className="btn btn-default">Производитель</button>
              <button type="button" className="btn btn-default">Металл</button>
            </div>
      </div>
    );
  }
}

export default ManagerSideBar;
