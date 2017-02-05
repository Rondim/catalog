import React, { Component } from 'react';
import { base } from '../consts';

import ProductListItem from './ProductListItem';


class ItemList extends Component {
  renderList() {
    //const items = [1, 2, 3, 4, 5, 6, 7, 8]; //Тут должен быть массив с изделиями
      const items = base.main;
      return Object.keys(items).map(key => <ProductListItem id={key} key={key}/>);
  }
  render() {
    return (
      <div className="product_list_container" >
        <ul className="row product_list">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default ItemList;
