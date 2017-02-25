import React, { Component } from 'react';



import ProductListItem from './ProductListItem';


class ItemList extends Component {
    constructor (props){
        super(props);
    }
  renderList() {
        let items = this.props.items;
      return Object.keys(items).map(item =>
          <ProductListItem key={item} url={items[item].url}/>
      );
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