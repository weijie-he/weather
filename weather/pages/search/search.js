Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    today: {},
    future: {},
    temperature: '',
    weather: '',
    todayInfo: '',
    show: false
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
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  search: function () {
    if (this.data.inputValue == '') {
      wx.showModal({
        title: '提示',
        content: '请输入地级城市,例如:南京',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
    }
    else {
      var page = this;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://api.seniverse.com/v3/weather/daily.json?key=yu8g0mgd1fpz5dzr&location=' + page.data.inputValue + '&language=zh-Hans&unit=c&start=0&days=5',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.statusCode != 200) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '请输入地级城市,例如:南京',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  return;
                }
              }
            })
          } else {
            // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
            // var today = res.data.results["0"].daily.shift();
            var future = res.data.results["0"].daily;
            // console.log(today);
            console.log(future);
            console.log(res);
            page.setData({
              future: future,
              // today:today
              show: true
            });
            wx.hideLoading();
          }
        }

      })
    }
  },
})