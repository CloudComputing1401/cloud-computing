<template>
  <div class="flex-center h-full w-full">
    <div
      class="max-w-[1000px] min-h-[600px] bg-white custom-shadow rounded-[20px] m-5"
    >
      <v-row>
        <v-col cols="12" md="5" class="pl-md-0">
          <div class="px-5">
            <h1 class="regular text-center text-2xl mt-5 mb-8">
              ثبت نام و تکمیل اطلاعات
            </h1>
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
                      :rules="firstNameRules"
                    />
                  </v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.lastName"
                      outlined
                      label="نام خانوادگی"
                      placeholder="نام خانوادگی خود را وارد کنید"
                      :rules="lastNameRules"
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.email"
                      outlined
                      label="ایمیل"
                      placeholder="ایمیل خود را وارد کنید"
                      :rules="emailRules"
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.mobile"
                      outlined
                      label="شماره همراه"
                      placeholder="شماره همراه خود را وارد کنید"
                      :rules="mobileRules"
                  /></v-col>
                  <v-col cols="12" class="py-0"
                    ><v-text-field
                      v-model="registerData.password"
                      :type="showPassword ? 'text' : 'password'"
                      outlined
                      label="پسوورد"
                      placeholder="پسوورد خود را وارد کنید"
                      :rules="passwordRules"
                      maxlength="50"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                  /></v-col>
                </v-row>
                <v-btn
                  type="submit"
                  block
                  height="50"
                  color="primary"
                  class="mt-4"
                  :disabled="!validForm"
                  :loading="loading"
                >
                  <span class="text-base text-white">ثبت نام</span>
                </v-btn>
              </v-form>
            </div>
          </div>
          <div class="flex-center mt-3">
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
export default {
  layout: "login",
  data() {
    return {
      showError: false,
      errorMessage: "",
      registerData: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      },
      showPassword: false,
      validForm: true,
      loading: false,
    };
  },
  computed: {
    passwordRules() {
      return [
        (v) => !!v || "رمز عبور جدید الزامی است.",
        (v) =>
          /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(v) ||
          "رمز عبور فقط می‌تواند شامل اعداد، حروف انگلیسی و کارکتر های خاص باشد.",
        (v) => v.length >= 8 || "رمز عبور حداقل باید شامل ۸کارکتر باشد.",
      ];
    },
    emailRules() {
      return [
        (v) => !!v || "وارد کردن ایمیل الزامی است",
        (v) => !v.match(/^[\u0600-\u06FF\s]+$/) || "ایمیل با حروف انگلیسی است.",
        (v) =>
          v.length === 0 ||
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "ایمیل اشتباه است.",
      ];
    },
    firstNameRules() {
      return [
        (v) => !!v || "وارد کردن نام الزامی است",
        (v) => v.length > 2 || "نام باید حداقل 3 کاراکتر باشد",
      ];
    },
    lastNameRules() {
      return [
        (v) => !!v || "وارد کردن نام خانوادگی الزامی است",
        (v) => v.length > 2 || "نام خانوادگی باید حداقل 3 کاراکتر باشد",
      ];
    },
    mobileRules() {
      return [
        (v) => !!v || "وارد کردن شماره موبایل الزامی است",
        (v) =>
          v === "" ||
          v === undefined ||
          /^(9|09)([0-9][0-9])\d{7}$/.test(v) ||
          "شماره همراه معتبر نیست.",
      ];
    },
  },
  methods: {
    async registerHandler() {
      if (this.$refs.validForm.validate()) {
        this.$axios.setHeader("Authorization", null);
        this.loading = true;
        try {
          const data = await this.$axios.post("users/register/", {
            first_name: this.registerData.firstName,
            last_name: this.registerData.lastName,
            password: this.registerData.password,
            email: this.registerData.email,
            phone_number: this.registerData.mobile,
          });
          this.loading = false;

          this.$toast.success("ثبت نام شما با موفقیت انجام شد.", {
            timeout: 3000,
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        } catch (err) {
          this.loading = false;
          this.errorMessage = "مشکل در ارسال اطلاعات";
          if (err.response.status === 400)
            this.errorMessage = "ایمیل وارد شده تکراری میباشد";

          this.$toast.error(this.errorMessage, {
            timeout: 4000,
          });
        }
      }
    },
  },
};
</script>

<style></style>
