<template>
  <div class="rounded-lg border-2 border-primary regular">
    <div class="text-center bg-primary py-3">
      <h1 class="text-white text-lg">مشخصات ماشین</h1>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold">مرحله پایانی</h3>
      <v-row class="mt-5">
        <v-col cols="12" sm="4">
          <h4 class="text-lg font-bold">تعداد ماشین ها</h4>
          <div class="d-flex items-center mt-3">
            <v-btn color="primary" height="60">
              <span class="text-[24px]">+</span>
            </v-btn>
            <div
              class="
                d-flex
                justify-center
                items-center
                border-2 border-primary
                rounded
                w-[110px]
                h-[55px]
                mx-2
                select-none
                text-[20px]
              "
            >
              1
            </div>
            <v-btn color="primary">
              <span class="text-[24px]">-</span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="5">
          <h4 class="text-lg font-bold">نام ماشین</h4>
          <v-text-field outlined height="45" label="نام ماشین" class="mt-3" />
        </v-col>
        <v-col cols="12" sm="3">
          <h4 class="text-lg font-bold">پروژه</h4>
          <v-select
            label="پروژه"
            outlined
            no-data-text="پروژه ای یافت نشد"
            class="mt-3"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>