// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    welcome: '软微小数据',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.updateUserInfoFromGlobal()
  },

  updateUserInfoFromGlobal(){
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo,
      userInfo: app.globalData.userInfo
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 似乎暂时并不需要放入app global data
        // app.globalData.userInfo = res.userInfo;
        // app.globalData.hasUserInfo = true;
        wx.setStorage({
          data: res.userInfo,
          key: 'userInfo',
        })
        wx.setStorage({
          data: true,
          key: 'hasUserInfo',
        })
      }
    })
  }
})
