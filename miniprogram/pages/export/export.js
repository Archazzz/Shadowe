// pages/export/export.js
Page({
  data: {
    formats: [
      { id: 'pdf', name: 'PDF', desc: '适合正式报告分享', icon: '📄', color: '#FF6B9D', gradient: 'linear-gradient(135deg, #FF6B9D, #FFB8D1)' },
      { id: 'markdown', name: 'Markdown', desc: '适合开发者与文档协作', icon: '📝', color: '#8B6CF6', gradient: 'linear-gradient(135deg, #8B6CF6, #B49DFB)' },
      { id: 'image', name: '图片', desc: '适合社交平台传播', icon: '🖼️', color: '#FF9500', gradient: 'linear-gradient(135deg, #FF9500, #FFD60A)' }
    ],
    selectedFormat: 'pdf',
    sections: [
      { id: 'execSummary', name: '执行摘要', checked: true },
      { id: 'keyFindings', name: '关键发现', checked: true },
      { id: 'personas', name: '用户画像', checked: true },
      { id: 'recommendations', name: '行动建议', checked: true },
      { id: 'evidence', name: '证据链', checked: false },
      { id: 'rawData', name: '原始数据', checked: false }
    ],
    isExporting: false,
    exportProgress: 0,
    exportSuccess: false,
    statusBarHeight: 20
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

  onBack: function() {
    wx.navigateBack()
  },

  onSelectFormat: function(e) {
    var id = e.currentTarget.dataset.id
    this.setData({ selectedFormat: id })
  },

  onToggleSection: function(e) {
    var id = e.currentTarget.dataset.id
    var sections = this.data.sections.map(function(s) {
      if (s.id === id) {
        var copy = {}
        for (var key in s) {
          copy[key] = s[key]
        }
        copy.checked = !s.checked
        return copy
      }
      return s
    })
    this.setData({ sections: sections })
  },

  onExport: function() {
    if (this.data.isExporting) return
    this.setData({ isExporting: true, exportProgress: 0, exportSuccess: false })

    // Simulate export progress
    var steps = [10, 25, 45, 65, 80, 95, 100]
    var i = 0
    var self = this
    var timer = setInterval(function() {
      if (i < steps.length) {
        self.setData({ exportProgress: steps[i] })
        i++
      } else {
        clearInterval(timer)
        self.setData({ isExporting: false, exportSuccess: true })
      }
    }, 400)
  },

  onOpenFile: function() {
    wx.showToast({ title: '文件已保存', icon: 'success' })
  }
})
