<template>
  <v-dialog max-width="800" v-model="dialog">
    <div class="p-4 bg-white">
      <h1 class="text-[24px] font-semibold text-center">
        افزایش موجودی کیف پول
      </h1>
      <div class="flex flex-col gap-y-3 my-5 leading-4">
        <div class="flex items-center gap-x-2">
          <div class="w-2 h-2 bg-gray-800"></div>
          <span>درخواست شما بعد از تایید پشتیبان انجام میشود.</span>
        </div>
        <div class="flex items-center gap-x-2">
          <div class="w-2 h-2 bg-gray-800"></div>
          <span>لطفا عکس واریز خود را نیز اضافه کنید.</span>
        </div>
      </div>
      <v-form
        ref="validForm"
        v-model="validForm"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="amount"
          label="مقدار"
          placeholder="مقدار هزینه ای که میخواهید افزایش دهید را وارد کنید"
          outlined
          :rules="[
            (v) => !!v || 'وارد کردن مقدار افزایش موجودی الزامی است.',
            (v) =>
              /^[0-9]+$/g.test(v) || 'لطفا مقدار را به صورت عددی وارد کنید.',
          ]"
          :hint="
            amount.length > 3
              ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ''
          "
          persistent-hint
          class="number-input"
        />
        <v-file-input
          accept="image/*"
          show-size
          counter
          outlined
          prepend-icon=""
          label="آپلود فایل (الزامی)"
          :rules="[
            (imageFile) => !!imageFile || 'وارد کردن عکس واریز الزامی است.',
          ]"
          @change="uploadFile"
        ></v-file-input>
        <v-textarea label="توضیحات" outlined v-model="description" />
        <div class="w-full flex flex-row-reverse">
          <v-btn
            color="primary"
            width="100"
            class="mr-2"
            :loading="loading"
            :disabled="!validForm"
            type="submit"
            >تایید</v-btn
          >
          <v-btn color="primary" outlined width="100" @click="dialog = false"
            >انصراف</v-btn
          >
        </div>
      </v-form>
    </div>
    <snack-bar />
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    amount: "",
    description: "",
    imageFile: "",
    // imageSrc:'',
    loading: false,
    validForm: true,
  }),
  watch: {
    dialog(val) {
      if (
        !val &&
        this.$store.getters["Dialog/active"] === "IncreaseWalletDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.dialog = newValue === "IncreaseWalletDialog";
      }
    );
    this.dialog =
      this.$store.getters["Dialog/active"] === "IncreaseWalletDialog";
  },
  methods: {
    uploadFile(e) {
      this.imageFile = e;
    },
    async submit() {
      if (this.$refs.validForm.validate()) {
        this.loading = true;
        try {
          const formData = new FormData();
          formData.append("amount", this.amount);
          formData.append("description", this.description);
          formData.append("photo", this.imageFile);
          const data = await this.$post("wallet/user_requests/", formData);
          console.log(data, "data");
          this.loading = false;
          this.$store.dispatch(
            "SnackBar/show",
            "درخواست شما با موفقیت ثبت شد."
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.dialog = false;
        } catch (err) {
          this.loading = false;
          console.error(err);
        }
      }
    },
  },
};
</script>

<style></style>
