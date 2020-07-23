<template>
	<div class="variables">
		<h2>Szenen</h2>

		<div v-for="scene in this.getScenes" v-bind:key="scene.id">
			<controls-vue v-bind:scene="scene" />
		</div>
	</div>
</template>

<script>
import ControlsVue from "./Controls.vue";
export default {
	name: "Sidebar",
	props: {},

	components: {
		ControlsVue,
	},
	methods: {},
	computed: {
		getScenes() {
			return this.$store.state.scenes;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.variables {
	height: 98vh;
	width: 300px;
	border-left: solid 1px lightgray;
	padding: 16px;
}
</style>
