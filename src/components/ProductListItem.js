import React, { Component } from 'react';

const ProductListItem = (props) => {
    status = props.status ? 'active' : 'bad';
  return (
    <li className={`col-xs-3 product_item ${status}`}>
        <a href="#" onClick={props.handleSelect} className="thumbnail">
          <img src={props.url} id={props.id} />
        </a>
    </li>
  );
};

export default ProductListItem;
