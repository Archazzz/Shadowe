// pages/import/import.js
var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    projectId: '',
    statusBarHeight: 20,
    importMethods: [
      {
        id: 'file',
        icon: '📁',
        title: '文件导入',
        desc: 'MP3/WAV/M4A，最大100MB',
        isNew: false,
        hasAccent: false
      },
      {
        id: 'wechat',
        icon: '💬',
        title: '微信聊天记录',
        desc: '从聊天记录中选择',
        isNew: false,
        hasAccent: false
      },
      {
        id: 'text',
        icon: '📝',
        title: '文字稿输入',
        desc: '粘贴或输入，最多5000字',
        isNew: false,
        hasAccent: false
      },
      {
        id: 'questionnaire',
        icon: '📤',
        title: '问卷导入',
        desc: 'CSV/Excel，AI智能筛选',
        isNew: true,
        hasAccent: true
      }
    ]
  },

  onLoad: function(options) {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })

    this.setData({
      projectId: options.projectId || ''
    })
  },

  onBackTap: function() {
    wx.navigateBack()
  },

  onImportTap: function(e) {
    var method = e.currentTarget.dataset.method
    var projectId = this.data.projectId

    if (method === 'questionnaire') {
      wx.navigateTo({ url: '/pages/questionnaire-import/questionnaire-import' })
    } else if (method === 'file') {
      this.chooseFile()
    } else if (method === 'wechat') {
      this.chooseFromChat()
    } else if (method === 'text') {
      this.inputText()
    }
  },

  chooseFile: function() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['mp3', 'wav', 'm4a'],
      success: function(res) {
        var file = res.tempFiles[0]
        if (file.size > 100 * 1024 * 1024) {
          wx.showToast({ title: '文件不能超过100MB', icon: 'none' })
          return
        }
        wx.navigateTo({
          url: '/pages/analyzing/analyzing?projectId=' + that.data.projectId + '&name=' + encodeURIComponent(file.name)
        })
      }
    })
  },

  chooseFromChat: function() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success: function(res) {
        var file = res.tempFiles[0]
        wx.navigateTo({
          url: '/pages/analyzing/analyzing?projectId=' + that.data.projectId + '&name=' + encodeURIComponent(file.name)
        })
      }
    })
  },

  inputText: function() {
    var that = this
    wx.navigateTo({
      url: '/pages/analyzing/analyzing?projectId=' + that.data.projectId + '&type=text'
    })
  }
})
