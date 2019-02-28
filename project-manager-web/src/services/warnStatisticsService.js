/**
 * 告警统计service
 */
import request from '../utils/request'

export default {
  //获取总览视图和项目视图
  getAllByMonth: (params) => {
    return request({url: '/mxdhb/alarmStatistics/getAllByMonth', method: 'GET', params})
  },

}
