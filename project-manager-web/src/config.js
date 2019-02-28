/**
 * Created by gyl
 */
// 判断当前是否为正式环境
let reportUrl =  '',imgUrl='';
function setAddress() {
  let address =  window.location.origin;
  if (address === "http://183.134.73.117" || address === "https://183.134.73.117"){
    imgUrl = 'http://183.134.73.117/fss/download?fileId=';
    reportUrl = 'http://183.134.73.117/';
  }else{
    imgUrl = 'http://192.168.16.10/fss/download?fileId=';
    reportUrl = 'http://192.168.16.10/';
  }
}
setAddress();
export default {
  // 分页
  current: 1,
  pageSize: 10,
  size: 'small',
  imgUrl,
  reportUrl,
  publicUrl: 'http://61.153.185.137/upload/',
  // 提示信息style
  info: {
    ifTimeOut: "登录过期，请重新登录!",
    delete: {
      success: '删除信息成功',
      error: '删除信息失败',
    },
    update: {
      success: '修改信息成功',
      error: '修改信息失败',
    },
    save: {
      success: '保存信息成功',
      error: '保存信息失败',
    },
  },
  reg: {
    required: {
      required: true,
      message: '必填'
    },
    phone: {
      pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
      message: '请填写正确的手机号码'
    },
    positiveInteger: {
      pattern: /^[1-9]\d*$/,
      message: '请填写正整数'
    },
    price: {
      pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
      message: '请填写正确的钱数'
    },
    long: {
      pattern: /^(-?\d+)(\.\d+)?$/,
      message: '请填写正确的数值'
    },
    lengthMax: {
      max: 100,
      message: '超出最大字数限制'
    }
  },
  statusColor:{
    blue: '#3C8FFF',
    blueShadow: '#80bdfb',
    green: '#0fd14f',
    greenShadow: '#6ED1A6',
    orange: '#FF9F39',
    orangeShadow: '#ffb774',
    red: '#FF6767',
    redShadow: '#F7ABAB',
    yellow: '#ffcc22',
    yellowShadow: '#FFD863',
    gray: '#B0B8C2',
    grayShadow: '#BFC6CF',
    base: '#00B5C5',
    baseShadow: '#A5BBE0',
  }
}
