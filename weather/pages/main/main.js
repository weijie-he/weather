// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../libs/bmap-wx.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    temperature: '',
    weather:'',
    city: '',
    todayInfo:'',
    future:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用要用this.
    this.loadToday();
    wx.showLoading({
      title: '加载中',
    })
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

  loadToday: function () {
    //在此处用this表示的是Page,用一个变量把Page接住,这样在方法内部也可以使用Page
    var page = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'C4I4IcHzhfPxvxKXrGGymW0nq5qCdnaS'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var city =  weatherData.currentCity;
      // 去掉"市"字
      city= city.replace("市",'');
      var today = weatherData;
      var weather = weatherData.weatherDesc;
      var todayInfo = weatherData.date + '\n'+'PM2.5：' + weatherData.pm25  +  '\n'  + weatherData.wind + '\n';
      var temperature = weatherData.temperature 
      page.setData({
        city: city,
        weather: weather,
        temperature:temperature,
        todayInfo: todayInfo,
      });
      // 代码是从上往下执行,不能直接在onlode里调用两个方法,那样得不到city的值,
      // 先调用百度地图的api获得城市,作为参数传给心知天气的api
      page.loadFuture(city);
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  loadFuture: function (city) {
    var page = this;
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/daily.json?key=yu8g0mgd1fpz5dzr&location='+city+'&language=zh-Hans&unit=c&start=1&days=5', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var future = res.data.results["0"].daily
        console.log(future)
        page.setData({
         future:future
        });
        wx.hideLoading();
      }
    })
  },


})

