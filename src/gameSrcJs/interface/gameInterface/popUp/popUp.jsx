'use strict';

const React = require('react');

const Column = require('./column/column.jsx');
const MainWindow = require('./window/window.jsx');

module.exports = class PopUp extends React.Component {
	render() {
		return (
			<div
				className="wrapPopUp"
				ref={wrap => this._wrap = wrap}
			>
				<div className="popUp">
					<Column type="inventory" />
					<MainWindow
						type="inventory"
						stateGame={this.props.stateGame}
						otherObject={this.props.stateGame.getStepOnItem()}
					/>
					<div />
				</div>
			</div>
		);
	}

	componentDidMount() {
		this._wrap.addEventListener('click', e => {
			if (this._wrap === e.target) {
				this.props.closePopUp();
			}
		});
	}
}