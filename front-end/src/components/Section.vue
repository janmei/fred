<template>
	<div class="">
		<section>
			<div v-if="!empty">
				<b class="section_id">
					{{ id }}
				</b>
				<div v-if="color" class="color">
					<div class="wheel">
						<ColorPicker @changed="updateColor" />
					</div>
					<div class="ranges">
						<div>
							<label for="on">Power</label>
							<input type="checkbox" v-model="on" name="on" />
						</div>
						<label for="hueinput">Hue</label>
						<input type="range" name="hueinput" v-model="hue" max="65535" />
						<label for="satinput">Sat</label>
						<input type="range" name="satinput" v-model="sat" max="254" />
						<label for="briinput">Bri {{ this.bri }}</label>
						<input type="range" name="briinput" v-model="bri" max="254" />
					</div>
				</div>
				<div v-else>
					<label for="briinput">Bri {{ this.bri }}</label>
					<input type="range" name="briinput" v-model="bri" max="254" />
				</div>

				<div class="music">
					<select v-model="song" @change="reportSound">
						<option value="1">Song 1</option>
						<option value="2">Song 2</option>
						<option value="3">Song 3</option>
					</select>
					<button @click="this.playSong">Play</button>
					<button @click="this.pauseSong">Pause</button>
					<label for="volume">Vol {{ this.volume }}</label>
					<input
						type="range"
						name="volume"
						v-model="volume"
						max="100"
						@input="reportVol"
					/>
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

		report: function(data) {
			this.$socket.emit("lamp", data);
		},
		updateColor: function(data) {
			this.hue = this.calcHue(data.h);
			this.sat = this.calc254(data.s);
			this.bri = data.b;
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
		bri: {
			get() {
				// this.report(this.$store.state[String(this.id)]);
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
				let data = {
					section: String(this.id),
					song: {
						songId: Number(val),
					},
				};
				this.$store.commit("SET_SONG", data);
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
}
</style>
