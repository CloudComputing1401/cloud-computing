<template>
  <div class="py-3 min-h-[400px]">
    <div class="d-flex items-center mt-5">
      <v-icon color="primary" size="50">mdi-harddisk-plus</v-icon>
      <h1 class="text-[24px] font-bold mr-2">هارد دیسک</h1>
    </div>
    <div class="my-5">
      دیسک‌های ابری، منابع قدرتمندی هستند که میتوانید به ماشین خود اتصال دهید و
      در صورت عدم نیاز جدا کنید.
    </div>
    <div class="d-flex flex-row-reverse">
      <v-btn color="primary">افزودن هارد دیسک</v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="hardDiskData"
      loading-text="در حال دریافت اطلاعات..."
      hide-default-footer
      class="mt-10"
    >
      <template v-slot:[`item.serverIcon`]>
        <div class="d-flex items-center">
          <v-icon>mdi-folder-google-drive</v-icon>
          <div class="py-1 px-2 bg-blue-300 rounded text-sm text-white mr-2">
            متصل به سرور
          </div>
        </div>
      </template>
      <template v-slot:[`item.more`]>
        <v-menu rounded offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="splitHardDiskDialog = true">
              <v-list-item-title>جداسازی هارد دیسک</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>مدیریت نسخه پشتیبان</v-list-item-title>
            </v-list-item>
            <v-list-item link disabled>
              <v-list-item-title>ویرایش</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="deleteHardDialog = true">
              <v-list-item-title class="text-red-500"
                >حذف هارد دیسک</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-dialog v-model="splitHardDiskDialog" max-width="600">
      <split-hard-disk @closeDialog="splitHardDiskDialog = false" />
    </v-dialog>
    <v-dialog v-model="deleteHardDialog" max-width="600">
      <delete-hard-disk @closeDialog="deleteHardDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import DeleteHardDisk from "./hard-disk-dialog/delete-hard-disk/DeleteHardDisk.vue";
import SplitHardDisk from "./hard-disk-dialog/split-hard-disk/SplitHardDisk.vue";
export default {
  components: { SplitHardDisk, DeleteHardDisk },
  data: () => ({
    splitHardDiskDialog: false,
    deleteHardDialog: false,
    headers: [
      {
        text: "",
        align: "center",
        sortable: false,
        value: "serverIcon",
      },
      {
        text: "نام",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "ظرفیت",
        align: "center",
        sortable: false,
        value: "capacity",
      },
      {
        text: "تاریخ ایجاد",
        align: "center",
        sortable: false,
        value: "createdAt",
      },
      {
        text: "بیشتر",
        align: "center",
        sortable: false,
        value: "more",
      },
    ],
    hardDiskData: [
      {
        name: "هارد دیسک یک",
        capacity: "2 Gig",
        createdAt: "1401/7/4",
      },
    ],
  }),
};
</script>

<style></style>
