var getWindowInfo = require('../../utils/util').getWindowInfo

Page({
  data: {
    isRecording: false,
    isPaused: false,
    timerDisplay: '00:00:00',
    seconds: 0,
    waveBars: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    markers: [],
    markersExpanded: false,
    projectId: '',
    materialId: '',
    statusBarHeight: 20
  },

  timerInterval: null,
  waveInterval: null,
  recorderManager: null,

  onLoad: function(options) {
    var sysInfo = getWindowInfo()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight || 20 })

    this.setData({
      projectId: options.projectId || '',
      materialId: options.materialId || ''
    });
    this.recorderManager = wx.getRecorderManager();

    var self = this
    this.recorderManager.onStop(function(res) {
      console.log('录音结束', res);
    });

    this.recorderManager.onError(function(err) {
      console.error('录音错误', err);
      wx.showToast({ title: '录音出错', icon: 'none' });
    });
  },

  onUnload: function() {
    this.clearTimers();
    if (this.data.isRecording) {
      this.recorderManager.stop();
    }
  },

  goBack: function() {
    var self = this
    if (this.data.isRecording) {
      wx.showModal({
        title: '确认退出',
        content: '正在录音中，确定要退出吗？',
        confirmColor: '#8B6CF6',
        success: function(res) {
          if (res.confirm) {
            self.clearTimers();
            self.recorderManager.stop();
            wx.navigateBack();
          }
        }
      });
    } else {
      wx.navigateBack();
    }
  },

  toggleRecording: function() {
    if (!this.data.isRecording && !this.data.isPaused) {
      this.startRecording();
    } else if (this.data.isRecording) {
      this.pauseRecording();
    } else if (this.data.isPaused) {
      this.resumeRecording();
    }
  },

  startRecording: function() {
    this.setData({ isRecording: true, isPaused: false });

    this.recorderManager.start({
      format: 'mp3',
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000
    });

    this.startTimer();
    this.startWaveAnimation();
  },

  pauseRecording: function() {
    this.setData({ isRecording: false, isPaused: true });
    this.recorderManager.pause();
    this.clearTimers();
  },

  resumeRecording: function() {
    this.setData({ isRecording: true, isPaused: false });
    this.recorderManager.resume();
    this.startTimer();
    this.startWaveAnimation();
  },

  stopRecording: function() {
    if (!this.data.isRecording && !this.data.isPaused) return;

    this.setData({ isRecording: false, isPaused: false });
    this.recorderManager.stop();
    this.clearTimers();

    wx.navigateTo({
      url: '/pages/analyzing/analyzing?materialId=' + this.data.materialId
    });
  },

  startTimer: function() {
    var self = this
    this.clearTimers();
    this.timerInterval = setInterval(function() {
      var seconds = self.data.seconds + 1;
      self.setData({
        seconds: seconds,
        timerDisplay: self.formatTime(seconds)
      });
    }, 1000);
  },

  startWaveAnimation: function() {
    var self = this
    if (this.waveInterval) clearInterval(this.waveInterval);
    this.waveInterval = setInterval(function() {
      var waveBars = self.data.waveBars.map(function() {
        return Math.floor(Math.random() * 140) + 20;
      });
      self.setData({ waveBars: waveBars });
    }, 120);
  },

  clearTimers: function() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.waveInterval) {
      clearInterval(this.waveInterval);
      this.waveInterval = null;
    }
  },

  padZero: function(num) {
    return num < 10 ? '0' + num : '' + num
  },

  formatTime: function(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return this.padZero(hours) + ':' + this.padZero(minutes) + ':' + this.padZero(seconds);
  },

  addMarker: function() {
    if (!this.data.isRecording && !this.data.isPaused) {
      wx.showToast({ title: '请先开始录音', icon: 'none' });
      return;
    }

    var markerNum = this.data.markers.length + 1;
    var marker = {
      time: this.data.timerDisplay,
      label: '标记点 ' + markerNum
    };

    var newMarkers = this.data.markers.slice()
    newMarkers.push(marker)
    this.setData({
      markers: newMarkers,
      markersExpanded: true
    });

    wx.showToast({ title: '已添加标记', icon: 'none', duration: 1000 });
  },

  toggleMarkers: function() {
    this.setData({
      markersExpanded: !this.data.markersExpanded
    });
  }
});
