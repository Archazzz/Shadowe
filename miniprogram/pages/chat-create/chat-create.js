Page({
  data: {
    statusBarHeight: 20,
    messages: [],
    inputText: '',
    isTyping: false,
    showDraft: false,
    draftData: {
      name: '',
      type: '',
      description: ''
    },
    scrollTarget: '',
    msgIdCounter: 0
  },

  // AI 对话阶段
  _chatPhase: 0,
  // 收集的用户信息
  _collectedInfo: {
    name: '',
    type: '',
    description: ''
  },

  onLoad: function() {
    var statusBarHeight = 20
    try {
      var sysInfo = wx.getSystemInfoSync()
      statusBarHeight = sysInfo.statusBarHeight || 20
    } catch (e) {}
    this.setData({
      statusBarHeight: statusBarHeight
    });

    // 初始 AI 问候
    this._addAIMessage(
      '你好！我是影察 AI 助手 🤖\n\n我可以帮你快速创建一个用户研究项目。让我先了解一些基本信息：\n\n你想研究什么产品或服务呢？',
      ['电商App', 'SaaS产品', '智能硬件', '其他']
    );
  },

  _genId: function() {
    this.data.msgIdCounter++;
    return 'msg-' + this.data.msgIdCounter;
  },

  _addAIMessage: function(content, suggestions) {
    var msg = {
      id: this._genId(),
      role: 'ai',
      content: content
    };
    if (suggestions) {
      msg.suggestions = suggestions;
    }
    var messages = this.data.messages.concat([msg]);
    this.setData({
      messages: messages,
      scrollTarget: 'msg-bottom'
    });
  },

  _addUserMessage: function(content) {
    var msg = {
      id: this._genId(),
      role: 'user',
      content: content
    };
    var messages = this.data.messages.concat([msg]);
    this.setData({
      messages: messages,
      scrollTarget: 'msg-bottom'
    });
  },

  _simulateAIReply: function(content, suggestions, delay) {
    var self = this
    this.setData({ isTyping: true, scrollTarget: 'msg-bottom' });

    setTimeout(function() {
      self.setData({ isTyping: false });
      self._addAIMessage(content, suggestions);
    }, delay || 1200);
  },

  onInputChange: function(e) {
    this.setData({
      inputText: e.detail.value
    });
  },

  onSuggestionTap: function(e) {
    var text = e.currentTarget.dataset.text;
    this.setData({ inputText: text });
    this._sendMessage(text);
  },

  onSend: function() {
    var text = this.data.inputText.trim();
    if (!text) return;
    this._sendMessage(text);
  },

  _sendMessage: function(text) {
    this._addUserMessage(text);
    this.setData({ inputText: '' });

    // 根据对话阶段处理
    switch (this._chatPhase) {
      case 0:
        // 收集产品/项目名称
        this._collectedInfo.name = text;
        this._chatPhase = 1;
        this._simulateAIReply(
          '了解！你想针对"' + text + '"进行用户研究。\n\n你更关注哪个研究方向呢？',
          ['JTBD（用户任务）', '用户画像', '概念测试', '不太确定']
        );
        break;

      case 1:
        // 收集研究类型
        this._collectedInfo.type = text;
        this._chatPhase = 2;
        this._simulateAIReply(
          '很好！最后，请简单描述一下你的研究目标或想解决的问题：',
          ['了解用户痛点', '验证产品概念', '探索新机会', '优化现有功能']
        );
        break;

      case 2:
        // 收集描述，生成草稿
        this._collectedInfo.description = text;
        this._chatPhase = 3;
        this._simulateAIReply(
          '收到！我已经根据我们的对话生成了一份项目草稿，请查看：',
          null,
          1500
        );

        // 延迟显示草稿卡片
        var self = this
        setTimeout(function() {
          self.setData({
            showDraft: true,
            draftData: {
              name: self._collectedInfo.name,
              type: self._formatType(self._collectedInfo.type),
              description: self._collectedInfo.description
            },
            scrollTarget: 'msg-bottom'
          });
        }, 2800);
        break;

      default:
        // 对话结束后，用户仍可发消息
        this._simulateAIReply(
          '项目草稿已经生成啦！你可以点击"修改"或"确认创建"。如果还有其他想法，也可以继续告诉我 ✨',
          null
        );
        break;
    }
  },

  _formatType: function(type) {
    if (type.indexOf('JTBD') >= 0 || type.indexOf('任务') >= 0) return 'JTBD';
    if (type.indexOf('画像') >= 0 || type.indexOf('Persona') >= 0) return '用户画像';
    if (type.indexOf('概念') >= 0 || type.indexOf('测试') >= 0) return '概念测试';
    return type;
  },

  onEditDraft: function() {
    wx.navigateTo({
      url: '/pages/new-project/new-project?name=' + encodeURIComponent(this.data.draftData.name) + '&type=' + encodeURIComponent(this.data.draftData.type) + '&desc=' + encodeURIComponent(this.data.draftData.description)
    });
  },

  onConfirmDraft: function() {
    var draftData = this.data.draftData;
    wx.showLoading({ title: '创建中...' });

    setTimeout(function() {
      wx.hideLoading();
      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration: 1500
      });

      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/project-detail/project-detail?name=' + encodeURIComponent(draftData.name) + '&type=' + encodeURIComponent(draftData.type) + '&desc=' + encodeURIComponent(draftData.description)
        });
      }, 1500);
    }, 800);
  },

  onBack: function() {
    wx.navigateBack({
      delta: 1,
      fail: function() {
        wx.switchTab({ url: '/pages/home/home' });
      }
    });
  },

  onSkip: function() {
    wx.redirectTo({
      url: '/pages/new-project/new-project'
    });
  }
});
