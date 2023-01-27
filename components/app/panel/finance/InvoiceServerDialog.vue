<template>
  <v-dialog max-width="600" v-model="dialog">
    <div class="p-4 bg-white">
      <h1 class="text-[18px] font-semibold text-center">
        جزئیات سرور خریداری شده
      </h1>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  watch: {
    dialog(val) {
      if (
        !val &&
        this.$store.getters["Dialog/active"] === "InvoiceServerDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.dialog = newValue === "InvoiceServerDialog";
      }
    );
    this.dialog =
      this.$store.getters["Dialog/active"] === "InvoiceServerDialog";
  },
};
</script>

<style></style>
