<template>
	<div class="">
		<section>
			<div v-if="!empty">
				<b class="section_id">
					{{ id }}
				</b>
				<div v-if="color" class="color">
					<div class="wheel">
						<ColorPicker @changed="updateColor" :b="this.bri" />
					</div>
					<div class="ranges">
						<form action="">
							<div>
								<label for="on">Power</label>
								<input
									type="checkbox"
									v-model="on"
									name="on"
									@change="this.report"
								/>
							</div>
							<label for="hueinput">Hue {{ this.hue }}</label>
							<input
								type="range"
								name="hueinput"
								v-model="hue"
								max="65535"
								step="1000"
							/>
							<label for="satinput">Sat {{ this.sat }}</label>
							<input type="range" name="satinput" v-model="sat" max="254" />
							<label for="briinput">Bri {{ this.bri }}</label>
							<input type="range" name="briinput" v-model="bri" max="254" />
						</form>
					</div>
				</div>
				<div v-else>
					<div>
						<label for="on">Power</label>
						<input type="checkbox" v-model="on" name="on" @change="report" />
					</div>
					<div class="ranges">
						<label for="briinput">Bri {{ this.bri }}</label>
						<input
							type="range"
							name="briinput"
							v-model="bri"
							max="254"
							@input="report"
						/>
					</div>
				</div>
				<div v-if="music">
					<div class="music">
						<div class="column">
							<select v-model="song" @change="reportSound">
								<option value="0">Wählen</option>
								<option value="1">Ruhiges Piano mit Beat</option>
								<option value="2">Ruhig</option>
								<option value="3">Piano mit Drums</option>
								<option value="4">Schnelles Piano mit Beat</option>
								<option value="5">Langsamer Beat</option>
								<option value="6">Metro</option>
								<option value="7">Regen</option>
								<option value="8">Wald</option>
							</select>
							<div class="music-controls">
								<button @click="this.playSong">Play</button>
								<button @click="this.pauseSong">Pause</button>
							</div>
						</div>
						<label for="volume">Vol {{ this.volume }}</label>
						<input
							type="range"
							name="volume"
							value="100"
							v-model="volume"
							max="100"
							@input="reportVol"
						/>
					</div>
				</div>
			</div>
			<div v-else>
				<!-- EMPTY STATE-->
			</div>
		</section>
	</div>
</template>

<script>
import ColorPicker from "./ColorWheel";
// let deactivated;

export default {
	name: "Section",
	components: {
		ColorPicker,
	},

	props: {
		id: Number,
		color: Boolean,
		hueId: Number,
		sectionId: String,
		empty: Boolean,
		fadeTime: Number,
		fade: Boolean,
		music: Boolean,
	},
	data() {
		return {
			tweeningValue: 0,
			scene: null,
		};
	},
	methods: {
		reportVol: function() {
			let data = this.$store.state[String(this.id)];
			this.$socket.emit("volume", data);
		},

		reportSound: function() {
			let data = this.$store.state[String(this.id)];
			this.$socket.emit("song", data);
		},

		report: function() {
			console.log("data");
			let data = this.$store.state[String(this.id)];
			this.$socket.emit("lamp", data);
		},
		updateColor: function(data) {
			this.hue = this.calcHue(data.h);
			this.sat = this.calc254(data.s);
			this.report(this.$store.state[String(this.id)]);
		},
		calcHue: function(hue) {
			let val = Math.floor((hue / 360) * 65535);
			return val;
		},
		calc254: function(data) {
			let val = Math.floor((data / 100) * 254);
			return val;
		},
		playSong: function() {
			this.$store.commit("PLAY_SONG", this.id);
		},
		pauseSong: function() {
			this.$store.commit("PAUSE_SONG", this.id);
		},
	},
	computed: {
		// sceneActive: {
		// 	get() {
		// 		if (this.$store.state.activeScene != null) {
		// 			// Szene aktiv

		// 			deactivated = false;
		// 			return true;
		// 		} else {
		// 			deactivated = true;
		// 			return false;
		// 		}
		// 	},
		// },
		// activeScene: {
		// 	get() {
		// 		return this.$store.state.activeScene;
		// 	},
		// },
		bri: {
			get() {
				this.report(this.$store.state[String(this.id)]);
				return this.$store.state[String(this.id)].lamp.bri;
			},
			set(val) {
				let data = {
					section: String(this.id),
					lamp: {
						bri: Number(val),
					},
				};
				this.$store.commit("SET_BRI", data);
				// this.report(this.$store.state[String(this.id)]);
			},
		},
		hue: {
			get() {
				// this.report(this.$store.state[String(this.id)]);
				let data = this.$store.state[String(this.id)].lamp.hue;
				console.log(data);
				return data;
			},
			set(val) {
				let data = {
					section: String(this.id),
					lamp: {
						hue: Number(val),
					},
				};
				this.$store.commit("SET_HUE", data);
				// if (this.sceneActive && !deactivated) {
				// 	this.$store.commit("DEACTIVATE_SCENE");
				// 	deactivated = true;
				// }
				// this.report(this.$store.state[String(this.id)]);
			},
		},

		sat: {
			get() {
				// this.report(this.$store.state[String(this.id)]);
				return this.$store.state[String(this.id)].lamp.sat;
			},
			set(val) {
				let data = {
					section: String(this.id),
					lamp: {
						sat: Number(val),
					},
				};
				this.$store.commit("SET_SAT", data);
				// this.report(this.$store.state[String(this.id)]);
			},
		},
		on: {
			get() {
				// this.report(this.$store.state[String(this.id)]);
				return this.$store.state[String(this.id)].lamp.on;
			},
			set(val) {
				let data = {
					section: String(this.id),
					lamp: {
						on: val,
					},
				};
				this.$store.commit("SET_ON", data);
				// this.report(this.$store.state[String(this.id)]);
			},
		},
		song: {
			get() {
				// this.reportSound(this.$store.state[String(this.id)]);
				return this.$store.state[String(this.id)].song.songId;
			},
			set(val) {
				if (Number(val) > 0) {
					let data = {
						section: String(this.id),
						song: {
							songId: Number(val),
						},
					};
					this.$store.commit("SET_SONG", data);
				}
			},
		},
		volume: {
			get() {
				// this.reportVol(this.$store.state[String(this.id)]);
				return this.$store.state[String(this.id)].song.volume;
			},
			set(val) {
				let data = {
					section: String(this.id),
					song: {
						volume: val,
					},
				};
				this.$store.commit("SET_VOL", data);
			},
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
	width: auto;
	height: 300px;
	background-color: #f7f7f7;
	box-shadow: 0 12px 25px #0000003f;
	border-radius: 32px;
	padding: 32px;
}
.ranges {
	width: 50%;
	display: flex;
	flex-direction: column;
}
.color {
	display: flex;
}
.wheel {
	margin-right: 32px;
}
.music {
	margin-top: 16px;
	width: 50%;
	display: flex;
	flex-direction: column;
	.music-controls {
		margin-bottom: 12px;
	}
}
.row {
	display: flex;
	flex-direction: row;
}
.column {
	display: flex;
	flex-direction: column;
}
</style>
