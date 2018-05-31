/*
 * @Author: huangkwf 
 * @Date: 2018-05-28 15:23:16 
 * @Last Modified by:   huangkwf 
 * @Last Modified time: 2018-05-28 15:23:16 
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { base } from 'nc-lightapp-front';

import Item from './item';

// const { NCIcon: Icon, NCButton: Button, NCFormControl, NCCheckbox: Checkbox } = base;
import { Button, Checkbox } from 'tinper-bee';
export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCheck: {
				checked: false,
				indeterminate: false
			}
		};
	}
	componentWillReceiveProps(nextProps) {
		let { dataSource, selectedKeys } = nextProps;
		let resCheck = this.cumputedCheckStatus(dataSource, selectedKeys);
		this.setState({ allCheck: resCheck });
	}
	//计算全选按钮选中状态
	cumputedCheckStatus = (dataSource, selectedKeys) => {
		let checkedCount = 0,
			resCheck = { checked: false, indeterminate: false };
		if (dataSource.length) {
			for (let i = 0; i < dataSource.length; i++) {
				if (selectedKeys.indexOf(dataSource[i].key) != -1) {
					checkedCount++;
				}
			}
			if (checkedCount == dataSource.length) {
				resCheck.checked = true;
			} else if (checkedCount == 0) {
				resCheck.checked = false;
				resCheck.indeterminate = false;
			} else {
				resCheck.checked = false;
				resCheck.indeterminate = true;
			}
		}
		return resCheck;
	};
	//单行点击
	itemClick = (item) => {
		let { selectedKeys } = this.props;
		let check = selectedKeys.some((key) => {
			return item.key == key;
		});
		this.props.itemClick(item, !check);
	};
	//全选改变状态回调
	allCheckChange = () => {
		let { checked, indeterminate } = this.state.allCheck;
		if (checked) {
			this.state.allCheck.checked = false;
			this.state.allCheck.indeterminate = false;
		} else {
			this.state.allCheck.checked = true;
			this.state.allCheck.indeterminate = false;
		}
		this.setState({ allCheck: this.state.allCheck });
		this.props.allCheckChange(this.state.allCheck.checked);
	};
	//上移/下移
	sortMove = (direction) => {
		this.props.sortMove(direction);
	};
	render() {
		let { dataSource, selectedKeys, className, title, showSortBtn } = this.props;
		let { checked, indeterminate } = this.state.allCheck;
		return (
			<div className="m-transfer-list">
				<div className="m-transfer-list-header">
					<Checkbox onClick={this.allCheckChange} checked={checked} indeterminate={indeterminate} />
					<span className="m-transfer-list-header-selected-count">
						{selectedKeys.length > 0 ? `${selectedKeys.length}/` : ''}
						{dataSource.length}
					</span>
					<span className="m-transfer-list-header-title">{title}</span>
				</div>
				<div className="m-transfer-list-body">
					<ul className="m-transfer-list-content">
						{dataSource.map((item, index) => {
							let checked = selectedKeys.indexOf(item.key) != -1 ? true : false;
							return <Item key={item.key} checked={checked} itemClick={this.itemClick} item={item} />;
						})}
					</ul>
				</div>
				{showSortBtn && (
					<div className="m-transfer-list-footer">
						<Button
							className="sort-move sort-top"
							disabled={selectedKeys.length == 1 ? false : true}
							onClick={this.sortMove.bind(this, 'up')}
						>
							上移
						</Button>
						<Button
							className="sort-move sort-bottom"
							disabled={selectedKeys.length == 1 ? false : true}
							onClick={this.sortMove.bind(this, 'down')}
						>
							下移
						</Button>
					</div>
				)}
			</div>
		);
	}
}
