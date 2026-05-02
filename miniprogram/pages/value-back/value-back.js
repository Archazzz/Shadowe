Page({
  data: {
    selectedPlan: 'yearly', // 'yearly' or 'monthly'
    statusBarHeight: 20,
    plans: [
      { id: 'monthly', name: '月付', price: 49, unit: '月', yearly: false },
      { id: 'yearly', name: '年付', price: 29, unit: '月', yearly: true, originalPrice: 49, savePercent: 41, badge: '最受欢迎' }
    ],
    features: [
      { name: '分析次数', free: '每月3次', pro: '无限次', highlight: true },
      { name: '综合报告', free: '基础版', pro: '专业版', highlight: false },
      { name: '素材容量', free: '500MB', pro: '10GB', highlight: false },
      { name: '问卷筛选', free: '❌', pro: '✅ AI智能筛选', highlight: true },
      { name: '导出格式', free: 'PDF', pro: 'PDF/Word/PPT', highlight: false }
    ]
  },

  onLoad: function(options) {
    var statusBarHeight = 20
    try {
      var sysInfo = wx.getSystemInfoSync()
      statusBarHeight = sysInfo.statusBarHeight || 20
    } catch (e) {}
    this.setData({ statusBarHeight: statusBarHeight })

    var projectId = options.projectId || ''
    this.setData({ projectId: projectId })
  },

  onSelectPlan: function(e) {
    var plan = e.currentTarget.dataset.plan
    this.setData({ selectedPlan: plan })
  },

  onUpgrade: function() {
    var plan = this.data.selectedPlan
    var priceText = plan === 'yearly' ? '¥348/年' : '¥49/月'
    wx.showModal({
      title: '确认升级',
      content: '即将升级至专业版（' + priceText + '），是否确认？',
      confirmColor: '#FF6B9D',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '升级成功！',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  onInviteFriend: function() {
    wx.showToast({
      title: '邀请链接已复制',
      icon: 'success'
    })
  },

  onBack: function() {
    wx.navigateBack({ delta: 1 })
  }
})
