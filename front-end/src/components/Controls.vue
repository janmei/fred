<template>
	<div v-bind:class="[defaultClass]">
		<div class="wrapper">
			<div v-if="editable">
				<input type="text" v-model="editedText" class="titleEdit" />
			</div>
			<div v-else>
				<h3>{{ scene.name }}</h3>
			</div>
		</div>
		<div>
			<div v-if="editable" class="wrapper">
				<button @click="cancelEdit" class="btn delete">Abbrechen</button>
				<button @click="saveScene" class="btn edit">Speichern</button>
			</div>
			<div v-else class="wrapper">
				<button @click="deleteScene" class="btn delete">Löschen</button>
				<button @click="editScene" class="btn edit">Bearbeiten</button>
			</div>
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
			editable: false,
			editedText: this.scene.name,
		};
	},

	methods: {
		setScene: function() {
			this.$store.dispatch("setScene", this.scene);
		},
		deleteScene: function() {
			this.$store.dispatch("deleteScene", this.scene);
		},
		editScene: function() {
			this.editable = true;
		},
		saveScene: function() {
			this.editable = false;
			this.scene.name = this.editedText;
			let newScene = JSON.parse(JSON.stringify(this.scene));
			this.$store.dispatch("overrideScene", newScene);
		},
		cancelEdit: function() {
			this.editable = false;
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

	.titleEdit {
		height: 30px;
		width: 100%;
		font-size: 16px;
		font-weight: 700;
		margin: 12px 0;
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
		align-items: center;
		justify-content: space-between;
		.btn {
			appearance: none;
			width: 100%;
			height: auto;
			padding: 8px;
			background-color: rgb(221, 81, 81);
			border: none;
			border-radius: 4px;
			color: #fff;
			font-size: 12px;
			margin-bottom: 4px;
			&.delete {
				margin-right: 2px;
				background-color: rgb(221, 81, 81);

				&:hover {
					background-color: rgb(160, 57, 57);
					cursor: pointer;
				}
			}
			&.edit {
				margin-left: 2px;
				background-color: rgb(75, 103, 224);

				&:hover {
					background-color: rgb(48, 67, 150);
					cursor: pointer;
				}
			}
		}
	}
	hr {
		width: 100%;
	}
}
</style>
