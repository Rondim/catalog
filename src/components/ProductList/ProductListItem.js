import React from 'react';

const ProductListItem = (props) => {
  let active;
  let complited;
  active = props.active ? 'active' : '';
  complited = props.complited ? 'complited' : '';
  active = !props.active && !props.complited ? 'bad' : active;
  return (
    <li className={`col-xs-3 product_item ${complited} ${active}`}>
      <a href="#" onClick={props.handleSelect} className="thumbnail">
        <img src={props.img} id={props.id} className="img-responsive img-rounded"/>
      </a>
    </li>
  );
};

export default ProductListItem;
