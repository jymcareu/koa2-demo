/**
 * 环保实时service
 */
import request from '../utils/request'

export default {
  //获取锅炉
  getBoliers: (params) => {
    return request({url: '/mxdhb/envStandard/showEnvStandardDeviceName', method: 'GET', params})
  },
  //实时列表
  getRealTimeList: (params) => {
    return request({url:'/mxdhb/findEnvRealTime/getRealTimeDate',method:'GET',params})
  },
  //获取锅炉实时数据
  getBoilerData: (params) => {
    return request({url: '', method: 'GET', params})
  },
  //获取预警数据数据
  getWarningData: (params) => {
    return request({url: '/mxdhb/envAlarm/getEnvAlarm', method: 'GET', params})
  },
  //获取检测因子当前浓度
  getCurrentConcentration: (params) => {
    return request({url: '', method: 'GET', params})
  },
  //KPI查询
  getKPI: (params) => {
    return request({url: '/mxdhb/selectKPI/getKPIdata', method: 'GET', params})
  },
}
