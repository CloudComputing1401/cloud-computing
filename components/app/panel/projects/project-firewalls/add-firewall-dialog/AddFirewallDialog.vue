<template>
  <v-dialog max-width="600" v-model="dialog">
    <div class="p-4 bg-white relative">
      <div
        class="absolute left-4 top-4 cursor-pointer"
        @click="$store.dispatch('Dialog/showDialog', '')"
      >
        <v-icon>mdi-close</v-icon>
      </div>
      <div class="d-flex items-center mt-8">
        <v-icon color="primary" size="50">mdi-security</v-icon>
        <h2 class="text-[24px] font-semibold mr-2">افزودن گروه امنیتی جدید</h2>
      </div>
      <div class="my-8">
        نام و توضیحات مربوط به گروه امنیتی خود را وارد کنید سپس میتوانید به آن
        قوانین مورد نظر را اضافه کنید.
      </div>
      <v-form
        lazy-validation
        ref="form"
        v-model="validForm"
        @submit.prevent="createGroup"
      >
        <v-text-field
          outlined
          label="نام گروه"
          v-model="groupName"
          :rules="[(v) => !!v || 'وارد کردن نام گروه الزامی است']"
        />
        <v-textarea outlined label="توضیحات" v-model="groupDescription" />
        <div class="d-flex flex-row-reverse mt-5">
          <v-btn
            color="primary"
            type="submit"
            :disabled="!validForm"
            :loading="loading"
            >افزودن گروه</v-btn
          >
        </div>
      </v-form>
    </div>
    <snack-bar />
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      validForm: true,
      loading: false,
      groupName: "",
      groupDescription: "",
      projectId: this.$route.params.id,
    };
  },
  watch: {
    dialog(val) {
      if (
        !val &&
        this.$store.getters["Dialog/active"] === "AddFirewallDialog"
      ) {
        this.$store.dispatch("Dialog/showDialog", "");
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters["Dialog/active"],
      (newValue) => {
        this.dialog = newValue === "AddFirewallDialog";
      }
    );
    this.dialog = this.$store.getters["Dialog/active"] === "AddFirewallDialog";
  },
  methods: {
    async createGroup() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const data = await this.$axios.post(
            "/service/security-groups/",
            {
              name: this.groupName,
              description: this.groupDescription,
            },
            {
              params: {
                project_id: this.projectId,
              },
              headers: {
                Authorization: this.$store.getters["Auth/getToken"],
              },
            }
          );
          this.loading = false;
          this.$store.dispatch("SnackBar/show", "گروه با موفقیت ایجاد شد.");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.$emit("update");
          this.dialog = false;
        } catch (err) {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
