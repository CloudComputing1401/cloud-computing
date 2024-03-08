import Vue from "vue";

import Alert from "@/components/core/Alert/Alert";
import Loading from "@/components/app/ui/Loading";

const components = {
  Alert,
  Loading,
};

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});
