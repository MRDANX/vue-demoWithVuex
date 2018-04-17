// import initData from './initData';
// console.log(initData);

export default {
  namespaced: true,
  state: {
    categories: {
      "pc": {
        "name": "PC产品",
        "productList": [{
            "name": "数据统计",
            "url": "/detail/statistics",
            "imgUrl": "./static/images/board-open.png"
          },
          {
            "name": "数据预测",
            "url": "/detail/forecast",
            "imgUrl": "./static/images/board-broadcast.png"
          },
          {
            "name": "流量分析",
            "url": "/detail/analysis",
            "imgUrl": "./static/images/board-duty.png"
          },
          {
            "name": "广告发布",
            "url": "/detail/publish",
            "imgUrl": "./static/images/board-climb.png"
          }
        ]
      },
      "mobile": {
        "name": "手机应用类",
        "lastCategory": true,
        "productList": [{
            "name": "91助手",
            "url": "http://www.baidu.com"
          },
          {
            "name": "产品助手",
            "url": "http://www.baidu.com"
          },
          {
            "name": "智能地图",
            "url": "http://www.baidu.com"
          },
          {
            "name": "团队语音",
            "url": "http://www.baidu.com"
          }
        ]
      }
    },
    newsList: [{
        "title": "Fami通最期待游戏榜《最终幻想7重制版》排名第一",
        "url": "http://www.baidu.com"
      },
      {
        "title": "剑与魔法SLG名作新篇《Wizard\"s Symphony》公开",
        "url": "http://www.baidu.com"
      },
      {
        "title": "小米MIX 2S将于本月3日首销：颜值高 3299元起售",
        "url": "http://www.baidu.com"
      },
      {
        "title": "《绝地求生》新地图测试码将发送 购买游戏可领取",
        "url": "http://www.baidu.com"
      },
      {
        "title": "折磨神父！《孤岛惊魂5》惊现《小丑回魂》彩蛋",
        "url": "http://www.baidu.com"
      },
      {
        "title": "《堡垒之夜》火爆度双杀吃鸡 背后赢家仍是腾讯",
        "url": "http://www.baidu.com"
      }
    ],
    boardList: [
      {
        "title": "开放产品",
        "desc": "开放产品是一款开放产品",
        "url": "detail",
        "imgUrl": "./static/images/board-open.png"
      },
      {
        "title": "品牌营销",
        "desc": "品牌营销帮助你的产品更好地找到定位",
        "url": "detail",
        "imgUrl": "./static/images/board-broadcast.png"
      },
      {
        "title": "使命必达",
        "desc": "使命必达快速迭代永远保持最前端的速度",
        "url": "detail",
        "imgUrl": "./static/images/board-duty.png"
      },
      {
        "title": "勇攀高峰",
        "desc": "帮你勇闯高峰，到达事业的顶峰",
        "url": "detail",
        "imgUrl": "./static/images/board-climb.png"
      }
    ],
    carouselPics: [{
      title: 'loading...',
      url: require('@/assets/loading_images/loading1.gif')
    }]
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    initData(state, params) {
      switch (params.initWhat) {
        case 'newsList':
          state.newsList = params.data;
          break;
        case 'categories':
          state.categories = params.data;
          break;
        case 'boardList':
          state.boardList = params.data;
          break;
        case 'carouselPics':
          state.carouselPics = params.data;
          break;
        default:
          break;
      }
    }
  }
}
