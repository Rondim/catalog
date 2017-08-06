import React from 'react';
import PropTypes from 'prop-types';

const ProductListItem = (props) => {
  let active;
  let complited;
  active = props.active ? 'active' : '';
  complited = props.complited ? 'complited' : '';
  active = !props.active && !props.complited ? 'bad' : active;
  return (
    <li className={`col-xs-3 product_item ${complited} ${active}`}>
      <a href="#" onClick={props.handleSelect} className="thumbnail">
        <img src={props.img.url} id={props.id} className="img-responsive img-rounded" />
      </a>
    </li>
  );
};
ProductListItem.propTypes = {
  active: PropTypes.bool,
  complited: PropTypes.bool,
  img: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  handleSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default ProductListItem;
