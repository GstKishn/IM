//index.js
//获取应用实例
const app = getApp()

let store = app.store
import IMController from '../../controller/im.js'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 当前账号登陆，调用IMController这个实例
    new IMController({
      
      // 真正开发的时候要注意 账号密码是对应申请的appkey下
      // 当前demo的账号密码仅可在云信测试的appkey下使用
      // 如果没有云信测试账号密码，到官方小程序demo上注册 （搜索云信IM）

      // 你的密码 注意实际请求的时候用的md5加密
      token: '123456',
      // 你的账号
      account: 'kishn'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  zixun: function (e) {
    // 当前登陆人要聊天的对象账号
    let account = 'kishn1'
    // 点对点聊天格式是  `p2p-${你的聊天对象账号}`
    let session = 'p2p-kishn1'
    // 这里写死点对点，群聊的不一样
    let chatType = 'p2p'
    // 更新会话对象
    store.dispatch({
      type: 'CurrentChatTo_Change',
      payload: session
    })
    // 告知服务器，标记会话已读
    app.globalData.nim.resetSessionUnread(session)
    // 跳转 主逻辑被云信im接管
    setTimeout(() => {
      wx.navigateTo({
        url: `../../partials/chating/chating?chatTo=${account}&type=${chatType}`
      })
    }, 3000)    
  }
})
