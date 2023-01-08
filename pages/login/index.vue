<template>
  <div class="d-flex justify-center items-center h-full w-full">
    <div
      class="w-[1000px] min-h-[550px] bg-white custom-shadow rounded-[20px] m-5"
    >
      <v-row>
        <v-col cols="12" md="5" class="pl-md-0">
          <div class="p-3">
            <h1 class="regular text-center text-2xl mt-5 mb-3">
              ورود به پنل کاربری
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
                <v-form
                  ref="validForm"
                  v-model="validForm"
                  lazy-validation
                  @submit.prevent="login"
                >
                  <v-text-field
                    v-model="email"
                    outlined
                    label="ایمیل"
                    placeholder="ایمیل خود را وارد کنید"
                    :rules="[
                      (v) => !!v || 'وارد کردن ایمیل الزامی است',
                      (v) =>
                        !v.match(/^[\u0600-\u06FF\s]+$/) ||
                        'ایمیل با حروف انگلیسی است.',
                      (v) =>
                        v.length === 0 ||
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          v
                        ) ||
                        'ایمیل اشتباه است.',
                    ]"
                  />
                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    label="پسوورد"
                    placeholder="پسوورد خود را وارد کنید"
                    :rules="[
                      (v) => !!v || 'وارد کردن رمز عبور الزامی است.',
                      (v) =>
                        v.length >= 8 ||
                        'رمز عبور حداقل باید شامل ۸کارکتر باشد.',
                    ]"
                    maxlength="50"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
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
                    <v-btn
                      type="submit"
                      block
                      height="50"
                      color="primary"
                      :disabled="!validForm"
                      :loading="loading"
                    >
                      <span class="text-base text-white">ورود</span>
                    </v-btn>
                  </div>
                </v-form>
                <nuxt-link to="/register">
                  <div
                    v-ripple
                    class="
                      w-full
                      h-[50px]
                      d-flex
                      items-center
                      justify-center
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
      showPassword: false,
      forgetPass: false,
      showError: false,
      errorMessage: "",
      validForm: true,
      loading: false,
    };
  },
  methods: {
    async login() {
      if (this.$refs.validForm.validate()) {
        this.loading = true;
        try {
          const data = await this.$post("users/token/", {
            password: this.password,
            email: this.email,
          });
          console.log(data, "ali");
          this.loading = false;
          this.$store.commit("Auth/setToken", data.data.access);
          this.$router.push("/panel");
        } catch (err) {
          this.loading = false;
          this.errorMessage = "مشکل در ارسال اطلاعات";
          if (err.response?.status === 401)
            this.errorMessage = "ایمیل یا رمز عبور وارد شده نادرست است";
          this.showError = true;
        }
      }
    },
  },
};
</script>

<style></style>
