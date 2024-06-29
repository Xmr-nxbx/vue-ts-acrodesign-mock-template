import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      // 用户信息
      userInfo: {
        name: "",
        id: "",
        role: "",
        email: "",
        phone: "",
        createTime: "",
        updateTime: "",
      },
    };
  },
  getters: {
    getUserName(state) {
      return state.userInfo.name;
    }
  },
  actions: {

  }
});
