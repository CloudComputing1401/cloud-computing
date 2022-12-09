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
      <div class="border border-[#d0d0d0] rounded p-4"></div>
    </div>
    <div class="mt-10">
      <h3 class="mb-4 text-[24px] font-bold">میزان استفاده از ram</h3>
      <div class="border border-[#d0d0d0] rounded p-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
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
};
</script>

<style></style>
