<template>
  <div>
    <div class="flex-between border border-[#d0d0d0] rounded p-3 my-3">
      <div class="d-flex items-center">
        <img src="/img/windows.png" alt="" class="w-[50px] h-[50px] ml-2" />
        <span class="py-1 px-4 rounded text-white bg-green-500">فعال</span>
      </div>
      <div>نام سرور ابری</div>
      <div>192.168.100.170:3000</div>
      <div>تاریخ ایجاد</div>
      <v-menu rounded offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link :to="`/panel/projects/${id}/instances/vmid`">
            <v-list-item-title>مشاهده جزئیات</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>مدیریت نسخه های پشتیبان</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>ریبوت سخت افزاری سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>ریبوت نرم افزاری سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>متوقف کردن سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>خاموش کردن سرور</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>حذف سرور</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectData: [],
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style></style>
