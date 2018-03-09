import React, { Component } from 'react';

require('./../../css/components/Square/square.css');

class Square extends Component {
  
  render() {
    return (
      <button onClick={this.props.onClick} className="square">
        {this.props.value}
      </button>
    );
  }
}

export default Square;