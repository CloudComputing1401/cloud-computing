<template>
  <div>
    <div class="d-flex items-center justify-between my-[30px]">
      <h2 class="text-[28px] font-bold">سرورهای ابری</h2>
      <v-btn color="primary">سرور ابری جدید</v-btn>
    </div>
    <div
      :class="[
        loading || projectData.length === 0
          ? 'd-flex justify-center items-center'
          : null,
        'min-h-[200px]',
      ]"
    >
      <loading v-if="loading" />
      <template v-if="!loading">
        <div
          v-if="projectData.length > 0"
          class="
            d-flex
            items-center
            justify-between
            border border-[#d0d0d0]
            rounded
            p-3
            my-3
          "
        >
          <div class="d-flex items-center">
            <img src="/img/windows.png" alt="" class="w-[50px] h-[50px] ml-2" />
            <span class="py-1 px-4 rounded text-white bg-green-500">فعال</span>
          </div>
          <div>نام سرور ابری</div>
          <div>192.168.100.170:3000</div>
          <div>تاریخ ایجاد</div>
          <v-menu rounded offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn class="" color="primary" v-bind="attrs" v-on="on">
                <span>جزئیات</span>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link>
                <v-list-item-title>منو</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div v-else>
          <h1 class="regular text-xl">اطلاعاتی یافت نشد!</h1>
        </div>
      </template>
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
    }, 4000);
  },
};
</script>

<style>
</style>