// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 把内存中的login信息转移到global data中，包含布尔logged和user_id
    updateGlobalDataLogin(this);
    console.log(this.globalData)
    // 看看是否已登录，未登录则登录
    if(!this.globalData.logged){
      let that = this;
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("CODE IS: "+res.code);
          wx.request({
            url: 'https://charlesianmotion.top/getcode',
            data:{
              abc:res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log("RES.DATA.USER_ID IS: ");
              console.log(res.data[0].user_id);
              wx.setStorageSync('user_id', res.data[0].user_id);
              updateGlobalDataLogin(that);
            }
          })
        }
      })
    }

  },
  globalData: {
    userInfo: null
  }
})

function updateGlobalDataLogin(object){// object should be "this" which is the App object.
try {
  var user_id = wx.getStorageSync('user_id')
  if (user_id) {
    object.globalData.logged = true,
    object.globalData.user_id = user_id
  }
} catch (e) {
  object.globalData.logged = false,
  object.globalData.user_id = undefined
}
}