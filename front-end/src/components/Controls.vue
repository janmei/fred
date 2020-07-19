<template>
	<div class="varStart varControls">
		<h3>{{ scene.id }}</h3>
		<div class="varItem">
			<label for="brightnessStart">Helligkeit</label>
			<input
				type="range"
				name="brightnessStart"
				id=""
				v-on:input="this.setBri"
			/>
		</div>
		<div class="varItem">
			<label for="musicStart">Song</label>
			<select
				name="musicStart"
				id=""
				v-on:change="this.update"
				v-model="selected"
			>
				<option value="1">Song 1</option>
				<option value="2">Song 2</option>
				<option value="3">Song 3</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
	name: "Controls",
	props: {
		scene: Object,
	},
	data: function() {
		return {
			selected: "",
			bri: null,
		};
	},

	methods: {
		update: function() {
			if (this.name === "Start") {
				this.$store.dispatch("updateStart", {
					bri: this.bri,
					songId: this.selected,
				});
			} else if (this.name === "Ende") {
				this.$store.dispatch("updateEnd", {
					bri: this.bri,
					songId: this.selected,
				});
			}
		},

		setBri: function(e) {
			this.bri = Number(e.target.value);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.varControls {
	display: flex;
	flex-direction: column;
	.varItem {
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
	}
}
</style>
