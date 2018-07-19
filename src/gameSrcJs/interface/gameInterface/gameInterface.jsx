'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Header = require('./header/header.jsx');

module.exports = class GameIntarfface extends React.Component {
	render() {
		return (
			<Header />
		);
	}
}