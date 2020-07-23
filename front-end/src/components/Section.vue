<template>
	<div class="">
		<section>
			{{ id }}
			<div v-if="color">
				<input type="range" name="hueinput" v-model="hue" max="65535" />
				<input type="range" name="satinput" v-model="sat" max="254" />
				<input type="range" name="briinput" v-model="bri" max="254" />
				<!-- <ColorPicker
					@changed="updateColor"
					:h="Math.floor((this.hue / 65535) * 360)"
					:s="this.sat"
					:b="this.bri"
				/> -->
			</div>
			<div v-else>
				<input type="range" name="briinput" v-model="bri" max="254" />
			</div>
			<input type="checkbox" v-model="on" />

			<select v-model="song">
				<option value="1">Song 1</option>
				<option value="2">Song 2</option>
				<option value="3">Song 3</option>
			</select>
			<input type="range" name="volume" v-model="volume" max="100" />
		</section>
	</div>
</template>

<script>
// import ColorPicker from "./ColorWheel";

export default {
	name: "Section",
	components: {
		// ColorPicker,
	},

	props: {
		id: Number,
		color: Boolean,
		hueId: Number,
		sectionId: String,
	},
	methods: {
		reportVol: function(data) {
			this.$socket.emit("volume", data);
			console.log("fire");
		},

		reportSound: function(data) {
			this.$socket.emit("sound", data);
			console.log("fire");
		},

		report: function(data) {
			this.$socket.emit("lamp", data);
		},
		updateColor: function(data) {
			console.log(data);
			this.hue = this.calcHue(data.h);
			this.sat = this.calc254(data.s);
			this.bri = data.b;
		},
		calcHue: function(hue) {
			let val = Math.floor((hue / 360) * 65535);
			return val;
		},
		calc254: function(data) {
			let val = Math.floor((data / 100) * 254);
			return val;
		},
	},
	computed: {
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
				this.report(this.$store.state[String(this.id)]);
			},
		},
		hue: {
			get() {
				this.report(this.$store.state[String(this.id)]);
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
				console.log(data);
				this.$store.commit("SET_HUE", data);
				this.report(this.$store.state[String(this.id)]);
			},
		},

		sat: {
			get() {
				this.report(this.$store.state[String(this.id)]);
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
				this.report(this.$store.state[String(this.id)]);
			},
		},
		on: {
			get() {
				this.report(this.$store.state[String(this.id)]);
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
				this.report(this.$store.state[String(this.id)]);
			},
		},
		song: {
			get() {
				return this.$store.state[String(this.id)].song.songId;
			},
			set(val) {
				let data = {
					section: String(this.id),
					somg: {
						songId: Number(val),
					},
				};
				this.$store.commit("SET_SONG", data);
			},
		},
		volume: {
			get() {
				this.reportVol(this.$store.state[String(this.id)]);
				return this.$store.state[String(this.id)].song.volume;
			},
			set(val) {
				let data = {
					section: String(this.id),
					somg: {
						volume: val,
					},
				};
				this.$store.commit("SET_VOL", data);
				this.reportVol(this.$store.state[String(this.id)]);
			},
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
	width: 100%;
	height: 100%;
	background-color: #ffe5cc;
	box-shadow: 0 12px 25px #0000003f;
	border-radius: 32px;
}
</style>
