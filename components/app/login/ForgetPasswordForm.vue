<template>
  <div class="mt-[24px]">
    <div class="my-3">برای بازیابی رمز عبور ایمیل خود را وارد کنید:</div>
    <v-form
      ref="validForm"
      v-model="validForm"
      lazy-validation
      @submit.prevent="sendEmail"
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
    </v-form>
    <div
      v-ripple
      class="w-full h-[50px] flex-center bg-[#E0E0E0] rounded-md mt-3 text-black regular select-none cursor-pointer"
      @click="$emit('backToLogin')"
    >
      جهت ورود کلیک کنید
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    email: "",
    validForm: true,
  }),
  methods: {
    sendEmail() {
      if (this.$refs.validForm.validate()) {
        console.log("verify email");
      }
    },
  },
};
</script>

<style></style>
