import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


export default class SidebarPopup extends Component {


  renderButtons() {
    const { subfilters, filterName, onMouseEnter, onMouseLeave, onMouseClick } = this.props;
    let buttonsArr = [];
    Object.keys(subfilters).forEach(key => {
      const isSelected = subfilters[key]['isSelected'];
      const isShow = subfilters[key]['isShow'];
      isShow && buttonsArr.push(<Button
        name={filterName}
        onClick={(e) => onMouseClick(e.target.name, e.target.id, isSelected)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={key}
        key={key}
        bsStyle={isSelected ? "primary" : "default"}
        className="subfilter">
        {subfilters[key]['name']}
      </Button>);
    });
    return buttonsArr;
  }
  render() {
    const { isActive } = this.props;
    return (
      <div
        role="group"
        className="btn-group-vertical btn-group-sm negativeMargin">
        {isActive && this.renderButtons()}
      </div>
    );
  }
}
