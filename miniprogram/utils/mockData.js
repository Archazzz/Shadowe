// ===== 全局 Mock 数据 =====

var mockUser = {
  id: "u_001",
  name: "研究员小李",
  avatar: null,
  totalProjects: 5,
  totalInterviews: 18,
  totalHours: "12小时40分",
  weeklyAnalyzed: 3,
  weeklyHours: "5小时20分",
  plan: 'free',
  expiryDate: '2026.12.31'
}

var mockProjects = [
  {
    id: "proj_001",
    name: "智能家居用户研究",
    type: "JTBD",
    description: "探索用户在智能家居场景下的核心任务与动机",
    totalMaterials: 4,
    analyzedCount: 3,
    pendingCount: 1,
    progress: 75,
    status: "analyzing",
    createdAt: "2026-04-20",
    updatedAt: "2026-04-30 10:23"
  },
  {
    id: "proj_002",
    name: "年轻妈妈群体画像",
    type: "persona",
    description: "构建25-35岁新手妈妈的用户画像",
    totalMaterials: 2,
    analyzedCount: 2,
    pendingCount: 0,
    progress: 100,
    status: "completed",
    createdAt: "2026-04-15",
    updatedAt: "2026-04-28 14:05"
  },
  {
    id: "proj_003",
    name: "新版功能概念测试",
    type: "concept_test",
    description: "测试用户对新工作流功能的接受度",
    totalMaterials: 1,
    analyzedCount: 0,
    pendingCount: 1,
    progress: 0,
    status: "pending",
    createdAt: "2026-04-29",
    updatedAt: "2026-04-29 09:00"
  }
]

var mockMaterials = [
  {
    id: "mat_001",
    projectId: "proj_001",
    name: "访谈1-张先生",
    type: "audio",
    duration: "45min",
    size: "28MB",
    status: "completed",
    createdAt: "2026-04-22 10:00"
  },
  {
    id: "mat_002",
    projectId: "proj_001",
    name: "访谈1-文字稿",
    type: "text",
    wordCount: "3200字",
    importMethod: "粘贴导入",
    status: "completed",
    createdAt: "2026-04-22 11:30"
  },
  {
    id: "mat_003",
    projectId: "proj_001",
    name: "访谈2-李女士",
    type: "audio",
    duration: "32min",
    size: "20MB",
    status: "analyzing",
    createdAt: "2026-04-25 14:00"
  },
  {
    id: "mat_004",
    projectId: "proj_001",
    name: "用户问卷数据",
    type: "questionnaire",
    responseCount: "500条",
    status: "pending",
    createdAt: "2026-04-29 09:00"
  }
]

var mockInsight = {
  materialId: "mat_001",
  userName: "张先生",
  duration: "45min",
  quality: "良",
  confidenceLevel: "L1",
  persona: {
    ageRange: "28-35岁",
    occupation: "互联网产品经理",
    note: "基于访谈内容推测，需验证"
  },
  painPoints: [
    {
      level: "P0",
      title: "安装流程太复杂",
      quote: "我花了整整两天才装好，说明书根本看不懂……",
      timestamp: "12:34"
    },
    {
      level: "P1",
      title: "价格不透明",
      quote: "官网上看不到真实价格，要联系销售才报价……",
      timestamp: "08:15"
    },
    {
      level: "P2",
      title: "APP经常断连",
      quote: "有时候打开APP发现设备离线，很烦躁……",
      timestamp: "23:41"
    }
  ],
  needs: {
    functional: ["一键配置", "远程控制", "设备联动"],
    emotional: ["安全感", "掌控感"],
    social: ["向朋友展示智能家居"]
  },
  emotion: {
    overall: "中性偏负面",
    timeline: [
      { time: "08:30", label: "中性→挫败（提到安装）" },
      { time: "15:20", label: "挫败→兴奋（提到功能）" },
      { time: "35:00", label: "兴奋→担忧（提到价格）" }
    ]
  },
  keyQuotes: [
    {
      text: "我试着用了三次，每次都被复杂的设置流程劝退。",
      timestamp: "05:23"
    },
    {
      text: "如果能像手机一样开箱即用，我愿意多花两千块。",
      timestamp: "28:10"
    }
  ],
  openQuestions: ["预算范围未明确", "家庭成员意见未充分收集"]
}

