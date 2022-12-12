<template>
  <div class="p-4 bg-white relative">
    <v-icon
      class="cursor-pointer absolute right-1 top-1"
      @click="editBackupDialog = false"
      >mdi-close</v-icon
    >
    <h1 class="text-[24px] font-bold my-4 text-center">ویرایش نسخه پشتیبان</h1>
    <div>
      <v-form>
        <v-text-field v-model="backupDescription" outlined label="نام نسخه" />
        <v-textarea v-model="backupName" outlined label="توضیحات"></v-textarea>
        <v-btn block color="primary" @click="editBackup"> ویرایش </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backupData: Object,
  },
  data: () => ({
    backupName: "",
    backupDescription: "",
  }),
  mounted() {
    this.backupName = this.backupData.name;
    this.backupDescription = this.backupData.description;
  },
  methods: {
    editBackup() {},
  },
};
</script>

<style>
</style>