'use strict';

const WEngineAPI = require('./../engine/wEngine.js');

const React = require('react');
const ReactDOM = require('react-dom');

const GameInterface = require('./gameInterface/gameInterface.jsx');

const game = new WEngineAPI();
const state = game.startGame();

ReactDOM.render(<GameInterface stateGame={state}/>, document.getElementById('interface'));