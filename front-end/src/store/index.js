import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		"1": {
			section: 1,
			lamp: {
				on: false,
				hue: 0,
				sat: 0,
				bri: 0,
			},
			song: {
				songId: 0,
				volume: 0,
			},
			wind: false,

			selected: "",
		},
		"2": {
			section: 2,
			lamp: {
				on: false,
				hue: 0,
				sat: 0,
				bri: 0,
			},
			song: {
				songId: 0,
				volume: 0,
			},
			wind: false,

			selected: "",
		},
		"3": {
			section: 3,
			lamp: {
				on: false,
				hue: 0,
				sat: 0,
				bri: 0,
			},
			song: {
				songId: 0,
				volume: 0,
			},
			wind: false,

			selected: "",
		},
		"4": {
			section: 4,
			lamp: {
				on: false,
				hue: 0,
				sat: 0,
				bri: 0,
			},
			song: {
				songId: 0,
				volume: 0,
			},
			wind: false,

			selected: "",
		},

		scenes: [],
	},
	mutations: {
		SET_BRI(state, msg) {
			state[msg.section].lamp.bri = msg.bri;
		},
		SET_HUE(state, msg) {
			state[msg.section].lamp.hue = msg.hue;
		},
		SET_SAT(state, msg) {
			state[msg.section].lamp.sat = msg.sat;
		},
		SET_ON(state, msg) {
			state[msg.section].lamp.on = msg.on;
		},
		SET_SONG(state, msg) {
			state[msg.section].song.songId = msg.songId;
		},
		SET_VOL(state, msg) {
			state[msg.section].song.volume = msg.volume;
		},
		SAVE_SCENE(state) {
			let json;
			json = {
				id: this.state.scenes.length + 1,
				states: [
					{ ...state["1"] },
					{ ...state["2"] },
					{ ...state["3"] },
					{ ...state["4"] },
				],
			};
			let newObj = JSON.parse(JSON.stringify(json));
			state.scenes.push(newObj);
		},
	},
	getters: {
		scenes: (state) => state.scenes,
	},
	actions: {
		saveScene(context) {
			context.commit("SAVE_SCENE");
		},
	},
	modules: {
		// a big store can be devided into small modules
	},
});
