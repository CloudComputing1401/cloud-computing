<template>
  <div class="d-flex justify-center items-center h-full w-full">
    <div
      class="max-w-[1200px] min-h-[550px] bg-white custom-shadow rounded-[20px] m-5"
    >
      <v-row>
        <v-col cols="12" md="6" class="pl-0">
          <div class="p-3">
            <h1 class="regular text-center text-2xl mt-5 mb-3">
              ثبت نام و تکمیل اطلاعات
            </h1>
            <div class="w-full h-[80px]">
              <v-expand-transition>
                <div
                  v-if="errorMessage"
                  class="w-full h-full border-2 border-red-500 rounded-md p-4 d-flex items-center"
                >
                  <v-icon color="red">mdi-alert-circle-outline</v-icon>
                  <h3 class="mr-2 regular text-lg">
                    نام کاربری یا رمز عبور شما نادرست است
                  </h3>
                </div>
              </v-expand-transition>
            </div>
            <div class="w-full mt-5">
              <v-form>
                <v-row>
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
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      outlined
                      label="ایمیل"
                      placeholder="ایمیل خود را وارد کنید"
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      outlined
                      label="شماره ملی"
                      placeholder="شماره ملی خود را وارد کنید"
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      outlined
                      label="شماره همراه"
                      placeholder="شماره همراه خود را وارد کنید"
                  /></v-col>
                </v-row>
                <v-btn
                  block
                  height="50"
                  color="primary"
                  @click="errorMessage = true"
                >
                  <span class="text-base text-white">ثبت نام</span>
                </v-btn>
              </v-form>
            </div>
          </div>
          <div class="d-flex justify-center items-center">
            <span class="regular">آیا حساب کاربری دارید؟</span>
            <span
              class="mx-2 bold text-[#060d2d] cursor-pointer"
              @click="$router.push('/login')"
              >ورود</span
            >
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pr-0">
          <img
            src="/img/login.jpg"
            class="min-h-[600px] rounded-l-[20px]"
            alt=""
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      errorMessage: false,
    };
  },
};
</script>

<style></style>
