import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


export default class SidebarPopup extends Component {


  renderButtons() {
    const { subFilters, filterName, onMouseEnter, onMouseLeave, onMouseClick } = this.props;
    return Object.keys(subFilters).map(key => {
      return <Button
        name={filterName}
        onClick={(e) => onMouseClick(e.target.name, e.target.id)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={key}
        key={key}
        bsStyle={subFilters[key]['isSelected'] ? "primary" : "default"}>
        {subFilters[key]['name']}
      </Button>;
    });
  }
  render() {
    const { isActive } = this.props;
    return (
      <div
        role="group"
        className="btn-group-vertical btn-group-lg negativeMargin">
        {isActive && this.renderButtons()}
      </div>
    );
  }
}


//<div role="group" className="btn-group-vertical btn-group-lg negativeMargin"></div>
//className="btn-group-vertical btn-group-lg sidebar_button_group" role="group"
