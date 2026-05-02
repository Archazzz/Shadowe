Component({
  data: {
    selected: 0,
    showCreateSheet: false,
    list: [
      { pagePath: "/pages/home/home", text: "首页" },
      { pagePath: "/pages/profile/profile", text: "我的" }
    ]
  },
  methods: {
    switchTab: function(e) {
      var idx = e.currentTarget.dataset.index
      var url = this.data.list[idx].pagePath
      wx.switchTab({ url: url })
    },
    onCreateTap: function() {
      this.setData({ showCreateSheet: true })
    },
    onCloseSheet: function() {
      this.setData({ showCreateSheet: false })
    },
    onChatCreate: function() {
      this.setData({ showCreateSheet: false })
      wx.navigateTo({ url: '/pages/chat-create/chat-create' })
    },
    onFormCreate: function() {
      this.setData({ showCreateSheet: false })
      wx.navigateTo({ url: '/pages/new-project/new-project' })
    },
    preventBubble: function() {}
  }
})
