<template>
  <div class="fixed bottom-4 right-4" style="z-index: 1000000000000">
    <v-alert
      :value="$store.getters['Alert/status']"
      border="left"
      color="primary"
      dark
      type="success"
      :min-width="$vuetify.breakpoint.xs ? 'calc(100vw - 2rem )' : '500'"
      :max-width="$vuetify.breakpoint.xs ? 'calc(100vw - 2rem )' : 'auto'"
      transition="scale-transition"
    >
      <div class="mb-4">
        فیلد {{ $store.getters['Alert/text'] }} با موفقیت ویرایش شد.
      </div>
      <v-progress-linear color="white" :value="progress"></v-progress-linear>
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters['Alert/status'],
      (val) => {
        if (val === true) {
          const count = setInterval(() => {
            this.progress += 3.4
            if (this.progress > 113) {
              this.$store.commit('Alert/change', false)
              this.progress = 0
              clearInterval(count)
            }
          }, 100)
        }
      }
    )
  },
}
</script>

<style>
</style>