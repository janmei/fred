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

	methods: {
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
