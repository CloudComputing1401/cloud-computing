<template>
  <v-dialog v-model="softwareRebootDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <div class="absolute left-4 top-4">
        <v-icon class="cursor-pointer" @click="softwareRebootDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h1 class="text-[24px] font-bold my-4 text-center">
        ریبوت نرم افزاری سرور
      </h1>
      <div class="mb-5 text-justify">
        معادل ریستارت کردن از طریق سیستم عامل می باشد.
      </div>
      <v-btn block color="primary" @click="rebootMachine"> ریبوت کردن </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    softwareRebootDialog: false,
    machineData: {},
  }),
  watch: {
    softwareRebootDialog(val) {
      if (
        this.softwareRebootDialog === false &&
        this.$store.getters["Dialog/active"] === "SoftwareRebootDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.softwareRebootDialog = newValue === "SoftwareRebootDialog";
        this.machineData = this.$store.getters["Dialog/getData"];
      }
    );
    this.softwareRebootDialog =
      this.$store.getters["Dialog/active"] === "SoftwareRebootDialog";
  },
  methods: {
    rebootMachine() {
      console.log(this.machineData.id);
    },
  },
};
</script>

<style></style>
