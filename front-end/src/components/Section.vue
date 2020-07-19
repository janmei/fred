<template>
	<div class="">
		<section id="this.props.id">
			{{ id }}
			<div v-if="color">
				<input type="range" name="hueinput" v-model="hue" max="65535" />
				<input type="range" name="satinput" v-model="sat" max="254" />
				<input type="range" name="briinput" v-model="bri" max="254" />
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
export default {
	name: "Section",
	props: {
		id: Number,
		color: Boolean,
		hueId: Number,
		sectionId: String,
	},
	methods: {
		getJSON: function() {
			let data;
			data = {
				section: String(this.id),
				lamp: {
					on: this.on,
					hue: this.hue,
					sat: this.sat,
					bri: this.bri,
				},
			};

			return data;
		},

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
	},
	computed: {
		bri: {
			get() {
				return this.$store.state[String(this.id)].lamp.bri;
			},
			set(val) {
				let data = {
					section: String(this.id),
					bri: Number(val),
				};
				this.$store.commit("SET_BRI", data);
				this.report(this.$store.state[String(this.id)]);
			},
		},
		hue: {
			get() {
				let data = this.$store.state[String(this.id)].lamp.hue;
				return data;
			},
			set(val) {
				let data = {
					section: String(this.id),
					hue: Number(val),
				};
				this.$store.commit("SET_HUE", data);
				this.report(this.$store.state[String(this.id)]);
			},
		},

		sat: {
			get() {
				return this.$store.state[String(this.id)].lamp.sat;
			},
			set(val) {
				let data = {
					section: String(this.id),
					sat: Number(val),
				};
				this.$store.commit("SET_SAT", data);
				this.report(this.$store.state[String(this.id)]);
			},
		},
		on: {
			get() {
				return this.$store.state[String(this.id)].lamp.on;
			},
			set(val) {
				let data = {
					section: String(this.id),
					on: val,
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
					songId: Number(val),
				};
				this.$store.commit("SET_SONG", data);
			},
		},
		volume: {
			get() {
				return this.$store.state[String(this.id)].song.volume;
			},
			set(val) {
				let data = {
					section: String(this.id),
					volume: val,
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
	background-color: hsl(29, 100%, 90%);
	box-shadow: 0 12px 25px #0000003f;
	border-radius: 32px;
}
</style>
