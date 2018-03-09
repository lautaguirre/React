import React from 'react';
import Header from './Header/header';
import Game from './Game/game';
import { connect } from 'react-redux';

require('./../css/components/App.css');

const App = (props) => {
  return(
    <div className="App">
        <Header />
        <Game gameState={props.generalStates}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    generalStates: state.generalReducer,
  };
}

export default connect(mapStateToProps)(App);
