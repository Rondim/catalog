import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadItems} from '../actions/';


import ProductListItem from './ProductListItem';


class ItemList extends Component {
    constructor (props){
        super(props);
    }
    componentWillMount(){
        this.props.loadItems();
    }
  renderList() {
        let items = this.props.ProductList.items;
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

function mapStateToProps(state) {
    return { ProductList: state.ProductList };
}

export default connect(mapStateToProps, {loadItems})(ItemList);