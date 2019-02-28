'use strict';
/**
 * 使用方法:
 * 直接调用 filterTree函数,返回最新的树结构
 * 其中 node 为最原始的树结构,filter为过滤值即 搜索值,
 * 页面上注意事项:
 * 1.在页面上渲染树结构需要放到state里,以便更新,还需要另外一个字段来保存最原始的树结构 即this.state.originData
 * 2.在使用getParentKey(item.key, this.state.originData),第二个参数为最原始的树结构
 * 3.filterTree函数node为最原始的树结构即 this.state.originData 为数组
 * 4.filterTree函数返回为对象,记得在setState 加上[]
 */

// Helper functions for filtering
export const defaultMatcher = (filterText, node) => {
  return node.label.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const findNode = (node, filter, matcher) => {
  return matcher(filter, node) || // i match
    (node.children && // or i have decendents and one of them match
      node.children.length &&
      !!node.children.find(child => findNode(child, filter, matcher)));
};

export const filterTree = (nod, filter, matcher = defaultMatcher) => {
  let node = nod[0] || nod;
  // If im an exact match then all my children get to stay
  if(matcher(filter, node) || !node.children){ return node; }
  // If not then only keep the ones that match or have matching descendants
  const filtered = node.children
    .filter(child => findNode(child, filter, matcher))
    .map(child => filterTree(child, filter, matcher));
  return Object.assign({}, node, { children: filtered });
};
