'use strict';
const WEngineAPI = require('./../engine/wEngine.js');
const GameIntarfface = require('./gameInterface/gameInterface.jsx');

module.exports = class NewGame {
    constructor(store) {
        this.game = new WEngineAPI(store);
        this.stateGame = this.game.startGame();
        this.state = this.game.getState();

        console.log(this.state);
    }

    getGameIntarface() {
        return GameIntarfface;
    }
}
