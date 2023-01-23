<template>
  <div>
    <div
      class="d-block d-md-flex items-center justify-between border border-[#d0d0d0] rounded p-3 my-3"
    >
      <div class="flex-center">
        <img src="/img/windows.png" alt="" class="w-[50px] h-[50px] ml-2" />
        <span class="py-1 px-4 rounded text-white bg-green-500">فعال</span>
      </div>
      <div
        class="w-full sm:w-[85%] md:w-[60%] d-block d-sm-flex items-center justify-between mx-auto my-5 my-md-0 text-center"
      >
        <div>نام سرور ابری</div>
        <div class="my-2 sm:my-0">192.168.100.170:3000</div>
        <div>تاریخ ایجاد</div>
      </div>
      <v-menu rounded offset-y>
        <template v-slot:activator="{ attrs, on }">
          <div class="w-[70px] mx-auto flex-center">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </div>
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
  props: {
    data: Object,
  },
  data() {
    return {
      id: 5,
    };
  },
};
</script>

<style></style>
