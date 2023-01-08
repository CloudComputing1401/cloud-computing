<template>
  <div>
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
            !v.match(/^[\u0600-\u06FF\s]+$/) || 'ایمیل با حروف انگلیسی است.',
          (v) =>
            v.length === 0 ||
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
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
          (v) => v.length >= 8 || 'رمز عبور حداقل باید شامل ۸کارکتر باشد.',
        ]"
        maxlength="50"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      />
      <div
        class="d-flex flex-row-reverse cursor-pointer"
        @click="$emit('forgetPassword')"
      >
        <span class="regular text-sm">رمز عبور خود را فراموش کرده اید؟</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
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
          if (err.response?.status === 401)
            this.$emit("error", "ایمیل یا رمز عبور وارد شده نادرست است");
          else this.$emit("error", "مشکل در ارسال اطلاعات");
        }
      }
    },
  },
};
</script>

<style>
</style>