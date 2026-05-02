var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    statusBarHeight: 20,
    projectName: '',
    selectedType: '',
    projectDesc: '',
    canCreate: false
  },

  onLoad: function() {
    var sysInfo = getWindowInfo();
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight || 20
    });
  },

  onProjectNameInput: function(e) {
    var self = this
    this.setData({
      projectName: e.detail.value
    }, function() {
      self._updateCanCreate()
    });
  },

  onProjectDescInput: function(e) {
    this.setData({
      projectDesc: e.detail.value
    });
  },

  onSelectType: function(e) {
    var self = this
    var type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: this.data.selectedType === type ? '' : type
    }, function() {
      self._updateCanCreate()
    });
  },

  _updateCanCreate: function() {
    var projectName = this.data.projectName
    var selectedType = this.data.selectedType
    this.setData({
      canCreate: projectName.trim().length > 0 && selectedType.length > 0
    });
  },

  onBack: function() {
    wx.navigateBack({
      delta: 1,
      fail: function() {
        wx.switchTab({ url: '/pages/home/home' });
      }
    });
  },

  onGoChatCreate: function() {
    wx.navigateTo({
      url: '/pages/chat-create/chat-create'
    });
  },

  onCreate: function() {
    if (!this.data.canCreate) return;

    var projectName = this.data.projectName
    var selectedType = this.data.selectedType
    var projectDesc = this.data.projectDesc

    wx.showLoading({ title: '创建中...' });

    // 模拟创建项目
    setTimeout(function() {
      wx.hideLoading();

      // 构建项目数据
      var projectData = {
        name: projectName.trim(),
        type: selectedType,
        description: projectDesc.trim()
      };

      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration: 1500
      });

      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/project-detail/project-detail?name=' + encodeURIComponent(projectData.name) + '&type=' + encodeURIComponent(projectData.type) + '&desc=' + encodeURIComponent(projectData.description)
        });
      }, 1500);
    }, 800);
  }
});
