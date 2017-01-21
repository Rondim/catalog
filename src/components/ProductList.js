import React, { Component } from 'react';

import ProductListItem from './ProductListItem';


class ItemList extends Component {
  renderList() {
    const items = [1,2,3,4,5,6,7,8]; //Тут должен быть массив с изделиями
    return items.map(item => <ProductListItem key={item}/>);
  }
  render() {
    return (
      <div className="item_list" >
        <ul className="row product_list">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default ItemList;
