import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  timeout: 2000,
  closeOnClick: false,
  rtl: true,
  position: "bottom-center",
  cssFile: false,
  closeButton: false,
};

Vue.use(Toast, options);
