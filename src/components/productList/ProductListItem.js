import React, { Component } from 'react';

class ProductListItem extends Component {
  constructor(props) {
    super(props);
  }
  renderInstance(instance) {
    return Object.keys(instance).map(key => {
      return (
        <td key={key}>{instance[key]}</td>
      );
    });
  }
  renderInstances(instances) {
    let i=0;
    return instances.map(instance => {
      i++;
      return (
        <tr key={i}>{this.renderInstance(instance)}</tr>
      );
    });
  }
  render() {
    let active;
    let complited;
    active = this.props.active ? 'active' : '';
    complited = this.props.complited ? 'complited' : '';
    active = !this.props.active && !this.props.complited ? 'bad' : active;
    return (
      <li className={`col-xs-3 product_item ${complited} ${active}`}>
        <a id="instanse" href="#" onClick={this.props.handleSelect} className="thumbnail vis">
          <img src={this.props.img} id={this.props.id} className="img-responsive img-rounded"/>
          <span>
          <table style={{ marginBottom: '0px' }}
                 className="table table-hover table-condensed table-bordered">
            <tbody>
            {this.renderInstances(this.props.instances)}
            </tbody>
          </table>
        </span>
        </a>
      </li>
    );
  }
}

export default ProductListItem;
