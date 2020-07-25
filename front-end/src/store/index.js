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
				bri: 254,
			},
			song: {
				songId: 0,
				volume: 100,
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
				bri: 254,
			},
			song: {
				songId: 0,
				volume: 100,
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
				bri: 254,
			},
			song: {
				songId: 0,
				volume: 100,
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
				bri: 254,
			},
			song: {
				songId: 0,
				volume: 100,
			},
			wind: false,

			selected: "",
		},
		scenes: [],
		activeScene: null,
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
				name: msg.sceneName,
				variables: msg.variables,
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
		PAUSE_SONG(state, msg) {
			let data = {
				section: msg,
				songId: state[msg].song.songId,
			};
			vm.$socket.emit("pause", data);
		},
		// SET_FADE(state, msg) {
		// 	state.scenes[msg.section - 1].variables.fade = msg.fade;
		// },
		// SET_FADETIME(state, msg) {
		// 	state.scenes[msg.section - 1].variables.fadeTime = msg.fadeTime;
		// },
		// SET_SCENE_STATUS(state, msg) {
		// 	state.activeScene = msg;
		// 	state.scenes[msg.id - 1].variables.active = true;
		// },
		// DEACTIVATE_SCENE(state) {
		// 	state.scenes[state.activeScene.id - 1].variables.active = false;
		// 	state.activeScene = null;
		// },
		// DEACTIVATE_OTHER_SCENES(state) {
		// 	for (var scene of state.scenes) {
		// 		console.log(scene);
		// 		if (scene.id !== state.activeScene.id) {
		// 			scene.variables.active = false;
		// 		}
		// 	}
		// },
	},
	// getters: {
	// 	scenes: (state) => {
	// 		return JSON.parse(JSON.stringify(state.scenes));
	// 	},
	// },
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
				context.commit("PLAY_SONG", data.states[status].section);
			}
			// context.commit("SET_SCENE_STATUS", data);
			// context.commit("DEACTIVATE_OTHER_SCENES");
		},
		// deactivateOtherScenes(context) {
		// 	context.commit("DEACTIVATE_OTHER_SCENES");
		// },
	},
	modules: {
		// a big store can be devided into small modules
	},
});
