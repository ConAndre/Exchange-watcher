import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { Items } from 'oldschooljs';
import { markRaw } from '@vue/runtime-dom';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const shedData = (obj, value = '') => {
  for (const key in obj) {
    if (!obj[key][value]) {
      delete obj[key];
    };
  };
};
export default createStore({
  state: {
    items: {},
    loaded: false,
    data: { key: 'default' }
  },
  mutations: {
    commitData(state, data) {
      state.data = JSON.parse(JSON.stringify(data));
    },
    commitItems(state) {
      if (state.loaded) return;
      let items = Object.fromEntries(Items);
      shedData(items, 'tradeable_on_ge');
      for (const key in items) {
        items[key] = (({ id, name, examine }) =>
          ({ id, name, examine }))(items[key]);
      }
      state.items = markRaw(items);
      state.loaded = true;
    },
  },
  actions: {
    loadItems({ commit }) {
      commit('commitItems');
    },
    setData({ commit }, data) {
      commit('commitData', data);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
  getters: {
    getStateKey: (state) => (key) => state[key],
    getStateItems: (state) => (key) => {
      if (key.length <= 2) return [];
      return Object.values(state.items).filter(item => item.name.toLowerCase().includes(key));;
    },
    getStateItemWiki: (state) => (key) => { }
  },
});