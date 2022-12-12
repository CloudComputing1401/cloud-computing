<template>
  <v-dialog v-model="useBackupDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <v-icon
        class="cursor-pointer absolute left-1 top-1"
        @click="useBackupDialog = false"
        >mdi-close</v-icon
      >
      <h1 class="text-[24px] font-bold my-4 text-center">
        استفاده از نسخه پشتیبان
      </h1>
      <div class="mb-5 text-justify">
        آیا برای استفاده از این نسخه پشتیبان اطمینان دارید؟
      </div>
      <v-btn block color="primary" @click="useBackup">
        استفاده از نسخه پشتیبان
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    useBackupDialog: false,
    machineData: {},
  }),
  watch: {
    useBackupDialog(val) {
      if (
        this.useBackupDialog === false &&
        this.$store.getters["Dialog/active"] === "UseBackupDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.useBackupDialog = newValue === "UseBackupDialog";
        this.machineData = this.$store.getters["Dialog/getMachineData"];
      }
    );
    this.useBackupDialog =
      this.$store.getters["Dialog/active"] === "UseBackupDialog";
  },
  methods: {
    useBackup() {
      console.log(this.machineData.id);
    },
  },
};
</script>

<style>
</style>