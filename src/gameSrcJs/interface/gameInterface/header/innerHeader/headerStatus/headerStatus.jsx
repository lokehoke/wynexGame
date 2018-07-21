'use strict';

const React = require('react');

const Line = require('./line/line.jsx');

module.exports = class HeaderStatus extends React.Component {
	render() {
		return (
			<div className="header__status">
				<Line type="hp" />
				<Line type="mp" />
			</div>
		);
	}
}