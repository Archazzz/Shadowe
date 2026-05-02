// pages/splash/splash.js
var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    statusBarHeight: 20
  },
  onLoad: function() {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })
  },
  onStartTap: function() {
    wx.switchTab({ url: '/pages/home/home' })
  },
  onLoginTap: function() {
    wx.switchTab({ url: '/pages/home/home' })
  }
})
