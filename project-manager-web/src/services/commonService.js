/**
 * 公共接口service
 */
import request from '../utils/request'

export default {
  //获取项目公司
  getCompany: (params) => {
    return request({url: '/mxdhb/findEnvRealTime/getCompanyByIds', method: 'GET', params})
  },
  //获取工艺类型
  getAllCrafts: () => {
    return request({url: '/mxdhb/crafts/getAllCrafts', method: 'GET'})
  },
  // 根据公司id获取所有设备
  getDevice: (params) => {
    return request({url: '/mxdhb/envStandard/showEnvStandardDeviceName', method: 'GET', params})
  },
  //根据模块id获取污染因子
  getFactors:(value)=>{
    return request({url:'/mxdhb/alarmHistory/getFactors',method:'GET',params:{moduleId:value}})
  }
}
