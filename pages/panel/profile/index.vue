<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="d-flex items-center">
        <v-icon color="primary" size="75">mdi-account-circle-outline</v-icon>
        <h1 class="regular text-3xl bold color-primary ml-2">پروفایل</h1>
      </div>
      <div class="py-8">
        <h1 class="regular text-lg">مشاهده و ویرایش اطلاعات</h1>
        <v-row class="mt-5">
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              outlined
              label="نام"
              placeholder="نام خود را وارد کنید"
            />
          </v-col>
          <v-col cols="12" md="6" class="py-0"
            ><v-text-field
              outlined
              label="نام خانوادگی"
              placeholder="نام خانوادگی خود را وارد کنید"
          /></v-col>
          <v-col cols="12" md="6" class="py-0"
            ><v-text-field
              outlined
              label="ایمیل"
              placeholder="ایمیل خود را وارد کنید"
          /></v-col>
          <v-col cols="12" md="6" class="py-0"
            ><v-text-field
              outlined
              label="شماره ملی"
              placeholder="شماره ملی خود را وارد کنید"
          /></v-col>
          <v-col cols="12" md="6" class="py-0"
            ><v-text-field
              outlined
              label="شماره همراه"
              placeholder="شماره همراه خود را وارد کنید"
          /></v-col>
        </v-row>
        <div class="d-flex flex-row-reverse">
          <v-btn color="primary" height="55">ذخیره اطلاعات</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="py-8">
        <h1 class="regular text-lg">تایید شماره موبایل</h1>
        <div class="d-flex justify-between items-start mt-4">
          <div class="d-flex items-center">
            <v-icon color="black">mdi-square-rounded</v-icon>
            <span class="mr-2 regular"
              >در این قسمت شما میتوانید شماره موبایلی که با آن حساب خود را ایجاد
              کرده اید تغییر دهید.</span
            >
          </div>
          <v-btn height="55" color="primary">تغییر شماره موبایل</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="py-8">
        <h1 class="regular text-lg">تغییر رمز عبور</h1>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
};
</script>

<style scoped></style>
