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
      isGoing: true,
      numberOfGuests: 2
    };
    // eslint-disable-next-line
    this.fileresponse='None';
    
    this.handleChange=this.handleChange.bind(this);
    this.handlefile=this.handlefile.bind(this);
    this.handleselectchange = this.handleselectchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handletextchange = this.handletextchange.bind(this);
    this.handleinputref = this.handleinputref.bind(this);
    this.handlereserve=this.handlereserve.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handletextchange(event){
    this.setState({textvalue: event.target.value});
  }

  handleinputref(input){
    this.fileInput = input;
  }

  handlefile(event){
    if(event.target.value !== ''){
      this.fileresponse = this.fileInput.files[0].name;
    }else{
      this.fileresponse = 'None';
    }
  }

  handleselectchange(event){
    this.setState({selectvalue: event.target.value});
  }

  handlereserve(event){
    const reservevalue = event.target.type === 'checkbox' ?
      event.target.checked : 
      event.target.value
    ;
    const reservename = event.target.name;

    this.setState({
      [reservename]: reservevalue
    });
  }

  handleSubmit(event){
    event.preventDefault();
    alert(
      'A name was submitted: ' + this.state.value + 
      '\nFlavor selected: ' + this.state.selectvalue +
      '\nTextarea: ' + this.state.textvalue + 
      `\nSelected file: ${this.fileresponse}` +
      `\nNumber of guests: ${this.state.numberOfGuests}` +
      `\nIs going?: ${this.state.isGoing ? 'Si':'No'}`
    );
  }
    
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <NameInput
          value={this.state.value} 
          handleChange={this.handleChange} 
        />
        <TextInput
          textvalue={this.state.textvalue} 
          handletextchange={this.handletextchange} 
        />
        <FileInput
          handlefile={this.handlefile} 
          inputref={this.handleinputref} 
        />
        <SelectInput
          selectvalue={this.state.selectvalue} 
          handleselectchange={this.handleselectchange}
        />
        <Reserve
          isGoing={this.state.isGoing}
          numberOfGuests={this.state.numberOfGuests}
          handlereserve={this.handlereserve}
        />
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

class NameInput extends Component{
  render(){
    return (
      <p>
        <label>
          Name:
          <input type='text' value={this.props.value} onChange={this.props.handleChange} />
        </label>
      </p>
    );
  }
}

class TextInput extends Component{
  render(){
    return(
      <p>
        <textarea value={this.props.textvalue} onChange={this.props.handletextchange} />
      </p>
    );
  }
}

class FileInput extends Component{
  render(){
    return(
      <p>
        <label>
          Upload file: 
          <input type='file'
            onChange={this.props.handlefile}
            ref={
              input =>
              {
                this.props.inputref(input);
              }
            } 
          />
        </label>
      </p>
    );
  }
}

class SelectInput extends Component{
  render(){
    return(
      <p>
        <select value={this.props.selectvalue} onChange={this.props.handleselectchange} >
          <option value='coconut' >Coconut</option>
          <option value='grapefruit' >Grapefruit</option>
          <option value='mango' >Mango</option>
          <option value='lime' >Lime</option>
        </select>
      </p>
    );
  }
}

class Reserve extends Component{
  render(){
    return(
      <div>
        <label>
          Is going:
          <input 
            name='isGoing'
            type='checkbox'
            checked={this.props.isGoing}
            onChange={this.props.handlereserve}
          />
        </label>
        <br />
        <label>
          <input 
            name='numberOfGuests'
            type='number'
            value={this.props.numberOfGuests}
            onChange={this.props.handlereserve}
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

class Dialog extends Component{ //Composition
  render(){
    return(
      <div>
        {this.props.title}
        <h4>
          {this.props.message}
        </h4>
        <p>
          {this.props.children}
        </p>
      </div>
    );
  }
}

class SignUp extends Component{
  constructor(props){
    super(props);

    this.state = {login: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(e){
    this.setState({login: e.target.value});
  }

  handleSignUp(){
    alert(`Welcome aboard ${this.state.login}`);
  }

  render(){
    return(
      <Dialog 
        title={<Welcome name='cliente' />}
        message='Ingrese su nombre'
      >
        <input type='text' value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp} >
          Sign me up!
        </button>
      </Dialog>
    );
  }
}


//Product table Practice
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class ProductTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      checkboxState: false,
      filterText:''
    };

    this.handleFilterText = this.handleFilterText.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleFilterText(filteredText){
    this.setState({filterText: filteredText});
  }

  handleCheckbox(checkbox){
    this.setState({checkboxState: checkbox})
  }

  render(){
    return(
    <p>
      <h1>Products table</h1>
      <SearchBar 
        searchValue={this.state.filterText} 
        checkboxValue={this.state.checkboxState} 
        onFilterChange={this.handleFilterText}
        onCheckboxChange={this.handleCheckbox}
      />
      <TableData 
        data={this.props.data}
        searchValue={this.state.filterText} 
        checkboxValue={this.state.checkboxState}
      />
    </p>
    );
  }
}

class SearchBar extends Component{
  constructor(props){
    super(props);

    this.textFilterHandler = this.textFilterHandler.bind(this);
    this.checkboxHandler = this.checkboxHandler.bind(this);
  }

  textFilterHandler(e){
    this.props.onFilterChange(e.target.value);
  }

  checkboxHandler(e){
    this.props.onCheckboxChange(e.target.checked);
  }

  render(){
    return(
    <p>
      <input type='text' 
        value={this.props.searchValue} 
        placeholder='Search...'
        onChange={this.textFilterHandler}
      />
      <br/>
      <input type='checkbox'
        checked={this.props.checkboxValue}
        onChange={this.checkboxHandler}
      /> 
      Only on stock
    </p>
    );
  }
}

class TableData extends Component{
  render(){

    const rows=[];
    let lastCategory='';

    this.props.data.forEach(element => {
      if(element.name.indexOf(this.props.searchValue) === -1){
        return;
      }
      if(this.props.checkboxValue && !element.stocked){
        return;
      }
      if(element.category !== lastCategory){
        rows.push(
          <CategoryRow name={element.category} />
        );
      }
      rows.push(
        <ProductRow data={element} />
      );
      lastCategory = element.category;
    });

    return(
      <table align='center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class CategoryRow extends Component{
  render(){
    return(
      <tr>
        <th colSpan="2">
          {this.props.name}
        </th>
      </tr>
    );
  }
}

class ProductRow extends Component{
  render(){
    const name = this.props.data.stocked ?
      this.props.data.name : 
      <span style={{color: 'red'}}>
        {this.props.data.name}
      </span>
    ;
    return(
      <tr>
        <td>{name}</td>
        <td>{this.props.data.price}</td>
      </tr>
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
        <SignUp />
        <ProductTable data={PRODUCTS} />
      </div>
    );
  }
}

export default App;
