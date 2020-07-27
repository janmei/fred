<template>
	<div v-bind:class="[defaultClass]">
		<h3>{{ scene.id }}</h3>
		<!-- <div>
			Aktiv
			<input type="checkbox" name="fade" id="" v-model="active" disabled />
		</div> -->
		<button @click="setScene">Szene aktivieren</button>
		<button @click="deleteScene">Löschen</button>
	</div>
</template>

<script>
export default {
	name: "Controls",
	props: {
		scene: Object,
	},
	data() {
		return {
			defaultClass: "varControls",
		};
	},

	methods: {
		setScene: function() {
			this.$store.dispatch("setScene", this.scene);
		},
		deleteScene: function() {
			this.$store.dispatch("deleteScene", this.scene);
		},
	},
	computed: {
		// fade: {
		// 	get() {
		// 		return this.$store.state.scenes[this.scene.id - 1].variables.fade;
		// 	},
		// 	set(val) {
		// 		let data = {
		// 			section: this.scene.id,
		// 			fade: val,
		// 		};
		// 		this.$store.commit("SET_FADE", data);
		// 	},
		// },
		// fadeTime: {
		// 	get() {
		// 		return this.$store.state.scenes[this.scene.id - 1].variables.fadeTime;
		// 	},
		// 	set(val) {
		// 		let data = {
		// 			section: this.scene.id,
		// 			fadeTime: Number(val),
		// 		};
		// 		this.$store.commit("SET_FADETIME", data);
		// 	},
		// },
		// active: {
		// 	get() {
		// 		return this.$store.state.scenes[this.scene.id - 1].variables.active;
		// 	},
		// },
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.varControls {
	display: flex;
	flex-direction: column;
	padding: 8px;
	.varItem {
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
	}
	&.active {
		background-color: rgb(170, 255, 170);
		border: 4px solid #0000001c;
		border-radius: 8px;
		box-sizing: content-box;
	}
}
</style>
