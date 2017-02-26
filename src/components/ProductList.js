import React, { Component } from 'react';



import ProductListItem from './ProductListItem';


class ProductList extends Component {
    constructor (props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(e){
        e.preventDefault();
        this.props.setActive(e.target.id);
    }
  renderList() {
        let items = this.props.items;
      return Object.keys(items).map(item =>
          <ProductListItem
              id={item}
              status={items[item].active}
              key={item}
              url={items[item].url}
              handleSelect={e=>this.onSelect(e)
              }/>
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


export default ProductList;