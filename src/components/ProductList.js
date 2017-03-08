import React, { Component } from 'react';



import ProductListItem from './ProductListItem';

/**
 * Отрисовывает Лист продуктов через параметры принимает функцию, которая делает item активным
 * и обект объектов продуктов(items)
 * @memberof app.components
 */
class ProductList extends Component {
    constructor (props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    /**
     * Передает состояние активности из ProductListItem родителю
     * @memberof app.components.ProductList
     * @param e - event полученный из ProductListItem
     */
    onSelect(e){
        e.preventDefault();
        this.props.setActive(e.target.id);
    }
    /**
     * Renders the component List.
     *
     * @memberof app.components.ProductList.render
     * @return {string} - HTML markup for the component List
     */
  renderList() {
        let items = this.props.items;
      return Object.keys(items).map(item =>
          <ProductListItem
              id={item}
              active={items[item].active}
              complited={items[item].complited}
              key={item}
              url={items[item].url}
              handleSelect={e=>this.onSelect(e)}
          />
      );
  }
    /**
     * Renders the component.
     *
     * @memberof app.components.ProductList
     * @return {string} - HTML markup for the component
     */
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