import React from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

export default (props) => {
  const { text, selection, active, blocked,
    handleMouseEnter, handleMouseLeave } = props;
  return <Button
    className={`sidebar-menu-button ${active ? getClass(selection) : 'sidebar-menu-button-disabled' }`}
    onMouseEnter={active && handleMouseEnter}
    onMouseLeave={active && handleMouseLeave}>
    {text} <Glyphicon glyph="lock" />
  </Button>
};

function getClass(selection) {
  switch (selection) {
    case 'selected':
      return 'sidebar-menu-button-selected';
      break;
    case 'selectedNotByAll':
      return 'sidebar-menu-button-selectedNotByAll';
      break;
    default:
      return '';
  };
}
