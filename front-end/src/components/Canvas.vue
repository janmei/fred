<template>
	<div class="canvasWrapper">
		<div class="interactionCanvas">
			<section-vue v-bind:id="2" v-bind:color="true" :music="true" />
			<section-vue v-bind:id="1" v-bind:music="false" />
			<section-vue v-bind:id="4" :empty="true" />
			<section-vue v-bind:id="3" v-bind:color="true" :music="true" />
			<div class="save">
				<input type="text" v-model="attr.sceneName" />
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
			attr: {
				sceneName: "",
				variables: {
					active: false,
				},
			},
		};
	},
	props: {},
	computed: {},

	methods: {
		saveScene: function() {
			if (this.attr.sceneName !== "") {
				this.$store.dispatch("saveScene", this.attr);
				this.attr.sceneName = "";
			} else {
				console.log("Name not provided");
			}
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
	justify-content: center;
	// align-items: center;
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
