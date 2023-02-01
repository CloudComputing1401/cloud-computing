<template>
  <v-dialog v-model="hardwareRebootDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <div class="absolute left-4 top-4">
        <v-icon class="cursor-pointer" @click="hardwareRebootDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h1 class="text-[24px] font-bold my-4 text-center">
        ریبوت سخت افزاری سرور
      </h1>
      <div class="mb-5 text-justify">
        ریبوت کردن سرور ابری از این طریق همانند قطع کردن اتصال برق است (پیشنهاد
        ما به شما ریبوت کردن از طریق کنسول است).
      </div>
      <v-btn block color="primary" @click="hardReboot()" :loading="loading">
        ریبوت کردن
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    hardwareRebootDialog: false,
    vmData: {},
    loading: false,
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
    vmData(val) {
      console.log(val);
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.hardwareRebootDialog = newValue === "HardwareRebootDialog";
        this.vmData = this.$store.getters["Dialog/getData"];
      }
    );
    this.hardwareRebootDialog =
      this.$store.getters["Dialog/active"] === "HardwareRebootDialog";
  },
  methods: {
    async hardReboot() {
      this.loading = true;
      try {
        const data = await this.$axios.post(
          "/service/vm/operation/",
          {
            operation: "hard_reboot",
          },
          {
            headers: {
              Authorization: this.$store.getters["Auth/getToken"],
            },
            params: {
              project_id: this.vmData.projectId,
              virtual_machine_id: this.vmData.vmId,
            },
          }
        );
      } catch (err) {}
    },
  },
};
</script>

<style></style>
