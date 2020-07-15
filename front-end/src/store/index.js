import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		data: "test",
	},
	mutations: {
		SET_DATA(state, msg) {
			state.data = msg;
		},
	},
	actions: {
		someAction(context) {
			context.commit("SET_DATA", "one more test");
		},
	},
	modules: {
		// a big store can be devided into small modules
	},
});
