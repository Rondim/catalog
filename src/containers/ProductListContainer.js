import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';



import ProductListItem from '../components/productList/ProductListItem';

/**
 * Отрисовывает Лист продуктов через параметры принимает функцию, которая делает item активным
 * и обект объектов продуктов(items)
 * @memberof app.components
 */
class ProductList extends Component {
    constructor (props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            page:1
        }
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
    handleKeyDown(e){
        if(e.keyCode === 39){
            this.handleChangePage(true);
        }
        else if(e.keyCode === 37){
            this.handleChangePage(false);
        }
    }
    handleChangePage(forward){
        const max = Object.keys(this.props.items).length/8;
        this.setState((prevState) => {
            if(forward) {
                if(prevState.page<max) return {page: prevState.page + 1};
            }
            else if(prevState.page>1) return {page: prevState.page - 1};
            return {page: prevState.page}
        });
    }
    /**
     * Renders the component List.
     *
     * @memberof app.components.ProductList.render
     * @return {string} - HTML markup for the component List
     */
    renderPages(){
        const itemsCount = Object.keys(this.props.items).length;
        let pages = [];
        for(let i=0;i<itemsCount/8;i++){
            pages.push(i+1);
        }
        return pages.map(n =>{
            return(
                <Button active={this.state.page==n} key={n} onClick={()=>{this.setState({page:n})}} className="btn">{n}</Button>
            )
        });
    }
  renderList() {
        let items = this.props.items;
        let i = 0;
        const page = this.state.page;
      return Object.keys(items).map(item => {
          i++;
              if (i <= page*8 && i>(page-1)*8) {
                  return (<ProductListItem
                      id={item}
                      active={items[item].active}
                      complited={items[item].complited}
                      key={item}
                      url={items[item].url}
                      handleSelect={e => this.onSelect(e)}
                  />)
              }

          }
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
      <div className="product_list_container" tabIndex="1" onKeyDown={this.handleKeyDown}>
          <div className="text-center">
              <Button onClick={()=>this.handleChangePage(false)}>{"<"} </Button>
              <Button onClick={()=>this.handleChangePage(true)}> > </Button>
          </div>
        <ul className="row product_list">
          {this.renderList()}
        </ul>
          <ButtonGroup>
              {this.renderPages()}
          </ButtonGroup>
      </div>
    );
  }
}


export default ProductList;