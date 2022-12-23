<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg custom-shadow">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-nas</v-icon>
        <h1 class="regular text-3xl bold color-primary mr-2">پروژه ها</h1>
      </div>
      <div class="d-flex flex-row-reverse my-5">
        <v-btn
          color="primary"
          height="55"
          @click="$router.push('/panel/projects/add-project')"
        >
          <v-icon>mdi-plus</v-icon>
          <span>ایجاد پروژه جدید</span>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="mt-5 min-h-[300px]">
        <h2 class="regular text-xl">لیست پروژه های ایجاد شده</h2>
        <v-data-table
          :headers="headers"
          :items="projectData"
          :loading="loading"
          loading-text="در حال دریافت اطلاعات"
          no-data-text="هنوز پروژه ای ایجاد نشده است!"
          hide-default-footer
          class="mt-8"
        >
          <template v-slot:[`item.row`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.more`]>
            <v-btn text @click="$router.push('/panel/projects/ali')">
              جزئیات پروژه
            </v-btn>
          </template>
        </v-data-table>
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
          text: "ردیف",
          align: "center",
          sortable: false,
          value: "row",
        },
        {
          text: "نام پروژه",
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
          text: "بیشتر",
          align: "center",
          sortable: false,
          value: "more",
        },
      ],
      projectData: [],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.projectData = [
        {
          name: "پروژه اول",
          description: "توضیحات پروژه",
        },
      ];
      this.loading = false;
    }, 2000);
  },
  methods: {
    async getProjectsData() {
      try {
        const data = await this.$get("project/");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>