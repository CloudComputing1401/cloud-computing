<template>
  <div class="py-3 min-h-[400px]">
    <div class="d-flex items-center mt-5">
      <v-icon color="primary" size="50">mdi-server-security</v-icon>
      <h1 class="text-[24px] font-bold mr-2">فایروال</h1>
    </div>
    <div class="my-5">
      گروه‌های امنیت مورد نظر خود را در این قسمت برای ماشین مشخص کنید.
    </div>
    <div class="d-flex flex-row-reverse">
      <v-btn color="primary">افزودن گروه امنیتی</v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="hardDiskData"
      loading-text="در حال دریافت اطلاعات..."
      hide-default-footer
      class="mt-10"
    >
      <template v-slot:[`item.firewallIcon`]>
        <div class="d-flex items-center">
          <v-icon>mdi-shield-lock-outline</v-icon>
        </div>
      </template>
      <template v-slot:[`item.action`]>
        <v-menu rounded offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link>
              <v-list-item-title>انتقال به صفحه فایروال</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>ویرایش گروه امنیتی</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title class="text-red-500"
                >حذف گروه امنیتی</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "",
        align: "center",
        sortable: false,
        value: "firewallIcon",
        width: "50px",
      },
      {
        text: "نام",
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
        text: "عملیات",
        align: "center",
        sortable: false,
        value: "action",
      },
    ],
    hardDiskData: [
      {
        name: "هارد دیسک یک",
        description: "This security group was created for windows image",
      },
    ],
  }),
};
</script>

<style>
</style>