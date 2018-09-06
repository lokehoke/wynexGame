'use strict';

const React = require('react');
const PropTypes = require('prop-types');

module.exports = class InnerItem extends React.Component {
	static defaultProps = {
		item: {},
		numItems: 0,
		idItemPosition: 0,
		fast: false
	}

	static propsTypes = {
		item: PropTypes.object,
		numItems: PropTypes.number,
		idItemPosition: PropTypes.number,
		fast: PropTypes.bool
	}

	render() {
		let cn = '__item__icon__imgDiv '
		let num = null;

		if (this.props.item) {
			cn += this.props.item.classNameCSS;
			num = this.props.numItems;
		}

		return (
			<div
				className="__item__icon"
				ref={item => this.divItem = item}
			>
				<div className={cn}></div>
				<div className="__item__countDiv">{num}</div>
			</div>
		);
	}

	componentDidMount() {
		// const item = this.divItem;

		// item.addEventListener('dragstart', () => false);
		// item.addEventListener('selectstart', () => false);
		// item.addEventListener('dblclick' , e => {
		// 	e.preventDefault();
		// 	this._moveTo('any');
		// 	return false;
		// });
		// //mousedown not warking!
		// item.addEventListener('mousedown', e => {
		// 	e.preventDefault();
		//
		// 	const mooving = (e) => {
		// 		// this.targetItem.classList.remove('active')
		// 		item.style.left = e.pageX - shiftX + 'px';
		// 		item.style.top = e.pageY - shiftY + 'px';
		//
		// 		let target = {};
		//
		// 		if (target = findDroppable(e)) {
		// 			// console.log(target);
		// 			// this.targetItem = target;
		// 			// this.targetItem.classList.add('active');
		// 		}
		//
		// 		function findDroppable(e) {
		// 			let elem = document.elementFromPoint(e.clientX, e.clientY);
		// 			// console.log(elem);
		// 			return elem.closest('.__item');
		// 		}
		// 	}
		// 	const mouseMoveHandler = e => mooving(e);
		//
		// 	let coor = item.getBoundingClientRect();
		// 	let shiftX = e.pageX - coor.left;
		// 	let shiftY = e.pageY - coor.top;
		//
		// 	item.style.position = 'absolute';
		// 	item.style.zIndex = 10000;
		// 	mooving(e);
		//
		// 	document.addEventListener('mousemove', mouseMoveHandler);
		// 	item.onmouseup = () => {
		// 		document.removeEventListener('mousemove', mouseMoveHandler);
		// 		item.onmouseup = null;
		// 	};
		//
		// 	return false;
		//
		// });
	}

	_moveTo(location) {

	}
}
