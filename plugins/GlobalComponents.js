import Vue from 'vue'

import SnackBar from '@/components/core/SnackBar/SnackBar'
import Loading from '@/components/app/ui/Loading'



const components = {
  SnackBar,
  Loading
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
