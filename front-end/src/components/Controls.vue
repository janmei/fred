<template>
	<div v-bind:class="[defaultClass]">
		<div class="wrapper">
			<h3>{{ scene.name }}</h3>
			<button @click="deleteScene" class="delete">Löschen</button>
		</div>
		<!-- <div>
			Aktiv
			<input type="checkbox" name="fade" id="" v-model="active" disabled />
		</div> -->
		<button @click="setScene" class="activate">Szene aktivieren</button>
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
	.activate {
		appearance: none;
		height: auto;
		padding: 8px;
		background-color: rgb(57, 156, 65);
		border: none;
		border-radius: 4px;
		color: #fff;
		font-size: 12px;
		&:hover {
			background-color: rgb(35, 99, 41);
			cursor: pointer;
		}
	}
	&.active {
		background-color: rgb(170, 255, 170);
		border: 4px solid #0000001c;
		border-radius: 8px;
		box-sizing: content-box;
	}
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.delete {
			appearance: none;
			height: auto;
			padding: 8px;
			background-color: rgb(221, 81, 81);
			border: none;
			border-radius: 4px;
			color: #fff;
			font-size: 12px;
			&:hover {
				background-color: rgb(35, 99, 41);
				cursor: pointer;
			}
		}
	}
	hr {
		width: 100%;
	}
}
</style>
