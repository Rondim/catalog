import React from 'react';
import PropTypes from 'prop-types';

const ProductListItem = ({ active, complited, handleSelect, img, id, disabled }) => {
  let activeClass = active && !disabled ? 'active' : '';
  let complitedClass = complited ? 'complited' : '';
  activeClass = !disabled && !active && !complited ? 'bad' : activeClass;
  return (
    <li className={`col-xs-3 product_item ${complitedClass} ${activeClass}`}>
      <a href="#" onClick={handleSelect} className="thumbnail">
        <img src={img} id={id} className="img-responsive img-rounded" />
      </a>
    </li>
  );
};
ProductListItem.propTypes = {
  active: PropTypes.bool,
  complited: PropTypes.bool,
  img: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default ProductListItem;
