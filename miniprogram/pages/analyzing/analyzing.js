var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    materialId: '',
    materialName: '录音素材',
    progressPercent: 0,
    isComplete: false,
    statusBarHeight: 20,
    steps: [
      {
        id: 1,
        agent: 'Kate',
        title: '转写引擎',
        desc: '语音转写&降噪',
        status: 'pending',
        duration: 3000
      },
      {
        id: 2,
        agent: 'Kate',
        title: '洞察引擎',
        desc: '痛点&需求提炼',
        status: 'pending',
        duration: 5000
      },
      {
        id: 3,
        agent: 'Steven',
        title: '验证引擎',
        desc: '交叉验证&置信度',
        status: 'pending',
        duration: 4000
      },
      {
        id: 4,
        agent: 'Steven',
        title: '洞察引擎',
        desc: '商业洞察生成',
        status: 'pending',
        duration: 3000
      }
    ],
    funTexts: [
      'AI 正在仔细聆听每一段语音...',
      '正在识别用户情感变化的关键时刻...',
      '发现潜在需求模式中...',
      '交叉验证多个数据源...',
      '深度分析用户行为背后的动机...',
      '构建用户画像与需求图谱...'
    ],
    funText: 'AI 正在仔细聆听每一段语音...',
    funTextIndex: 0
  },

  stepTimers: [],
  funTextTimer: null,

  onLoad: function(options) {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })

    this.setData({
      materialId: options.materialId || ''
    })
    this.startAnalysis()
    this.startFunTextRotation()
  },

  onUnload: function() {
    this.clearAllTimers()
  },

  goBack: function() {
    this.clearAllTimers()
    wx.navigateBack()
  },

  startAnalysis: function() {
    var steps = this.data.steps
    var totalDuration = 0
    for (var i = 0; i < steps.length; i++) {
      totalDuration += steps[i].duration
    }
    var currentStep = 0
    var elapsedTotal = 0
    var self = this

    var runStep = function(index) {
      if (index >= steps.length) {
        self.setData({ isComplete: true })
        return
      }

      var stepDuration = steps[index].duration
      var updatedSteps = self.data.steps.map(function(s, i) {
        var copy = {}
        for (var key in s) {
          copy[key] = s[key]
        }
        if (i < index) { copy.status = 'completed'; return copy }
        if (i === index) { copy.status = 'active'; return copy }
        copy.status = 'pending'
        return copy
      })

      self.setData({ steps: updatedSteps })

      var progressStart = elapsedTotal
      var progressEnd = elapsedTotal + stepDuration
      var progressInterval = 100
      var progressElapsed = 0

      var timer = setInterval(function() {
        progressElapsed += progressInterval
        var currentProgress = Math.min(
          Math.round(((progressStart + progressElapsed) / totalDuration) * 100),
          Math.round((progressEnd / totalDuration) * 100)
        )
        self.setData({ progressPercent: currentProgress })

        if (progressElapsed >= stepDuration) {
          clearInterval(timer)
          elapsedTotal += stepDuration
          runStep(index + 1)
        }
      }, progressInterval)

      self.stepTimers.push(timer)
    }

    runStep(0)
  },

  startFunTextRotation: function() {
    var self = this
    this.funTextTimer = setInterval(function() {
      var nextIndex = (self.data.funTextIndex + 1) % self.data.funTexts.length
      self.setData({
        funTextIndex: nextIndex,
        funText: self.data.funTexts[nextIndex]
      })
    }, 3000)
  },

  clearAllTimers: function() {
    for (var i = 0; i < this.stepTimers.length; i++) {
      clearInterval(this.stepTimers[i])
    }
    this.stepTimers = []
    if (this.funTextTimer) {
      clearInterval(this.funTextTimer)
      this.funTextTimer = null
    }
  },

  viewResults: function() {
    wx.redirectTo({
      url: '/pages/single-insight/single-insight?materialId=' + this.data.materialId
    })
  }
})
