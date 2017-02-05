import React, { Component } from 'react';
import { base } from '../consts';

const ProductListItem = (props) => {

  return (
    <li className="col-xs-3 product_item">
        <a href="#" className="thumbnail">
          <img src={base.main[props.id].url} />
        </a>
    </li>
  );
};

export default ProductListItem;
