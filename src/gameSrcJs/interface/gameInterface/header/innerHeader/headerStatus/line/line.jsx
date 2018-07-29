'use strict';

const React = require('react');

module.exports = class Line extends React.Component {
	constructor(props) {
		super(props);

		let watcher = this.props.stateGame.getWatcher();
		let max = 0;
		let cur = 0;

		if (this.props.type === 'hp') {
			max = watcher.maxHP;
			cur = watcher.HP;
		}

		this.state = {
			fromO: null,
			num: 0,
			max: max,
			cur: cur,
			type: this.props.type
		};
	}

	componentDidMount() {
		if (this.state.type === 'hp') {
			document.addEventListener('mainGetHP', e => this._add(e) );
			document.addEventListener('mainGetDamage', e => this._add(e) );
		} else if (this.state.type === 'mp') {
			document.addEventListener('mainGetMP', e => this._add(e) );
		}
	}

	componentWillUnmount() {
		if (this.state.type === 'hp') {
			document.removeEventListener('mainGetHP', e => this._add(e) );
			document.removeEventListener('mainGetDamage', e => this._add(e) );
		} else if (this.state.type === 'mp') {
			document.removeEventListener('mainGetMP', e => this._add(e) );
		}
	}

	render() {
		let proc = (this.state.max ? this.state.cur / this.state.max * 200 : 0) + 'px';

		return(
			<div className="header__status-line">
				<div className="status-line__container">
					<div className={this.props.type} style={{width: proc}}></div>
				</div>
				<div className="status-line__maxCur">{this.state.cur} / {this.state.max}</div>
				<span>{this.props.type}</span>
			</div>
		);
	}

	_add(e) {
		this.setState(e.detail);
	}
}