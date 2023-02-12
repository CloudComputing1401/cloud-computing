<template>
  <div>
    <div class="flex-between my-[30px]">
      <h2 class="text-[28px] font-bold">هارد دیسک ها</h2>
      <v-btn color="primary">هارد دیسک جدید</v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="hardsData"
      loading-text="در حال دریافت اطلاعات..."
      :loading="loading"
      no-data-text="در حال حاضر هیچ دیسکی وجود ندارد"
      hide-default-footer
    >
      <template v-slot:[`item.more`]="{ item }">
        <v-btn text>جزئیات هارد دیسک</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "نام",
          value: "name",
          align: "center",
          sortable: false,
        },
        { text: "ظرفیت", value: "capacity", align: "center", sortable: false },
        {
          text: "تاریخ ایجاد",
          value: "createdAt",
          align: "center",
          sortable: false,
        },
        { text: "بیشتر", value: "more", align: "center", sortable: false },
      ],
      loading: true,
      hardsData: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.hardsData = [];
    }, 2000);
  },
};
</script>

<style></style>
