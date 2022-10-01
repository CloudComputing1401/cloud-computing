<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-harddisk-plus</v-icon>
        <h1 class="regular text-3xl bold color-primary ml-2">هارد دیسک ها</h1>
      </div>
      <div class="d-flex flex-row-reverse my-5">
        <v-btn
          color="primary"
          height="55"
          @click="$router.push('/panel/projects/add-project')"
        >
          <v-icon>mdi-plus</v-icon>
          <span>ایجاد هارد دیسک</span>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="mt-5">
        <h2 class="regular text-xl">لیست هارد دیسک های ایجاد شده</h2>
        <div class="min-h-[250px]">
          <v-data-table
            :headers="headers"
            :items="hardDiskData"
            hide-default-footer
            no-data-text="اطلاعاتی دریافت نشد!"
            loading-text="در حال دریافت اطلاعات"
            :loading="loading"
            class="regular border mt-5"
          >
          </v-data-table>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
  data() {
    return {
      headers: [
        {
          text: "نام",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "ظرفیت",
          align: "start",
          sortable: false,
          value: "capacity",
        },
        {
          text: "پروژه",
          align: "start",
          sortable: false,
          value: "projectName",
        },
        {
          text: "تاریخ ایجاد",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        {
          text: "بیشتر",
          align: "start",
          sortable: false,
          value: "more",
        },
      ],
      hardDiskData: [],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  },
};
</script>

<style>
</style>