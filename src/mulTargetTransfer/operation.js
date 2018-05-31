/*
 * @Author: huangkwf 
 * @Date: 2018-05-28 15:23:30 
 * @Last Modified by:   huangkwf 
 * @Last Modified time: 2018-05-28 15:23:30 
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { base } from 'nc-lightapp-front';
// const { NCIcon: Icon, NCButton: Button } = base;
import { Icon, Button } from 'tinper-bee';

export default class Operation extends Component {
	constructor(props) {
		super(props);
	}
	moveTo = (direction) => {
		this.props.moveTo(direction);
	};
	handleDisabled = () => {
		let { sourceSelectedKeys, targetSelectedKeys } = this.props;
		let resDisabled = { left: true, right: true };
		sourceSelectedKeys.length > 0 ? (resDisabled.right = false) : '';
		targetSelectedKeys.length > 0 ? (resDisabled.left = false) : '';
		return resDisabled;
	};
	render() {
		let { className } = this.props;
		let { left, right } = this.handleDisabled();
		return (
			<div className={className}>
				<Button
					className="left-move-btn move-btn"
					colors="info"
					disabled={left}
					size="sm"
					onClick={this.moveTo.bind(this, 'left')}
				>
					<Icon className="uf-arrow-left" />
				</Button>
				<Button
					className="right-move-btn move-btn"
					colors="info"
					disabled={right}
					size="sm"
					onClick={this.moveTo.bind(this, 'right')}
				>
					<Icon className="uf-arrow-right" />
				</Button>
			</div>
		);
	}
}
