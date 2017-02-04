import React, { Component } from 'react';

class ManagerSideBar extends Component {
  render() {
    return (
      <div className="manager_sidebar text-center">
            <div className="btn-group-vertical btn-group-lg department_manufacturer" role="group">
              <button type="button" className="btn btn-default">Отдел</button>
              <button type="button" className="btn btn-default">Производитель</button>
              <button type="button" className="btn btn-default">Металл</button>
            </div>
      </div>
    );
  }
}

export default ManagerSideBar;
