<template>
	<div class="">
		<section id="this.props.id">
			{{ id }}
			<div v-if="color">
				<input
					type="range"
					name="hueinput"
					v-on:input="this.setHue"
					max="254"
				/>
				<input
					type="range"
					name="satinput"
					v-on:input="this.setSat"
					max="254"
				/>
				<input
					type="range"
					name="briinput"
					v-on:input="this.setBri"
					max="254"
				/>
			</div>
			<div v-else>
				<input
					type="range"
					name="briinput"
					v-on:input="this.setBri"
					max="254"
				/>
			</div>
			<input type="checkbox" v-on:click="this.setOn" />

			<select>
				<option>Start</option>
				<option>Ende</option>
			</select>
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
	},
	data: function() {
		return {
			on: false,
			hue: null,
			sat: null,
			bri: null,
			trackId: null,
			wind: false,
		};
	},

	methods: {
		getJSON: function() {
			let data;
			data = {
				section: this.id,
				lamp: {
					on: this.on,
					hue: this.hue,
					sat: this.sat,
					bri: this.bri,
				},
			};

			return data;
		},
		setHue: function(e) {
			this.hue = Number(e.target.value);
			this.report(this.getJSON());
		},
		setSat: function(e) {
			this.sat = Number(e.target.value);
			this.report(this.getJSON());
		},
		setBri: function(e) {
			this.bri = Number(e.target.value);
			this.report(this.getJSON());
		},
		setOn: function() {
			this.on = !this.on;
			this.report(this.getJSON());
		},

		report: function(data) {
			this.$socket.emit("lamp", data);
			console.log("fire");
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
