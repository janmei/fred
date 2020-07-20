<template>
	<div class="varStart varControls">
		<h3>{{ scene.name }}</h3>
		<button @click="setScene">Szene aktivieren</button>
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
		setScene: function() {
			this.$store.dispatch("setScene", this.scene);
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
