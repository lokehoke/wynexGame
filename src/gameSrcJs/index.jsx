'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');
const ReactRedux = require('react-redux');

const Provider = ReactRedux.Provider;

const MainMenu = require('./mainMenu.jsx');
const soundController = new (require('./soundController/soundController.js'))();

const store = Redux.createStore(
    (stateApp = {soundController}, action) => {
    let newState = Object.assign({}, stateApp);

    switch (action.type) {
        case 'INITIAL_STATE':
            newState.stateGame = action.stateGame;
            break;
        case 'MAIN_GET_DAMAGE':
            break;
        case 'WATCHER_STEP_ON':
            break;
    }

    return newState;
});

ReactDOM.render(
  <Provider store={store}>
    <MainMenu store={store}/>
  </Provider>,
    document.getElementById('interface')
);

soundController.doMainMenuMusic();
