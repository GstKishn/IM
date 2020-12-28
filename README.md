# IM
基于网易云信IM小程序demo,剥离出专对“点对点”聊天的demo

该demo是从云信官方小程序上剥离出且只包含点对点聊天功能
demo中出现的账号密码，都是云信测试appkey下注册的账号密码，分为两个角色 ： 
  角色1: 账号：kishn, 密码 ： 123456
  角色2: 账号：kishn1, 密码 ： 123456

当前demo使用角色1登陆，点击首页右下角的咨询按钮，即可进入和角色2聊天的页面。


总的来说，如果不需要用户手动注册，需要静默注册云信账号进行聊天，则需要后端调云信的接口创建账号密码返回前端
前端只要调用new IMController()这个实例即可登陆，如：
    import IMController from '../../controller/im.js'
    new IMController({
      // 真正开发的时候要注意 账号密码是对应申请的appkey下
      // 当前demo的账号密码仅可在云信测试的appkey下使用
      // 如果没有云信测试账号密码，到官方小程序demo上注册 （搜索云信IM）

      // 你的密码 注意实际请求的时候用的md5加密
      token: '123456',
      // 你的账号
      account: 'kishn'
    })
然后在触发聊天的时候，将参数传入链接逻辑即可被云信im接管：
    let account = 'kishn1'
    let chatType = 'p2p
    wx.navigateTo({
      url: `../../partials/chating/chating?chatTo=${account}&type=${chatType}`
    })
