import Vue from "vue";

import SnackBar from "@/components/core/SnackBar/SnackBar";
import Alert from "@/components/core/Alert/Alert";
import Loading from "@/components/app/ui/Loading";

const components = {
  SnackBar,
  Alert,
  Loading,
};

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});
