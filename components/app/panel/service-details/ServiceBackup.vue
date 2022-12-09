<template>
  <div class="py-3 min-h-[400px]">
    <div class="d-flex items-center mt-5">
      <v-icon color="primary" size="50">mdi-file-cog</v-icon>
      <h1 class="text-[24px] font-bold mr-2">گرفتن نسخه پشتیبان</h1>
    </div>
    <div class="mt-4 mb-7 text-justify">
      شما میتوانید با پرداخت هزینه ای به صورت هفتگی از ماشین خود نسخه پشتیبان
      تهیه نمایید که در صورت نیاز آن را به آخرین وضعیت مطلوب برگردانید.
    </div>
    <v-form
      v-model="validForm"
      ref="validForm"
      lazy-validation
      @submit.prevent="ali"
    >
      <v-row>
        <v-col cols="12" md="6">
          <div>
            <v-text-field
              v-model="backupName"
              label="نام نسخه پشتیبان"
              outlined
              :rules="[(v) => !!v || 'وارد کردن نام الزامی است.']"
            />
          </div>
          <div>
            <v-textarea
              v-model="backupDescription"
              label="توضیحات"
              outlined
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="12" md="6" class="relative">
          <div class="d-flex flex-row-reverse items-end h-full">
            <v-btn color="primary" :disabled="!validForm" type="submit"
              >گرفتن نسخه پشتیبان</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-form>
    <v-divider class="my-10" />
    <div class="my-5">
      <h2 class="text-[24px] mr-2">نسخه های پشتیبان</h2>
      <v-data-table
        :headers="headers"
        :items="backupsData"
        loading-text="در حال دریافت اطلاعات..."
        no-data-text="نسخه پشتیبانی یافت نشد"
        hide-default-footer
        class="mt-5"
      >
        <template v-slot:[`item.serverIcon`]>
          <v-icon>mdi-server</v-icon>
        </template>
        <template v-slot:[`item.more`]>
          <v-menu rounded offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn text v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                link
                @click="
                  $store.dispatch('Dialog/showDialog', {
                    name: 'UseBackupDialog',
                    data: {
                      name: '',
                      id: '213',
                    },
                  })
                "
              >
                <v-list-item-title>استفاده وایجاد ماشین</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="editBackupDialog = true">
                <v-list-item-title>ویرایش</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                @click="
                  $store.dispatch('Dialog/showDialog', {
                    name: 'DeleteBackupDialog',
                    data: {
                      name: '',
                      id: '213',
                    },
                  })
                "
              >
                <v-list-item-title class="text-red-500">حذف</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>
    <use-backup />
    <v-dialog v-model="editBackupDialog" max-width="650">
      <edit-backup :backupData="data" />
    </v-dialog>
    <delete-backup />
  </div>
</template>

<script>
import DeleteBackup from "../dialogs/backup-dialogs/delete-dialog/DeleteBackup.vue";
import EditBackup from "../dialogs/backup-dialogs/edit-backup/EditBackup.vue";
import UseBackup from "../dialogs/backup-dialogs/use-backup/UseBackup.vue";
export default {
  components: { UseBackup, EditBackup, DeleteBackup },
  data: () => ({
    editBackupDialog: false,
    data: {
      name: "test",
      description: "this is a test",
    },
    validForm: true,
    backupName: "",
    backupDescription: "",
    headers: [
      {
        text: "",
        align: "center",
        sortable: false,
        value: "serverIcon",
      },
      {
        text: "نام نسخه پشتیبان",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "توضیحات",
        align: "center",
        sortable: false,
        value: "description",
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
    backupsData: [
      {
        name: "تست",
        description: "توضیحات مربوط به نسخه پشتیبان",
        createdAt: "1401/7/5",
      },
    ],
  }),
  methods: {
    ali() {
      if (this.$refs.validForm.validate()) {
        console.log(this.backupName, "hiiiiiiii");
      }
    },
  },
};
</script>

<style>
</style>
