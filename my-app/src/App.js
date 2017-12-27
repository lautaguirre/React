import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Welcome extends Component{
  render(){
    return <h3>Hola, {this.props.name}</h3>
  }
}

const elem=<Welcome name='Joan' />;

class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
      <h1>{this.state.date.toLocaleTimeString()}</h1>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Clock />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {elem}
        </p>
      </div>
    );
  }
}

export default App;
