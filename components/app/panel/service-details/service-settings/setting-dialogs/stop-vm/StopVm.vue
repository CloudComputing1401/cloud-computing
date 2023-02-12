<template>
  <v-dialog v-model="stopMachineDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <div class="absolute left-4 top-4">
        <v-icon class="cursor-pointer" @click="stopMachineDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h1 class="text-[24px] font-bold my-4 text-center">متوقف کردن سرور</h1>
      <div class="mb-5 text-justify">
        این اقدام منجر به توقف سرور ابری و همه اطلاعات مربوط به آن میشود.
      </div>
      <v-btn block color="primary" @click="stopVmHandler" :loading="loading">
        متوقف کردن
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    stopMachineDialog: false,
    vmData: {},
    loading: false,
  }),
  watch: {
    stopMachineDialog(val) {
      if (
        this.stopMachineDialog === false &&
        this.$store.getters["Dialog/active"] === "StopMachineDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.stopMachineDialog = newValue === "StopMachineDialog";
        this.vmData = this.$store.getters["Dialog/getData"];
      }
    );
    this.stopMachineDialog =
      this.$store.getters["Dialog/active"] === "StopMachineDialog";
  },
  methods: {
    async stopVmHandler() {
      this.loading = true;
      try {
        const data = await this.$axios.post(
          "/service/vm/operation/",
          {
            operation: "pause",
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
        this.stopMachineDialog = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
