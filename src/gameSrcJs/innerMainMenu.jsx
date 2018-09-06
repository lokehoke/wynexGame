'use strict';

const React = require('react');

module.exports = class InnerMainMenu extends React.Component {
    render() {
        return (
            <div className="innerMainMenu">
                <header></header>
                <main>
                    <button className="unActive">Продолжить</button>
                    <button ref={newGame => this.newGame = newGame}>Новая игра</button>
                    <button ref={settingButton => this.settingButton = settingButton}>Настройки</button>
                </main>
                <footer></footer>
            </div>
        );
    }

    componentDidMount() {
        this.newGame.addEventListener('click', () => {
            this.props.startNewGame();
        });

        this.settingButton.addEventListener('click', () => {
            this.props.openSetting();
        });
    }
}
