// import initData from './initData';
// console.log(initData);

export default {
  namespaced: true,
  state: {
    categories: {},
    newsList: [],
    boardList: [],
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
