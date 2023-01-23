<template>
  <div class="p-4 bg-white relative">
    <div
      class="absolute left-4 top-4 cursor-pointer"
      @click="$emit('closeDialog')"
    >
      <v-icon>mdi-close</v-icon>
    </div>
    <div class="my-8">
      کد مربوط به public key خود را در این قسمت قرار دهید.(انتخاب نام ضروری است)
    </div>
    <v-form
      lazy-validation
      ref="validForm"
      v-model="validForm"
      @submit.prevent=""
    >
      <v-text-field
        outlined
        v-model="sshName"
        label="نام"
        placeholder="نام ssh key را وارد کنید"
        :rules="[(v) => !!v || 'وارد کردن نام الزامی است']"
      />
      <v-textarea
        outlined
        v-model="sshKey"
        placeholder="کلید خود را وارد کنید"
        :rules="[(v) => !!v || 'وارد کردن کلید الزامی است']"
      ></v-textarea>
    </v-form>
    <div class="mt-5 d-flex flex-row-reverse">
      <v-btn
        color="primary"
        width="100"
        class="mr-2"
        :loading="loading"
        :disabled="!validForm"
        @click="addSshKey"
        >تایید</v-btn
      >
      <v-btn color="primary" outlined width="100">انصراف</v-btn>
    </div>
    <snack-bar />
  </div>
</template>

<script>
export default {
  data: () => ({
    sshName: "",
    sshKey: "",
    validForm: true,
    loading: false,
  }),
  methods: {
    async addSshKey() {
      if (this.$refs.validForm.validate()) {
        this.loading = true;
        try {
          const data = await this.$axios.post("/service/keypair", {
            name: this.sshName,
            public_key: this.sshKey,
          });
          this.loading = false;
          this.$emit("updateList");
          this.$store.dispatch("SnackBar/show", "کلید با موفقیت افزوده شد.");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.$emit("closeDialog");
        } catch (err) {
          this.loading = false;
          console.log(err.response);
          this.$store.dispatch("SnackBar/show", {
            type: "error",
            text: "کلید وارد شده یا نامعتبر و یا از قبل وجود داشته است",
          });
        }
      }
    },
  },
};
</script>

<style></style>
