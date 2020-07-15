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
</style>
