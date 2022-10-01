<template>
  <div class="d-flex justify-center items-center h-full w-full">
    <div class="w-[1000px] min-h-[550px] bg-white custom-shadow rounded-[20px] m-5">
      <v-row>
        <v-col cols="12" md="5" class="pl-0">
          <div class="p-3">
            <h1 class="regular text-center text-2xl mt-5 mb-3">
              ورود به پنل کاربری
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
            <v-expand-transition>
              <div v-if="!forgetPass" class="w-full mt-5">
                <v-form>
                  <v-text-field
                    v-model="email"
                    outlined
                    label="ایمیل"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                  <v-text-field
                    v-model="password"
                    outlined
                    label="رمز عبور"
                    placeholder="رمز عبور خود را وارد کنید"
                    :rules="[(v) => !!v || 'وارد کردن رمز عبور الزامی است']"
                  />
                  <div
                    class="d-flex flex-row-reverse cursor-pointer"
                    @click="forgetPass = true"
                  >
                    <span class="regular text-sm"
                      >رمز عبور خود را فراموش کرده اید؟</span
                    >
                  </div>
                  <div class="mt-4">
                    <v-btn block height="50" color="primary" @click="login()">
                      <span class="text-base text-white">ورود</span>
                    </v-btn>
                    <nuxt-link to="/register">
                      <div
                        v-ripple
                        class="w-full h-[50px] d-flex items-center justify-center bg-[#E0E0E0] rounded-md mt-3 text-black regular"
                      >
                        ثبت نام
                      </div>
                    </nuxt-link>
                  </div>
                </v-form>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-if="forgetPass">
                <h1>hosseinali</h1>
              </div>
            </v-expand-transition>
          </div>
        </v-col>
        <v-col cols="12" md="7" class="pr-0">
          <img
            src="/img/login.jpg"
            class="min-h-[550px] rounded-l-[20px]"
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
      email: "",
      password: "",
      forgetPass: false,
      errorMessage: false,
    };
  },
  methods: {
    login() {
      this.$router.push("/panel");
    },
  },
};
</script>

<style></style>