var mockReport = {
  projectId: "proj_001",
  projectName: "智能家居用户研究",
  generatedAt: "2026-04-30",
  execSummary:
    "基于4个访谈素材的综合分析，发现用户核心痛点集中在「安装复杂度」和「价格透明度」两个维度，建议优先优化新手引导流程，预计可将转化率提升20-30%。",
  keyFindings: [
    {
      id: "f1",
      title: "安装体验是最大阻力",
      confidence: "L1",
      description: "3/4受访者在安装环节遭遇严重挫折，平均花费2.3小时完成首次安装",
      evidence: 4
    },
    {
      id: "f2",
      title: "价格透明度影响决策",
      confidence: "L1",
      description: "所有受访者均提到价格不透明问题，其中2人因此推迟购买决策",
      evidence: 3
    },
    {
      id: "f3",
      title: "远程控制是核心价值感知",
      confidence: "L2",
      description: "2/4受访者将远程控制列为购买智能家居的首要原因",
      evidence: 2
    }
  ],
  personas: [
    { name: "效率追求者", count: 2, color: "#8B6CF6" },
    { name: "品质生活者", count: 1, color: "#B49DFB" },
    { name: "技术爱好者", count: 1, color: "#D4C8FD" }
  ],
  recommendations: [
    {
      what: "重设计新手引导流程",
      why: "降低安装门槛",
      who: "产品+设计团队",
      when: "Q2 2026",
      killCriteria: "若NPS < 30则中止"
    },
    {
      what: "上线实时报价系统",
      why: "解决价格透明度",
      who: "商业团队",
      when: "Q3 2026",
      killCriteria: "转化率未提升5%则回滚"
    }
  ]
}

var mockEvidences = [
  {
    id: "ev1",
    userId: "mat_001",
    userName: "张先生",
    quote: "我花了整整两天才装好，说明书根本看不懂，网上也找不到视频教程。",
    timestamp: "12:34",
    type: "audio"
  },
  {
    id: "ev2",
    userId: "mat_003",
    userName: "李女士",
    quote: "安装的时候一直弹错误提示，打了三次客服电话才搞定，太崩溃了。",
    timestamp: "08:22",
    type: "audio"
  },
  {
    id: "ev3",
    userId: "mat_002",
    userName: "张先生（文字稿）",
    quote: "整个配置过程完全没有引导，必须自己摸索，新用户根本不知道从哪里开始。",
    timestamp: "—",
    type: "text"
  }
]

var mockQuestionnaireCandidates = [
  {
    id: "U_4821",
    score: 95,
    rank: 1,
    stars: 5,
    reason: "开放题回答平均350字，提到3个核心痛点",
    dimensions: { answerQuality: 95, extremity: 88, roleMatch: 92, expressiveness: 97, reliability: 90 }
  },
  {
    id: "U_3156",
    score: 91,
    rank: 2,
    stars: 4,
    reason: "NPS评分为1但详细说明了改进建议",
    dimensions: { answerQuality: 90, extremity: 95, roleMatch: 85, expressiveness: 88, reliability: 91 }
  },
  {
    id: "U_1029",
    score: 88,
    rank: 3,
    stars: 4,
    reason: "量表题与开放题存在矛盾，值得深挖",
    dimensions: { answerQuality: 82, extremity: 90, roleMatch: 88, expressiveness: 85, reliability: 87 }
  },
  {
    id: "U_2847",
    score: 84,
    rank: 4,
    stars: 3,
    reason: "重度用户，使用频率最高",
    dimensions: { answerQuality: 80, extremity: 78, roleMatch: 92, expressiveness: 82, reliability: 86 }
  }
]

var recentActivities = [
  { id: "a1", type: "completed", icon: "check", text: "智能家居研究 分析完成", time: "10:23" },
  { id: "a2", type: "recording", icon: "clock", text: "访谈2-李女士 录音中", time: "09:15" },
  { id: "a3", type: "imported", icon: "circle", text: "年轻妈妈画像 文字稿已导入", time: "昨天" }
]

var typeConfig = {
  JTBD: { icon: '🎯', color: '#8B6CF6', label: 'JTBD' },
  persona: { icon: '👥', color: '#FF6B9D', label: '用户画像' },
  concept_test: { icon: '💡', color: '#FF9500', label: '概念测试' }
}

var statusConfig = {
  completed: { icon: '✅', label: '分析完成', color: '#34C759' },
  analyzing: { icon: '⏳', label: '分析中', color: '#FF9500' },
  pending: { icon: '⭕', label: '待处理', color: '#9999AA' }
}

module.exports = {
  mockUser: mockUser,
  mockProjects: mockProjects,
  mockMaterials: mockMaterials,
  mockInsight: mockInsight,
  mockReport: mockReport,
  mockEvidences: mockEvidences,
  mockQuestionnaireCandidates: mockQuestionnaireCandidates,
  recentActivities: recentActivities,
  typeConfig: typeConfig,
  statusConfig: statusConfig
}
