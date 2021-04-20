// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylist:[{title:"Josh"}, {title:"James"}],
    newlist:[{title:"Josh"}, {title:"James"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  change:function(){
    let that = this;
    wx.request({
      url: 'http://blogapi.zhangqx.com/bloglist', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData({
          mylist:res.data.data,
          newlist:[{title:"Tim"},{title:"Tom"}]
        })
      }
    })
  },

  login:function(){
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
            console.log("RES.DATA IS: ");
            console.log(res.data[0].user_id);
            wx.setStorageSync('user_id', res.data[0].user_id);
          }
        })
      }
    })
  }
})