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
const elem=<Welcome name='Nombre' />;

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

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      textvalue: 'Please write an essay about React',
      selectvalue: 'grapefruit',
    };
    // eslint-disable-next-line
    this.fileresponse='None';

    this.handlefile=this.handlefile.bind(this);
    this.handleselectchange = this.handleselectchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handletextchange = this.handletextchange.bind(this);
  }

  handleselectchange(event){
    this.setState({selectvalue: event.target.value});
  }

  handletextchange(event){
    this.setState({textvalue: event.target.value});
  }

  handleChange(event){
    if(this.state.value===''){
      this.setState({value: event.target.value.toUpperCase()});
    }else{
      this.setState({value: event.target.value});
    }
  }

  handlefile(event){
    if(event.target.value !== ''){
      this.fileresponse = this.fileInput.files[0].name;
    }else{
      this.fileresponse = 'None';
    }
  }

  handleSubmit(event){
    alert(
      'A name was submitted: ' + this.state.value + 
      '\nFlavor selected: ' + this.state.selectvalue +
      '\nTextarea: ' + this.state.textvalue + 
      `\nSelected file: ${this.fileresponse}`
    );
    event.preventDefault();
  }
    
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>
          Name:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        </p>
        <p>
          <textarea value={this.state.textvalue} onChange={this.handletextchange} />
        </p>
        <p>
          <label>
            Upload file: 
            <input type='file'
              onChange={this.handlefile}
              ref={
                input =>
                {
                  this.fileInput = input;
                }
              } 
            />
          </label>
        </p>
        <p>
          <select value={this.state.selectvalue} onChange={this.handleselectchange} >
            <option value='coconut' >Coconut</option>
            <option value='grapefruit' >Grapefruit</option>
            <option value='mango' >Mango</option>
            <option value='lime' >Lime</option>
          </select>
        </p>
        <div>
          <Reserve />
        </div>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

class Reserve extends Component{
  constructor(props){
    super(props);

    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handlereserve=this.handlereserve.bind(this);
  }

  handlereserve(event){
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }
  
  render(){
    return(
      <div>
        <label>
          Is going:
          <input 
            name='isGoing'
            type='checkbox'
            checked={this.state.isGoing}
            onChange={this.handlereserve}
          />
        </label>
        <br />
        <label>
          <input 
            name='numberOfGuests'
            type='number'
            value={this.state.numberOfGuests}
            onChange={this.handlereserve}
          />
        </label>
      </div>
    );
  }
}

class BoilingVerdict extends Component{
  render(){
    if(this.props.celsius >= 100){
      return (<p>The water would boil.</p>);
    }else{
      return (<p>The water would not boil.</p>);
    }
  }
}

const scaleNames={
  c:'Celsius',
  f:'Farenheit'
}
function toCelsius(farenheit) {
  return ((farenheit - 32) * 5/9);
}
function toFarenheit(celsius){
  return ((celsius * (9/5)) + 32);
}
function tryConvert(temperature,convert){
  const input=parseFloat(temperature);
  if(Number.isNaN(input)){
    return '';
  }else{
    const output=convert(input);
    const rounded=Math.round(output*1000)/1000;
    return rounded.toString();
  }
}
class TemperatureInput extends Component {
  constructor(props){
    super(props);

    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render(){
    return(
      <fieldset>
        <legend>Enter temperature in {scaleNames[this.props.scale]}: </legend>
        <input 
          value={this.props.temperature}
          onChange={this.handleChange}   
        />
      </fieldset>
    );
  }
}

class Calculator extends Component{
  constructor(props){
    super(props);

    this.state = {
      temperature: '',
      scale: 'c'
    };

    this.handleCelsiuschange = this.handleCelsiuschange.bind(this);
    this.handleFarenheitchange = this.handleFarenheitchange.bind(this);
  }

  handleCelsiuschange(temperature){
    this.setState({scale: 'c', temperature})
  }
  handleFarenheitchange(temperature){
    this.setState({scale: 'f', temperature})
  }

  render(){
    const celsius= this.state.scale==='f' ? 
      tryConvert(this.state.temperature, toCelsius) :
      this.state.temperature
    ;
    const farenheit= this.state.scale==='c' ?
      tryConvert(this.state.temperature, toFarenheit) :
      this.state.temperature
    ;

    return(
      <div>
        <TemperatureInput
          scale='c'  
          temperature={celsius}
          onTemperatureChange={this.handleCelsiuschange}
        />
        <TemperatureInput 
          scale='f' 
          temperature={farenheit}
          onTemperatureChange={this.handleFarenheitchange}
        />
        <BoilingVerdict 
          celsius={parseFloat(celsius)}
        />
      </div>
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
        {elem} 
        <Toggle />
        <LoginControl />
        <Page />
        <List numbers={numbers}/>
        <Form />        
        <Calculator />
      </div>
    );
  }
}

export default App;
