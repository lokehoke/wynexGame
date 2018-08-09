'use strict';

const React = require('react');

module.exports = class InnerItem extends React.Component {
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
		const item = this.divItem;

		item.addEventListener("dragstart", () => false);
		item.addEventListener("selectstart", () => false);
		item.addEventListener("mousedown", e => {
			e.preventDefault();

			const mouseMoveHandler = e => mooving(e);
			const mooving = (e) => {
				this.targetItem.classList.remove('active')
				item.style.left = e.pageX - shiftX + 'px';
				item.style.top = e.pageY - shiftY + 'px';

				let target = {};

				if (
					(target = e.target).className === '__item'
				||
					(target = e.target.parentElement).className === '__item'
				||
					(target = e.target.parentElement.parentElement).className === '__item'
				) {
					console.log(e);
					this.targetItem = target;
					this.targetItem.classList.add('active');
				}
			}

			let coor = item.getBoundingClientRect();
			let shiftX = e.pageX - coor.left;
			let shiftY = e.pageY - coor.top;

			item.style.position = 'absolute';
			item.style.zIndex = 10000;
			mooving(e);

			document.addEventListener("mousemove", mouseMoveHandler);
			item.onmouseup = () => {
				document.removeEventListener("mousemove", mouseMoveHandler);
				item.onmouseup = null;
			};

			return false;

		});
	}
}
