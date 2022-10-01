<template>
  <v-snackbar
    v-model="snackbar"
    top
    class="notification"
    timeout="5000"
    dark
    :color="success ? 'alert' : 'red'"
  >
    <div class="notification__content">
      <span class="notification__content__text"> {{ text }} </span>
      <v-btn
        color="#ffffff"
        class="notification__content__btn"
        text
        left
        @click="snackbar = false"
      >
        بستن
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    success: true,
  }),
  computed: {
    text() {
      if (typeof this.$store.getters['SnackBar/text'] === 'string')
        return this.$store.getters['SnackBar/text']
      else return this.$store.getters['SnackBar/text'].text
    },
  },
  watch: {
    snackbar(val) {
      this.$store.commit('SnackBar/change', this.snackbar)
      this.success = this.$store.getters['SnackBar/type'] === 'success'
      if (val === false) {
        this.$store.commit('SnackBar/setType', 'success')
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters['SnackBar/status'],
      (newValue) => {
        this.snackbar = newValue
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.notification {
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__text {
      font-weight: 600;
      font-family: 'Yekan_Bakh_Regular' !important ;
    }
    &__btn {
      text-align: left;
      font-weight: 600;
      font-family: 'Yekan_Bakh_Regular' !important ;
      letter-spacing: 0;
    }
  }
}
</style>
