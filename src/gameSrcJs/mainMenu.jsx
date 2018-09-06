'use strict';
const React = require('react');

const InnerMainMenu = require('./innerMainMenu.jsx');
const Intarface = require('./interface/interface.jsx');
const Setting = require('./setting.jsx');

module.exports = class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cur: <InnerMainMenu
                startNewGame={this._startNewGame.bind(this)}
                openSetting={this._openSetting.bind(this)}
            />
        };
    }

    render() {
        let inner = this.state.cur;

        return (
            <div className="mainMenu">
                {inner}
            </div>
        );
    }

    _startNewGame() {
        const intarface = new Intarface(this.props.store);
        const GameIntarfface = intarface.getGameIntarface();
        this.setState({
            cur: <GameIntarfface />
        });
    }

    _openSetting() {
        this.setState({
            cur: <Setting />
        });
    }
}
