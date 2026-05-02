// pages/report/report.js
var mockReport = {
  generatedAt: '2026-01-15 14:32',
  execSummary: '本次研究共完成 4 次深度访谈，覆盖 3 类用户角色（新用户、进阶用户、专家用户）。核心发现：安装流程复杂度是最大的使用阻力，影响超过 75% 的受访者；用户对"一键配置"功能的需求最为强烈，且愿意为此支付溢价。',
  keyFindings: [
    { id: 'f1', title: '安装流程过于复杂，导致大量流失', description: '说明书难以理解，网上缺乏教学资源，导致用户反复受挫并放弃安装过程。', evidence: 3, confidence: 'L1', percent: 75 },
    { id: 'f2', title: '用户期望一键引导式配置', description: '减少手动步骤、自动检测网络环境是用户最期待的功能点。', evidence: 5, confidence: 'L1', percent: 90 },
    { id: 'f3', title: '价格透明度影响购买决策', description: '用户在价格页面反复对比，表现出明显的决策焦虑和信任问题。', evidence: 2, confidence: 'L2', percent: 50 }
  ],
  personas: [
    { name: '技术新手', count: 2 },
    { name: '效率追求者', count: 5 },
    { name: '专业玩家', count: 3 }
  ],
  recommendations: [
    { what: '简化安装向导', why: '降低流失率', who: '产品团队', when: 'Q2', killCriteria: '如果流失率未降至20%以下' },
    { what: '增加一键配网', why: '满足核心需求', who: '工程团队', when: 'Q2', killCriteria: '如果NPS提升不足10点' }
  ]
}

Page({
  data: {
    report: null,
    statusBarHeight: 20,
    collapsedSections: {
      findings: false,
      personas: false,
      recommendations: false
    }
  },

  onLoad: function(options) {
    var statusBarHeight = 20
    try {
      var sysInfo = wx.getSystemInfoSync()
      statusBarHeight = sysInfo.statusBarHeight || 20
    } catch (e) {}
    this.setData({ statusBarHeight: statusBarHeight, report: mockReport })
  },

  toggleSection(e) {
    var key = e.currentTarget.dataset.key
    var data = {}
    data['collapsedSections.' + key] = !this.data.collapsedSections[key]
    this.setData(data)
  },

  onBack() {
    wx.navigateBack()
  },

  onExportTap() {
    wx.navigateTo({ url: '/pages/export/export?projectId=proj_001' })
  },

  onViewEvidence(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/evidence-chain/evidence-chain' })
  }
})
