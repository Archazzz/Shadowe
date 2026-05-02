var mockQuestionnaireCandidates = require('../../utils/mockData').mockQuestionnaireCandidates

Page({
  data: {
    projectId: '',
    statusBarHeight: 20,
    currentStep: 0,
    steps: ['导入', '筛选', '访谈问题'],
    importMethod: '', // 'file' or 'paste'
    importedData: null,
    dataPreview: [],
    qualityBadges: [],
    // Step 1 - Screening
    candidates: [],
    selectedStrategy: -1,
    strategies: [
      { id: 'deep', icon: '🔍', name: '深度洞察者', desc: '善于表达深层思考' },
      { id: 'pain', icon: '💡', name: '痛点挖掘', desc: '极端不满用户优先' },
      { id: 'typical', icon: '👥', name: '典型用户', desc: '角色匹配度最高' },
      { id: 'value', icon: '⭐', name: '高价值客户', desc: '商业价值潜力大' }
    ],
    summaryInfo: { total: 500, candidates: 25, confidence: 92 },
    expandedCandidate: -1,
    // Step 2 - Interview Questions
    interviewQuestions: [],
    ctaText: '开始AI筛选',
    isProcessing: false
  },

  onLoad: function(options) {
    var statusBarHeight = 20
    try {
      var sysInfo = wx.getSystemInfoSync()
      statusBarHeight = sysInfo.statusBarHeight || 20
    } catch (e) {}
    this.setData({ statusBarHeight: statusBarHeight })

    var projectId = options.projectId || 'proj_001'
    this.setData({ projectId: projectId })
  },

  // Step navigation
  onStepTap: function(e) {
    var step = e.currentTarget.dataset.step
    if (step < this.data.currentStep) {
      this.setData({ currentStep: step })
      this.updateCTA(step)
    }
  },

  // Import methods
  onUploadFile: function() {
    var self = this
    this.setData({ isProcessing: true })
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['csv', 'xlsx', 'xls'],
      success: function(res) {
        self.simulateImport('file', res.tempFiles[0].name)
      },
      fail: function() {
        self.simulateImport('file', '问卷数据.csv')
      }
    })
  },

  onPasteData: function() {
    this.setData({ isProcessing: true })
    this.simulateImport('paste', '粘贴导入')
  },

  simulateImport: function(method, source) {
    var self = this
    setTimeout(function() {
      var dataPreview = [
        { id: 1, q1: '非常满意', q2: '每天使用', q3: '希望能简化操作流程，目前步骤太多', quality: 'high' },
        { id: 2, q1: '不满意', q2: '每周1-2次', q3: '价格太贵了，而且经常出bug，体验很差', quality: 'high' },
        { id: 3, q1: '一般', q2: '偶尔使用', q3: '还行', quality: 'low' },
        { id: 4, q1: '满意', q2: '每天使用', q3: '整体不错，如果能增加团队协作功能就更好了', quality: 'medium' },
        { id: 5, q1: '非常不满意', q2: '已停用', q3: '安装太复杂了，折腾了两天才搞定，差点放弃', quality: 'high' }
      ]
      var qualityBadges = [
        { label: '有效问卷', count: 487, color: '#34C759' },
        { label: '低质量', count: 10, color: '#FF9500' },
        { label: '无效问卷', count: 3, color: '#FF3B30' }
      ]
      self.setData({
        importMethod: method,
        importedData: { source: source, totalRows: 500, validRows: 487 },
        dataPreview: dataPreview,
        qualityBadges: qualityBadges,
        isProcessing: false
      })
    }, 1500)
  },

  // Strategy selection
  onSelectStrategy: function(e) {
    var idx = e.currentTarget.dataset.index
    this.setData({ selectedStrategy: idx })
  },

  // Expand/collapse candidate
  onToggleCandidate: function(e) {
    var idx = e.currentTarget.dataset.index
    this.setData({
      expandedCandidate: this.data.expandedCandidate === idx ? -1 : idx
    })
  },

  // CTA button
  onCTATap: function() {
    var self = this
    var step = this.data.currentStep
    if (step === 0 && this.data.importedData) {
      this.setData({ currentStep: 1, ctaText: '生成访谈问题' })
    } else if (step === 1 && this.data.selectedStrategy >= 0) {
      this.setData({ isProcessing: true })
      setTimeout(function() {
        self.generateInterviewQuestions()
        self.setData({ currentStep: 2, ctaText: '导出全部问题', isProcessing: false })
      }, 2000)
    } else if (step === 2) {
      this.exportAll()
    }
  },

  generateInterviewQuestions: function() {
    var candidates = mockQuestionnaireCandidates
    var questions = candidates.map(function(c) {
      return {
        candidateId: c.id,
        score: c.score,
        reason: c.reason,
        questions: [
          {
            type: '开场',
            typeColor: '#8B6CF6',
            text: '您好，感谢参与本次访谈。我注意到您在问卷中提到了一些很有价值的观点，能具体聊聊吗？',
            followUp: '关注用户参与动机'
          },
          {
            type: '深挖',
            typeColor: '#FF6B9D',
            text: '您提到"' + c.reason.substring(0, 15) + '..."，能详细说说当时的感受和想法吗？',
            followUp: '追问具体场景与情绪'
          },
          {
            type: '验证',
            typeColor: '#34C759',
            text: '如果有一个方案能解决您提到的这些问题，您愿意付出什么？',
            followUp: '验证需求真实度'
          }
        ]
      }
    })
    this.setData({ interviewQuestions: questions })
  },

  exportAll: function() {
    wx.showModal({
      title: '导出成功',
      content: '已为4位候选人生成12个访谈问题，可前往项目详情查看',
      showCancel: false,
      confirmColor: '#8B6CF6'
    })
  },

  updateCTA: function(step) {
    var ctaTexts = ['开始AI筛选', '生成访谈问题', '导出全部问题']
    this.setData({ ctaText: ctaTexts[step] })
  },

  // Back
  onBack: function() {
    wx.navigateBack({ delta: 1 })
  },

  onClose: function() {
    wx.navigateBack({ delta: 1 })
  }
})
