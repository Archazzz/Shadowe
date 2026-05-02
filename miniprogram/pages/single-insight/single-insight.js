// pages/single-insight/single-insight.js
var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    statusBarHeight: 20,
    activeFilter: 'all',
    filterTabs: [
      { id: 'all', label: '全部', count: 12 },
      { id: 'pain', label: '痛点', count: 5 },
      { id: 'need', label: '需求', count: 4 },
      { id: 'behavior', label: '行为', count: 2 },
      { id: 'suggest', label: '建议', count: 1 }
    ],
    insights: [],
    filteredInsights: []
  },

  onLoad: function(options) {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })

    // Mock insight data matching the Figma design
    var insights = [
      {
        id: 'i1',
        category: 'pain',
        categoryLabel: '痛点',
        frequency: 'high',
        frequencyLabel: '高频',
        title: '安装流程过于复杂，用户在关键步骤大量流失',
        desc: '说明书难以理解，网上缺乏教学资源，导致用户反复受挫。',
        quote: '太复杂了，我不想填这么多信息……',
        relatedInterviews: 8,
        impact: 92,
        impactColor: '#FF6B6B',
        avatarColors: ['#8B6CF6', '#FF6B9D', '#FF9500', '#4D9EFF', '#34C759'],
        extra: 5
      },
      {
        id: 'i2',
        category: 'need',
        categoryLabel: '需求',
        frequency: 'high',
        frequencyLabel: '高频',
        title: '用户希望有快速配置与一键引导方式',
        desc: '用户期望减少手动步骤，通过自动检测完成大部分配置。',
        quote: '能不能开箱即用？就像手机一样直接连上就好了。',
        relatedInterviews: 8,
        impact: 78,
        impactColor: '#FF6B6B',
        avatarColors: ['#8B6CF6', '#FF6B9D', '#34C759'],
        extra: 3
      },
      {
        id: 'i3',
        category: 'behavior',
        categoryLabel: '行为',
        frequency: 'mid',
        frequencyLabel: '中频',
        title: '用户查看价格信息时停留时间明显偏长',
        desc: '用户在价格页面反复对比，表现出明显的决策焦虑。',
        quote: '我想知道到底贵在哪里，看不到明细不敢买。',
        relatedInterviews: 5,
        impact: 64,
        impactColor: '#FF9500',
        avatarColors: ['#8B6CF6', '#FF9500'],
        extra: 2
      },
      {
        id: 'i4',
        category: 'suggest',
        categoryLabel: '建议',
        frequency: 'low',
        frequencyLabel: '低频',
        title: '增加设备健康检测与主动推送提醒功能',
        desc: '用户希望系统能主动告知异常，而非等待用户自行检查。',
        quote: '离家之后才发现设备断了，回来才知道，太晚了。',
        relatedInterviews: 3,
        impact: 55,
        impactColor: '#8B6CF6',
        avatarColors: ['#B49DFB', '#4D9EFF'],
        extra: 1
      }
    ]

    // Calculate impact ring degree (0-360)
    var processedInsights = insights.map(function(item) {
      var copy = {}
      for (var key in item) {
        copy[key] = item[key]
      }
      copy.impactDeg = (item.impact / 100) * 360
      return copy
    })

    this.setData({
      insights: processedInsights,
      filteredInsights: processedInsights
    })
  },

  onReady: function() {
    // Draw all impact rings after page renders
    var self = this
    setTimeout(function() {
      self.drawAllImpactRings()
    }, 300)
  },

  drawAllImpactRings: function() {
    var insights = this.data.filteredInsights
    for (var i = 0; i < insights.length; i++) {
      this.drawImpactRing(insights[i].id, insights[i].impact, insights[i].impactColor)
    }
  },

  drawImpactRing: function(itemId, impact, color) {
    try {
      var query = wx.createSelectorQuery()
      query.select('#impactCanvas_' + itemId).fields({ node: true, size: true }).exec(function(res) {
        try {
          if (!res || !res[0] || !res[0].node) return
          var canvas = res[0].node
          var ctx = canvas.getContext('2d')
          if (!ctx) return
          var dpr = getWindowInfo().pixelRatio || 2
          var size = 72
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
          ctx.strokeStyle = 'rgba(255,255,255,0.07)'
          ctx.lineWidth = lineWidth
          ctx.stroke()

          // Progress ring
          if (impact > 0) {
            var startAngle = -Math.PI / 2
            var endAngle = startAngle + (impact / 100) * 2 * Math.PI
            ctx.beginPath()
            ctx.arc(cx, cy, radius, startAngle, endAngle)
            ctx.strokeStyle = color
            ctx.lineWidth = lineWidth
            ctx.lineCap = 'round'
            ctx.stroke()
          }
        } catch (e) {
          console.error('drawImpactRing inner error', e)
        }
      })
    } catch (e) {
      console.error('drawImpactRing error', e)
    }
  },

  onFilterTap: function(e) {
    var id = e.currentTarget.dataset.id
    var filtered = this.data.insights
    if (id !== 'all') {
      filtered = this.data.insights.filter(function(i) { return i.category === id })
    }
    this.setData({ activeFilter: id, filteredInsights: filtered })

    // Redraw impact rings for filtered items
    var self = this
    setTimeout(function() {
      for (var i = 0; i < filtered.length; i++) {
        self.drawImpactRing(filtered[i].id, filtered[i].impact, filtered[i].impactColor)
      }
    }, 100)
  },

  onBack: function() {
    wx.navigateBack()
  },

  onViewEvidence: function(e) {
    wx.navigateTo({ url: '/pages/evidence-chain/evidence-chain' })
  },

  onViewReport: function() {
    wx.navigateTo({ url: '/pages/report/report' })
  },

  onGenerateReport: function() {
    wx.navigateTo({ url: '/pages/report/report' })
  }
})
