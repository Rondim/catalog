import React, { Component } from 'react';
import Nav from '../containers/Nav';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  } 
}

export default App;
