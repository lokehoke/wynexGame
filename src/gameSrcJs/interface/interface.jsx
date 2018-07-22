'use strict';

const WEngineAPI = require('./../engine/wEngine.js');

const React = require('react');
const ReactDOM = require('react-dom');

const GameInterface = require('./gameInterface/gameInterface.jsx');

ReactDOM.render(<GameInterface />, document.getElementById('interface'));

const game = new WEngineAPI();

game.startGame();