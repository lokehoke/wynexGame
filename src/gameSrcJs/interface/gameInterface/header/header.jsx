'use strict';

const React = require('react');

const HeaderIcon = require('./innerHeader/headerIcon/HeaderIcon.jsx');
const HeaderStatus = require('./innerHeader/headerStatus/headerStatus.jsx');
const HeaderSkils = require('./innerHeader/headerSkils/headerSkils.jsx');

module.exports = class Header extends React.Component {
	render() {
		return (
			<header className="header">
				<HeaderIcon />
				<HeaderStatus />
				<HeaderSkils />
			</header>
		);
	}
}