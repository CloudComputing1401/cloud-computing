<template>
  <v-dialog v-model="turnOffMachineDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <div class="absolute left-4 top-4">
        <v-icon class="cursor-pointer" @click="turnOffMachineDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h1 class="text-[24px] font-bold my-4 text-center">خاموش کردن سرور</h1>
      <div class="mb-5 text-justify">
        خاموش کردن سرور ابری از این طریق همانند قطع کردن اتصال برق است (پیشنهاد
        ما به شما خاموش کردن از طریق کنسول است).
      </div>
      <v-btn block color="primary" @click="turnOffVmHandler" :loading="loading">
        خاموش کردن
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    turnOffMachineDialog: false,
    vmData: {},
    loading: false,
  }),
  watch: {
    turnOffMachineDialog(val) {
      if (
        this.turnOffMachineDialog === false &&
        this.$store.getters["Dialog/active"] === "TurnOffMachineDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.turnOffMachineDialog = newValue === "TurnOffMachineDialog";
        this.vmData = this.$store.getters["Dialog/getData"];
      }
    );
    this.turnOffMachineDialog =
      this.$store.getters["Dialog/active"] === "TurnOffMachineDialog";
  },
  methods: {
    async turnOffVmHandler() {
      this.loading = true;
      try {
        const data = await this.$axios.post(
          "/service/vm/operation/",
          {
            operation: "suspend",
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
        this.loading = false;
        this.turnOffMachineDialog = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
