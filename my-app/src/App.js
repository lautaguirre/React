import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Welcome component
class Welcome extends Component{
  render(){
    return <h3>Hola {this.props.name}!</h3>
  }
}

//JSX var
const elem=<Welcome name='Juan' />;

//Date comp
class Formatteddate extends Component{
  render(){
    return(
      <h4>{this.props.date.toString()}</h4>
    );
  }
}

//Toggle comp
class Toggle extends Component{
  constructor(props){
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render(){
    return(
      //To pass a parameter to the event handler {this.deleteRow.bind(this, param)}
      <button onClick = {this.handleClick}>
        {this.state.isToggleOn ? 'ON':'OFF'}
      </button>
    );
  }

}

//Clock component
class Clock extends Component{
  constructor(props){ //Init component elements
    super(props);
    this.state = {date: new Date()}; //Init date state
  }

  //When component rendered
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), //Arrow function to define parameters
      1000
    );
  }

  //When component is removed
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  //Update date state
  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
      <div>
        <h1>{this.state.date.toLocaleTimeString()}</h1>
        <Formatteddate date={this.state.date} />
      </div>
    );
  }
}

//Conditional rendering
class UserGreeting extends Component {
  render(){
    return <h1>Welcome back!</h1>;
  }
}

class GuestGreeting extends Component {
  render(){
    return <h1>Please sign up.</h1>;
  }
}

class Greeting extends Component{
  render(){
    if(this.props.isLoggedIn){
      return <UserGreeting />;
    }else{
      return <GuestGreeting />;
    }
  }
}

class LoginButton extends Component {

  render(){
    return(
      <button onClick = {this.props.onClick}>
        Login
      </button>
    );
  }

} 

class LogoutButton extends Component {

  render(){
    return(
      <button onClick = {this.props.onClick}>
        Logout
      </button>
    );
  }

}

class LoginControl extends Component {
  constructor(props){
    super(props);
    
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick(){
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick(){
    this.setState({isLoggedIn: false});
  }

  render(){
    let button = null;

    if(this.state.isLoggedIn){
      button = <LogoutButton onClick = {this.handleLogoutClick} />;
    }else{
      button = <LoginButton onClick = {this.handleLoginClick} />;
    }
    
    return(
      <div>
        <Greeting isLoggedIn = {this.state.isLoggedIn} />
        {button}
      </div>
    );
  }
}

//Prevent comp from rendering 
class Warning extends Component {
  render(){
    if(!this.props.warn){
      return null;
    }else{
      return (
        <div className='warning'>
          <h4>Warning!</h4>
        </div>
      );
    }
  }
}

class Page extends Component {
  constructor(props){
    super(props);
    this.state = {showWarning : true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick(){
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render(){
    return (
      <div>
        <Warning warn = {this.state.showWarning} />
        <button onClick = {this.handleToggleClick}>
          {this.state.showWarning ? 'Desactivar':'Activar'}
        </button>
      </div>
    );
  }
}

//Lists and keys
class List extends Component {

  render(){
    //This const could be inline at return
    const listItems = this.props.numbers.map((number) => //Copy and modify each array element
      <li key = {number.toString()}> 
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

}
const numbers = [1,2,3,4,5];

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
        {elem} 
        <Toggle />
        <LoginControl />
        <Page />
        <List numbers={numbers}/>
      </div>
    );
  }
}

export default App;
