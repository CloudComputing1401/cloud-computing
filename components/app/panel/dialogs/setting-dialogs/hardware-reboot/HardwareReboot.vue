<template>
  <v-dialog v-model="hardwareRebootDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <v-icon
        class="cursor-pointer absolute left-1 top-1"
        @click="hardwareRebootDialog = false"
        >mdi-close</v-icon
      >
      <h1 class="text-[24px] font-bold my-4 text-center">
        ریبوت سخت افزاری
        {{ machineData.name }}
      </h1>
      <div class="mb-5 text-justify">
        ریبوت کردن سرور ابری از این طریق همانند قطع کردن اتصال برق است (پیشنهاد
        ما به شما ریبوت کردن از طریق کنسول است).
      </div>
      <v-btn block color="primary"> ریبوت کردن </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    hardwareRebootDialog: false,
    machineData: {},
  }),
  watch: {
    hardwareRebootDialog(val) {
      if (
        this.hardwareRebootDialog === false &&
        this.$store.getters["Dialog/active"] === "HardwareRebootDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
    machineData(val) {
      console.log(val);
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.hardwareRebootDialog = newValue === "HardwareRebootDialog";
        this.machineData = this.$store.getters["Dialog/getMachineData"];
      }
    );
    this.hardwareRebootDialog =
      this.$store.getters["Dialog/active"] === "HardwareRebootDialog";
  },
};
</script>

<style>
</style>