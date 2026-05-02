var mockUser = require('../../utils/mockData').mockUser

Page({
  data: {
    user: null,
    statusBarHeight: 20,
    stats: [
      { icon: '📁', label: '研究项目', value: 0 },
      { icon: '🎙️', label: '访谈次数', value: 0 },
      { icon: '⏱️', label: '累计时长', value: '0' }
    ],
    menuSections: [
      {
        title: '研究数据',
        items: [
          { icon: '📊', name: '我的分析报告', iconBg: '#EDE8FE', iconColor: '#8B6CF6', badge: '' },
          { icon: '🎙️', name: '录音存档', iconBg: '#FFF0F5', iconColor: '#FF6B9D', badge: '18条' },
          { icon: '📝', name: '访谈文字稿', iconBg: '#F0FFF4', iconColor: '#34C759', badge: '' }
        ]
      },
      {
        title: '会员与升级',
        items: [
          { icon: '⭐', name: '升级专业版', iconBg: '#FFF8E6', iconColor: '#FF9500', badge: '推荐', badgeType: 'recommend' },
          { icon: '🎁', name: '邀请好友得积分', iconBg: '#FFF0F0', iconColor: '#FF6B9D', badge: '活动中', badgeType: 'active' }
        ]
      },
      {
        title: '设置',
        items: [
          { icon: '🔔', name: '通知设置', iconBg: '#EDE8FE', iconColor: '#8B6CF6', badge: '' },
          { icon: '🛡️', name: '隐私与安全', iconBg: '#F0F5FF', iconColor: '#5B7FFF', badge: '' },
          { icon: '❓', name: '帮助中心', iconBg: '#FFF8E6', iconColor: '#FF9500', badge: '' },
          { icon: '⚙️', name: '通用设置', iconBg: '#F5F3FA', iconColor: '#666677', badge: '' }
        ]
      }
    ]
  },

  onLoad: function() {
    var statusBarHeight = 20
    try {
      var sysInfo = wx.getSystemInfoSync()
      statusBarHeight = sysInfo.statusBarHeight || 20
    } catch (e) {}
    this.setData({ statusBarHeight: statusBarHeight })

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    this.initData()
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  initData: function() {
    var user = mockUser
    var stats = [
      { icon: '📁', label: '研究项目', value: user.totalProjects },
      { icon: '🎙️', label: '访谈次数', value: user.totalInterviews },
      { icon: '⏱️', label: '累计时长', value: user.totalHours }
    ]
    this.setData({ user: user, stats: stats })
  },

  onEditProfile: function() {
    wx.showToast({ title: '编辑资料', icon: 'none' })
  },

  onMenuItemTap: function(e) {
    var name = e.currentTarget.dataset.name
    if (name === '升级专业版') {
      wx.navigateTo({ url: '/pages/value-back/value-back' })
    } else if (name === '邀请好友得积分') {
      wx.showToast({ title: '邀请好友功能即将上线', icon: 'none' })
    } else {
      wx.showToast({ title: name, icon: 'none' })
    }
  },

  onLogout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      confirmColor: '#FF3B30',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({ title: '已退出登录', icon: 'none' })
        }
      }
    })
  }
})
