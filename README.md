# mul-target-transfer
多目标源穿梭框
## 功能描述
- 支持一个数据源和多目标源之间数据穿梭
- 支持目标源数据排序
- 支持多选

## 参数说明
```js
    dataSource初始数据格式(key值必须且唯一):
    [
        { key: '1', title: '北京', description: '首都' },
        { key: '2', title: '上海', description: '上海滩'},
        { key: '3', title: '成都', description: '大熊猫' },
        { key: '4', title: '杭州', description: '西湖' },
        { key: '5', title: '郑州', description: '福塔' },
        { key: '6', title: '西安', description: '肉夹馍' },
    ]
```


|参数|类型|描述|默认值|
|:--|:--|:--|:--|
|className|array|自定义类名|[]|
|dataSource|array|原始数据源|[]|
|topTargetKeys|array|展示在目标源1的数据集|[]|
|bottomTargetKeys|array|展示在目标源2的数据集|[]|
|selectedKeys|array|默认选中的数据集|[]|
|titles|array|标题|[ '数据源', '目标一', '目标二' ]|
|showSortBtn|boolean|启用排序功能|true|
|onChange|function|数据穿梭后的回调函数(返回值为当前各个区域的数据)|null|

## 示例
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MulTargetTransfer from './components/MulTargetTransfer';
class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{ key: '1', title: '北京', description: '首都' },
				{ key: '2', title: '上海', description: '上海滩'},
				{ key: '3', title: '成都', description: '大熊猫' },
				{ key: '4', title: '杭州', description: '西湖' },
				{ key: '5', title: '郑州', description: '福塔' },
				{ key: '6', title: '西安', description: '肉夹馍' },
			],
			topTargetKeys: [ '1','3','4','6' ],
			bottomTargetKeys: [ '2' ],
		};
	}
	onChange=(data)=>{
		console.log(data);
	}
	render() {
        let {dataSource,topTargetKeys,bottomTargetKeys} = this.state;
        const titles = ['全部数据','目标数据1','目标数据2']
		return (
			<div className='test-box'>
				<MulTargetTransfer
					className={'test'}
					showSortBtn={true}
					titles={titles}
					onChange={this.onChange}
					dataSource={dataSource}
					topTargetKeys={topTargetKeys}
					bottomTargetKeys={bottomTargetKeys}
				/>
			</div>
		);
	}
}
```
