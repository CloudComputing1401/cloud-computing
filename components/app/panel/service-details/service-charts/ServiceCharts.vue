<template>
  <div class="py-3 min-h-[400px]">
    <div class="d-flex items-center justify-between mt-5">
      <div class="d-flex items-center">
        <v-icon color="primary" size="60">mdi-chart-box-outline</v-icon>
        <div class="mr-2">
          شما می‌توانید نمودارهای مربوط به بخش‌های پردازنده، پهنای باند و میزان
          مصرف خود را مشاهده کنید.
        </div>
      </div>
      <div>
        <v-select
          outlined
          label="انتخاب بازه زمانی"
          hide-details
          :items="items"
          item-value="value"
          item-text="time"
        />
      </div>
    </div>
    <div class="mt-10">
      <h3 class="mb-4 text-[24px] font-bold">میزان استفاده از cpu</h3>
      <div
        class="
          w-full
          min-h-[200px]
          d-flex
          items-center
          justify-center
          border border-[#d0d0d0]
          rounded
          p-4
        "
      >
        <loading v-if="loading" />
        <div v-else>
          <div class="w-full h-auto text-center">
            <v-icon size="80">mdi-alert-circle-outline</v-icon>
            <div class="my-2">خطادر دریافت اطلاعات!</div>
            <v-btn text color="primary" height="40">
              <span class="text-priamry font-semibold text-base"
                >تلاش مجدد</span
              >
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <h3 class="mb-4 text-[24px] font-bold">میزان استفاده از ram</h3>
      <div
        class="
          w-full
          min-h-[200px]
          d-flex
          items-center
          justify-center
          border border-[#d0d0d0]
          rounded
          p-4
        "
      >
        <loading v-if="loading" />
        <div v-else>
          <div class="w-full h-auto text-center">
            <v-icon size="80">mdi-alert-circle-outline</v-icon>
            <div class="my-2">خطادر دریافت اطلاعات!</div>
            <v-btn text color="primary" height="40">
              <span class="text-priamry font-semibold text-base"
                >تلاش مجدد</span
              >
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    items: [
      {
        time: "یک روزه",
        value: "daily",
      },
      {
        time: "یک هفته",
        value: "weekly",
      },
      {
        time: "یک ماه",
        value: "monthly",
      },
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style></style>
