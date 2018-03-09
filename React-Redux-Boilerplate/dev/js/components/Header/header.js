import React, { Component } from 'react';

require('./header.scss');

class Header extends Component{
    render(){
        return(
            <div className="App-header">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' className="App-logo" alt="Logo" />
                <h1 className="App-title">Welcome to React</h1>
            </div>
        );
    }
}

export default Header;