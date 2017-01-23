import React, { Component } from 'react';

class ManagerSideBar extends Component {
  render() {
    return (
      <div className="manager_sidebar text-center">

            <div className="btn-group-vertical btn-group-lg department_manufacturer" role="group">
              <button type="button" className="btn btn-default">Отдел</button>
              <button type="button" className="btn btn-default">Производитель</button>
            </div>
            <div className="btn-group metals" role="group">
              <div className="text-center">
                <button type="button" className="btn btn-default">Au</button>
                <button type="button" className="btn btn-default">Ag</button>
              </div>
            </div>

      </div>
    );
  }
}

export default ManagerSideBar;
