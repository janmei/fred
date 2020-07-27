<template>
	<div id="app">
		<Canvas />
	</div>
</template>

<script>
import Canvas from "./components/Canvas.vue";

export default {
	name: "App",
	components: {
		Canvas,
	},
};
</script>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
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
	&.activate {
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
	&.edit {
		margin-left: 2px;
		background-color: rgb(75, 103, 224);

		&:hover {
			background-color: rgb(48, 67, 150);
			cursor: pointer;
		}
	}
}
</style>
