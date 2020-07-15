<template>
	<div class="variables">
		<h2>Variables</h2>
		<controls-vue name="Start" />
		<controls-vue name="Ende" />
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
