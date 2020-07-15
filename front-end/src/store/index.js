import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		start: {
			bri: null,
			songId: null,
		},
		end: {
			bri: null,
			songId: null,
		},
	},
	mutations: {
		SET_START(state, msg) {
			state.start = msg;
		},
		SET_END(state, msg) {
			state.end = msg;
		},
	},
	actions: {
		updateStart(context, e) {
			context.commit("SET_START", e);
		},
		updateEnd(context, e) {
			context.commit("SET_END", e);
		},
	},
	modules: {
		// a big store can be devided into small modules
	},
});
