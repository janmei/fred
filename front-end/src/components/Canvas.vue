<template>
	<div class="canvasWrapper">
		<div class="interactionCanvas">
			<section-vue v-bind:id="1" />
			<section-vue v-bind:id="2" v-bind:color="true" />
			<section-vue v-bind:id="3" v-bind:color="true" />
			<section-vue v-bind:id="4" />
			<div class="save">
				<input type="text" v-model="sceneName" />
				<button @click="this.saveScene" class="saveScene">Click</button>
			</div>
		</div>

		<sidebar-vue />
	</div>
</template>

<script>
import SidebarVue from "./Sidebar.vue";
import SectionVue from "./Section";
export default {
	name: "Canvas",
	components: {
		SidebarVue,
		SectionVue,
	},
	data: function() {
		return {
			sceneName: "",
		};
	},
	props: {},
	computed: {},

	methods: {
		saveScene: function() {
			this.$store.dispatch("saveScene", this.sceneName);
			this.sceneName = "";
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.canvasWrapper {
	display: flex;
	justify-content: space-between;
}

.interactionCanvas {
	padding: 64px;
	display: grid;
	grid-template-columns: 400px 400px;
	grid-template-rows: 400px 400px;
	column-gap: 64px;
	row-gap: 64px;
	/* justify-content: center;
	align-items: center; */
	section {
		width: 100%;
		height: 100%;
		background-color: hsl(29, 100%, 90%);
		box-shadow: 0 12px 25px #0000003f;
		border-radius: 32px;
	}
	.save {
		width: fit-content;
		height: 60px;
		box-shadow: 0 12px 25px #0000003f;
		padding: 16px;
		.saveScene {
			width: 60px;
			height: 20px;
		}
	}
}
</style>
