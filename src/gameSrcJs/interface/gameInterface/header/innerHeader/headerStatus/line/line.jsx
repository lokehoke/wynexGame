'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

class Line extends React.Component {
	static defaultProps = {
		cur: 0,
		max: 0
	}

	static propsTypes = {
		cur: PropTypes.number,
		max: PropTypes.number
	}

	render() {
		let proc =
			(this.props.max
				? this.props.cur / this.props.max * 200
				: 0
			) + 'px';

		return (
			<div className="header__status-line">
				<div className="status-line__container">
					<div
						className={this.props.type}
						style={{width: proc}}
					/>
				</div>
				<div className="status-line__maxCur">
					{this.props.cur} / {this.props.max}
				</div>
				<span>
					{this.props.type}
				</span>
			</div>
		);
	}
}

module.exports = ReactRedux.connect(
	(store, props) => {
		let watcher = store.stateGame.getWatcher();
		let cur = 0;
		let max = 0;

		if (props.type === 'hp') {
			cur = watcher.HP,
			max = watcher.maxHP
		} else if (props.type === 'mp') {
			cur = watcher.MP,
			max = watcher.maxMP
		}

		return {
			cur,
			max
		};
	}
)(Line);
