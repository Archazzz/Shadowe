// pages/project-detail/project-detail.js
var mockData = require('../../utils/mockData')
var mockProjects = mockData.mockProjects
var mockMaterials = mockData.mockMaterials
var typeConfig = mockData.typeConfig
var statusConfig = mockData.statusConfig
var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    project: null,
    materials: [],
    typeConfig: typeConfig,
    statusConfig: statusConfig,
    showFabMenu: false,
    statusBarHeight: 20
  },

  onLoad: function(options) {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })

    var projectId = options.id || 'proj_001'
    var project = mockProjects[0]
    for (var i = 0; i < mockProjects.length; i++) {
      if (mockProjects[i].id === projectId) {
        project = mockProjects[i]
        break
      }
    }
    var materials = []
    for (var j = 0; j < mockMaterials.length; j++) {
      if (mockMaterials[j].projectId === projectId) {
        materials.push(mockMaterials[j])
      }
    }

    var self = this
    this.setData({
      project: project,
      materials: materials
    }, function() {
      self.drawProgressRing(project.progress || 0)
    })
  },

  onReady: function() {
    if (this.data.project) {
      this.drawProgressRing(this.data.project.progress || 0)
    }
  },

  drawProgressRing: function(progress) {
    try {
      var query = wx.createSelectorQuery()
      var self = this
      query.select('#progressCanvas').fields({ node: true, size: true }).exec(function(res) {
        try {
          if (!res || !res[0] || !res[0].node) return
          var canvas = res[0].node
          var ctx = canvas.getContext('2d')
          if (!ctx) return
          var dpr = getWindowInfo().pixelRatio || 2
          var size = 80
          canvas.width = size * dpr
          canvas.height = size * dpr
          ctx.scale(dpr, dpr)

          var cx = size / 2
          var cy = size / 2
          var radius = 30
          var lineWidth = 6

          // Background ring
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
          ctx.strokeStyle = '#EDE8FE'
          ctx.lineWidth = lineWidth
          ctx.stroke()

          // Progress ring
          if (progress > 0) {
            var startAngle = -Math.PI / 2
            var endAngle = startAngle + (progress / 100) * 2 * Math.PI
            ctx.beginPath()
            ctx.arc(cx, cy, radius, startAngle, endAngle)
            ctx.strokeStyle = '#8B6CF6'
            ctx.lineWidth = lineWidth
            ctx.lineCap = 'round'
            ctx.stroke()
          }
        } catch (e) {
          console.error('drawProgressRing inner error', e)
        }
      })
    } catch (e) {
      console.error('drawProgressRing error', e)
    }
  },

  onBackTap: function() {
    wx.navigateBack()
  },

  onMoreTap: function() {
    wx.showActionSheet({
      itemList: ['编辑项目', '删除项目'],
      success: function(res) {
        if (res.tapIndex === 1) {
          wx.showModal({
            title: '确认删除',
            content: '删除后不可恢复，确认删除该项目？',
            confirmColor: '#FF3B30',
            success: function(modalRes) {
              if (modalRes.confirm) {
                wx.navigateBack()
              }
            }
          })
        }
      }
    })
  },

  onMaterialTap: function(e) {
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status
    if (status === 'analyzing') {
      wx.navigateTo({ url: '/pages/analyzing/analyzing?id=' + id })
    } else if (status === 'completed') {
      wx.navigateTo({ url: '/pages/single-insight/single-insight?id=' + id })
    } else {
      wx.showToast({ title: '素材待处理', icon: 'none' })
    }
  },

  onFabTap: function() {
    this.setData({ showFabMenu: !this.data.showFabMenu })
  },

  onFabOverlayTap: function() {
    this.setData({ showFabMenu: false })
  },

  onFabRecord: function() {
    this.setData({ showFabMenu: false })
    wx.navigateTo({ url: '/pages/record/record' })
  },

  onFabImport: function() {
    this.setData({ showFabMenu: false })
    var projectId = this.data.project ? this.data.project.id : 'proj_001'
    wx.navigateTo({ url: '/pages/import/import?projectId=' + projectId })
  },

  onFabText: function() {
    this.setData({ showFabMenu: false })
    var projectId = this.data.project ? this.data.project.id : 'proj_001'
    wx.navigateTo({ url: '/pages/import/import?projectId=' + projectId + '&mode=text' })
  },

  onFabQuestionnaire: function() {
    this.setData({ showFabMenu: false })
    wx.navigateTo({ url: '/pages/questionnaire-import/questionnaire-import' })
  }
})
