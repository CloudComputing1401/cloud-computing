<template>
  <v-dialog max-width="600" v-model="dialog">
    <div class="p-4 bg-white relative">
      <div
        class="absolute left-4 top-4 cursor-pointer"
        @click="$emit('closeDialog')"
      >
        <v-icon>mdi-close</v-icon>
      </div>
      <div class="mt-8">
        کد مربوط به public key خود را در این قسمت قرار دهید.(انتخاب نام ضروری
        است)
      </div>
      <div class="mb-8">
        با انتخاب ایجاد کلید خودکار دیگر نیازی به وارد کردن public key نمی باشد.
      </div>
      <v-form
        lazy-validation
        ref="validForm"
        v-model="validForm"
        @submit.prevent=""
      >
        <div class="d-flex">
          <v-text-field
            outlined
            v-model="sshName"
            label="نام"
            placeholder="نام ssh key را وارد کنید"
            :rules="[(v) => !!v || 'وارد کردن نام الزامی است']"
          />
          <v-switch
            label="ایجاد خودکار کلید"
            v-model="createAutomaticKey"
            hide-details
            class="mr-4"
          />
        </div>
        <v-expand-transition>
          <v-textarea
            v-if="!createAutomaticKey"
            outlined
            v-model="sshKey"
            placeholder="کلید خود را وارد کنید"
            :rules="[(v) => !!v || 'وارد کردن کلید الزامی است']"
          ></v-textarea>
        </v-expand-transition>
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
        <v-btn
          color="primary"
          outlined
          width="100"
          @click="$emit('closeDialog')"
          >انصراف</v-btn
        >
      </div>
      <snack-bar />
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    sshName: "",
    sshKey: "",
    validForm: true,
    loading: false,
    createAutomaticKey: false,
  }),
  watch: {
    dialog(val) {
      if (!val && this.$store.getters["Dialog/active"] === "AddSshDialog") {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.dialog = newValue === "AddSshDialog";
      }
    );
    this.dialog = this.$store.getters["Dialog/active"] === "AddSshDialog";
  },
  methods: {
    async addSshKey() {
      if (this.$refs.validForm.validate()) {
        this.loading = true;
        try {
          const data = await this.$axios.post(
            "/service/keypair",
            this.createAutomaticKey
              ? {
                  name: this.sshName,
                }
              : {
                  name: this.sshName,
                  public_key: this.sshKey,
                }
          );
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
