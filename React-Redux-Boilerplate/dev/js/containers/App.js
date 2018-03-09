import React from 'react';
import Header from '../components/Header/header';
import Game from '../components/Game/game';
import {connect} from 'react-redux';

require('./App.scss');

const App = (props) => (
    <div className="App">
        <Header />
        <Game gameState={props.generalStates}/>
    </div>
);

function mapStateToProps(state) {
    return {
        generalStates: state.generalReducer,
    };
}

export default connect(mapStateToProps)(App);
