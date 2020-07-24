import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
import VueSocketIO from "vue-socket.io";
// import SocketIO from "socket.io-client";

Vue.use(
	new VueSocketIO({
		debug: true,
		connection: "http://localhost:3000",
		vuex: {
			store,
			actionPrefix: "SOCKET_",
			mutationPrefix: "SOCKET_",
		},
	})
);

// Subscribe to store updates
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem("store", JSON.stringify(state));
});

export default new Vue({
	store,
	beforeCreate() {
		this.$store.commit("initialiseStore");
	},
	render: (h) => h(App),
}).$mount("#app");
