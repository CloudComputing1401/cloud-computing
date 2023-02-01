<template>
  <v-dialog v-model="deleteBackupDialog" max-width="600">
    <div class="p-4 bg-white relative">
      <div class="absolute left-4 top-4">
        <v-icon class="cursor-pointer" @click="useBackupDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h1 class="text-[24px] font-bold my-4 text-center">حذف نسخه پشتیبان</h1>
      <div class="mb-5 text-justify">
        آیا از حذف این نسخه پشتیبان اطمینان دارید؟
      </div>
      <v-btn block color="error" @click="deleteBackup"> حذف </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    deleteBackupDialog: false,
    machineData: {},
  }),
  watch: {
    deleteBackupDialog(val) {
      if (
        this.deleteBackupDialog === false &&
        this.$store.getters["Dialog/active"] === "DeleteBackupDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.deleteBackupDialog = newValue === "DeleteBackupDialog";
        this.machineData = this.$store.getters["Dialog/getData"];
      }
    );
    this.deleteBackupDialog =
      this.$store.getters["Dialog/active"] === "DeleteBackupDialog";
  },
  methods: {
    deleteBackup() {
      console.log(this.machineData.id);
    },
  },
};
</script>

<style></style>
