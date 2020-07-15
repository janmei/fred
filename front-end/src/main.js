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
new Vue({
	store,
	render: (h) => h(App),
}).$mount("#app");
