/**
 * 格式化时间
 */
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 格式化录音时长
 */
function formatDuration(seconds) {
  var h = Math.floor(seconds / 3600)
  var m = Math.floor((seconds % 3600) / 60)
  var s = seconds % 60
  if (h > 0) {
    return padZero(h) + ':' + padZero(m) + ':' + padZero(s)
  }
  return padZero(m) + ':' + padZero(s)
}

function padZero(num) {
  return num < 10 ? '0' + num : '' + num
}

/**
 * 获取系统信息（兼容真机低版本微信）
 */
function getWindowInfo() {
  try {
    if (wx.getWindowInfo) {
      return wx.getWindowInfo()
    }
    var sysInfo = wx.getSystemInfoSync()
    return {
      pixelRatio: sysInfo.pixelRatio,
      screenWidth: sysInfo.screenWidth,
      screenHeight: sysInfo.screenHeight,
      windowWidth: sysInfo.windowWidth,
      windowHeight: sysInfo.windowHeight,
      statusBarHeight: sysInfo.statusBarHeight
    }
  } catch (e) {
    return {
      pixelRatio: 2,
      screenWidth: 375,
      screenHeight: 812,
      windowWidth: 375,
      windowHeight: 812,
      statusBarHeight: 20
    }
  }
}

module.exports = {
  formatTime,
  formatDuration,
  padZero,
  getWindowInfo
}
