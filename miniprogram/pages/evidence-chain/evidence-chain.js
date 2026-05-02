// pages/evidence-chain/evidence-chain.js
Page({
  data: {
    insightTitle: '安装体验是最大阻力',
    insightDesc: '3/4 受访者在安装环节遭遇严重挫折，平均花费 2.3 小时',
    evidences: [
      { id: 'ev1', userName: '张先生', timestamp: '02:34', type: 'audio', quote: '太复杂了，我不想填这么多信息…' },
      { id: 'ev2', userName: '李女士', timestamp: '05:12', type: 'audio', quote: '我试了三次都没装成功，最后放弃了。' },
      { id: 'ev3', userName: '王先生', timestamp: '—', type: 'text', quote: '说明书看不太懂，网上也找不到教程。' },
      { id: 'ev4', userName: '赵女士', timestamp: '01:45', type: 'audio', quote: '能不能像手机那样开箱即用？' }
    ],
    showAudioPlayer: false,
    playingId: '',
    isPlaying: false,
    crossValidation: [
      { label: '多受访者印证', pass: true },
      { label: '与问卷数据一致', pass: true },
      { label: '样本代表性充分', pass: false }
    ],
    statusBarHeight: 20
  },

  onLoad: function(options) {
    var statusBarHeight = 20
    try {
      var sysInfo = wx.getSystemInfoSync()
      statusBarHeight = sysInfo.statusBarHeight || 20
    } catch (e) {}
    this.setData({ statusBarHeight: statusBarHeight })
  },

  onBack() {
    wx.navigateBack()
  },

  onPlayTap(e) {
    var id = e.currentTarget.dataset.id
    if (this.data.playingId === id && this.data.showAudioPlayer && this.data.isPlaying) {
      this.setData({ isPlaying: false })
    } else if (this.data.playingId === id && this.data.showAudioPlayer) {
      this.setData({ showAudioPlayer: false, playingId: '', isPlaying: false })
    } else {
      this.setData({ showAudioPlayer: true, playingId: id, isPlaying: true })
    }
  },

  togglePlay() {
    this.setData({ isPlaying: !this.data.isPlaying })
  },

  closePlayer() {
    this.setData({ showAudioPlayer: false, playingId: '', isPlaying: false })
  }
})
