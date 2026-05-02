// pages/home/home.js
var mockData = require('../../utils/mockData')
var mockUser = mockData.mockUser
var mockProjects = mockData.mockProjects
var recentActivities = mockData.recentActivities
var typeConfig = mockData.typeConfig
var statusConfig = mockData.statusConfig
var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    user: mockUser,
    projects: mockProjects,
    activities: recentActivities,
    showCreateSheet: false,
    statusBarHeight: 20
  },
  onLoad: function() {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },
  onProjectTap: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/project-detail/project-detail?id=' + id })
  },
  onRecordTap: function() {
    wx.navigateTo({ url: '/pages/record/record' })
  },
  onImportTap: function() {
    wx.navigateTo({ url: '/pages/import/import' })
  },
  onQuestionnaireTap: function() {
    wx.navigateTo({ url: '/pages/questionnaire-import/questionnaire-import' })
  },
  onNewProjectTap: function() {
    wx.navigateTo({ url: '/pages/new-project/new-project' })
  },
  onActivityTap: function(e) {
    var type = e.currentTarget.dataset.type
    if (type === 'completed') {
      wx.navigateTo({ url: '/pages/single-insight/single-insight?id=mat_001' })
    } else if (type === 'recording') {
      wx.navigateTo({ url: '/pages/analyzing/analyzing?id=mat_003' })
    }
  }
})
