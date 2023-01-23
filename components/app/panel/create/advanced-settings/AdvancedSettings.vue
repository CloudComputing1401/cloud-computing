<template>
  <div class="rounded-lg border-2 border-primary regular">
    <div class="text-center bg-primary py-3">
      <h1 class="text-white regular text-lg">تنظیمات پیشرفته (اختیاری)</h1>
    </div>
    <div class="p-4">
      <div class="custom-shadow rounded-md p-5">
        <h1 class="text-2xl font-semibold">افزودن هارد دیسک</h1>
        <div class="d-flex justify-between items-center mt-3">
          <span
            >در این قسمت می توانید یک هارد دیسک به ماشین خود اضافه کنید.
          </span>
          <v-btn color="primary" height="55" @click="addHardDialog = true"
            >افزودن هارد دیسک</v-btn
          >
        </div>
      </div>
      <div class="custom-shadow rounded-md p-5 mt-6">
        <h1 class="text-2xl font-semibold">گروه های امنیتی(فایروال)</h1>
        <div class="d-flex justify-between items-center mt-3">
          <span>گروه های امنیت مورد نظر خود را در این قسمت مشخص کنید. </span>
          <v-btn color="primary" height="55" @click="addSecurityDialog = true"
            >افزودن گروه امنیتی</v-btn
          >
        </div>
      </div>
    </div>
    <v-dialog max-width="900" v-model="addHardDialog">
      <add-hard-disk @closeDialog="addHardDialog = false" />
    </v-dialog>
    <v-dialog max-width="700" v-model="addSecurityDialog">
      <add-security-group @closeDialog="addSecurityDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import AddHardDisk from "./add-hard-disk/AddHardDisk.vue";
import AddSecurityGroup from "./add-security-group/AddSecurityGroup.vue";
export default {
  components: { AddHardDisk, AddSecurityGroup },
  data: () => ({
    addHardDialog: false,
    addSecurityDialog: false,
  }),
};
</script>

<style>
</style>