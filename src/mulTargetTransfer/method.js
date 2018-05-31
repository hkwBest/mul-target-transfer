/*
 * @Author: huangkwf 
 * @Date: 2018-05-28 15:23:20 
 * @Last Modified by:   huangkwf 
 * @Last Modified time: 2018-05-28 15:23:20 
 */
export function initState(selectedKeys, topTargetKeys, bottomTargeKeys) {
	let sourceSelectedKeys = selectedKeys.filter((key) => {
		return topTargetKeys.indexOf(key) == -1 && bottomTargeKeys.indexOf(key) == -1;
	});
	let tTargetSelectedKeys = selectedKeys.filter((key) => {
		return topTargetKeys.indexOf(key) != -1;
	});
	let bTargetSelectedKeys = selectedKeys.filter((key) => {
		return bottomTargeKeys.indexOf(key) != -1;
	});
	return { sourceSelectedKeys, tTargetSelectedKeys, bTargetSelectedKeys };
}
