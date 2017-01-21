import React, { Component } from 'react';

const ProductListItem = (props) => {
  return (
    <li className="col-xs-3 product_item">
        <a href="#" className="thumbnail">
          <img src="http://lorempixel.com/200/200/" />
        </a>
    </li>
  );
};

export default ProductListItem;
