import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import axios from "@/utils/request.js";
Vue.use(Vuex);
let date = moment().toDate().toString();
let arr = date.split(" ")[5].split("");
arr.splice(arr.length - 2, 0, ":");
let store = new Vuex.Store({
  state: {},
  mutations: {
    setInfo(state, info) {
      axios.defaults.baseURL = info;
    },
  },
  actions: {
    async submitInfo({ commit }, data) {
      try {
        const res = await axios({
          url: "https://api.grand-universe.com/feedback",
          method: "post",
          data,
          headers: {
            Authorization: window.userBasicInfo.auth_token,
          },
        });
        return res;
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export default store;
