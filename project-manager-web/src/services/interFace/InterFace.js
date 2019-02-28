/**
 * Created by GYL on 2018/7/14
 */
import request from '../../utils/request'

export default {
  // 获取所有项目
  comboBox: (params)=>{
    return request({url:'/industrySchedule/project/comboBox',method:'GET',params})
  },

  // 计划管理
  // 年计划进度总览
  yearPlanScheduleOverView: (params)=>{
    return request({url:'/industrySchedule/planManager/yearPlanScheduleOverView',method:'GET',params})
  },
  // 年计划进度详情查看
  yearPlanScheduleDetail: (params)=>{
    return request({url:'/industrySchedule/planManager/yearPlanScheduleDetail',method:'GET',params})
  },
  // 年计划进度保存
  saveYearPlanSchedule: (params)=>{
    return request({url:'/industrySchedule/planManager/saveYearPlanSchedule',method:'POST',data:params})
  },
  // 月度计划时间下拉框
  timeComboBox: (params)=>{
    return request({url:'/industrySchedule/planManager/timeComboBox', method:'GET',params})
  },
  // 月计划进度保存
  saveMonthPlanSchedule: (params)=>{
    return request({url:'/industrySchedule/planManager/saveMonthPlanSchedule',method:'POST',data:params})
  },
  // 月计划进度总览查询
  MonthPlanScheduleOverView: (params)=>{
    return request({url:'/industrySchedule/planManager/monthPlanScheduleOverView', method:'GET',params})
  },
  // 月计划进度详情查看
  monthPlanScheduleDetail: (params)=>{
    return request({url:'/industrySchedule/planManager/monthPlanScheduleDetail', method:'GET',params})
  },
  // 结算日期是否可修改判断
  stockDaterChangeStatus: (params)=>{
    return request({url:'/industrySchedule/planManager/stockDaterChangeStatus', method:'GET',params})
  },

  // 进度管理
  // 不同工艺进度对比
  differentProcesses: (params)=>{
    return request({url:'/industrySchedule/scheduleManagement/differentProcesses', method:'GET',params})
  },
  // 主界面总览
  industryOverview: (params)=>{
    return request({url:'/industrySchedule/scheduleManagement/industryOverview', method:'GET',params})
  },
  // 同工艺进度对比
  sameProcess: (params)=>{
    return request({url:'/industrySchedule/scheduleManagement/sameProcess', method:'GET',params})
  },
  // 同比趋势视图
  yearTrend: (params)=>{
    return request({url:'/industrySchedule/scheduleManagement/yearTrend', method:'GET',params})
  },
  // 进度视图/列表
  scheduleView: (params)=>{
    return request({url:'/industrySchedule/scheduleManagement/scheduleView', method:'GET',params})
  },
}
