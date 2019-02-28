import request from '../../utils/request'

export default {
  async getChartsData(params){
    return await request({url:'/devicemanager/dmDevice/getHistoryData',params})
  },
  async getDeviceTree(){
    return await request({url:'/devicemanager/dmDevice/getDeviceTree'})
  }
}
