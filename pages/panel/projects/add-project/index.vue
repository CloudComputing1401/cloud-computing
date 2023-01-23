<template>
  <v-container>
    <div class="pa-4 my-5 rounded-lg shadow-lg bg-white">
      <div class="text-center mb-5">
        <v-icon color="primary" size="75">mdi-cloud-print</v-icon>
        <h1 class="font-weight-bold mt-3 text-2xl">ایجاد پروژه جدید</h1>
      </div>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-form
            lazy-validation
            v-model="validForm"
            ref="validForm"
            @submit.prevent="addProject"
          >
            <v-text-field
              v-model="projectName"
              label="نام پروژه"
              outlined
              :rules="[(v) => !!v || 'وارد کردن نام پروژه الزامی است']"
            />
            <v-textarea v-model="projectDescription" label="توضیحات" outlined />
            <v-btn
              block
              class="primary"
              height="50"
              type="submit"
              :loading="loading"
              :disabled="!validForm"
              >ایجاد پروژه</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "panel",
  data: () => ({
    validForm: true,
    projectName: "",
    projectDescription: "",
    loading: false,
  }),
  methods: {
    async addProject() {
      if (this.$refs.validForm.validate()) {
        try {
          const data = await this.$post("service/project/", {
            name: this.projectName,
            description: this.projectDescription,
          });
          this.$router.push(`/panel/projects/${data.data.id}`);
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style></style>
