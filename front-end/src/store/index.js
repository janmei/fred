import Vue from "vue";
import Vuex from "vuex";
// import _ from "lodash";
Vue.use(Vuex);
// let scenes = [];
import vm from "../main";

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
		initialiseStore(state) {
			// Check if the ID exists
			if (localStorage.getItem("store")) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem("store")))
				);
			}
		},
		SET_BRI(state, msg) {
			state[msg.section].lamp.bri = msg.lamp.bri;
		},
		SET_HUE(state, msg) {
			state[msg.section].lamp.hue = msg.lamp.hue;
		},
		SET_SAT(state, msg) {
			state[msg.section].lamp.sat = msg.lamp.sat;
		},
		SET_ON(state, msg) {
			state[msg.section].lamp.on = msg.lamp.on;
		},
		SET_SONG(state, msg) {
			state[msg.section].song.songId = msg.song.songId;
		},
		SET_VOL(state, msg) {
			state[msg.section].song.volume = msg.song.volume;
		},
		SAVE_SCENE(state, msg) {
			let json;
			// let state1 = _.clone(state["1"]);
			// let state2 = _.cloneDeep(state["2"]);
			json = {
				name: msg,
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
		PLAY_SONG(state, msg) {
			let data = {
				section: msg,
				songId: state[msg].song.songId,
			};
			vm.$socket.emit("play", data);
		},
		PAUSE_SONG() {
			vm.$socket.emit("pause");
		},
	},
	getters: {
		scenes: (state) => {
			return JSON.parse(JSON.stringify(state.scenes));
		},
	},
	actions: {
		saveScene(context, data) {
			context.commit("SAVE_SCENE", data);
		},
		setScene(context, data) {
			// context.commit("SET_SCENE", data);
			console.log(data.states);
			for (var status in data.states) {
				context.commit("SET_HUE", data.states[status]);
				context.commit("SET_SAT", data.states[status]);
				context.commit("SET_BRI", data.states[status]);
				context.commit("SET_ON", data.states[status]);
				context.commit("SET_SONG", data.states[status]);
				context.commit("SET_VOL", data.states[status]);
				context.commit("PLAY_SONG", data.states[status]);
			}
		},
	},
	modules: {
		// a big store can be devided into small modules
	},
});
