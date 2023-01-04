<template>
  <div class="d-flex justify-center items-center h-full w-full">
    <div
      class="
        max-w-[1000px]
        min-h-[600px]
        bg-white
        custom-shadow
        rounded-[20px]
        m-5
      "
    >
      <v-row>
        <v-col cols="12" md="5" class="pl-md-0">
          <div class="p-3">
            <h1 class="regular text-center text-2xl mt-5 mb-3">
              ثبت نام و تکمیل اطلاعات
            </h1>
            <div class="w-full h-[70px]">
              <v-expand-transition>
                <div
                  v-if="errorMessage"
                  class="
                    w-full
                    h-full
                    border-2 border-red-500
                    rounded-md
                    p-4
                    d-flex
                    items-center
                  "
                >
                  <v-icon color="red">mdi-alert-circle-outline</v-icon>
                  <h3 class="mr-2 regular text-base text-red-500">
                    خطا در ارسال اطلاعات
                  </h3>
                </div>
              </v-expand-transition>
            </div>
            <div class="w-full mt-5">
              <v-form
                @submit.prevent="registerHandler"
                lazy-validation
                ref="validForm"
                v-model="validForm"
              >
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="registerData.firstName"
                      outlined
                      label="نام"
                      placeholder="نام خود را وارد کنید"
                      :rules="[
                        (v) => !!v || 'وارد کردن نام الزامی است',
                        (v) =>
                          !!v.match(/^[\u0600-\u06FF\s]+$/) ||
                          'از حروف فارسی استفاده کنید.',
                        (v) => v.length > 2 || 'نام باید حداقل 3 کاراکتر باشد',
                      ]"
                    />
                  </v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.lastName"
                      outlined
                      label="نام خانوادگی"
                      placeholder="نام خانوادگی خود را وارد کنید"
                      :rules="[
                        (v) => !!v || 'وارد کردن نام خانوادگی الزامی است',
                        (v) =>
                          !!v.match(/^[\u0600-\u06FF\s]+$/) ||
                          'از حروف فارسی استفاده کنید.',
                        (v) =>
                          v.length > 2 ||
                          'نام خانوادگی باید حداقل 3 کاراکتر باشد',
                      ]"
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.email"
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
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.password"
                      :type="showPassword ? 'text' : 'password'"
                      outlined
                      label="پسوورد"
                      placeholder="پسوورد خود را وارد کنید"
                      :rules="[
                        (v) => !!v || 'رمز عبور جدید الزامی است.',
                        (v) =>
                          /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(v) ||
                          'رمز عبور فقط می‌تواند شامل اعداد، حروف انگلیسی و کارکتر های خاص باشد.',
                        (v) =>
                          v.length >= 8 ||
                          'رمز عبور حداقل باید شامل ۸کارکتر باشد.',
                      ]"
                      maxlength="50"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                  /></v-col>
                  <!-- <v-col cols="12" class="py-0"
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
                  /></v-col> -->
                </v-row>
                <v-btn
                  type="submit"
                  block
                  height="50"
                  color="primary"
                  class="mt-1"
                  :disabled="!validForm"
                  :loading="loading"
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
        <v-col cols="12" md="7" class="pr-0">
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
import registerVue from "../../components/app/register/register.vue";
export default {
  layout: "login",
  data() {
    return {
      errorMessage: false,
      registerData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      showPassword: false,
      validForm: true,
      loading: false,
    };
  },
  methods: {
    async registerHandler() {
      if (this.$refs.validForm.validate()) {
        this.loading = true;
        try {
          const data = await this.$post("users/register/", {
            first_name: this.registerData.firstName,
            last_name: this.registerData.lastName,
            password: this.registerData.password,
            email: this.registerData.email,
          });
          this.loading = false;
          this.$store.dispatch(
            "SnackBar/show",
            "ثبت نام شما با موفقیت انجام شد."
          );
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } catch (err) {
          this.loading = false;
          console.log(err);
        }
      }
    },
  },
};
</script>

<style></style>
