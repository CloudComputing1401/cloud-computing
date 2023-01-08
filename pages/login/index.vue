<template>
  <div class="w-[1000px] h-auto bg-white custom-shadow rounded-[20px] m-5">
    <v-row>
      <v-col cols="12" md="5" class="pl-md-0">
        <div class="p-3">
          <h1 class="regular text-center text-2xl mt-5 mb-3">
            {{ forgetPass ? "فراموشی رمز عبور" : "ورود به پنل کاربری" }}
          </h1>
          <div class="w-full h-[70px]">
            <v-expand-transition>
              <div
                v-if="showError"
                class="
                  w-full
                  h-[60px]
                  border-2 border-red-500
                  rounded-md
                  px-4
                  py-2
                  d-flex
                  items-center
                "
              >
                <v-icon color="red">mdi-alert-circle-outline</v-icon>
                <h3 class="mr-2 regular text-base text-red-500">
                  {{ errorMessage }}
                </h3>
              </div>
            </v-expand-transition>
          </div>
          <v-expand-transition>
            <div v-if="!forgetPass" class="w-full mt-5">
              <login-form
                @forgetPassword="(forgetPass = true), (showError = false)"
                @error="errorHandler($event)"
              />
              <nuxt-link to="/register">
                <div
                  v-ripple
                  class="
                    w-full
                    h-[50px]
                    flex-center
                    bg-[#E0E0E0]
                    rounded-md
                    mt-3
                    text-black
                    regular
                  "
                >
                  ثبت نام
                </div>
              </nuxt-link>
            </div>
          </v-expand-transition>
          <v-expand-transition>
            <div v-if="forgetPass">
              <forget-password-form @backToLogin="forgetPass = false" />
            </div>
          </v-expand-transition>
        </div>
      </v-col>
      <v-col cols="12" md="7" class="pr-0" v-if="$vuetify.breakpoint.mdAndUp">
        <img
          src="/img/login.jpg"
          class="min-h-[550px] rounded-l-[20px]"
          alt=""
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoginForm from "../../components/app/login/LoginForm.vue";
import ForgetPasswordForm from "../../components/app/login/ForgetPasswordForm.vue";
export default {
  layout: "login",
  components: {
    LoginForm,
    ForgetPasswordForm,
  },
  data() {
    return {
      forgetPass: false,
      showError: false,
      errorMessage: "",
    };
  },
  methods: {
    errorHandler(errorText) {
      this.showError = true;
      this.errorMessage = errorText;
    },
  },
};
</script>

<style></style>
