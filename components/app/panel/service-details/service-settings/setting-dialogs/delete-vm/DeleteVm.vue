<template>
  <v-dialog v-model="deleteMachineDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <div class="absolute left-4 top-4">
        <v-icon class="cursor-pointer" @click="deleteMachineDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h1 class="text-[24px] font-bold my-4 text-center">حذف سرور</h1>
      <div class="mb-5 text-justify">
        در صورت حذف سرور ابری تمامی اطلاعات مربوطه از بین خواهد رفت.
      </div>
      <!-- <div class="mb-5">
        <v-checkbox
          label="تمامی اسنپ شات های این ماشین نیز حذف شود."
        ></v-checkbox>
      </div> -->
      <v-btn block color="primary" :loading="loading" @click="deleteMachine">
        حذف کردن
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    deleteMachineDialog: false,
    loading: false,
    vmData: {},
  }),
  watch: {
    deleteMachineDialog(val) {
      if (
        this.deleteMachineDialog === false &&
        this.$store.getters["Dialog/active"] === "DeleteMachineDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.deleteMachineDialog = newValue === "DeleteMachineDialog";
        this.vmData = this.$store.getters["Dialog/getData"];
      }
    );
    this.deleteMachineDialog =
      this.$store.getters["Dialog/active"] === "DeleteMachineDialog";
  },
  methods: {
    async deleteMachine() {
      this.loading = true;
      try {
        const data = await this.$axios.delete("/service/vm", {
          headers: {
            Authorization: this.$store.getters["Auth/getToken"],
          },
          params: {
            project_id: this.vmData.projectId,
            virtual_machine_id: this.vmData.vmId,
          },
        });
        this.loading = false;
        this.$toast.success("ماشین با موفقیت حذف شد.", {
          timeout: 3000,
        });
        // this.$router.push(`/panel/cloud-server`);
        this.$emit("getVmList");
        this.deleteMachineDialog = false;
      } catch (err) {
        this.loading = false;
        console.error(err);
      }
    },
  },
};
</script>

<style></style>
